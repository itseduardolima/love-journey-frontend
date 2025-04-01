"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

const faqItems = [
  {
    question: "Como é feito o pagamento?",
    answer:
      "O pagamento de R$15,00 é realizado de forma segura via Mercado Pago com as opções de Pix ou Cartão de crédito. Após criar sua linha do tempo, você receberá instruções detalhadas para efetuar o pagamento de maneira rápida e conveniente.",
  },
  {
    question: "Minha linha do tempo é privada?",
    answer:
      "Sim, sua linha do tempo é totalmente privada. Ela só pode ser acessada através do link ou QR code que você compartilha, garantindo que apenas as pessoas escolhidas por você possam ver sua história de amor.",
  },
  {
    question: "Posso editar minha linha do tempo depois de publicá-la?",
    answer:
      "Não, após a publicação, não é possível editar a linha do tempo. Recomendamos revisar cuidadosamente todos os detalhes antes de finalizar e publicar sua história para garantir que ela fique exatamente como você deseja.",
  },
  {
    question: "Qual a diferença entre os planos?",
    answer:
      "O plano gratuito permite criar até 3 lembranças e é válido por 1 dia, ideal para experimentar o serviço. O plano premium, por R$15,00, permite até 10 lembranças e é válido por 1 mês, oferecendo mais espaço para sua história de amor.",
  },
]

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-secondary-dark min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2 className="text-3xl font-bold mb-12 text-center text-[hsl(var(--primary))]" variants={fadeIn}>
            Perguntas Frequentes
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-secondary rounded-xl overflow-hidden border-none"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline hover:bg-primary/10 data-[state=open]:bg-primary data-[state=open]:text-white transition-all">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FAQSection