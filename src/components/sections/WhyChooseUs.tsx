import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Zap, Users, Shield, Target, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "AI-First Mindset",
    description: "Every solution we build leverages AI to maximize efficiency and deliver smarter results.",
  },
  {
    icon: Users,
    title: "Creative + Tech in One Place",
    description: "No more juggling agencies. We combine artistic vision with technical excellence under one roof.",
  },
  {
    icon: Shield,
    title: "Transparent Process",
    description: "Clear communication, detailed reporting, and full visibility into every project milestone.",
  },
  {
    icon: Target,
    title: "Growth-Focused Execution",
    description: "We don't just deliver projects—we engineer growth with measurable, data-driven outcomes.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Your success is our priority. Get personalized support and strategic guidance every step of the way.",
  },
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why HD Graphics</span>
            <h2 className="section-title mt-4 mb-6">
              The Partner You Need for{" "}
              <span className="gradient-text">Exponential Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're not just another agency. We're your strategic partner in building 
              a brand that dominates the market with the power of AI and creativity.
            </p>

            {/* Reason List */}
            <div className="space-y-5">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="service-icon flex-shrink-0">
                    <reason.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold font-display mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12">
              {/* Trust Metrics */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <span className="text-4xl md:text-5xl font-bold font-display gradient-text">
                    100%
                  </span>
                </div>
                <p className="text-lg font-medium">Client Retention Rate</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Every client who works with us comes back for more
                </p>
              </div>

              {/* Client Avatars */}
              <div className="flex justify-center mb-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    +50
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <div className="text-2xl font-bold gradient-text-primary">4.9/5</div>
                  <div className="text-xs text-muted-foreground mt-1">Average Rating</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <div className="text-2xl font-bold gradient-text-primary">2 Weeks</div>
                  <div className="text-xs text-muted-foreground mt-1">Avg. Turnaround</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
