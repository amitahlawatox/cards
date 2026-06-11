import { useState, useRef, useCallback } from 'react';
import type { CardTemplate } from '../lib/occasions';

interface Props {
  templates: CardTemplate[];
  occasionName: string;
}

const FONTS = [
  { id: 'dancing',    label: 'Script',   css: "'Dancing Script', cursive" },
  { id: 'playfair',   label: 'Serif',    css: "'Playfair Display', serif" },
  { id: 'great-vibes',label: 'Elegant',  css: "'Great Vibes', cursive" },
  { id: 'pacifico',   label: 'Fun',      css: "'Pacifico', cursive" },
  { id: 'lora',       label: 'Classic',  css: "'Lora', serif" },
  { id: 'inter',      label: 'Modern',   css: "'Inter Variable', sans-serif" },
];

const ACCENT_COLORS = [
  { label: 'Original',  value: '__original__' },
  { label: 'Gold',      value: '#d97706' },
  { label: 'Rose',      value: '#e11d48' },
  { label: 'Navy',      value: '#1e3a8a' },
  { label: 'Emerald',   value: '#059669' },
  { label: 'Violet',    value: '#7c3aed' },
  { label: 'White',     value: '#ffffff' },
  { label: 'Black',     value: '#111827' },
];

const ACCENT_EMOJIS = ['✦', '❋', '◆', '✿', '♦', '★', '❦', '〜', '—', ''];

export default function CardEditor({ templates, occasionName }: Props) {
  const [tplIdx, setTplIdx]       = useState(0);
  const [heading, setHeading]     = useState(templates[0].defaultHeading);
  const [body, setBody]           = useState(templates[0].defaultBody);
  const [footer, setFooter]       = useState(templates[0].defaultFooter);
  const [date, setDate]           = useState(templates[0].defaultDate ?? '');
  const [time, setTime]           = useState(templates[0].defaultTime ?? '');
  const [venue, setVenue]         = useState(templates[0].defaultVenue ?? '');
  const [font, setFont]           = useState(FONTS[0]);
  const [accentPick, setAccentPick] = useState('__original__');
  const [accentEmoji, setAccentEmoji] = useState('✦');
  const [dlState, setDlState]     = useState<'idle'|'busy'|'done'>('idle');

  const cardRef = useRef<HTMLDivElement>(null);
  const tpl = templates[tplIdx];
  const resolvedAccent = accentPick === '__original__' ? tpl.accentColor : accentPick;

  function switchTemplate(idx: number) {
    const t = templates[idx];
    setTplIdx(idx);
    setHeading(t.defaultHeading);
    setBody(t.defaultBody);
    setFooter(t.defaultFooter);
    setDate(t.defaultDate ?? '');
    setTime(t.defaultTime ?? '');
    setVenue(t.defaultVenue ?? '');
    setAccentPick('__original__');
  }

  // ── Canvas-based PNG download (no CDN dependency) ──────────────
  const downloadPNG = useCallback(async () => {
    if (!cardRef.current) return;
    setDlState('busy');

    // Wait for fonts to load
    try { await document.fonts.ready; } catch (_) {}

    const W = 600, H = 840, SCALE = 3;
    const canvas = document.createElement('canvas');
    canvas.width  = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(SCALE, SCALE);

    // ── Background ──
    const bgEl = cardRef.current;
    const bgStyle = bgEl.style.background || tpl.bg;

    // Parse gradient or solid colour
    if (bgStyle.includes('gradient')) {
      // Convert CSS gradient to canvas gradient (linear approximation)
      const match = bgStyle.match(/linear-gradient\(([\d]+deg)?[^,]*,(.*)\)/s);
      if (match) {
        const stops = match[2].split(/,(?![^(]*\))/).map(s => s.trim());
        const grad = ctx.createLinearGradient(0, 0, W * 0.7, H);
        stops.forEach((stop, i) => {
          const col = stop.match(/#[a-fA-F0-9]{3,8}|rgba?\([^)]+\)/)?.[0] ?? '#fff';
          grad.addColorStop(i / Math.max(stops.length - 1, 1), col);
        });
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = '#ffffff';
      }
    } else {
      ctx.fillStyle = bgStyle || '#ffffff';
    }
    ctx.fillRect(0, 0, W, H);

    // ── Pattern overlay ──
    if (tpl.pattern) {
      const PAT_COLORS = ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.08)'];
      ctx.fillStyle = PAT_COLORS[0];
      for (let x = 12; x < W; x += 24) {
        for (let y = 12; y < H; y += 24) {
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    // ── Helpers ──
    const centerText = (text: string, y: number, size: number, weight: string | number, color: string, opacity = 1, lineH = 1.5) => {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px ${font.css}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const lines = text.replace(/\[.*?\]/g, s => s).split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, W / 2, y + i * size * lineH);
      });
      ctx.globalAlpha = 1;
      return lines.length * size * lineH;
    };

    const drawAccentLine = (y: number, width = 30, opacity = 0.7) => {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = resolvedAccent;
      ctx.fillRect(W / 2 - width / 2, y, width, 2.5);
      ctx.globalAlpha = 1;
    };

    const drawAccentDot = (y: number) => {
      if (!accentEmoji) return;
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = resolvedAccent;
      ctx.font = `500 14px ${font.css}`;
      ctx.textAlign = 'center';
      ctx.fillText(accentEmoji, W / 2, y);
      ctx.globalAlpha = 1;
    };

    // ── Layout ──
    let y = 52;
    drawAccentLine(y); y += 18;
    drawAccentDot(y + 10); y += 30;

    // Heading
    const headSize = heading.length > 30 ? 30 : 36;
    const headLines = centerText(heading, y, headSize, 700, tpl.textColor, 1, 1.4);
    y += headLines + 16;

    drawAccentLine(y, 50, 0.5); y += 22;

    // Body
    const bodyLines = centerText(body, y, 16, 400, tpl.textColor, 0.88, 1.6);
    y += bodyLines + 20;

    drawAccentLine(y, 30, 0.4); y += 22;

    // Date / Time / Venue block
    const details = [date, time, venue].filter(Boolean);
    if (details.length) {
      details.forEach(detail => {
        centerText(detail, y, 13, 600, tpl.textColor, 0.7, 1.4);
        y += 20;
      });
      y += 8;
    }

    // Footer
    if (footer) {
      drawAccentLine(y, 40, 0.35); y += 18;
      centerText(footer, y, 11, 500, tpl.textColor, 0.6);
      y += 20;
    }

    // Bottom accent
    drawAccentDot(H - 32);
    drawAccentLine(H - 20, 30);

    // ── Download ──
    const link = document.createElement('a');
    link.download = `${occasionName.toLowerCase().replace(/\s+/g, '-')}-invitation.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDlState('done');
    setTimeout(() => setDlState('idle'), 2500);
  }, [tpl, heading, body, footer, date, time, venue, font, resolvedAccent, accentEmoji, occasionName]);

  const accentStyle = { background: 'linear-gradient(135deg,#e8420a,#ec4899)', color: '#fff' };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* Template switcher */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Choose Template</p>
        <div className="flex gap-2 flex-wrap">
          {templates.map((t, i) => (
            <button key={t.id} onClick={() => switchTemplate(i)}
              className="rounded-xl px-4 py-2 text-sm font-bold transition-all"
              style={tplIdx === i ? accentStyle : { border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ── Controls ── */}
        <div className="space-y-4">

          {/* Heading */}
          <Field label="Heading">
            <input type="text" value={heading} onChange={e => setHeading(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
              onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </Field>

          {/* Message */}
          <Field label="Message">
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
              onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </Field>

          {/* Date / Time / Venue */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. March 15, 2025"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
                onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
            </Field>
            <Field label="Time">
              <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 3:00 PM"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
                onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
            </Field>
          </div>
          <Field label="Venue / Address">
            <input type="text" value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. The Grand Hall, London"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
              onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </Field>

          {/* Footer / RSVP */}
          <Field label="Footer / RSVP">
            <input type="text" value={footer} onChange={e => setFooter(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
              onFocus={e => e.currentTarget.style.borderColor = '#ec4899'}
              onBlur={e  => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </Field>

          {/* Font */}
          <Field label="Font Style">
            <div className="flex gap-2 flex-wrap">
              {FONTS.map(f => (
                <button key={f.id} onClick={() => setFont(f)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                  style={font.id === f.id ? accentStyle : { border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Accent colour */}
          <Field label="Accent Colour">
            <div className="flex gap-2 flex-wrap items-center">
              {ACCENT_COLORS.map(c => (
                <button key={c.value} onClick={() => setAccentPick(c.value)}
                  title={c.label}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                  style={accentPick === c.value
                    ? { ...accentStyle, boxShadow: '0 2px 8px rgba(232,66,10,0.3)' }
                    : { border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }
                  }>
                  {c.value !== '__original__' ? (
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-3 h-3 rounded-full"
                        style={{ background: c.value, border: '1px solid rgba(0,0,0,0.15)' }} />
                      {c.label}
                    </span>
                  ) : c.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Accent divider emoji */}
          <Field label="Divider Style">
            <div className="flex gap-2 flex-wrap">
              {ACCENT_EMOJIS.map(e => (
                <button key={e || 'none'} onClick={() => setAccentEmoji(e)}
                  className="w-9 h-9 rounded-lg text-base flex items-center justify-center transition-all"
                  style={accentEmoji === e
                    ? { ...accentStyle }
                    : { border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }
                  }>
                  {e || '–'}
                </button>
              ))}
            </div>
          </Field>

          {/* Download */}
          <button onClick={downloadPNG} disabled={dlState === 'busy'}
            className="w-full rounded-2xl px-6 py-4 text-base font-black text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#e8420a,#ec4899,#f97316)', boxShadow: '0 6px 24px rgba(232,66,10,0.3)' }}>
            {dlState === 'busy' ? '⏳ Preparing…' : dlState === 'done' ? '✓ Downloaded!' : '⬇ Download PNG — Free'}
          </button>
          <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
            High-res 3× PNG · No watermark · No sign-up required
          </p>
        </div>

        {/* ── Live preview ── */}
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Live Preview</p>
          <div
            ref={cardRef}
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ background: tpl.bg, minHeight: '480px', padding: '44px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0', textAlign: 'center', position: 'relative' }}
          >
            {/* Pattern overlay */}
            {tpl.pattern && (
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ backgroundImage: tpl.pattern, backgroundSize: '24px 24px', opacity: 0.8 }} />
            )}

            {/* Top accent */}
            <div className="relative z-10 flex flex-col items-center gap-3 w-full">
              <div style={{ width: '40px', height: '2.5px', background: resolvedAccent, borderRadius: '2px', opacity: 0.8 }} />
              {accentEmoji && <span style={{ color: resolvedAccent, opacity: 0.7, fontSize: '14px' }}>{accentEmoji}</span>}

              <h2 className="leading-tight font-bold relative z-10"
                style={{ fontFamily: font.css, fontSize: heading.length > 30 ? '22px' : '28px', color: tpl.textColor, whiteSpace: 'pre-line', marginTop: '4px' }}>
                {heading}
              </h2>

              <div style={{ width: '40px', height: '1.5px', background: resolvedAccent, opacity: 0.4 }} />

              <p style={{ fontFamily: font.css, fontSize: '14px', color: tpl.textColor, opacity: 0.88, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {body}
              </p>

              {/* Date / Time / Venue */}
              {(date || time || venue) && (
                <div style={{ borderTop: `1px solid ${resolvedAccent}22`, paddingTop: '12px', width: '80%' }}>
                  {date  && <p style={{ fontFamily: font.css, fontSize: '12px', color: tpl.textColor, opacity: 0.72, fontWeight: 600, letterSpacing: '0.05em' }}>{date}</p>}
                  {time  && <p style={{ fontFamily: font.css, fontSize: '12px', color: tpl.textColor, opacity: 0.65 }}>{time}</p>}
                  {venue && <p style={{ fontFamily: font.css, fontSize: '12px', color: tpl.textColor, opacity: 0.65 }}>{venue}</p>}
                </div>
              )}

              {footer && (
                <>
                  <div style={{ width: '30px', height: '1.5px', background: resolvedAccent, opacity: 0.3, marginTop: '4px' }} />
                  <p style={{ fontFamily: font.css, fontSize: '11px', color: tpl.textColor, opacity: 0.55, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {footer}
                  </p>
                </>
              )}

              {/* Bottom accent */}
              {accentEmoji && <span style={{ color: resolvedAccent, opacity: 0.5, fontSize: '14px', marginTop: '4px' }}>{accentEmoji}</span>}
              <div style={{ width: '30px', height: '2px', background: resolvedAccent, borderRadius: '2px', opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
