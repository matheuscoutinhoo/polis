import { moduloFundamentos } from "./m01-fundamentos";
import { moduloOrganizacao } from "./m02-organizacao";
import { moduloLeisEleicoes } from "./m03-leis-eleicoes";
import { moduloEconomia } from "./m04-economia";
import { moduloLiberalismosConservadorismos } from "./m05-liberalismos-conservadorismos";
import { moduloSocialDemocraciaSocialismos } from "./m06-social-democracia-socialismos";
import { moduloAnarquismosLibertarianismos } from "./m07-anarquismos-libertarianismos";
import { moduloTemasTransversais } from "./m08-temas-transversais";
import { moduloHistoria } from "./m09-historia";
import { moduloLeituraCritica } from "./m10-leitura-critica";
import type { SeedModule } from "./types";

// Registered modules, in editorial order. Each module is validated by
// scripts/check-content.ts and again by the seed before publication.
export const MODULES: SeedModule[] = [
  moduloFundamentos,
  moduloOrganizacao,
  moduloLeisEleicoes,
  moduloEconomia,
  moduloLiberalismosConservadorismos,
  moduloSocialDemocraciaSocialismos,
  moduloAnarquismosLibertarianismos,
  moduloTemasTransversais,
  moduloHistoria,
  moduloLeituraCritica,
];
