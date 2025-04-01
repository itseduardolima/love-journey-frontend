"use client"

import type React from "react"
import { Heart, Camera } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

interface AnimatedSectionProps {
  children: React.ReactNode
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerChildren}>
      {children}
    </motion.div>
  )
}

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2 className="text-3xl font-bold mb-12 text-center text-[hsl(var(--primary))]" variants={fadeIn}>
            O que é Love Journey?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div className="flex flex-col items-center text-center" variants={fadeIn}>
              <Heart className="w-20 h-20 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Linha do Tempo Personalizada</h3>
              <p className="text-gray-300">
                Crie uma narrativa visual única do seu relacionamento, destacando momentos especiais e marcos
                importantes em uma bela linha do tempo interativa.
              </p>
            </motion.div>
            <motion.div className="flex flex-col items-center text-center" variants={fadeIn}>
              <Camera className="w-20 h-20 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Memórias em Destaque</h3>
              <p className="text-gray-300">
                Adicione fotos, datas e descrições para cada momento especial, criando um álbum digital interativo que
                conta a história do seu amor.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default AboutSection