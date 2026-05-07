import type { RoadmapItem, RoleId } from '@models/index'

const ROADMAPS: Record<string, RoadmapItem[]> = {
  cybersecurity: [
    { id: 'cs-r1', roleId: 'cybersecurity', order: 1, title: 'Security Fundamentals', description: 'CIA triad, cryptography basics, network security, OSI model security', resources: [{ label: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security' }] },
    { id: 'cs-r2', roleId: 'cybersecurity', order: 2, title: 'Threat Intelligence & MITRE ATT&CK', description: 'Threat actors, TTPs, ATT&CK framework, threat hunting', resources: [{ label: 'MITRE ATT&CK', url: 'https://attack.mitre.org' }] },
    { id: 'cs-r3', roleId: 'cybersecurity', order: 3, title: 'Threat Modeling', description: 'STRIDE, PASTA, DREAD, attack trees, DFD creation', resources: [{ label: 'OWASP Threat Modeling', url: 'https://owasp.org/www-community/Threat_Modeling' }] },
    { id: 'cs-r4', roleId: 'cybersecurity', order: 4, title: 'Zero Trust Architecture', description: 'NIST SP 800-207, microsegmentation, identity-centric security', resources: [{ label: 'NIST ZTA', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' }] },
    { id: 'cs-r5', roleId: 'cybersecurity', order: 5, title: 'Incident Response & SOC', description: 'IR lifecycle, SIEM, SOAR, playbooks, forensics', resources: [{ label: 'SANS IR', url: 'https://www.sans.org/white-papers/incident-handlers-handbook/' }] },
    { id: 'cs-r6', roleId: 'cybersecurity', order: 6, title: 'Cloud Security', description: 'AWS/Azure/GCP security, CSPM, CWPP, shared responsibility', resources: [{ label: 'CCSP', url: 'https://www.isc2.org/Certifications/CCSP' }] },
  ],
  devsecops: [
    { id: 'dso-r1', roleId: 'devsecops', order: 1, title: 'Secure SDLC Fundamentals', description: 'Shift-left security, security requirements, threat modeling in SDLC', resources: [] },
    { id: 'dso-r2', roleId: 'devsecops', order: 2, title: 'SAST & Code Analysis', description: 'Static analysis tools, code review, secure coding standards', resources: [{ label: 'Semgrep', url: 'https://semgrep.dev' }] },
    { id: 'dso-r3', roleId: 'devsecops', order: 3, title: 'SCA & Dependency Security', description: 'Software composition analysis, CVE management, SBOM', resources: [{ label: 'OWASP Dependency-Check', url: 'https://owasp.org/www-project-dependency-check/' }] },
    { id: 'dso-r4', roleId: 'devsecops', order: 4, title: 'Container & IaC Security', description: 'Docker/K8s security, Terraform security, policy-as-code', resources: [{ label: 'Trivy', url: 'https://trivy.dev' }] },
    { id: 'dso-r5', roleId: 'devsecops', order: 5, title: 'CI/CD Pipeline Security', description: 'Secure pipelines, secrets management, DAST integration', resources: [] },
    { id: 'dso-r6', roleId: 'devsecops', order: 6, title: 'Supply Chain Security', description: 'SLSA framework, SBOM, sigstore, provenance', resources: [{ label: 'SLSA', url: 'https://slsa.dev' }] },
  ],
  'aiml-security': [
    { id: 'ams-r1', roleId: 'aiml-security', order: 1, title: 'ML Fundamentals for Security', description: 'ML pipeline overview, model types, training/inference security surface', resources: [] },
    { id: 'ams-r2', roleId: 'aiml-security', order: 2, title: 'Adversarial Machine Learning', description: 'Evasion, poisoning, model extraction, membership inference', resources: [{ label: 'Adversarial Robustness Toolbox', url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox' }] },
    { id: 'ams-r3', roleId: 'aiml-security', order: 3, title: 'AI/ML Governance & Risk', description: 'NIST AI RMF, EU AI Act, model cards, bias assessment', resources: [{ label: 'NIST AI RMF', url: 'https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf' }] },
    { id: 'ams-r4', roleId: 'aiml-security', order: 4, title: 'LLM Security', description: 'OWASP LLM Top 10, prompt injection, jailbreaking, guardrails', resources: [{ label: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' }] },
    { id: 'ams-r5', roleId: 'aiml-security', order: 5, title: 'Secure MLOps', description: 'Model registry security, pipeline integrity, monitoring for drift/attacks', resources: [] },
  ],
  'agentic-ai': [
    { id: 'aai-r1', roleId: 'agentic-ai', order: 1, title: 'LLM Fundamentals', description: 'Transformer architecture, prompting, context windows, tokenization', resources: [] },
    { id: 'aai-r2', roleId: 'agentic-ai', order: 2, title: 'Agent Architectures', description: 'ReAct, Plan-Execute, Reflexion, multi-agent patterns', resources: [{ label: 'LangChain Docs', url: 'https://docs.langchain.com' }] },
    { id: 'aai-r3', roleId: 'agentic-ai', order: 3, title: 'RAG & Memory Systems', description: 'Vector databases, chunking, embeddings, episodic/semantic memory', resources: [{ label: 'LlamaIndex', url: 'https://docs.llamaindex.ai' }] },
    { id: 'aai-r4', roleId: 'agentic-ai', order: 4, title: 'Tool Use & Orchestration', description: 'Function calling, tool design, orchestration frameworks, MCP', resources: [] },
    { id: 'aai-r5', roleId: 'agentic-ai', order: 5, title: 'Production Agentic Systems', description: 'Reliability, observability, cost optimization, human-in-the-loop', resources: [] },
  ],
  'agentic-ai-security': [
    { id: 'aas-r1', roleId: 'agentic-ai-security', order: 1, title: 'LLM Security Fundamentals', description: 'OWASP LLM Top 10, attack surface of LLM applications', resources: [{ label: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' }] },
    { id: 'aas-r2', roleId: 'agentic-ai-security', order: 2, title: 'Prompt Injection Defense', description: 'Direct/indirect injection, instruction hierarchy, sanitization', resources: [] },
    { id: 'aas-r3', roleId: 'agentic-ai-security', order: 3, title: 'Guardrails & Safety Systems', description: 'Input/output filtering, constitutional AI, RLHF, NeMo Guardrails', resources: [{ label: 'NeMo Guardrails', url: 'https://github.com/NVIDIA/NeMo-Guardrails' }] },
    { id: 'aas-r4', roleId: 'agentic-ai-security', order: 4, title: 'Agentic System Security', description: 'Privilege separation, tool sandboxing, audit trails, human checkpoints', resources: [] },
    { id: 'aas-r5', roleId: 'agentic-ai-security', order: 5, title: 'AI Red Teaming', description: 'Red team methodologies, jailbreak testing, adversarial evaluation', resources: [{ label: 'Microsoft AI Red Team', url: 'https://learn.microsoft.com/en-us/security/ai-red-team/' }] },
  ],
  'cloud-architect': [
    { id: 'ca-r1', roleId: 'cloud-architect', order: 1, title: 'Cloud Fundamentals', description: 'IaaS/PaaS/SaaS, shared responsibility, core services', resources: [] },
    { id: 'ca-r2', roleId: 'cloud-architect', order: 2, title: 'AWS Well-Architected Framework', description: '6 pillars: operational excellence, security, reliability, performance, cost, sustainability', resources: [{ label: 'AWS WAF', url: 'https://aws.amazon.com/architecture/well-architected/' }] },
    { id: 'ca-r3', roleId: 'cloud-architect', order: 3, title: 'Multi-Region & HA Design', description: 'Active-active, active-passive, DR strategies, RTO/RPO', resources: [] },
    { id: 'ca-r4', roleId: 'cloud-architect', order: 4, title: 'Infrastructure as Code', description: 'Terraform, CDK, CloudFormation, GitOps', resources: [] },
  ],
  fullstack: [
    { id: 'fs-r1', roleId: 'fullstack', order: 1, title: 'Modern Frontend Architecture', description: 'React, state management, performance, SSR/SSG', resources: [] },
    { id: 'fs-r2', roleId: 'fullstack', order: 2, title: 'Backend & API Design', description: 'REST, GraphQL, authentication, databases', resources: [] },
    { id: 'fs-r3', roleId: 'fullstack', order: 3, title: 'System Design', description: 'Scalability, caching, message queues, distributed systems', resources: [] },
  ],
}

// Default roadmap for roles without specific content
const DEFAULT_ROADMAP = (roleId: string): RoadmapItem[] => [
  { id: `${roleId}-r1`, roleId: roleId as RoleId, order: 1, title: 'Core Fundamentals', description: 'Master the foundational concepts for this role', resources: [] },
  { id: `${roleId}-r2`, roleId: roleId as RoleId, order: 2, title: 'Technical Deep Dive', description: 'Advanced technical skills and system design', resources: [] },
  { id: `${roleId}-r3`, roleId: roleId as RoleId, order: 3, title: 'Career Acceleration', description: 'Practice questions, Skills Assessments, and behavioral prep', resources: [] },
]

export function getRoadmap(roleId: string): RoadmapItem[] {
  return ROADMAPS[roleId] ?? DEFAULT_ROADMAP(roleId)
}
