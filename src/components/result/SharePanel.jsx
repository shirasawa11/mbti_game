import { useRef } from 'react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'

export default function SharePanel({ mbtiType, personality }) {
  const cardRef = useRef(null)

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0a0a0f' })
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
    const text = `🧠 我在《人格迷宫》中测出了 ${mbtiType} - ${personality.title}。\n"${personality.poem}"\n来测测你的人格类型吧！`
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
        className="maze-card maze-glow p-6 mb-4 text-center"
      >
        <p className="text-maze-subtle text-xs tracking-[0.3em] uppercase mb-3">人格迷宫</p>
        <h2 className="text-3xl font-bold text-gradient mb-1">{mbtiType}</h2>
        <p className="text-maze-gold text-lg mb-2">{personality.title}</p>
        <p className="text-maze-subtle text-xs italic">"{personality.poem}"</p>
        <div className="mt-3 pt-3 border-t border-maze-700">
          <p className="text-maze-subtle text-[10px]">扫码或搜索"人格迷宫"来测试</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3 rounded-xl bg-maze-accent text-white font-medium
                    hover:bg-maze-accent/80 transition-all active:scale-95 cursor-pointer text-sm"
        >
          保存分享图
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 py-3 rounded-xl bg-maze-700 text-maze-text font-medium
                    hover:bg-maze-600 transition-all active:scale-95 cursor-pointer text-sm"
        >
          复制分享文案
        </button>
      </div>
    </motion.div>
  )
}
