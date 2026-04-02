'use client'
import React from 'react';
import { motion } from 'motion/react';
export const LoginForm = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            LoginForm
        </motion.div>
    )
}
