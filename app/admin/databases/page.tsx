import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import { AdminDatabaseCarousel } from '@/components/ui/Carousel';
import Footer from '@/components/layout/Footer';
import TeamData from '@/components/data/TeamData';
import ServicesData from '@/components/data/ServicesData';
import RealisationsData from '@/components/data/RealisationsData';
import AdminDatabaseCarouselClient from '@/components/ui/AdminDatabaseCarouselClient'; // version client


export default async function DatabasePage() {
  // Navigation pour le header admin
  const adminNavigation = [
    {
      label: "Databases",
      href: "/admin/databases",
      sections: [
        { label: "Équipes", id: "equipes" },
        { label: "Services", id: "services" },
        { label: "Réalisations", id: "realisations" },
      ],
    },
    {
      label: "Formulaires",
      href: "/admin/formulaires",
      sections: [
        { label: "Messages", id: "messages" },
        { label: "Devis", id: "devis" },
      ],
    },
  ];

  // Appel des composants serveur
  const [teamData, servicesData, realisationsData] = await Promise.all([
    TeamData(),
    ServicesData(),
    RealisationsData(),
  ]);

  // Handlers pour les actions admin
  const handleEditCard = (type: string, id: string) => {
    console.log(`Edit ${type} card:`, id);
  };

  const handleDeleteCard = (type: string, id: string) => {
    console.log(`Delete ${type} card:`, id);
  };

  const handleAddNew = (type: string) => {
    console.log(`Add new ${type}`);
  };

    return (
    <div className="min-h-screen bg-white">
      <Header
        variant="admin"
        navigation={adminNavigation}
        ctaButton={{ label: "Déconnexion", href: "/" }}
      />

      <HeroSection variant="guide" title="Gestion des bases de données" description="Cette page vous permet de gérer les informations importantes du site BT Conseil. <br/> Vous pouvez ajouter, modifier ou supprimer des éléments. <br/><br/> 👉 Pour modifier 🖊 ou supprimer 🗑 un élément il vous suffit de passer la souris sur la carte en quesiont et deux petits boutons apparaitront<br/><br/> 👉 Pour ajouter + un élément, il vous suffit de faire defiler les cartes jusqu'a l'apparition de la carte ''ajouter''<br/><br/> Ainsi, vous gérez tout directement depuis les cartes, sans passer par un autre menu." subtitle="Cette page vous permet de gérer les informations importantes du site BT Conseil." backgroundImage="/images/acceuil/hero4.jpg" imageAlt="Interface de gestion BT Conseil" />

      {/* ✅ On passe les data aux carousels clients */}
      <div id="equipes">
        <AdminDatabaseCarouselClient type="team" title="Gestion de l'équipe" cards={teamData} />
      </div>

      <div id="services">
        <AdminDatabaseCarouselClient type="service" title="Gestion des services" cards={servicesData} />
      </div>

      <div id="realisations">
        <AdminDatabaseCarouselClient type="realisation" title="Gestion des réalisations" cards={realisationsData} />
      </div>

      <Footer />
    </div>
  );
}