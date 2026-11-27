// Railway Infrastructure as Code (replaces the deprecated railway.json).
// Needs Railway CLI 5.45.2 or newer (earlier releases break `ctx.shared`) and the
// `railway` SDK from devDependencies. Preview with `railway config plan` and
// apply with `railway config apply`; Railway does not read this file on deploys.
//
// Secrets are never written here: they are shared variables of the Railway
// environment (see README, "Deploy no Railway"). A reference to a shared
// variable that was not created resolves to an empty string, which the app
// treats as "not configured" (for example OPENAI_API_KEY or the SMTP_* settings).
import { defineRailway, postgres, project, service } from "railway/iac";

export default defineRailway((ctx) => {
  const db = postgres("Postgres");

  const web = service("polis", {
    build: "npm run build",
    start: "npm run start",
    // Applies pending migrations before each deploy (never resets the database) and,
    // on a database without editorial content yet, loads the initial seed.
    preDeploy: "npm run db:migrate:deploy",
    // Returns 503 while the database or BETTER_AUTH_URL/BETTER_AUTH_SECRET are not usable,
    // so a misconfigured release never replaces the running one.
    healthcheck: "/api/health",
    healthcheckTimeout: 120,
    env: {
      // Same Node.js major used to build and test the app.
      RAILPACK_NODE_VERSION: "24",
      DATABASE_URL: db.env.DATABASE_URL,
      // Resolved on each deploy: generate the public domain before the first deploy (or redeploy afterwards).
      BETTER_AUTH_URL: "https://${{RAILWAY_PUBLIC_DOMAIN}}",
      BETTER_AUTH_SECRET: ctx.shared.BETTER_AUTH_SECRET,
      OPENAI_API_KEY: ctx.shared.OPENAI_API_KEY,
      OPENAI_MODEL: "gpt-6.2-sol",
      // The automatic search of official news runs inside this service, at 07:00 and 19:00
      // (Brasília) by default, and needs OPENAI_API_KEY to create events. Optional settings:
      // EVENTS_FETCH_HOURS, EVENTS_FETCH_MAX and EVENTS_AUTO_FETCH=off (see README).
      // E-mail (SMTP): Railway only allows outbound SMTP on the Pro plan.
      MAIL_FROM: ctx.shared.MAIL_FROM,
      SMTP_HOST: ctx.shared.SMTP_HOST,
      SMTP_PORT: ctx.shared.SMTP_PORT,
      SMTP_USER: ctx.shared.SMTP_USER,
      SMTP_PASSWORD: ctx.shared.SMTP_PASSWORD,
      CONTACT_EMAIL: ctx.shared.CONTACT_EMAIL,
    },
  });

  return project("polis", { resources: [web, db] });
});
