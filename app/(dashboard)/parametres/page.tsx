'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Données de test
const assureurs = [
  { id: 1, nom: "NSIA Côte d'Ivoire", code: "NSIA-CI", pays: "Côte d'Ivoire", actif: true },
  { id: 2, nom: "NSIA Sénégal", code: "NSIA-SN", pays: "Sénégal", actif: true },
  { id: 3, nom: "NSIA Togo", code: "NSIA-TG", pays: "Togo", actif: true }
];

const coassureurs = [
  { id: 1, nom: "AXA Assurances", code: "AXA", pays: "Côte d'Ivoire", part: "30%", actif: true },
  { id: 2, nom: "SUNU Assurances", code: "SUNU", pays: "Sénégal", part: "25%", actif: true }
];

const intermediaires = [
  { id: 1, nom: "Gras Savoye", type: "Courtier", code: "GS", pays: "Côte d'Ivoire", actif: true },
  { id: 2, nom: "NSIA Direct", type: "Agent", code: "ND", pays: "Sénégal", actif: true }
];

const filiales = [
  { id: 1, nom: "NSIA Côte d'Ivoire", code: "NSIA-CI", siege: "Abidjan", actif: true },
  { id: 2, nom: "NSIA Sénégal", code: "NSIA-SN", siege: "Dakar", actif: true }
];

const pays = [
  { id: 1, nom: "Côte d'Ivoire", code: "CI", devise: "XOF", actif: true },
  { id: 2, nom: "Sénégal", code: "SN", devise: "XOF", actif: true },
  { id: 3, nom: "Togo", code: "TG", devise: "XOF", actif: true }
];

const typesCertificats = [
  { id: 1, nom: "Maritime", code: "MAR", description: "Transport maritime", actif: true },
  { id: 2, nom: "Aérien", code: "AER", description: "Transport aérien", actif: true },
  { id: 3, nom: "Routier", code: "ROU", description: "Transport routier", actif: true }
];

const statutsTraitement = [
  { id: 1, nom: "En attente", code: "ATT", description: "En attente de validation", actif: true },
  { id: 2, nom: "Validé", code: "VAL", description: "Certificat validé", actif: true },
  { id: 3, nom: "Rejeté", code: "REJ", description: "Certificat rejeté", actif: true }
];

const statutsCertificats = [
  { id: 1, nom: "Valide", code: "VAL", description: "Certificat en cours de validité", actif: true },
  { id: 2, nom: "Expiré", code: "EXP", description: "Certificat expiré", actif: true }
];

const typesIntermediaires = [
  { id: 1, nom: "Courtier", code: "CRT" },
  { id: 2, nom: "Agent", code: "AGT" },
  { id: 3, nom: "Direct", code: "DIR" }
];

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("assureurs");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (type: string, id: number) => {
    toast.success(`${type} supprimé avec succès`);
  };

  const handleEdit = (type: string, id: number) => {
    toast.info(`Modification de ${type} en cours...`);
  };

  const handleAdd = (type: string, data: any) => {
    toast.success(`Nouveau ${type} ajouté avec succès`);
  };

  const renderTableActions = (id: number, type: string) => (
    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="outline"
        size="icon"
        className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
        onClick={() => handleEdit(type, id)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="border-red-200 text-red-600 hover:bg-red-50"
        onClick={() => handleDelete(type, id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderStatusBadge = (actif: boolean) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      actif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}>
      {actif ? "Actif" : "Inactif"}
    </span>
  );

  const renderSearchBar = (placeholder: string) => (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-[#bc872b]" />
        <Input
          placeholder={placeholder}
          className="pl-9 border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Paramètres du Système
          </h1>
          <p className="text-gray-500 mt-1">Gérez les paramètres de l'application</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8 bg-[#bc872b]/5">
          <TabsTrigger 
            value="assureurs"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Assureurs
          </TabsTrigger>
          <TabsTrigger 
            value="coassureurs"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Coassureurs
          </TabsTrigger>
          <TabsTrigger 
            value="intermediaires"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Intermédiaires
          </TabsTrigger>
          <TabsTrigger 
            value="filiales"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Filiales
          </TabsTrigger>
          <TabsTrigger 
            value="pays"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Pays
          </TabsTrigger>
          <TabsTrigger 
            value="types"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Types
          </TabsTrigger>
          <TabsTrigger 
            value="statuts-traitement"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Statuts Traitement
          </TabsTrigger>
          <TabsTrigger 
            value="statuts-certificats"
            className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
          >
            Statuts Certificats
          </TabsTrigger>
        </TabsList>

        {/* Onglet Assureurs */}
        <TabsContent value="assureurs" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Liste des Assureurs</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Assureur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom de l'assureur"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pays">Pays</Label>
                      <Select>
                        <SelectTrigger className="border-[#bc872b]/20">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {pays.map((p) => (
                            <SelectItem key={p.id} value={p.code}>
                              {p.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("assureur", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un assureur...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Pays</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {assureurs.map((assureur) => (
                          <motion.tr
                            key={assureur.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{assureur.nom}</TableCell>
                            <TableCell>{assureur.code}</TableCell>
                            <TableCell>{assureur.pays}</TableCell>
                            <TableCell>{renderStatusBadge(assureur.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(assureur.id, "assureur")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Coassureurs */}
        <TabsContent value="coassureurs" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Liste des Coassureurs</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Coassureur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom du coassureur"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pays">Pays</Label>
                      <Select>
                        <SelectTrigger className="border-[#bc872b]/20">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {pays.map((p) => (
                            <SelectItem key={p.id} value={p.code}>
                              {p.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="part">Part (%)</Label>
                      <Input 
                        id="part" 
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Pourcentage de participation"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("coassureur", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un coassureur...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Pays</TableHead>
                        <TableHead className="text-[#bc872b]">Part</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {coassureurs.map((coassureur) => (
                          <motion.tr
                            key={coassureur.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{coassureur.nom}</TableCell>
                            <TableCell>{coassureur.code}</TableCell>
                            <TableCell>{coassureur.pays}</TableCell>
                            <TableCell>{coassureur.part}</TableCell>
                            <TableCell>{renderStatusBadge(coassureur.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(coassureur.id, "coassureur")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Intermédiaires */}
        <TabsContent value="intermediaires" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Liste des Intermédiaires</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Intermédiaire</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom de l'intermédiaire"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select>
                        <SelectTrigger className="border-[#bc872b]/20">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {typesIntermediaires.map((type) => (
                            <SelectItem key={type.id} value={type.code}>
                              {type.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pays">Pays</Label>
                      <Select>
                        <SelectTrigger className="border-[#bc872b]/20">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {pays.map((p) => (
                            <SelectItem key={p.id} value={p.code}>
                              {p.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("intermediaire", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un intermédiaire...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Type</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Pays</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {intermediaires.map((intermediaire) => (
                          <motion.tr
                            key={intermediaire.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{intermediaire.nom}</TableCell>
                            <TableCell>{intermediaire.type}</TableCell>
                            <TableCell>{intermediaire.code}</TableCell>
                            <TableCell>{intermediaire.pays}</TableCell>
                            <TableCell>{renderStatusBadge(intermediaire.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(intermediaire.id, "intermediaire")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Filiales */}
        <TabsContent value="filiales" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Liste des Filiales</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter une Filiale</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom de la filiale"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siege">Siège</Label>
                      <Input 
                        id="siege" 
                        placeholder="Ville du siège"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("filiale", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher une filiale...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Siège</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filiales.map((filiale) => (
                          <motion.tr
                            key={filiale.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{filiale.nom}</TableCell>
                            <TableCell>{filiale.code}</TableCell>
                            <TableCell>{filiale.siege}</TableCell>
                            <TableCell>{renderStatusBadge(filiale.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(filiale.id, "filiale")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Pays */}
        <TabsContent value="pays" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Liste des Pays</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Pays</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom du pays"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code ISO"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="devise">Devise</Label>
                      <Input 
                        id="devise" 
                        placeholder="Code de la devise"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("pays", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un pays...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Devise</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {pays.map((pays) => (
                          <motion.tr
                            key={pays.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{pays.nom}</TableCell>
                            <TableCell>{pays.code}</TableCell>
                            <TableCell>{pays.devise}</TableCell>
                            <TableCell>{renderStatusBadge(pays.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(pays.id, "pays")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Types de Certificats */}
        <TabsContent value="types" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Types de Certificats</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Type de Certificat</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom du type"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Description du type"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("type", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un type...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Description</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {typesCertificats.map((type) => (
                          <motion.tr
                            key={type.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{type.nom}</TableCell>
                            <TableCell>{type.code}</TableCell>
                            <TableCell>{type.description}</TableCell>
                            <TableCell>{renderStatusBadge(type.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(type.id, "type")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Statuts de Traitement */}
        <TabsContent value="statuts-traitement" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Statuts de Traitement</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Statut de Traitement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom du statut"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Description du statut"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("statut-traitement", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un statut...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Description</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {statutsTraitement.map((statut) => (
                          <motion.tr
                            key={statut.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{statut.nom}</TableCell>
                            <TableCell>{statut.code}</TableCell>
                            <TableCell>{statut.description}</TableCell>
                            <TableCell>{renderStatusBadge(statut.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(statut.id, "statut-traitement")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Statuts de Certificats */}
        <TabsContent value="statuts-certificats" className="space-y-6">
          <Card className="border-[#bc872b]/20">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-[#bc872b]/5 to-transparent">
              <CardTitle className="text-[#bc872b]">Statuts des Certificats</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-[#bc872b]">Ajouter un Statut de Certificat</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input 
                        id="nom" 
                        placeholder="Nom du statut"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input 
                        id="code" 
                        placeholder="Code unique"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Description du statut"
                        className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20"
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#bc872b] to-[#d19c3d] hover:from-[#a77725] hover:to-[#c08729] text-white"
                      onClick={() => handleAdd("statut-certificat", {})}
                    >
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderSearchBar("Rechercher un statut...")}
                <div className="rounded-md border border-[#bc872b]/20">
                  <Table>
                    <TableHeader className="bg-[#bc872b]/5">
                      <TableRow className="border-b border-[#bc872b]/20">
                        <TableHead className="text-[#bc872b]">Nom</TableHead>
                        <TableHead className="text-[#bc872b]">Code</TableHead>
                        <TableHead className="text-[#bc872b]">Description</TableHead>
                        <TableHead className="text-[#bc872b]">Statut</TableHead>
                        <TableHead className="text-right text-[#bc872b]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {statutsCertificats.map((statut) => (
                          <motion.tr
                            key={statut.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="group hover:bg-[#bc872b]/5"
                          >
                            <TableCell className="font-medium">{statut.nom}</TableCell>
                            <TableCell>{statut.code}</TableCell>
                            <TableCell>{statut.description}</TableCell>
                            <TableCell>{renderStatusBadge(statut.actif)}</TableCell>
                            <TableCell className="text-right">
                              {renderTableActions(statut.id, "statut-certificat")}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}