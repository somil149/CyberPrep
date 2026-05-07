<div align="center">

# 🛡️ CyberPrep Nexus

### AI-Powered Offline-First Professional Interview & Career Acceleration Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PWA-Offline--First-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/somil149/CyberPrep?style=social" />
  <img src="https://img.shields.io/github/issues/somil149/CyberPrep" />
  <img src="https://img.shields.io/github/workflow/status/somil149/CyberPrep/CI" />
</p>

<br />

> **CyberPrep Nexus** is a production-grade, offline-first, AI-powered interview preparation and career acceleration platform built for cybersecurity professionals, AI architects, DevSecOps engineers, and modern tech leaders.
>
> No backend. No login. No cloud dependency. Just pure, fast, offline-capable preparation.

<br />

**[🚀 Live Demo](https://somil149.github.io/CyberPrep/)** · **[📖 Docs](#installation)** · **[🤝 Contribute](CONTRIBUTING.md)** · **[🐛 Report Bug](https://github.com/somil149/CyberPrep/issues)**

</div>

---

## 🎯 Platform Vision

CyberPrep Nexus is not a quiz app. It's a **career operating system** for technical professionals — combining the depth of Interviewing.io, the structure of LeetCode, and the intelligence of an AI career mentor, all running entirely in your browser with zero backend dependency.

Built for:
- 🛡️ **Cybersecurity Engineers** preparing for FAANG/enterprise security roles
- ⚙️ **DevSecOps Engineers** mastering shift-left security and CI/CD pipelines
- 🤖 **AI/ML Security Architects** navigating adversarial ML and AI governance
- 🧠 **Agentic AI Architects** designing production multi-agent systems
- 🔐 **Agentic AI Security Architects** securing LLM applications and guardrails
- ☁️ **Cloud Architects, Full-Stack, Backend, Data, ML, SRE, EM, Solution Architects**

---

## ✨ Features Overview

| Feature | Description |
|---|---|
| 🎯 **Role-Adaptive Dashboard** | Personalized experience for 14 career tracks |
| ❓ **Question Bank** | 35+ curated questions with hints, sample answers, bookmarking |
| 🎙️ **Mock Interview Simulator** | Timed sessions with self-scoring and session history |
| 🛡️ **Threat Modeling Simulator** | STRIDE, MITRE ATT&CK, DevSecOps Pipeline, Zero Trust |
| 🧠 **Agentic AI Studio** | Agent patterns, LLM security workbench, AI red teaming |
| 🗺️ **Learning Roadmap** | Milestone-based preparation paths per role |
| ⚡ **Flashcard System** | Flip cards with mastery tracking |
| 🔖 **Bookmarks** | Save and review important questions |
| 📱 **PWA / Offline-First** | Install as app, works without internet |
| 🌙 **Dark Cyber Theme** | Premium glassmorphism UI |

---

## 🏗️ Architecture Overview

```
CyberPrep Nexus
├── Frontend (React + TypeScript + Vite)
│   ├── Role-Adaptive Routing (React Router v6)
│   ├── State Management (Zustand + persist)
│   ├── Offline Storage (IndexedDB via idb)
│   └── PWA (vite-plugin-pwa + Workbox)
├── Design System (TailwindCSS v3)
│   ├── Dark cyber color palette
│   ├── Glassmorphism components
│   └── Responsive layout system
└── Content Layer (TypeScript data files)
    ├── 14 roles × questions/roadmaps/flashcards
    └── Tier 1 specialized content modules
```

---

## 🎭 Supported Roles

### ⭐ Tier 1 — Priority Tracks (Deep Specialization)

| Role | Specialized Modules |
|---|---|
| 🛡️ Cybersecurity Engineer | STRIDE, MITRE ATT&CK, Zero Trust, SOC Design |
| ⚙️ DevSecOps Engineer | CI/CD Security, SBOM, Supply Chain, Policy-as-Code |
| 🤖 AI/ML Security Architect | Adversarial ML, Model Poisoning, AI Governance |
| 🧠 Agentic AI Architect | Multi-Agent Design, RAG, Tool Use, Orchestration |
| 🔐 Agentic AI Security Architect | Prompt Injection, Guardrails, LLM Red Teaming |

### Tier 2 — All Tracks

Cloud Architect · Full-Stack · Backend · Frontend · Data Engineer · ML Engineer · Platform/SRE · Engineering Manager · Solution Architect

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 8 |
| Styling | TailwindCSS 3 |
| State | Zustand 4 (with persistence) |
| Storage | IndexedDB (idb) + LocalStorage |
| Routing | React Router v6 |
| PWA | vite-plugin-pwa + Workbox |
| CI/CD | GitHub Actions |
| Deployment | GitHub Pages |

---

## 📦 Installation

### Prerequisites
- Node.js v18+
- npm v9+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/somil149/CyberPrep.git
cd CyberPrep

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/CyberPrep/](http://localhost:5173/CyberPrep/)

### One-Command Setup

```bash
bash scripts/setup.sh
```

---

## 🚀 Deployment

### GitHub Pages (Automatic)

Every push to `main` automatically deploys via GitHub Actions:

```
push to main → CI (lint + type-check + build) → Deploy to gh-pages
```

Live URL: **https://somil149.github.io/CyberPrep/**

### Manual Deploy

```bash
npm run build
bash scripts/deploy.sh
```

### PWA Installation

1. Open the live URL in Chrome/Edge
2. Click the install icon in the address bar
3. Use CyberPrep Nexus as a native app — fully offline

---

## 📁 Folder Structure

```
CyberPrep/
├── .github/
│   ├── workflows/          # CI/CD workflows
│   └── ISSUE_TEMPLATE/     # Issue templates
├── public/
│   └── 404.html            # SPA routing fallback
├── scripts/
│   ├── setup.sh
│   └── deploy.sh
├── src/
│   ├── components/
│   │   └── layout/         # AppShell, Sidebar, TopNav
│   ├── data/               # Questions, roles, roadmaps, flashcards
│   ├── pages/              # All page components
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   └── utils/              # IndexedDB layer
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🔒 Security & Privacy Philosophy

- **Zero data collection** — everything stays in your browser
- **No telemetry** — no analytics, no tracking
- **No login required** — guest-first by design
- **Offline-first** — works without internet after first load
- **Open source** — full transparency

---

## 🗺️ Future Roadmap

- [ ] AI-powered answer evaluation (local LLM via WebLLM)
- [ ] Tauri desktop app packaging
- [ ] Android APK via Capacitor
- [ ] More question content (100+ per role)
- [ ] System design diagram builder
- [ ] Peer mock interview scheduling
- [ ] Export progress as PDF report

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

The easiest way to contribute is adding questions, flashcards, or roadmap items for your area of expertise.

---

## 📄 License

MIT © [Somil](https://github.com/somil149)

---

<div align="center">

**Built with ❤️ for the cybersecurity and AI engineering community**

⭐ Star this repo if it helped you land your next role!

</div>
