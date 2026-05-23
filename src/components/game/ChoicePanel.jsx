import { motion, AnimatePresence } from 'framer-motion'
import ChoiceButton from '../ui/ChoiceButton'

export default function ChoicePanel({ choices, visible, onSelect }) {
  if (!choices || choices.length === 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="px-4 pb-6 pt-3"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="h-px mx-auto mb-4 max-w-[120px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,105,146,0.4), transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-maze-muted text-xs uppercase tracking-[0.25em] mb-4 text-center font-medium"
          >
            Make Your Choice
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
