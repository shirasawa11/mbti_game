import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store/gameStore'
import VolToggle from '../components/ui/VolToggle'

let overlayDismissed = false

function hasSave() {
  try {
    const d = JSON.parse(localStorage.getItem('mbti-save'))
    return d?.ph === 'playing' && d?.sc
  } catch { return false }
}

export default function HomePage() {
  const setPhase = useGameStore((s) => s.setPhase)
  const [showOverlay, setShowOverlay] = useState(!overlayDismissed)
  const saved = hasSave()

  const dismissOverlay = () => {
    overlayDismissed = true
    setShowOverlay(false)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-maze-950">

      {/* Unlock overlay — first click unlocks browser audio before ENTER button is shown */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onClick={dismissOverlay}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(0,105,146,0.08) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(236,164,0,0.04) 0%, transparent 45%), #000D1A',
            }}
          >
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
              }}
            />

            {/* Staggered content — elements cascade top→bottom */}
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
              }}
            >
              {/* Top accent line */}
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: 100, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="h-px mb-8"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.5), transparent)' }}
              />

              {/* Game title */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 12 } },
                }}
                className="text-5xl font-bold text-gradient text-glow mb-3 font-[family-name:var(--font-display)] tracking-wide"
              >
                人格迷宫
              </motion.h1>

              {/* Subtitle — fades in right as title settles */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  visible: { opacity: 0.4, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="text-maze-muted text-xs tracking-[0.2em] mb-10"
              >
                CLICK TO START
              </motion.p>

              {/* Button group — button + bottom line appear as one unit */}
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
              >
                <motion.button
                  type="button"
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                  }}
                  className="mist-glow-btn pointer-events-none"
                  style={{ fontSize: '1.3rem', letterSpacing: '0.22em' }}
                >
                  点击开始游戏
                </motion.button>

                {/* Bottom accent line */}
                <motion.div
                  variants={{
                    hidden: { width: 0, opacity: 0 },
                    visible: { width: 60, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
                  }}
                  className="h-px mt-8"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated ambient background */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,105,146,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(236,164,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,136,176,0.04) 0%, transparent 50%)',
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
          style={{ background: 'linear-gradient(90deg, transparent, #006992, #0088B0, transparent)' }}
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

        {saved && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('playing')}
            className="mist-glow-btn"
          >
            <span>继续迷宫</span>
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: saved ? 1.8 : 1.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            try { localStorage.removeItem('mbti-save'); localStorage.removeItem('mbti-trait') } catch {}
            setPhase('intro')
          }}
          className={saved ? 'btn-ghost mt-3' : 'mist-glow-btn'}
        >
          <span>ENTER THE MAZE</span>
        </motion.button>

        {/* Bottom accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 2.0, duration: 1, ease: 'easeOut' }}
          className="h-px mx-auto mt-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,105,146,0.5), transparent)' }}
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

      {/* Volume toggle */}
      <div className="absolute bottom-8 right-6 z-20">
        <VolToggle />
      </div>
    </div>
  )
}
