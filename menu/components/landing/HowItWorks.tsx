import { motion } from "framer-motion";
import { FileText, Brush, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Add Your Menu Items",
    description: "Simply type or import your existing menu. Add photos, descriptions, prices, and dietary info.",
  },
  {
    number: "02",
    icon: Brush,
    title: "Customize Your Design",
    description: "Choose colors, fonts, and layouts that match your brand. Drag and drop to arrange sections.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Publish & Share",
    description: "Go live instantly with a custom URL or QR code. Update anytime from your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-semibold mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Three Simple Steps to Your{" "}
            <span className="text-accent">Perfect Menu</span>
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Get your digital menu up and running in less than 10 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-foreground/20 via-accent to-primary-foreground/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Step number bubble */}
              <div className="relative inline-block mb-8">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center relative z-10">
                  <step.icon className="w-9 h-9 text-accent-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-foreground text-foreground font-bold text-sm flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold mb-4">
                {step.title}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;