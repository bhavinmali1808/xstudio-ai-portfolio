import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Phone, MapPin, MessageCircle, Check, X, ChevronDown, Mail } from "lucide-react";

const serviceOptions = [
  "AI Branding",
  "Web Design",
  "Mobile Apps",
  "Marketing Strategy",
  "IT Solutions",
  "Graphic Design",
  "Content Creation",
  "SEO Services",
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: "",
    selectedServices: [] as string[],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const servicesText = formData.selectedServices.length > 0
      ? `\n\nServices I'm interested in:\n${formData.selectedServices.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
      : '';

    const message = `Hello! I'm ${formData.name}${formData.company ? ` from ${formData.company}` : ''}.\n\n${formData.message}${servicesText}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919998739029?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset form
    setFormData({ name: "", company: "", message: "", selectedServices: [] });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-[#E3E7ED]" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E3E7ED] via-white/50 to-[#E3E7ED]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6B50A2]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6B50A2]/5 rounded-full blur-[150px]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#6B50A2] text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
          <h2 className="section-title mt-4 mb-6 text-[#0F122E]">
            Let's Build Your Brand{" "}
            <span className="text-[#6B50A2]">with Us</span>
          </h2>
          <p className="section-subtitle mx-auto text-[#645876]">
            Ready to transform your business? Get a free consultation and discover
            how our AI-powered solutions can accelerate your growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-10 h-full">
              <h3 className="text-2xl font-bold font-display mb-6 text-[#0F122E]">
                Start the Conversation
              </h3>
              <p className="text-[#645876] mb-8">
                Whether you have a project in mind or just want to explore possibilities,
                we're here to help. Reach out and let's discuss how we can work together.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                <a
                  href="mailto:office@HD Graphics.blog"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#6B50A2]/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6B50A2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-[#6B50A2]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#645876]">Email Us</div>
                    <div className="font-medium text-[#0F122E] group-hover:text-[#6B50A2] transition-colors">office@HD Graphics.blog</div>
                  </div>
                </a>

                <a
                  href="tel:+919998739029"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#6B50A2]/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6B50A2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-[#6B50A2]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#645876]">Call Us</div>
                    <div className="font-medium text-[#0F122E] group-hover:text-[#6B50A2] transition-colors">+91 9998739029</div>
                  </div>
                </a>

                <a
                  href="tel:+917043633667"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#6B50A2]/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6B50A2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-[#6B50A2]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#645876]">Call Us</div>
                    <div className="font-medium text-[#0F122E] group-hover:text-[#6B50A2] transition-colors">+91 7043633667</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-[#6B50A2]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#6B50A2]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#645876]">Location</div>
                    <div className="font-medium text-[#0F122E]">Bangalore (Remote)</div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="mt-8 pt-8 border-t border-[#645876]/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-[#645876]">
                    Usually responds within 2 hours
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - WhatsApp Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleWhatsAppSubmit} className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-bold font-display mb-6 text-[#0F122E]">
                Get a Quote via WhatsApp
              </h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#0F122E]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#645876]/20 focus:border-[#6B50A2] focus:ring-1 focus:ring-[#6B50A2] outline-none transition-all text-[#0F122E]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-[#0F122E]">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#645876]/20 focus:border-[#6B50A2] focus:ring-1 focus:ring-[#6B50A2] outline-none transition-all text-[#0F122E]"
                    placeholder="Your Company"
                  />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label className="block text-sm font-medium mb-2 text-[#0F122E]">
                    Select Services (Multiple Selection)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#645876]/20 focus:border-[#6B50A2] focus:ring-1 focus:ring-[#6B50A2] outline-none transition-all text-left flex items-center justify-between text-[#0F122E]"
                  >
                    <span className={formData.selectedServices.length > 0 ? "text-[#0F122E]" : "text-[#645876]"}>
                      {formData.selectedServices.length > 0
                        ? `${formData.selectedServices.length} service(s) selected`
                        : "Select services you need..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#645876] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-[#645876]/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2">
                        {serviceOptions.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#6B50A2]/5 transition-colors flex items-center justify-between ${formData.selectedServices.includes(service)
                                ? "bg-[#6B50A2]/10 text-[#6B50A2]"
                                : "text-[#0F122E]"
                              }`}
                          >
                            <span>{service}</span>
                            {formData.selectedServices.includes(service) && (
                              <Check className="w-4 h-4 text-[#6B50A2]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Services Tags */}
                  {formData.selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.selectedServices.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#6B50A2]/10 text-[#6B50A2] rounded-lg text-sm"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => toggleService(service)}
                            className="hover:text-[#6B50A2]/70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#0F122E]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#645876]/20 focus:border-[#6B50A2] focus:ring-1 focus:ring-[#6B50A2] outline-none transition-all resize-none text-[#0F122E]"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#6B50A2] hover:bg-[#5a4088] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#645876] text-center mt-4">
                By submitting, you'll be redirected to WhatsApp to send your message. We'll never share your data.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
