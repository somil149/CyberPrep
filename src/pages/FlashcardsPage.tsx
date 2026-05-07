import { useState } from 'react'
import { useAppStore } from '@stores/appStore'
import { getRoleById } from '@data/roles'
import { getFlashcardsByRole } from '@data/flashcards'

export default function FlashcardsPage() {
  const { selectedRole } = useAppStore()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())

  if (!selectedRole) {
    return <div className="flex items-center justify-center h-64 text-cyber-muted text-sm">Select a role to view flashcards.</div>
  }

  const role = getRoleById(selectedRole)!
  const cards = getFlashcardsByRole(selectedRole)

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <span className="text-4xl">⚡</span>
        <p className="text-cyber-muted text-sm">No flashcards yet for {role.title}.</p>
      </div>
    )
  }

  const card = cards[currentIdx]
  const progress = Math.round((known.size / cards.length) * 100)

  const next = () => { setCurrentIdx((i) => (i + 1) % cards.length); setFlipped(false) }
  const prev = () => { setCurrentIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(false) }
  const markKnown = () => { setKnown((prev) => { const n = new Set(prev); n.add(card.id); return n }); next() }

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="section-title">{role.icon} Flashcards</h1>
          <p className="text-xs text-cyber-muted mt-0.5">{cards.length} cards · {known.size} mastered</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gradient-blue">{progress}%</div>
          <div className="text-xs text-cyber-muted">Mastered</div>
        </div>
      </div>

      <div className="h-1.5 bg-cyber-surface rounded-full overflow-hidden">
        <div className="h-full bg-gradient-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-center text-xs text-cyber-muted">{currentIdx + 1} / {cards.length}</div>

      {/* Card */}
      <button
        onClick={() => setFlipped(!flipped)}
        className={`w-full min-h-[220px] card cursor-pointer transition-all duration-300 hover:border-cyber-blue/40
          ${flipped ? 'border-cyber-cyan/40 bg-cyber-cyan/5' : 'border-cyber-border'}
          ${known.has(card.id) ? 'opacity-60' : ''}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 py-6">
          <div className="badge-blue text-xs">{flipped ? 'Answer' : 'Question'}</div>
          <p className={`text-center leading-relaxed ${flipped ? 'text-sm text-cyber-text' : 'text-base font-semibold text-cyber-text'}`}>
            {flipped ? card.back : card.front}
          </p>
          {!flipped && <p className="text-xs text-cyber-muted">Click to reveal answer</p>}
          <div className="flex flex-wrap gap-1 justify-center">
            {card.tags.map((t) => <span key={t} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{t}</span>)}
          </div>
        </div>
      </button>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={prev} className="btn-secondary px-4">← Prev</button>
        <div className="flex gap-2">
          {flipped && (
            <button onClick={markKnown} className="btn-primary text-sm px-4">
              ✓ Got it
            </button>
          )}
          <button onClick={() => setFlipped(!flipped)} className="btn-secondary text-sm px-4">
            {flipped ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <button onClick={next} className="btn-secondary px-4">Next →</button>
      </div>

      {known.size > 0 && (
        <button
          onClick={() => { setKnown(new Set()); setCurrentIdx(0); setFlipped(false) }}
          className="w-full btn-ghost text-xs text-cyber-muted"
        >
          Reset progress
        </button>
      )}
    </div>
  )
}
