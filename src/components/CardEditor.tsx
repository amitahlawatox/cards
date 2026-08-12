import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CardTemplate } from '../lib/occasions';

interface Props {
  templates: CardTemplate[];
  occasionName: string;
}

const FONTS = [
  { id: 'dancing',     label: 'Script',  css: "'Dancing Script', cursive" },
  { id: 'playfair',    label: 'Serif',   css: "'Playfair Display', serif" },
  { id: 'great-vibes', label: 'Elegant', css: "'Great Vibes', cursive" },
  { id: 'pacifico',    label: 'Fun',     css: "'Pacifico', cursive" },
  { id: 'lora',        label: 'Classic', css: "'Lora', serif" },
  { id: 'inter',       label: 'Modern',  css: "'Inter Variable', sans-serif" },
];

const ACCENT_COLORS = [
  { label: 'Original', value: '__original__' },
  { label: 'Gold',     value: '#d97706' },
  { label: 'Rose',     value: '#e11d48' },
  { label: 'Navy',     value: '#1e3a8a' },
  { label: 'Emerald',  value: '#059669' },
  { label: 'Violet',   value: '#7c3aed' },
  { label: 'White',    value: '#ffffff' },
  { label: 'Black',    value: '#111827' },
];

const ACCENT_EMOJIS = ['✦', '❋', '◆', '✿', '♦', '★', '❦', '〜', '—', ''];

export default function CardEditor({ templates, occasionName }: Props) {
  const [tplIdx, setTplIdx]         = useState(0);
  const [heading, setHeading]       = useState(templates[0].defaultHeading);
  const [body, setBody]             = useState(templates[0].defaultBody);
  const [footer, setFooter]         = useState(templates[0].defaultFooter);
  const [date, setDate]             = useState(templates[0].defaultDate ?? '');
  const [time, setTime]             = useState(templates[0].defaultTime ?? '');
  const [venue, setVenue]           = useState(templates[0].defaultVenue ?? '');
  const [font, setFont]             = useState(FONTS[0]);
  const [accentPick, setAccentPick] = useState('__original__');
  const [accentEmoji, setAccentEmoji] = useState('✦');
  const [dlState, setDlState]       = useState<'idle' | 'busy' | 'done'>('idle');

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

  // ── Canvas PNG download — logic unchanged ──────────────────────────
  const downloadPNG = useCallback(async () => {
    if (!cardRef.current) return;
    setDlState('busy');
    try { await document.fonts.ready; } catch (_) {}

    const W = 600, H = 840, SCALE = 3;
    const canvas = document.createElement('canvas');
    canvas.width  = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(SCALE, SCALE);

    const bgEl = cardRef.current;
    const bgStyle = bgEl.style.background || tpl.bg;

    if (bgStyle.includes('gradient')) {
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

    if (tpl.pattern) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      for (let x = 12; x < W; x += 24) {
        for (let y = 12; y < H; y += 24) {
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    const centerText = (text: string, y: number, size: number, weight: string | number, color: string, opacity = 1, lineH = 1.5) => {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px ${font.css}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const lines = text.replace(/\[.*?\]/g, s => s).split('\n');
      lines.forEach((line, i) => { ctx.fillText(line, W / 2, y + i * size * lineH); });
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

    let y = 52;
    drawAccentLine(y); y += 18;
    drawAccentDot(y + 10); y += 30;
    const headSize = heading.length > 30 ? 30 : 36;
    const headLines = centerText(heading, y, headSize, 700, tpl.textColor, 1, 1.4);
    y += headLines + 16;
    drawAccentLine(y, 50, 0.5); y += 22;
    const bodyLines = centerText(body, y, 16, 400, tpl.textColor, 0.88, 1.6);
    y += bodyLines + 20;
    drawAccentLine(y, 30, 0.4); y += 22;
    const details = [date, time, venue].filter(Boolean);
    if (details.length) {
      details.forEach(detail => { centerText(detail, y, 13, 600, tpl.textColor, 0.7, 1.4); y += 20; });
      y += 8;
    }
    if (footer) {
      drawAccentLine(y, 40, 0.35); y += 18;
      centerText(footer, y, 11, 500, tpl.textColor, 0.6);
      y += 20;
    }
    drawAccentDot(H - 32);
    drawAccentLine(H - 20, 30);

    const link = document.createElement('a');
    link.download = `${occasionName.toLowerCase().replace(/\s+/g, '-')}-invitation.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDlState('done');
    setTimeout(() => setDlState('idle'), 2500);
  }, [tpl, heading, body, footer, date, time, venue, font, resolvedAccent, accentEmoji, occasionName]);

  // ─────────────────────────────── UI ──────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 12,
    padding: '10px 14px',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    border: '1.5px solid var(--color-border)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
  };

  function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = '#ec4899';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(236,72,153,0.12)';
  }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = 'var(--color-border)';
    e.currentTarget.style.boxShadow = 'none';
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Template selector */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Choose Template
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {templates.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => switchTemplate(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all overflow-hidden"
              style={tplIdx === i
                ? { background: 'linear-gradient(135deg,#ea580c,#ec4899)', color: '#fff', boxShadow: '0 4px 16px rgba(234,88,12,0.35)' }
                : { border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }
              }
            >
              {/* Color swatch */}
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ background: t.bg.includes('gradient') ? t.accentColor : t.bg, border: '1.5px solid rgba(0,0,0,0.1)' }}
              />
              {t.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* ── Controls ── */}
        <div className="space-y-5 rounded-2xl p-7" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)' }}>

          <Field label="Heading">
            <input
              type="text"
              value={heading}
              onChange={e => setHeading(e.target.value)}
              style={inputStyle}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </Field>

          <Field label="Message">
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="e.g. 15 March"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </Field>
            <Field label="Time">
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="e.g. 3:00 PM"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </Field>
          </div>

          <Field label="Venue / Address">
            <input
              type="text"
              value={venue}
              onChange={e => setVenue(e.target.value)}
              placeholder="e.g. The Grand Hall, London"
              style={inputStyle}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </Field>

          <Field label="Footer / RSVP">
            <input
              type="text"
              value={footer}
              onChange={e => setFooter(e.target.value)}
              style={inputStyle}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </Field>

          {/* Font */}
          <Field label="Font Style">
            <div className="flex gap-2 flex-wrap">
              {FONTS.map(f => (
                <motion.button
                  key={f.id}
                  onClick={() => setFont(f)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3.5 py-2 rounded-xl text-sm transition-all"
                  style={font.id === f.id
                    ? { background: 'linear-gradient(135deg,#ea580c,#ec4899)', color: '#fff', fontFamily: f.css, fontWeight: 600 }
                    : { border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)', fontFamily: f.css }
                  }
                >
                  {f.label}
                </motion.button>
              ))}
            </div>
          </Field>

          {/* Accent colour */}
          <Field label="Accent Colour">
            <div className="flex gap-2.5 flex-wrap items-center">
              {ACCENT_COLORS.map(c => (
                <motion.button
                  key={c.value}
                  onClick={() => setAccentPick(c.value)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={c.label}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all"
                  style={accentPick === c.value
                    ? { background: 'linear-gradient(135deg,#ea580c,#ec4899)', color: '#fff', boxShadow: '0 3px 12px rgba(234,88,12,0.3)' }
                    : { border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }
                  }
                >
                  {c.value !== '__original__' && (
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ background: c.value, border: '1.5px solid rgba(0,0,0,0.15)' }}
                    />
                  )}
                  {c.label}
                </motion.button>
              ))}
            </div>
          </Field>

          {/* Divider */}
          <Field label="Divider Style">
            <div className="flex gap-2 flex-wrap">
              {ACCENT_EMOJIS.map(e => (
                <motion.button
                  key={e || 'none'}
                  onClick={() => setAccentEmoji(e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl text-base flex items-center justify-center transition-all"
                  style={accentEmoji === e
                    ? { background: 'linear-gradient(135deg,#ea580c,#ec4899)', color: '#fff' }
                    : { border: '1.5px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }
                  }
                >
                  {e || '–'}
                </motion.button>
              ))}
            </div>
          </Field>

          {/* Download */}
          <motion.button
            onClick={downloadPNG}
            disabled={dlState === 'busy'}
            whileHover={{ scale: dlState === 'busy' ? 1 : 1.02, opacity: dlState === 'busy' ? 0.7 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl px-6 py-4 text-base font-black text-white transition-all relative overflow-hidden"
            style={{
              background: dlState === 'done'
                ? 'linear-gradient(135deg,#059669,#10b981)'
                : 'linear-gradient(135deg,#ea580c,#ec4899,#f97316)',
              boxShadow: '0 8px 30px rgba(234,88,12,0.35)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={dlState}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center gap-2"
              >
                {dlState === 'busy'  && <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Preparing…</>}
                {dlState === 'done'  && <>✓ Downloaded!</>}
                {dlState === 'idle'  && <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download PNG — Free
                </>}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
            High-res 3× PNG · No watermark · No sign-up
          </p>
        </div>

        {/* ── Live Preview ── */}
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Live Preview
            </p>
            <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#059669' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>

          <motion.div
            key={tplIdx}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            ref={cardRef}
            className="rounded-2xl overflow-hidden"
            style={{
              background: tpl.bg,
              minHeight: 500,
              padding: '48px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            {tpl.pattern && (
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{ backgroundImage: tpl.pattern, backgroundSize: '24px 24px', opacity: 0.8 }}
              />
            )}

            <div className="relative z-10 flex flex-col items-center gap-3 w-full">
              <div style={{ width: 40, height: 2.5, background: resolvedAccent, borderRadius: 2, opacity: 0.8 }} />
              {accentEmoji && <span style={{ color: resolvedAccent, opacity: 0.7, fontSize: 14 }}>{accentEmoji}</span>}

              <motion.h2
                key={heading + font.id}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="leading-tight font-bold"
                style={{
                  fontFamily: font.css,
                  fontSize: heading.length > 30 ? 22 : 28,
                  color: tpl.textColor,
                  whiteSpace: 'pre-line',
                  marginTop: 4,
                }}
              >
                {heading}
              </motion.h2>

              <div style={{ width: 40, height: 1.5, background: resolvedAccent, opacity: 0.4 }} />

              <p style={{ fontFamily: font.css, fontSize: 14, color: tpl.textColor, opacity: 0.88, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {body}
              </p>

              {(date || time || venue) && (
                <div style={{ borderTop: `1px solid ${resolvedAccent}22`, paddingTop: 12, width: '80%' }}>
                  {date  && <p style={{ fontFamily: font.css, fontSize: 12, color: tpl.textColor, opacity: 0.72, fontWeight: 600, letterSpacing: '0.05em' }}>{date}</p>}
                  {time  && <p style={{ fontFamily: font.css, fontSize: 12, color: tpl.textColor, opacity: 0.65 }}>{time}</p>}
                  {venue && <p style={{ fontFamily: font.css, fontSize: 12, color: tpl.textColor, opacity: 0.65 }}>{venue}</p>}
                </div>
              )}

              {footer && (
                <>
                  <div style={{ width: 30, height: 1.5, background: resolvedAccent, opacity: 0.3, marginTop: 4 }} />
                  <p style={{ fontFamily: font.css, fontSize: 11, color: tpl.textColor, opacity: 0.55, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {footer}
                  </p>
                </>
              )}

              {accentEmoji && <span style={{ color: resolvedAccent, opacity: 0.5, fontSize: 14, marginTop: 4 }}>{accentEmoji}</span>}
              <div style={{ width: 30, height: 2, background: resolvedAccent, borderRadius: 2, opacity: 0.6 }} />
            </div>
          </motion.div>

          <p className="mt-3 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
            ↑ This is exactly what your PNG will look like
          </p>
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
