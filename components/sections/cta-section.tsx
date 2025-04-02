"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";
import { toast } from "@/hooks/use-toast";
import { LoaderIcon } from "@/public/assests/icons/LoaderIcon";

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

const CTASection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        form,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ""
      );

      toast({
        title: "Mensagem enviada!",
        description: "Agradecemos seu contato. Responderemos em breve.",
        variant: "default",
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-secondary min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-[hsl(var(--primary))]"
            variants={fadeIn}
          >
            Pronto para Eternizar Sua História de Amor?
          </motion.h2>
          <motion.p
            className="text-xl mb-12 text-gray-300 max-w-3xl mx-auto text-center"
            variants={fadeIn}
          >
            Comece gratuitamente hoje ou escolha nosso plano premium por apenas
            R$15,00 para celebrar cada momento especial do seu relacionamento.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <Button
                onClick={() => scrollToSection("plans")}
                className="bg-gradient-primary text-white hover:opacity-90 text-lg px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mb-8"
              >
                Comece Sua Jornada <ArrowRight className="ml-2" />
              </Button>

              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-primary-light mb-4">
                  Por que escolher Love Journey?
                </h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-primary rounded-full p-1 mr-3 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>Interface intuitiva e fácil de usar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary rounded-full p-1 mr-3 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>Compartilhamento fácil via link ou QR code</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary rounded-full p-1 mr-3 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>Design elegante e personalizado</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-secondary p-8 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-primary-light mb-6 text-center">
                Entre em Contato
              </h3>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    className="w-full bg-secondary-dark "
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    className="w-full bg-secondary-dark "
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar?"
                    className="w-full bg-secondary-dark  min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 text-white py-2 rounded-xl transition-all h-12 duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <LoaderIcon />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
