import { useEffect, useState } from 'react';
import { DRAFT_REGISTRY_KEY, getDraftStorageKey, parseDraftRegistry, removeDraftRegistryEntry, type DraftRegistryEntry } from '../lib/drafts';

function formatUpdatedAt(value: string) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return 'Saved recently';

  const diffMs = Date.now() - timestamp;
  const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
  if (diffHours < 24) return `Updated about ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 14) return `Updated ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return `Updated ${new Date(value).toLocaleDateString()}`;
}

export default function RecentDrafts() {
  const [drafts, setDrafts] = useState<DraftRegistryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const entries = parseDraftRegistry(window.localStorage.getItem(DRAFT_REGISTRY_KEY));
    setDrafts(entries);
    setLoaded(true);
  }, []);

  function removeDraft(occasionSlug: string) {
    const nextEntries = removeDraftRegistryEntry(drafts, occasionSlug);
    window.localStorage.removeItem(getDraftStorageKey(occasionSlug));
    window.localStorage.setItem(DRAFT_REGISTRY_KEY, JSON.stringify(nextEntries));
    setDrafts(nextEntries);
  }

  if (!loaded) {
    return (
      <div className="rounded-3xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Loading recent projects...</p>
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="rounded-[2rem] border p-8 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>No recent projects yet</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Start a card in the editor and it will be saved automatically in this browser. This page becomes your fastest way back to unfinished invitations.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/occasions/" className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
            Browse occasions
          </a>
          <a href="/features/photo-card-maker/" className="rounded-full px-5 py-3 text-sm font-bold" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
            Explore product features
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {drafts.map((draft) => (
        <article key={draft.occasionSlug} className="rounded-[2rem] border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: '#ea580c' }}>{draft.occasionName}</p>
          <h2 className="mt-3 text-2xl font-black leading-tight" style={{ color: 'var(--color-text)' }}>{draft.headline}</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{draft.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}>
              {draft.templateName}
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(234,88,12,0.08)', color: '#ea580c' }}>
              {formatUpdatedAt(draft.updatedAt)}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={draft.path} className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
              Continue editing
            </a>
            <button
              type="button"
              onClick={() => removeDraft(draft.occasionSlug)}
              className="rounded-full px-5 py-3 text-sm font-bold"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
            >
              Remove draft
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

