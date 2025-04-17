"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Lock, Shield, History, LogOut } from "lucide-react"

const profilSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  fonction: z.string().min(2, "La fonction est requise"),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState("informations")

  const profilForm = useForm<z.infer<typeof profilSchema>>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      nom: "Jean Dupont",
      email: "jean.dupont@nsia.com",
      telephone: "+225 0123456789",
      fonction: "Courtier",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onProfilSubmit(values: z.infer<typeof profilSchema>) {
    console.log(values)
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    console.log(values)
  }

  const connexions = [
    { date: "2024-03-20 09:30", appareil: "Chrome sur Windows", localisation: "Abidjan, Côte d'Ivoire" },
    { date: "2024-03-19 14:15", appareil: "Safari sur iPhone", localisation: "Abidjan, Côte d'Ivoire" },
    { date: "2024-03-18 11:45", appareil: "Chrome sur MacBook", localisation: "Abidjan, Côte d'Ivoire" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Carte de profil */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jean" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">Jean Dupont</h2>
                <p className="text-sm text-muted-foreground">Courtier</p>
              </div>
              <Button variant="outline" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contenu principal */}
        <div className="md:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informations">Informations</TabsTrigger>
              <TabsTrigger value="securite">Sécurité</TabsTrigger>
              <TabsTrigger value="connexions">Connexions</TabsTrigger>
            </TabsList>

            <TabsContent value="informations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et de contact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profilForm}>
                    <form onSubmit={profilForm.handleSubmit(onProfilSubmit)} className="space-y-4">
                      <FormField
                        control={profilForm.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profilForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="email" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profilForm.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profilForm.control}
                        name="fonction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fonction</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="nsia-gradient">
                        Enregistrer les modifications
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="securite" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe actuel</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="nsia-gradient">
                        Modifier le mot de passe
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Double authentification</CardTitle>
                  <CardDescription>
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertDescription>
                      La double authentification n'est pas encore activée sur votre compte.
                      Nous vous recommandons de l'activer pour une meilleure sécurité.
                    </AlertDescription>
                  </Alert>
                  <Button variant="outline" className="mt-4">
                    Activer la double authentification
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connexions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des connexions</CardTitle>
                  <CardDescription>
                    Consultez l'historique des connexions à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connexions.map((connexion, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <History className="h-5 w-5 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">{connexion.appareil}</p>
                          <p className="text-sm text-muted-foreground">{connexion.localisation}</p>
                          <p className="text-sm text-muted-foreground">{connexion.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}