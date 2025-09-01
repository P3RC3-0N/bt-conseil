'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import { DevisForm } from '@/components/ui/Form';
import { DevisBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';

export default function DevisPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  // Handler pour la soumission du formulaire devis
  const handleDevisSubmit = async (data: {
    clientName: string;
    email: string;
    phone?: string;
    projectType: string;
    budget: string;
  }) => {
    try {
      console.log('Données du formulaire devis:', data);
      
      // Ici vous pourrez ajouter votre logique d'envoi :
      // - Appel API vers votre backend
      // - Envoi d'email
      // - Sauvegarde en base de données
      // - Génération automatique du devis
      
      // Exemple d'appel API :
      // const response = await fetch('/api/devis', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulation d'un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Notification de succès (vous pouvez utiliser votre système de notifications)
      alert('Demande de devis envoyée avec succès ! Nous vous contacterons rapidement.');
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header User */}
      <Header 
        variant="user"
        navigation={userNavigation}
        ctaButton={{ label: "Demander un devis", href: "/devis" }}
      />

      {/* Section Intro - Devis */}
      <HeroSection
        variant="guide"
        title="Obtenez votre devis personnalisé"
        subtitle="Décrivez-nous votre projet en quelques clics et recevez une estimation adaptée à vos besoins"
        description="Décrivez-nous votre projet en quelques clics et recevez une estimation adaptée à vos besoins"
        backgroundImage="/images/devis/devis1.jpg"
        imageAlt="Demande de devis BT Conseil"
      />

      {/* Formulaire Devis */}
      <DevisForm 
        onSubmit={handleDevisSubmit}
      />

      {/* Bandeau Devis */}
      <DevisBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}