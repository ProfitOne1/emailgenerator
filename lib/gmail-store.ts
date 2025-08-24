import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface GmailConfig {
  time: string
  battery: string
  subject: string
  label: string
  senderName: string
  senderEmail: string
  profilePicture: string
  emailContent: string
}

interface GmailStore {
  config: GmailConfig
  updateConfig: (key: keyof GmailConfig, value: string) => void
  clearAll: () => void
}

const defaultConfig: GmailConfig = {
  time: "10:24",
  battery: "99",
  subject: "not gonna sugarcoat it",
  label: "Inbox",
  senderName: "Alex Keene",
  senderEmail: "alex@example.com",
  profilePicture: "/professional-headshot.png",
  emailContent:
    "Hey –\n\nMost GLP-1 clinics make it way harder (and more expensive) than it needs to be. We cut out the middlemen, the markup, and the nonsense.\n\nSame meds. Legit providers. Zero fluff.\n\nIf you've been thinking about trying it but got overwhelmed by all the chaos out there—yeah, we built this on purpose",
}

export const useGmailStore = create<GmailStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateConfig: (key, value) =>
        set((state) => ({
          config: { ...state.config, [key]: value },
        })),
      clearAll: () => set({ config: defaultConfig }),
    }),
    {
      name: "gmail-editor-storage",
    },
  ),
)
