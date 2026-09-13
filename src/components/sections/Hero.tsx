import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Try progressive rates — Chrome minimum is 0.0625
    const tryRates = [0.1, 0.15, 0.25];
    for (const rate of tryRates) {
      try {
        video.playbackRate = rate;
        break;
      } catch {
        // browser rejected, try next
      }
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1F23]">

      {/* Full-screen Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/15338782_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Black cinematic overlay — sits only over video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.32)", zIndex: 1 }}
      />

      {/* Content Container */}
      <div className="relative z-20 section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">

          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-tight text-white drop-shadow-lg"
            >
              BRING ALL YOUR<br />
              IDEAS TO LIFE WITH OUR<br />
              <span className="text-[#E8A51A]">CREATIVE MAGIC</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Our creative team gets to work, crafting a custom design that's not only beautiful but functional. We develop your landing page using the latest technologies and best practices.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold border transition-all duration-300 flex items-center gap-2 group"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.35)",
                  color: "#fff",
                }}
              >
                Get started
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <button
                className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
                style={{ background: "#C9572B" }}
              >
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Abstract Shape */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Abstract 3D Shape */}
            <div className="abstract-3d-container absolute inset-0">
              <div className="abstract-3d-shape" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#164B4D]/30 via-[#C9572B]/20 to-[#E8A51A]/20 rounded-full blur-3xl" />
            </div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-20 right-0 p-6 max-w-xs rounded-2xl border"
              style={{
                background: "rgba(10, 31, 35, 0.70)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(232, 165, 26, 0.35)",
              }}
            >
              <h3 className="text-xl font-bold text-[#E8A51A] mb-3">Qualified team</h3>
              <p className="text-sm text-white/75 leading-relaxed mb-4">
                We delve deep into your business target audience, and competitive landscape. Armed with this insight, we craft tailored strategies.
              </p>
              <button className="w-10 h-10 rounded-full bg-[#C9572B] flex items-center justify-center text-white hover:bg-[#de6235] transition-all duration-300 ml-auto">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Geometric accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-0 right-0 w-32 h-32 opacity-40"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="20" cy="50" r="15" fill="none" stroke="#F5F0E6" strokeWidth="2" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#E8A51A" strokeWidth="2" />
                <circle cx="80" cy="50" r="15" fill="none" stroke="#C9572B" strokeWidth="2" />
                <line x1="35" y1="50" x2="65" y2="50" stroke="#F5F0E6" strokeWidth="2" />
                <line x1="65" y1="50" x2="95" y2="50" stroke="#F5F0E6" strokeWidth="2" />
                <polygon points="95,50 85,45 85,55" fill="#E8A51A" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
