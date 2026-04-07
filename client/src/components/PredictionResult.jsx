import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react'

const PredictionResult = ({ prediction }) => {
  const { regret_probability, confidence, explanation, suggestions, top_factors } = prediction

  const getStatusColor = () => {
    if (regret_probability > 60) return 'text-rose-500'
    if (regret_probability > 35) return 'text-amber-500'
    return 'text-emerald-500'
  }

  const getBgColor = () => {
    if (regret_probability > 60) return 'bg-rose-500'
    if (regret_probability > 35) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-indigo-600" />
          Prediction Result
        </h3>
        
        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-6">
            {/* SVG Gauge */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="552.92"
                initial={{ strokeDashoffset: 552.92 }}
                animate={{ strokeDashoffset: 552.92 - (552.92 * regret_probability) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={getStatusColor()}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black ${getStatusColor()}`}>{regret_probability}%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Regret Risk</span>
            </div>
          </div>

          <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-slate-500">Confidence Score</span>
              <span className="font-bold text-indigo-600">{confidence}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10 rounded-r-xl">
          <p className="text-sm font-medium leading-relaxed italic">
            "{explanation}"
          </p>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          Smart Suggestions
        </h3>
        <ul className="space-y-3">
          {suggestions.map((suggestion, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
            >
              <div className="mt-1">
                <CheckCircle2 size={16} className="text-indigo-500" />
              </div>
              {suggestion}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PredictionResult
