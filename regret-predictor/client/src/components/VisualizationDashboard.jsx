import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { PieChart as PieIcon, BarChart3 } from 'lucide-react'

const VisualizationDashboard = ({ prediction }) => {
  const { top_factors, regret_probability } = prediction
  
  const pieData = [
    { name: 'Regret Risk', value: regret_probability },
    { name: 'Certainty', value: 100 - regret_probability },
  ]
  
  const COLORS = ['#6366f1', '#e2e8f0']
  const DARK_COLORS = ['#818cf8', '#1e293b']

  return (
    <div className="space-y-6">
      <div className="glass-card h-[350px]">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <BarChart3 size={20} className="text-indigo-600" />
          Top Contributing Factors
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={top_factors} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="factor" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fontWeight: 500 }}
              width={100}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            />
            <Bar 
              dataKey="impact" 
              fill="#6366f1" 
              radius={[0, 10, 10, 0]}
              barSize={24}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card h-[350px]">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <PieIcon size={20} className="text-indigo-600" />
          Decision Breakdown
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400 -mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            Regret Risk
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800"></div>
            Safety Margin
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizationDashboard
