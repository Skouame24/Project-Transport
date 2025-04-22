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
import { toast } from "sonner"
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
  Upload,
  Archive,
  RotateCcw
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { motion, AnimatePresence } from "framer-motion"
import CertificateDetailDialog from "@/components/modal/CertificateDetailDialog"

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
    destinataire: "Port Autonome d'Abidjan",
    archived: false
  },
  {
    id: "CERT-002",
    client: "Entreprise B",
    statut: "en_attente",
    date: new Date("2024-03-14"),
    montant: 2300000,
    type: "Aérien",
    expediteur: "Air Cargo Services",
    destinataire: "Aéroport FHB",
    archived: false
  },
  {
    id: "CERT-003",
    client: "Compagnie C",
    statut: "rejeté",
    date: new Date("2024-03-13"),
    montant: 1800000,
    type: "Routier",
    expediteur: "TransCôte",
    destinataire: "Terminal Routier",
    archived: true
  }
]

export default function CertificatsPage() {
  const [date, setDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showArchived, setShowArchived] = useState(false)
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

  const handleArchive = (certificat: any) => {
    certificat.archived = !certificat.archived;
    toast.success(
      certificat.archived 
        ? "Le certificat a été archivé avec succès" 
        : "Le certificat a été désarchivé avec succès"
    );
  };

  const handleDuplicate = (certificat: any) => {
    const duplicateData = {
      expediteur_nom: certificat.expediteur,
      expediteur_adresse: "",
      expediteur_pays: "",
      destinataire_nom: certificat.destinataire,
      destinataire_adresse: "",
      destinataire_pays: "",
      type_transport: certificat.type,
      nature_marchandise: "",
      valeur_declaree: certificat.montant.toString(),
      type_couverture: "",
      duree_couverture: "",
      assureur: "",
    };
    form.reset(duplicateData);
    setIsNewCertificateOpen(true);
    toast.success("Les données du certificat ont été dupliquées");
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const filteredCertificats = certificats.filter(cert => {
    const matchesSearch = cert.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || cert.statut === statusFilter;
    const matchesDate = !date || format(cert.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    const matchesArchived = showArchived ? cert.archived : !cert.archived;
    return matchesSearch && matchesStatus && matchesDate && matchesArchived;
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsNewCertificateOpen(false);
    toast.success("Le certificat a été créé avec succès");
  }

  const handleViewDetail = (certificat: any) => {
    setSelectedCertificat(certificat);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Gestion des Certificats
          </h1>
          <p className="text-gray-500 mt-1">Gérez vos certificats d'assurance</p>
        </div>
        <Dialog open={isNewCertificateOpen} onOpenChange={setIsNewCertificateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
              <FileText className="h-4 w-4 mr-2" />
              Nouveau Certificat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#bc872b]">Création d'un nouveau certificat</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Existing form content remains the same */}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-[#bc872b]/20">
        <CardHeader className="border-b bg-gradient-to-r from-blue-900/5 to-transparent">
          <CardTitle className="text-[#bc872b] flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recherche avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-900 opacity-70" />
              <Input
                placeholder="Rechercher par numéro ou client..."
                className="pl-9 border-blue-900/20 focus:border-blue-900 focus:ring-blue-900/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-blue-900/20">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="validé">Validé</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="rejeté">Rejeté</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="justify-start text-left font-normal border-blue-900/20 text-blue-900 hover:bg-blue-900/5"
                >
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
                  className="border-blue-900/20"
                />
              </PopoverContent>
            </Popover>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowArchived(!showArchived)}
                className="border-blue-900/20 text-blue-900 hover:bg-blue-900/5 flex-1"
              >
                {showArchived ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Actifs
                  </>
                ) : (
                  <>
                    <Archive className="h-4 w-4 mr-2" />
                    Archives
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDate(undefined);
                  setShowArchived(false);
                  toast.success("Filtres réinitialisés");
                }}
                className="border-blue-900/20 text-blue-900 hover:bg-blue-900/5"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#bc872b]/20">
        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Table>
              <TableHeader className="bg-[#bc872b]/5">
                <TableRow className="border-b border-[#bc872b]/20">
                  <TableHead className="text-[#bc872b]">N° Certificat</TableHead>
                  <TableHead className="text-[#bc872b]">Client</TableHead>
                  <TableHead className="text-[#bc872b]">Type</TableHead>
                  <TableHead className="text-[#bc872b]">Date</TableHead>
                  <TableHead className="text-[#bc872b]">Montant</TableHead>
                  <TableHead className="text-[#bc872b]">Statut</TableHead>
                  <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
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
                      className="group hover:bg-[#bc872b]/5 border-b border-[#bc872b]/10"
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
                        <Badge variant={certificat.statut}>
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
                            className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            title="Télécharger"
                            className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            title="Dupliquer"
                            onClick={() => handleDuplicate(certificat)}
                            className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            title={certificat.archived ? "Désarchiver" : "Archiver"}
                            onClick={() => handleArchive(certificat)}
                            className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
                          >
                            {certificat.archived ? (
                              <RotateCcw className="h-4 w-4" />
                            ) : (
                              <Archive className="h-4 w-4" />
                            )}
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
            <div className="text-sm text-gray-500">
              Affichage de 1 à {filteredCertificats.length} sur {filteredCertificats.length} entrées
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CertificateDetailDialog 
        certificat={selectedCertificat}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  )
}