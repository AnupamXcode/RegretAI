import { useState } from 'react'
import EmotionSelector from './EmotionSelector'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import { Plus, X, ChevronRight, Info } from 'lucide-react'

const DecisionInputForm = ({ onResult, setLoading }) => {
  const [formData, setFormData] = useState({
    decisionTitle: '',
    description: '',
    options: [''],
    importance: 'medium',
    timeHorizon: 'short-term',
    riskTolerance: 50,
    emotion: 'neutral',
    uncertainty: 50,
  })

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const addOption = () => {
    if (formData.options.length < 5) {
      setFormData({ ...formData, options: [...formData.options, ''] })
    }
  }

  const removeOption = (index) => {
    if (formData.options.length > 1) {
      const newOptions = formData.options.filter((_, i) => i !== index)
      setFormData({ ...formData, options: newOptions })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await api.post('/predict', formData)
      onResult(result)
    } catch (err) {
      toast.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="label-text">Decision Title</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="e.g., Accepting the new job offer"
              value={formData.decisionTitle}
              onChange={(e) => setFormData({ ...formData, decisionTitle: e.target.value })}
            />
          </div>

          <div>
            <label className="label-text">Description (Context)</label>
            <textarea
              className="input-field min-h-[100px] resize-none"
              placeholder="Provide some background details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="label-text mb-0">Possible Options</label>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Max 5</span>
            </div>
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    className="input-field py-2"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {formData.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              {formData.options.length < 5 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm flex items-center justify-center gap-1 hover:border-indigo-300 hover:text-indigo-500 transition-all dark:border-slate-800"
                >
                  <Plus size={16} />
                  Add Another Option
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Behavioral Inputs */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Importance</label>
              <select
                className="input-field"
                value={formData.importance}
                onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="label-text">Time Horizon</label>
              <select
                className="input-field"
                value={formData.timeHorizon}
                onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
              >
                <option value="short-term">Short-term</option>
                <option value="long-term">Long-term</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="label-text mb-0">Risk Tolerance</label>
              <span className="text-sm font-bold text-indigo-600">{formData.riskTolerance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-800"
              value={formData.riskTolerance}
              onChange={(e) => setFormData({ ...formData, riskTolerance: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="label-text mb-0">Uncertainty Level</label>
              <span className="text-sm font-bold text-indigo-600">{formData.uncertainty}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-800"
              value={formData.uncertainty}
              onChange={(e) => setFormData({ ...formData, uncertainty: parseInt(e.target.value) })}
            />
          </div>

          <EmotionSelector 
            value={formData.emotion} 
            onChange={(val) => setFormData({ ...formData, emotion: val })} 
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          type="submit"
          className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
        >
          <span>Calculate Regret Probability</span>
          <ChevronRight size={22} />
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
          <Info size={12} />
          Predictions are based on algorithmic behavioral analysis and not guaranteed outcomes.
        </p>
      </div>
    </form>
  )
}

export default DecisionInputForm
