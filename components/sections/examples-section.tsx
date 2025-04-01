"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import TimelineExample from "@/components/TimeLineExample"
import { mockTimelineData } from "@/mock/data"

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

const ExamplesSection = () => {
  return (
    <section id="examples" className="py-20 bg-secondary min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2 className="text-3xl font-bold mb-12 text-center text-[hsl(var(--primary))]" variants={fadeIn}>
            Exemplos de Linhas do Tempo
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockTimelineData.map((timeline) => (
              <TimelineExample
                key={timeline.id}
                id={timeline.id}
                imageSrc={timeline.imageSrc}
                coupleName={timeline.coupleName}
                link={timeline.link}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default ExamplesSection