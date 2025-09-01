import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { UserCarousel } from '@/components/ui/Carousel';
import { DevisBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';
import RealisationsData from '@/components/data/RealisationsData';

export default async function AboutPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

 // --- FETCH REALISATIONS ---
   const realisationsData = await RealisationsData();

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
        title="Nos Réalisations"
        subtitle="Des projets concrets, des résultats visibles"
        backgroundImage="/images/a-propos/hero5.jpg"
        imageAlt="Réalisations de BT Conseil"
      />
      

      {/* Carousel Équipe */}
      <UserCarousel
        type="realisation"
        title="Nos Réalisations"
        cards={realisationsData}
        cardsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        className="bg-white"
      />

      {/* Bandeau Contact */}
      <DevisBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}