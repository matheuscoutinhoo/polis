import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignupBanner } from "@/components/auth/signup-gate";
import { Icon } from "@/components/ui/icon";
import { TopicIcon, areaMeta, type Area } from "@/components/ui/topic";
import { cn } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";
import { getModuleBySlug } from "@/modules/learning/catalog";
import { getLearnerSummary } from "@/modules/learning/progress";

export async function generateMetadata({ params }: { params: Promise<{ modulo: string }> }): Promise<Metadata> {
  const mod = await getModuleBySlug((await params).modulo);
  return { title: mod?.title ?? "Módulo" };
}

export default async function ModulePage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params;
  const [mod, user] = await Promise.all([getModuleBySlug(modulo), getCurrentUser()]);
  if (!mod || mod.status !== "PUBLISHED") notFound();
  const summary = user ? await getLearnerSummary(user.id) : null;
  const area = mod.area as Area;

  return (
    <div className="page-frame py-8 md:py-12">
      <Link href="/aprender" className="text-link inline-flex items-center gap-1.5 text-meta">
        <Icon name="arrowLeft" size={16} /> Voltar ao catálogo
      </Link>
      <div className="mt-6 flex items-start gap-4">
        <TopicIcon area={area} size={56} />
        <div>
          <p className="eyebrow">
            Módulo {String(mod.number).padStart(2, "0")} / {areaMeta[area].label}
          </p>
          <h1 className="mt-1 text-display-sm font-semibold">{mod.title}</h1>
          <p className="mt-2 max-w-2xl text-lead text-ink-soft">{mod.summary}</p>
        </div>
      </div>
      {user ? null : (
        <SignupBanner path={`/aprender/${mod.slug}`} title="Crie uma conta para ler as lições completas" className="mt-8 max-w-3xl">
          Sem conta, cada lição mostra só a abertura.
        </SignupBanner>
      )}
      <ol className={cn("flex max-w-3xl flex-col gap-3", user ? "mt-10" : "mt-6")}>
        {mod.lessons.map((lesson) => {
          const state = summary?.progressByLesson.get(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/aprender/${mod.slug}/${lesson.slug}`}
                className="topic-card surface-card flex items-center gap-4 p-5 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-action)]"
              >
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-[10px] text-meta font-semibold ${state?.completedAt ? "bg-selected text-action" : "bg-mint text-action"}`} aria-hidden="true">
                  {state?.completedAt ? <Icon name="check" size={20} /> : String(lesson.number).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lead font-semibold">{lesson.title}</span>
                  <span className="mt-0.5 block text-meta text-ink-soft">
                    {lesson.minutes} min · {lesson.objective}
                  </span>
                </span>
                <span className="sr-only">
                  {!user ? "Prévia; lição completa com conta" : state?.completedAt ? "Concluída" : state?.readAt ? "Leitura concluída" : "Não iniciada"}
                </span>
                {user ? <Icon name="arrowRight" size={20} className="flex-none text-action" /> : <Icon name="lock" size={18} className="flex-none text-ink-soft" />}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
