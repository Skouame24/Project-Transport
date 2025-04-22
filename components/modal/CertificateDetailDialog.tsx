import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  User, 
  Briefcase, 
  Calendar, 
  DollarSign,
  Tag,
  Send,
  MapPin,
  Truck,
  FileText
} from 'lucide-react';

interface CertificateDetailProps {
  certificat: any;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateDetailDialog: React.FC<CertificateDetailProps> = ({
  certificat,
  isOpen,
  onClose
}) => {
  if (!certificat) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validé': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'en_attente': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejeté': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-hidden border-0 shadow-xl p-0 rounded-2xl">
        {/* En-tête simplifié */}
        <div className="bg-[#bc872b] text-white p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-white/20 p-2">
                <FileText className="h-5 w-5" />
              </div>
              <DialogTitle className="text-xl font-medium">
                Certificat {certificat.id}
              </DialogTitle>
            </div>
            <p className="mt-2 text-white/80 text-sm">
              {certificat.client} • Émis le {format(certificat.date, "dd MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>

        {/* Corps du dialogue avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {/* Statut et montant mis en avant */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Tag className="h-5 w-5 text-[#bc872b]" />
              <div>
                <span className="text-sm text-gray-500">Statut</span>
                <div className="mt-1">
                  <Badge className={`px-3 py-1 font-medium text-sm rounded-full ${getStatusColor(certificat.statut)}`}>
                    {certificat.statut.charAt(0).toUpperCase() + certificat.statut.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-[#bc872b]" />
              <div>
                <span className="text-sm text-gray-500">Montant</span>
                <p className="text-lg font-semibold">
                  {new Intl.NumberFormat("fr-FR").format(certificat.montant)} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Informations organisées en sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section informations générales */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-[#bc872b]">
                <Briefcase className="h-5 w-5" />
                <h3 className="font-medium">Informations générales</h3>
              </div>
              
              <div className="space-y-4 bg-[#bc872b]/5 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="min-w-24 text-sm text-gray-500">Type:</div>
                  <div className="font-medium">{certificat.type}</div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="min-w-24 text-sm text-gray-500">Numéro:</div>
                  <div className="font-medium text-[#bc872b]">{certificat.id}</div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="min-w-24 text-sm text-gray-500">Date:</div>
                  <div className="font-medium">{format(certificat.date, "dd/MM/yyyy")}</div>
                </div>
              </div>
            </div>

            {/* Section parties concernées */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-[#bc872b]">
                <User className="h-5 w-5" />
                <h3 className="font-medium">Parties concernées</h3>
              </div>
              
              <div className="space-y-4 bg-[#bc872b]/5 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Send className="h-4 w-4 mt-1 text-[#bc872b]" />
                  <div>
                    <div className="text-sm text-gray-500">Expéditeur:</div>
                    <div className="font-medium">{certificat.expediteur}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1 text-[#bc872b]" />
                  <div>
                    <div className="text-sm text-gray-500">Destinataire:</div>
                    <div className="font-medium">{certificat.destinataire}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Truck className="h-4 w-4 mt-1 text-[#bc872b]" />
                  <div>
                    <div className="text-sm text-gray-500">Mode de transport:</div>
                    <div className="font-medium">{certificat.type}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action avec style amélioré */}
          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-[#bc872b]/20 text-[#bc872b] hover:bg-[#bc872b]/5 transition-colors duration-200"
            >
              Fermer
            </Button>
            <Button 
              className="bg-[#bc872b] hover:bg-[#a77725] text-white transition-colors duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger le PDF
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateDetailDialog;