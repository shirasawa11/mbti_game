import { motion, AnimatePresence } from 'framer-motion'
import { getChapter } from '../../data/chapters'

export default function ChapterTransition({ chapter, onComplete }) {
  const data = getChapter(chapter)

  if (!data) return null

  return (
    <AnimatePresence>
      <motion.div
        key={chapter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={onComplete}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center
                   bg-maze-900 px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-maze-subtle text-xs tracking-[0.3em] uppercase mb-4"
        >
          {data.title}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gradient text-2xl font-bold mb-3"
        >
          {data.subtitle}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-maze-accent to-transparent mt-2"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-maze-subtle text-xs mt-6"
        >
          轻触开始
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}
