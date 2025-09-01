import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import Footer from '@/components/layout/Footer';
import AdminFormsCarouselClient from '@/components/ui/AdminFormsCarouselClient';
import MessagesData from '@/components/data/MessagesData';
import DevisData from '@/components/data/DevisData';

// Fonction utilitaire pour générer l'excerpt
const generateExcerpt = (text: string, length = 42) => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export default async function FormsPage() {
  // Navigation pour le header admin
  const adminNavigation = [
    {
      label: "Databases",
      href: "/admin/databases",
      sections: [
        { label: "Équipes", id: "equipes" },
        { label: "Services", id: "services" },
        { label: "Réalisations", id: "realisations" }
      ]
    },
    {
      label: "Formulaires",
      href: "/admin/formulaires",
      sections: [
        { label: "Messages", id: "messages" },
        { label: "Devis", id: "devis" }
      ]
    }
  ];

  // Récupération des données côté serveur
  const [messagesData, devisData] = await Promise.all([MessagesData(), DevisData()]);

  // Génération dynamique des excerpts
  const messagesDatawithExcerpts = messagesData.map(card => ({
    ...card,
    data: { ...card.data, messageExcerpt: generateExcerpt(card.data.fullMessage) }
  }));

  const devisDatawithExcerpts = devisData.map(card => {
    const { projectType, budget } = card.data;
    return {
      ...card,
      data: { ...card.data, devisExcerpt: generateExcerpt(`${projectType} - ${budget}`) }
    };
  });

  

  return (
    <div className="min-h-screen bg-white">
      {/* Header Admin */}
      <Header 
        variant="admin"
        navigation={adminNavigation}
        ctaButton={{ label: "Deconnexion", href: "/" }}
      />

      {/* Section Guide - Intro avec image floutée */}
      <HeroSection
        variant="guide"
        title="Gestion des demandes utilisateurs"
        description="Cette page vous permet de consulter toutes les demandes envoyées par les utilisateurs via les formulaires de contact ou de devis. <br/>
Vous pouvez supprimer des éléments ou voir le detail de l'élément. <br/><br/>

👉 Pour supprimer 🗑 un élément il vous suffit de passer la souris sur la carte en question et un petit boutons apparaitra<br/><br/>

👉 Pour voir le detail 📝 d'une carte, il vous suffit d'appuyer sur le bouton ''voir plus''<br/><br/>

Ainsi, vous gérez tout directement depuis les cartes, sans passer par un autre menu."
        subtitle="Cette page vous permet de gérer les informations importantes du site BT Conseil."
        backgroundImage="/images/acceuil/hero4.jpg"
        imageAlt="Interface de gestion BT Conseil"
      />

      {/* Carousel Message */}
<div id="messages">
        <AdminFormsCarouselClient type="message" title="Gestion des messages" cards={messagesDatawithExcerpts} />
      </div>

      <div id="devis">
        <AdminFormsCarouselClient type="devis" title="Gestion des devis" cards={devisDatawithExcerpts} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}