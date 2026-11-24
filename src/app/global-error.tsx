"use client";

// Last-resort boundary for failures in the root layout itself.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f8faf8", color: "#263b42", margin: 0 }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px" }}>
          <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>A Polis está temporariamente indisponível.</h1>
          <p style={{ fontSize: 18, color: "#526469" }}>Seus dados não foram afetados. Tente novamente em alguns instantes.</p>
          <button
            type="button"
            onClick={reset}
            style={{ minHeight: 44, padding: "0 20px", borderRadius: 8, border: 0, background: "#246f73", color: "#fff", fontSize: 16, cursor: "pointer" }}
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  );
}
