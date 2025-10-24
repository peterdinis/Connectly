'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, MapPin, Globe, Twitter, Instagram, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { themes } from '@/lib/design-themes';
import { motion } from 'framer-motion';
import { Profile, DesignSettings } from '@/types/ApplicationTypes';

interface ProfileHeaderProps {
    profile: Profile;
    design?: DesignSettings;
}

export function ProfileHeader({ profile, design }: ProfileHeaderProps) {
    const initials = profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const socialIcons = {
        twitter: Twitter,
        instagram: Instagram,
        github: Github,
        linkedin: Linkedin,
    };

    const theme = design ? themes[design.theme] : themes.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
                <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar || '/placeholder.svg'} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
            >
                <h1 className={`text-2xl font-bold ${theme.colors.text}`}>{profile.name}</h1>
                <p className={`${theme.colors.textMuted} text-balance max-w-md`}>{profile.bio}</p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-2 pt-2"
                >
                    {profile.email && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`flex items-center gap-2 text-sm ${theme.colors.textMuted}`}
                        >
                            <Mail className="w-4 h-4" />
                            <span>{profile.email}</span>
                        </motion.div>
                    )}
                    {profile.location && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 }}
                            className={`flex items-center gap-2 text-sm ${theme.colors.textMuted}`}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                        </motion.div>
                    )}
                    {profile.website && (
                        <motion.a
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm ${theme.colors.textMuted} hover:${theme.colors.text} transition-colors`}
                        >
                            <Globe className="w-4 h-4" />
                            <span>{profile.website}</span>
                        </motion.a>
                    )}
                </motion.div>

                {profile.socialLinks && Object.values(profile.socialLinks).some((link) => link) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        className="flex items-center justify-center gap-2 pt-3"
                    >
                        {profile.socialLinks.twitter && (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                    <a
                                        href={`https://twitter.com/${profile.socialLinks.twitter.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                </Button>
                            </motion.div>
                        )}
                        {profile.socialLinks.instagram && (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                    <a
                                        href={`https://instagram.com/${profile.socialLinks.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                </Button>
                            </motion.div>
                        )}
                        {profile.socialLinks.github && (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                    <a
                                        href={`https://github.com/${profile.socialLinks.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                </Button>
                            </motion.div>
                        )}
                        {profile.socialLinks.linkedin && (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                                    <a
                                        href={`https://linkedin.com/in/${profile.socialLinks.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
