import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
};

export type ChatSession = {
    id: string;
    title: string;
    messages: Message[];
    lastUpdated: number;
    isPinned?: boolean;
};

type ChatStore = {
    sessions: ChatSession[];
    activeSessionId: string | null;
    
    // Actions
    addMessage: (sessionId: string, message: Omit<Message, 'timestamp' | 'id'>) => void;
    createNewChat: () => string;
    setActiveSession: (id: string) => void;
    deleteSession: (id: string) => void;
    clearMessages: (id: string) => void;
    togglePin: (id: string) => void;
    isMobileSidebarOpen: boolean;
    setMobileSidebarOpen: (open: boolean) => void;
};

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            sessions: [],
            activeSessionId: null,
            isMobileSidebarOpen: false,

            setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

            addMessage: (sessionId, message) => {
                const newMessage: Message = {
                    ...message,
                    id: Math.random().toString(36).substring(7),
                    timestamp: Date.now(),
                };

                set((state) => ({
                    sessions: state.sessions.map((s) =>
                        s.id === sessionId
                            ? {
                                  ...s,
                                  messages: [...s.messages, newMessage],
                                  lastUpdated: Date.now(),
                                  // Auto-generate title if it's the first user message
                                  title: s.messages.length === 0 && message.role === 'user' 
                                      ? message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')
                                      : s.title
                              }
                            : s
                    ),
                }));
            },

            createNewChat: () => {
                const newId = Math.random().toString(36).substring(7);
                const newSession: ChatSession = {
                    id: newId,
                    title: 'নতুন চ্যাট',
                    messages: [],
                    lastUpdated: Date.now(),
                    isPinned: false,
                };

                set((state) => ({
                    sessions: [newSession, ...state.sessions],
                    activeSessionId: newId,
                }));

                return newId;
            },

            setActiveSession: (id) => set({ activeSessionId: id }),

            deleteSession: (id) => set((state) => ({
                sessions: state.sessions.filter((s) => s.id !== id),
                activeSessionId: state.activeSessionId === id ? null : state.activeSessionId
            })),

            clearMessages: (id) => set((state) => ({
                sessions: state.sessions.map((s) => 
                    s.id === id ? { ...s, messages: [] } : s
                )
            })),

            togglePin: (id) => set((state) => ({
                sessions: state.sessions.map((s) =>
                    s.id === id ? { ...s, isPinned: !s.isPinned } : s
                )
            })),
        }),
        {
            name: 'chat-storage',
        }
    )
);
