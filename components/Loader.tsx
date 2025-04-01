import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Loader = () => {
  return (
    <div className="min-h-screen bg-secondary-dark text-gray-100 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Heart className="w-16 h-16 text-primary" />
      </motion.div>
    </div>
  );
};
