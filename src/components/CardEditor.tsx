import { useState, useRef, useCallback } from 'react';
import type { CardTemplate } from '../lib/occasions';

interface Props {
  templates: CardTemplate[];
  occasionName: string;
}

const FONTS = [
  { id: 'dancing', label: 'Script',   css: "'Dancing Script', cursive" },
  { id: 'playfair', label: 'Serif',   css: "'Playfair Display', serif" },
  { id: 'great-vibes', label: 'Elegant', css: "'Great Vibes', cursive" },
  { id: 'pacifico', label: 'Fun',     css: "'Pacifico', cursive" },
  { id: 'lora', label: 'Classic',     css: "'Lora', serif" },
  { id: 'inter', label: 'Modern',     css: "'Inter Variable', sans-serif" },
];

const SIZES = ['sm', 'md', 'lg'] as const;
type Size = typeof SIZES[number];

const SIZE_SCALE: Record<Size, { heading: number; body: number; footer: number }> = {
  sm: { heading: 22, body: 13, footer: 11 },
  md: { heading: 28, body: 15, footer: 12 },
  lg: { heading: 36, body: 18, footer: 13 },
};

export default function CardEditor({ templates, occasionName }: Props) {
  const [tplIdx, setTplIdx]       = useState(0);
  const [heading, setHeading]     = useState(templates[0].defaultHeading);
  const [body, setBody]           = useState(templates[0].defaultBody);
  const [footer, setFooter]       = useState(templates[0].defaultFooter);
  const [font, setFont]           = useState(FONTS[0]);
  const [size, setSize]           = useState<Size>('md');
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tpl = templates[tplIdx];
  const scale = SIZE_SCALE[size];

  function switchTemplate(idx: number) {
    const t = templates[idx];
    setTplIdx(idx);
    setHeading(t.defaultHeading);
    setBody(t.defaultBody);
    setFooter(t.defaultFooter);
  }

  const downloadPNG = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js' as string) as any;
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: null });
      const link = document.createElement('a');
      link.download = `${occasionName.toLowerCase().replace(/\s+/g,'-')}-invitation.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // Fallback: plain canvas render
      const c = document.createElement('canvas');
      c.width = 600; c.height = 800;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0,0,600,800);
      ctx.fillStyle = tpl.textColor;
      ctx.font = `bold ${scale.heading * 1.5}px ${font.css}`;
      ctx.textAlign = 'center';
      ctx.fillText(heading, 300, 200);
      ctx.font = `${scale.body * 1.5}px ${font.css}`;
      body.split('\n').forEach((line, i) => ctx.fillText(line, 300, 350 + i * 30));
      ctx.font = `${scale.footer * 1.5}px ${font.css}`;
      ctx.fillText(footer, 300, 650);
      const link = document.createElement('a');
      link.download = `${occasionName.toLowerCase().replace(/\s+/g,'-')}-invitation.png`;
      link.href = c.toDataURL('image/png');
      link.click();
    }
    setDownloading(false);
  }, [tpl, heading, body, footer, font, scale, occasionName]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* Template switcher */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Choose Template</p>
        <div className="flex gap-3 flex-wrap">
          {templates.map((t, i) => (
            <button
              key={t.id}
              onClick={() => switchTemplate(i)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                tplIdx === i
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-pink-300 hover:text-pink-600'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left: controls */}
        <div className="space-y-5">
          {/* Heading */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={e => setHeading(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Message</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all resize-none"
            />
          </div>

          {/* Footer */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Footer / Details</label>
            <input
              type="text"
              value={footer}
              onChange={e => setFooter(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all"
            />
          </div>

          {/* Font */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Font Style</label>
            <div className="flex gap-2 flex-wrap">
              {FONTS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFont(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    font.id === f.id ? 'bg-pink-600 text-white' : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Text Size</label>
            <div className="flex gap-2">
              {(['sm','md','lg'] as Size[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                    size === s ? 'bg-pink-600 text-white' : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <button
            onClick={downloadPNG}
            disabled={downloading}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-6 py-4 text-base font-black text-white hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 shadow-lg shadow-pink-500/25"
          >
            {downloading ? 'Preparing…' : '⬇ Download PNG — Free'}
          </button>
        </div>

        {/* Right: live preview */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Live Preview</p>
          <div
            ref={cardRef}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: tpl.bg, minHeight: '420px', padding: '48px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}
          >
            {/* Decorative top accent */}
            <div style={{ width: '40px', height: '3px', background: tpl.accentColor, borderRadius: '2px', marginBottom: '8px' }} />

            <h2
              className="leading-tight"
              style={{ fontFamily: font.css, fontSize: `${scale.heading}px`, color: tpl.textColor, fontWeight: 700, whiteSpace: 'pre-line' }}
            >
              {heading}
            </h2>

            <div style={{ width: '24px', height: '2px', background: tpl.accentColor, opacity: 0.5 }} />

            <p
              style={{ fontFamily: font.css, fontSize: `${scale.body}px`, color: tpl.textColor, opacity: 0.85, lineHeight: 1.7, whiteSpace: 'pre-line' }}
            >
              {body}
            </p>

            <div style={{ width: '24px', height: '2px', background: tpl.accentColor, opacity: 0.5, marginTop: '8px' }} />

            <p
              style={{ fontFamily: font.css, fontSize: `${scale.footer}px`, color: tpl.textColor, opacity: 0.65, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'pre-line' }}
            >
              {footer}
            </p>
          </div>
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
            ✓ High-res PNG · No watermark · No sign-up
          </p>
        </div>

      </div>
    </div>
  );
}
