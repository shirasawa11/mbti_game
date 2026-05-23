import { motion, AnimatePresence } from 'framer-motion'
import ChoiceButton from '../ui/ChoiceButton'

export default function ChoicePanel({ choices, onSelect, visible }) {
  if (!choices || choices.length === 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="px-4 pb-6 pt-3"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-maze-subtle text-xs uppercase tracking-widest mb-3 text-center"
          >
            做出你的选择
          </motion.p>
          <div className="flex flex-col gap-2.5 max-w-lg mx-auto">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
