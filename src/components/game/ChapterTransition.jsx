import { motion } from 'framer-motion'
import { getChapter } from '../../data/chapters'

export default function ChapterTransition({ chapter, onComplete }) {
  const data = getChapter(chapter)

  if (!data) return null

  return (
    <motion.div
      key={chapter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-maze-950 px-8"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Chapter number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 mb-6"
      >
        <span className="text-6xl font-bold text-maze-primary/15 font-[family-name:var(--font-display)]">
          {String(chapter).padStart(2, '0')}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 text-maze-subtle text-xs tracking-[0.3em] uppercase mb-4 font-medium"
      >
        {data.title}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 text-gradient text-2xl font-bold mb-3 tracking-wide font-[family-name:var(--font-display)]"
      >
        {data.subtitle}
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="relative z-10 text-maze-muted text-xs mt-8"
      >
        [ 轻触开始 ]
      </motion.p>
    </motion.div>
  )
}
