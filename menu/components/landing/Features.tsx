import { motion } from "framer-motion";
import { 
  Palette, 
  Smartphone, 
  Zap, 
  BarChart3, 
  QrCode, 
  Globe 
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from dozens of professionally designed templates that match your brand perfectly.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Your menu looks stunning on any device - phones, tablets, or desktop browsers.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "Change prices, items, or descriptions in seconds. No reprinting needed.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track which items are viewed most and optimize your menu for better sales.",
  },
  {
    icon: QrCode,
    title: "QR Code Ready",
    description: "Generate beautiful QR codes for contactless ordering at tables.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Serve international guests with automatic menu translations in 50+ languages.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-cream-light">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-6">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="text-secondary">Delight Your Guests</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features that help you create, manage, and analyze your digital menus effortlessly.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;