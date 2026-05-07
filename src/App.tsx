import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppShell from '@components/layout/AppShell'

const RoleSelectionPage = lazy(() => import('@pages/RoleSelectionPage'))
const DashboardPage = lazy(() => import('@pages/DashboardPage'))
const QuestionBankPage = lazy(() => import('@pages/QuestionBankPage'))
const MockInterviewPage = lazy(() => import('@pages/MockInterviewPage'))
const ThreatModelPage = lazy(() => import('@pages/ThreatModelPage'))
const AgenticStudioPage = lazy(() => import('@pages/AgenticStudioPage'))
const RoadmapPage = lazy(() => import('@pages/RoadmapPage'))
const FlashcardsPage = lazy(() => import('@pages/FlashcardsPage'))
const BookmarksPage = lazy(() => import('@pages/BookmarksPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3 text-cyber-muted">
        <div className="w-5 h-5 border-2 border-cyber-blue/30 border-t-cyber-blue rounded-full animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/CyberPrep">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/roles" element={<RoleSelectionPage />} />
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/questions" element={<QuestionBankPage />} />
            <Route path="/interview" element={<MockInterviewPage />} />
            <Route path="/threat-model" element={<ThreatModelPage />} />
            <Route path="/agentic-studio" element={<AgenticStudioPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/roles" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
