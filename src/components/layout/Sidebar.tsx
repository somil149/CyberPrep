import { NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from '@stores/appStore'
import { getRoleById } from '@data/roles'

const NAV = [
  { to: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { to: '/questions', icon: '❓', label: 'Question Bank' },
  { to: '/interview', icon: '🎙️', label: 'Mock Interview' },
  { to: '/threat-model', icon: '🛡️', label: 'Threat Modeler', tier1: true },
  { to: '/agentic-studio', icon: '🧠', label: 'Agentic Studio', tier1: true },
  { to: '/roadmap', icon: '🗺️', label: 'Roadmap' },
  { to: '/flashcards', icon: '⚡', label: 'Flashcards' },
  { to: '/bookmarks', icon: '🔖', label: 'Bookmarks' },
]

const TIER1_IDS = ['cybersecurity', 'devsecops', 'aiml-security', 'agentic-ai', 'agentic-ai-security']

export default function Sidebar() {
  const { selectedRole, sidebarOpen, setSidebarOpen } = useAppStore()
  const navigate = useNavigate()
  const role = selectedRole ? getRoleById(selectedRole) : null
  const isTier1 = selectedRole ? TIER1_IDS.includes(selectedRole) : false

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-cyber-surface border-r border-cyber-border
          transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'}
          lg:relative lg:w-60 lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-cyber-border">
          <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center text-sm font-bold">
            CN
          </div>
          <div>
            <div className="text-sm font-bold text-gradient-blue">CyberPrep</div>
            <div className="text-[10px] text-cyber-muted">Nexus</div>
          </div>
        </div>

        {/* Active role */}
        {role && (
          <button
            onClick={() => navigate('/roles')}
            className="mx-3 mt-3 p-2.5 card-glass rounded-lg text-left hover:border-cyber-blue/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{role.icon}</span>
              <div className="min-w-0">
                <div className="text-xs font-medium text-cyber-text truncate">{role.title}</div>
                {isTier1 && <span className="badge-purple text-[9px] px-1.5 py-0">TIER 1</span>}
              </div>
            </div>
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, icon, label, tier1 }) => {
            if (tier1 && !isTier1) return null
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150
                  ${isActive
                    ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                    : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-card'
                  }`
                }
              >
                <span className="text-base w-5 text-center">{icon}</span>
                <span>{label}</span>
                {tier1 && <span className="ml-auto badge-purple text-[9px] px-1.5 py-0">T1</span>}
              </NavLink>
            )
          })}
        </nav>

        {/* Role switcher */}
        <div className="p-3 border-t border-cyber-border">
          <button
            onClick={() => navigate('/roles')}
            className="btn-secondary w-full text-xs py-1.5"
          >
            Switch Role
          </button>
        </div>
      </aside>
    </>
  )
}
