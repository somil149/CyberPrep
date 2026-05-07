export type RoleTier = 'tier1' | 'tier2'

export type RoleId =
  | 'cybersecurity'
  | 'devsecops'
  | 'aiml-security'
  | 'agentic-ai'
  | 'agentic-ai-security'
  | 'cloud-architect'
  | 'fullstack'
  | 'backend'
  | 'frontend'
  | 'data-engineer'
  | 'ml-engineer'
  | 'platform-sre'
  | 'engineering-manager'
  | 'solution-architect'

export interface Role {
  id: RoleId
  title: string
  subtitle: string
  tier: RoleTier
  icon: string
  color: string
  description: string
  tags: string[]
}

export type QuestionCategory = 'behavioral' | 'technical' | 'system-design' | 'scenario'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export interface Question {
  id: string
  roleId: RoleId
  category: QuestionCategory
  difficulty: Difficulty
  question: string
  // legacy fields
  hints?: string[]
  sampleAnswer?: string
  // rich fields from JSON datasets
  answer?: string
  explanation?: string
  followUpQuestions?: string[]
  keyConcepts?: string[]
  realWorldContext?: string
  tags: string[]
}

export interface FlashCard {
  id: string
  roleId: RoleId
  front: string
  back: string
  tags: string[]
}

export interface InterviewSession {
  id: string
  roleId: RoleId
  startedAt: number
  completedAt?: number
  questions: string[]
  answers: Record<string, string>
  scores: Record<string, number>
  overallScore?: number
}

export interface UserProgress {
  roleId: RoleId
  questionsAnswered: number
  correctAnswers: number
  sessionsCompleted: number
  lastActive: number
  bookmarkedQuestions: string[]
  completedRoadmapItems: string[]
}

export interface RoadmapItem {
  id: string
  roleId: RoleId
  title: string
  description: string
  resources: { label: string; url: string }[]
  order: number
  completed?: boolean
}

export interface ThreatModel {
  id: string
  name: string
  createdAt: number
  components: ThreatComponent[]
  threats: Threat[]
}

export interface ThreatComponent {
  id: string
  name: string
  type: 'process' | 'datastore' | 'external' | 'dataflow' | 'trust-boundary'
  x: number
  y: number
}

export interface Threat {
  id: string
  componentId: string
  category: 'Spoofing' | 'Tampering' | 'Repudiation' | 'InformationDisclosure' | 'DenialOfService' | 'ElevationOfPrivilege'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  mitigation?: string
}

export interface AgentNode {
  id: string
  name: string
  type: 'orchestrator' | 'worker' | 'tool' | 'memory' | 'guardrail'
  x: number
  y: number
  config: Record<string, unknown>
}

export interface AgentFlow {
  id: string
  name: string
  createdAt: number
  nodes: AgentNode[]
  edges: { from: string; to: string; label?: string }[]
}
