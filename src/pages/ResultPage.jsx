import { motion } from 'framer-motion'
import usePersonalityStore from '../store/personalityStore'
import useGameStore from '../store/gameStore'
import { getPersonality } from '../data/personalities'
import ResultCard from '../components/result/ResultCard'
import PersonalityType from '../components/result/PersonalityType'
import BehaviorSummary from '../components/result/BehaviorSummary'
import SharePanel from '../components/result/SharePanel'

export default function ResultPage() {
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

  return (
    <div className="h-full overflow-y-auto scrollbar-thin bg-maze-950">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(236,164,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,105,146,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
        }}
      />

      <div className="relative z-10 min-h-full flex flex-col items-center py-8 gap-5 pb-24">
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
        <SharePanel mbtiType={mbtiType} personality={personality} />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          onClick={handleReplay}
          className="btn-ghost px-8 py-3 text-sm mt-4"
        >
          RE-ENTER THE MAZE
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 4.5 }}
          className="text-maze-muted text-xs text-center px-6"
        >
          每一次探索，都会发现不同的自己
        </motion.p>
      </div>
    </div>
  )
}
