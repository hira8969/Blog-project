import { motion } from "framer-motion";

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
