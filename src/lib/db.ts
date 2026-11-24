import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { __polisPrisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL não configurada.");
  }
  const adapter = new PrismaPg({ connectionString, max: Number(process.env.DATABASE_POOL_MAX ?? 10) });
  return new PrismaClient({ adapter });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.__polisPrisma) {
    globalForPrisma.__polisPrisma = createClient();
  }
  return globalForPrisma.__polisPrisma;
}

// Lazily created so that importing modules during `next build` does not require
// a database connection.
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getClient();
    const value = Reflect.get(client, property, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export async function disconnectDb() {
  if (globalForPrisma.__polisPrisma) {
    await globalForPrisma.__polisPrisma.$disconnect();
    globalForPrisma.__polisPrisma = undefined;
  }
}
