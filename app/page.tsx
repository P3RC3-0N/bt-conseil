import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { ServiceSection, RealisationSection } from '@/components/ui/SectionCard';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';
import Typography, { Heading, Body } from '@/components/ui/Typographie';

export default async function Home() {
  // Navigation
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  // --- FETCH SERVICES ---
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (servicesError) console.error(servicesError);

  const servicesData = services?.map(service => ({
    type: 'service' as const,
    data: {
      icon: service.icon_url || '/icons/default-service.svg',
      title: service.title,
      description: service.description
    },
    id: service.id
  })) || [];

  // --- FETCH REALISATIONS ---
  const { data: realisations, error: realisationsError } = await supabase
    .from('realisations')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (realisationsError) console.error(realisationsError);

  const realisationsData = realisations?.map(item => ({
    type: 'realisation' as const,
    data: {
      photo: item.photo_url || '/images/default-realisation.jpg',
      title: item.title,
      description: item.description,
      year: item.year,
      location: item.location
    },
    id: item.id
  })) || [];

  // Données des services pour la section

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