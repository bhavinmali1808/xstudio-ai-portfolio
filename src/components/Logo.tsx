import { motion } from "framer-motion";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "light" | "dark";
}

export const Logo = ({ showTagline = false, size = "md", className = "", variant = "light" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-24",
  };

  const taglineSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const logoSource = variant === "dark" ? "/logo_final.png" : "/logo_final.png";
  const taglineColor = variant === "dark" ? "text-white" : "text-[#164B4D]";

  return (
    <motion.div
      className={`flex flex-col items-start ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={logoSource}
        alt="HD Graphics Logo"
        className={`${sizeClasses[size]} object-contain`}
        style={{ mixBlendMode: "multiply" }}
      />

      {/* MAKE IT MATTER Tagline */}
      {showTagline && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${taglineSizes[size]} font-semibold ${taglineColor} mt-1 tracking-wider`}
        >
          MAKE IT MATTER
        </motion.div>
      )}
    </motion.div>
  );
};

