"use client";

import * as React from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCart() {
  const { getTotalItems, getTotalPrice, setDrawerOpen } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          onClick={() => setDrawerOpen(true)}
          className="fixed z-40 bottom-0 left-0 right-0 w-full md:w-auto md:left-auto md:right-8 md:bottom-8 bg-primary text-primary-foreground shadow-2xl md:rounded-full px-6 py-4 md:py-4 flex justify-between md:justify-start items-center gap-4 hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Open Cart"
        >
          <div className="flex items-center gap-3">
            <div className="relative bg-white/20 p-2 rounded-full">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium opacity-90">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
              <span className="font-bold">₹{totalPrice}</span>
            </div>
          </div>
          <div className="font-semibold text-sm flex items-center gap-2">
            View Cart <span className="text-lg">→</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
