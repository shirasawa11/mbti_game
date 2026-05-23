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
          className="px-4 pb-8 pt-3"
          style={{
            background: 'linear-gradient(to top, rgba(0,5,18,0.95) 0%, rgba(0,5,18,0.85) 50%, rgba(0,5,18,0.4) 100%)',
          }}
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
            className="text-[#c9a054] text-xs uppercase tracking-[0.25em] mb-4 text-center font-medium font-[family-name:var(--font-display)]"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
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
