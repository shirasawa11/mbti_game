import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

export default function HomePage() {
  const setPhase = useGameStore((s) => s.setPhase)

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-maze-950">
      {/* Animated ambient background */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(244,63,94,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(45,212,191,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-maze-primary/50 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
        }}
      />

      <div className="relative z-20 text-center">
        {/* Top accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          className="h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, #A78BFA, transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-maze-subtle text-xs tracking-[0.4em] uppercase mb-6 font-medium"
        >
          Interactive Fiction · Psychological Exploration
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 80, damping: 12 }}
          className="text-5xl font-bold text-gradient text-glow mb-3 font-[family-name:var(--font-display)] tracking-wide"
        >
          人格迷宫
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-10"
        >
          <p className="text-maze-subtle text-sm leading-relaxed max-w-xs mx-auto">
            <span className="text-maze-muted">// </span>
            你不在做测试。你在探索一座迷宫。
          </p>
          <p className="text-maze-muted text-xs leading-relaxed max-w-xs mx-auto mt-1">
            而迷宫，也在探索你。
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPhase('intro')}
          className="btn-primary px-12 py-4 text-lg tracking-wider relative overflow-hidden group"
        >
          <span className="relative z-10">ENTER THE MAZE</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Bottom accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 2.0, duration: 1, ease: 'easeOut' }}
          className="h-px mx-auto mt-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 text-maze-muted text-xs tracking-widest z-20"
      >
        PUT ON HEADPHONES FOR THE BEST EXPERIENCE
      </motion.p>
    </div>
  )
}
