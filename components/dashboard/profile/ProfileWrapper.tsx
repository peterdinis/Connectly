'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { ProfileHeader } from './ProfileHeader';
import { LinkCard } from '../links/LinkCard';

const ProfileWrapper: FC = () => {
    const [links, setLinks] = useState<any[]>([]);
    const [profile, setProfile] = useState<any>({ name: '', bio: '' });
    const [design, setDesign] = useState<any>({
        theme: 'default',
        buttonStyle: 'rounded',
        backgroundStyle: 'gradient',
        fontStyle: 'sans',
        cardAnimation: 'slide',
    });
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    return (
        <div className={`min-h-screen`}>
            <div className="container max-w-2xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center mb-6"
                >
                    <ModeToggle />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push('/dashboard')}
                            className="gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            Dashboard
                        </Button>
                    </motion.div>
                </motion.div>

                <div className="space-y-8">
                    <ProfileHeader profile={profile} design={design} />

                    <div className="space-y-3">
                        {links.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center py-12"
                            >
                                <p className={' dark:text-white text-black'}>
                                    No links yet. Go to dashboard to add some!
                                </p>
                            </motion.div>
                        ) : (
                            links.map((link, index) => (
                                <LinkCard key={link.id} link={link} design={design} index={index} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileWrapper;
