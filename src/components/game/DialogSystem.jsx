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

  return (
    <div className="flex-1 flex flex-col justify-end px-4 pb-4 pt-20" onClick={handleAdvance}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentDialog.speaker}-${currentDialogIndex}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <NPCDialog
            speaker={currentDialog.speaker}
            text={currentDialog.text}
            emotion={currentDialog.emotion}
            onComplete={completeTyping}
          />
        </motion.div>
      </AnimatePresence>

      {!isTyping && !showChoices && hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center gap-2 mt-3"
        >
          <kbd className="px-1.5 py-0.5 text-[10px] bg-maze-800 border border-maze-600 rounded text-maze-muted font-mono">
            SPACE
          </kbd>
          <span className="text-maze-muted text-xs">继续</span>
        </motion.div>
      )}
    </div>
  )
}
