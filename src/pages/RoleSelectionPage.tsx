import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@stores/appStore'
import { TIER1_ROLES, TIER2_ROLES } from '@data/roles'
import type { Role, RoleId } from '@models/index'

function RoleCard({ role, selected, onSelect }: { role: Role; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`card text-left w-full transition-all duration-200 hover:scale-[1.02] group
        ${selected
          ? 'border-cyber-blue/60 bg-cyber-blue/5 shadow-cyber'
          : 'hover:border-cyber-border/80 hover:bg-cyber-card/80'
        }
        ${role.tier === 'tier1' ? 'tier1-glow' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{role.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-cyber-text">{role.title}</span>
            {role.tier === 'tier1' && (
              <span className="badge-purple text-[9px] px-1.5 py-0">TIER 1</span>
            )}
            {selected && <span className="badge-blue text-[9px] px-1.5 py-0">ACTIVE</span>}
          </div>
          <div className="text-xs text-cyber-muted mt-0.5">{role.subtitle}</div>
          <p className="text-xs text-cyber-muted/80 mt-1.5 leading-relaxed line-clamp-2">{role.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {role.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[9px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function RoleSelectionPage() {
  const { selectedRole, setRole } = useAppStore()
  const navigate = useNavigate()

  const handleSelect = (roleId: RoleId) => {
    setRole(roleId)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 badge-blue mb-3 px-3 py-1">
          <span>🎯</span>
          <span className="text-xs">Select Your Role</span>
        </div>
        <h1 className="text-3xl font-bold text-gradient-blue mb-2">Choose Your Career Track</h1>
        <p className="text-cyber-muted text-sm max-w-lg mx-auto">
          Select your target role to unlock a personalized preparation experience with curated questions,
          mock interviews, and specialized tools.
        </p>
      </div>

      {/* Tier 1 */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-cyber-purple/50 to-transparent" />
          <div className="flex items-center gap-2">
            <span className="badge-purple px-3 py-1 text-xs font-semibold">⭐ TIER 1 — PRIORITY TRACKS</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-cyber-purple/50 to-transparent" />
        </div>
        <p className="text-xs text-cyber-muted text-center mb-4">
          Deep specialization with threat modeling, AI red-teaming, agentic design, and advanced simulations
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TIER1_ROLES.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onSelect={() => handleSelect(role.id)}
            />
          ))}
        </div>
      </section>

      {/* Tier 2 */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-cyber-blue/30 to-transparent" />
          <span className="badge-blue px-3 py-1 text-xs font-semibold">TIER 2 — ALL TRACKS</span>
          <div className="h-px flex-1 bg-gradient-to-l from-cyber-blue/30 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TIER2_ROLES.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onSelect={() => handleSelect(role.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
