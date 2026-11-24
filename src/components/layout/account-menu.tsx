"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";

type AccountMenuProps = {
  name: string;
  email: string;
  isAdmin: boolean;
};

export function AccountMenu({ name, email, isAdmin }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function signOut() {
    setSigningOut(true);
    try {
      await authClient.signOut();
    } finally {
      setOpen(false);
      router.push("/");
      router.refresh();
    }
  }

  const itemClass =
    "flex min-h-[44px] w-full items-center gap-3 rounded-control px-3 text-left text-body text-ink hover:bg-mint focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]";

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Conta de ${name}`}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-action)]"
      >
        <Avatar name={name} size={40} />
      </button>
      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-card border border-line bg-surface p-2 shadow-[0_12px_32px_-12px_rgb(38_59_66/0.28)]"
        >
          <div className="border-b border-line-soft px-3 pb-3 pt-2">
            <p className="truncate font-semibold">{name}</p>
            <p className="truncate text-meta text-ink-soft">{email}</p>
          </div>
          <ul className="mt-2 flex flex-col gap-0.5">
            <li>
              <Link href="/conta" className={itemClass} onClick={() => setOpen(false)}>
                <Icon name="user" /> Conta
              </Link>
            </li>
            <li>
              <Link href="/conta/privacidade" className={itemClass} onClick={() => setOpen(false)}>
                <Icon name="lock" /> Privacidade e dados
              </Link>
            </li>
            <li>
              <Link href="/questionario" className={itemClass} onClick={() => setOpen(false)}>
                <Icon name="layers" /> Questionário e trilha
              </Link>
            </li>
            <li className="lg:hidden">
              <Link href="/fontes-e-metodo" className={itemClass} onClick={() => setOpen(false)}>
                <Icon name="document" /> Fontes e método
              </Link>
            </li>
            {isAdmin ? (
              <li>
                <Link href="/admin" className={itemClass} onClick={() => setOpen(false)}>
                  <Icon name="shield" /> Administração
                </Link>
              </li>
            ) : null}
            <li className="mt-1 border-t border-line-soft pt-1">
              <button type="button" className={itemClass} onClick={signOut} disabled={signingOut} aria-busy={signingOut || undefined}>
                <Icon name="logout" /> {signingOut ? "Saindo..." : "Sair"}
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
