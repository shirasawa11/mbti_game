import { motion } from 'framer-motion'
import useTypewriter from '../../hooks/useTypewriter'

export default function TypewriterText({ text, speed = 35, onComplete, className = '' }) {
  const { displayedText, isComplete } = useTypewriter(text, speed, onComplete)

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1.1em] bg-maze-primary align-middle ml-0.5 rounded-full"
          animate={{ opacity: [1, 0.2] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </motion.span>
  )
}
