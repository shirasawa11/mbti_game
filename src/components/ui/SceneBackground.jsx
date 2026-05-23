import { motion, AnimatePresence } from 'framer-motion'

const atmosphereGradients = {
  oppressive: 'from-maze-950 via-maze-900 to-maze-950',
  mysterious: 'from-maze-950 via-maze-800 to-blue-950',
  tense: 'from-maze-950 via-red-950/40 to-maze-950',
  calm: 'from-maze-950 via-maze-800 to-purple-950/60',
  solemn: 'from-maze-950 via-maze-800 to-amber-950/40',
  default: 'from-maze-950 via-maze-900 to-maze-950',
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
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      >
        {/* Ambient light orbs */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.2) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(244,63,94,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Scanline overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-50"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
          }}
        />

        <div className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
