import { motion } from 'framer-motion'
import { generateFlavorText } from '../../data/titles'

export default function ResultCard({ personality, mbtiType }) {
  const flavorText = generateFlavorText(mbtiType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="maze-card maze-glow-gold p-6 mx-4 max-w-md w-full relative overflow-hidden"
    >
      {/* Top glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-maze-gold/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 text-center mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-maze-muted text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
        >
          Personality Type
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
          className="text-5xl font-bold text-gradient-gold text-glow-gold mb-2 font-[family-name:var(--font-display)] tracking-wider"
        >
          {mbtiType}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-maze-gold text-lg font-medium tracking-wide"
        >
          {personality.title}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 bg-maze-950/50 rounded-lg p-4 mb-5 border border-maze-700"
      >
        <p className="text-maze-text text-sm leading-relaxed italic font-[family-name:var(--font-serif)]">
          "{flavorText}"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 flex items-center justify-center gap-3 text-xs"
      >
        <span className="text-maze-muted">稀有度</span>
        <span className="text-maze-teal font-medium">{personality.rarity}</span>
        <span className="text-maze-700">|</span>
        <span className="text-maze-muted">元素</span>
        <span className="text-maze-teal font-medium">{personality.element}</span>
      </motion.div>
    </motion.div>
  )
}
