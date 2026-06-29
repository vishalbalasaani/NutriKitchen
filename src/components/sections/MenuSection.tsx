"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { Search, Plus, Minus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence } from "framer-motion";
import type { CartItem } from "@/store/cartStore";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  type MenuItem = typeof siteConfig.menu[0];
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const filteredMenu = React.useMemo(() => {
    return siteConfig.menu.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Menu</h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Discover our range of handcrafted oat bowls, made fresh every morning with premium organic ingredients.
          </p>
        </div>

        {/* Controls: Search and Filters (Sticky for easy access) */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm py-4 border-b border-border/20 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start w-full md:w-auto gap-2">
            {siteConfig.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground hover:bg-border/50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <Input
              type="text"
              placeholder="Search bowls..."
              className="pl-11 rounded-full bg-secondary border-transparent focus-visible:ring-primary focus-visible:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8 divide-y md:divide-none border-t md:border-none border-border/20">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-row md:flex-col bg-transparent md:bg-background md:rounded-3xl md:border border-border/50 md:shadow-sm md:hover:shadow-xl transition-all duration-300 cursor-pointer py-6 px-4 md:p-0 gap-4 md:gap-0"
              >
                {/* Text Content - Left on Mobile, Bottom on Desktop */}
                <div className="flex flex-col flex-1 order-1 md:order-2 md:p-6">
                  <h3 className="font-heading text-lg md:text-xl font-bold leading-tight mb-1">{item.name}</h3>
                  <span className="font-semibold text-base md:text-lg mb-2">₹{item.price}</span>
                  <p className="text-foreground/60 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-0 md:mb-6">
                    {item.description}
                  </p>
                  
                  {/* Desktop Add to Cart Button */}
                  <div className="hidden md:block mt-auto">
                    {(() => {
                      const cartItem = items.find((i) => i.id === item.id);
                      if (cartItem) {
                        return (
                          <div className="w-full flex items-center justify-between bg-primary/10 text-primary font-medium py-2 px-2 rounded-xl transition-all shadow-sm border border-primary/20">
                            <button
                              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, cartItem.quantity - 1); }}
                              className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="w-8 text-center text-base font-bold">{cartItem.quantity}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, cartItem.quantity + 1); }}
                              className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={(e) => { e.stopPropagation(); addItem(item); }}
                          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 text-base rounded-xl transition-all shadow-sm active:scale-95"
                        >
                          <Plus size={18} />
                          Add to Cart
                        </button>
                      );
                    })()}
                  </div>
                </div>

                {/* Image Section - Right on Mobile, Top on Desktop */}
                <div className="relative w-36 h-36 md:w-full md:h-64 shrink-0 order-2 md:order-1 flex flex-col items-center">
                  <div className="w-full h-full rounded-2xl md:rounded-none md:rounded-t-3xl overflow-hidden bg-secondary/50 shadow-sm md:shadow-none relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                  </div>
                  
                  {/* Mobile Add to Cart Button Overlay */}
                  <div className="md:hidden absolute -bottom-3 z-10 w-28 drop-shadow-md">
                    {(() => {
                      const cartItem = items.find((i) => i.id === item.id);
                      if (cartItem) {
                        return (
                          <div className="w-full flex items-center justify-between bg-white text-primary font-bold py-1 px-1 rounded-xl border border-border">
                            <button
                              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, cartItem.quantity - 1); }}
                              className="p-1 hover:bg-secondary rounded-lg"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-sm">{cartItem.quantity}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, cartItem.quantity + 1); }}
                              className="p-1 hover:bg-secondary rounded-lg"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={(e) => { e.stopPropagation(); addItem(item); }}
                          className="w-full flex items-center justify-center bg-white text-primary hover:bg-secondary font-extrabold py-2 text-sm rounded-xl border border-border uppercase tracking-wide"
                        >
                          ADD
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-foreground/50">
              <p className="text-lg">No bowls found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative w-full aspect-[4/3] sm:aspect-square bg-white shrink-0">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-heading text-2xl font-bold leading-tight">{selectedItem.name}</h3>
                  <span className="font-semibold text-xl text-primary shrink-0">₹{selectedItem.price}</span>
                </div>
                
                <div className="inline-flex w-fit px-3 py-1 rounded-full bg-accent/20 text-primary text-xs font-bold uppercase tracking-wider">
                  {selectedItem.category}
                </div>
                
                <p className="text-foreground/80 leading-relaxed text-base">
                  {selectedItem.description}
                </p>

                <div className="mt-4 pt-6 border-t border-border/50 shrink-0">
                  {(() => {
                    const cartItem = items.find((i) => i.id === selectedItem.id);
                    if (cartItem) {
                      return (
                        <div className="w-full flex items-center justify-between bg-primary/10 text-primary font-medium py-2 px-4 rounded-xl transition-all border border-primary/20">
                          <button
                            onClick={() => updateQuantity(selectedItem.id, cartItem.quantity - 1)}
                            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="w-12 text-center text-lg font-bold">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(selectedItem.id, cartItem.quantity + 1)}
                            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        onClick={() => addItem(selectedItem)}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 text-lg rounded-xl transition-all shadow-md active:scale-95"
                      >
                        <Plus size={20} />
                        Add to Cart
                      </button>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
