"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"

// Données de test
const assureurs = [
  { id: 1, nom: "NSIA Côte d'Ivoire", code: "NSIA-CI", pays: "Côte d'Ivoire", actif: true },
  { id: 2, nom: "NSIA Sénégal", code: "NSIA-SN", pays: "Sénégal", actif: true },
  { id: 3, nom: "NSIA Togo", code: "NSIA-TG", pays: "Togo", actif: true }
]

const pays = [
  { id: 1, nom: "Côte d'Ivoire", code: "CI", devise: "XOF", actif: true },
  { id: 2, nom: "Sénégal", code: "SN", devise: "XOF", actif: true },
  { id: 3, nom: "Togo", code: "TG", devise: "XOF", actif: true }
]

const typesCertificats = [
  { id: 1, nom: "Maritime", code: "MAR", description: "Transport maritime", actif: true },
  { id: 2, nom: "Aérien", code: "AER", description: "Transport aérien", actif: true },
  { id: 3, nom: "Routier", code: "ROU", description: "Transport routier", actif: true }
]

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("assureurs")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assureurs">Assureurs</TabsTrigger>
          <TabsTrigger value="pays">Pays</TabsTrigger>
          <TabsTrigger value="types">Types de Certificats</TabsTrigger>
        </TabsList>

        <TabsContent value="assureurs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Liste des Assureurs</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="nsia-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un Assureur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" placeholder="Nom de l'assureur" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input id="code" placeholder="Code unique" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pays">Pays</Label>
                      <Input id="pays" placeholder="Pays d'origine" />
                    </div>
                    <Button className="w-full nsia-gradient">Enregistrer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un assureur..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Pays</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assureurs.map((assureur) => (
                      <TableRow key={assureur.id}>
                        <TableCell className="font-medium">{assureur.nom}</TableCell>
                        <TableCell>{assureur.code}</TableCell>
                        <TableCell>{assureur.pays}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            assureur.actif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {assureur.actif ? "Actif" : "Inactif"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pays" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Liste des Pays</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="nsia-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un Pays</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" placeholder="Nom du pays" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input id="code" placeholder="Code ISO" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="devise">Devise</Label>
                      <Input id="devise" placeholder="Devise" />
                    </div>
                    <Button className="w-full nsia-gradient">Enregistrer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un pays..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Devise</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pays.map((pays) => (
                      <TableRow key={pays.id}>
                        <TableCell className="font-medium">{pays.nom}</TableCell>
                        <TableCell>{pays.code}</TableCell>
                        <TableCell>{pays.devise}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            pays.actif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {pays.actif ? "Actif" : "Inactif"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Types de Certificats</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="nsia-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un Type de Certificat</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input id="nom" placeholder="Nom du type" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input id="code" placeholder="Code unique" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Description" />
                    </div>
                    <Button className="w-full nsia-gradient">Enregistrer</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un type..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typesCertificats.map((type) => (
                      <TableRow key={type.id}>
                        <TableCell className="font-medium">{type.nom}</TableCell>
                        <TableCell>{type.code}</TableCell>
                        <TableCell>{type.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            type.actif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {type.actif ? "Actif" : "Inactif"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}