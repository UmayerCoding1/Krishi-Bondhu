'use client';
import React from 'react'
import { Logo } from './logo'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "প্ল্যাটফর্ম",
            links: [
                { name: "মূল পাতা", href: "/" },
                { name: "সেবাসমূহ", href: "#services" },
                { name: "কিভাবে কাজ করে", href: "#how-it-works" },
                { name: "প্রাইসিং", href: "#pricing" },
            ]
        },
        {
            title: "সহযোগিতা",
            links: [
                { name: "যোগাযোগ করুন", href: "#contact" },
                { name: "সাধারণ প্রশ্ন (FAQ)", href: "#faq" },
                { name: "গোপনীয়তা নীতি", href: "/privacy" },
                { name: "শর্তাবলী", href: "/terms" },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full bg-background border-t pt-16 pb-8"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <Logo />
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            কৃষকের ডিজিটাল সাথী—তথ্য ও প্রযুক্তির মাধ্যমে বাংলাদেশের কৃষিকে আধুনিকায়ন এবং কৃষকের জীবন সহজ করাই আমাদের মূল লক্ষ্য।
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {/* <Facebook size={20} /> */}
                                Facebook
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {/* <Twitter size={20} /> */}
                                Twitter
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {/* <Instagram size={20} /> */}
                                Instagram
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {/* <Youtube size={20} /> */}
                                Youtube
                            </Link>
                        </div>
                    </motion.div>

                    {/* Navigation Sections */}
                    {footerSections.map((section, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="space-y-6">
                            <h3 className="font-bold text-lg">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Contact Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="font-bold text-lg">যোগাযোগ</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>ঢাকা, বাংলাদেশ</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+৮৮০১৭১২-৩৪৫৬৭৮</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>support@krisibondho.com</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {currentYear} কৃষি-বন্ধু। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-red-500 text-sm">♥</span> in Bangladesh
                    </p>
                </div>
            </div>
        </motion.footer>
    )
}
