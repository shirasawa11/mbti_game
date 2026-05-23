import { motion } from 'framer-motion'

export default function ChoiceButton({ choice, onSelect, disabled, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      onClick={() => onSelect(choice)}
      className="w-full text-left p-4 rounded-xl border cursor-pointer transition-all duration-300
                 bg-maze-800/80 border-maze-600 hover:border-maze-accent
                 hover:bg-maze-700/60 disabled:opacity-40 disabled:cursor-not-allowed
                 active:bg-maze-700 group"
    >
      <p className="text-maze-text text-base leading-relaxed group-hover:text-white transition-colors">
        {choice.text}
      </p>
      {choice.subtext && (
        <p className="text-maze-subtle text-sm mt-1.5 group-hover:text-maze-accent/80 transition-colors">
          {choice.subtext}
        </p>
      )}
    </motion.button>
  )
}
