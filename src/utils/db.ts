import { openDB, type IDBPDatabase } from 'idb'
import type { UserProgress, InterviewSession, ThreatModel, AgentFlow, FlashCard } from '@models/index'

const DB_NAME = 'cyberprep-nexus'
const DB_VERSION = 1

type CyberPrepDB = {
  progress: {
    key: string
    value: UserProgress
  }
  sessions: {
    key: string
    value: InterviewSession
    indexes: { 'by-role': string }
  }
  threatModels: {
    key: string
    value: ThreatModel
  }
  agentFlows: {
    key: string
    value: AgentFlow
  }
  flashcards: {
    key: string
    value: FlashCard
    indexes: { 'by-role': string }
  }
  bookmarks: {
    key: string
    value: { id: string; questionId: string; roleId: string; savedAt: number }
  }
}

let dbInstance: IDBPDatabase<CyberPrepDB> | null = null

export async function getDB(): Promise<IDBPDatabase<CyberPrepDB>> {
  if (dbInstance) return dbInstance
  dbInstance = await openDB<CyberPrepDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('progress', { keyPath: 'roleId' })

      const sessions = db.createObjectStore('sessions', { keyPath: 'id' })
      sessions.createIndex('by-role', 'roleId')

      db.createObjectStore('threatModels', { keyPath: 'id' })
      db.createObjectStore('agentFlows', { keyPath: 'id' })

      const flashcards = db.createObjectStore('flashcards', { keyPath: 'id' })
      flashcards.createIndex('by-role', 'roleId')

      db.createObjectStore('bookmarks', { keyPath: 'id' })
    },
  })
  return dbInstance
}

export const db = {
  async getProgress(roleId: string): Promise<UserProgress | undefined> {
    return (await getDB()).get('progress', roleId)
  },
  async saveProgress(progress: UserProgress): Promise<void> {
    await (await getDB()).put('progress', progress)
  },
  async getSessions(roleId: string): Promise<InterviewSession[]> {
    return (await getDB()).getAllFromIndex('sessions', 'by-role', roleId)
  },
  async saveSession(session: InterviewSession): Promise<void> {
    await (await getDB()).put('sessions', session)
  },
  async getThreatModels(): Promise<ThreatModel[]> {
    return (await getDB()).getAll('threatModels')
  },
  async saveThreatModel(model: ThreatModel): Promise<void> {
    await (await getDB()).put('threatModels', model)
  },
  async deleteThreatModel(id: string): Promise<void> {
    await (await getDB()).delete('threatModels', id)
  },
  async getAgentFlows(): Promise<AgentFlow[]> {
    return (await getDB()).getAll('agentFlows')
  },
  async saveAgentFlow(flow: AgentFlow): Promise<void> {
    await (await getDB()).put('agentFlows', flow)
  },
  async getFlashcards(roleId: string): Promise<FlashCard[]> {
    return (await getDB()).getAllFromIndex('flashcards', 'by-role', roleId)
  },
  async getBookmarks(): Promise<string[]> {
    const all = await (await getDB()).getAll('bookmarks')
    return all.map((b) => b.questionId)
  },
  async addBookmark(questionId: string, roleId: string): Promise<void> {
    await (await getDB()).put('bookmarks', { id: questionId, questionId, roleId, savedAt: Date.now() })
  },
  async removeBookmark(questionId: string): Promise<void> {
    await (await getDB()).delete('bookmarks', questionId)
  },
}
