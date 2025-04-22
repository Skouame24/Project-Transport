"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Shield, FileCheck2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simuler un délai de connexion
    setTimeout(() => {
      setIsLoading(false)
      // Rediriger vers le tableau de bord (à implémenter)
    }, 1500)
  }

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/10 to-blue-900/20 z-0" />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md z-10"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-[#bc872b] to-[#a77725] rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">NSIA Assurance</h1>
          <p className="text-blue-200 mt-2">Système de Gestion des Certificats</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border border-white/10 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
            <div className="h-2 bg-gradient-to-r from-[#a77725] to-[#bc872b]" />
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center text-[#bc872b]">
                Connexion
              </CardTitle>
              <CardDescription className="text-center">
                Accédez à votre espace sécurisé
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email professionnel
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-[#bc872b] transition-colors" />
                    <Input
                      id="email"
                      placeholder="votre.email@example.com"
                      type="email"
                      className="pl-9 border-gray-200 focus:border-[#bc872b] focus:ring-[#bc872b]/20 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-[#bc872b] transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9 border-gray-200 focus:border-[#bc872b] focus:ring-[#bc872b]/20 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-0">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#bc872b] to-[#a77725] hover:from-[#a77725] hover:to-[#8f6721] text-white transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </div>
                  ) : "Se connecter"}
                </Button>
                <Button variant="link" className="text-sm text-[#bc872b] hover:text-[#a77725]">
                  Mot de passe oublié ?
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="bg-white/95 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-md">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <FileCheck2 className="h-5 w-5 text-[#bc872b]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Gestion des certificats simplifiée</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Suivez vos certificats d'assurance transport de façon automatisée, sécurisée et conforme à la réglementation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center text-blue-200 text-sm z-10"
      >
        © {new Date().getFullYear()} NSIA Assurance. Tous droits réservés.
      </motion.div>
    </main>
  )
}