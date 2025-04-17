"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp as FileUpload, Upload } from "lucide-react"

const formSchema = z.object({
  // Informations expéditeur
  expediteur_nom: z.string().min(2, "Le nom est requis"),
  expediteur_adresse: z.string().min(5, "L'adresse est requise"),
  expediteur_pays: z.string().min(2, "Le pays est requis"),
  
  // Informations destinataire
  destinataire_nom: z.string().min(2, "Le nom est requis"),
  destinataire_adresse: z.string().min(5, "L'adresse est requise"),
  destinataire_pays: z.string().min(2, "Le pays est requis"),
  
  // Informations transport
  type_transport: z.string().min(1, "Le type de transport est requis"),
  nature_marchandise: z.string().min(2, "La nature de la marchandise est requise"),
  valeur_declaree: z.string().min(1, "La valeur déclarée est requise"),
  
  // Informations assurance
  type_couverture: z.string().min(1, "Le type de couverture est requis"),
  duree_couverture: z.string().min(1, "La durée de couverture est requise"),
  assureur: z.string().min(2, "L'assureur est requis"),
})

export default function NouveauCertificatPage() {
  const [activeTab, setActiveTab] = useState("expediteur")
  
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
    // Logique de soumission à implémenter
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nouveau Certificat</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Création d'un nouveau certificat d'assurance</CardTitle>
        </CardHeader>
        <CardContent>
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
                        <FileUpload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
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
                <Button variant="outline" type="button">
                  Annuler
                </Button>
                <Button type="submit" className="nsia-gradient">
                  Créer le certificat
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}