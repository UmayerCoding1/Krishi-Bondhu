'use client'

import React from 'react'
import { Plus, MessageSquare, History, Trash2, MoreVertical, Pin, PinOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChatStore } from '@/store/useChatStore'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'

export const ChatSidebar = () => {
    const { sessions, activeSessionId, createNewChat, setActiveSession, deleteSession, togglePin } = useChatStore();

    const sortedSessions = [...sessions].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return (b.lastUpdated || 0) - (a.lastUpdated || 0);
    });

    return (
        <div className="w-full md:w-64 flex flex-col h-full bg-neutral-50/50 dark:bg-neutral-900/50 border-r border-neutral-200 dark:border-neutral-800">
            {/* New Chat Button */}
            <div className="p-4">
                <Button 
                    onClick={() => createNewChat()}
                    className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-white shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>নতুন চ্যাট</span>
                </Button>
            </div>

            {/* History Label */}
            <div className="px-4 py-2 flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                <History className="w-3 h-3" />
                <span>ইতিহাস</span>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                <AnimatePresence initial={false}>
                    {sortedSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="group relative"
                        >
                            <button
                                onClick={() => setActiveSession(session.id)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3",
                                    activeSessionId === session.id 
                                        ? "bg-primary/10 text-primary font-medium" 
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                                    session.isPinned && activeSessionId !== session.id && "bg-neutral-100/50 dark:bg-neutral-800/30"
                                )}
                            >
                                <div className="relative">
                                    <MessageSquare className={cn(
                                        "w-4 h-4 shrink-0",
                                        activeSessionId === session.id ? "text-primary" : "text-neutral-400"
                                    )} />
                                    {session.isPinned && (
                                        <div className="absolute -top-1 -right-1">
                                            <Pin className="w-2 h-2 text-primary fill-primary" />
                                        </div>
                                    )}
                                </div>
                                <span className="truncate flex-1">{session.title}</span>
                                
                                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePin(session.id);
                                        }}
                                        className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                                        title={session.isPinned ? "পিন থেকে সরিয়ে নিন" : "পিন করুন"}
                                    >
                                        <Pin className={cn(
                                            "w-3 h-3 text-neutral-500",
                                            session.isPinned && "text-primary fill-primary"
                                        )} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm('আপনি কি এই চ্যাটটি মুছে ফেলতে চান?')) {
                                                deleteSession(session.id);
                                            }
                                        }}
                                        className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                                        title="মুছে ফেলুন"
                                    >
                                        <Trash2 className="w-3 h-3 text-neutral-500 hover:text-red-500" />
                                    </button>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {sessions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-neutral-300" />
                        </div>
                        <p className="text-xs text-neutral-400">কোন ইতিহাস নেই</p>
                    </div>
                )}
            </div>
        </div>
    )
}
