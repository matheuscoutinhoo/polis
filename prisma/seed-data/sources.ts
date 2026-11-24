import { LEGAL_SOURCES } from "./sources-legal";
import { INSTITUTION_SOURCES } from "./sources-institutions";
import { IDEAS_SOURCES } from "./sources-ideas";
import { EVENT_SOURCES } from "./sources-events";
import type { SeedSource } from "./publishers";

// Aggregated catalog of verified sources used by lessons, profiles and events.
export const ALL_SOURCES: SeedSource[] = [...LEGAL_SOURCES, ...INSTITUTION_SOURCES, ...IDEAS_SOURCES, ...EVENT_SOURCES];
