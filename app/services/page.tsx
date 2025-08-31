import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header User */}
      <Header 
        variant="user"
        navigation={userNavigation}
        ctaButton={{ label: "Demander un devis", href: "/devis" }}
      />

      {/* Section Intro - Titre + slogan sans bouton */}
      <HeroSection
        variant="intro"
        title="Nos services"
        subtitle="Pour donner vie à vos projets de construction et de rénovation"
        backgroundImage="/images/acceuil/hero1.jpg"
        imageAlt="BT Conseil - Maîtrise d'œuvre"
        ctaButton={undefined} // Pas de bouton selon vos specs
        
      />

      {/* Service 1 : Études techniques - Image à droite */}
      <Section
  layout="image-right"
  title="Études techniques & diagnostics"
  description="Nous réalisons des études de faisabilité complètes, relevés 3D et diagnostics structurels pour anticiper les contraintes techniques de votre projet. Nos analyses permettent d’optimiser les coûts, tout en vous proposant des recommandations précises et adaptées afin de garantir une approche efficace et durable."
  image={{
    src: "/images/services/etudes-techniques.jpg",
    alt: "Études techniques et diagnostics - BT Conseil"
  }}
  backgroundColor="white"
/>


      {/* Service 2 : Suivi de chantier - Image à gauche */}
      <Section
  layout="image-left"
  title="Suivi de chantier & coordination"
  description="Un interlocuteur unique pour une gestion fluide de votre chantier. Nous assurons la planification, la coordination des différents corps d’état et le suivi rigoureux du planning. Grâce à des comptes rendus réguliers et une organisation maîtrisée, nous garantissons le respect des délais et du budget initial."
  image={{
    src: "/images/services/suivi-chantier.jpg",
    alt: "Suivi de chantier et coordination - BT Conseil"
  }}
  backgroundColor="gray"
/>


      {/* Service 3 : Gestion administrative - Image à droite */}
      <Section
  layout="image-right"
  title="Gestion administrative & appels d'offres"
  description="Nous prenons en charge l’ensemble du volet administratif et réglementaire de votre projet. Rédaction et dépôt des dossiers de consultation, analyse des offres reçues et établissement des marchés : notre expertise vous assure une gestion simplifiée et conforme, tout en vous faisant gagner un temps précieux."
  image={{
    src: "/images/services/gestion-administrative.jpg",
    alt: "Gestion administrative et appels d'offres - BT Conseil"
  }}
  backgroundColor="white"
/>


      {/* Bandeau Contact */}
      <ContactBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}