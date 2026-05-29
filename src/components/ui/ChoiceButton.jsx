import { motion } from 'framer-motion'
import useSfx from '../../hooks/useSfx'

export default function ChoiceButton({ choice, onSelect, disabled, index }) {
  const [sfx] = useSfx()

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onMouseEnter={() => sfx('choiceHover')}
      onClick={() => { sfx('choiceSelect'); onSelect(choice) }}
      className="w-full text-left min-h-[52px] px-4 py-3.5 rounded-xl cursor-pointer
                 transition-all duration-300 ease-out relative overflow-hidden
                 bg-gradient-to-r from-maze-800/80 via-maze-800/50 to-maze-800/30
                 border border-maze-600/60
                 hover:border-maze-primary/60 hover:from-maze-800 hover:to-maze-700/50
                 hover:shadow-[0_0_25px_rgba(0,105,146,0.2),inset_0_0_25px_rgba(0,105,146,0.03)]
                 focus-visible:border-maze-primary focus-visible:shadow-[0_0_0_2px_rgba(0,105,146,0.3)]
                 disabled:opacity-30 disabled:cursor-not-allowed
                 active:bg-maze-700 group"
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full
                      bg-gradient-to-b from-transparent via-maze-primary/30 to-transparent
                      group-hover:via-maze-primary/70
                      transition-all duration-300" />

      {/* Hover glow sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 flex items-start gap-4">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5
                         bg-maze-700/80 border border-maze-600/50
                         text-maze-primary/60 text-[11px] font-mono font-bold
                         group-hover:bg-maze-primary/15 group-hover:border-maze-primary/40 group-hover:text-maze-primary
                         group-hover:shadow-[0_0_10px_rgba(0,105,146,0.2)]
                         transition-all duration-300">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-maze-text text-sm leading-relaxed group-hover:text-white transition-colors duration-300 [text-shadow:1px_1px_3px_rgba(0,0,0,0.6)]">
            {choice.text}
          </p>
          {choice.subtext && (
            <p className="text-maze-muted text-xs mt-1.5 leading-relaxed group-hover:text-maze-subtle transition-colors duration-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
              {choice.subtext}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  )
}
