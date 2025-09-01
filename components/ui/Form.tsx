'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Body } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';
import { Mail, Phone, User, MessageSquare, Euro, Building, Send } from 'lucide-react';

type FormType = 'contact' | 'devis';

interface FormProps {
  type: FormType;
  className?: string;
  onSubmit?: (data: any) => void | Promise<void>; // Type plus flexible
}

// Types pour les données des formulaires
interface ContactFormData {
  senderName: string;
  email: string;
  fullMessage: string;
}

interface DevisFormData {
  clientName: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
}

// Configuration des formulaires
const formConfig = {
  contact: {
    title: "Formulaire de contact",
    submitLabel: "Envoyer le message"
  },
  devis: {
    title: "Formulaire de devis",
    submitLabel: "Demander mon devis"
  }
};

// Options pour le type de projet (devis)
const projectTypes = [
  "Construction neuve",
  "Rénovation complète", 
  "Rénovation partielle",
  "Extension",
  "Aménagement intérieur",
  "Rénovation énergétique",
  "Expertise technique",
  "Autre"
];

// Options pour le budget (devis)
const budgetRanges = [
  "Moins de 50 000 €",
  "50 000 € - 100 000 €",
  "100 000 € - 200 000 €", 
  "200 000 € - 500 000 €",
  "Plus de 500 000 €",
  "À définir"
];

const Form: React.FC<FormProps> = ({
  type,
  className,
  onSubmit
}) => {
  const config = formConfig[type];
  
  // États pour le formulaire contact
  const [contactData, setContactData] = useState<ContactFormData>({
    senderName: '',
    email: '',
    fullMessage: ''
  });

  // États pour le formulaire devis
  const [devisData, setDevisData] = useState<DevisFormData>({
    clientName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion de la soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = type === 'contact' ? contactData : devisData;
      await onSubmit?.(dataToSubmit);
      
      // Reset du formulaire après succès
      if (type === 'contact') {
        setContactData({ senderName: '', email: '', fullMessage: '' });
      } else {
        setDevisData({ clientName: '', email: '', phone: '', projectType: '', budget: '' });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendu du formulaire contact
  const renderContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom */}
      <div>
        <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nom complet *
          </div>
        </label>
        <input
          type="text"
          id="senderName"
          required
          value={contactData.senderName}
          onChange={(e) => setContactData(prev => ({ ...prev, senderName: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Votre nom et prénom"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </div>
        </label>
        <input
          type="email"
          id="email"
          required
          value={contactData.email}
          onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="votre.email@exemple.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="fullMessage" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message *
          </div>
        </label>
        <textarea
          id="fullMessage"
          required
          rows={6}
          value={contactData.fullMessage}
          onChange={(e) => setContactData(prev => ({ ...prev, fullMessage: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          placeholder="Décrivez-nous votre projet, vos questions ou vos besoins..."
        />
      </div>

      {/* Bouton de soumission responsive */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full py-4 text-lg font-semibold"
      >
        {/* Mobile : Icône + "Envoyer" */}
        <div className="flex items-center text-sm gap-2 sm:hidden">
          <Send className="w-5 h-5" />
          {isSubmitting ? "Envoi..." : "Envoyer"}
        </div>
        
        {/* Desktop : Icône + texte complet */}
        <div className="hidden sm:flex items-center gap-2">
          <Send className="w-5 h-5" />
          {isSubmitting ? "Envoi en cours..." : config.submitLabel}
        </div>
      </Button>
    </form>
  );

  // Rendu du formulaire devis
  const renderDevisForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom client */}
      <div>
        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nom complet *
          </div>
        </label>
        <input
          type="text"
          id="clientName"
          required
          value={devisData.clientName}
          onChange={(e) => setDevisData(prev => ({ ...prev, clientName: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Votre nom et prénom"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email-devis" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </div>
        </label>
        <input
          type="email"
          id="email-devis"
          required
          value={devisData.email}
          onChange={(e) => setDevisData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="votre.email@exemple.com"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Téléphone
          </div>
        </label>
        <input
          type="tel"
          id="phone"
          value={devisData.phone}
          onChange={(e) => setDevisData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="06 12 34 56 78"
        />
      </div>

      {/* Type de projet */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Type de projet *
          </div>
        </label>
        <select
          id="projectType"
          required
          value={devisData.projectType}
          onChange={(e) => setDevisData(prev => ({ ...prev, projectType: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="">Sélectionnez le type de projet</option>
          {projectTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4" />
            Budget estimé *
          </div>
        </label>
        <select
          id="budget"
          required
          value={devisData.budget}
          onChange={(e) => setDevisData(prev => ({ ...prev, budget: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="">Sélectionnez votre budget</option>
          {budgetRanges.map((range, index) => (
            <option key={index} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Bouton de soumission responsive */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full py-4 text-lg font-semibold"
      >
        {/* Icône seulement sur mobile (<640px) */}
        
        {/* Mobile : Icône + "Envoyer" */}
        <div className="flex items-center text-sm gap-2 sm:hidden">
         <Send className="w-5 h-5 sm:hidden" />
          {isSubmitting ? "Envoi..." : "Envoyer"}
        </div>
        
        {/* Texte + icône sur sm et plus */}
        <div className="hidden sm:flex items-center gap-2">
          <Send className="w-5 h-5" />
          {isSubmitting ? "Envoi en cours..." : config.submitLabel}
        </div>
      </Button>
    </form>
  );

  return (
    <section className={cn(
      "py-12 sm:py-16 lg:py-20 bg-gray-50", // Fond gris pour la section
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Formulaire avec titre aligné à gauche */}
        <div className="max-w-2xl mx-auto">
          {/* Titre aligné avec le bord gauche du formulaire */}
          <Heading 
            level={2} 
            color="primary" 
            weight="semibold"
            className="text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12"
          >
            {config.title}
          </Heading>

          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-sm">
            {type === 'contact' ? renderContactForm() : renderDevisForm()}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composants spécialisés avec types précis
export const ContactForm: React.FC<{
  className?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
}> = ({ className, onSubmit }) => (
  <Form type="contact" className={className} onSubmit={onSubmit} />
);

export const DevisForm: React.FC<{
  className?: string;
  onSubmit?: (data: DevisFormData) => void | Promise<void>;
}> = ({ className, onSubmit }) => (
  <Form type="devis" className={className} onSubmit={onSubmit} />
);

export default Form;