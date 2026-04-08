'use client'

import React from 'react'
import { DashboardContainer } from '@/components/dashboard/dashboard-container'
import { ChatSidebar } from '@/components/dashboard/ai-chatbot/chat-sidebar'
import { ChatWindow } from '@/components/dashboard/ai-chatbot/chat-window'
import { motion, AnimatePresence } from 'motion/react'
import { useChatStore } from '@/store/useChatStore'

export default function AiChatbotPage() {
    const { isMobileSidebarOpen, setMobileSidebarOpen } = useChatStore();

    return (
        <DashboardContainer className="p-0 sm:p-0 h-[calc(100vh-4rem)]">
            <div className="flex h-full w-full overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileSidebarOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                            />
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-neutral-900 z-50 md:hidden shadow-2xl"
                            >
                                <ChatSidebar />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar (Fixed) */}
                <div className="hidden md:block border-r border-neutral-200 dark:border-neutral-800">
                    <ChatSidebar />
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 relative h-full">
                    <ChatWindow />
                </div>
            </div>
        </DashboardContainer>
    )
}