import { motion, AnimatePresence } from 'framer-motion'

const atmosphereGradients = {
  oppressive: 'from-maze-900 via-maze-800 to-maze-900',
  mysterious: 'from-maze-900 via-maze-700 to-blue-950',
  tense: 'from-maze-900 via-red-950 to-maze-900',
  calm: 'from-maze-900 via-maze-800 to-purple-950',
  solemn: 'from-maze-900 via-maze-800 to-amber-950',
  default: 'from-maze-900 via-maze-800 to-maze-900',
}

export default function SceneBackground({ atmosphere = 'default', children }) {
  const gradient = atmosphereGradients[atmosphere] || atmosphereGradients.default

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={atmosphere}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        <div className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
