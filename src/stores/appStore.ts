import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RoleId, UserProgress } from '@models/index'

interface AppState {
  selectedRole: RoleId | null
  progress: Partial<Record<RoleId, UserProgress>>
  bookmarks: string[]
  sidebarOpen: boolean
  setRole: (role: RoleId) => void
  setProgress: (roleId: RoleId, progress: UserProgress) => void
  toggleBookmark: (questionId: string) => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedRole: null,
      progress: {},
      bookmarks: [],
      sidebarOpen: true,

      setRole: (role) => set({ selectedRole: role }),

      setProgress: (roleId, progress) =>
        set((state) => ({ progress: { ...state.progress, [roleId]: progress } })),

      toggleBookmark: (questionId) => {
        const { bookmarks } = get()
        set({
          bookmarks: bookmarks.includes(questionId)
            ? bookmarks.filter((id) => id !== questionId)
            : [...bookmarks, questionId],
        })
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'cyberprep-app' }
  )
)
