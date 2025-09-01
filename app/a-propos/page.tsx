import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { UserCarousel } from '@/components/ui/Carousel';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';
import TeamData from '@/components/data/TeamData';

export default async function AboutPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  const teamData = await TeamData();


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
        variant="intro"
        title="Découvrez BT Conseil"
        subtitle="L'expertise et la passion de notre équipe au service de vos projets"
        backgroundImage="/images/a-propos/hero5.jpg"
        imageAlt="À propos de BT Conseil - Notre équipe"
      />

      {/* Section Présentation détaillée */}
      <Section
        layout="image-right"
        title="30 ans d'expertise en maîtrise d'œuvre"
        description="Fondée en 1994, BT Conseil s'est imposée comme un acteur incontournable de la maîtrise d'œuvre en région parisienne. Notre entreprise familiale a su évoluer avec les techniques et les réglementations du secteur, tout en conservant ses valeurs fondamentales de proximité et d'excellence.<br/><br/>Basés aux Pavillons-sous-Bois, nous accompagnons particuliers et professionnels dans la concrétisation de leurs projets les plus ambitieux. De la conception à la réception des travaux, notre équipe pluridisciplinaire met son savoir-faire au service de votre réussite.<br/><br/>Chaque projet est unique et mérite une approche personnalisée. C'est pourquoi nous privilégions l'écoute, le conseil et l'adaptation à vos besoins spécifiques, garantissant ainsi des résultats qui dépassent vos attentes."
        image={{
          src: "/images/a-propos/entreprise-detail.jpg",
          alt: "BT Conseil - 30 ans d'expertise"
        }}
        backgroundColor="gray"
      />

      {/* Carousel Équipe */}
      <UserCarousel
        type="team"
        title="Notre Équipe"
        cards={teamData}
        cardsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        className="bg-white"
      />

      {/* Bandeau Contact */}
      <ContactBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}