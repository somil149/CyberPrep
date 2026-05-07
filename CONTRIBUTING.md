# Contributing to CyberPrep Nexus

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/CyberPrep.git`
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`

## Development Workflow

```bash
# Start development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Contribute

### Adding Questions
Questions live in `src/data/questions.ts`. Each question follows the `Question` type:
```ts
{
  id: 'unique-id',
  roleId: 'cybersecurity',       // see RoleId type
  category: 'technical',         // behavioral | technical | system-design | scenario
  difficulty: 'hard',            // easy | medium | hard | expert
  question: 'Your question...',
  hints: ['hint 1', 'hint 2'],   // optional
  sampleAnswer: '...',           // optional
  tags: ['tag1', 'tag2'],
}
```

### Adding Flashcards
Flashcards live in `src/data/flashcards.ts`. Follow the `FlashCard` type.

### Adding Roadmap Items
Roadmap items live in `src/data/roadmaps.ts`. Add to the relevant role's array.

### Adding a New Role
1. Add the role to `src/data/roles.ts`
2. Add questions in `src/data/questions.ts`
3. Add roadmap in `src/data/roadmaps.ts`
4. Add flashcards in `src/data/flashcards.ts`
5. Add dashboard config in `src/data/dashboard.ts`

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Write clear PR descriptions explaining what and why
- Ensure `npm run build` passes before submitting
- Add questions/content that are accurate and professionally relevant

## Code Style

- TypeScript strict mode — no `any` types
- Functional React components only
- TailwindCSS for styling — use existing utility classes from `index.css`
- Keep components small and focused

## Reporting Issues

Use GitHub Issues with the appropriate template:
- **Bug Report**: Something is broken
- **Feature Request**: New feature or improvement

## Code of Conduct

Be respectful, constructive, and professional. This is a career development tool — content quality matters.
