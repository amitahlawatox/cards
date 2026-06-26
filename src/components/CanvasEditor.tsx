import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CardTemplate } from '../lib/occasions';
import {
  EMPTY_SHARE_META,
  decodeInvitePayload,
  encodeInvitePayload,
  type EditorElement,
  type SharedInviteMeta,
  type SharedInvitePayload,
} from '../lib/editor-share';

type ElKind = EditorElement['kind'];

interface Props {
  templates: CardTemplate[];
  occasionName: string;
  occasionSlug: string;
}

const uid = () => Math.random().toString(36).slice(2, 9);
const CARD_W = 600;
const CARD_H = 840;
const FONTS = ['Inter', 'Dancing Script', 'Playfair Display', 'Lora', 'Pacifico', 'Great Vibes'];
const STICKERS = ['🎉', '🎊', '🎂', '🌸', '💖', '⭐', '🌟', '🦋', '🌈', '🎈', '🍾', '🥂', '💐', '🎀', '✨', '🔥', '💫', '🌙', '☀️', '🎵'];
const COLORS = ['#FFFFFF', '#F0EFFE', '#1A1340', '#4F46E5', '#7C3AED', '#EC4899', '#059669', '#DC2626', '#F59E0B', '#000000'];

function makeDefaultElements(template: CardTemplate): EditorElement[] {
  const base: EditorElement[] = [
    {
      id: uid(),
      kind: 'text',
      x: 60,
      y: 120,
      w: CARD_W - 120,
      h: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 1,
      text: template.defaultHeading,
      fontSize: 36,
      fontFamily: 'Playfair Display',
      fontWeight: '700',
      color: template.textColor,
      textAlign: 'center',
    },
    {
      id: uid(),
      kind: 'text',
      x: 80,
      y: 240,
      w: CARD_W - 160,
      h: 80,
      rotation: 0,
      opacity: 1,
      zIndex: 2,
      text: template.defaultBody,
      fontSize: 18,
      fontFamily: 'Inter',
      fontWeight: '400',
      color: template.textColor,
      textAlign: 'center',
    },
    {
      id: uid(),
      kind: 'text',
      x: 80,
      y: 700,
      w: CARD_W - 160,
      h: 36,
      rotation: 0,
      opacity: 1,
      zIndex: 3,
      text: template.defaultFooter,
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: '400',
      color: template.textColor,
      textAlign: 'center',
    },
  ];

  if (template.defaultDate) {
    base.push({
      id: uid(),
      kind: 'text',
      x: 80,
      y: 380,
      w: CARD_W - 160,
      h: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 4,
      text: template.defaultDate,
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: '600',
      color: template.accentColor,
      textAlign: 'center',
    });
  }

  if (template.defaultVenue) {
    base.push({
      id: uid(),
      kind: 'text',
      x: 80,
      y: 420,
      w: CARD_W - 160,
      h: 30,
      rotation: 0,
      opacity: 1,
      zIndex: 5,
      text: template.defaultVenue,
      fontSize: 15,
      fontFamily: 'Inter',
      fontWeight: '400',
      color: template.textColor,
      textAlign: 'center',
    });
  }

  return base;
}

async function renderCardToCanvas(template: CardTemplate, elements: EditorElement[], scale = 3) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W * scale;
  canvas.height = CARD_H * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);

  if (template.bg.startsWith('linear-gradient') || template.bg.startsWith('radial-gradient')) {
    const stops = template.bg.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g) ?? ['#fff'];
    const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
    stops.forEach((color, index) => grad.addColorStop(index / Math.max(stops.length - 1, 1), color));
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = template.bg;
  }
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  for (const element of sorted) {
    ctx.save();
    ctx.globalAlpha = element.opacity;
    ctx.translate(element.x + element.w / 2, element.y + element.h / 2);
    ctx.rotate((element.rotation * Math.PI) / 180);

    if (element.kind === 'text' && element.text) {
      ctx.font = `${element.fontWeight ?? '400'} ${element.fontSize ?? 20}px ${element.fontFamily ?? 'Inter'}`;
      ctx.fillStyle = element.color ?? '#000';
      ctx.textAlign = element.textAlign ?? 'center';
      ctx.textBaseline = 'top';
      const lines = element.text.split('\n');
      const lineH = (element.fontSize ?? 20) * 1.35;
      const totalH = lines.length * lineH;
      lines.forEach((line, index) => {
        ctx.fillText(line, 0, -totalH / 2 + index * lineH);
      });
    }

    if (element.kind === 'sticker' && element.emoji) {
      ctx.font = `${element.fontSize ?? 48}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.emoji, 0, 0);
    }

    if (element.kind === 'shape') {
      const hw = element.w / 2;
      const hh = element.h / 2;
      ctx.fillStyle = element.fill ?? '#4F46E5';

      if (element.shapeType === 'rect') {
        ctx.beginPath();
        ctx.roundRect(-hw, -hh, element.w, element.h, 8);
        ctx.fill();
      } else if (element.shapeType === 'circle') {
        ctx.beginPath();
        ctx.ellipse(0, 0, hw, hh, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (element.shapeType === 'line') {
        ctx.strokeStyle = element.fill ?? '#4F46E5';
        ctx.lineWidth = element.strokeWidth ?? 3;
        ctx.beginPath();
        ctx.moveTo(-hw, 0);
        ctx.lineTo(hw, 0);
        ctx.stroke();
      }
    }

    if (element.kind === 'image' && element.src) {
      const img = new Image();
      img.src = element.src;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
      ctx.drawImage(img, -element.w / 2, -element.h / 2, element.w, element.h);
    }

    ctx.restore();
  }

  return canvas;
}

function getDraftStorageKey(occasionSlug: string) {
  return `bcs-draft:${occasionSlug}`;
}

function slugToTitle(value: string) {
  return value.replace(/-/g, ' ');
}

function CanvasElement({
  el,
  selected,
  onSelect,
  onChange,
  onDelete,
}: {
  el: EditorElement;
  selected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<EditorElement>) => void;
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
      {el.kind === 'text' && (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChange({ text: e.currentTarget.textContent ?? '' })}
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
        <img src={el.src} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      )}

      {el.kind === 'sticker' && <div style={{ fontSize: el.fontSize ?? 48, lineHeight: 1, textAlign: 'center' }}>{el.emoji}</div>}

      {el.kind === 'shape' && (
        <svg width={el.w} height={el.h} viewBox={`0 0 ${el.w} ${el.h}`} style={{ display: 'block' }}>
          {el.shapeType === 'rect' && (
            <rect x={1} y={1} width={el.w - 2} height={el.h - 2} rx={8} fill={el.fill ?? '#4F46E5'} stroke={el.stroke ?? 'none'} strokeWidth={el.strokeWidth ?? 0} />
          )}
          {el.shapeType === 'circle' && (
            <ellipse cx={el.w / 2} cy={el.h / 2} rx={el.w / 2 - 1} ry={el.h / 2 - 1} fill={el.fill ?? '#EC4899'} stroke={el.stroke ?? 'none'} strokeWidth={el.strokeWidth ?? 0} />
          )}
          {el.shapeType === 'line' && (
            <line x1={0} y1={el.h / 2} x2={el.w} y2={el.h / 2} stroke={el.fill ?? '#4F46E5'} strokeWidth={el.strokeWidth ?? 3} />
          )}
        </svg>
      )}

      {selected && (
        <>
          <div
            onPointerDown={handleRotateDown}
            style={{
              position: 'absolute',
              top: -28,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#4F46E5',
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
          </div>
          <div
            onPointerDown={handleResizeDown}
            style={{ position: 'absolute', bottom: -6, right: -6, width: 14, height: 14, borderRadius: 3, background: '#4F46E5', cursor: 'se-resize' }}
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              position: 'absolute',
              top: -28,
              right: 0,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#DC2626',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            ×
          </div>
        </>
      )}
    </div>
  );
}

export default function CanvasEditor({ templates, occasionName, occasionSlug }: Props) {
  const [activeTpl, setActiveTpl] = useState(0);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [pdfState, setPdfState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [pngState, setPngState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'busy'>('idle');
  const [activePanel, setActivePanel] = useState<'elements' | 'stickers' | 'shapes' | 'properties' | 'sharing'>('elements');
  const [shareMeta, setShareMeta] = useState<SharedInviteMeta>(EMPTY_SHARE_META);
  const [draftRecovered, setDraftRecovered] = useState(false);

  const skipTemplateReset = useRef(false);
  const hasBootstrapped = useRef(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const template = templates[activeTpl];
  const selectedEl = elements.find((element) => element.id === selected);
  const draftKey = useMemo(() => getDraftStorageKey(occasionSlug), [occasionSlug]);

  useEffect(() => {
    if (skipTemplateReset.current) {
      skipTemplateReset.current = false;
      return;
    }
    setElements(makeDefaultElements(template));
    setSelected(null);
  }, [activeTpl, template]);

  useEffect(() => {
    if (hasBootstrapped.current) return;

    const params = new URLSearchParams(window.location.search);
    const shared = params.get('design');
    if (shared) {
      const payload = decodeInvitePayload(shared);
      if (payload && payload.occasionSlug === occasionSlug) {
        skipTemplateReset.current = true;
        setActiveTpl(Math.min(payload.activeTemplate, templates.length - 1));
        setElements(payload.elements);
        setShareMeta(payload.meta ?? EMPTY_SHARE_META);
        hasBootstrapped.current = true;
        return;
      }
    }

    const rawDraft = window.localStorage.getItem(draftKey);
    if (rawDraft) {
      try {
        const payload = JSON.parse(rawDraft) as SharedInvitePayload;
        if (payload?.occasionSlug === occasionSlug && Array.isArray(payload.elements)) {
          skipTemplateReset.current = true;
          setActiveTpl(Math.min(payload.activeTemplate, templates.length - 1));
          setElements(payload.elements);
          setShareMeta(payload.meta ?? EMPTY_SHARE_META);
          setDraftRecovered(true);
          hasBootstrapped.current = true;
          return;
        }
      } catch {
        window.localStorage.removeItem(draftKey);
      }
    }

    hasBootstrapped.current = true;
  }, [draftKey, occasionSlug, templates.length]);

  useEffect(() => {
    if (!hasBootstrapped.current || elements.length === 0) return;

    const payload: SharedInvitePayload = {
      version: 1,
      occasionSlug,
      occasionName,
      activeTemplate: activeTpl,
      elements,
      meta: shareMeta,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(draftKey, JSON.stringify(payload));
  }, [activeTpl, draftKey, elements, occasionName, occasionSlug, shareMeta]);

  function resetToTemplate() {
    window.localStorage.removeItem(draftKey);
    setDraftRecovered(false);
    setShareMeta(EMPTY_SHARE_META);
    setElements(makeDefaultElements(template));
    setSelected(null);
  }

  function addText() {
    const element: EditorElement = {
      id: uid(),
      kind: 'text',
      x: 80,
      y: 300,
      w: CARD_W - 160,
      h: 40,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length + 10,
      text: 'Your text here',
      fontSize: 20,
      fontFamily: 'Inter',
      fontWeight: '400',
      color: template.textColor,
      textAlign: 'center',
    };
    setElements((prev) => [...prev, element]);
    setSelected(element.id);
  }

  function addSticker(emoji: string) {
    const element: EditorElement = {
      id: uid(),
      kind: 'sticker',
      x: 200,
      y: 350,
      w: 80,
      h: 80,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length + 10,
      emoji,
      fontSize: 56,
    };
    setElements((prev) => [...prev, element]);
    setSelected(element.id);
  }

  function addShape(shapeType: 'rect' | 'circle' | 'line') {
    const element: EditorElement = {
      id: uid(),
      kind: 'shape',
      x: 180,
      y: 360,
      w: 200,
      h: shapeType === 'line' ? 4 : 120,
      rotation: 0,
      opacity: 0.9,
      zIndex: elements.length + 10,
      shapeType,
      fill: template.accentColor,
      stroke: 'none',
      strokeWidth: 0,
    };
    setElements((prev) => [...prev, element]);
    setSelected(element.id);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        const w = Math.min(300, CARD_W - 100);
        const h = w / ratio;
        const element: EditorElement = {
          id: uid(),
          kind: 'image',
          x: (CARD_W - w) / 2,
          y: (CARD_H - h) / 2,
          w,
          h,
          rotation: 0,
          opacity: 1,
          zIndex: elements.length + 10,
          src,
        };
        setElements((prev) => [...prev, element]);
        setSelected(element.id);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function patchSelected(patch: Partial<EditorElement>) {
    if (!selected) return;
    setElements((prev) => prev.map((element) => (element.id === selected ? { ...element, ...patch } : element)));
  }

  function deleteEl(id: string) {
    setElements((prev) => prev.filter((element) => element.id !== id));
    if (selected === id) setSelected(null);
  }

  function updateShareMetaField<K extends keyof SharedInviteMeta>(key: K, value: SharedInviteMeta[K]) {
    setShareMeta((prev) => ({ ...prev, [key]: value }));
  }

  async function handleDownloadPng() {
    if (pngState === 'busy') return;
    setPngState('busy');
    const canvas = await renderCardToCanvas(template, elements, 3);

    canvas.toBlob((blob) => {
      if (!blob) {
        setPngState('idle');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${occasionSlug}-card.png`;
      a.click();
      URL.revokeObjectURL(url);
      setPngState('done');
      setDownloaded(true);
      window.setTimeout(() => {
        setPngState('idle');
        setDownloaded(false);
      }, 2200);
    }, 'image/png');
  }

  async function handleDownloadPdf() {
    if (pdfState === 'busy') return;
    setPdfState('busy');
    const [{ jsPDF }, canvas] = await Promise.all([import('jspdf'), renderCardToCanvas(template, elements, 3)]);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [CARD_W, CARD_H],
    });
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, CARD_W, CARD_H);
    doc.save(`${occasionSlug}-card.pdf`);
    setPdfState('done');
    window.setTimeout(() => setPdfState('idle'), 2200);
  }

  async function handleCopyShareLink() {
    setShareState('busy');
    const payload: SharedInvitePayload = {
      version: 1,
      occasionSlug,
      occasionName,
      activeTemplate: activeTpl,
      elements,
      meta: shareMeta,
      updatedAt: new Date().toISOString(),
    };
    const encoded = encodeInvitePayload(payload);
    const url = `${window.location.origin}/invite/${occasionSlug}/?design=${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      setShareState('copied');
      window.setTimeout(() => setShareState('idle'), 2200);
    } catch {
      window.prompt('Copy this hosted invite link', url);
      setShareState('idle');
    }
  }

  function openHostedInvite() {
    const payload: SharedInvitePayload = {
      version: 1,
      occasionSlug,
      occasionName,
      activeTemplate: activeTpl,
      elements,
      meta: shareMeta,
      updatedAt: new Date().toISOString(),
    };
    const encoded = encodeInvitePayload(payload);
    window.open(`/invite/${occasionSlug}/?design=${encoded}`, '_blank', 'noopener,noreferrer');
  }

  const panelBtns = [
    { id: 'elements', label: 'Add', icon: '＋' },
    { id: 'stickers', label: 'Stickers', icon: '✨' },
    { id: 'shapes', label: 'Shapes', icon: '◻' },
    { id: 'properties', label: 'Properties', icon: '⚙' },
    { id: 'sharing', label: 'Share', icon: '↗' },
  ] as const;

  return (
    <div className="flex w-full flex-col gap-5 xl:flex-row">
      <div className="editor-panel flex shrink-0 flex-col overflow-hidden xl:w-72">
        <div className="border-b p-4" style={{ borderColor: 'var(--color-border)' }}>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Templates
            </p>
            <button onClick={resetToTemplate} className="text-xs font-semibold" style={{ color: '#ea580c' }}>
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {templates.map((tplOption, index) => (
              <motion.button
                key={tplOption.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTpl(index)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${activeTpl === index ? 'tpl-btn-active' : ''}`}
                style={activeTpl !== index ? { background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' } : {}}
              >
                {tplOption.name}
              </motion.button>
            ))}
          </div>
        </div>

        {draftRecovered && (
          <div className="border-b px-4 py-3 text-xs leading-relaxed" style={{ borderColor: 'var(--color-border)', background: 'rgba(79,70,229,0.06)', color: 'var(--color-text-muted)' }}>
            Recent draft recovered for {slugToTitle(occasionSlug)}. Your latest local changes are loaded automatically.
          </div>
        )}

        <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
          {panelBtns.map((btn) => (
            <button key={btn.id} onClick={() => setActivePanel(btn.id)} className={`tool-btn flex-1 py-2.5 text-xs font-semibold transition-all ${activePanel === btn.id ? 'active' : ''}`}>
              <span style={{ fontSize: 16 }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 240 }}>
          {activePanel === 'elements' && (
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={addText}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                Add Text
              </motion.button>

              <label
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              <div className="rounded-2xl p-3 text-xs leading-relaxed" style={{ background: 'rgba(234,88,12,0.06)', color: 'var(--color-text-muted)' }}>
                Photo cards work best when you upload one main image and place text around it. Large uploaded images will also make hosted invite links longer.
              </div>

              <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                Layers
              </p>
              <div className="space-y-1">
                {[...elements].reverse().map((element) => (
                  <div
                    key={element.id}
                    onClick={() => {
                      setSelected(element.id);
                      setActivePanel('properties');
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-all"
                    style={{
                      background: selected === element.id ? 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.1))' : 'transparent',
                      border: `1px solid ${selected === element.id ? 'rgba(79,70,229,0.25)' : 'transparent'}`,
                      color: 'var(--color-text)',
                    }}
                  >
                    <span style={{ fontSize: 12 }}>
                      {element.kind === 'text' ? 'T' : element.kind === 'image' ? '🖼' : element.kind === 'sticker' ? element.emoji : '◻'}
                    </span>
                    <span className="truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {element.kind === 'text' ? (element.text?.slice(0, 24) ?? 'Text') : element.kind === 'image' ? 'Photo layer' : element.kind === 'sticker' ? 'Sticker' : 'Shape'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePanel === 'stickers' && (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                Tap to add
              </p>
              <div className="grid grid-cols-5 gap-2">
                {STICKERS.map((sticker) => (
                  <motion.button
                    key={sticker}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      addSticker(sticker);
                      setActivePanel('elements');
                    }}
                    className="aspect-square rounded-xl text-2xl"
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                  >
                    {sticker}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {activePanel === 'shapes' && (
            <div className="space-y-2">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                Add shape
              </p>
              {(['rect', 'circle', 'line'] as const).map((shape) => (
                <motion.button
                  key={shape}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    addShape(shape);
                    setActivePanel('properties');
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                >
                  {shape === 'rect' ? 'Rectangle' : shape === 'circle' ? 'Circle / Oval' : 'Line / Divider'}
                </motion.button>
              ))}
            </div>
          )}

          {activePanel === 'properties' && selectedEl && (
            <div className="space-y-4">
              {selectedEl.kind === 'text' && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                      Font
                    </label>
                    <select value={selectedEl.fontFamily} onChange={(e) => patchSelected({ fontFamily: e.target.value })} className="w-full rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                      {FONTS.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                      Size: {selectedEl.fontSize}px
                    </label>
                    <input type="range" min={10} max={120} value={selectedEl.fontSize ?? 20} onChange={(e) => patchSelected({ fontSize: +e.target.value })} className="w-full accent-indigo-600" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                      Weight
                    </label>
                    <div className="flex gap-1.5">
                      {(['400', '600', '700', '900'] as const).map((weight) => (
                        <button
                          key={weight}
                          onClick={() => patchSelected({ fontWeight: weight })}
                          className="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all"
                          style={{
                            fontWeight: weight,
                            background: selectedEl.fontWeight === weight ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'var(--color-surface-2)',
                            color: selectedEl.fontWeight === weight ? '#fff' : 'var(--color-text)',
                            border: `1px solid ${selectedEl.fontWeight === weight ? 'transparent' : 'var(--color-border)'}`,
                          }}
                        >
                          {weight === '400' ? 'Reg' : weight === '600' ? 'Semi' : weight === '700' ? 'Bold' : 'Black'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                      Align
                    </label>
                    <div className="flex gap-1.5">
                      {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() => patchSelected({ textAlign: align })}
                          className="flex-1 rounded-lg py-1.5 text-xs font-semibold capitalize transition-all"
                          style={{
                            background: selectedEl.textAlign === align ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'var(--color-surface-2)',
                            color: selectedEl.textAlign === align ? '#fff' : 'var(--color-text)',
                            border: `1px solid ${selectedEl.textAlign === align ? 'transparent' : 'var(--color-border)'}`,
                          }}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                      Color
                    </label>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {COLORS.map((color) => (
                        <button key={color} onClick={() => patchSelected({ color })} style={{ width: 24, height: 24, borderRadius: 6, background: color, border: `2px solid ${selectedEl.color === color ? '#4F46E5' : 'rgba(0,0,0,0.1)'}` }} />
                      ))}
                    </div>
                    <input type="color" value={selectedEl.color ?? '#000000'} onChange={(e) => patchSelected({ color: e.target.value })} className="h-8 w-full cursor-pointer rounded-lg" />
                  </div>
                </>
              )}

              {selectedEl.kind === 'shape' && (
                <div>
                  <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    Fill color
                  </label>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {COLORS.map((color) => (
                      <button key={color} onClick={() => patchSelected({ fill: color })} style={{ width: 24, height: 24, borderRadius: 6, background: color, border: `2px solid ${selectedEl.fill === color ? '#4F46E5' : 'rgba(0,0,0,0.1)'}` }} />
                    ))}
                  </div>
                  <input type="color" value={selectedEl.fill ?? '#4F46E5'} onChange={(e) => patchSelected({ fill: e.target.value })} className="h-8 w-full cursor-pointer rounded-lg" />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                  Opacity: {Math.round(selectedEl.opacity * 100)}%
                </label>
                <input type="range" min={5} max={100} value={Math.round(selectedEl.opacity * 100)} onChange={(e) => patchSelected({ opacity: +e.target.value / 100 })} className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                  Rotation: {Math.round(selectedEl.rotation)}°
                </label>
                <input type="range" min={-180} max={180} value={selectedEl.rotation} onChange={(e) => patchSelected({ rotation: +e.target.value })} className="w-full accent-indigo-600" />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} onClick={() => deleteEl(selectedEl.id)} className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition-all" style={{ background: 'linear-gradient(135deg, #dc2626, #9f1239)' }}>
                Delete Element
              </motion.button>
            </div>
          )}

          {activePanel === 'properties' && !selectedEl && <p className="py-8 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>Select an element on the canvas to edit it.</p>}

          {activePanel === 'sharing' && (
            <div className="space-y-4">
              <div className="rounded-2xl p-3 text-xs leading-relaxed" style={{ background: 'rgba(79,70,229,0.06)', color: 'var(--color-text-muted)' }}>
                Hosted invite links work without a backend by storing the design in the URL. They are perfect for text, WhatsApp, and fast guest sharing.
              </div>

              <Field label="Organizer / Host Name">
                <input value={shareMeta.hostName} onChange={(e) => updateShareMetaField('hostName', e.target.value)} className="editor-input" placeholder="e.g. Sharma Family" />
              </Field>
              <Field label="RSVP Email">
                <input value={shareMeta.hostEmail} onChange={(e) => updateShareMetaField('hostEmail', e.target.value)} className="editor-input" placeholder="e.g. hello@example.com" />
              </Field>
              <Field label="RSVP Phone or WhatsApp">
                <input value={shareMeta.hostPhone} onChange={(e) => updateShareMetaField('hostPhone', e.target.value)} className="editor-input" placeholder="e.g. +91 98xxxxxxx" />
              </Field>
              <Field label="RSVP By">
                <input value={shareMeta.rsvpBy} onChange={(e) => updateShareMetaField('rsvpBy', e.target.value)} className="editor-input" placeholder="e.g. RSVP by 12 July" />
              </Field>
              <Field label="Dress Code">
                <input value={shareMeta.dressCode} onChange={(e) => updateShareMetaField('dressCode', e.target.value)} className="editor-input" placeholder="e.g. Festive traditional wear" />
              </Field>
              <Field label="Schedule / Highlights">
                <textarea value={shareMeta.schedule} onChange={(e) => updateShareMetaField('schedule', e.target.value)} className="editor-input min-h-[84px]" placeholder="e.g. 6 PM welcome, 7 PM dinner, 8 PM fireworks" />
              </Field>
              <Field label="Extra Notes">
                <textarea value={shareMeta.notes} onChange={(e) => updateShareMetaField('notes', e.target.value)} className="editor-input min-h-[84px]" placeholder="e.g. Parking at rear gate, kids welcome, bring printed pass" />
              </Field>

              <div className="grid gap-2">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopyShareLink} className="w-full rounded-2xl px-4 py-3 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
                  {shareState === 'copied' ? 'Hosted Link Copied' : shareState === 'busy' ? 'Preparing Link...' : 'Copy Hosted Invite Link'}
                </motion.button>
                <button onClick={openHostedInvite} className="w-full rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                  Preview Hosted Invite
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              Live Preview
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Drafts save automatically in this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button onClick={handleDownloadPng} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="rounded-xl px-4 py-2 text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
              {pngState === 'busy' ? 'Preparing PNG...' : pngState === 'done' ? 'PNG Ready' : 'Download PNG'}
            </motion.button>
            <motion.button onClick={handleDownloadPdf} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
              {pdfState === 'busy' ? 'Preparing PDF...' : pdfState === 'done' ? 'PDF Ready' : 'Download PDF'}
            </motion.button>
          </div>
        </div>

        <div className="card-preview-wrap self-center" style={{ maxWidth: CARD_W, width: '100%' }}>
          <div
            ref={canvasRef}
            onClick={() => setSelected(null)}
            style={{ position: 'relative', width: CARD_W, height: CARD_H, background: template.bg, overflow: 'hidden', maxWidth: '100%', aspectRatio: `${CARD_W} / ${CARD_H}` }}
          >
            {template.pattern && <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: template.pattern, backgroundSize: '24px 24px', opacity: 0.7 }} />}
            {elements.map((element) => (
              <CanvasElement
                key={element.id}
                el={element}
                selected={selected === element.id}
                onSelect={() => {
                  setSelected(element.id);
                  setActivePanel('properties');
                }}
                onChange={(patch) => setElements((prev) => prev.map((entry) => (entry.id === element.id ? { ...entry, ...patch } : entry)))}
                onDelete={() => deleteEl(element.id)}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {downloaded ? 'Your latest PNG was generated successfully.' : 'High-resolution PNG and print-ready PDF export are both available.'}
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
