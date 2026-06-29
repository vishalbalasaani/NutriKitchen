"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Leaf, Dumbbell, Ban, Clock, ArrowRight, ShoppingBag } from "lucide-react";

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSubscriptions = () => {
    document.getElementById("subscriptions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="flex justify-center lg:justify-start">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-primary font-medium text-sm border border-accent/30 shadow-sm">
                🌿 Natural & Healthy
              </span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
              Fuel Your Day <br className="hidden md:block" />
              <span className="text-primary">Naturally</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {siteConfig.description}
            </p>
            
            {/* Removed CTA Buttons as per request */}

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex shrink-0 items-center justify-center text-primary">
                  <Leaf size={20} />
                </div>
                <span className="text-sm font-semibold">100% Fresh</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex shrink-0 items-center justify-center text-primary">
                  <Dumbbell size={20} />
                </div>
                <span className="text-sm font-semibold">High Protein</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex shrink-0 items-center justify-center text-primary">
                  <Ban size={20} />
                </div>
                <span className="text-sm font-semibold">No Additives</span>
              </div>
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex shrink-0 items-center justify-center text-primary">
                  <Clock size={20} />
                </div>
                <span className="text-sm font-semibold">Daily Prepared</span>
              </div>
            </div>
          </motion.div>

          {/* Image Content (Professional Static Bowl with Dissolve Effect) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full order-1 lg:order-2 flex justify-center items-center h-[350px] md:h-[450px] lg:h-[600px]"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center z-20 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_75%)]">
              <img
                src="/images/hero-banana-bowl.png"
                alt="Professional Banana Oat Bowl"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
