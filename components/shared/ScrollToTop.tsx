'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

type ScrollToTopProps = {
    /**
     * Show button after scrolling this many pixels (default 300)
     */
    threshold?: number;
    /**
     * Scroll behavior: 'smooth' or 'auto' (default 'smooth')
     */
    behavior?: ScrollBehavior;
    /**
     * Position offset from bottom/right (Tailwind spacing classes are used here as defaults)
     * Example: 'bottom-6 right-6' or 'bottom-4 right-4'
     */
    positionClass?: string;
    /**
     * Optional aria-label
     */
    ariaLabel?: string;
};

const ScrollToTop: React.FC<ScrollToTopProps> = ({
    threshold = 300,
    behavior = 'smooth',
    positionClass = 'bottom-6 right-6',
    ariaLabel = 'Scroll to top',
}) => {
    const [visible, setVisible] = useState(false);

    const checkScroll = useCallback(() => {
        if (typeof window === 'undefined') return;
        setVisible(window.scrollY > threshold);
    }, [threshold]);

    useEffect(() => {
        // initial check
        checkScroll();
        const onScroll = () => checkScroll();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [checkScroll]);

    const handleClick = () => {
        // Respect reduced motion preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const finalBehavior: ScrollBehavior = prefersReduced ? 'auto' : behavior;

        // scroll top
        window.scrollTo({ top: 0, behavior: finalBehavior });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={`fixed ${positionClass} z-50`}
                >
                    <Button
                        onClick={handleClick}
                        aria-label={ariaLabel}
                        title={ariaLabel}
                        size="icon"
                        className="shadow-lg/5 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
