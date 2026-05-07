import { useNavigate, Link } from 'react-router-dom'
import { useAppStore } from '@stores/appStore'
import { getRoleById } from '@data/roles'
import { getDashboardConfig } from '@data/dashboard'
import type { RoleId } from '@models/index'

export default function DashboardPage() {
  const { selectedRole, bookmarks } = useAppStore()
  const navigate = useNavigate()

  if (!selectedRole) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <span className="text-5xl">🎯</span>
        <h2 className="text-xl font-bold text-cyber-text">No Role Selected</h2>
        <p className="text-cyber-muted text-sm">Choose a career track to unlock your personalized dashboard.</p>
        <button className="btn-primary" onClick={() => navigate('/roles')}>Select a Role</button>
      </div>
    )
  }

  const role = getRoleById(selectedRole)!
  const config = getDashboardConfig(selectedRole as RoleId)
  const isTier1 = role.tier === 'tier1'

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Hero */}
      <div className={`card relative overflow-hidden ${isTier1 ? 'border-cyber-purple/30 tier1-glow' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 pointer-events-none" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl
              ${isTier1 ? 'bg-cyber-purple/10 border border-cyber-purple/30' : 'bg-cyber-blue/10 border border-cyber-blue/20'}`}>
              {role.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-cyber-text">{role.title}</h1>
                {isTier1 && <span className="badge-purple text-xs">⭐ TIER 1</span>}
              </div>
              <p className="text-cyber-muted text-sm">{role.subtitle}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {role.tags.map((tag) => (
                  <span key={tag} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/roles')} className="btn-secondary text-xs">
            Switch Role
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {config.highlights.map((stat, i) => (
          <div key={i} className="card text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.title === 'Bookmarks' ? bookmarks.length : stat.value}
            </div>
            <div className="text-xs text-cyber-muted mt-0.5">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {config.quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={action.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
          >
            <span className="mr-1.5">{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>

      {/* Modules */}
      <div>
        <h2 className="section-title mb-3">Preparation Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {config.featuredModules.map((mod) => (
            <Link
              key={mod.to}
              to={mod.to}
              className={`card group hover:scale-[1.02] transition-all duration-200 hover:border-cyber-blue/40
                ${mod.tier1 ? 'border-cyber-purple/20 hover:border-cyber-purple/40' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-cyber-text group-hover:text-cyber-blue transition-colors">
                      {mod.title}
                    </span>
                    {mod.tier1 && <span className="badge-purple text-[9px] px-1.5 py-0">T1</span>}
                  </div>
                  <p className="text-xs text-cyber-muted mt-0.5">{mod.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tier 1 banner */}
      {!isTier1 && (
        <div className="card border-cyber-purple/20 bg-cyber-purple/5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="text-sm font-semibold text-cyber-purple">Unlock Tier 1 Tracks</div>
              <p className="text-xs text-cyber-muted mt-0.5">
                Switch to Cybersecurity, DevSecOps, AI/ML Security, or Agentic AI roles to access
                Threat Modeling, AI Red Teaming, and Agentic Studio modules.
              </p>
            </div>
            <button onClick={() => navigate('/roles')} className="btn-secondary text-xs ml-auto whitespace-nowrap">
              Explore Tier 1
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
