import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Live Preview',
    desc: 'Every keystroke updates your card in real time. What you see is exactly what you get.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: 'Designer Templates',
    desc: 'Floral, bold, elegant, minimal — crafted by professional designers for every taste.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    title: 'Free PNG Download',
    desc: 'High-res 3× retina quality. No watermark. No credit card. No hidden costs. Ever.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Zero Sign-Up',
    desc: 'Open → create → download. Not even an email address required. Nothing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: '18+ Occasions',
    desc: 'Birthday, Eid, Diwali, Wedding, Halloween, Diwali and a dozen more cultural celebrations.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Mobile-First',
    desc: 'Designed for phone users — create a beautiful card from any device, anywhere.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24" style={{ background: 'var(--color-surface-2)' }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25 }}
          className="text-center mb-16"
        >
          <h2
            className="font-black tracking-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.1 }}
          >
            Why CardCraftly?
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            We beat every paid alternative where it matters most
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.07, type: 'spring', damping: 25, stiffness: 100 }}
              whileHover={{ y: -6, transition: { type: 'spring', damping: 20, stiffness: 200 } }}
              className="rounded-2xl p-7 cursor-default"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.1))', color: '#4F46E5' }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold mb-2 text-base" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
