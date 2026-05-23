import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NPCDialog from '../ui/NPCDialog'
import useDialogStore from '../../store/dialogStore'

export default function DialogSystem() {
  const dialogQueue = useDialogStore((s) => s.dialogQueue)
  const currentDialogIndex = useDialogStore((s) => s.currentDialogIndex)
  const isTyping = useDialogStore((s) => s.isTyping)
  const showChoices = useDialogStore((s) => s.showChoices)
  const advanceDialog = useDialogStore((s) => s.advanceDialog)
  const completeTyping = useDialogStore((s) => s.completeTyping)

  const currentDialog = dialogQueue[currentDialogIndex]

  const handleAdvance = useCallback(() => {
    if (!currentDialog) return

    if (isTyping) {
      completeTyping()
      return
    }

    if (showChoices) return

    advanceDialog()
  }, [currentDialog, isTyping, showChoices, advanceDialog, completeTyping])

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

  if (!currentDialog) return null

  const hasMore = currentDialogIndex < dialogQueue.length - 1
  const showPrompt = !isTyping && !showChoices && hasMore

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8"
        onClick={handleAdvance}
        animate={{
          paddingBottom: showChoices ? '12rem' : '1.5rem',
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(to top, rgba(0,5,18,0.95) 0%, rgba(0,5,18,0.7) 40%, rgba(0,5,18,0.3) 70%, transparent 100%)',
          paddingTop: '4rem',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentDialog.speaker}-${currentDialogIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <NPCDialog
                speaker={currentDialog.speaker}
                text={currentDialog.text}
                emotion={currentDialog.emotion}
                onComplete={completeTyping}
                showPrompt={showPrompt}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
