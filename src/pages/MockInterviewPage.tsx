import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@stores/appStore'
import { useInterviewStore } from '@stores/interviewStore'
import { getQuestionsByRole, getQuestionById } from '@data/questions'
import { getRoleById } from '@data/roles'
import type { RoleId } from '@models/index'

type Phase = 'setup' | 'active' | 'review'

const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
]

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-cyber-green' : score >= 60 ? 'bg-cyber-yellow' : 'bg-cyber-red'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-cyber-surface rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono text-cyber-text w-8 text-right">{score}%</span>
    </div>
  )
}

export default function MockInterviewPage() {
  const { selectedRole } = useAppStore()
  const { activeSession, startSession, submitAnswer, endSession } = useInterviewStore()
  const [phase, setPhase] = useState<Phase>('setup')
  const [duration, setDuration] = useState(30)
  const [qCount, setQCount] = useState(5)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [selfScore, setSelfScore] = useState(70)
  const [timeLeft, setTimeLeft] = useState(0)
  const [_completedSession, _setCompletedSession] = useState<typeof activeSession>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === 'active' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { handleFinish(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  if (!selectedRole) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <span className="text-4xl">🎙️</span>
        <p className="text-cyber-muted text-sm">Select a role to start a mock interview.</p>
      </div>
    )
  }

  const role = getRoleById(selectedRole)!
  const allQuestions = getQuestionsByRole(selectedRole)

  const handleStart = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, qCount)
    startSession(selectedRole as RoleId, shuffled.map((q) => q.id))
    setCurrentIdx(0)
    setAnswer('')
    setSelfScore(70)
    setTimeLeft(duration * 60)
    setPhase('active')
  }

  const handleNext = () => {
    if (!activeSession) return
    submitAnswer(activeSession.questions[currentIdx], answer, selfScore)
    if (currentIdx + 1 < activeSession.questions.length) {
      setCurrentIdx((i) => i + 1)
      setAnswer('')
      setSelfScore(70)
    } else {
      handleFinish()
    }
  }

  const handleFinish = async () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (activeSession && answer) {
      submitAnswer(activeSession.questions[currentIdx], answer, selfScore)
    }
    await endSession()
    setPhase('review')
  }

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // ── SETUP ────────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-3">🎙️</div>
          <h1 className="text-2xl font-bold text-gradient-blue">Mock Interview</h1>
          <p className="text-cyber-muted text-sm mt-1">{role.icon} {role.title}</p>
        </div>

        <div className="card space-y-5">
          <div>
            <label className="text-xs font-semibold text-cyber-muted uppercase tracking-wider mb-2 block">
              Duration
            </label>
            <div className="flex gap-2 flex-wrap">
              {DURATIONS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setDuration(value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${duration === value ? 'bg-cyber-blue text-white' : 'btn-secondary'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cyber-muted uppercase tracking-wider mb-2 block">
              Questions: {qCount}
            </label>
            <input
              type="range" min={3} max={Math.min(10, allQuestions.length)} value={qCount}
              onChange={(e) => setQCount(Number(e.target.value))}
              className="w-full accent-cyber-blue"
            />
            <div className="flex justify-between text-xs text-cyber-muted mt-1">
              <span>3</span><span>{Math.min(10, allQuestions.length)}</span>
            </div>
          </div>

          <div className="bg-cyber-surface rounded-lg p-3 text-xs text-cyber-muted space-y-1">
            <div className="flex justify-between"><span>Questions available</span><span className="text-cyber-text">{allQuestions.length}</span></div>
            <div className="flex justify-between"><span>Selected</span><span className="text-cyber-text">{qCount}</span></div>
            <div className="flex justify-between"><span>Time per question</span><span className="text-cyber-text">~{Math.round((duration * 60) / qCount / 60)} min</span></div>
          </div>

          <button onClick={handleStart} className="btn-primary w-full py-3 text-base">
            🚀 Start Interview
          </button>
        </div>
      </div>
    )
  }

  // ── ACTIVE ───────────────────────────────────────────────────────────────
  if (phase === 'active' && activeSession) {
    const q = getQuestionById(activeSession.questions[currentIdx])
    if (!q) return null
    const progress = ((currentIdx) / activeSession.questions.length) * 100
    const timeWarning = timeLeft < 120

    return (
      <div className="max-w-3xl mx-auto animate-fade-in space-y-4">
        {/* Progress bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 h-1.5 bg-cyber-surface rounded-full overflow-hidden">
            <div className="h-full bg-gradient-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-cyber-muted whitespace-nowrap">
            {currentIdx + 1} / {activeSession.questions.length}
          </span>
          <div className={`font-mono text-sm font-bold px-3 py-1 rounded-lg
            ${timeWarning ? 'bg-cyber-red/10 text-cyber-red border border-cyber-red/30' : 'bg-cyber-surface text-cyber-text border border-cyber-border'}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <div className="card border-cyber-blue/20">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="badge-blue text-xs">{q.category.replace('-', ' ')}</span>
            <span className={`badge text-xs ${q.difficulty === 'expert' ? 'badge-purple' : q.difficulty === 'hard' ? 'badge-red' : 'badge-yellow'}`}>
              {q.difficulty}
            </span>
          </div>
          <p className="text-cyber-text leading-relaxed">{q.question}</p>
          {q.hints && (
            <details className="mt-3">
              <summary className="text-xs text-cyber-blue cursor-pointer hover:text-cyber-cyan">💡 Show hints</summary>
              <ul className="mt-2 space-y-1">
                {q.hints.map((h, i) => <li key={i} className="text-xs text-cyber-muted flex gap-2"><span className="text-cyber-blue">→</span>{h}</li>)}
              </ul>
            </details>
          )}
        </div>

        {/* Answer */}
        <div className="card space-y-3">
          <label className="text-xs font-semibold text-cyber-muted uppercase tracking-wider">Your Answer</label>
          <textarea
            className="input min-h-[160px] resize-y font-mono text-sm"
            placeholder="Type your answer here... Structure it clearly with key points."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div>
            <div className="flex justify-between text-xs text-cyber-muted mb-2">
              <span>Self-assessment score</span>
              <span className="font-mono font-bold text-cyber-text">{selfScore}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={selfScore}
              onChange={(e) => setSelfScore(Number(e.target.value))}
              className="w-full accent-cyber-blue"
            />
            <div className="flex justify-between text-[10px] text-cyber-muted mt-1">
              <span>Needs work</span><span>Perfect</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleNext} className="btn-primary flex-1">
              {currentIdx + 1 < activeSession.questions.length ? 'Next Question →' : 'Finish Interview ✓'}
            </button>
            <button onClick={handleFinish} className="btn-secondary text-xs px-3">
              End Early
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── REVIEW ───────────────────────────────────────────────────────────────
  if (phase === 'review') {
    const { sessions } = useInterviewStore.getState()
    const last = sessions[sessions.length - 1]
    if (!last) return null
    const avg = last.overallScore ?? 0

    return (
      <div className="max-w-2xl mx-auto animate-fade-in space-y-5">
        <div className="text-center">
          <div className="text-5xl mb-3">{avg >= 80 ? '🏆' : avg >= 60 ? '👍' : '💪'}</div>
          <h1 className="text-2xl font-bold text-gradient-blue">Interview Complete</h1>
          <p className="text-cyber-muted text-sm mt-1">
            {new Date(last.startedAt).toLocaleTimeString()} · {last.questions.length} questions
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-gradient-blue mb-1">{Math.round(avg)}%</div>
          <div className="text-cyber-muted text-sm">Overall Score</div>
          <ScoreBar score={Math.round(avg)} />
        </div>

        <div className="card space-y-3">
          <h2 className="section-title">Question Breakdown</h2>
          {last.questions.map((qId, i) => {
            const q = getQuestionById(qId)
            const score = last.scores[qId] ?? 0
            return (
              <div key={qId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-cyber-muted truncate flex-1 mr-2">Q{i + 1}: {q?.question.slice(0, 60)}...</span>
                </div>
                <ScoreBar score={score} />
              </div>
            )
          })}
        </div>

        <button onClick={() => setPhase('setup')} className="btn-primary w-full">
          🔄 Start New Interview
        </button>
      </div>
    )
  }

  return null
}
