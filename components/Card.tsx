import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cardHover = {
  rest: {
    scale: 1,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    scale: 1.05,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
};

interface TimelineExampleProps {
  id: string;
  imageSrc: StaticImageData;
  coupleName: string;
  link: string;
}

export default function TimelineExample({ imageSrc, coupleName, link }: TimelineExampleProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate={inView ? "visible" : "hidden"}
      className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer bg-gray-800 border border-gray-700"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Exemplo de linha do tempo: ${coupleName}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-pink-300">
          {coupleName}
        </h3>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button className="w-52 bg-pink-600 text-white hover:bg-pink-500">
            Ver Linha do Tempo
          </Button>
        </a>
      </div>
    </motion.div>
  );
}