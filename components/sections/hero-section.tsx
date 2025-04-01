"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import heroImage from "@/public/assests/images/img-hero.jpg"

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.section
      className="py-20 bg-gradient-secondary min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              Eternize sua História de Amor
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              Crie uma linha do tempo única e interativa para celebrar seu relacionamento. Teste gratuitamente hoje!
            </motion.p>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Button
                onClick={() => scrollToSection("plans")}
                
              >
                Comece Agora <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={heroImage}
                alt="Casal feliz"
                className="rounded-2xl"
                width={600}
                height={400}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default HeroSection

