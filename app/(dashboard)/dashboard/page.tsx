"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileCheck2, 
  FileClock, 
  FileX, 
  TrendingUp,
  Bell,
  AlertCircle,
  FileText,
  BarChart3,
  ArrowRight,
  Activity
} from "lucide-react"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// Données de test pour les notifications
const notifications = [
  { id: 1, message: "Nouveau certificat en attente de validation", type: "warning", time: "Il y a 5 min" },
  { id: 2, message: "Certificat #2024-001 validé", type: "success", time: "Il y a 30 min" },
  { id: 3, message: "Paiement en attente pour le certificat #2024-002", type: "error", time: "Il y a 1h" },
]

// Données de production mensuelle
const productionData = [
  { name: "Jan", total: 123, validés: 100, enAttente: 15, rejetés: 8 },
  { name: "Fév", total: 145, validés: 120, enAttente: 18, rejetés: 7 },
  { name: "Mar", total: 132, validés: 110, enAttente: 12, rejetés: 10 },
  { name: "Avr", total: 167, validés: 140, enAttente: 20, rejetés: 7 },
  { name: "Mai", total: 182, validés: 150, enAttente: 22, rejetés: 10 },
  { name: "Juin", total: 156, validés: 130, enAttente: 16, rejetés: 10 }
]

// Données par filiale
const filialesData = [
  { name: "Abidjan", total: 421, validés: 350, enAttente: 51, rejetés: 20 },
  { name: "Dakar", total: 289, validés: 240, enAttente: 35, rejetés: 14 },
  { name: "Lomé", total: 234, validés: 190, enAttente: 29, rejetés: 15 },
  { name: "Bamako", total: 187, validés: 150, enAttente: 25, rejetés: 12 },
  { name: "Cotonou", total: 103, validés: 85, enAttente: 12, rejetés: 6 }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <div className="p-6 space-y-8 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Tableau de bord
          </h1>
          <p className="text-gray-500 mt-1">Bienvenue sur votre espace de gestion</p>
        </div>
        <div className="flex gap-4">
          <Link href="/certificats/nouveau">
            <Button className="bg-[#bc872b] hover:bg-[#a77725] text-white transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Nouveau Certificat
            </Button>
          </Link>
          <Link href="/rapports">
            <Button variant="outline" className="border-[#bc872b] text-[#bc872b] hover:bg-[#bc872b]/10 transition-colors">
              <BarChart3 className="h-4 w-4 mr-2" />
              Voir les rapports
            </Button>
          </Link>
        </div>
      </div>

      {/* Notifications */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-3"
      >
        <motion.div variants={item} className="md:col-span-2">
          <Card className="overflow-hidden border-[#bc872b]/20">
            <CardHeader className="border-b bg-[#bc872b]/5">
              <CardTitle className="flex items-center gap-2 text-[#bc872b]">
                <Activity className="h-5 w-5" />
                Aperçu de l'activité
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <div className="flex items-center p-4 bg-white rounded-xl border border-[#bc872b]/20">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                    <FileCheck2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Certificats</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <p className="text-xs text-green-500">+20.1% ce mois</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white rounded-xl border border-[#bc872b]/20">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                    <FileClock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">En Attente</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-xs text-gray-500 mt-1">12 nouveaux aujourd'hui</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-[#bc872b]/20">
            <CardHeader className="border-b bg-[#bc872b]/5">
              <CardTitle className="flex items-center gap-2 text-[#bc872b]">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all hover:translate-x-1 cursor-pointer ${
                      notif.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                      notif.type === 'success' ? 'bg-green-50 border-green-100' :
                      'bg-red-50 border-red-100'
                    } border`}
                  >
                    <AlertCircle className={`h-5 w-5 mt-0.5 ${
                      notif.type === 'warning' ? 'text-yellow-600' :
                      notif.type === 'success' ? 'text-green-600' :
                      'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Graphiques */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        <motion.div variants={item}>
          <Card className="border-[#bc872b]/20">
            <CardHeader className="border-b bg-[#bc872b]/5">
              <CardTitle className="text-[#bc872b]">Production Mensuelle</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px]">
                <LineChart
                  data={productionData}
                  categories={["total", "validés", "enAttente", "rejetés"]}
                  index="name"
                  colors={["#bc872b", "#22c55e", "#f59e0b", "#ef4444"]}
                  valueFormatter={(value) => `${value} certificats`}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-[#bc872b]/20">
            <CardHeader className="border-b bg-[#bc872b]/5">
              <CardTitle className="text-[#bc872b]">Production par Filiale</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px]">
                <BarChart
                  data={filialesData}
                  categories={["total", "validés", "enAttente", "rejetés"]}
                  index="name"
                  colors={["#bc872b", "#22c55e", "#f59e0b", "#ef4444"]}
                  valueFormatter={(value) => `${value} certificats`}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Actions rapides */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="border-[#bc872b]/20">
          <CardHeader className="border-b bg-[#bc872b]/5">
            <CardTitle className="text-[#bc872b]">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { href: "/certificats/nouveau", icon: FileText, label: "Nouveau certificat" },
                { href: "/certificats", icon: FileCheck2, label: "Liste des certificats" },
                { href: "/rapports", icon: BarChart3, label: "Voir les rapports" }
              ].map((action, index) => (
                <motion.div key={action.href} variants={item}>
                  <Link href={action.href}>
                    <div className="group relative overflow-hidden rounded-xl border border-[#bc872b]/20 bg-white p-4 hover:border-[#bc872b]/40 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#bc872b]/10 group-hover:bg-[#bc872b]/20 transition-colors">
                          <action.icon className="h-5 w-5 text-[#bc872b]" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-[#bc872b] transition-colors">
                          {action.label}
                        </span>
                      </div>
                      <ArrowRight className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#bc872b] opacity-0 transition-all group-hover:right-3 group-hover:opacity-100 animate-slide-right" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}