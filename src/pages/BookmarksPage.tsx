import { useAppStore } from '@stores/appStore'
import { getQuestionById } from '@data/questions'
import { getRoleById } from '@data/roles'
import type { Difficulty } from '@models/index'

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  easy: 'badge-green',
  medium: 'badge-yellow',
  hard: 'badge-red',
  expert: 'badge-purple',
}

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useAppStore()
  const questions = bookmarks.map((id) => getQuestionById(id)).filter(Boolean)

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <span className="text-4xl">🔖</span>
        <h2 className="text-lg font-semibold text-cyber-text">No Bookmarks Yet</h2>
        <p className="text-cyber-muted text-sm">Bookmark questions from the Knowledge Arsenal to save them here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">🔖 Bookmarks</h1>
          <p className="text-xs text-cyber-muted mt-0.5">{questions.length} saved questions</p>
        </div>
        <button
          onClick={() => bookmarks.forEach((id) => toggleBookmark(id))}
          className="btn-secondary text-xs"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q) => {
          if (!q) return null
          const role = getRoleById(q.roleId)
          return (
            <div key={q.id} className="card hover:border-cyber-yellow/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {role && <span className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{role.icon} {role.title}</span>}
                    <span className={DIFFICULTY_COLOR[q.difficulty]}>{q.difficulty}</span>
                    <span className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{q.category.replace('-', ' ')}</span>
                  </div>
                  <p className="text-sm text-cyber-text leading-relaxed">{q.question}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {q.tags.map((t) => <span key={t} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{t}</span>)}
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  className="text-cyber-yellow hover:text-cyber-muted transition-colors text-lg flex-shrink-0"
                  aria-label="Remove bookmark"
                >
                  🔖
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
