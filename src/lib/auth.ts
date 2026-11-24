import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { resetPasswordEmail, sendMail, verificationEmail } from "@/lib/mailer";
import { TERMS_PURPOSE, TERMS_VERSION } from "@/modules/account/consent-texts";
import { displayNameSchema } from "@/modules/account/validation";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  appName: "Polis",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendMail(resetPasswordEmail(user.email, user.name, url));
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail(verificationEmail(user.email, user.name, url));
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "USER", input: false },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 14,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: isProduction || process.env.AUTH_RATE_LIMIT === "on",
    storage: "database",
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 600, max: 5 },
      "/request-password-reset": { window: 600, max: 3 },
      "/reset-password": { window: 600, max: 5 },
      "/send-verification-email": { window: 600, max: 3 },
      "/change-password": { window: 600, max: 5 },
    },
  },
  advanced: {
    cookiePrefix: "polis",
  },
  // Account deletion, e-mail change and profile updates go through the Polis
  // privacy flows (server actions with validation and anonymization policy).
  disabledPaths: ["/delete-user", "/change-email", "/update-user"],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const body = (ctx.body ?? {}) as Record<string, unknown>;
        if (body.acceptTerms !== true) {
          throw new APIError("BAD_REQUEST", { message: "É preciso aceitar os Termos de uso e a Política de privacidade." });
        }
        const name = displayNameSchema.safeParse(body.name);
        if (!name.success) {
          throw new APIError("BAD_REQUEST", { message: name.error.issues[0]?.message ?? "Nome de exibição inválido." });
        }
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const name = displayNameSchema.safeParse(user.name);
          return { data: { ...user, name: name.success ? name.data : user.name, role: "USER" } };
        },
        after: async (user) => {
          // Sign-up is only accepted with explicit acceptance of the terms (see hook above).
          await db.consentRecord.create({
            data: { userId: user.id, kind: "TERMS", version: TERMS_VERSION, purpose: TERMS_PURPOSE },
          });
          logger.info("account.created");
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
