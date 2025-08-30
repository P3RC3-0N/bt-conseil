import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { ServiceSection } from '@/components/ui/SectionCard';
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
        backgroundImage="/images/acceuil/hero1.jpg"
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

      {/* Contenu principal temporaire pour tester le scroll */}
      <main className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center space-y-8">
          <Heading level={2} color="primary" align="center">
            Pourquoi nous choisir ?
          </Heading>
          
          <Body size={1} color="secondary" align="center" className="max-w-2xl mx-auto">
            Plus de 30 ans d'expérience au service de vos projets.
          </Body>

          {/* Sections temporaires pour voir le scroll */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Heading level={4} color="accent">Expertise</Heading>
              <Body size={2} color="muted">
                Plus de 30 ans d'expérience en maîtrise d'œuvre.
              </Body>
            </div>
            
            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Heading level={4} color="accent">Proximité</Heading>
              <Body size={2} color="muted">
                Un accompagnement personnalisé et de proximité.
              </Body>
            </div>
            
            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
              <Heading level={4} color="accent">Confiance</Heading>
              <Body size={2} color="muted">
                Transparence et qualité dans tous nos projets.
              </Body>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}