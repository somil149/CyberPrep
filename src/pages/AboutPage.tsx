import somilPhoto from '@/assets/somil-goyal.jpeg'

export default function AboutPage() {
  const links = [
    { label: 'GitHub', href: 'https://github.com/somil149', icon: '🐙' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/somil-cybersecurity-architect', icon: '💼' },
    { label: 'Email', href: 'mailto:goyal.somil2011@gmail.com', icon: '✉️' },
  ]

  const stack = [
    'React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'Zustand',
    'IndexedDB', 'PWA', 'GitHub Actions', 'GitHub Pages',
  ]

  const expertise = [
    { icon: '🛡️', title: 'Cybersecurity Architecture', desc: 'Zero Trust, STRIDE, MITRE ATT&CK, SOC design, threat modeling at enterprise scale' },
    { icon: '🧠', title: 'Agentic AI Engineering', desc: 'Multi-agent orchestration, LLM pipelines, RAG systems, autonomous security workflows' },
    { icon: '🔐', title: 'AI/LLM Security', desc: 'Prompt injection defense, guardrails, AI red teaming, adversarial ML, OWASP LLM Top 10' },
    { icon: '⚙️', title: 'DevSecOps', desc: 'Shift-left security, SBOM, supply chain security, CI/CD pipeline hardening' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">

      {/* Hero */}
      <div className="card border-cyber-purple/30 tier1-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-cyber-blue/5 pointer-events-none" />
        <div className="relative flex items-center gap-5 flex-wrap">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-cyber-purple/50 flex-shrink-0 shadow-glow-purple">
            <img src={somilPhoto} alt="Somil Goyal" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-2xl font-bold text-gradient-blue">Somil Goyal</h1>
              <span className="badge-purple text-xs">Builder</span>
            </div>
            <p className="text-cyber-cyan text-sm font-medium">Cybersecurity Architect & Agentic AI Engineer</p>
            <p className="text-cyber-muted text-xs mt-1">Building autonomous cyber defence systems that scale with AI</p>
            <div className="flex gap-3 mt-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 badge-blue hover:opacity-80 transition-opacity text-xs px-2.5 py-1">
                  <span>{l.icon}</span>{l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="card space-y-3">
        <h2 className="section-title flex items-center gap-2">👤 About</h2>
        <p className="text-sm text-cyber-muted leading-relaxed">
          Somil Goyal is a Cybersecurity Architect with deep expertise in Agentic AI, DevSecOps, and enterprise
          security architecture. He is passionate about bridging the gap between cutting-edge AI capabilities and
          real-world security challenges — designing autonomous systems that help enterprises detect, respond, and
          defend at machine speed.
        </p>
        <p className="text-sm text-cyber-muted leading-relaxed">
          His work spans threat modeling, LLM security, zero trust architecture, and multi-agent orchestration —
          with a focus on helping enterprises go autonomous and scale their defence posture with AI.
        </p>
      </div>

      {/* Expertise */}
      <div className="space-y-3">
        <h2 className="section-title">⚡ Areas of Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {expertise.map((e) => (
            <div key={e.title} className="card hover:border-cyber-blue/30 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{e.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-cyber-text">{e.title}</div>
                  <p className="text-xs text-cyber-muted mt-0.5 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why I built this */}
      <div className="card border-cyber-cyan/20 bg-cyber-cyan/5">
        <h2 className="section-title flex items-center gap-2 mb-3">🚀 Why CyberPrep Nexus?</h2>
        <p className="text-sm text-cyber-muted leading-relaxed">
          The best cybersecurity and AI roles demand deep, specialized knowledge — and most career platforms
          treat security as an afterthought. I built CyberPrep Nexus to create the platform I wished existed:
          offline-first, role-adaptive, with real enterprise-grade content for Cybersecurity, DevSecOps, Agentic AI,
          and AI Security roles. No login. No cloud dependency. Just focused career acceleration.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="card space-y-3">
        <h2 className="section-title">🛠️ Built With</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span key={t} className="badge bg-cyber-surface border border-cyber-border text-cyber-muted text-xs px-2.5 py-1">{t}</span>
          ))}
        </div>
        <p className="text-xs text-cyber-muted">
          Open source · MIT License ·{' '}
          <a href="https://github.com/somil149/CyberPrep" target="_blank" rel="noopener noreferrer"
            className="text-cyber-blue hover:text-cyber-cyan transition-colors">
            github.com/somil149/CyberPrep
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t border-cyber-border">
        <p className="text-xs text-cyber-muted">
          Built with ❤️ by{' '}
          <a href="https://www.linkedin.com/in/somil-cybersecurity-architect" target="_blank" rel="noopener noreferrer"
            className="text-cyber-cyan hover:opacity-80 transition-opacity font-medium">
            Somil Goyal
          </a>
          {' '}· CyberPrep Nexus v1.0.0
        </p>
      </div>

    </div>
  )
}
