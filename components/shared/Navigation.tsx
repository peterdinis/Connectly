'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { ModeToggle } from './ModeToggle';

const Navigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <LinkIcon className="w-6 h-6 text-primary" />
                    <span className="font-bold text-xl">Connectly</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex items-center gap-4"
                >
                    <LoginLink>
                        <Button variant="ghost">Login</Button>
                    </LoginLink>
                    <RegisterLink>
                        <Button>Get Started</Button>
                    </RegisterLink>

                    <ModeToggle />
                </motion.div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-background overflow-hidden"
                    >
                        <div className="flex flex-col px-4 py-2 gap-2">
                            <LoginLink>
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button className="w-full" onClick={() => setIsOpen(false)}>
                                    Get Started
                                </Button>
                            </RegisterLink>
                            <ModeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
