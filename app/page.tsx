import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { ServiceSection, RealisationSection } from '@/components/ui/SectionCard';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';
import Typography, { Heading, Body } from '@/components/ui/Typographie';

export default function Home() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  // Données des services pour la section
  const servicesData = [
    {
      type: 'service' as const,
      data: {
        icon: '/icons/technical-study.svg',
        title: 'Études techniques & diagnostics',
        description: 'Étude de faisabilité, relevés 3D, diagnostic structurel, et optimisation des coûts techniques. Répond aux contraintes du bâti, optimisation budgétaire, recommandations techniques.'
      },
      id: 'etudes-techniques'
    },
    {
      type: 'service' as const,
      data: {
        icon: '/icons/project-management.svg',
        title: 'Suivi de chantier & coordination',
        description: 'Planification, coordination des corps d\'état, rédaction des comptes-rendus et respect des délais. Une coordination fluide, suivi rigoureux, interlocuteur unique.'
      },
      id: 'suivi-chantier'
    },
    {
      type: 'service' as const,
      data: {
        icon: '/icons/administrative.svg',
        title: 'Gestion administrative & appels d\'offres',
        description: 'Rédaction et dépôt des dossiers de consultation, analyse des offres, établissement des marchés. Prise en charge complète du volet administratif et réglementaire.'
      },
      id: 'gestion-administrative'
    }
  ];

  // Données des réalisations pour la section
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

      {/* Hero Section */}
      <HeroSection
        variant="hero"
        title="BT Conseil"
        subtitle="Ensemble pour réussir"
        backgroundImage="/images/acceuil/hero4.jpg"
        imageAlt="BT Conseil - Maîtrise d'œuvre"
        ctaButton={{ 
          label: "En savoir plus", 
          href: "/a-propos" 
        }}
      />

      {/* Section À propos */}
      <Section
        layout="image-right"
        title="BT Conseil, votre partenaire de confiance"
        description="Depuis plus de 30 ans, BT Conseil accompagne particuliers et professionnels dans la réussite de leurs projets de construction et de rénovation.<br/><br/>Notre expertise en maîtrise d'œuvre nous permet d'assurer la conception, la planification et le suivi rigoureux de chaque chantier, en coordonnant efficacement tous les intervenants.<br/><br/>Basée aux Pavillons-sous-Bois, notre entreprise s'engage à offrir un service de qualité, fondé sur la proximité, la confiance et la transparence."
        image={{
          src: "/images/acceuil/biographie.jpg",
          alt: "BT Conseil - 30 ans d'expérience"
        }}
        backgroundColor="gray"
      />

      {/* Section Services */}
      <ServiceSection
        title="Nos Services"
        cards={servicesData}
        backgroundColor="white"
        buttonLabel="Découvrir tous nos services"
        buttonHref="/services"
      />

      {/* Section Réalisations */}
      <RealisationSection
        title="Nos Réalisations"
        cards={realisationsData}
        backgroundColor="gray"
        buttonLabel="Découvrir toutes nos réalisations"
        buttonHref="/realisations"
      />

      {/* Bandeau Contact */}
      <ContactBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}