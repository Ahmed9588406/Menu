"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import phoneMockup1 from "@/public/assets/phone-mockup-1.png";
import phoneMockup2 from "@/public/assets/phone-mockup-2.png";
import phoneMockup3 from "@/public/assets/phone-mockup-3.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
              <span className="text-foreground">SNAPE</span>
              <span className="text-gradient ml-2">X</span>
            </h2>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-foreground leading-tight mb-8"
          >
            The <span className="text-gradient">all-in-one solution</span> for cafes and
            <br className="hidden sm:block" /> restaurants
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/dashboard">
              <Button variant="hero" size="xl" className="rounded-full">
                Start Now
              </Button>
            </Link>
            <a href="#pricing">
              <Button variant="outline" size="xl" className="rounded-full border-border/50 bg-transparent hover:bg-muted/30">
                Our Pricing
              </Button>
            </a>
          </motion.div>

          {/* Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
              {/* Left Phone */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative w-24 sm:w-36 lg:w-48 opacity-60"
              >
                <Image
                  src={phoneMockup2}
                  alt="Menu app"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </motion.div>

              {/* Center Phone (Main) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative w-40 sm:w-56 lg:w-72 z-10"
              >
                <div className="relative">
                  <Image
                    src={phoneMockup1}
                    alt="Digital menu showcase"
                    className="w-full h-auto rounded-3xl shadow-2xl shadow-accent/20"
                  />
                  {/* Glow effect behind main phone */}
                  <div className="absolute inset-0 -z-10 blur-2xl bg-accent/30 rounded-3xl scale-95" />
                </div>
              </motion.div>

              {/* Right Phone */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="relative w-24 sm:w-36 lg:w-48 opacity-60"
              >
                <Image
                  src={phoneMockup3}
                  alt="Order management"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* QR Code Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-light border border-border/30 hover:border-accent/50 transition-colors group"
            >
              <span className="text-sm font-medium text-foreground">Go to website</span>
              <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-foreground" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;