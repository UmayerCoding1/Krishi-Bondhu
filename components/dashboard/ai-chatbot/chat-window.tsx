'use client'

import React, { useRef, useEffect } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { useChatStore } from '@/store/useChatStore'
import { Bot, Sparkles, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export const ChatWindow = () => {
    const { sessions, activeSessionId, addMessage, createNewChat } = useChatStore();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const activeSession = sessions.find(s => s.id === activeSessionId);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeSession?.messages, isLoading]);

    const handleSendMessage = async (content: string) => {
        let currentSessionId = activeSessionId;
        
        // If no active session, create one
        if (!currentSessionId) {
            currentSessionId = createNewChat();
        }

        // Add user message
        addMessage(currentSessionId, { role: 'user', content });
        
        // Simulate AI response
        setIsLoading(true);
        setTimeout(() => {
            addMessage(currentSessionId!, { 
                role: 'assistant', 
                content: `ধন্যবাদ আপনার প্রশ্নের জন্য। আমি আপনার সব প্রশ্নের সঠিক উত্তর দিতে এখন ট্রেনিং নিচ্ছি। তবে আপনি চাইলে আমাকে আপনার চাষাবাদ সম্পর্কিত যেকোনো প্রশ্ন করতে পারেন।` 
            });
            setIsLoading(false);
        }, 1500);
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-neutral-950">
            {/* Message Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto scroll-smooth pb-32"
            >
                {!activeSession || activeSession.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-10 space-y-6 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                            <div className="relative z-10 w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-md"
                            >
                                <Sparkles className="w-4 h-4 text-orange-400" />
                            </motion.div>
                        </motion.div>

                        <div className="space-y-2 max-w-sm">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                স্বাগতম! আমি আপনার কৃষি বন্ধু
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                চাষাবাদ, ফসলের রোগ বা বাজার দর সম্পর্কে আপনার যেকোনো প্রশ্ন আমাকে করুন। আমি আপনাকে সাহায্য করতে প্রস্তুত।
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {['সেরা ধান চাষের পদ্ধতি?', 'আনারসে কি সার দেব?', 'বাজার দর আজ কেমন?'].map((q, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSendMessage(q)}
                                    className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 hover:border-primary hover:text-primary transition-colors bg-white/50 dark:bg-neutral-900/50"
                                >
                                    {q}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {activeSession.messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4 px-4 py-6 bg-neutral-50/50 dark:bg-neutral-900/50"
                            >
                                <div className="max-w-4xl mx-auto flex w-full gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex gap-1.5 items-center">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Fixed at Bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-white dark:from-neutral-950 via-white/80 dark:via-neutral-950/80 to-transparent pt-10">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    )
}
