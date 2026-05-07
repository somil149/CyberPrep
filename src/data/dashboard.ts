import type { RoleId } from '@models/index'

export interface DashboardConfig {
  quickActions: { label: string; to: string; icon: string; variant: 'primary' | 'secondary' }[]
  highlights: { title: string; value: string; icon: string; color: string }[]
  featuredModules: { title: string; description: string; to: string; icon: string; tier1?: boolean }[]
}

const BASE_MODULES = [
  { title: 'Knowledge Arsenal', description: 'Browse curated knowledge challenges', to: '/questions', icon: '❓' },
  { title: 'Skills Assessment', description: 'AI-coached timed skills assessment', to: '/interview', icon: '🎙️' },
  { title: 'Learning Roadmap', description: 'Structured career acceleration path', to: '/roadmap', icon: '🗺️' },
  { title: 'Flashcards', description: 'Quick concept reinforcement', to: '/flashcards', icon: '⚡' },
]

const TIER1_MODULES: Record<string, { title: string; description: string; to: string; icon: string; tier1: boolean }[]> = {
  cybersecurity: [
    { title: 'Threat Modeler', description: 'STRIDE/PASTA/MITRE ATT&CK exercises', to: '/threat-model', icon: '🛡️', tier1: true },
    { title: 'Zero Trust Designer', description: 'Design ZTA architectures', to: '/threat-model?tab=zerotrust', icon: '🔒', tier1: true },
  ],
  devsecops: [
    { title: 'Threat Modeler', description: 'Supply chain & pipeline security', to: '/threat-model', icon: '🛡️', tier1: true },
    { title: 'DevSecOps Pipeline', description: 'SAST/DAST/SCA simulation', to: '/threat-model?tab=pipeline', icon: '⚙️', tier1: true },
  ],
  'aiml-security': [
    { title: 'AI Red Team Engine', description: 'Adversarial ML & model attacks', to: '/agentic-studio?tab=redteam', icon: '🤖', tier1: true },
    { title: 'LLM Security Workbench', description: 'Prompt injection & guardrails', to: '/agentic-studio?tab=llm', icon: '🔐', tier1: true },
  ],
  'agentic-ai': [
    { title: 'Agentic AI Studio', description: 'Multi-agent orchestration design', to: '/agentic-studio', icon: '🧠', tier1: true },
    { title: 'LLM Pipeline Builder', description: 'RAG, tool-use, memory patterns', to: '/agentic-studio?tab=pipeline', icon: '⚡', tier1: true },
  ],
  'agentic-ai-security': [
    { title: 'LLM Security Workbench', description: 'Prompt injection defense & jailbreaks', to: '/agentic-studio?tab=llm', icon: '🔐', tier1: true },
    { title: 'AI Red Team Engine', description: 'Agentic system attack scenarios', to: '/agentic-studio?tab=redteam', icon: '🛡️', tier1: true },
  ],
}

export function getDashboardConfig(roleId: RoleId): DashboardConfig {
  const tier1Mods = TIER1_MODULES[roleId] ?? []
  return {
    quickActions: [
      { label: 'Start Skills Assessment', to: '/interview', icon: '🎙️', variant: 'primary' },
      { label: 'Browse Questions', to: '/questions', icon: '❓', variant: 'secondary' },
      { label: 'View Roadmap', to: '/roadmap', icon: '🗺️', variant: 'secondary' },
    ],
    highlights: [
      { title: 'Questions Answered', value: '0', icon: '✅', color: 'text-cyber-green' },
      { title: 'Sessions Done', value: '0', icon: '🎙️', color: 'text-cyber-blue' },
      { title: 'Avg Score', value: '—', icon: '📊', color: 'text-cyber-purple' },
      { title: 'Bookmarks', value: '0', icon: '🔖', color: 'text-cyber-yellow' },
    ],
    featuredModules: [...tier1Mods, ...BASE_MODULES],
  }
}
