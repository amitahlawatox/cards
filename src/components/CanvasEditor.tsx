import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CardTemplate } from '../lib/occasions';

/* ── Types ── */
type ElKind = 'text' | 'image' | 'shape' | 'sticker';

interface El {
  id: string;
  kind: ElKind;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  // text
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  // image
  src?: string;
  // shape
  shapeType?: 'rect' | 'circle' | 'line';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  // sticker
  emoji?: string;
}

interface Props {
  templates: CardTemplate[];
  occasionName: string;
}

/* ── Helpers ── */
const uid = () => Math.random().toString(36).slice(2, 9);
const CARD_W = 600;
const CARD_H = 840;

const FONTS = ['Inter', 'Dancing Script', 'Playfair Display', 'Lora', 'Pacifico', 'Great Vibes'];
const STICKERS = ['🎉', '🎊', '🎂', '🌸', '💖', '⭐', '🌟', '🦋', '🌈', '🎈', '🍾', '🥂', '💐', '🎀', '✨', '🔥', '💫', '🌙', '☀️', '🎵'];
const COLORS = ['#FFFFFF', '#F0EFFE', '#1A1340', '#4F46E5', '#7C3AED', '#EC4899', '#059669', '#DC2626', '#F59E0B', '#000000'];

/* ── Resizable/Draggable element on canvas ── */
function CanvasElement({
  el,
  selected,
  onSelect,
  onChange,
  onDelete,
}: {
  el: El;
  selected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<El>) => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null);
  const resizeStart = useRef<{ mx: number; my: number; ow: number; oh: number } | null>(null);
  const rotStart = useRef<{ angle: number; startAngle: number } | null>(null);

  function handlePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    onSelect();
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: el.x, oy: el.y };
    window.addEventListener('pointermove', handleDragMove);
    window.addEventListener('pointerup', handleDragUp);
  }
  function handleDragMove(e: PointerEvent) {
    if (!dragStart.current) return;
    onChange({
      x: dragStart.current.ox + e.clientX - dragStart.current.mx,
      y: dragStart.current.oy + e.clientY - dragStart.current.my,
    });
  }
  function handleDragUp() {
    dragStart.current = null;
    window.removeEventListener('pointermove', handleDragMove);
    window.removeEventListener('pointerup', handleDragUp);
  }

  function handleResizeDown(e: React.PointerEvent) {
    e.stopPropagation();
    resizeStart.current = { mx: e.clientX, my: e.clientY, ow: el.w, oh: el.h };
    window.addEventListener('pointermove', handleResizeMove);
    window.addEventListener('pointerup', handleResizeUp);
  }
  function handleResizeMove(e: PointerEvent) {
    if (!resizeStart.current) return;
    onChange({
      w: Math.max(40, resizeStart.current.ow + e.clientX - resizeStart.current.mx),
      h: Math.max(24, resizeStart.current.oh + e.clientY - resizeStart.current.my),
    });
  }
  function handleResizeUp() {
    resizeStart.current = null;
    window.removeEventListener('pointermove', handleResizeMove);
    window.removeEventListener('pointerup', handleResizeUp);
  }

  function handleRotateDown(e: React.PointerEvent) {
    e.stopPropagation();
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    rotStart.current = { angle: el.rotation, startAngle };
    window.addEventListener('pointermove', handleRotateMove);
    window.addEventListener('pointerup', handleRotateUp);
  }
  function handleRotateMove(e: PointerEvent) {
    if (!rotStart.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    onChange({ rotation: rotStart.current.angle + angle - rotStart.current.startAngle });
  }
  function handleRotateUp() {
    rotStart.current = null;
    window.removeEventListener('pointermove', handleRotateMove);
    window.removeEventListener('pointerup', handleRotateUp);
  }

  const style: React.CSSProperties = {
    position: 'absolute',
    left: el.x,
    top: el.y,
    width: el.w,
    minHeight: el.h,
    transform: `rotate(${el.rotation}deg)`,
    opacity: el.opacity,
    zIndex: el.zIndex + (selected ? 100 : 0),
    cursor: 'grab',
    userSelect: 'none',
    outline: selected ? '2px solid #4F46E5' : 'none',
    outlineOffset: 2,
    borderRadius: 4,
  };

  return (
    <div ref={ref} style={style} onPointerDown={handlePointerDown}>
      {/* Content */}
      {el.kind === 'text' && (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={e => onChange({ text: e.currentTarget.textContent ?? '' })}
          style={{
            fontSize: el.fontSize ?? 20,
            fontFamily: el.fontFamily ?? 'Inter',
            fontWeight: el.fontWeight ?? '400',
            color: el.color ?? '#1A1340',
            textAlign: el.textAlign ?? 'center',
            lineHeight: 1.3,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            minWidth: 60,
            outline: 'none',
            cursor: 'text',
          }}
        >
          {el.text}
        </div>
      )}
      {el.kind === 'image' && el.src && (
        <img
          src={el.src}
          alt=""
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      )}
      {el.kind === 'sticker' && (
        <div style={{ fontSize: el.fontSize ?? 48, lineHeight: 1, textAlign: 'center' }}>{el.emoji}</div>
      )}
      {el.kind === 'shape' && (
        <svg width={el.w} height={el.h} viewBox={`0 0 ${el.w} ${el.h}`} style={{ display: 'block' }}>
          {el.shapeType === 'rect' && (
            <rect x={1} y={1} width={el.w - 2} height={el.h - 2} rx={8}
              fill={el.fill ?? '#4F46E5'} stroke={el.stroke ?? 'none'} strokeWidth={el.strokeWidth ?? 0} />
          )}
          {el.shapeType === 'circle' && (
            <ellipse cx={el.w / 2} cy={el.h / 2} rx={el.w / 2 - 1} ry={el.h / 2 - 1}
              fill={el.fill ?? '#EC4899'} stroke={el.stroke ?? 'none'} strokeWidth={el.strokeWidth ?? 0} />
          )}
          {el.shapeType === 'line' && (
            <line x1={0} y1={el.h / 2} x2={el.w} y2={el.h / 2}
              stroke={el.fill ?? '#4F46E5'} strokeWidth={el.strokeWidth ?? 3} />
          )}
        </svg>
      )}

      {/* Handles when selected */}
      {selected && (
        <>
          {/* Rotate handle */}
          <div
            onPointerDown={handleRotateDown}
            style={{
              position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
              width: 20, height: 20, borderRadius: '50%', background: '#4F46E5',
              cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
            </svg>
          </div>
          {/* Resize handle */}
          <div
            onPointerDown={handleResizeDown}
            style={{
              position: 'absolute', bottom: -6, right: -6,
              width: 14, height: 14, borderRadius: 3, background: '#4F46E5', cursor: 'se-resize',
            }}
          />
          {/* Delete handle */}
          <div
            onClick={e => { e.stopPropagation(); onDelete(); }}
            style={{
              position: 'absolute', top: -28, right: 0,
              width: 20, height: 20, borderRadius: '50%', background: '#DC2626',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 12, fontWeight: 'bold',
            }}
          >
            ×
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main CanvasEditor ── */
export default function CanvasEditor({ templates, occasionName }: Props) {
  const [activeTpl, setActiveTpl] = useState(0);
  const [elements, setElements] = useState<El[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activePanel, setActivePanel] = useState<'elements' | 'stickers' | 'shapes' | 'properties'>('elements');
  const canvasRef = useRef<HTMLDivElement>(null);

  const tpl = templates[activeTpl];
  const selectedEl = elements.find(e => e.id === selected);

  /* ── Initialise default text elements when template changes ── */
  useEffect(() => {
    const base: El[] = [
      {
        id: uid(), kind: 'text', x: 60, y: 120, w: CARD_W - 120, h: 60, rotation: 0, opacity: 1, zIndex: 1,
        text: tpl.defaultHeading, fontSize: 36, fontFamily: 'Playfair Display', fontWeight: '700',
        color: tpl.textColor, textAlign: 'center',
      },
      {
        id: uid(), kind: 'text', x: 80, y: 240, w: CARD_W - 160, h: 80, rotation: 0, opacity: 1, zIndex: 2,
        text: tpl.defaultBody, fontSize: 18, fontFamily: 'Inter', fontWeight: '400',
        color: tpl.textColor, textAlign: 'center',
      },
      {
        id: uid(), kind: 'text', x: 80, y: 700, w: CARD_W - 160, h: 36, rotation: 0, opacity: 1, zIndex: 3,
        text: tpl.defaultFooter, fontSize: 14, fontFamily: 'Inter', fontWeight: '400',
        color: tpl.textColor, textAlign: 'center',
      },
    ];
    if (tpl.defaultDate) {
      base.push({
        id: uid(), kind: 'text', x: 80, y: 380, w: CARD_W - 160, h: 30, rotation: 0, opacity: 1, zIndex: 4,
        text: tpl.defaultDate, fontSize: 16, fontFamily: 'Inter', fontWeight: '600',
        color: tpl.accentColor, textAlign: 'center',
      });
    }
    if (tpl.defaultVenue) {
      base.push({
        id: uid(), kind: 'text', x: 80, y: 420, w: CARD_W - 160, h: 30, rotation: 0, opacity: 1, zIndex: 5,
        text: tpl.defaultVenue, fontSize: 15, fontFamily: 'Inter', fontWeight: '400',
        color: tpl.textColor, textAlign: 'center',
      });
    }
    setElements(base);
    setSelected(null);
  }, [activeTpl]);

  /* ── Element operations ── */
  function addText() {
    const el: El = {
      id: uid(), kind: 'text', x: 80, y: 300, w: CARD_W - 160, h: 40, rotation: 0, opacity: 1,
      zIndex: elements.length + 10, text: 'Your text here', fontSize: 20, fontFamily: 'Inter',
      fontWeight: '400', color: tpl.textColor, textAlign: 'center',
    };
    setElements(p => [...p, el]);
    setSelected(el.id);
  }

  function addSticker(emoji: string) {
    const el: El = {
      id: uid(), kind: 'sticker', x: 200, y: 350, w: 80, h: 80, rotation: 0, opacity: 1,
      zIndex: elements.length + 10, emoji, fontSize: 56,
    };
    setElements(p => [...p, el]);
    setSelected(el.id);
  }

  function addShape(shapeType: 'rect' | 'circle' | 'line') {
    const el: El = {
      id: uid(), kind: 'shape', x: 180, y: 360, w: 200, h: shapeType === 'line' ? 4 : 120,
      rotation: 0, opacity: 0.9, zIndex: elements.length + 10,
      shapeType, fill: tpl.accentColor, stroke: 'none', strokeWidth: 0,
    };
    setElements(p => [...p, el]);
    setSelected(el.id);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        const w = Math.min(300, CARD_W - 100);
        const h = w / ratio;
        const el: El = {
          id: uid(), kind: 'image', x: (CARD_W - w) / 2, y: (CARD_H - h) / 2,
          w, h, rotation: 0, opacity: 1, zIndex: elements.length + 10, src,
        };
        setElements(p => [...p, el]);
        setSelected(el.id);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function patchSelected(patch: Partial<El>) {
    if (!selected) return;
    setElements(p => p.map(e => e.id === selected ? { ...e, ...patch } : e));
  }

  function deleteEl(id: string) {
    setElements(p => p.filter(e => e.id !== id));
    if (selected === id) setSelected(null);
  }

  /* ── PNG export ── */
  async function handleDownload() {
    if (downloading || !canvasRef.current) return;
    setDownloading(true);

    const scale = 3;
    const W = CARD_W * scale;
    const H = CARD_H * scale;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    ctx.scale(scale, scale);

    // Background
    const bg = tpl.bg;
    if (bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient')) {
      // Draw a rough gradient approximation
      const stops = bg.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g) ?? ['#fff'];
      const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
      stops.forEach((c, i) => grad.addColorStop(i / Math.max(stops.length - 1, 1), c));
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bg;
    }
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // Draw elements sorted by zIndex
    const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
    for (const el of sorted) {
      ctx.save();
      ctx.globalAlpha = el.opacity;
      ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
      ctx.rotate((el.rotation * Math.PI) / 180);

      if (el.kind === 'text' && el.text) {
        ctx.font = `${el.fontWeight ?? '400'} ${el.fontSize ?? 20}px ${el.fontFamily ?? 'Inter'}`;
        ctx.fillStyle = el.color ?? '#000';
        ctx.textAlign = el.textAlign ?? 'center';
        ctx.textBaseline = 'top';
        const lines = el.text.split('\n');
        const lineH = (el.fontSize ?? 20) * 1.35;
        const totalH = lines.length * lineH;
        lines.forEach((line, li) => {
          ctx.fillText(line, 0, -totalH / 2 + li * lineH);
        });
      }

      if (el.kind === 'sticker' && el.emoji) {
        ctx.font = `${el.fontSize ?? 48}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.emoji, 0, 0);
      }

      if (el.kind === 'shape') {
        const hw = el.w / 2, hh = el.h / 2;
        ctx.fillStyle = el.fill ?? '#4F46E5';
        if (el.shapeType === 'rect') {
          ctx.beginPath();
          ctx.roundRect(-hw, -hh, el.w, el.h, 8);
          ctx.fill();
        } else if (el.shapeType === 'circle') {
          ctx.beginPath();
          ctx.ellipse(0, 0, hw, hh, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (el.shapeType === 'line') {
          ctx.strokeStyle = el.fill ?? '#4F46E5';
          ctx.lineWidth = el.strokeWidth ?? 3;
          ctx.beginPath();
          ctx.moveTo(-hw, 0);
          ctx.lineTo(hw, 0);
          ctx.stroke();
        }
      }

      if (el.kind === 'image' && el.src) {
        const img = new Image();
        img.src = el.src;
        await new Promise(r => { img.onload = r; img.onerror = r; });
        ctx.drawImage(img, -el.w / 2, -el.h / 2, el.w, el.h);
      }

      ctx.restore();
    }

    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${occasionName.toLowerCase().replace(/\s+/g, '-')}-card.png`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }, 'image/png');
  }

  const panelBtns = [
    { id: 'elements', label: 'Add', icon: '＋' },
    { id: 'stickers', label: 'Stickers', icon: '✨' },
    { id: 'shapes', label: 'Shapes', icon: '◻' },
    { id: 'properties', label: 'Properties', icon: '⚙' },
  ] as const;

  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full">

      {/* ── Left panel ── */}
      <div className="editor-panel flex flex-col xl:w-64 shrink-0 overflow-hidden">
        {/* Template selector */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Templates</p>
          <div className="flex flex-wrap gap-2">
            {templates.map((t, i) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTpl(i)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${activeTpl === i ? 'tpl-btn-active' : ''}`}
                style={activeTpl !== i ? { background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' } : {}}
              >
                {t.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Panel tab buttons */}
        <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
          {panelBtns.map(btn => (
            <button
              key={btn.id}
              onClick={() => setActivePanel(btn.id)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-all ${activePanel === btn.id ? 'tool-btn active' : 'tool-btn'}`}
            >
              <span style={{ fontSize: 16 }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 200 }}>
          {activePanel === 'elements' && (
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={addText}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                Add Text
              </motion.button>

              <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              <p className="text-xs font-bold uppercase tracking-widest mt-4 mb-2" style={{ color: 'var(--color-text-muted)' }}>Layers</p>
              <div className="space-y-1">
                {[...elements].reverse().map(el => (
                  <div
                    key={el.id}
                    onClick={() => { setSelected(el.id); setActivePanel('properties'); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer text-xs transition-all"
                    style={{
                      background: selected === el.id ? 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.1))' : 'transparent',
                      border: `1px solid ${selected === el.id ? 'rgba(79,70,229,0.25)' : 'transparent'}`,
                      color: 'var(--color-text)',
                    }}
                  >
                    <span style={{ fontSize: 12 }}>
                      {el.kind === 'text' ? 'T' : el.kind === 'image' ? '🖼' : el.kind === 'sticker' ? el.emoji : '◻'}
                    </span>
                    <span className="truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {el.kind === 'text' ? (el.text?.slice(0, 20) ?? 'Text') : el.kind === 'image' ? 'Image' : el.kind === 'sticker' ? 'Sticker' : 'Shape'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePanel === 'stickers' && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Tap to add</p>
              <div className="grid grid-cols-5 gap-2">
                {STICKERS.map(s => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onClick={() => { addSticker(s); setActivePanel('elements'); }}
                    className="aspect-square rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {activePanel === 'shapes' && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Add shape</p>
              {(['rect', 'circle', 'line'] as const).map(s => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { addShape(s); setActivePanel('properties'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  <span style={{ fontSize: 18 }}>{s === 'rect' ? '◻' : s === 'circle' ? '○' : '—'}</span>
                  {s === 'rect' ? 'Rectangle' : s === 'circle' ? 'Circle / Oval' : 'Line / Divider'}
                </motion.button>
              ))}
            </div>
          )}

          {activePanel === 'properties' && selectedEl && (
            <div className="space-y-4">
              {/* Text properties */}
              {selectedEl.kind === 'text' && (
                <>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Font</label>
                    <select
                      value={selectedEl.fontFamily}
                      onChange={e => patchSelected({ fontFamily: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Size: {selectedEl.fontSize}px</label>
                    <input type="range" min={10} max={120} value={selectedEl.fontSize ?? 20}
                      onChange={e => patchSelected({ fontSize: +e.target.value })} className="w-full accent-indigo-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Weight</label>
                    <div className="flex gap-1.5">
                      {(['400', '600', '700', '900'] as const).map(w => (
                        <button key={w} onClick={() => patchSelected({ fontWeight: w })}
                          className="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all"
                          style={{
                            fontWeight: w,
                            background: selectedEl.fontWeight === w ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'var(--color-surface-2)',
                            color: selectedEl.fontWeight === w ? '#fff' : 'var(--color-text)',
                            border: `1px solid ${selectedEl.fontWeight === w ? 'transparent' : 'var(--color-border)'}`,
                          }}
                        >
                          {w === '400' ? 'Reg' : w === '600' ? 'Semi' : w === '700' ? 'Bold' : 'Black'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Align</label>
                    <div className="flex gap-1.5">
                      {(['left', 'center', 'right'] as const).map(a => (
                        <button key={a} onClick={() => patchSelected({ textAlign: a })}
                          className="flex-1 rounded-lg py-1.5 text-xs font-semibold capitalize transition-all"
                          style={{
                            background: selectedEl.textAlign === a ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'var(--color-surface-2)',
                            color: selectedEl.textAlign === a ? '#fff' : 'var(--color-text)',
                            border: `1px solid ${selectedEl.textAlign === a ? 'transparent' : 'var(--color-border)'}`,
                          }}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Color</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {COLORS.map(c => (
                        <button key={c} onClick={() => patchSelected({ color: c })}
                          style={{ width: 24, height: 24, borderRadius: 6, background: c, border: `2px solid ${selectedEl.color === c ? '#4F46E5' : 'rgba(0,0,0,0.1)'}` }}
                        />
                      ))}
                    </div>
                    <input type="color" value={selectedEl.color ?? '#000000'}
                      onChange={e => patchSelected({ color: e.target.value })}
                      className="w-full h-8 rounded-lg cursor-pointer" />
                  </div>
                </>
              )}

              {/* Shape properties */}
              {selectedEl.kind === 'shape' && (
                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Fill color</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => patchSelected({ fill: c })}
                        style={{ width: 24, height: 24, borderRadius: 6, background: c, border: `2px solid ${selectedEl.fill === c ? '#4F46E5' : 'rgba(0,0,0,0.1)'}` }}
                      />
                    ))}
                  </div>
                  <input type="color" value={selectedEl.fill ?? '#4F46E5'}
                    onChange={e => patchSelected({ fill: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer" />
                </div>
              )}

              {/* Common */}
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Opacity: {Math.round(selectedEl.opacity * 100)}%</label>
                <input type="range" min={5} max={100} value={Math.round(selectedEl.opacity * 100)}
                  onChange={e => patchSelected({ opacity: +e.target.value / 100 })} className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--color-text-muted)' }}>Rotation: {Math.round(selectedEl.rotation)}°</label>
                <input type="range" min={-180} max={180} value={selectedEl.rotation}
                  onChange={e => patchSelected({ rotation: +e.target.value })} className="w-full accent-indigo-600" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                onClick={() => deleteEl(selectedEl.id)}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #dc2626, #9f1239)' }}
              >
                Delete Element
              </motion.button>
            </div>
          )}

          {activePanel === 'properties' && !selectedEl && (
            <p className="text-xs text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
              Select an element on the canvas to edit its properties
            </p>
          )}
        </div>
      </div>

      {/* ── Canvas area ── */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Canvas */}
        <div className="card-preview-wrap self-center" style={{ maxWidth: CARD_W, width: '100%' }}>
          <div
            ref={canvasRef}
            onClick={() => setSelected(null)}
            style={{
              position: 'relative',
              width: CARD_W,
              height: CARD_H,
              background: tpl.bg,
              overflow: 'hidden',
              maxWidth: '100%',
              aspectRatio: `${CARD_W} / ${CARD_H}`,
            }}
          >
            {/* Template pattern */}
            {tpl.pattern && (
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: tpl.pattern, backgroundSize: '24px 24px', opacity: 0.7 }} />
            )}

            {/* Elements */}
            {elements.map(el => (
              <CanvasElement
                key={el.id}
                el={el}
                selected={selected === el.id}
                onSelect={() => { setSelected(el.id); setActivePanel('properties'); }}
                onChange={patch => setElements(p => p.map(e => e.id === el.id ? { ...e, ...patch } : e))}
                onDelete={() => deleteEl(el.id)}
              />
            ))}
          </div>
        </div>

        {/* Download button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleDownload}
            disabled={downloading}
            whileHover={!downloading ? { scale: 1.04 } : {}}
            whileTap={!downloading ? { scale: 0.97 } : {}}
            className="relative overflow-hidden px-10 py-4 rounded-2xl font-bold text-white text-lg"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 8px 32px rgba(79,70,229,0.35)', minWidth: 240 }}
          >
            <AnimatePresence mode="wait">
              {downloaded ? (
                <motion.span key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  Downloaded!
                </motion.span>
              ) : downloading ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-6.22-8.56"/>
                  </svg>
                  Preparing…
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Free PNG
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
          1800 × 2520 px · No watermark · No sign-up
        </p>
      </div>
    </div>
  );
}
