"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-purple-mid to-background" />
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          
          {/* Content */}
          <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Start improving your place
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join the restaurants and cafés already using SnapexMenu to streamline operations and delight customers.
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-foreground">3-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="text-foreground">Dedicated full support</span>
              </div>
            </div>

            <Button variant="hero" size="xl" className="rounded-full">
              Get Started Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;