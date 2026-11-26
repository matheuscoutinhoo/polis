import Link from "next/link";
import { AffinityList, DimensionScale } from "@/components/questionnaire/result-components";
import { Icon, type IconName } from "@/components/ui/icon";
import { PROFILE_BY_KEY, PROFILES_VERSION } from "@/modules/diagnostic/profiles";
import { MIN_VALID_PER_DIMENSION, type QuestionnaireResult } from "@/modules/diagnostic/scoring";

export function joinNames(keys: string[]) {
  const names = keys.map((k) => PROFILE_BY_KEY[k as keyof typeof PROFILE_BY_KEY]?.name ?? k);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`;
}

/** Summary, the five dimensions and the reference currents of one result. */
export function ResultReport({ result }: { result: QuestionnaireResult }) {
  const comparable = result.affinities.filter((a) => a.comparable);
  return (
    <>
      <section aria-labelledby="sintese" className="mt-10 max-w-3xl">
        <h2 id="sintese" className="text-h2 font-semibold">
          Síntese
        </h2>
        {result.affinityStatus === "OK" ? (
          <div className="mt-3 flex flex-col gap-3 text-reading">
            {result.closest.length ? (
              <p>
                Suas respostas se aproximam de <strong>{joinNames(result.closest)}</strong>
                {result.closest.length > 1 ? ", com índices de proximidade muito parecidos" : ""}. Essa aproximação considera apenas as dimensões em que cada corrente tem
                posição de referência.
              </p>
            ) : (
              <p>
                Suas respostas não se aproximam fortemente de nenhuma das correntes de referência. As mais próximas foram {joinNames(comparable.slice(0, 2).map((a) => a.key))}.
              </p>
            )}
            {result.tensionDimensions.length ? <p>Você apresentou posições diferentes em alguns temas; os detalhes estão em cada dimensão abaixo.</p> : null}
          </div>
        ) : (
          <p className="mt-3 text-reading">
            Há respostas válidas suficientes em menos de duas dimensões, por isso não calculamos afinidades. A trilha segue a ordem geral; você pode refazer o questionário
            quando quiser.
          </p>
        )}
      </section>

      <section aria-labelledby="dimensoes" className="mt-10">
        <h2 id="dimensoes" className="text-h2 font-semibold">
          Cinco dimensões independentes
        </h2>
        <p className="mt-2 max-w-3xl text-body text-ink-soft">
          Cada dimensão é calculada separadamente. Os dois polos não são “certo” e “errado”, nem esquerda e direita: são ênfases diferentes diante de dilemas reais.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {result.dimensions.map((dimension) => (
            <DimensionScale key={dimension.key} result={dimension} />
          ))}
        </div>
      </section>

      {result.affinityStatus === "OK" ? (
        <section aria-labelledby="correntes" className="mt-10 max-w-4xl">
          <h2 id="correntes" className="text-h2 font-semibold">
            Correntes de referência
          </h2>
          <p className="mt-2 text-body text-ink-soft">
            Cada corrente tem faixas de referência por dimensão, documentadas com fontes em{" "}
            <Link href="/fontes-e-metodo#perfis" className="text-link">
              Fontes e método
            </Link>
            . Todas as correntes continuam disponíveis no catálogo.
          </p>
          {result.computedWithProfilesVersion ? (
            <p className="mt-3 flex items-start gap-2 rounded-card bg-blue px-4 py-3 text-meta text-ink">
              <Icon name="info" size={18} className="mt-0.5 flex-none text-blue-ink" />
              <span>
                Afinidades recalculadas com a versão atual dos perfis de referência ({PROFILES_VERSION}); este resultado foi salvo com a versão{" "}
                {result.computedWithProfilesVersion}. Suas respostas e os escores das dimensões não mudam.
              </span>
            </p>
          ) : null}
          <div className="mt-5">
            <AffinityList affinities={result.affinities} />
          </div>
        </section>
      ) : null}
    </>
  );
}

const LIMITS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "document", title: "Modelagem editorial", text: "As dimensões e as faixas das correntes são uma escolha documentada da Polis, não um teste validado." },
  { icon: "info", title: "“Não sei” fica de fora", text: `Não conta como posição. Dimensões com menos de ${MIN_VALID_PER_DIMENSION} respostas válidas não entram nas afinidades.` },
  { icon: "scale", title: "Empate é empate", text: "Índices iguais aparecem empatados; para ordenar a trilha, vale a ordem editorial fixa." },
  { icon: "lock", title: "Só suas respostas contam", text: "Leituras, cliques, exercícios e fóruns nunca alteram este resultado." },
];

/** What the result can and cannot say, as a panel of short, scannable limits. */
export function ResultLimits() {
  return (
    <section aria-labelledby="limites" className="rounded-panel bg-sand p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface text-sand-ink" aria-hidden="true">
          <Icon name="alert" size={20} />
        </span>
        <h3 id="limites" className="text-lead font-semibold">
          Limites deste resultado
        </h3>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {LIMITS.map((item) => (
          <li key={item.title} className="flex items-start gap-3 rounded-card bg-surface p-3">
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-sand text-sand-ink" aria-hidden="true">
              <Icon name={item.icon} size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-meta font-semibold text-ink">{item.title}</span>
              <span className="block text-meta text-ink-soft">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
