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
    <SceneBackground atmosphere={scene?.atmosphere || 'default'}>
      <div className="h-full flex flex-col">
        <div className="px-4 pt-6">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-maze-subtle text-xs tracking-widest uppercase">
              {getChapter(currentChapter)?.title || `第${currentChapter}章`}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((ch) => (
                <div
                  key={ch}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                    ch <= currentChapter ? 'bg-maze-accent' : 'bg-maze-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <DialogSystem onDialogEnd={() => {
          if (sceneRef.current?.choices?.length === 0) {
            setIsEndOfChapter(true)
          }
        }} />

        <ChoicePanel
          choices={currentChoices}
          visible={showChoicePanel}
          onSelect={handleChoice}
        />
      </div>

      <AnimatePresence>
        {isEndOfChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-maze-900/60 backdrop-blur-sm"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              onClick={handleChapterEnd}
              className="px-10 py-4 rounded-xl bg-maze-accent/30 border-2 border-maze-accent/60
                        text-maze-accent text-lg font-medium
                        hover:bg-maze-accent/40 hover:border-maze-accent hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]
                        transition-all duration-300 cursor-pointer"
            >
              {currentChapter < 5 ? '进入下一章' : '揭晓人格真相'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneBackground>
  )
}
