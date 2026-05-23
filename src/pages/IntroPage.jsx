import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store/gameStore'

const introLines = [
  { text: '闭上眼睛。', delay: 500 },
  { text: '你听见了什么？', delay: 800 },
  { text: '是风。', delay: 600 },
  { text: '不 ——', delay: 400 },
  { text: '是低语。', delay: 500 },
  { text: '它们在呼唤你。', delay: 600 },
  { text: '醒来吧。', delay: 500 },
  { text: '迷宫在等你。', delay: 500 },
]

export default function IntroPage() {
  const [currentLine, setCurrentLine] = useState(0)
  const [showText, setShowText] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const setPhase = useGameStore((s) => s.setPhase)
  const resetGame = useGameStore((s) => s.resetGame)

  useEffect(() => {
    if (currentLine < introLines.length) {
      setShowText(false)
      const showTimer = setTimeout(() => setShowText(true), introLines[currentLine].delay)
      return () => clearTimeout(showTimer)
    } else {
      const completeTimer = setTimeout(() => setIsComplete(true), 800)
      return () => clearTimeout(completeTimer)
    }
  }, [currentLine])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        if (currentLine < introLines.length) {
          setCurrentLine((prev) => prev + 1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentLine])

  const handleClick = useCallback(() => {
    if (currentLine < introLines.length) {
      setCurrentLine((prev) => prev + 1)
    }
  }, [currentLine])

  const handleEnter = () => {
    resetGame()
    setPhase('playing')
  }

  return (
    <div
      className="h-full flex flex-col items-center justify-center px-6 bg-maze-950 cursor-pointer relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,105,146,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
        }}
      />

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 15 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-20"
          >
            {currentLine < introLines.length && (
              <p className="text-maze-text text-xl leading-relaxed font-[family-name:var(--font-serif)] italic tracking-wide">
                {introLines[currentLine].text}
              </p>
            )}
            {currentLine < introLines.length - 1 && (
              <p className="text-maze-muted text-xs mt-8 tracking-wider">
                [ SPACE 或 点击继续 ]
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center relative z-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-px mx-auto mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, #ECA400, transparent)' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-maze-subtle text-xs tracking-[0.3em] uppercase mb-8 font-medium"
            >
              Chapter 01 · Awakening
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                handleEnter()
              }}
              className="mist-glow-btn"
            >
              睁开双眼
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
