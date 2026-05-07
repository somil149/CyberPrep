import type { FlashCard } from '@models/index'

export const FLASHCARDS: FlashCard[] = [
  // Cybersecurity
  { id: 'fc-cs-1', roleId: 'cybersecurity', front: 'What is STRIDE?', back: 'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege — a threat modeling framework by Microsoft.', tags: ['Threat Modeling'] },
  { id: 'fc-cs-2', roleId: 'cybersecurity', front: 'What is the difference between authentication and authorization?', back: 'Authentication verifies WHO you are (identity). Authorization determines WHAT you can do (permissions). AuthN before AuthZ.', tags: ['IAM'] },
  { id: 'fc-cs-3', roleId: 'cybersecurity', front: 'What is Zero Trust?', back: '"Never trust, always verify." No implicit trust based on network location. Every request must be authenticated, authorized, and continuously validated. Based on NIST SP 800-207.', tags: ['Zero Trust'] },
  { id: 'fc-cs-4', roleId: 'cybersecurity', front: 'What is the MITRE ATT&CK framework?', back: 'A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. Organized by Tactics (why) → Techniques (how) → Sub-techniques.', tags: ['MITRE ATT&CK'] },
  { id: 'fc-cs-5', roleId: 'cybersecurity', front: 'What is lateral movement?', back: 'Techniques adversaries use to progressively move through a network after initial access, seeking higher-value targets. Examples: Pass-the-Hash, RDP, SMB exploitation.', tags: ['Incident Response'] },
  // DevSecOps
  { id: 'fc-dso-1', roleId: 'devsecops', front: 'What is SAST vs DAST?', back: 'SAST (Static Application Security Testing) analyzes source code without execution. DAST (Dynamic Application Security Testing) tests running applications. SAST = white-box, DAST = black-box.', tags: ['SAST', 'DAST'] },
  { id: 'fc-dso-2', roleId: 'devsecops', front: 'What is an SBOM?', back: 'Software Bill of Materials — a formal record of all components, libraries, and dependencies in a software product. Enables vulnerability tracking and supply chain risk management.', tags: ['SBOM', 'Supply Chain'] },
  { id: 'fc-dso-3', roleId: 'devsecops', front: 'What is shift-left security?', back: 'Integrating security earlier in the SDLC (moving it "left" on the timeline). Includes security requirements, threat modeling, code review, and SAST in development rather than only at deployment.', tags: ['Shift-Left'] },
  // AI/ML Security
  { id: 'fc-ams-1', roleId: 'aiml-security', front: 'What is an adversarial example?', back: 'An input crafted with imperceptible perturbations that causes an ML model to make incorrect predictions. Example: adding noise to an image that humans see as a panda but the model classifies as a gibbon.', tags: ['Adversarial ML'] },
  { id: 'fc-ams-2', roleId: 'aiml-security', front: 'What is model poisoning?', back: 'An attack where malicious data is injected into the training dataset to corrupt the model\'s behavior. Can create backdoors (triggered by specific inputs) or degrade overall performance.', tags: ['Model Poisoning'] },
  { id: 'fc-ams-3', roleId: 'aiml-security', front: 'What is differential privacy in ML?', back: 'A mathematical framework that adds calibrated noise to training data or model outputs to prevent individual data points from being inferred. Provides formal privacy guarantees with epsilon (ε) parameter.', tags: ['Privacy', 'Differential Privacy'] },
  // Agentic AI
  { id: 'fc-aai-1', roleId: 'agentic-ai', front: 'What is the ReAct pattern?', back: 'Reasoning + Acting. The LLM alternates between reasoning (thinking about what to do) and acting (executing a tool). Observation from the tool feeds back into the next reasoning step.', tags: ['ReAct', 'Agents'] },
  { id: 'fc-aai-2', roleId: 'agentic-ai', front: 'What is RAG?', back: 'Retrieval-Augmented Generation — augmenting LLM responses with relevant documents retrieved from a knowledge base. Reduces hallucinations and enables up-to-date, grounded responses.', tags: ['RAG'] },
  { id: 'fc-aai-3', roleId: 'agentic-ai', front: 'What is the difference between episodic and semantic memory in agents?', back: 'Episodic memory stores specific past interactions/events (conversation history). Semantic memory stores general knowledge and facts (vector DB). Procedural memory stores how to perform tasks (system prompts, tools).', tags: ['Memory', 'Agents'] },
  // Agentic AI Security
  { id: 'fc-aas-1', roleId: 'agentic-ai-security', front: 'What is indirect prompt injection?', back: 'Malicious instructions embedded in external content (web pages, documents, emails) that an agent retrieves and processes, causing it to execute unintended actions. More dangerous than direct injection as it\'s harder to detect.', tags: ['Prompt Injection'] },
  { id: 'fc-aas-2', roleId: 'agentic-ai-security', front: 'What is the OWASP LLM Top 10?', back: 'Top 10 security risks for LLM applications: 1) Prompt Injection, 2) Insecure Output Handling, 3) Training Data Poisoning, 4) Model DoS, 5) Supply Chain, 6) Sensitive Info Disclosure, 7) Insecure Plugin Design, 8) Excessive Agency, 9) Overreliance, 10) Model Theft.', tags: ['OWASP LLM'] },
  // Cloud
  { id: 'fc-ca-1', roleId: 'cloud-architect', front: 'What is the difference between RTO and RPO?', back: 'RTO (Recovery Time Objective) = max acceptable downtime after a disaster. RPO (Recovery Point Objective) = max acceptable data loss (time). Lower RTO/RPO = higher cost.', tags: ['DR', 'HA'] },
  // Full-Stack
  { id: 'fc-fs-1', roleId: 'fullstack', front: 'What is the difference between SSR, SSG, and CSR?', back: 'SSR (Server-Side Rendering) = HTML generated per request on server. SSG (Static Site Generation) = HTML pre-built at build time. CSR (Client-Side Rendering) = HTML built in browser via JS.', tags: ['Web Architecture'] },
]

export function getFlashcardsByRole(roleId: string): FlashCard[] {
  return FLASHCARDS.filter((f) => f.roleId === roleId)
}
