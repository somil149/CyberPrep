import { useLocation } from 'react-router-dom'
import { useAppStore } from '@stores/appStore'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/questions': 'Knowledge Arsenal',
  '/interview': 'Skills Assessment',
  '/threat-model': 'Threat Modeler',
  '/agentic-studio': 'Agentic AI Studio',
  '/roadmap': 'Learning Roadmap',
  '/flashcards': 'Flashcards',
  '/bookmarks': 'Bookmarks',
  '/about': 'About',
  '/roles': 'Select Role',
}

export default function TopNav() {
  const { sidebarOpen, setSidebarOpen, bookmarks } = useAppStore()
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] ?? 'CyberPrep Nexus'

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-cyber-border bg-cyber-surface/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn-ghost p-2 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-sm font-semibold text-cyber-text">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Offline indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20">
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse-slow" />
          <span className="text-[10px] text-cyber-green font-medium">Offline Ready</span>
        </div>

        {/* Bookmarks count */}
        {bookmarks.length > 0 && (
          <div className="badge-blue">
            🔖 {bookmarks.length}
          </div>
        )}
      </div>
    </header>
  )
}
