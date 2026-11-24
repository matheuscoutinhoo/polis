/** Pure helpers shared by server code and tests (no Next.js imports). */
export function isSuspended(user: { suspendedUntil: Date | null }, now = new Date()): boolean {
  return Boolean(user.suspendedUntil && user.suspendedUntil > now);
}
