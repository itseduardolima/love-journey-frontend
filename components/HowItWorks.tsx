import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import step1Image from "@/public/assests/images/form-nomes.png";
import step2Image from "@/public/assests/images/form-memorias.png";
import step3Image from "@/public/assests/images/pagamento.png";
import step4Image from "@/public/assests/images/qr-code.png";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const steps = [
  {
    title: "1. Preencha seus dados",
    description:
      "Insira seu nome e o nome de sua parceira ou parceiro para personalizar sua jornada de amor única.",
    image: step1Image,
  },
  {
    title: "2. Adicione momentos especiais",
    description:
      "Insira datas, fotos e mensagens para cada momento marcante do seu relacionamento, criando uma narrativa visual emocionante.",
    image: step2Image,
  },
  {
    title: "3. Realize o pagamento",
    description:
      "Faça o pagamento de forma segura via mercado pago, com as opções de Pix ou Cartão de crédito.",
    image: step3Image,
  },
  {
    title: "4. Visualize e compartilhe",
    description:
      "Receba um link exclusivo para sua linha do tempo, pronta para ser compartilhada com quem você ama.",
    image: step4Image,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-pink-300"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Como Funciona
        </motion.h2>
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={step.image}
                alt={step.title}
                className="rounded-lg mb-6 object-cover"
              />
              <h3 className="text-2xl font-semibold mb-2 text-pink-300 text-center">
                {step.title}
              </h3>
              <p className="text-gray-300 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
