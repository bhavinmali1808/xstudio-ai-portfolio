import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, Rocket } from "lucide-react";
import { Logo } from "@/components/Logo";

const visionCards = [
  {
    icon: Lightbulb,
    title: "Vision",
    description: "To become the leading AI-first creative agency, transforming how brands connect with their audiences through intelligent technology.",
  },
  {
    icon: Target,
    title: "Mission",
    description: "Empowering businesses with cutting-edge AI solutions, creative excellence, and data-driven strategies that deliver measurable growth.",
  },
  {
    icon: Rocket,
    title: "Values",
    description: "Innovation, transparency, and client success drive everything we do. We believe in pushing boundaries while keeping your goals at the center.",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">About Us</span>
          <h2 className="section-title mt-4 mb-6">
            Where <span className="gradient-text">Creativity</span> Meets{" "}
            <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="section-subtitle mx-auto">
            HD Graphics is a next-generation creative agency that fuses artistic vision with 
            artificial intelligence to craft brands that don't just stand out—they dominate.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold font-display mb-6">
                The HD Graphics Story
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In a world where technology evolves at lightning speed, we saw an opportunity 
                  to bridge the gap between creativity and artificial intelligence.
                </p>
                <p>
                  HD Graphics was born from a simple belief: <span className="text-foreground font-medium">
                  the future of branding lies at the intersection of human creativity and machine intelligence.</span>
                </p>
                <p>
                  Today, we help startups, enterprises, and visionary founders build brands 
                  that resonate, marketing campaigns that convert, and digital products that scale.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text-primary">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text-primary">98%</div>
                  <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text-primary">3x</div>
                  <div className="text-sm text-muted-foreground mt-1">Avg. Growth Rate</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square relative">
              {/* Abstract AI Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md mx-auto">
                  {/* Outer Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border-2 border-dashed border-primary/30 rounded-full"
                  />
                  {/* Middle Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-16 border border-accent/40 rounded-full"
                  />
                  {/* Inner Glow */}
                  <div className="absolute inset-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Logo size="lg" />
                  </div>
                  {/* Floating Nodes */}
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div
                      key={deg}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute w-3 h-3 bg-primary rounded-full"
                      style={{
                        top: `${50 + 38 * Math.sin((deg * Math.PI) / 180)}%`,
                        left: `${50 + 38 * Math.cos((deg * Math.PI) / 180)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {visionCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="glass-card-hover p-8"
            >
              <div className="service-icon mb-6">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
