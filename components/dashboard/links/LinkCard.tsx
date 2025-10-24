'use client';

import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { themes, buttonStyles } from '@/lib/design-themes';
import { DesignSettings, Link } from '@/types/ApplicationTypes';

interface LinkCardProps {
    link: Link;
    design?: DesignSettings;
    index?: number;
}

export function LinkCard({ link, design, index = 0 }: LinkCardProps) {
    const theme = design ? themes[design.theme] : themes.default;
    const buttonStyle = design ? buttonStyles[design.buttonStyle] : buttonStyles.rounded;

    const handleClick = () => {
        // TODO
    };

    const animationVariants = {
        none: {},
        slide: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
        },
        scale: {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
        },
        bounce: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
        },
    };

    const animation = design?.cardAnimation || 'slide';
    const variant = animationVariants[animation];

    const CardWrapper = animation !== 'none' ? motion.a : 'a';

    return (
        <CardWrapper
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            onClick={handleClick}
            {...(animation !== 'none' && {
                transition: {
                    delay: index * 0.1,
                    type: animation === 'bounce' ? 'spring' : 'tween',
                },
            })}
        >
            <Card
                className={`p-4 ${theme.colors.card} ${theme.colors.cardHover} ${buttonStyle} transition-all cursor-pointer group border`}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {link.icon && <span className="text-2xl shrink-0">{link.icon}</span>}
                        <span className={`font-medium ${theme.colors.text} truncate`}>
                            {link.title}
                        </span>
                    </div>
                    <ExternalLink
                        className={`w-4 h-4 ${theme.colors.textMuted} group-hover:${theme.colors.text} transition-colors shrink-0`}
                    />
                </div>
            </Card>
        </CardWrapper>
    );
}
