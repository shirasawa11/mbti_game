import { motion } from 'framer-motion'

export default function PersonalityType({ dimensions }) {
  const dims = [
    { key: 'EI', label: 'E / I', left: 'Extraversion', right: 'Introversion' },
    { key: 'SN', label: 'S / N', left: 'Sensing', right: 'Intuition' },
    { key: 'TF', label: 'T / F', left: 'Thinking', right: 'Feeling' },
    { key: 'JP', label: 'J / P', left: 'Judging', right: 'Perceiving' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.8 }}
      className="maze-card p-5 mx-4 max-w-md w-full"
    >
      <p className="text-maze-muted text-[10px] tracking-[0.2em] uppercase text-center mb-5 font-medium">
        Dimension Analysis
      </p>
      <div className="space-y-4">
        {dims.map((dim, i) => {
          const data = dimensions[dim.key]
          if (!data) return null

          const leftPct = dim.key === 'EI'
            ? (data.dominant === 'E' ? data.percentage : 100 - data.percentage)
            : dim.key === 'SN'
            ? (data.dominant === 'S' ? data.percentage : 100 - data.percentage)
            : dim.key === 'TF'
            ? (data.dominant === 'T' ? data.percentage : 100 - data.percentage)
            : (data.dominant === 'J' ? data.percentage : 100 - data.percentage)

          const isLeftDominant = leftPct >= 50
          const leftColor = isLeftDominant ? 'text-maze-primary' : 'text-maze-muted'
          const rightColor = !isLeftDominant ? 'text-maze-primary' : 'text-maze-muted'

          return (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 + i * 0.12 }}
            >
              <div className="flex justify-between text-xs mb-1.5">
                <span className={`font-medium transition-colors ${leftColor}`}>{dim.left}</span>
                <span className="text-maze-muted/50 text-[10px]">{dim.label}</span>
                <span className={`font-medium transition-colors ${rightColor}`}>{dim.right}</span>
              </div>
              <div className="h-1.5 bg-maze-800 rounded-full overflow-hidden border border-maze-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${leftPct}%` }}
                  transition={{ delay: 2.5 + i * 0.12, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--color-maze-primary), var(--color-maze-secondary))`,
                    boxShadow: '0 0 8px rgba(124,58,237,0.3)',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-maze-muted mt-0.5">
                <span>{leftPct}%</span>
                <span>{100 - leftPct}%</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
