import { motion } from 'framer-motion'

export default function ChoiceButton({ choice, onSelect, disabled, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onClick={() => onSelect(choice)}
      className="w-full text-left min-h-[44px] p-4 rounded-xl border cursor-pointer
                 transition-all duration-200 ease-out
                 bg-maze-800/60 border-maze-600
                 hover:border-maze-primary hover:bg-maze-700/60
                 hover:shadow-[0_0_15px_rgba(124,58,237,0.15)]
                 focus-visible:border-maze-primary focus-visible:shadow-[0_0_0_2px_rgba(124,58,237,0.3)]
                 disabled:opacity-30 disabled:cursor-not-allowed
                 active:bg-maze-700 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-maze-primary/50 text-xs font-mono mt-0.5 shrink-0 group-hover:text-maze-primary transition-colors">
          [{index + 1}]
        </span>
        <div>
          <p className="text-maze-text text-sm leading-relaxed group-hover:text-white transition-colors">
            {choice.text}
          </p>
          {choice.subtext && (
            <p className="text-maze-muted text-xs mt-1.5 group-hover:text-maze-subtle transition-colors">
              {choice.subtext}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  )
}
