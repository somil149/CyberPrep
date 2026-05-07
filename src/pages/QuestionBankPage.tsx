import { useState, useEffect } from 'react'
import { useAppStore } from '@stores/appStore'
import { getQuestionsByRole } from '@data/questions'
import { getRoleById } from '@data/roles'
import type { Question, QuestionCategory, Difficulty } from '@models/index'

const CATEGORIES: { value: QuestionCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'technical', label: 'Technical' },
  { value: 'system-design', label: 'System Design' },
  { value: 'scenario', label: 'Scenario' },
]

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  easy: 'badge-green',
  medium: 'badge-yellow',
  hard: 'badge-red',
  expert: 'badge-purple',
}

function QuestionCard({ q }: { q: Question }) {
  const [expanded, setExpanded] = useState(false)
  const { bookmarks, toggleBookmark } = useAppStore()
  const isBookmarked = bookmarks.includes(q.id)

  return (
    <div className="card hover:border-cyber-blue/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={DIFFICULTY_COLOR[q.difficulty]}>{q.difficulty}</span>
            <span className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">
              {q.category.replace('-', ' ')}
            </span>
            {q.tags.slice(0, 2).map((t) => (
              <span key={t} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{t}</span>
            ))}
          </div>
          <p className="text-sm text-cyber-text leading-relaxed">{q.question}</p>
        </div>
        <button
          onClick={() => toggleBookmark(q.id)}
          className={`text-lg flex-shrink-0 transition-colors ${isBookmarked ? 'text-cyber-yellow' : 'text-cyber-muted hover:text-cyber-yellow'}`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          🔖
        </button>
      </div>

      {(q.answer || q.hints) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-cyber-blue hover:text-cyber-cyan transition-colors"
        >
          {expanded ? '▲ Hide answer' : '▼ Show answer & explanation'}
        </button>
      )}

      {expanded && (
        <div className="mt-3 space-y-3 animate-fade-in">
          {/* Best Answer */}
          {(q.answer || q.sampleAnswer) && (
            <div className="bg-cyber-green/5 border border-cyber-green/20 rounded-lg p-3">
              <div className="text-xs font-semibold text-cyber-green mb-1.5">✅ Best Answer</div>
              <p className="text-xs text-cyber-text leading-relaxed">{q.answer ?? q.sampleAnswer}</p>
            </div>
          )}
          {/* Explanation */}
          {q.explanation && (
            <div className="bg-cyber-blue/5 border border-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs font-semibold text-cyber-blue mb-1.5">💡 Explanation</div>
              <p className="text-xs text-cyber-muted leading-relaxed">{q.explanation}</p>
            </div>
          )}
          {/* Hints (legacy) */}
          {q.hints && (
            <div className="bg-cyber-blue/5 border border-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs font-semibold text-cyber-blue mb-1.5">💡 Hints</div>
              <ul className="space-y-1">
                {q.hints.map((h, i) => (
                  <li key={i} className="text-xs text-cyber-muted flex gap-2"><span className="text-cyber-blue">→</span>{h}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Real World Context */}
          {q.realWorldContext && (
            <div className="bg-cyber-purple/5 border border-cyber-purple/20 rounded-lg p-3">
              <div className="text-xs font-semibold text-cyber-purple mb-1.5">🏢 Real-World Context</div>
              <p className="text-xs text-cyber-muted leading-relaxed">{q.realWorldContext}</p>
            </div>
          )}
          {/* Key Concepts */}
          {q.keyConcepts && q.keyConcepts.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-cyber-muted">Key concepts:</span>
              {q.keyConcepts.map((c) => (
                <span key={c} className="badge-blue text-[10px]">{c}</span>
              ))}
            </div>
          )}
          {/* Follow-up Questions */}
          {q.followUpQuestions && q.followUpQuestions.length > 0 && (
            <div className="bg-cyber-yellow/5 border border-cyber-yellow/20 rounded-lg p-3">
              <div className="text-xs font-semibold text-cyber-yellow mb-1.5">🔄 Follow-up Questions</div>
              <ul className="space-y-1">
                {q.followUpQuestions.map((fq, i) => (
                  <li key={i} className="text-xs text-cyber-muted flex gap-2"><span className="text-cyber-yellow">→</span>{fq}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function QuestionBankPage() {
  const { selectedRole } = useAppStore()
  const [category, setCategory] = useState<QuestionCategory | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [search, setSearch] = useState('')

  // Reset filters when role changes
  useEffect(() => {
    setCategory('all')
    setDifficulty('all')
    setSearch('')
  }, [selectedRole])

  if (!selectedRole) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <span className="text-4xl">❓</span>
        <p className="text-cyber-muted text-sm">Select a role to view questions.</p>
      </div>
    )
  }

  const role = getRoleById(selectedRole)!
  const all = getQuestionsByRole(selectedRole)

  const filtered = all.filter((q) => {
    if (category !== 'all' && q.category !== category) return false
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title">{role.icon} {role.title} — Knowledge Arsenal</h1>
          <p className="text-xs text-cyber-muted mt-0.5">{all.length} questions · {filtered.length} shown</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card space-y-3">
        <input
          className="input text-sm"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all
                ${category === value
                  ? 'bg-cyber-blue text-white'
                  : 'bg-cyber-surface text-cyber-muted border border-cyber-border hover:border-cyber-blue/40'
                }`}
            >
              {label}
            </button>
          ))}
          <div className="w-px bg-cyber-border mx-1" />
          {(['all', 'easy', 'medium', 'hard', 'expert'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize
                ${difficulty === d
                  ? 'bg-cyber-purple text-white'
                  : 'bg-cyber-surface text-cyber-muted border border-cyber-border hover:border-cyber-purple/40'
                }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-cyber-muted text-sm">No questions match your filters.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => <QuestionCard key={q.id} q={q} />)}
        </div>
      )}
    </div>
  )
}
