"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Search,
  FileText,
  Download,
  Copy,
  Eye,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileUp,
  Upload
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { motion, AnimatePresence } from "framer-motion"

const formSchema = z.object({
  expediteur_nom: z.string().min(2, "Le nom est requis"),
  expediteur_adresse: z.string().min(5, "L'adresse est requise"),
  expediteur_pays: z.string().min(2, "Le pays est requis"),
  destinataire_nom: z.string().min(2, "Le nom est requis"),
  destinataire_adresse: z.string().min(5, "L'adresse est requise"),
  destinataire_pays: z.string().min(2, "Le pays est requis"),
  type_transport: z.string().min(1, "Le type de transport est requis"),
  nature_marchandise: z.string().min(2, "La nature de la marchandise est requise"),
  valeur_declaree: z.string().min(1, "La valeur déclarée est requise"),
  type_couverture: z.string().min(1, "Le type de couverture est requis"),
  duree_couverture: z.string().min(1, "La durée de couverture est requise"),
  assureur: z.string().min(2, "L'assureur est requis"),
})

const certificats = [
  {
    id: "CERT-001",
    client: "Société A",
    statut: "validé",
    date: new Date("2024-03-15"),
    montant: 1500000,
    type: "Maritime",
    expediteur: "NSIA Transport",
    destinataire: "Port Autonome d'Abidjan"
  },
  {
    id: "CERT-002",
    client: "Entreprise B",
    statut: "en_attente",
    date: new Date("2024-03-14"),
    montant: 2300000,
    type: "Aérien",
    expediteur: "Air Cargo Services",
    destinataire: "Aéroport FHB"
  },
  {
    id: "CERT-003",
    client: "Compagnie C",
    statut: "rejeté",
    date: new Date("2024-03-13"),
    montant: 1800000,
    type: "Routier",
    expediteur: "TransCôte",
    destinataire: "Terminal Routier"
  }
]

const statutBadgeStyles = {
  validé: "bg-green-100 text-green-800",
  en_attente: "bg-yellow-100 text-yellow-800",
  rejeté: "bg-red-100 text-red-800"
}

export default function CertificatsPage() {
  const [date, setDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("expediteur")
  const [isNewCertificateOpen, setIsNewCertificateOpen] = useState(false)
  const [selectedCertificat, setSelectedCertificat] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expediteur_nom: "",
      expediteur_adresse: "",
      expediteur_pays: "",
      destinataire_nom: "",
      destinataire_adresse: "",
      destinataire_pays: "",
      type_transport: "",
      nature_marchandise: "",
      valeur_declaree: "",
      type_couverture: "",
      duree_couverture: "",
      assureur: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsNewCertificateOpen(false)
  }

  const handleViewDetail = (certificat: any) => {
    setSelectedCertificat(certificat)
    setIsDetailOpen(true)
  }

  const filteredCertificats = certificats.filter(cert => {
    const matchesSearch = cert.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || cert.statut === statusFilter
    const matchesDate = !date || format(cert.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Liste des Certificats</h1>
        <Dialog open={isNewCertificateOpen} onOpenChange={setIsNewCertificateOpen}>
          <DialogTrigger asChild>
            <Button className="nsia-gradient">
              <FileText className="h-4 w-4 mr-2" />
              Nouveau Certificat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Création d'un nouveau certificat</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="expediteur">Expéditeur</TabsTrigger>
                    <TabsTrigger value="destinataire">Destinataire</TabsTrigger>
                    <TabsTrigger value="transport">Transport</TabsTrigger>
                    <TabsTrigger value="assurance">Assurance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="expediteur" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="expediteur_nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'expéditeur</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expediteur_adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Adresse complète" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expediteur_pays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un pays" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ci">Côte d'Ivoire</SelectItem>
                              <SelectItem value="sn">Sénégal</SelectItem>
                              <SelectItem value="tg">Togo</SelectItem>
                              <SelectItem value="ml">Mali</SelectItem>
                              <SelectItem value="bj">Bénin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="destinataire" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="destinataire_nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du destinataire</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destinataire_adresse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Adresse complète" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destinataire_pays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un pays" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ci">Côte d'Ivoire</SelectItem>
                              <SelectItem value="sn">Sénégal</SelectItem>
                              <SelectItem value="tg">Togo</SelectItem>
                              <SelectItem value="ml">Mali</SelectItem>
                              <SelectItem value="bj">Bénin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="transport" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="type_transport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de transport</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner le type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="maritime">Maritime</SelectItem>
                              <SelectItem value="aerien">Aérien</SelectItem>
                              <SelectItem value="routier">Routier</SelectItem>
                              <SelectItem value="ferroviaire">Ferroviaire</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nature_marchandise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nature de la marchandise</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Description de la marchandise" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="valeur_declaree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valeur déclarée (FCFA)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="assurance" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="type_couverture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de couverture</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner la couverture" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tous_risques">Tous risques</SelectItem>
                              <SelectItem value="fap">FAP sauf</SelectItem>
                              <SelectItem value="tiers">Tiers</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duree_couverture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée de couverture</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner la durée" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="30">30 jours</SelectItem>
                              <SelectItem value="60">60 jours</SelectItem>
                              <SelectItem value="90">90 jours</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="assureur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assureur principal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner l'assureur" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nsia_ci">NSIA Côte d'Ivoire</SelectItem>
                              <SelectItem value="nsia_sn">NSIA Sénégal</SelectItem>
                              <SelectItem value="nsia_tg">NSIA Togo</SelectItem>
                              <SelectItem value="nsia_ml">NSIA Mali</SelectItem>
                              <SelectItem value="nsia_bj">NSIA Bénin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="font-medium">Documents justificatifs</h3>
                      <div className="grid gap-4">
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Glissez-déposez vos fichiers ici ou
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Parcourir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" type="button" onClick={() => setIsNewCertificateOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="nsia-gradient">
                    Créer le certificat
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recherche avancée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par numéro ou client..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="validé">Validé</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setDate(undefined)
            }}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Certificat</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredCertificats.map((certificat) => (
                    <motion.tr
                      key={certificat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="group hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{certificat.id}</TableCell>
                      <TableCell>{certificat.client}</TableCell>
                      <TableCell>{certificat.type}</TableCell>
                      <TableCell>
                        {format(certificat.date, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("fr-FR").format(certificat.montant)} FCFA
                      </TableCell>
                      <TableCell>
                        <Badge className={statutBadgeStyles[certificat.statut as keyof typeof statutBadgeStyles]}>
                          {certificat.statut.charAt(0).toUpperCase() + certificat.statut.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="icon"
                            title="Voir les détails"
                            onClick={() => handleViewDetail(certificat)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Télécharger">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Dupliquer">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Affichage de 1 à {filteredCertificats.length} sur {filteredCertificats.length} entrées
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails du certificat {selectedCertificat?.id}</DialogTitle>
          </DialogHeader>
          {selectedCertificat && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations générales</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Numéro:</span> {selectedCertificat.id}</p>
                    <p><span className="font-medium">Client:</span> {selectedCertificat.client}</p>
                    <p><span className="font-medium">Type:</span> {selectedCertificat.type}</p>
                    <p><span className="font-medium">Date:</span> {format(selectedCertificat.date, "dd/MM/yyyy")}</p>
                    <p><span className="font-medium">Montant:</span> {new Intl.NumberFormat("fr-FR").format(selectedCertificat.montant)} FCFA</p>
                    <p>
                      <span className="font-medium">Statut:</span>
                      <Badge className={`ml-2 ${statutBadgeStyles[selectedCertificat.statut as keyof typeof statutBadgeStyles]}`}>
                        {selectedCertificat.statut.charAt(0).toUpperCase() + selectedCertificat.statut.slice(1)}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Parties concernées</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Expéditeur:</span> {selectedCertificat.expediteur}</p>
                    <p><span className="font-medium">Destinataire:</span> {selectedCertificat.destinataire}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Fermer
                </Button>
                <Button className="nsia-gradient">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}