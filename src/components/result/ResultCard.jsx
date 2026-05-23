import { motion } from 'framer-motion'
import { generateFlavorText } from '../../data/titles'

export default function ResultCard({ personality, mbtiType, choiceHistory }) {
  const flavorText = generateFlavorText(mbtiType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="maze-card maze-glow-gold p-6 mx-4 max-w-md w-full"
    >
      <div className="text-center mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-maze-subtle text-xs tracking-[0.3em] uppercase mb-3"
        >
          你的人格类型
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="text-5xl font-bold text-gradient-gold mb-2"
        >
          {mbtiType}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-maze-gold text-lg font-medium"
        >
          {personality.title}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-maze-900/50 rounded-lg p-4 mb-5 border border-maze-700"
      >
        <p className="text-maze-text text-sm leading-relaxed italic">
          "{flavorText}"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex items-center justify-center gap-2 mb-2"
      >
        <span className="text-maze-subtle text-xs">稀有度</span>
        <span className="text-maze-teal text-xs font-medium">{personality.rarity}</span>
        <span className="text-maze-subtle text-xs">· 元素</span>
        <span className="text-maze-teal text-xs font-medium">{personality.element}</span>
      </motion.div>
    </motion.div>
  )
}
