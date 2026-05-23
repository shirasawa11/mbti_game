import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import SceneRenderer from '../components/game/SceneRenderer'
import ChapterTransition from '../components/game/ChapterTransition'
import useGameStore from '../store/gameStore'
import useGameProgress from '../hooks/useGameProgress'

export default function GamePage() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const { startChapter } = useGameProgress()
  const [showTransition, setShowTransition] = useState(true)
  const [transitionChapter, setTransitionChapter] = useState(1)

  useEffect(() => {
    if (gamePhase === 'playing') {
      setTransitionChapter(currentChapter)
      setShowTransition(true)
    }
  }, [gamePhase, currentChapter])

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false)
    startChapter(transitionChapter)
  }, [transitionChapter, startChapter])

  const handleChapterEnd = useCallback(() => {
    if (currentChapter >= 5) {
      useGameStore.getState().setPhase('result')
    } else {
      useGameStore.getState().nextChapter()
      const nextChapter = useGameStore.getState().currentChapter
      setTransitionChapter(nextChapter)
      setShowTransition(true)
    }
  }, [currentChapter])

  return (
    <div className="h-full relative">
      <AnimatePresence mode="wait">
        {showTransition ? (
          <ChapterTransition
            key={`transition-${transitionChapter}`}
            chapter={transitionChapter}
            onComplete={handleTransitionComplete}
          />
        ) : (
          <SceneRenderer
            key={`chapter-${currentChapter}`}
            onChapterEnd={handleChapterEnd}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
