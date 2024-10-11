import { motion } from "framer-motion";

export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-red-500"
      >
        Erro ao carregar a história. Por favor, tente novamente.
      </motion.p>
    </div>
  );
};
