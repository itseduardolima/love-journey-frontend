import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Heart className="w-16 h-16 text-pink-500" />
      </motion.div>
      <p className="ml-4 text-2xl font-semibold text-pink-300">
        Carregando...
      </p>
    </div>
  );
};
