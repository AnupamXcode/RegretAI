import { motion } from 'framer-motion'
import { Calendar, Trash2, ChevronRight, AlertCircle } from 'lucide-react'

const DecisionHistoryCard = ({ decision, onDelete }) => {
  const { 
    decisionTitle, 
    createdAt, 
    importance, 
    prediction, 
    emotion, 
    emotionScore 
  } = decision

  const regretProb = prediction?.regretProbability || 0
  
  const getStatusColor = () => {
    if (regretProb > 60) return 'text-rose-500'
    if (regretProb > 35) return 'text-amber-500'
    return 'text-emerald-500'
  }

  const getBadgeColor = () => {
    switch (importance) {
      case 'high': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
      case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
      default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    }
  }

  const date = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="glass-card group flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeColor()}`}>
            {importance} Importance
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
            <Calendar size={12} />
            {date}
          </span>
        </div>
        <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
          {decisionTitle}
        </h3>
        <p className="text-sm text-slate-500 mt-2 line-clamp-1">
          Emotional state: {emotion} • Emotion Score: {(emotionScore * 100).toFixed(0)}%
        </p>
      </div>

      <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-8">
        <div className="text-center">
          <div className={`text-3xl font-black ${getStatusColor()}`}>
            {regretProb}%
          </div>
          <div className="text-[10px] font-bold uppercase text-slate-400">Probability</div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onDelete}
            className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all dark:hover:bg-rose-900/10"
            title="Delete Prediction"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DecisionHistoryCard
