import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api/v1';

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
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchSessions: () => Promise<void>;
    fetchChatHistory: (chatId: string) => Promise<void>;
    addMessage: (sessionId: string, message: Omit<Message, 'timestamp' | 'id'>) => void;
    sendMessage: (userId: string, chatId: string, content: string) => Promise<void>;
    streamAI: (userId: string, chatId: string, content: string) => Promise<void>;
    createNewChat: () => string;
    setActiveSession: (id: string) => void;
    deleteSession: (id: string) => Promise<void>;
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
            isLoading: false,
            error: null,

            setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

            fetchSessions: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.get(`${API_BASE_URL}/chat/all`, { withCredentials: true });
                    if (response.data.success) {
                        const fetchedSessions: ChatSession[] = response.data.chats.map((chat: any) => ({
                            id: chat.chatId,
                            title: chat.title,
                            messages: [], // History will be fetched on selection
                            lastUpdated: new Date(chat.createdAt).getTime(),
                            isPinned: false
                        }));
                        set({ sessions: fetchedSessions });
                    }
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Failed to fetch chats' });
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchChatHistory: async (chatId) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.get(`${API_BASE_URL}/chat/${chatId}`, { withCredentials: true });
                    if (response.data.success) {
                        const chat = response.data.chat;
                        const messages: Message[] = chat.messages.map((m: any, index: number) => ({
                            id: `${chatId}-${index}`,
                            role: m.role,
                            content: m.content,

                        }));

                        set((state) => ({
                            sessions: state.sessions.map((s) =>
                                s.id === chatId ? { ...s, messages, title: chat.title } : s
                            )
                        }));
                    }
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Failed to fetch chat history' });
                } finally {
                    set({ isLoading: false });
                }
            },

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
                                title: s.messages.length === 0 && message.role === 'user'
                                    ? message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')
                                    : s.title
                            }
                            : s
                    ),
                }));
            },

            sendMessage: async (userId, chatId, content) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_BASE_URL}/chat`, {
                        userId,
                        chatId,
                        message: content
                    }, { withCredentials: true });

                    if (response.data.success) {
                        const assistantMessage: Message = {
                            id: Math.random().toString(36).substring(7),
                            role: 'assistant',
                            content: response.data.reply,
                            timestamp: Date.now()
                        };

                        set((state) => ({
                            sessions: state.sessions.map((s) =>
                                s.id === chatId ? { ...s, messages: [...s.messages, assistantMessage] } : s
                            )
                        }));
                    }
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Failed to send message' });
                } finally {
                    set({ isLoading: false });
                }
            },

            streamAI: async (userId, chatId, content) => {
                console.log(userId, chatId, content);
                set({ isLoading: true, error: null });
                try {
                    // Using fetch for streaming
                    const response = await fetch(`${API_BASE_URL}/chat`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, chatId, message: content }),
                    });

                    if (!response.ok) throw new Error('Streaming failed');

                    const reader = response.body?.getReader();
                    const decoder = new TextDecoder();
                    let assistantReply = "";

                    // Initial empty message for the assistant
                    const assistantMessageId = Math.random().toString(36).substring(7);
                    set((state) => ({
                        sessions: state.sessions.map((s) =>
                            s.id === chatId ? {
                                ...s,
                                messages: [...s.messages, {
                                    id: assistantMessageId,
                                    role: 'assistant',
                                    content: "",
                                    timestamp: Date.now()
                                }]
                            } : s
                        )
                    }));

                    while (true) {
                        const { done, value } = await reader!.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        assistantReply += chunk;

                        set((state) => ({
                            sessions: state.sessions.map((s) =>
                                s.id === chatId ? {
                                    ...s,
                                    messages: s.messages.map(m =>
                                        m.id === assistantMessageId ? { ...m, content: assistantReply } : m
                                    )
                                } : s
                            )
                        }));
                    }
                } catch (error: any) {
                    set({ error: error.message || 'Streaming failed' });
                } finally {
                    set({ isLoading: false });
                }
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

            deleteSession: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    await axios.delete(`${API_BASE_URL}/chat/${id}`, { withCredentials: true });
                    set((state) => ({
                        sessions: state.sessions.filter((s) => s.id !== id),
                        activeSessionId: state.activeSessionId === id ? null : state.activeSessionId
                    }));
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Failed to delete chat' });
                    // Optional: still delete locally even if backend fails?
                } finally {
                    set({ isLoading: false });
                }
            },

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
