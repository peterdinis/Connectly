'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/shared/ScrollToTop';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <section>
            <div className="flex h-screen overflow-hidden">
                <DashboardSidebar />
                <AnimatePresence>
                    <motion.main
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 overflow-y-auto"
                    >
                        {children}
                        <Toaster />
                        <ScrollToTop behavior="smooth" />
                    </motion.main>
                </AnimatePresence>
            </div>
        </section>
    );
}
