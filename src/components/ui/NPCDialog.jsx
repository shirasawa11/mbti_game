import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'

const speakerLabels = {
  narrator: { label: '旁白', color: 'text-maze-subtle' },
  wounded_traveler: { label: '负伤的旅人', color: 'text-amber-400' },
  whispering_voice: { label: '低语之声', color: 'text-blue-400' },
  shadow_guide: { label: '暗影引路人', color: 'text-purple-400' },
  mirror_self: { label: '镜中倒影', color: 'text-rose-400' },
  maze_keeper: { label: '迷宫守护者', color: 'text-maze-gold' },
}

export default function NPCDialog({ speaker, text, emotion, onComplete }) {
  const info = speakerLabels[speaker] || { label: speaker, color: 'text-maze-subtle' }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-4"
    >
      {speaker !== 'narrator' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                           bg-maze-700 border border-maze-500 ${info.color}`}>
            {info.label[0]}
          </div>
          <span className={`text-sm font-medium ${info.color}`}>
            {info.label}
          </span>
        </motion.div>
      )}
      <div className={speaker === 'narrator' ? 'pl-0' : 'pl-11'}>
        <p className={`leading-relaxed ${speaker === 'narrator' ? 'text-maze-subtle italic text-sm' : 'text-maze-text text-base'}`}>
          <TypewriterText text={text} onComplete={onComplete} />
        </p>
      </div>
    </motion.div>
  )
}
