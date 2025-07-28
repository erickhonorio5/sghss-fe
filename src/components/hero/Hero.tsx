'use client'
import { useState } from "react"
import { motion } from "framer-motion"

const Hero = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
      <section className="relative py-16 md:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 bg-background dark:bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8"
          >
            {/* Título Principal */}
            <div className="space-y-4 md:space-y-6">
              <motion.p
                  className="text-base sm:text-lg md:text-xl font-medium leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
              >
                <span className="text-gray-500 dark:text-gray-300">
                  Revolução na Gestão Hospitalar!
                </span>
              </motion.p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 dark:text-white">
                <span className="block">Organize com</span>
                <div className="relative inline-block mt-2 md:mt-4 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                  <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-1 sm:py-2 md:py-4 from-primary to-primary-dark [text-shadow:0_0_rgba(0,0,0,0.1)]">
                    <span>
                      SGHSS Clínicas e Hospitais</span>
                  </div>
                  <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary to-blue-900 py-1 sm:py-2 md:py-4">
                    <span>SGHSS Clínicas e Hospitais</span>
                  </div>
                </div>
              </h1>
            </div>

            {/* Descrição */}
            <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-2 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
              Tudo que você precisa para transformar sua gestão hospitalar com tecnologia de ponta.
            </motion.p>

            {/* Formulário Minimalista */}
            <motion.div
                className="mt-6 md:mt-10 max-w-md mx-auto px-2 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Seu e-mail profissional"
                    className="flex-1 rounded-lg border border-stroke px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    required
                />
                <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 sm:px-6 sm:py-3 text-white font-medium hover:bg-opacity-90 transition-opacity"
                >
                  Começar agora
                </button>
              </form>
              <p className="mt-2 md:mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Teste grátis por 14 dias - Sem compromisso
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

export default Hero