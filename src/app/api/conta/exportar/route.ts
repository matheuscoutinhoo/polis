import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { exportUserData } from "@/modules/account/privacy";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Faça login para exportar seus dados." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const data = await exportUserData(session.user.id);
  if (!data) return NextResponse.json({ error: "Conta não encontrada." }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="polis-meus-dados-${date}.json"`,
      "Cache-Control": "no-store, private",
    },
  });
}
