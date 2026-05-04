'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './logo';
import ModeToggle from './theme-toggle';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, Menu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AppButton } from './app-button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
    const { user } = useAuth();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const route = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname.startsWith('/dashboard') || pathname === '/auth' || pathname.startsWith('/verify')) {
        return null;
    }

    const navlist = [
        { title: 'সুবিধাসমূহ', href: '/features' },
        { title: 'মূল্য তালিকা', href: '/pricing' },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
                isScrolled ? 'pt-4' : 'pt-0'
            )}
        >
            <div
                className={cn(
                    "mx-auto transition-all duration-500 ease-in-out",
                    isScrolled
                        ? "max-w-[95%] md:max-w-5xl"
                        : "max-w-full"
                )}
            >
                <div className={cn(
                    "px-4 md:px-8 transition-all duration-500 flex items-center justify-between h-16",
                    isScrolled 
                        ? "glass rounded-full border-white/20 dark:border-white/10 shadow-premium dark:shadow-premium-dark" 
                        : "bg-background/0 border-b border-transparent"
                )}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center"
                    >
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Logo />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-8'>
                        <nav>
                            <ul className='flex items-center gap-1'>
                                {navlist.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <motion.li
                                            key={item.title}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 relative group font-display',
                                                    isActive 
                                                        ? 'text-primary bg-primary/5' 
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                )}
                                            >
                                                {item.title}
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.span 
                                                            layoutId="nav-underline"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </nav>
                        
                        <div className='flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800'>
                            <ModeToggle />
                            {user ? (
                                <AppButton 
                                    className='rounded-full shadow-lg shadow-green-500/20 px-6' 
                                    onClick={() => route.push('/dashboard/user')}
                                >
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    ড্যাশবোর্ড
                                </AppButton>
                            ) : (
                                <AppButton 
                                    className='rounded-full shadow-lg shadow-green-500/20 px-6' 
                                    onClick={() => route.push('/auth')}
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    শুরু করুন
                                </AppButton>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className='flex items-center gap-2 md:hidden'>
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="flex flex-col border-l border-border/20 bg-background/95 backdrop-blur-xl">
                                <SheetHeader className="text-left border-b border-border/50 pb-4 mb-4">
                                    <SheetTitle className="sr-only">Menu</SheetTitle>
                                    <div className="w-24 mt-2">
                                        <Logo />
                                    </div>
                                </SheetHeader>
                                <ul className='flex flex-col gap-4 mt-2'>
                                    {navlist.map((item, index) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * index + 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'block text-lg font-medium p-3 rounded-lg transition-all font-display',
                                                        isActive
                                                            ? 'bg-primary/10 text-primary translate-x-1'
                                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                    )}
                                                >
                                                    {item.title}
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                                <div
                                    className="mt-auto pt-6 border-t border-border/50"
                                    onClick={() => route.push(user ? '/dashboard/user' : '/auth')}
                                >
                                    <Button className="w-full rounded-full py-6 text-lg font-display font-medium shadow-lg shadow-green-500/20">
                                        {user ? 'ড্যাশবোর্ড' : 'শুরু করুন'}
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};
