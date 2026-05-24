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

      {/* Story-integrated personality summary */}
      <p className="text-maze-text text-sm leading-relaxed mb-5 font-[family-name:var(--font-serif)]">
        {personality.summary}
      </p>

      {/* Detailed behavioral dimensions with story context */}
      <div className="space-y-3 mb-5">
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-primary text-xs font-semibold mb-1.5 tracking-wide">社交方式</p>
          <p className="text-maze-text text-sm font-medium mb-1">{analysis.socialTendency}</p>
          <p className="text-maze-muted text-xs leading-relaxed">{analysis.socialDetail}</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-primary text-xs font-semibold mb-1.5 tracking-wide">决策风格</p>
          <p className="text-maze-text text-sm font-medium mb-1">{analysis.decisionStyle}</p>
          <p className="text-maze-muted text-xs leading-relaxed">{analysis.decisionDetail}</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-primary text-xs font-semibold mb-1.5 tracking-wide">行动模式</p>
          <p className="text-maze-text text-sm font-medium mb-1">{analysis.riskAttitude}</p>
          <p className="text-maze-muted text-xs leading-relaxed">{analysis.riskDetail}</p>
        </div>
      </div>

      {/* Key moment */}
      {analysis.keyMoment && (
        <div className="bg-maze-950/30 rounded-lg p-3 mb-5 border border-maze-gold/20">
          <p className="text-maze-gold text-xs font-semibold mb-1.5 tracking-wide">关键时刻</p>
          <p className="text-maze-text text-sm leading-relaxed font-[family-name:var(--font-serif)] italic">
            {analysis.keyMoment}
          </p>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700 text-center">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-1">关键决策</p>
          <p className="text-maze-primary text-xl font-bold font-[family-name:var(--font-display)]">{analysis.totalChoices}</p>
          <p className="text-maze-muted text-[10px]">次重大选择</p>
        </div>
        <div className="bg-maze-950/50 rounded-lg p-3 border border-maze-700 text-center">
          <p className="text-maze-muted text-[10px] uppercase tracking-wider mb-1">元素特质</p>
          <p className="text-maze-gold text-xl font-bold font-[family-name:var(--font-display)]">{personality.element}</p>
          <p className="text-maze-muted text-[10px]">核心属性</p>
        </div>
      </div>

      {/* Strengths & weaknesses */}
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
