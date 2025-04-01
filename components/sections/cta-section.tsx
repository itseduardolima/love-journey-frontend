"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
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

const CTASection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-24 text-center bg-gradient-secondary min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-[hsl(var(--primary))]" variants={fadeIn}>
            Pronto para Eternizar Sua História de Amor?
          </motion.h2>
          <motion.p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto" variants={fadeIn}>
            Comece gratuitamente hoje ou escolha nosso plano premium por apenas R$15,00 para celebrar cada momento
            especial do seu relacionamento por um ano inteiro.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button
              onClick={() => scrollToSection("plans")}
              className="bg-gradient-primary text-white hover:opacity-90 text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Comece Sua Jornada <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default CTASection