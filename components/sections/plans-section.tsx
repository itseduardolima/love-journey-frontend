"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

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

interface PlanFeatureProps {
  children: React.ReactNode
  variant?: "free" | "premium" | "enterprise"
}

const PlanFeature = ({ children, variant = "free" }: PlanFeatureProps) => {
  const iconColor = {
    free: "text-primary",
    premium: "text-primary-light",
    enterprise: "text-primary",
  }[variant]

  return (
    <li className="flex items-center space-x-3 mb-4">
      <div className={cn("rounded-full p-1", iconColor)}>
        <Check className="h-4 w-4 text-white" />
      </div>
      <span className="text-gray-300 text-sm">{children}</span>
    </li>
  )
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  features: string[]
  buttonText: string
  onClick: () => void
  popular?: boolean
  variant: "free" | "premium" | "enterprise"
}

const PricingCard = ({
  title,
  description,
  price,
  features,
  buttonText,
  onClick,
  popular = false,
  variant,
}: PricingCardProps) => {
  const cardStyles = {
    free: "bg-secondary/80 backdrop-blur-sm border-gray-500",
    premium: "bg-secondary/80 backdrop-blur-sm border-primary/30",
    enterprise: "bg-secondary/80 backdrop-blur-sm border-gray-500",
  }[variant]

  const buttonStyles = {
    free: "bg-secondary-700 hover:bg-secondary-700/80 text-white shadow-none border border-gray-500",
    premium: "bg-gradient-primary hover:opacity-90 text-white",
    enterprise: "bg-secondary-700 hover:bg-secondary-700/80 text-white shadow-none border border-gray-500",
  }[variant]

  return (
    <motion.div
      variants={fadeIn}
      className={cn(
        "rounded-2xl border p-6 h-full flex flex-col transition-all duration-300",
        cardStyles,
        popular ? "ring-2 ring-primary-light" : "",
      )}
    >
      {popular && (
        <div className="absolute -top-3 right-6">
          <span className="bg-primary-light text-white text-xs font-medium px-3 py-1 rounded-full">Popular</span>
        </div>
      )}

      <div className="mb-5">
        <h3 className={cn("text-xl font-bold mb-2", variant === "premium" ? "text-primary-light" : "text-primary")}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div className="mb-6 flex items-baseline">
        <span className="text-gray-400 text-lg">R$</span>
        <span className="text-4xl font-bold text-white">{price}</span>
      </div>

      <Button onClick={onClick} className={cn("w-full mb-6 rounded-full", buttonStyles)}>
        {buttonText}
      </Button>

      <ul className="mt-auto">
        {features.map((feature, index) => (
          <PlanFeature key={index} variant={variant}>
            {feature}
          </PlanFeature>
        ))}
      </ul>
    </motion.div>
  )
}

const PlansSection = () => {
  const router = useRouter()

  const navigateToFreePlan = () => {
    router.push("/form/free")
  }

  const navigateToPremiumPlan = () => {
    router.push("/form/premium")
  }

  return (
    <section id="plans" className="py-20 bg-gradient-secondary min-h-screen flex items-center">
      <div className="container max-w-6xl mx-auto">
        <AnimatedSection>
          <motion.h2 className="text-3xl font-bold mb-12 text-center text-[hsl(var(--primary))]" variants={fadeIn}>
            Escolha seu plano
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              title="Gratuito"
              description="Perfeito para experimentar e conhecer a plataforma."
              price="0"
              features={["Até 3 lembranças", "Válido por 1 dia", "Perfeito para experimentar"]}
              buttonText="Começar Grátis"
              onClick={navigateToFreePlan}
              variant="free"
            />

            <PricingCard
              title="Premium"
              description="Ideal para casais que desejam eternizar sua história de amor."
              price="15"
              features={["Até 10 lembranças", "Pagamento único", "Acesso por 1 mês", "Suporte prioritário"]}
              buttonText="Escolher Premium"
              onClick={navigateToPremiumPlan}
              popular={true}
              variant="premium"
            />

            <PricingCard
              title="Personalizado"
              description="Para quem deseja uma experiência totalmente personalizada."
              price="30"
              features={["Lembranças ilimitadas", "Acesso vitalício", "Design personalizado", "Suporte dedicado"]}
              buttonText="Entrar em contato"
              onClick={() => window.open("mailto:eduardolima2417@gmail.com")}
              variant="enterprise"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default PlansSection