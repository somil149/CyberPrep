import { useNavigate } from 'react-router-dom'
import somilPhoto from '@/assets/somil-goyal.jpeg'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cyber-bg flex flex-col items-center justify-center px-4 text-center animate-fade-in">
      {/* Background grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl gradient-blue flex items-center justify-center text-3xl font-bold text-white shadow-cyber-lg">
            CN
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient-blue">CyberPrep Nexus</h1>
            <p className="text-cyber-cyan text-sm mt-1">AI-Powered Offline-First Interview & Career Acceleration Platform</p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {['🛡️ Cybersecurity', '⚙️ DevSecOps', '🧠 Agentic AI', '🔐 AI Security', '☁️ Cloud', '💻 Full-Stack'].map((f) => (
            <span key={f} className="badge bg-cyber-surface border border-cyber-border text-cyber-muted text-xs px-3 py-1">{f}</span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/roles')}
          className="btn-primary text-base px-8 py-3 shadow-cyber-lg"
        >
          🚀 Start Preparing
        </button>

        {/* Built by — prominent */}
        <div className="pt-4 border-t border-cyber-border">
          <p className="text-xs text-cyber-muted mb-2">Crafted with ❤️ by</p>
          <a
            href="https://www.linkedin.com/in/somil-cybersecurity-architect"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyber-purple/50 group-hover:ring-cyber-cyan/60 transition-all flex-shrink-0">
              <img src={somilPhoto} alt="Somil Goyal" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors">Somil Goyal</div>
              <div className="text-[10px] text-cyber-muted">Cybersecurity Architect & Agentic AI Engineer</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
