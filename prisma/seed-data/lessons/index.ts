import { moduloFundamentos } from "./m01-fundamentos";
import { moduloOrganizacao } from "./m02-organizacao";
import { moduloLeisEleicoes } from "./m03-leis-eleicoes";
import { moduloEconomia } from "./m04-economia";
import { moduloLiberalismos } from "./m05-liberalismos";
import { moduloConservadorismos } from "./m06-conservadorismos";
import { moduloSocialDemocracia } from "./m07-social-democracia";
import { moduloSocialismos } from "./m08-socialismos";
import { moduloComunismo } from "./m09-comunismo";
import { moduloAnarquismos } from "./m10-anarquismos";
import { moduloLibertarianismos } from "./m11-libertarianismos";
import { moduloTemasTransversais } from "./m12-temas-transversais";
import { moduloHistoria } from "./m13-historia";
import { moduloLeituraCritica } from "./m14-leitura-critica";
import type { SeedModule } from "./types";

// Registered modules, in editorial order. Each module is validated by
// scripts/check-content.ts and again by the seed before publication.
// Each reference current has its own module (5–11), so the path can follow the
// visitor's affinities one current at a time.
export const MODULES: SeedModule[] = [
  moduloFundamentos,
  moduloOrganizacao,
  moduloLeisEleicoes,
  moduloEconomia,
  moduloLiberalismos,
  moduloConservadorismos,
  moduloSocialDemocracia,
  moduloSocialismos,
  moduloComunismo,
  moduloAnarquismos,
  moduloLibertarianismos,
  moduloTemasTransversais,
  moduloHistoria,
  moduloLeituraCritica,
];