import { useRef } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'

export default function SharePanel({ mbtiType, personality }) {
  const cardRef = useRef(null)

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0F0F23' })
        const link = document.createElement('a')
        link.download = `人格迷宫-${mbtiType}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error('Screenshot failed:', err)
      }
    }
  }

  const handleCopyLink = async () => {
    const text = `我在《人格迷宫》中测出了 ${mbtiType} - ${personality.title}。\n"${personality.poem}"\n来测测你的人格类型吧！`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.8, duration: 0.8 }}
      className="px-4 max-w-md w-full mx-auto"
    >
      <div
        ref={cardRef}
        className="maze-card maze-glow p-6 mb-4 text-center relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-maze-primary/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <p className="text-maze-muted text-[10px] tracking-[0.3em] uppercase mb-3 font-medium">人格迷宫</p>
          <h2 className="text-3xl font-bold text-gradient mb-1 font-[family-name:var(--font-display)] tracking-wider">{mbtiType}</h2>
          <p className="text-maze-gold text-lg tracking-wide mb-2">{personality.title}</p>
          <p className="text-maze-muted text-xs italic font-[family-name:var(--font-serif)]">"{personality.poem}"</p>
          <div className="mt-4 pt-3 border-t border-maze-700">
            <p className="text-maze-muted text-[10px]">发现你的人格真相 · 人格迷宫</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 min-h-[44px] py-3 rounded-xl bg-maze-primary/20 border border-maze-primary/40
                     text-maze-primary font-medium tracking-wide
                     hover:bg-maze-primary/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]
                     transition-all duration-200 active:scale-[0.97] cursor-pointer text-sm"
        >
          SAVE CARD
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 min-h-[44px] py-3 rounded-xl bg-maze-800 border border-maze-600
                     text-maze-subtle font-medium tracking-wide
                     hover:bg-maze-700 hover:text-maze-text
                     transition-all duration-200 active:scale-[0.97] cursor-pointer text-sm"
        >
          COPY TEXT
        </button>
      </div>
    </motion.div>
  )
}
