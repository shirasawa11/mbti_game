import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store/gameStore'

const introLines = [
  { text: '闭上眼睛。', delay: 500 },
  { text: '你听见了什么？', delay: 800 },
  { text: '是风。', delay: 600 },
  { text: '不——', delay: 400 },
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
      const completeTimer = setTimeout(() => setIsComplete(true), 1000)
      return () => clearTimeout(completeTimer)
    }
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
      className="h-full flex flex-col items-center justify-center px-6 bg-maze-900 cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 50%)',
        }}
      />

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 15 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            {currentLine < introLines.length && (
              <p className="text-maze-text text-xl leading-relaxed italic">
                {introLines[currentLine].text}
              </p>
            )}
            {currentLine < introLines.length - 1 && (
              <p className="text-maze-subtle text-xs mt-8 animate-pulse">轻触继续</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center relative z-10"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-maze-subtle text-xs tracking-[0.3em] uppercase mb-8"
            >
              第一章 · 觉醒
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                handleEnter()
              }}
              className="px-10 py-4 rounded-xl bg-maze-accent/20 border border-maze-accent/50
                        text-maze-accent text-lg font-medium
                        hover:bg-maze-accent/30 transition-all duration-300 cursor-pointer"
            >
              睁开双眼
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
