import { motion } from 'framer-motion'

const emotions = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'confused', emoji: '🤔', label: 'Confused' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
]

const EmotionSelector = ({ value, onChange }) => {
  return (
    <div>
      <label className="label-text">Current Emotional State</label>
      <div className="flex justify-between gap-2 mt-2">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            type="button"
            onClick={() => onChange(emotion.id)}
            className={`flex flex-col items-center gap-1 flex-1 p-2 rounded-xl transition-all ${
              value === emotion.id
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className="text-[10px] font-bold uppercase">{emotion.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmotionSelector
