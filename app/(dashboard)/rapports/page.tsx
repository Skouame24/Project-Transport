"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Download, FileSpreadsheet, File as FilePdf } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données de test
const productionData = [
  { name: "Jan", total: 123, validés: 100, enAttente: 15, rejetés: 8 },
  { name: "Fév", total: 145, validés: 120, enAttente: 18, rejetés: 7 },
  { name: "Mar", total: 132, validés: 110, enAttente: 12, rejetés: 10 },
  { name: "Avr", total: 167, validés: 140, enAttente: 20, rejetés: 7 },
  { name: "Mai", total: 182, validés: 150, enAttente: 22, rejetés: 10 },
  { name: "Juin", total: 156, validés: 130, enAttente: 16, rejetés: 10 }
]

const filialesData = [
  { name: "Abidjan", total: 421, validés: 350, enAttente: 51, rejetés: 20 },
  { name: "Dakar", total: 289, validés: 240, enAttente: 35, rejetés: 14 },
  { name: "Lomé", total: 234, validés: 190, enAttente: 29, rejetés: 15 },
  { name: "Bamako", total: 187, validés: 150, enAttente: 25, rejetés: 12 },
  { name: "Cotonou", total: 103, validés: 85, enAttente: 12, rejetés: 6 }
]

export default function RapportsPage() {
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [filiale, setFiliale] = useState("all"); // Initialisez avec "all" au lieu de ""
  const [periode, setPeriode] = useState("mensuel")
  const [activeTab, setActiveTab] = useState("production")

  const handleExport = (format: 'excel' | 'pdf') => {
    // Logique d'export à implémenter
    console.log(`Export en ${format}`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rapports & Statistiques</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FilePdf className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  {dateDebut ? format(dateDebut, "dd MMMM yyyy", { locale: fr }) : "Date début"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateDebut}
                  onSelect={setDateDebut}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  {dateFin ? format(dateFin, "dd MMMM yyyy", { locale: fr }) : "Date fin"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFin}
                  onSelect={setDateFin}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>

            <Select value={filiale} onValueChange={setFiliale}>
            <SelectTrigger>
              <SelectValue placeholder="Filiale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem> {/* Changé de "" à "all" */}
              <SelectItem value="ci">Côte d'Ivoire</SelectItem>
              <SelectItem value="sn">Sénégal</SelectItem>
              <SelectItem value="tg">Togo</SelectItem>
              <SelectItem value="ml">Mali</SelectItem>
              <SelectItem value="bj">Bénin</SelectItem>
            </SelectContent>
          </Select>

            <Select value={periode} onValueChange={setPeriode}>
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensuel">Mensuel</SelectItem>
                <SelectItem value="trimestriel">Trimestriel</SelectItem>
                <SelectItem value="annuel">Annuel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="filiales">Par Filiale</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la Production</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <LineChart
                data={productionData}
                categories={["total", "validés", "enAttente", "rejetés"]}
                index="name"
                colors={["blue", "green", "orange", "red"]}
                valueFormatter={(value) => `${value} certificats`}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: "Total Certificats", value: "1,234", color: "blue" },
              { title: "Certificats Validés", value: "1,050", color: "green" },
              { title: "En Attente", value: "156", color: "orange" },
              { title: "Rejetés", value: "28", color: "red" }
            ].map((stat, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold text-${stat.color}-600`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="filiales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production par Filiale</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <BarChart
                data={filialesData}
                categories={["total", "validés", "enAttente", "rejetés"]}
                index="name"
                colors={["blue", "green", "orange", "red"]}
                valueFormatter={(value) => `${value} certificats`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des Certificats</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filiale</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Validés</TableHead>
                    <TableHead>En Attente</TableHead>
                    <TableHead>Rejetés</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filialesData.map((filiale) => (
                    <TableRow key={filiale.name}>
                      <TableCell className="font-medium">{filiale.name}</TableCell>
                      <TableCell>{filiale.total}</TableCell>
                      <TableCell className="text-green-600">{filiale.validés}</TableCell>
                      <TableCell className="text-orange-600">{filiale.enAttente}</TableCell>
                      <TableCell className="text-red-600">{filiale.rejetés}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}