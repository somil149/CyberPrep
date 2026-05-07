import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@stores/appStore'
import { ROLES } from '@data/roles'
import type { Role, RoleId } from '@models/index'

const CATEGORIES = [
  { id: 'all', label: 'All Tracks', icon: '⬡' },
  { id: 'security', label: 'Security', icon: '🛡️' },
  { id: 'ai', label: 'AI & Agentic', icon: '🧠' },
  { id: 'cloud', label: 'Cloud & Infra', icon: '☁️' },
  { id: 'engineering', label: 'Engineering', icon: '💻' },
  { id: 'leadership', label: 'Leadership', icon: '👥' },
] as const

type CategoryId = typeof CATEGORIES[number]['id']

const ROLE_CATEGORY: Record<RoleId, CategoryId> = {
  'cybersecurity': 'security',
  'devsecops': 'security',
  'aiml-security': 'security',
  'agentic-ai-security': 'security',
  'agentic-ai': 'ai',
  'cloud-architect': 'cloud',
  'platform-sre': 'cloud',
  'fullstack': 'engineering',
  'backend': 'engineering',
  'frontend': 'engineering',
  'data-engineer': 'engineering',
  'ml-engineer': 'engineering',
  'engineering-manager': 'leadership',
  'solution-architect': 'leadership',
}

function RoleCard({ role, selected, onSelect }: { role: Role; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`card text-left w-full transition-all duration-200 hover:scale-[1.02] group
        ${selected ? 'border-cyber-blue/60 bg-cyber-blue/5 shadow-cyber' : 'hover:border-cyber-border/80'}
        ${role.tier === 'tier1' ? 'tier1-glow' : ''}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{role.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-cyber-text">{role.title}</span>
            {role.tier === 'tier1' && <span className="badge-purple text-[9px] px-1.5 py-0">TIER 1</span>}
            {selected && <span className="badge-blue text-[9px] px-1.5 py-0">ACTIVE</span>}
          </div>
          <div className="text-xs text-cyber-muted mt-0.5">{role.subtitle}</div>
          <p className="text-xs text-cyber-muted/80 mt-1.5 leading-relaxed line-clamp-2">{role.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {role.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[9px]">{tag}</span>
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
  const [category, setCategory] = useState<CategoryId>('all')
  const [search, setSearch] = useState('')
  const [tier2Expanded, setTier2Expanded] = useState(false)

  const handleSelect = (roleId: RoleId) => {
    setRole(roleId)
    navigate('/dashboard')
  }

  const filtered = ROLES.filter((r) => {
    const matchCat = category === 'all' || ROLE_CATEGORY[r.id] === category
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const tier1 = filtered.filter((r) => r.tier === 'tier1')
  const tier2 = filtered.filter((r) => r.tier === 'tier2')
  const isFiltering = category !== 'all' || search.length > 0

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 badge-blue mb-3 px-3 py-1">
          <span>🎯</span><span className="text-xs">Choose Your Career Track</span>
        </div>
        <h1 className="text-3xl font-bold text-gradient-blue mb-2">What do you want to master?</h1>
        <p className="text-cyber-muted text-sm max-w-lg mx-auto">
          Select your target track to unlock a personalized career acceleration experience.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="input text-sm"
          placeholder="🔍  Search tracks, skills, or tags..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setTier2Expanded(true) }}
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => { setCategory(id); setTier2Expanded(id !== 'all') }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${category === id
                ? 'bg-cyber-blue text-white shadow-cyber'
                : 'bg-cyber-surface border border-cyber-border text-cyber-muted hover:border-cyber-blue/40 hover:text-cyber-text'
              }`}
          >
            {icon} {label}
            <span className={`text-[10px] ml-0.5 ${category === id ? 'text-white/70' : 'text-cyber-muted'}`}>
              {ROLES.filter(r => id === 'all' || ROLE_CATEGORY[r.id] === id).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-cyber-muted text-sm">
          No tracks match "<span className="text-cyber-text">{search}</span>"
        </div>
      ) : (
        <>
          {/* Tier 1 */}
          {tier1.length > 0 && (
            <section className="mb-6">
              {!isFiltering && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-cyber-purple/50 to-transparent" />
                  <span className="badge-purple px-3 py-1 text-xs font-semibold">⭐ PRIORITY TRACKS — DEEP SPECIALIZATION</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-cyber-purple/50 to-transparent" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tier1.map((role) => (
                  <RoleCard key={role.id} role={role} selected={selectedRole === role.id} onSelect={() => handleSelect(role.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Tier 2 */}
          {tier2.length > 0 && (
            <section>
              {!isFiltering && (
                <button
                  onClick={() => setTier2Expanded(!tier2Expanded)}
                  className="w-full flex items-center gap-3 mb-4 group"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-cyber-blue/30 to-transparent" />
                  <span className="badge-blue px-3 py-1 text-xs font-semibold group-hover:border-cyber-blue/60 transition-colors">
                    {tier2Expanded ? '▲' : '▼'} ALL TRACKS ({tier2.length})
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-cyber-blue/30 to-transparent" />
                </button>
              )}
              {(tier2Expanded || isFiltering) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
                  {tier2.map((role) => (
                    <RoleCard key={role.id} role={role} selected={selectedRole === role.id} onSelect={() => handleSelect(role.id)} />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}
