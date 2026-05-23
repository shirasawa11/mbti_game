import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneBackground from '../ui/SceneBackground'
import DialogSystem from './DialogSystem'
import ChoicePanel from './ChoicePanel'
import useGameStore from '../../store/gameStore'
import useDialogStore from '../../store/dialogStore'
import usePersonality from '../../hooks/usePersonality'
import useGameProgress from '../../hooks/useGameProgress'
import { getChapter } from '../../data/chapters'

export default function SceneRenderer({ onChapterEnd }) {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const currentSceneId = useGameStore((s) => s.currentSceneId)
  const pushDialog = useDialogStore((s) => s.pushDialog)
  const showChoices = useDialogStore((s) => s.showChoices)
  const currentChoices = useDialogStore((s) => s.currentChoices)
  const clearDialog = useDialogStore((s) => s.clearDialog)
  const { processChoice } = usePersonality()
  const { resolveChoice } = useGameProgress()
  const [scene, setScene] = useState(null)
  const [showChoicePanel, setShowChoicePanel] = useState(false)
  const [isEndOfChapter, setIsEndOfChapter] = useState(false)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!currentSceneId) return
    const chapter = getChapter(currentChapter)
    const currentScene = chapter?.scenes?.[currentSceneId]
    if (currentScene) {
      sceneRef.current = currentScene
      setScene(currentScene)
      setShowChoicePanel(false)
      setIsEndOfChapter(false)
      clearDialog()
      setTimeout(() => pushDialog(currentScene), 300)
    }
  }, [currentSceneId, currentChapter])

  useEffect(() => {
    if (showChoices) {
      const currentScene = sceneRef.current
      if (currentScene?.choices?.length === 0) {
        setIsEndOfChapter(true)
        return
      }
      const timer = setTimeout(() => setShowChoicePanel(true), 200)
      return () => clearTimeout(timer)
    } else {
      setShowChoicePanel(false)
    }
  }, [showChoices])

  const handleChoice = (choice) => {
    setShowChoicePanel(false)
    processChoice(choice, sceneRef.current?.dialogs?.[0]?.text || '')

    const chapter = getChapter(currentChapter)
    if (choice.nextScene && chapter?.scenes?.[choice.nextScene]) {
      resolveChoice(choice)
    } else {
      setIsEndOfChapter(true)
    }
  }

  const handleChapterEnd = () => {
    onChapterEnd?.()
  }

  return (
    <SceneBackground atmosphere={scene?.atmosphere || 'default'} backgroundId={scene?.background}>
      <div className="h-full flex flex-col">
        {/* Header bar */}
        <div className="px-4 pt-6 pb-2">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-maze-muted text-[10px] tracking-[0.25em] uppercase font-medium">
              {getChapter(currentChapter)?.title || `CH.${currentChapter}`}
            </span>
            <div className="flex gap-1.5 ml-auto">
              {[1, 2, 3, 4, 5].map((ch) => (
                <div
                  key={ch}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    ch <= currentChapter
                      ? 'bg-maze-primary shadow-[0_0_6px_rgba(0,105,146,0.5)] w-4'
                      : 'bg-maze-700 w-2'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <DialogSystem />

        <ChoicePanel
          choices={currentChoices}
          visible={showChoicePanel}
          onSelect={handleChoice}
        />
      </div>

      {/* Chapter end overlay */}
      <AnimatePresence>
        {isEndOfChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-maze-950/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-px mx-auto mb-6"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,105,146,0.6), transparent)' }}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleChapterEnd}
                className="btn-primary px-10 py-4 text-lg tracking-wider"
              >
                {currentChapter < 5 ? 'NEXT CHAPTER' : 'REVEAL YOUR TYPE'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneBackground>
  )
}
