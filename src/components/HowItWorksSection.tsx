import { motion } from 'framer-motion';

const STEPS = [
  {
    n: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Pick a Template',
    desc: 'Choose your occasion from 18+ categories and select from beautiful pre-designed templates.',
  },
  {
    n: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
    ),
    title: 'Customize Text',
    desc: 'Edit heading, message, date, venue, and footer. See live changes instantly in the preview.',
  },
  {
    n: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    title: 'Download Free',
    desc: 'Click download — get a crisp 3× retina PNG. No watermark, no subscription, no catch.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25 }}
          className="text-center mb-20"
        >
          <h2
            className="font-black tracking-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.1 }}
          >
            Ready in 3 steps
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            No design skills needed. No account required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 relative">
          {/* Connecting dashes */}
          <div
            className="hidden sm:block absolute top-10 pointer-events-none"
            style={{ left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(234,88,12,0.25), rgba(236,72,153,0.25), transparent)' }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, type: 'spring', damping: 24, stiffness: 100 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(234,88,12,0.1), rgba(236,72,153,0.1))',
                    border: '1px solid rgba(234,88,12,0.18)',
                    color: '#ea580c',
                  }}
                >
                  {step.icon}
                </motion.div>
                <div
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #ec4899)' }}
                >
                  {step.n}
                </div>
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', damping: 25 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/occasions/"
            whileHover={{ scale: 1.04, opacity: 0.92 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-white font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #ea580c, #ec4899)', boxShadow: '0 8px 32px rgba(234,88,12,0.3)' }}
          >
            Start Creating — It's Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
