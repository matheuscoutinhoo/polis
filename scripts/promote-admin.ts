// Grants (or revokes) the administrator role for an existing account.
// Usage: npm run admin:promote -- pessoa@exemplo.org [--revoke]
// The account must be created through the normal sign-up flow first, so the
// password is chosen by the person and never stored in code or env files.
import "dotenv/config";
import { db, disconnectDb } from "../src/lib/db";

async function main() {
  const args = process.argv.slice(2);
  const revoke = args.includes("--revoke");
  const email = args.find((a) => !a.startsWith("--"))?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    console.error("Informe o e-mail da conta: npm run admin:promote -- pessoa@exemplo.org [--revoke]");
    process.exitCode = 1;
    return;
  }
  const user = await db.user.findUnique({ where: { email }, select: { id: true, name: true, role: true, emailVerified: true } });
  if (!user) {
    console.error("Nenhuma conta com este e-mail. Crie a conta pela página /criar-conta e tente novamente.");
    process.exitCode = 1;
    return;
  }
  const role = revoke ? "USER" : "ADMIN";
  if (user.role === role) {
    console.log(`Nada a fazer: ${user.name} já tem o papel ${role}.`);
    return;
  }
  await db.user.update({ where: { id: user.id }, data: { role } });
  console.log(`${user.name} agora tem o papel ${role}.`);
  if (!revoke && !user.emailVerified) console.log("Aviso: o e-mail desta conta ainda não foi confirmado.");
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => disconnectDb());
