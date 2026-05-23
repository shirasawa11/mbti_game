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
      <p className="text-maze-subtle text-xs tracking-[0.2em] uppercase text-center mb-4">
        行为分析
      </p>

      <p className="text-maze-text text-sm leading-relaxed mb-4">
        {personality.summary}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-maze-900/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-subtle text-xs mb-2">社交方式</p>
          <p className="text-maze-text text-sm">{analysis.socialTendency}</p>
        </div>
        <div className="bg-maze-900/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-subtle text-xs mb-2">决策风格</p>
          <p className="text-maze-text text-sm">{analysis.decisionStyle}</p>
        </div>
        <div className="bg-maze-900/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-subtle text-xs mb-2">行动模式</p>
          <p className="text-maze-text text-sm">{analysis.riskAttitude}</p>
        </div>
        <div className="bg-maze-900/50 rounded-lg p-3 border border-maze-700">
          <p className="text-maze-subtle text-xs mb-2">决策次数</p>
          <p className="text-maze-text text-sm">{analysis.totalChoices} 次关键选择</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-maze-accent text-xs font-medium mb-2">优势</p>
          <ul className="space-y-1">
            {personality.strengths.slice(0, 3).map((s) => (
              <li key={s} className="text-maze-text text-xs">+ {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-maze-rose text-xs font-medium mb-2">弱点</p>
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
