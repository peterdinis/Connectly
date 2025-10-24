import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const GetStartedSection: FC = () => {
    return (
        <section className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8">Join thousands of creators sharing their links in style</p>
                <Link href="/register">
                    <Button size="lg" className="gap-2 text-lg px-8">
                        Create Your Page
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    );

}

export default GetStartedSection;