"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import heroImage from "@/public/assests/images/img-hero.jpg";
import { useRouter } from "next/navigation";
import TimelineExample from "@/components/TimeLineExample";
import { mockTimelineData } from "@/mock/data";
import Link from "next/link";

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

const PlanFeature = ({
  included,
  children,
}: {
  included: boolean;
  children: React.ReactNode;
}) => (
  <li className="flex items-center space-x-3">
    {included ? (
      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
    ) : (
      <X className="h-5 w-5 flex-shrink-0 text-red-500" />
    )}
    <span
      className={`text-base ${included ? "text-gray-200" : "text-gray-400"}`}
    >
      {children}
    </span>
  </li>
);

const HomePage = () => {
  const router = useRouter();

  const navigateToFreePlan = () => {
    router.push("/form/free");
  };

  const navigateToPremiumPlan = () => {
    router.push("/form/premium");
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
                relacionamento. Teste gratuitamente hoje!
              </motion.p>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Link href="#plans">
                  <Button className="bg-pink-600 text-white hover:bg-pink-500 text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Comece Agora <ArrowRight className="ml-2" />
                  </Button>
                </Link>
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
                    3. Escolha seu plano
                  </h3>
                  <p className="text-gray-300">
                    Opte pelo plano gratuito ou faça upgrade para o plano
                    premium com mais recursos e duração de um ano.
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
                    Receba um link exclusivo para sua linha do tempo, pronta
                    para ser compartilhada com quem você ama.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Plans Section */}
      <section
        id="plans"
        className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
          <motion.h2
              className="text-3xl font-bold mb-12 text-center text-pink-300"
              variants={fadeIn}
            >
              Escolha seu plano
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div variants={fadeIn} className="h-full">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 relative z-10">
                    <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
                      Plano Gratuito
                      <Heart className="w-6 h-6 text-white" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-4xl font-bold text-white mb-6">R$ 0</p>
                    <ul className="space-y-4 mb-6">
                      <PlanFeature included={true}>
                        Até 3 lembranças
                      </PlanFeature>
                      <PlanFeature included={true}>
                        Válido por 1 dia
                      </PlanFeature>
                      <PlanFeature included={true}>
                        Perfeito para experimentar
                      </PlanFeature>
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-800 p-6 relative z-10">
                    <Button
                      onClick={navigateToFreePlan}
                      className="w-full bg-pink-600 text-white hover:bg-pink-500 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-pink-500/50"
                    >
                      Começar Grátis
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn} className="h-full">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardHeader className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 relative z-10">
                    <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
                      Plano Premium
                      <Sparkles className="w-6 h-6 text-white" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-4xl font-bold text-white mb-2">R$ 15</p>

                    <ul className="space-y-4 mb-6">
                      <PlanFeature included={true}>
                        Até 10 lembranças
                      </PlanFeature>
                      <PlanFeature included={true}>Pagamento único</PlanFeature>
                      <PlanFeature included={true}>
                        Acesso por 1 ano
                      </PlanFeature>
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-800 p-6 relative z-10">
                    <Button
                      onClick={navigateToPremiumPlan}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"
                    >
                      Escolher Premium
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardFooter>
                </Card>
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
                  Qual a diferença entre os planos?
                </h3>
                <p className="text-gray-300">
                  O plano gratuito permite criar até 3 lembranças e é válido por
                  1 dia, ideal para experimentar o serviço. O plano premium, por
                  R$15,00, permite até 10 lembranças e é válido por 1 ano,
                  oferecendo mais espaço para sua história de amor.
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
              Comece gratuitamente hoje ou escolha nosso plano premium por
              apenas R$15,00 para celebrar cada momento especial do seu
              relacionamento por um ano inteiro.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="#plans">
                <Button className="bg-pink-600 text-white hover:bg-pink-500 text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Comece Sua Jornada <ArrowRight className="ml-2" />
                </Button>
              </Link>
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
