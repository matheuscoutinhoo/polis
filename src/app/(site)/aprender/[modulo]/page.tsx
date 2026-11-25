import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignupGate } from "@/components/auth/signup-gate";
import { Icon } from "@/components/ui/icon";
import { TopicIcon, areaMeta, type Area } from "@/components/ui/topic";
import { plural } from "@/lib/format";
import { getContentUser } from "@/lib/session";
import { getModuleBySlug } from "@/modules/learning/catalog";
import { getLearnerSummary } from "@/modules/learning/progress";

export async function generateMetadata({ params }: { params: Promise<{ modulo: string }> }): Promise<Metadata> {
  const mod = await getModuleBySlug((await params).modulo);
  return { title: mod?.title ?? "Módulo" };
}

export default async function ModulePage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params;
  const [mod, user] = await Promise.all([getModuleBySlug(modulo), getContentUser()]);
  if (!mod || mod.status !== "PUBLISHED") notFound();
  const area = mod.area as Area;

  const header = (
    <>
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
    </>
  );

  if (!user) {
    return (
      <div className="page-frame py-8 md:py-12">
        {header}
        <SignupGate
          path={`/aprender/${mod.slug}`}
          eyebrow="Acesso com conta"
          title="Crie uma conta para estudar este módulo"
          perks={["Lições completas, com fontes", "Verificação de compreensão", "Progresso salvo na sua trilha", "Discussões relacionadas"]}
          className="mt-10 max-w-3xl"
        >
          Este módulo tem {plural(mod.lessons.length, "lição", "lições")}. Com uma conta, você lê cada uma por completo e acompanha o que já estudou.
        </SignupGate>
      </div>
    );
  }

  const summary = await getLearnerSummary(user.id);

  return (
    <div className="page-frame py-8 md:py-12">
      {header}
      <ol className="mt-10 flex max-w-3xl flex-col gap-3">
        {mod.lessons.map((lesson) => {
          const state = summary.progressByLesson.get(lesson.id);
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
                <span className="sr-only">{state?.completedAt ? "Concluída" : state?.readAt ? "Leitura concluída" : "Não iniciada"}</span>
                <Icon name="arrowRight" size={20} className="flex-none text-action" />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}