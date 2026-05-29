import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudioStore from '../../store/audioStore'

// Speaker SVG icon — matches the game's thin-line, geometric aesthetic
function SpeakerOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  )
}

function SpeakerOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

export default function VolToggle() {
  const volume = useAudioStore((s) => s.volume)
  const muted = useAudioStore((s) => s.muted)
  const setVolume = useAudioStore((s) => s.setVolume)
  const toggleMute = useAudioStore((s) => s.toggleMute)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center rounded
                   text-maze-muted hover:text-maze-subtle transition-colors duration-200 cursor-pointer"
        title="音量"
      >
        {muted || volume === 0 ? <SpeakerOff /> : <SpeakerOn />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-2 flex items-center gap-2 px-3 py-2
                       bg-[#0a1018]/95 border border-maze-700/60 rounded
                       shadow-[0_8px_24px_rgba(0,0,0,0.6)] origin-left"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={toggleMute}
              className="text-maze-muted hover:text-maze-subtle transition-colors cursor-pointer shrink-0"
              title={muted ? '取消静音' : '静音'}
            >
              {muted || volume === 0 ? <SpeakerOff /> : <SpeakerOn />}
            </button>
            <div className="relative flex items-center h-4" style={{ width: 80 }}>
              <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                <div className="w-full h-px bg-maze-700 rounded-full" />
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center rounded-full"
                style={{
                  width: `${(muted ? 0 : volume) * 100}%`,
                  background: 'linear-gradient(90deg, rgba(0,105,146,0.5), rgba(0,105,146,0.8))',
                  height: 1,
                }}
              />
              <div
                className="absolute w-2.5 h-2.5 rounded-full cursor-pointer"
                style={{
                  left: `calc(${(muted ? 0 : volume) * 100}% - 5px)`,
                  background: '#006992',
                  boxShadow: '0 0 6px rgba(0,105,146,0.5)',
                }}
                onPointerDown={(e) => {
                  e.preventDefault()
                  const bar = e.currentTarget.parentElement
                  const rect = bar.getBoundingClientRect()
                  const update = (ev) => {
                    const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
                    setVolume(x)
                    if (muted && x > 0) toggleMute()
                  }
                  update(e)
                  const up = () => { document.removeEventListener('pointermove', update); document.removeEventListener('pointerup', up) }
                  document.addEventListener('pointermove', update)
                  document.addEventListener('pointerup', up)
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
