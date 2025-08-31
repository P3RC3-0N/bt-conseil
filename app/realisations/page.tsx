import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { UserCarousel } from '@/components/ui/Carousel';
import { DevisBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  // Données de l'équipe avec descriptions complètes (sauvegardées pour plus tard)
  const realisationsData = [
    {
      type: 'realisation' as const,
      data: {
        photo: '/images/realisations/realisation1.jpg',
        title: 'Rénovation énergétique d\'un immeuble',
        description: 'Modernisation thermique et isolation complète d\'un bâtiment de 20 logements.',
        year: '2023',
        location: 'Pavillons-sous-Bois'
      },
      id: 'renovation-immeuble'
    },
    {
      type: 'realisation' as const,
      data: {
        photo: '/images/realisations/realisation2.jpg',
        title: 'Construction maison individuelle',
        description: 'Conception et suivi d\'un projet clé en main pour un particulier.',
        year: '2022',
        location: 'Montreuil'
      },
      id: 'maison-individuelle'
    },
    {
      type: 'realisation' as const,
      data: {
        photo: '/images/realisations/realisation3.jpg',
        title: 'Réhabilitation local commercial en bureaux',
        description: 'Aménagement intérieur et mise aux normes pour transformation en bureaux modernes.',
        year: '2024',
        location: 'Aubervilliers'
      },
      id: 'rehabilitation-bureaux'
    }, 
    {
        type: 'realisation' as const,
      data: {
        photo: '/images/realisations/realisation4.jpg',
        title: 'Sinistres Beaugrenelle',
        description: 'Detections des fissures et reparations de celle-ci pour eviter les futures fuites.',
        year: '2019',
        location: 'Paris'
      },
      id: 'sinistres-beaugrenelle'
    }
  ];

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