import { motion } from 'framer-motion';

const CARDS = [
  { bg: 'linear-gradient(160deg,#fce7f3,#fdf2f8,#f3e8ff)', label: '🎂 Birthday',    rotate: -10, left: '4%',  top: '5%'  },
  { bg: 'linear-gradient(135deg,#fdf6e3,#fef9f0,#fffbeb)', label: '💍 Wedding',     rotate:  7,  left: '52%', top: '0%'  },
  { bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',          label: '👶 Baby Shower', rotate: -4,  left: '28%', top: '52%' },
  { bg: 'linear-gradient(135deg,#1e3a8a,#1e40af)',          label: '🎓 Graduation',  rotate:  11, left: '70%', top: '38%' },
  { bg: 'linear-gradient(135deg,#14532d,#166534)',           label: '🎄 Christmas',   rotate: -7,  left: '76%', top: '8%'  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 24, stiffness: 110 } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Dark warm bg */}
      <div className="absolute inset-0" style={{ background: '#0C0705' }} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '-20%', left: '15%', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '-10%', right: '5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.09, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

          {/* ── Text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full text-sm font-medium"
              style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', color: '#818cf8' }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              100% Free · No Watermark · No Sign-Up
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-black leading-[0.88] tracking-tight text-white mb-8"
              style={{ fontSize: 'clamp(3.2rem, 8vw, 5.5rem)' }}
            >
              Make cards<br />
              <span style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #ec4899 100%)',
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-x 5s ease infinite',
              }}>
                worth sharing
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-xl leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              Design stunning invitations & greeting cards for any occasion. Pick a template, personalize, download free — instantly.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14">
              <motion.a
                href="/occasions/"
                whileHover={{ scale: 1.04, opacity: 0.92 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden px-8 py-4 rounded-2xl text-white font-bold text-lg text-center"
                style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
              >
                <span className="relative z-10">Browse Occasions →</span>
              </motion.a>
              <motion.a
                href="/make/birthday/"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-white font-bold text-lg text-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              >
                Try Birthday Card
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-10 justify-center lg:justify-start">
              {[['18+', 'Occasions'], ['100+', 'Templates'], ['∞', 'Downloads']].map(([val, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-black text-white" style={{ fontSize: '1.9rem', lineHeight: 1 }}>{val}</div>
                  <div className="text-xs uppercase mt-1.5" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Floating card mockups ── */}
          <div className="flex-1 relative w-full hidden lg:block" style={{ height: 480 }}>
            {CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotate: card.rotate, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.14, type: 'spring', damping: 20, stiffness: 80 }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 20, y: -10 }}
                className="absolute cursor-pointer overflow-hidden"
                style={{
                  background: card.bg,
                  left: card.left,
                  top: card.top,
                  width: 148,
                  height: 210,
                  borderRadius: 20,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.28) 0%, transparent 60%)' }} />
                <div className="absolute inset-x-3 bottom-3">
                  <div className="text-xs font-semibold" style={{ color: 'rgba(0,0,0,0.45)' }}>{card.label}</div>
                </div>
              </motion.div>
            ))}
            <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.16)' }}>Scroll</div>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)' }} />
      </motion.div>
    </section>
  );
}
