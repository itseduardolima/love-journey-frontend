"use client"

import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

interface TimelineExampleProps {
  id: string
  imageSrc: StaticImageData
  coupleName: string
  link: string
}

export default function TimelineExample({ imageSrc, coupleName, link }: TimelineExampleProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate={inView ? "visible" : "hidden"}
      className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer bg-secondary border border-gray-500 hover:shadow-primary/20"
    >
      <div
        className="relative h-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={imageSrc}
          alt={`Exemplo de linha do tempo: ${coupleName}`}
          className="transition-transform duration-300 transform hover:scale-110"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Button className="w-52">
                  Ver Linha do Tempo
                </Button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
     
    </motion.div>
  )
}