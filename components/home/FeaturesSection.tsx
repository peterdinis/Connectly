'use client';

import { motion } from 'framer-motion';
import { LinkIcon, Palette, BarChart3 } from 'lucide-react';
import { FC } from 'react';

const FeaturesSection: FC = () => {
    return (
        <section className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
                <p className="text-lg text-muted-foreground">
                    Powerful features to make your link page stand out
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                    {
                        icon: LinkIcon,
                        title: 'Unlimited Links',
                        description:
                            'Add as many links as you want. Organize them with drag-and-drop reordering.',
                        delay: 0,
                    },
                    {
                        icon: Palette,
                        title: 'Custom Design',
                        description:
                            'Choose from beautiful themes or create your own with custom colors and styles.',
                        delay: 0.1,
                    },
                    {
                        icon: BarChart3,
                        title: 'Analytics',
                        description:
                            'Track views, clicks, and engagement. Understand your audience better.',
                        delay: 0.2,
                    },
                ].map((feature) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: feature.delay }}
                        whileHover={{ y: -8 }}
                        className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
                    >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
