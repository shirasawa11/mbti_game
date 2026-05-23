import { motion } from 'framer-motion'

export default function PulseIndicator({ className = '' }) {
  return (
    <motion.div
      className={`w-2 h-2 rounded-full bg-maze-accent ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
