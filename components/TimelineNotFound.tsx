import { motion } from "framer-motion";

export const TimelineNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-yellow-500"
      >
        Linha do tempo não encontrada.
      </motion.p>
    </div>
  );
};
