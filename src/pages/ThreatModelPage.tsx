import { useState } from 'react'
import type { Threat } from '@models/index'

type Tab = 'stride' | 'zerotrust' | 'pipeline' | 'mitre'

const STRIDE_CATEGORIES = [
  { id: 'Spoofing', icon: '🎭', color: 'text-cyber-red', desc: 'Impersonating something or someone else' },
  { id: 'Tampering', icon: '✏️', color: 'text-cyber-yellow', desc: 'Modifying data or code' },
  { id: 'Repudiation', icon: '🚫', color: 'text-cyber-purple', desc: 'Claiming to not have performed an action' },
  { id: 'InformationDisclosure', icon: '👁️', color: 'text-cyber-blue', desc: 'Exposing information to unauthorized parties' },
  { id: 'DenialOfService', icon: '💥', color: 'text-cyber-orange', desc: 'Denying or degrading service' },
  { id: 'ElevationOfPrivilege', icon: '⬆️', color: 'text-cyber-green', desc: 'Gaining capabilities without authorization' },
] as const

const MITRE_TACTICS = [
  { id: 'TA0001', name: 'Initial Access', techniques: ['T1190 Exploit Public-Facing App', 'T1566 Phishing', 'T1078 Valid Accounts'] },
  { id: 'TA0002', name: 'Execution', techniques: ['T1059 Command & Scripting', 'T1203 Exploitation for Execution'] },
  { id: 'TA0003', name: 'Persistence', techniques: ['T1098 Account Manipulation', 'T1543 Create/Modify System Process'] },
  { id: 'TA0004', name: 'Privilege Escalation', techniques: ['T1068 Exploitation for Privilege Escalation', 'T1548 Abuse Elevation Control'] },
  { id: 'TA0005', name: 'Defense Evasion', techniques: ['T1070 Indicator Removal', 'T1036 Masquerading'] },
  { id: 'TA0006', name: 'Credential Access', techniques: ['T1110 Brute Force', 'T1555 Credentials from Password Stores'] },
  { id: 'TA0007', name: 'Discovery', techniques: ['T1046 Network Service Discovery', 'T1082 System Info Discovery'] },
  { id: 'TA0008', name: 'Lateral Movement', techniques: ['T1021 Remote Services', 'T1550 Use Alternate Auth Material'] },
  { id: 'TA0009', name: 'Collection', techniques: ['T1005 Data from Local System', 'T1114 Email Collection'] },
  { id: 'TA0010', name: 'Exfiltration', techniques: ['T1041 Exfil Over C2 Channel', 'T1048 Exfil Over Alt Protocol'] },
  { id: 'TA0011', name: 'Command & Control', techniques: ['T1071 App Layer Protocol', 'T1095 Non-App Layer Protocol'] },
  { id: 'TA0040', name: 'Impact', techniques: ['T1486 Data Encrypted for Impact', 'T1489 Service Stop'] },
]

const PIPELINE_STAGES = [
  { stage: 'Pre-commit', tools: ['git-secrets', 'detect-secrets', 'pre-commit hooks'], icon: '📝', color: 'border-cyber-blue/30' },
  { stage: 'Build (SAST)', tools: ['Semgrep', 'SonarQube', 'Checkmarx', 'Bandit'], icon: '🔍', color: 'border-cyber-purple/30' },
  { stage: 'Dependencies (SCA)', tools: ['Snyk', 'OWASP Dependency-Check', 'Trivy'], icon: '📦', color: 'border-cyber-yellow/30' },
  { stage: 'Container Scan', tools: ['Trivy', 'Grype', 'Docker Scout', 'Clair'], icon: '🐳', color: 'border-cyber-cyan/30' },
  { stage: 'Deploy (DAST)', tools: ['OWASP ZAP', 'Burp Suite', 'Nuclei'], icon: '🚀', color: 'border-cyber-green/30' },
  { stage: 'Runtime (RASP)', tools: ['Falco', 'Aqua Security', 'Sysdig'], icon: '🛡️', color: 'border-cyber-red/30' },
]

const ZT_PILLARS = [
  { name: 'Identity', icon: '👤', desc: 'MFA, PAM, identity governance', controls: ['MFA everywhere', 'Privileged Access Management', 'Identity Governance', 'Conditional Access'] },
  { name: 'Devices', icon: '💻', desc: 'Device health, MDM, EDR', controls: ['Device compliance checks', 'MDM enrollment', 'EDR deployment', 'Certificate-based auth'] },
  { name: 'Network', icon: '🌐', desc: 'Microsegmentation, ZTNA', controls: ['Microsegmentation', 'ZTNA/SDP', 'East-West traffic inspection', 'DNS security'] },
  { name: 'Applications', icon: '📱', desc: 'App-level access control', controls: ['App-level MFA', 'API gateway security', 'WAF', 'CASB'] },
  { name: 'Data', icon: '🗄️', desc: 'Data classification, DLP', controls: ['Data classification', 'DLP policies', 'Encryption at rest/transit', 'Rights management'] },
  { name: 'Visibility', icon: '👁️', desc: 'SIEM, UEBA, continuous monitoring', controls: ['SIEM/SOAR', 'UEBA', 'Continuous monitoring', 'Threat intelligence'] },
]

function StrideTab() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [form, setForm] = useState({ category: 'Spoofing' as Threat['category'], description: '', severity: 'medium' as Threat['severity'], mitigation: '' })

  const addThreat = () => {
    if (!form.description) return
    setThreats((prev) => [...prev, { id: crypto.randomUUID(), componentId: 'manual', ...form }])
    setForm({ ...form, description: '', mitigation: '' })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STRIDE_CATEGORIES.map(({ id, icon, color, desc }) => (
          <div key={id} className="card text-center hover:border-cyber-blue/30 transition-colors">
            <div className="text-2xl mb-1">{icon}</div>
            <div className={`text-xs font-bold ${color}`}>{id}</div>
            <div className="text-[10px] text-cyber-muted mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <div className="card space-y-3">
        <h3 className="section-title text-sm">Add Threat</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-cyber-muted mb-1 block">Category</label>
            <select className="input text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Threat['category'] })}>
              {STRIDE_CATEGORIES.map(({ id }) => <option key={id} value={id}>{id}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-cyber-muted mb-1 block">Severity</label>
            <select className="input text-sm" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value as Threat['severity'] })}>
              {['low', 'medium', 'high', 'critical'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <textarea className="input text-sm min-h-[80px]" placeholder="Describe the threat..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="input text-sm" placeholder="Mitigation strategy..." value={form.mitigation} onChange={(e) => setForm({ ...form, mitigation: e.target.value })} />
        <button onClick={addThreat} className="btn-primary text-sm">+ Add Threat</button>
      </div>

      {threats.length > 0 && (
        <div className="space-y-2">
          <h3 className="section-title text-sm">Threat Register ({threats.length})</h3>
          {threats.map((t) => (
            <div key={t.id} className="card flex items-start gap-3">
              <span className="text-lg">{STRIDE_CATEGORIES.find((s) => s.id === t.category)?.icon}</span>
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap mb-1">
                  <span className="badge-purple text-[10px]">{t.category}</span>
                  <span className={`badge text-[10px] ${t.severity === 'critical' ? 'badge-red' : t.severity === 'high' ? 'badge-red' : t.severity === 'medium' ? 'badge-yellow' : 'badge-green'}`}>{t.severity}</span>
                </div>
                <p className="text-xs text-cyber-text">{t.description}</p>
                {t.mitigation && <p className="text-xs text-cyber-green mt-1">✅ {t.mitigation}</p>}
              </div>
              <button onClick={() => setThreats((prev) => prev.filter((x) => x.id !== t.id))} className="text-cyber-muted hover:text-cyber-red text-xs">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MitreTab() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <p className="text-xs text-cyber-muted">MITRE ATT&CK Enterprise Matrix — click a tactic to explore techniques.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {MITRE_TACTICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(selected === t.id ? null : t.id)}
            className={`card text-left transition-all hover:border-cyber-blue/40 ${selected === t.id ? 'border-cyber-blue/60 bg-cyber-blue/5' : ''}`}
          >
            <div className="text-[10px] text-cyber-muted font-mono">{t.id}</div>
            <div className="text-xs font-semibold text-cyber-text mt-0.5">{t.name}</div>
            <div className="text-[10px] text-cyber-muted mt-1">{t.techniques.length} techniques</div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="card border-cyber-blue/20 animate-fade-in">
          {(() => {
            const tactic = MITRE_TACTICS.find((t) => t.id === selected)!
            return (
              <>
                <h3 className="text-sm font-semibold text-cyber-blue mb-3">{tactic.name} — Techniques</h3>
                <div className="space-y-2">
                  {tactic.techniques.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 text-xs">
                      <span className="text-cyber-red">⚡</span>
                      <span className="font-mono text-cyber-muted">{tech.split(' ')[0]}</span>
                      <span className="text-cyber-text">{tech.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}

function PipelineTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-cyber-muted">DevSecOps pipeline security stages — tools and controls at each phase.</p>
      <div className="space-y-3">
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage.stage} className={`card border ${stage.color}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-cyber-surface border border-cyber-border flex items-center justify-center text-xs font-bold text-cyber-muted">
                {i + 1}
              </div>
              <span className="text-lg">{stage.icon}</span>
              <span className="text-sm font-semibold text-cyber-text">{stage.stage}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-10">
              {stage.tools.map((tool) => (
                <span key={tool} className="badge bg-cyber-surface text-cyber-muted border border-cyber-border text-[10px]">{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ZeroTrustTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-cyber-muted">Zero Trust Architecture — NIST SP 800-207 pillars and controls.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ZT_PILLARS.map((pillar) => (
          <div key={pillar.name} className="card hover:border-cyber-blue/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{pillar.icon}</span>
              <div>
                <div className="text-sm font-semibold text-cyber-text">{pillar.name}</div>
                <div className="text-[10px] text-cyber-muted">{pillar.desc}</div>
              </div>
            </div>
            <ul className="space-y-1">
              {pillar.controls.map((c) => (
                <li key={c} className="text-xs text-cyber-muted flex gap-2">
                  <span className="text-cyber-green">✓</span>{c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'stride', label: 'STRIDE', icon: '🎯' },
  { id: 'mitre', label: 'MITRE ATT&CK', icon: '⚔️' },
  { id: 'pipeline', label: 'DevSecOps Pipeline', icon: '⚙️' },
  { id: 'zerotrust', label: 'Zero Trust', icon: '🔒' },
]

export default function ThreatModelPage() {
  const [tab, setTab] = useState<Tab>('stride')

  return (
    <div className="max-w-5xl mx-auto space-y-5 animate-fade-in">
      <div>
        <h1 className="section-title flex items-center gap-2">🛡️ Threat Modeling Simulator <span className="badge-purple text-xs">TIER 1</span></h1>
        <p className="text-xs text-cyber-muted mt-1">STRIDE analysis, MITRE ATT&CK mapping, DevSecOps pipeline security, and Zero Trust design.</p>
      </div>

      <div className="flex gap-2 flex-wrap border-b border-cyber-border pb-3">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${tab === id ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30' : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface'}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {tab === 'stride' && <StrideTab />}
      {tab === 'mitre' && <MitreTab />}
      {tab === 'pipeline' && <PipelineTab />}
      {tab === 'zerotrust' && <ZeroTrustTab />}
    </div>
  )
}
