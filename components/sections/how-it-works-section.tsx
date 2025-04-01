"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  UserRound,
  CalendarHeart,
  CreditCard,
  Share2,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      {children}
    </motion.div>
  );
};

const steps = [
  {
    icon: <UserRound className="w-10 h-10" />,
    title: "1. Preencha seus dados",
    description:
      "Insira seu nome e o nome de sua parceira ou parceiro para personalizar sua jornada de amor única.",
  },
  {
    icon: <CalendarHeart className="w-10 h-10" />,
    title: "2. Adicione momentos especiais",
    description:
      "Insira datas, fotos e mensagens para cada momento marcante do seu relacionamento, criando uma narrativa visual emocionante.",
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: "3. Realize o pagamento",
    description:
      "Faça o pagamento de forma segura via mercado pago, com as opções de Pix ou Cartão de crédito.",
  },
  {
    icon: <Share2 className="w-10 h-10" />,
    title: "4. Visualize e compartilhe",
    description:
      "Receba um link exclusivo para sua linha do tempo, pronta para ser compartilhada com quem você ama.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-secondary-dark min-h-screen flex items-center"
    >
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-[hsl(var(--primary))]"
            variants={fadeIn}
          >
            Como Funciona
          </motion.h2>

          <div className="relative">
            {/* Linha conectora */}
            <div className="absolute left-[190px] top-10 bottom-10 w-1 bg-gradient-primary rounded-full hidden md:block"></div>

            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-10 max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <motion.div key={index} variants={fadeIn} className="relative">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-primary lg:flex items-center justify-center shadow-lg z-10 hidden ">
                      <div className="text-white">{step.icon}</div>
                    </div>

                    <div className="flex-1 mx-auto bg-secondary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-xl font-semibold mb-3 text-center text-primary-light">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 max-w-lg text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
