'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import { AdminFormsCarousel } from '@/components/ui/Carousel';
import Footer from '@/components/layout/Footer';

export default function DatabasePage() {
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

// Fonction utilitaire pour générer l'excerpt
const generateExcerpt = (text: string, length = 42) => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

// Données brutes
const messagesData = [
  // Messages
  {
    type: 'message' as const,
    data: {
      senderName: 'Jena-Baptiste de Quatre-barde',
      email: 'alice.dupont@example.com',
      date: '2025-08-25',
      fullMessage: 'Bonjour, je souhaiterais obtenir des informations sur vos services de rénovation énergétique pour mon appartement situé à Paris.'
    },
    id: 'message-alice-dupont'
  },
  {
    type: 'message' as const,
    data: {
      senderName: 'Marc Lemoine',
      email: 'marc.lemoine@example.com',
      date: '2025-08-26',
      fullMessage: 'Je rencontre un problème avec le devis reçu et j’aimerais qu’on puisse le revoir ensemble. Cordialement, Marc L.'
    },
    id: 'message-marc-lemoine'
  },
  {
    type: 'message' as const,
    data: {
      senderName: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      date: '2025-08-27',
      fullMessage: 'Bonjour, pouvez-vous m’envoyer vos tarifs pour la construction d’une maison individuelle avec 4 chambres ? Merci.'
    },
    id: 'message-sophie-martin'
  },
  {
    type: 'message' as const,
    data: {
      senderName: 'Lucas Bernard',
      email: 'lucas.bernard@example.com',
      date: '2025-08-28',
      fullMessage: 'Je souhaite obtenir un devis pour rénover entièrement la cuisine et la salle de bain de mon appartement à Lyon.'
    },
    id: 'message-lucas-bernard'
  }

];

const devisData = [

  // Devis
  {
    type: 'devis' as const,
    data: {
      clientName: 'Emma Dubois',
      email: 'emma.dubois@example.com',
      phone: '06 12 34 56 78',
      projectType: 'Rénovation appartement',
      budget: '15 000 €',
      date: '2025-08-20'
    },
    id: 'devis-emma-dubois'
  },
  {
    type: 'devis' as const,
    data: {
      clientName: 'Jean-Baptiste De Quatre-Barbe',
      email: 'lucas.morel@example.com',
      phone: '06 23 45 67 89',
      projectType: 'Construction maison individuelle',
      budget: '250 000 €',
      date: '2025-08-21'
    },
    id: 'devis-lucas-morel'
  },
  {
    type: 'devis' as const,
    data: {
      clientName: 'Camille Leroy',
      email: 'camille.leroy@example.com',
      phone: '06 98 76 54 32',
      projectType: 'Extension maison',
      budget: '40 000 €',
      date: '2025-08-22'
    },
    id: 'devis-camille-leroy'
  },
  {
    type: 'devis' as const,
    data: {
      clientName: 'Pierre Garnier',
      email: 'pierre.garnier@example.com',
      phone: '06 11 22 33 44',
      projectType: 'Aménagement bureau',
      budget: '12 000 €',
      date: '2025-08-23'
    },
    id: 'devis-pierre-garnier'
  }
];

// Génération dynamique des excerpts
const messagesDatawithExcerpts = messagesData.map(card => {
    return {
      ...card,
      data: {
        ...card.data,
        messageExcerpt: generateExcerpt(card.data.fullMessage)
      }
    };
});

const devisDatawithExcerpts = devisData.map(card => { 
    const { projectType, budget } = card.data;
    return {
      ...card,
      data: {
        ...card.data,
        devisExcerpt: generateExcerpt(`${projectType} - ${budget}`)
      }
    };
});




  // Handlers pour les actions admin
  const handleEditCard = (type: string, id: string) => {
    console.log(`Edit ${type} card:`, id);
    // Implémentez votre logique d'édition
  };

  const handleDeleteCard = (type: string, id: string) => {
    console.log(`Delete ${type} card:`, id);
    // Implémentez votre logique de suppression
  };

  const handleAddNew = (type: string) => {
    console.log(`Add new ${type}`);
    // Implémentez votre logique d'ajout
  };

  const handleViewMore = (type: string) => {
    console.log(`View more ${type}`);
    // Implémentez votre logique d'ajout
  };

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
  <AdminFormsCarousel
    type="message"
    title="Gestion des messages"
    cards={messagesDatawithExcerpts}  // <== ici, corriger les données
    onDeleteCard={handleDeleteCard}
    onViewMore={handleViewMore}
    className="bg-white"
  />
</div>

{/* Carousel Devis */}
<div id="devis">
  <AdminFormsCarousel
    type="devis"
    title="Gestion des devis"
    cards={devisDatawithExcerpts}  // <== ici, corriger les données
    onDeleteCard={handleDeleteCard}
    onViewMore={handleViewMore}
    className="bg-slate-50"
  />
</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}