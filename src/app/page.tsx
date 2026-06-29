"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { Subscription } from "@/components/sections/Subscription";
import { FloatingCart } from "@/components/cart/FloatingCart";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && !window.location.hash) {
              window.location.replace(window.location.pathname + '#menu');
            }
          `
        }}
      />
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <MenuSection />
        <Subscription />
      </main>
      <Footer />
      
      {/* Client-side Cart Components */}
      <FloatingCart />
      <CartDrawer />
    </>
  );
}
