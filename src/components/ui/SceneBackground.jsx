import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const atmosphereConfigs = {
  oppressive: {
    gradient: ['#001125', '#001D4A', '#001125'],
    particles: 'dust',
    particleSpeed: 1.8,
    accentColor: 'rgba(236, 164, 0, 0.08)',
    overlay: 'radial-gradient(ellipse at 30% 20%, rgba(236,164,0,0.04) 0%, transparent 50%)',
  },
  mysterious: {
    gradient: ['#001125', '#001D4A', '#001530'],
    particles: 'energy',
    particleSpeed: 1.0,
    accentColor: 'rgba(0, 105, 146, 0.2)',
    overlay: 'radial-gradient(ellipse at 60% 30%, rgba(0,105,146,0.1) 0%, transparent 50%), radial-gradient(ellipse at 40% 70%, rgba(236,164,0,0.03) 0%, transparent 40%)',
  },
  tense: {
    gradient: ['#001125', '#101520', '#0a1018'],
    particles: 'ember',
    particleSpeed: 1.5,
    accentColor: 'rgba(180, 100, 40, 0.2)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(180,100,20,0.06) 0%, transparent 60%)',
  },
  calm: {
    gradient: ['#001530', '#001D4A', '#27476E'],
    particles: 'light_mote',
    particleSpeed: 0.45,
    accentColor: 'rgba(0, 105, 146, 0.12)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(0,105,146,0.06) 0%, transparent 55%)',
  },
  solemn: {
    gradient: ['#001530', '#001D4A', '#101828'],
    particles: 'light_mote',
    particleSpeed: 0.35,
    accentColor: 'rgba(236, 164, 0, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(236,164,0,0.06) 0%, transparent 50%)',
  },
  fog: {
    gradient: ['#001530', '#001D4A', '#27476E'],
    particles: 'energy',
    particleSpeed: 0.55,
    accentColor: 'rgba(0, 105, 146, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(0,105,146,0.05) 0%, transparent 60%)',
  },
  fog_dark: {
    gradient: ['#001125', '#001530', '#000a18'],
    particles: 'dust',
    particleSpeed: 0.3,
    accentColor: 'rgba(0, 105, 146, 0.06)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(0,30,60,0.05) 0%, transparent 50%)',
  },
  mirror_room: {
    gradient: ['#001530', '#001D4A', '#0a2035'],
    particles: 'energy',
    particleSpeed: 1.1,
    accentColor: 'rgba(0, 105, 146, 0.15)',
    overlay: 'radial-gradient(ellipse at 50% 40%, rgba(0,105,146,0.08) 0%, transparent 45%), radial-gradient(ellipse at 50% 60%, rgba(0,105,146,0.04) 0%, transparent 45%)',
  },
  red_glow: {
    gradient: ['#001125', '#151018', '#0a0a14'],
    particles: 'ember',
    particleSpeed: 1.6,
    accentColor: 'rgba(200, 120, 40, 0.2)',
    overlay: 'radial-gradient(ellipse at 50% 60%, rgba(200,120,20,0.08) 0%, transparent 50%)',
  },
  abyss: {
    gradient: ['#000810', '#001125', '#00050a'],
    particles: 'ember',
    particleSpeed: 0.5,
    accentColor: 'rgba(39, 71, 110, 0.15)',
    overlay: 'radial-gradient(ellipse at 50% 80%, rgba(39,71,110,0.08) 0%, transparent 40%)',
  },
  abyss_fade: {
    gradient: ['#001530', '#001D4A', '#27476E'],
    particles: 'light_mote',
    particleSpeed: 0.4,
    accentColor: 'rgba(0, 105, 146, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(0,105,146,0.05) 0%, transparent 50%)',
  },
  core: {
    gradient: ['#001D4A', '#27476E', '#101820'],
    particles: 'light_mote',
    particleSpeed: 0.7,
    accentColor: 'rgba(236, 164, 0, 0.15)',
    overlay: 'radial-gradient(ellipse at 50% 40%, rgba(236,164,0,0.08) 0%, transparent 50%)',
  },
  fog_fade: {
    gradient: ['#001530', '#001D4A', '#27476E'],
    particles: 'light_mote',
    particleSpeed: 0.5,
    accentColor: 'rgba(0, 105, 146, 0.08)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(0,105,146,0.05) 0%, transparent 55%)',
  },
  default: {
    gradient: ['#001125', '#001D4A', '#001530'],
    particles: 'dust',
    particleSpeed: 1.0,
    accentColor: 'rgba(0, 105, 146, 0.1)',
    overlay: 'radial-gradient(ellipse at 50% 30%, rgba(0,105,146,0.05) 0%, transparent 50%)',
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
      return { ...base, speed: 0.015 + Math.random() * 0.04, wobble: 0.15 + Math.random() * 0.35, color: `rgba(188,201,176,${base.opacity})` }
    case 'energy':
      return { ...base, size: 0.3 + Math.random() * 1.5, speed: 0.04 + Math.random() * 0.12, color: `rgba(0,140,180,${base.opacity})`, trail: true }
    case 'ember':
      return { ...base, speed: 0.05 + Math.random() * 0.2, size: 0.5 + Math.random() * 2.5, color: `rgba(236,${140 + Math.floor(Math.random() * 60)},${20 + Math.floor(Math.random() * 30)},${base.opacity})`, rise: true }
    case 'light_mote':
      return { ...base, speed: 0.02 + Math.random() * 0.06, size: 0.3 + Math.random() * 1, color: `rgba(236,210,150,${base.opacity})`, glow: true }
    default:
      return base
  }
}

export default function SceneBackground({ atmosphere = 'default', backgroundId, children }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)
  const speedRef = useRef(1.0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imgExt, setImgExt] = useState('png')
  const config = atmosphereConfigs[atmosphere] || atmosphereConfigs.default
  speedRef.current = config.particleSpeed || 1.0

  const imageSrc = backgroundId ? `/images/backgrounds/${backgroundId}.${imgExt}` : null

  // Reset image state when background changes
  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
    setImgExt('png')
  }, [backgroundId])

  const handleImgError = () => {
    if (imgExt === 'png') {
      setImgExt('jpg')
    } else {
      setImgError(true)
    }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const particles = particlesRef.current

    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      if (p.rise) {
        p.y -= p.speed * 0.15 * speedRef.current
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
      } else {
        p.y += p.speed * 0.1 * speedRef.current * Math.sin(Date.now() * 0.00025 + p.phase)
      }
      p.x += Math.sin(Date.now() * 0.0004 + p.phase) * p.wobble * 0.08 * speedRef.current || 0

      if (p.y > 1.05) p.y = -0.05
      if (p.x > 1.05) p.x = -0.05
      if (p.x < -0.05) p.x = 1.05

      const px = p.x * w
      const py = p.y * h
      const alpha = 0.3 + 0.7 * Math.sin(Date.now() * 0.0005 + p.phase)

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
  const showImage = imageSrc && !imgError

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
        {/* Base gradient (always visible, behind image) */}
        <div className="absolute inset-0" style={{ background: gradientStr }} />

        {/* Background image */}
        {showImage && (
          <motion.div
            key={backgroundId}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: imgLoaded ? 1 : 0, filter: imgLoaded ? 'blur(0px)' : 'blur(16px)' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={imageSrc}
              alt=""
              onLoad={() => setImgLoaded(true)}
              onError={handleImgError}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle dark overlay on image for text readability */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0, 5, 16, 0.35)' }}
            />
          </motion.div>
        )}

        {/* Ambient overlay */}
        <div className="absolute inset-0" style={{ background: config.overlay }} />

        {/* Canvas particles */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          animate={{ opacity: [0, 0.6, 0.6, 0, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', times: [0, 0.1, 0.45, 0.55, 1] }}
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
