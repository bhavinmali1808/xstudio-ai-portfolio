import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Linkedin, Youtube, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

// Logo palette: orange-red #E84C0C | teal #1A6B78 | gold #F5B800 | olive #6B8C2A | bg #0A1F23

const footerData = {
  products: [
    "AI Branding",
    "Web Design",
    "Mobile Apps",
  ],
  solutions: [
    "Creative agencies",
    "Marketing agencies",
    "Startups",
    "Enterprise",
  ],
  resources: [
    "Case Studies",
    "AI Insights",
    "Design Resources",
  ],
  templates: [
    "Brand Guidelines",
    "Proposals",
    "Contracts",
  ],
  company: [
    "Help center",
    "Contact us",
    "About Us",
    "Careers",
  ],
};

interface FooterColumnProps {
  title: string;
  items: string[];
  hasDropdown?: boolean;
  className?: string;
}

const FooterColumn = ({ title, items, hasDropdown = false, className = "" }: FooterColumnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:justify-start mb-4 font-bold text-white hover:text-[#F5B800] transition-colors text-base group"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E84C0C] opacity-0 group-hover:opacity-100 transition-opacity" />
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform md:hidden ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <ul className={`space-y-2 ${isOpen ? "block" : "hidden md:block"}`}>
        {items.map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-white/80 text-sm hover:text-[#F5B800] hover:translate-x-1 transition-all duration-200 block flex items-center group/item"
            >
              <span className="w-0 h-0.5 bg-[#E84C0C] group-hover/item:w-2 transition-all duration-200 mr-0 group-hover/item:mr-2" />
              {item}
              {hasDropdown && (
                <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="relative bg-[#0A1F23] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E84C0C] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1A6B78] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#F5B800] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(232, 76, 12, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 107, 120, 0.15) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="section-container py-12 md:py-16 relative z-10">
        {/* Top Section with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 pb-12 border-b border-[#1A6B78]/40"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Branding */}
            <div>
              <img
                src="/logo_final.png"
                alt="HD Graphics Logo"
                className="h-24 w-auto object-contain"
              />
              <p className="text-white/70 text-sm mt-4 max-w-md">
                Transforming businesses with creative designing & web development. Let's build something extraordinary together.
              </p>
            </div>

            {/* Right: Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919313607431"
                className="flex items-center gap-3 px-6 py-3 bg-[#1A6B78]/10 hover:bg-[#1A6B78]/20 border border-[#1A6B78]/40 rounded-xl transition-all group text-white"
              >
                <Phone className="w-5 h-5 text-[#F5B800] group-hover:scale-110 transition-transform" />
                <span className="text-sm">+91 9313607431</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <FooterColumn
            title="Products"
            items={footerData.products}
            hasDropdown={false}
            className="col-span-1"
          />
          <FooterColumn
            title="Solutions"
            items={footerData.solutions}
            hasDropdown={false}
            className="col-span-1"
          />
          <FooterColumn
            title="Resources"
            items={footerData.resources}
            hasDropdown={false}
            className="col-span-1"
          />
          <FooterColumn
            title="Templates"
            items={footerData.templates}
            hasDropdown={true}
            className="col-span-1"
          />
          <FooterColumn
            title="Company"
            items={footerData.company}
            hasDropdown={false}
            className="col-span-1"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1A6B78]/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Copyright and Location */}
            <div className="flex flex-col gap-3">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} HD Graphics. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <MapPin className="w-3 h-3 text-[#E84C0C]" />
                <span>India (Remote)</span>
              </div>
            </div>

            {/* Center: Social Media Icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="#"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1A6B78]/20 to-[#1A6B78]/10 border border-[#1A6B78]/40 hover:border-[#F5B800]/60 flex items-center justify-center text-white transition-all hover:text-[#F5B800]"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="YouTube"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E84C0C]/20 to-[#E84C0C]/10 border border-[#E84C0C]/40 hover:border-[#E84C0C]/60 flex items-center justify-center text-white transition-all hover:text-[#E84C0C]"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Twitter/X"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6B8C2A]/20 to-[#6B8C2A]/10 border border-[#6B8C2A]/40 hover:border-[#6B8C2A]/60 flex items-center justify-center text-white transition-all hover:text-[#6B8C2A]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>

            {/* Right: Back to Top */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-[#E84C0C]/20 to-[#F5B800]/10 border border-[#E84C0C]/40 hover:border-[#F5B800]/60 text-sm transition-all hover:text-[#F5B800]"
            >
              <Sparkles className="w-4 h-4 text-[#F5B800]" />
              <span>Back to Top</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};
