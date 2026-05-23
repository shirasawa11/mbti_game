import { motion } from 'framer-motion'
import { analyzeBehavior } from '../../utils/mbtiCalculator'

export default function BehaviorSummary({ personality, choiceHistory }) {
  const analysis = analyzeBehavior(choiceHistory)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.4, duration: 0.8 }}
      className="maze-card p-5 mx-4 max-w-md w-full"
    >
      <p className="text-maze-muted text-[10px] tracking-[0.2em] uppercase text-center mb-4 font-medium">
        Behavioral Analysis
      </p>

      <p className="text-maze-text text-sm leading-relaxed mb-5 font-[family-name:var(--font-serif)]">
        {personality.summary}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-2">社交方式</p>
          <p className="text-maze-text text-sm font-medium">{analysis.socialTendency}</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-2">决策风格</p>
          <p className="text-maze-text text-sm font-medium">{analysis.decisionStyle}</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-2">行动模式</p>
          <p className="text-maze-text text-sm font-medium">{analysis.riskAttitude}</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-2">关键决策</p>
          <p className="text-maze-text text-sm font-medium">{analysis.totalChoices} 次</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-maze-primary text-xs font-semibold mb-2 tracking-wide">STRENGTHS</p>
          <ul className="space-y-1">
            {personality.strengths.slice(0, 3).map((s) => (
              <li key={s} className="text-maze-text text-xs">+ {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-maze-cta text-xs font-semibold mb-2 tracking-wide">WEAKNESSES</p>
          <ul className="space-y-1">
            {personality.weaknesses.slice(0, 3).map((w) => (
              <li key={w} className="text-maze-text text-xs">- {w}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
