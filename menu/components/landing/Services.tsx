"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceQrMenu from "@/public/assets/service-qr-menu.png";
import servicePos from "@/public/assets/service-pos.png";
import serviceInventory from "@/public/assets/service-inventory.png";
import serviceReports from "@/public/assets/service-reports.png";
import serviceSystem from "@/public/assets/service-system.png";
import Image from "next/image";

const services = [
  {
    id: "qr-menu",
    image: serviceQrMenu,
    title: "QR Menu + Full Menu Control",
    features: [
      "A complete digital menu via QR.",
      "Multiple professional menu templates.",
      "Full control over menu details (categories, items, prices, add-ons).",
      "Manage images, colors, and brand identity.",
      "Connect social media and contact links.",
    ],
  },
  {
    id: "pos",
    image: servicePos,
    title: "Order Management & POS System",
    description: "A complete system to manage orders, tables, and branches with a professional reception dashboard.",
    features: [
      "Create orders easily from the digital menu or the admin panel.",
      "A professional dashboard to receive and manage orders.",
      "Integrated management for tables and branches.",
      "Track the order status step by step from the menu.",
      "Reservation system and customer flow organization.",
    ],
  },
  {
    id: "inventory",
    image: serviceInventory,
    title: "Inventory Management System",
    features: [
      "Track inventory accurately and professionally.",
      "Link items to ingredients and quantities.",
      "Inventory movements: purchases, returns, and automatic updates.",
      "Automatic deduction when orders are placed.",
      "Reorder point alerts and notifications.",
    ],
  },
  {
    id: "reports",
    image: serviceReports,
    title: "Reporting System",
    features: [
      "Detailed daily and weekly sales & financial reports.",
      "Accurate tracking for branches and staff performance.",
      "Analyze customer behavior and demand trends.",
      "Detect suspicious activity and financial errors.",
      "Smart cash tracking with daily drawer open/close logs.",
    ],
  },
  {
    id: "system",
    image: serviceSystem,
    title: "Fully Integrated System",
    features: [
      "Full employee management (attendance, shifts, and accounts).",
      "Flexible role-based permissions for every staff type.",
      "Complete branch and venue management.",
      "Add-on packages and services to simplify daily operations.",
      "Smart offers, coupons, and marketing tools.",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            All solutions to manage your place
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-card p-2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto rounded-2xl"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 blur-3xl bg-accent/20 scale-90" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">
                  {service.title}
                </h3>
                
                {service.description && (
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                )}

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="group text-accent hover:text-accent hover:bg-accent/10 p-0">
                  Learn more about {service.title}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;