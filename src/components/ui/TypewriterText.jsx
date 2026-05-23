import { motion } from 'framer-motion'
import useTypewriter from '../../hooks/useTypewriter'

export default function TypewriterText({ text, speed = 35, onComplete, className = '' }) {
  const { displayedText, isComplete } = useTypewriter(text, speed, onComplete)

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-maze-accent ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </motion.span>
  )
}
