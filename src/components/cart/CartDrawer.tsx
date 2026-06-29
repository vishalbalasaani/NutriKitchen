"use client";

import * as React from "react";
import { useCartStore } from "@/store/cartStore";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

const KITCHEN_COORDS = { lat: 18.428593, lon: 79.138098 }; // Exact Restaurant Location

export function CartDrawer() {
  const { isDrawerOpen, setDrawerOpen, items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const grandTotal = getTotalPrice();

  const handlePlaceOrder = () => {
    // Validate form
    let hasError = false;
    const errors = { name: "", phone: "", address: "" };
    
    if (!formData.name.trim()) { errors.name = "Full Name is required"; hasError = true; }
    if (!formData.phone.trim()) { errors.phone = "Mobile Number is required"; hasError = true; }
    if (!formData.address.trim()) { errors.address = "Complete Address is required"; hasError = true; }
    
    setFormErrors(errors);
    if (hasError) return;

    // Generate a unique 4-digit order ID
    const orderId = `NK-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderItemsText = items
      .map((item) => `▪ ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`)
      .join("%0A");

    // Beautifully structured WhatsApp Message using asterisks for bolding
    const message = `*NEW ORDER*%0A%0A*Order ID:* ${orderId}%0A%0A*CUSTOMER DETAILS*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}${formData.notes ? `%0ANotes: ${formData.notes}` : ''}%0A%0A*ORDER ITEMS*%0A${orderItemsText}%0A%0A*BILLING*%0AItem Total: ₹${getTotalPrice()}%0ADelivery Fee: Calculated based on delivery distance%0A%0AThank you for ordering with ${siteConfig.name}!`;

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Prevent background scroll when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-2xl font-semibold">Your Order</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBagIcon />
                  <p className="mt-4 text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some delicious bowls to get started.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Customer Details Form */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading text-lg font-semibold">Delivery Details</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Input
                          name="name"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.name}</p>}
                      </div>
                      
                      <div>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Mobile Number *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <Input
                          name="address"
                          placeholder="Complete Address *"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={formErrors.address ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {formErrors.address && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.address}</p>}
                      </div>
                      
                      <textarea
                        name="notes"
                        placeholder="Any special instructions? (Optional)"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="flex w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[80px] resize-none"
                      />
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-semibold">Order Items</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-background">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <span className="font-semibold text-sm">₹{item.price * item.quantity}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-white border border-border rounded-full px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-black/5 rounded-full"
                              >
                                {item.quantity === 1 ? <Trash2 size={14} className="text-primary" /> : <Minus size={14} />}
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-black/5 rounded-full"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bill Details */}
                  <div className="bg-primary/5 rounded-2xl p-5 space-y-3 border border-primary/10">
                    <h3 className="font-heading text-lg font-bold mb-1 text-primary">Bill Details</h3>
                    <div className="flex justify-between text-sm text-foreground/80">
                      <span>Item Total</span>
                      <span className="font-medium text-foreground">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-foreground/80">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-primary">Calculated based on delivery distance</span>
                    </div>
                    <div className="border-t border-primary/20 pt-3 mt-3 flex justify-between items-center">
                      <span className="font-bold text-base">To Pay</span>
                      <span className="font-bold text-xl text-primary">₹{grandTotal}</span>
                    </div>
                  </div>


                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">₹{grandTotal}</span>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">Total (Plus Delivery)</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg h-14"
                  onClick={handlePlaceOrder}
                >
                  Place Order on WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
