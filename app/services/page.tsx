import { supabase } from '@/lib/supabase';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Section from '@/components/ui/Section';
import { ContactBandeau } from '@/components/ui/Bandeau';
import Footer from '@/components/layout/Footer';

export default async function ServicesPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

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

      {/* Sections dynamiques pour chaque service */}
      {services?.map((service, index) => (
        <Section
          key={service.id}
          layout={index % 2 === 0 ? 'image-right' : 'image-left'} // alterne droite/gauche
          title={service.title}
          description={service.description}
          image={{
            src: service.photo_url || '/images/services/default.jpg',
            alt: service.title
          }}
          backgroundColor={index % 2 === 0 ? 'white' : 'gray'} // alterne couleurs
        />
      ))}


      {/* Bandeau Contact */}
      <ContactBandeau />

      {/* Footer */}
      <Footer />
    </div>
  );
}