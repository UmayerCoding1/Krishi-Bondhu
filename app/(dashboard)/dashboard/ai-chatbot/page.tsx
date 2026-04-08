'use client'

import React from 'react'
import { DashboardContainer } from '@/components/dashboard/dashboard-container'
import { ChatSidebar } from '@/components/dashboard/ai-chatbot/chat-sidebar'
import { ChatWindow } from '@/components/dashboard/ai-chatbot/chat-window'
import { motion } from 'motion/react'

export default function AiChatbotPage() {
    return (
        <DashboardContainer className="p-0 sm:p-0 h-[calc(100vh-4rem)]">
            <div className="flex h-full w-full overflow-hidden">
                {/* Desktop/Tablet Sidebar */}
                <div className="hidden md:block">
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