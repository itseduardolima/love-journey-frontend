"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Camera,
  Linkedin,
  Users,
  Clock,
  CreditCard,
  QrCode,
  Github,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import heroImage from "@/public/assests/images/img-hero.jpg";
import { useRouter } from "next/navigation";
import TimelineExample from "@/components/Card";
import { mockTimelineData } from "@/mock/data";

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

const HomePage = () => {
  const router = useRouter();

  const navigateToForm = () => {
    router.push("/form");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
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
                Crie uma linha do tempo única e interativa para celebrar seu
                relacionamento por apenas R$15,00.
              </motion.p>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Button
                  onClick={navigateToForm}
                  className="bg-pink-600 text-white hover:bg-pink-500 text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
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

      {/* What is Love Journey */}
      <section className="py-20 px-4 bg-gray-800">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-pink-300"
              variants={fadeIn}
            >
              O que é Love Journey?
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <Heart className="w-20 h-20 text-pink-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Linha do Tempo Personalizada
                </h3>
                <p className="text-gray-300">
                  Crie uma narrativa visual única do seu relacionamento,
                  destacando momentos especiais e marcos importantes em uma bela
                  linha do tempo interativa.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <Camera className="w-20 h-20 text-pink-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Memórias em Destaque
                </h3>
                <p className="text-gray-300">
                  Adicione fotos, datas e descrições para cada momento especial,
                  criando um álbum digital interativo que conta a história do
                  seu amor.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-pink-300"
              variants={fadeIn}
            >
              Como Funciona
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div className="flex items-start" variants={fadeIn}>
                <div className="bg-pink-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    1. Preencha seus dados
                  </h3>
                  <p className="text-gray-300">
                    Insira seu nome e o nome de sua parceira ou parceiro para
                    personalizar sua jornada de amor única.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-start" variants={fadeIn}>
                <div className="bg-pink-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    2. Adicione momentos especiais
                  </h3>
                  <p className="text-gray-300">
                    Insira datas, fotos e mensagens para cada momento marcante
                    do seu relacionamento, criando uma narrativa visual
                    emocionante.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-start" variants={fadeIn}>
                <div className="bg-pink-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <CreditCard className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    3. Faça o pagamento único
                  </h3>
                  <p className="text-gray-300">
                    Realize o pagamento de R$15,00 via Pix de forma segura para
                    finalizar e publicar sua linha do tempo permanentemente.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-start" variants={fadeIn}>
                <div className="bg-pink-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    4. Visualize e compartilhe
                  </h3>
                  <p className="text-gray-300">
                    Após o pagamento, receba um QR code exclusivo com o link
                    para sua linha do tempo, pronta para ser compartilhada com
                    quem você ama.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Example Timelines */}
      <section className="py-20 px-4 bg-gray-800">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center text-pink-300"
              variants={fadeIn}
            >
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
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-4xl font-bold mb-12 text-center text-pink-300"
              variants={fadeIn}
            >
              Perguntas Frequentes
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeIn}
                className="bg-gray-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-300">
                  Como é feito o pagamento?
                </h3>
                <p className="text-gray-300">
                  O pagamento de R$15,00 é realizado de forma segura via Pix.
                  Após criar sua linha do tempo, você receberá instruções
                  detalhadas para efetuar o pagamento de maneira rápida e
                  conveniente.
                </p>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="bg-gray-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-300">
                  Minha linha do tempo é privada?
                </h3>
                <p className="text-gray-300">
                  Sim, sua linha do tempo é totalmente privada. Ela só pode ser
                  acessada através do link ou QR code que você compartilha,
                  garantindo que apenas as pessoas escolhidas por você possam
                  ver sua história de amor.
                </p>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="bg-gray-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-300">
                  Posso editar minha linha do tempo depois de publicá-la?
                </h3>
                <p className="text-gray-300">
                  Não, após a publicação, não é possível editar a linha do
                  tempo. Recomendamos revisar cuidadosamente todos os detalhes
                  antes de finalizar e publicar sua história para garantir que
                  ela fique exatamente como você deseja.
                </p>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="bg-gray-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-300">
                  Por quanto tempo minha linha do tempo ficará disponível?
                </h3>
                <p className="text-gray-300">
                  Sua linha do tempo ficará disponível permanentemente após o
                  pagamento único. Não há custos adicionais ou assinaturas
                  recorrentes. Sua história de amor estará sempre acessível para
                  você e seus entes queridos revisitarem.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-pink-300"
              variants={fadeIn}
            >
              Pronto para Eternizar Sua História de Amor?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-gray-300" variants={fadeIn}>
              Crie sua linha do tempo personalizada hoje por apenas R$15,00 e
              comece a celebrar cada momento especial do seu relacionamento.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button
                onClick={navigateToForm}
                className="bg-pink-600 text-white hover:bg-pink-500 text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Comece Sua Jornada <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-gray-400 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Criado com ❤️ por Eduardo Lima
          </motion.p>
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="https://www.linkedin.com/in/eduardolima07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors duration-300 flex items-center"
            >
              <Linkedin className="w-6 h-6 mr-2" />
              LinkedIn
            </a>
            <a
              href="https://github.com/itseduardolima"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors duration-300 flex items-center"
            >
              <Github className="w-6 h-6 mr-2" />
              GitHub
            </a>
            <a
              href="https://eduardolima.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors duration-300 flex items-center"
            >
              <Globe className="w-6 h-6 mr-2" />
              Portfólio
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
