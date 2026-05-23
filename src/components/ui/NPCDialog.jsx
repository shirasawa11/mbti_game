import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'

const speakerLabels = {
  narrator: { label: 'SYSTEM', color: 'text-maze-muted', accent: 'border-maze-muted/30' },
  wounded_traveler: { label: '负伤的旅人', color: 'text-amber-400', accent: 'border-amber-400/30' },
  whispering_voice: { label: '低语之声', color: 'text-blue-400', accent: 'border-blue-400/30' },
  shadow_guide: { label: '暗影引路人', color: 'text-purple-400', accent: 'border-purple-400/30' },
  mirror_self: { label: '镜中倒影', color: 'text-rose-400', accent: 'border-rose-400/30' },
  maze_keeper: { label: '迷宫守护者', color: 'text-maze-gold', accent: 'border-maze-gold/30' },
}

export default function NPCDialog({ speaker, text, emotion, onComplete }) {
  const info = speakerLabels[speaker] || { label: speaker, color: 'text-maze-subtle', accent: 'border-maze-subtle/30' }
  const isNarrator = speaker === 'narrator'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-4"
    >
      {!isNarrator && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-2.5"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold
                           bg-maze-800 border ${info.accent} ${info.color}`}>
            {info.label[0]}
          </div>
          <div>
            <span className={`text-sm font-semibold ${info.color} tracking-wide font-[family-name:var(--font-display)]`}>
              {info.label}
            </span>
          </div>
        </motion.div>
      )}

      <div className={`relative ${
        isNarrator
          ? 'bg-maze-950/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-maze-700/20'
          : 'bg-maze-950/55 backdrop-blur-sm rounded-xl px-4 py-3 border border-maze-700/25'
      }`}>
        <p className={`leading-relaxed tracking-wide ${
          isNarrator
            ? 'text-maze-muted italic text-sm font-[family-name:var(--font-serif)]'
            : 'text-maze-text text-sm'
        }`}>
          <TypewriterText text={text} onComplete={onComplete} />
        </p>
      </div>
    </motion.div>
  )
}
