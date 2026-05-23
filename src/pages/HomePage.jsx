import { motion } from 'framer-motion'
import useGameStore from '../store/gameStore'

export default function HomePage() {
  const setPhase = useGameStore((s) => s.setPhase)

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-maze-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-maze-subtle text-xs tracking-[0.4em] uppercase mb-6"
        >
          一个沉浸式互动叙事
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 100 }}
          className="text-5xl font-bold text-gradient mb-4"
        >
          人格迷宫
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-maze-subtle text-sm leading-relaxed max-w-xs mx-auto mb-10"
        >
          你不是在做测试。
          <br />
          你是在探索一座迷宫。
          <br />
          而迷宫，也在探索你。
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPhase('intro')}
          className="px-10 py-4 rounded-xl bg-maze-accent/20 border border-maze-accent/50
                     text-maze-accent text-lg font-medium
                     hover:bg-maze-accent/30 hover:border-maze-accent
                     transition-all duration-500 cursor-pointer
                     shadow-[0_0_30px_rgba(124,58,237,0.15)]"
        >
          进入迷宫
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 text-maze-subtle text-xs tracking-wider"
      >
        戴上耳机，获得最佳体验
      </motion.p>
    </div>
  )
}
