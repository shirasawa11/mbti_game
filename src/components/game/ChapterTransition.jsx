import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getChapter } from '../../data/chapters'

export default function ChapterTransition({ chapter, onComplete }) {
  const data = getChapter(chapter)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(timer)
  }, [chapter])

  const handleAdvance = useCallback(() => {
    if (!ready) return
    onComplete?.()
  }, [ready, onComplete])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        handleAdvance()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleAdvance])

  if (!data) return null

  return (
    <motion.div
      key={chapter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleAdvance}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-maze-950 px-8 cursor-pointer"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,105,146,0.12) 0%, transparent 50%)',
        }}
      />

      {/* Chapter number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mb-6"
      >
        <span className="text-6xl font-bold text-maze-primary/10 font-[family-name:var(--font-display)] tracking-wider">
          {String(chapter).padStart(2, '0')}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 text-[#c9a054] text-xs tracking-[0.3em] uppercase mb-4 font-medium font-[family-name:var(--font-display)]"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
      >
        {data.title}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 text-gradient text-2xl font-bold mb-3 tracking-wide font-[family-name:var(--font-display)]"
      >
        {data.subtitle}
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(236,164,0,0.5), rgba(0,105,146,0.5), transparent)' }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-maze-muted text-[10px] tracking-[0.25em] mt-8"
      >
        {ready ? (
          <motion.span
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="action-prompt"
          >
            <span className="key-badge">SPACE</span>
            <span>点击继续</span>
          </motion.span>
        ) : (
          <span>&nbsp;</span>
        )}
      </motion.p>
    </motion.div>
  )
}
