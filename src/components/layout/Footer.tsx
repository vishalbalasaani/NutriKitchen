import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, MessageCircle } from "lucide-react";



export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <span className="font-heading text-3xl font-bold tracking-tight">
              {siteConfig.name}
            </span>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#home" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Home</Link>
              <Link href="#menu" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Menu</Link>
              <Link href="#subscription" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Subscriptions</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href={siteConfig.social.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-primary-foreground/80 hover:text-white transition-colors">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-white transition-colors">
                <Phone size={18} className="shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-white transition-colors">
                <MessageCircle size={18} className="shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold">Connect & Order</h3>
            <p className="text-sm text-primary-foreground/80 mb-2">
              {siteConfig.restaurantInfo.openingHours}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-background p-2 rounded-full hover:scale-110 transition-all shadow-sm flex items-center justify-center w-[38px] h-[38px]" aria-label="WhatsApp">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-full h-full object-contain" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-background p-2 rounded-full hover:scale-110 transition-all shadow-sm flex items-center justify-center w-[38px] h-[38px]" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
              </a>
              <a href={siteConfig.social.swiggy} target="_blank" rel="noopener noreferrer" className="bg-background p-2 rounded-full hover:scale-110 transition-all shadow-sm flex items-center justify-center w-[38px] h-[38px]" aria-label="Order on Swiggy">
                <img src="/icons/swiggy.svg" alt="Swiggy" className="w-full h-full object-contain" />
              </a>
              <a href={siteConfig.social.zomato} target="_blank" rel="noopener noreferrer" className="bg-background p-2 rounded-full hover:scale-110 transition-all shadow-sm flex items-center justify-center w-[38px] h-[38px]" aria-label="Order on Zomato">
                <img src="/icons/zomato.svg" alt="Zomato" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  );
}
