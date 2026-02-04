"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "+40",
    label: "+40 Restaurants & Cafes",
    description: "Our success partners from across the Arab world",
  },
  {
    value: "24/7",
    label: "24-Hour Service",
    description: "Technical support and fast response around the clock",
  },
  {
    value: "V6",
    label: "Continuous Growth",
    description: "Always evolving to provide the best",
  },
];

const Stats = () => {
  return (
    <section className="py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Numbers That Speak About Our Achievements
          </h2>
          <p className="text-lg text-muted-foreground">
            We help our customers achieve real growth through our service.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-gradient-card border border-border/50 hover:border-accent/30 transition-colors"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gradient mb-4">
                {stat.value}
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-muted-foreground text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;