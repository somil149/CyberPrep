import { create } from 'zustand'
import type { InterviewSession, RoleId } from '@models/index'
import { db } from '@utils/db'

interface InterviewState {
  activeSession: InterviewSession | null
  sessions: InterviewSession[]
  startSession: (roleId: RoleId, questionIds: string[]) => void
  submitAnswer: (questionId: string, answer: string, score: number) => void
  endSession: () => Promise<void>
  loadSessions: (roleId: RoleId) => Promise<void>
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  activeSession: null,
  sessions: [],

  startSession: (roleId, questionIds) => {
    const session: InterviewSession = {
      id: crypto.randomUUID(),
      roleId,
      startedAt: Date.now(),
      questions: questionIds,
      answers: {},
      scores: {},
    }
    set({ activeSession: session })
  },

  submitAnswer: (questionId, answer, score) => {
    const { activeSession } = get()
    if (!activeSession) return
    set({
      activeSession: {
        ...activeSession,
        answers: { ...activeSession.answers, [questionId]: answer },
        scores: { ...activeSession.scores, [questionId]: score },
      },
    })
  },

  endSession: async () => {
    const { activeSession } = get()
    if (!activeSession) return
    const scores = Object.values(activeSession.scores)
    const completed: InterviewSession = {
      ...activeSession,
      completedAt: Date.now(),
      overallScore: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
    }
    await db.saveSession(completed)
    set((state) => ({ activeSession: null, sessions: [...state.sessions, completed] }))
  },

  loadSessions: async (roleId) => {
    const sessions = await db.getSessions(roleId)
    set({ sessions })
  },
}))
