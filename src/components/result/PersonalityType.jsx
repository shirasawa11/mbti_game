import { motion } from 'framer-motion'

export default function PersonalityType({ type, dimensions }) {
  const dims = [
    { key: 'EI', label: 'E/I', left: '外向 E', right: '内向 I' },
    { key: 'SN', label: 'S/N', left: '实感 S', right: '直觉 N' },
    { key: 'TF', label: 'T/F', left: '思维 T', right: '情感 F' },
    { key: 'JP', label: 'J/P', left: '判断 J', right: '感知 P' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.8 }}
      className="maze-card p-5 mx-4 max-w-md w-full"
    >
      <p className="text-maze-subtle text-xs tracking-[0.2em] uppercase text-center mb-5">
        维度分析
      </p>
      <div className="space-y-4">
        {dims.map((dim, i) => {
          const data = dimensions[dim.key]
          if (!data) return null
          const leftPct = dim.key === 'EI' ? (data.dominant === 'E' ? data.percentage : 100 - data.percentage) :
                          dim.key === 'SN' ? (data.dominant === 'S' ? data.percentage : 100 - data.percentage) :
                          dim.key === 'TF' ? (data.dominant === 'T' ? data.percentage : 100 - data.percentage) :
                          (data.dominant === 'J' ? data.percentage : 100 - data.percentage)

          return (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 + i * 0.15 }}
            >
              <div className="flex justify-between text-xs text-maze-subtle mb-1.5">
                <span className={data.dominant === dim.left[0] ? 'text-maze-accent font-medium' : ''}>
                  {dim.left}
                </span>
                <span className="text-maze-subtle/60">{dim.label}</span>
                <span className={data.dominant === dim.right[0] ? 'text-maze-accent font-medium' : ''}>
                  {dim.right}
                </span>
              </div>
              <div className="h-1.5 bg-maze-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${leftPct}%` }}
                  transition={{ delay: 2.5 + i * 0.15, duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-maze-accent to-maze-teal rounded-full"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
