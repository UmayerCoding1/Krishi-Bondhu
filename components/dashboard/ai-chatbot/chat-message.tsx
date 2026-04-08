'use client'

import React from 'react'
import { motion } from 'motion/react'
import { User, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Message } from '@/store/useChatStore'

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isAssistant = message.role === 'assistant';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex w-full gap-4 px-4 py-6",
                isAssistant ? "bg-neutral-50/50 dark:bg-neutral-900/50" : "bg-transparent"
            )}
        >
            <div className={cn(
                "max-w-4xl mx-auto flex w-full gap-4",
                !isAssistant && "flex-row-reverse"
            )}>
                {/* Avatar */}
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-colors",
                    isAssistant ? "bg-primary text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                )}>
                    {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className={cn(
                    "flex-1 space-y-2",
                    !isAssistant && "text-right"
                )}>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {isAssistant ? 'এআই সহকারী' : 'আপনি'}
                    </p>
                    <div className={cn(
                        "prose prose-sm dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap",
                        !isAssistant && "text-right"
                    )}>
                        {message.content}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
