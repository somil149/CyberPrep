import { useState } from 'react'
import { useAppStore } from '@stores/appStore'
import { getRoleById } from '@data/roles'
import { getRoadmap } from '@data/roadmaps'

export default function RoadmapPage() {
  const { selectedRole } = useAppStore()
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  if (!selectedRole) {
    return <div className="flex items-center justify-center h-64 text-cyber-muted text-sm">Select a role to view your roadmap.</div>
  }

  const role = getRoleById(selectedRole)!
  const items = getRoadmap(selectedRole)
  const progress = Math.round((completed.size / items.length) * 100)

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title">{role.icon} {role.title} — Learning Roadmap</h1>
          <p className="text-xs text-cyber-muted mt-0.5">{items.length} milestones · {completed.size} completed</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient-blue">{progress}%</div>
          <div className="text-xs text-cyber-muted">Complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-cyber-surface rounded-full overflow-hidden">
        <div className="h-full bg-gradient-blue rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
      </div>

      {/* Roadmap items */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-cyber-border" />
        <div className="space-y-4">
          {items.map((item, i) => {
            const done = completed.has(item.id)
            return (
              <div key={item.id} className="flex gap-4 relative">
                <button
                  onClick={() => toggle(item.id)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all
                    ${done
                      ? 'bg-cyber-green border-cyber-green text-white'
                      : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:border-cyber-blue/50'
                    }`}
                >
                  {done ? '✓' : <span className="text-xs font-bold">{i + 1}</span>}
                </button>
                <div className={`card flex-1 transition-all ${done ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`text-sm font-semibold ${done ? 'line-through text-cyber-muted' : 'text-cyber-text'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-cyber-muted mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {item.resources.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.resources.map((r) => (
                        <a
                          key={r.label}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge-blue text-[10px] hover:opacity-80 transition-opacity"
                        >
                          🔗 {r.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
