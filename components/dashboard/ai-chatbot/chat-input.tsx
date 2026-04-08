'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading?: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
            <div className="relative glass rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="আপনার প্রশ্ন এখানে লিখুন..."
                    className="w-full bg-transparent border-none focus:ring-0 resize-none py-4 px-6 pr-16 text-sm md:text-base leading-relaxed text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                />
                
                <div className="absolute right-3 bottom-2.5">
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={cn(
                            "rounded-xl transition-all duration-300",
                            input.trim() 
                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100" 
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 scale-90"
                        )}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </div>
            <p className="mt-3 text-[10px] md:text-xs text-center text-neutral-400">
                এআই সহকারী মাঝে মাঝে ভুল তথ্য দিতে পারে। গুরুত্বপূর্ণ সিদ্ধান্ত নিতে পেশাদার পরামর্শ নিন।
            </p>
        </div>
    )
}
