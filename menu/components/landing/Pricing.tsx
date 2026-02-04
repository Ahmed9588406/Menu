"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Trial",
    nameAr: "تجريبي",
    price: { monthly: "Free", yearly: "Free" },
    features: [
      "Basic digital menu",
      "Up to 20 items",
      "Email support",
      "Mobile responsive",
    ],
    cta: "Start Trial",
    popular: false,
  },
  {
    name: "Basic",
    nameAr: "أساسي",
    price: { 
      monthly: "EGP 250", 
      yearly: "EGP 2,500",
      yearlyOriginal: "3,000 EGP"
    },
    features: [
      "Advanced digital menu",
      "Unlimited items",
      "Basic POS system",
      "Priority support",
      "Custom branding",
      "Analytics dashboard",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    nameAr: "Professional",
    price: { monthly: "EGP 500", yearly: "EGP 5,000" },
    features: [
      "Everything in Basic",
      "Custom integrations",
      "Dedicated account manager",
      "White-label solution",
      "Advanced reporting",
      "API access",
      "Training sessions",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Full",
    nameAr: "Full",
    price: { monthly: "EGP 700", yearly: "EGP 7,000" },
    features: [
      "Everything in Professional",
      "Full POS system",
      "Inventory management",
      "Staff management",
      "Advanced analytics",
      "Multi-location support",
      "24/7 support",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Choose Your Package
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the perfect plan for your restaurant's needs
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center p-1 rounded-full bg-muted/50 border border-border/50">
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                isYearly
                  ? "bg-accent text-accent-foreground shadow-button"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
            </button>
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                !isYearly
                  ? "bg-accent text-accent-foreground shadow-button"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-3xl bg-gradient-card border transition-all hover:border-accent/50",
                plan.popular ? "border-accent shadow-glow" : "border-border/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {plan.nameAr}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-bold text-foreground">
                    {isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.yearly !== "Free" && (
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
                {isYearly && plan.price.yearlyOriginal && (
                  <span className="text-sm text-muted-foreground line-through">
                    {plan.price.yearlyOriginal}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/dashboard">
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full rounded-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;