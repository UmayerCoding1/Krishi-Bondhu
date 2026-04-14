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
import { motion } from 'motion/react';
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
        // { title: 'আমাদের সম্পর্কে', href: '/about' },
        // { title: 'যোগাযোগ', href: '/contact' }
    ];

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                'sticky top-0 z-50 w-full transition-all duration-300 border-b  border-transparent dark:border-mauve-300',
                isScrolled ? 'bg-background/80 backdrop-blur-md border-border shadow-sm' : 'bg-white dark:bg-black'
            )}
        >
            <div
                className={cn(
                    "px-4 md:px-6 transition-all duration-300 ease-in-out w-full transform",
                    isScrolled
                        ? "max-w-7xl mx-auto scale-[0.98]"
                        : "max-w-full scale-100"
                )}
            >
                <nav className='flex h-16 items-center justify-between'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center gap-6"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Logo />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-8'>
                        <ul className='flex items-center gap-6'>
                            {navlist.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.li
                                        key={item.title}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'text-sm font-semibold transition-colors relative group font-display',
                                                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            {item.title}
                                            <span className={cn(
                                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full",
                                                isActive ? "w-full" : ""
                                            )} />
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='flex items-center gap-4 border-l border-border pl-4'

                        >
                            <ModeToggle />
                            {user ? (
                                <AppButton className='text-md' onClick={() => route.push('/dashboard/user')}>
                                    <LayoutDashboard size={15} />
                                    ড্যাশবোর্ড
                                </AppButton>
                            ) : (
                                <AppButton className='text-md' onClick={() => route.push('/auth')}>
                                    <LogIn size={15} />
                                    শুরু করুন
                                </AppButton>
                            )}
                        </motion.div>
                    </div>

                    {/* Mobile Navigation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className='flex items-center gap-2 md:hidden'
                    >
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="flex flex-col border-l border-border/20 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
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
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-auto pt-6 border-t border-border/50"
                                    onClick={() => route.push(user ? '/dashboard/user' : '/auth')}
                                >
                                    <Button className="w-full rounded-full py-6 text-lg font-display font-medium shadow-md">
                                        {user ? 'ড্যাশবোর্ড' : 'শুরু করুন'}
                                    </Button>
                                </motion.div>
                            </SheetContent>
                        </Sheet>
                    </motion.div>
                </nav>
            </div>
        </motion.header>
    );
};
