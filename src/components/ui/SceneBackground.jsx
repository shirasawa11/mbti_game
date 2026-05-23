import { useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const atmosphereConfigs = {
  oppressive: {
    gradient: ['#0a0a12', '#111122', '#0d0d18'],
    particles: 'dust',
    accentColor: 'rgba(180, 150, 120, 0.15)',
    overlay: 'radial-gradient(ellipse at 30% 20%, rgba(200,160,100,0.06) 0%, transparent 50%)',
  },
  mysterious: {
    gradient: ['#0a0a16', '#0f0f28', '#0a0f1f'],
    particles: 'energy',
    accentColor: 'rgba(100, 80, 220, 0.2)',
    overlay: 'radial-gradient(ellipse at 60% 30%, rgba(80,60,200,0.08) 0%, transparent 50%), radial-gradient(ellipse at 40% 70%, rgba(60,180,220,0.04) 0%, transparent 40%)',
  },
  tense: {
    gradient: ['#0f0a0a', '#1a1015', '#120a0e'],
    particles: 'ember',
    accentColor: 'rgba(220, 60, 60, 0.2)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(200,40,40,0.06) 0%, transparent 60%)',
  },
  calm: {
    gradient: ['#0a0a18', '#111130', '#0e0e20'],
    particles: 'light_mote',
    accentColor: 'rgba(180, 160, 220, 0.15)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(140,120,220,0.08) 0%, transparent 55%)',
  },
  solemn: {
    gradient: ['#0f0f18', '#151528', '#101018'],
    particles: 'light_mote',
    accentColor: 'rgba(200, 180, 140, 0.15)',
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(220,200,140,0.08) 0%, transparent 50%)',
  },
  fog: {
    gradient: ['#0c0c1a', '#141428', '#0e0e20'],
    particles: 'energy',
    accentColor: 'rgba(160, 180, 210, 0.08)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(150,170,200,0.04) 0%, transparent 60%)',
  },
  fog_dark: {
    gradient: ['#080812', '#0e0e1e', '#060610'],
    particles: 'dust',
    accentColor: 'rgba(100, 100, 130, 0.08)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(60,60,80,0.03) 0%, transparent 50%)',
  },
  mirror_room: {
    gradient: ['#0a0a1a', '#121030', '#0a0a20'],
    particles: 'energy',
    accentColor: 'rgba(180, 150, 220, 0.12)',
    overlay: 'radial-gradient(ellipse at 50% 40%, rgba(180,150,220,0.06) 0%, transparent 45%), radial-gradient(ellipse at 50% 60%, rgba(150,180,220,0.04) 0%, transparent 45%)',
  },
  red_glow: {
    gradient: ['#0f0a0a', '#1a0e12', '#10080a'],
    particles: 'ember',
    accentColor: 'rgba(220, 60, 50, 0.2)',
    overlay: 'radial-gradient(ellipse at 50% 60%, rgba(220,40,40,0.1) 0%, transparent 50%)',
  },
  abyss: {
    gradient: ['#050510', '#0a0a18', '#030308'],
    particles: 'ember',
    accentColor: 'rgba(80, 40, 80, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 80%, rgba(100,20,80,0.06) 0%, transparent 40%)',
  },
  abyss_fade: {
    gradient: ['#080818', '#121228', '#0a0a18'],
    particles: 'light_mote',
    accentColor: 'rgba(140, 120, 180, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(140,120,200,0.06) 0%, transparent 50%)',
  },
  core: {
    gradient: ['#0f0f18', '#1a1a28', '#121218'],
    particles: 'light_mote',
    accentColor: 'rgba(220, 200, 160, 0.12)',
    overlay: 'radial-gradient(ellipse at 50% 40%, rgba(240,220,180,0.1) 0%, transparent 50%)',
  },
  fog_fade: {
    gradient: ['#0c0c1e', '#161630', '#0e0e20'],
    particles: 'light_mote',
    accentColor: 'rgba(160, 180, 210, 0.08)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(180,200,220,0.06) 0%, transparent 55%)',
  },
  default: {
    gradient: ['#0a0a14', '#121222', '#0c0c18'],
    particles: 'dust',
    accentColor: 'rgba(150, 140, 180, 0.12)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(120,100,200,0.06) 0%, transparent 50%)',
  },
}

function createParticles(count, type) {
  const particles = []
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(type))
  }
  return particles
}

function createParticle(type) {
  const base = {
    x: Math.random(),
    y: Math.random(),
    size: 0.5 + Math.random() * 2,
    speed: 0.1 + Math.random() * 0.4,
    opacity: 0.1 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
  }

  switch (type) {
    case 'dust':
      return { ...base, speed: 0.05 + Math.random() * 0.15, wobble: 0.3 + Math.random() * 0.7, color: `rgba(180,160,140,${base.opacity})` }
    case 'energy':
      return { ...base, size: 0.3 + Math.random() * 1.5, speed: 0.15 + Math.random() * 0.5, color: `rgba(140,100,255,${base.opacity})`, trail: true }
    case 'ember':
      return { ...base, speed: 0.2 + Math.random() * 0.8, size: 0.5 + Math.random() * 2.5, color: `rgba(255,${80 + Math.floor(Math.random() * 100)},${20 + Math.floor(Math.random() * 40)},${base.opacity})`, rise: true }
    case 'light_mote':
      return { ...base, speed: 0.08 + Math.random() * 0.2, size: 0.3 + Math.random() * 1, color: `rgba(220,200,160,${base.opacity})`, glow: true }
    default:
      return base
  }
}

export default function SceneBackground({ atmosphere = 'default', children }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)
  const config = atmosphereConfigs[atmosphere] || atmosphereConfigs.default

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const particles = particlesRef.current

    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      // Update position
      if (p.rise) {
        p.y -= p.speed * 0.3
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
      } else {
        p.y += p.speed * 0.2 * Math.sin(Date.now() * 0.0005 + p.phase)
      }
      p.x += Math.sin(Date.now() * 0.0008 + p.phase) * p.wobble * 0.15 || 0

      // Wrap
      if (p.y > 1.05) p.y = -0.05
      if (p.x > 1.05) p.x = -0.05
      if (p.x < -0.05) p.x = 1.05

      const px = p.x * w
      const py = p.y * h
      const alpha = 0.3 + 0.7 * Math.sin(Date.now() * 0.001 + p.phase)

      ctx.beginPath()
      if (p.glow) {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4)
        glow.addColorStop(0, p.color)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.arc(px, py, p.size * 4, 0, Math.PI * 2)
      } else if (p.trail) {
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.6})`)
        ctx.arc(px, py, p.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`)
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
      } else {
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`)
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    animFrameRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = { dust: 40, energy: 50, ember: 35, light_mote: 30 }[config.particles] || 30
    particlesRef.current = createParticles(count, config.particles)
    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [atmosphere])

  const gradientStr = `linear-gradient(170deg, ${config.gradient[0]}, ${config.gradient[1]} 50%, ${config.gradient[2]})`

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={atmosphere}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 overflow-hidden"
      >
        {/* Base gradient */}
        <div className="absolute inset-0" style={{ background: gradientStr }} />

        {/* Ambient overlay */}
        <div className="absolute inset-0" style={{ background: config.overlay }} />

        {/* Canvas particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.7 }}
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        <div className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
