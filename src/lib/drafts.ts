import type { SharedInvitePayload } from './editor-share';

export interface DraftRegistryEntry {
  occasionSlug: string;
  occasionName: string;
  updatedAt: string;
  templateName: string;
  headline: string;
  summary: string;
  path: string;
}

export const DRAFT_REGISTRY_KEY = 'bcs-draft-registry';

export function getDraftStorageKey(occasionSlug: string) {
  return `bcs-draft:${occasionSlug}`;
}

function truncate(value: string, max = 72) {
  return value.length > max ? `${value.slice(0, max - 1)}...` : value;
}

export function createDraftRegistryEntry(payload: SharedInvitePayload, templateName: string): DraftRegistryEntry {
  const textLayers = payload.elements
    .filter((element) => element.kind === 'text' && typeof element.text === 'string' && element.text.trim())
    .sort((a, b) => a.zIndex - b.zIndex);

  const headline = truncate(textLayers[0]?.text?.replace(/\s+/g, ' ').trim() ?? `${payload.occasionName} invitation`);
  const bodyLine = textLayers[1]?.text?.replace(/\s+/g, ' ').trim() ?? '';
  const summary = truncate(
    bodyLine || payload.meta.rsvpBy || payload.meta.hostName || `Continue editing your ${payload.occasionName.toLowerCase()} design.`,
    96,
  );

  return {
    occasionSlug: payload.occasionSlug,
    occasionName: payload.occasionName,
    updatedAt: payload.updatedAt,
    templateName,
    headline,
    summary,
    path: `/make/${payload.occasionSlug}/`,
  };
}

export function parseDraftRegistry(rawValue: string | null) {
  if (!rawValue) return [] as DraftRegistryEntry[];

  try {
    const parsed = JSON.parse(rawValue) as DraftRegistryEntry[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (entry) =>
        entry &&
        typeof entry.occasionSlug === 'string' &&
        typeof entry.occasionName === 'string' &&
        typeof entry.updatedAt === 'string' &&
        typeof entry.path === 'string',
    );
  } catch {
    return [];
  }
}

export function upsertDraftRegistryEntry(entries: DraftRegistryEntry[], nextEntry: DraftRegistryEntry) {
  const filtered = entries.filter((entry) => entry.occasionSlug !== nextEntry.occasionSlug);
  return [nextEntry, ...filtered]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 24);
}

export function removeDraftRegistryEntry(entries: DraftRegistryEntry[], occasionSlug: string) {
  return entries.filter((entry) => entry.occasionSlug !== occasionSlug);
}

