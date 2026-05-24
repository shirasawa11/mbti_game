import { useRef } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import usePersonalityStore from '../store/personalityStore'
import useGameStore from '../store/gameStore'
import { getPersonality } from '../data/personalities'
import ResultCard from '../components/result/ResultCard'
import PersonalityType from '../components/result/PersonalityType'
import BehaviorSummary from '../components/result/BehaviorSummary'

export default function ResultPage() {
  const captureRef = useRef(null)
  const getMBTIType = usePersonalityStore((s) => s.getMBTIType)
  const getDimensionScores = usePersonalityStore((s) => s.getDimensionScores)
  const choiceHistory = usePersonalityStore((s) => s.choiceHistory)
  const resetGame = useGameStore((s) => s.resetGame)
  const setPhase = useGameStore((s) => s.setPhase)

  const mbtiType = getMBTIType()
  const dimensions = getDimensionScores()
  const personality = getPersonality(mbtiType)

  const handleReplay = () => {
    resetGame()
    usePersonalityStore.getState().reset()
    setPhase('intro')
  }

  const handleSaveImage = async () => {
    if (captureRef.current) {
      try {
        const dataUrl = await toPng(captureRef.current, { quality: 0.95, backgroundColor: '#0a0f14' })
        const link = document.createElement('a')
        link.download = `人格迷宫-${mbtiType}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error('Screenshot failed:', err)
      }
    }
  }

  const handleCopyText = async () => {
    const text = `我在《人格迷宫》中测出了 ${mbtiType} - ${personality.title}。\n"${personality.poem}"\n来测测你的人格类型吧！`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback
    }
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin bg-maze-950">
      {/* Ambient background (fixed, not captured) */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(236,164,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,105,146,0.04) 0%, transparent 50%)',
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
        }}
      />

      {/* Capture area — the entire analysis page */}
      <div ref={captureRef} className="relative bg-[#0a0f14] py-8">
        {/* Ambient glow for capture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(236,164,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,105,146,0.04) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 min-h-full flex flex-col items-center gap-5 pb-6">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-2"
          >
            <p className="text-maze-muted text-[10px] tracking-[0.3em] uppercase font-medium">Exploration Complete</p>
          </motion.div>

          <ResultCard personality={personality} mbtiType={mbtiType} />
          <PersonalityType dimensions={dimensions} />
          <BehaviorSummary personality={personality} choiceHistory={choiceHistory} />

          {/* Footer branding inside capture */}
          <div className="text-center mt-2 pt-4 border-t border-maze-700/50 w-3/4">
            <p className="text-maze-muted text-[10px] tracking-[0.2em]">人格迷宫 · 发现你的人格真相</p>
          </div>
        </div>
      </div>

      {/* Action buttons (outside capture) */}
      <div className="relative z-20 flex flex-col items-center gap-3 px-4 pb-8 -mt-2">
        <div className="flex gap-3 max-w-md w-full">
          <button
            onClick={handleSaveImage}
            className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-maze-primary/20 border border-maze-primary/40
                       hover:bg-maze-primary/30 hover:shadow-[0_0_20px_rgba(0,105,146,0.2)]
                       transition-all duration-200 active:scale-[0.97] cursor-pointer flex flex-col items-center justify-center"
          >
            <span className="text-maze-primary font-semibold tracking-wide text-sm">保存图片</span>
            <span className="text-maze-muted text-[10px] tracking-wide">SAVE IMAGE</span>
          </button>
          <button
            onClick={handleCopyText}
            className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-maze-800 border border-maze-600
                       hover:bg-maze-700 hover:text-maze-text
                       transition-all duration-200 active:scale-[0.97] cursor-pointer flex flex-col items-center justify-center"
          >
            <span className="text-maze-subtle font-semibold tracking-wide text-sm">复制文案</span>
            <span className="text-maze-muted text-[10px] tracking-wide">COPY TEXT</span>
          </button>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          onClick={handleReplay}
          className="btn-ghost px-8 py-2.5 text-sm mt-2 flex flex-col items-center"
        >
          <span className="font-semibold tracking-wide">重新进入迷宫</span>
          <span className="text-maze-muted text-[10px] tracking-wide">RE-ENTER THE MAZE</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 4.5 }}
          className="text-maze-muted text-xs text-center"
        >
          每一次探索，都会发现不同的自己
        </motion.p>
      </div>
    </div>
  )
}
