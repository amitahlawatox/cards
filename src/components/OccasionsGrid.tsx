import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Occasion } from '../lib/occasions';

function OccasionCard({ occ, index }: { occ: Occasion; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-70, 70], [7, -7]);
  const rotY = useTransform(mx, [-70, 70], [-7, 7]);
  const rx = useSpring(rotX, { stiffness: 160, damping: 22 });
  const ry = useSpring(rotY, { stiffness: 160, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.a
      href={`/make/${occ.slug}/`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px', amount: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', damping: 26, stiffness: 100 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl p-6 text-center cursor-pointer"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', overflow: 'hidden' }}
    >
      {/* Gradient hover shimmer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(124,58,237,0.06) 100%)' }}
      />
      {/* Top gradient line on hover */}
      <div
        className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #4F46E560, #7C3AED60, transparent)' }}
      />

      <div className="relative text-4xl" style={{ transform: 'translateZ(16px)' }}>{occ.emoji}</div>
      <h3 className="relative font-bold text-sm" style={{ color: 'var(--color-text)', transform: 'translateZ(10px)' }}>{occ.name}</h3>
      <p className="relative text-xs" style={{ color: 'var(--color-text-muted)', transform: 'translateZ(6px)' }}>
        {occ.templates.length} free templates
      </p>
    </motion.a>
  );
}

interface Props { occasions: Occasion[] }

export default function OccasionsGrid({ occasions }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 25 }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest badge-warm"
        >
          All Occasions
        </div>
        <h2
          className="font-black tracking-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--color-text)', lineHeight: 1.1 }}
        >
          Every celebration,<br />covered.
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          18+ occasions · 100+ templates · always free
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" style={{ perspective: 1000 }}>
        {occasions.map((occ, i) => (
          <OccasionCard key={occ.slug} occ={occ} index={i} />
        ))}
      </div>
    </section>
  );
}
