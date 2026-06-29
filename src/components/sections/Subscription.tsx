"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Subscription() {
  const handleEnquire = () => {
    const message = `Hi ${siteConfig.name},%0A%0AI would like to know more about your Subscription plans.%0A%0APlease share the complete details.%0A%0AThank you.`;
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="subscription" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">Subscriptions</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">Healthy Every Day</h2>
          <p className="text-lg text-foreground/80 mb-10 leading-relaxed">
            Subscribe and enjoy healthy oat bowls delivered regularly. Fresh nutrition without the daily hassle. We offer flexible plans tailored to your lifestyle and fitness goals. 
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button
              size="lg"
              className="text-lg h-14 px-10 shadow-xl shadow-primary/20"
              onClick={handleEnquire}
            >
              <MessageCircle size={20} className="mr-3" />
              Know More on WhatsApp
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
