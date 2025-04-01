"use client"
import { Linkedin, Github, Globe } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="bg-secondary-dark py-16 px-4">
      <div className="container max-w-6xl mx-auto text-center">
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
            className="text-primary hover:text-primary-light transition-colors duration-300 flex items-center"
          >
            <Linkedin className="w-6 h-6 mr-2" />
            LinkedIn
          </a>
          <a
            href="https://github.com/itseduardolima"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light transition-colors duration-300 flex items-center"
          >
            <Github className="w-6 h-6 mr-2" />
            GitHub
          </a>
          <a
            href="https://eduardolima.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light transition-colors duration-300 flex items-center"
          >
            <Globe className="w-6 h-6 mr-2" />
            Portfólio
          </a>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

