import { useEffect } from 'react'
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
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="min-h-full flex flex-col items-center py-8 gap-5 pb-24">
        <ResultCard
          personality={personality}
          mbtiType={mbtiType}
          choiceHistory={choiceHistory}
        />

        <PersonalityType
          type={mbtiType}
          dimensions={dimensions}
        />

        <BehaviorSummary
          personality={personality}
          choiceHistory={choiceHistory}
        />

        <SharePanel
          mbtiType={mbtiType}
          personality={personality}
        />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          onClick={handleReplay}
          className="mt-4 px-8 py-3 rounded-xl border border-maze-600 text-maze-subtle
                     hover:text-maze-text hover:border-maze-500 transition-all duration-300
                     active:scale-95 cursor-pointer text-sm"
        >
          重新探索迷宫
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4.5 }}
          className="text-maze-subtle text-xs text-center px-6"
        >
          每一次探索，都会发现不同的自己。
          <br />
          不同的选择会导向不同的结局和人格类型。
        </motion.p>
      </div>
    </div>
  )
}
