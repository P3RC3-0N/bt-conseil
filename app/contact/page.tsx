'use client';

import Header from '@/components/layout/Header';
import { ContactForm } from '@/components/ui/Form';
import HeroSection from '@/components/ui/HeroSection';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  // Handler pour la soumission du formulaire contact
  const handleContactSubmit = async (data: {
    senderName: string;
    email: string;
    fullMessage: string;
  }) => {
    try {
      console.log('Données du formulaire contact:', data);
      
      // Ici vous pourrez ajouter votre logique d'envoi :
      // - Appel API vers votre backend
      // - Envoi d'email
      // - Sauvegarde en base de données
      
      // Exemple d'appel API :
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulation d'un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Notification de succès (vous pouvez utiliser votre système de notifications)
      alert('Message envoyé avec succès ! Nous vous répondrons rapidement.');
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
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

      {/* Section Intro Hero */}
      <HeroSection
        variant="guide"
        title="Nous contacter"
        subtitle="Une question, un projet ? Ecrivez nous, et nous vous repondront dans les plus bref delais !"
        description="Une question, un projet ? Ecrivez nous, et nous vous repondront dans les plus bref delais !"
        backgroundImage="/images/contact/contact3.jpg"
        imageAlt="À propos de BT Conseil - Notre équipe"
      />

      {/* Formulaire Contact */}
      <ContactForm 
        onSubmit={handleContactSubmit}
      />

      {/* Bandeau Contact */}
      <ContactBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}