import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUp, Upload } from "lucide-react";

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
});

interface CreateCertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const CreateCertificateDialog: React.FC<CreateCertificateDialogProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState("expediteur");

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
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#bc872b]">Création d'un nouveau certificat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-[#bc872b]/5">
                <TabsTrigger 
                  value="expediteur"
                  className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
                >
                  Expéditeur
                </TabsTrigger>
                <TabsTrigger 
                  value="destinataire"
                  className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
                >
                  Destinataire
                </TabsTrigger>
                <TabsTrigger 
                  value="transport"
                  className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
                >
                  Transport
                </TabsTrigger>
                <TabsTrigger 
                  value="assurance"
                  className="data-[state=active]:bg-[#bc872b] data-[state=active]:text-white"
                >
                  Assurance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="expediteur" className="space-y-4">
                <FormField
                  control={form.control}
                  name="expediteur_nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'expéditeur</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom complet" {...field} className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20" />
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
                        <Textarea placeholder="Adresse complète" {...field} className="border-[#bc872b]/20 focus:border-[#bc872b] focus:ring-[#bc872b]/20" />
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
                          <SelectTrigger className="border-[#bc872b]/20">
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
                {/* Contenu similaire pour destinataire */}
              </TabsContent>

              <TabsContent value="transport" className="space-y-4">
                {/* Contenu similaire pour transport */}
              </TabsContent>

              <TabsContent value="assurance" className="space-y-4">
                {/* Contenu similaire pour assurance */}
                <div className="border border-[#bc872b]/20 rounded-lg p-4 space-y-4">
                  <h3 className="font-medium text-[#bc872b]">Documents justificatifs</h3>
                  <div className="grid gap-4">
                    <div className="border-2 border-dashed border-[#bc872b]/20 rounded-lg p-4 text-center">
                      <FileUp className="h-8 w-8 mx-auto mb-2 text-[#bc872b]" />
                      <p className="text-sm text-gray-500">
                        Glissez-déposez vos fichiers ici ou
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10">
                        <Upload className="h-4 w-4 mr-2" />
                        Parcourir
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={onClose}
                className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/10"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-[#bc872b] hover:bg-[#a77725] text-white"
              >
                Créer le certificat
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCertificateDialog;