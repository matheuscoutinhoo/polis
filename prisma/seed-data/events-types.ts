import type { EventContent } from "../../src/modules/events/content";
import type { EventThemeKey } from "../../src/modules/events/themes";

export type SeedEvent = {
  slug: string;
  title: string;
  /** Date of the central fact (YYYY-MM-DD). */
  eventDate: string;
  themes: EventThemeKey[];
  /** Every approved source attached to the event; all keys referenced in `content` must be listed. */
  sourceKeys: string[];
  /** Lessons linked to the event, by module and lesson slug, with the relation explained. */
  lessons: Array<{ module: string; lesson: string; relation: string }>;
  content: EventContent;
  /** Editorial review record stored with the publication decision. */
  reviewNote: string;
};
