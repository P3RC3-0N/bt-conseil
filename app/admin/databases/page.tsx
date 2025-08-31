'use client';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import { AdminDatabaseCarousel } from '@/components/ui/Carousel';
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


  // Données factices pour les équipes
    const teamData = [
    {
      type: 'team' as const,
      data: {
        photo: '/images/a-propos/profil5.jpg',
        name: 'Julien Lefevre',
        position: 'Directeur & Fondateur',
        description: 'Fondateur de BT Conseil, Julien supervise chaque projet avec rigueur et passion, assurant la qualité et le respect des délais.',
        // TODO: Ajouter le champ description dans le composant TeamCard plus tard
      },
      id: 'julien-lefevre'
    },
    {
      type: 'team' as const,
      data: {
        photo: '/images/a-propos/profil2.jpg',
        name: 'Claire Martin',
        position: 'Assistante de direction',
        description: 'Claire organise et coordonne l\'ensemble des activités administratives, facilitant la communication et la logistique des projets.',
        // TODO: Description à intégrer dans TeamCard
      },
      id: 'claire-martin'
    },
    {
      type: 'team' as const,
      data: {
        photo: '/images/a-propos/profil3.jpg',
        name: 'Jean-Baptiste De Quatre-barbe',
        position: 'Comptable',
        description: 'Sophie assure la gestion financière et le suivi budgétaire de chaque projet avec précision et fiabilité.',
        // TODO: Description à intégrer dans TeamCard
      },
      id: 'sophie-dubois'
    },
    {
      type: 'team' as const,
      data: {
        photo: '/images/a-propos/profil4.jpg',
        name: 'Antoine Moreau',
        position: 'Architecte',
        description: 'Spécialiste de la conception architecturale, Antoine transforme vos idées en plans détaillés et veille à la cohérence esthétique des projets.',
        // TODO: Description à intégrer dans TeamCard
      },
      id: 'antoine-moreau'
    }
  ];

  // Données factices pour les services
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

  // Données factices pour les réalisations
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header Admin */}
      <Header 
        variant="admin"
        navigation={adminNavigation}
        ctaButton={{ label: "Voir le site", href: "/" }}
      />

      {/* Section Guide - Intro avec image floutée */}
      <HeroSection
        variant="guide"
        title="Gestion des bases de données"
        description="Cette page vous permet de gérer les informations importantes du site BT Conseil. <br/>
Vous pouvez ajouter, modifier ou supprimer des éléments. <br/><br/>

👉 Pour modifier 🖊 ou supprimer 🗑 un élément il vous suffit de passer la souris sur la carte en quesiont et deux petits boutons apparaitront<br/><br/>

👉 Pour ajouter + un élément, il vous suffit de faire defiler les cartes jusqu'a l'apparition de la carte ''ajouter''<br/><br/>
Ainsi, vous gérez tout directement depuis les cartes, sans passer par un autre menu."
        subtitle="Cette page vous permet de gérer les informations importantes du site BT Conseil."
        backgroundImage="/images/acceuil/hero4.jpg"
        imageAlt="Interface de gestion BT Conseil"
      />

      {/* Carousel Équipe */}
<div id="equipes">
  <AdminDatabaseCarousel
    type="team"
    title="Gestion de l'équipe"
    cards={teamData}
    addCardData={{
      label: "Ajouter un membre",
      description: "Cliquez pour ajouter un nouveau membre à l'équipe"
    }}
    onAddNew={() => handleAddNew('team')}
    onEditCard={handleEditCard}
    onDeleteCard={handleDeleteCard}
    className="bg-white"
  />
</div>

{/* Carousel Services */}
<div id="services">
  <AdminDatabaseCarousel
    type="service"
    title="Gestion des services"
    cards={servicesData}
    addCardData={{
      label: "Ajouter un service",
      description: "Cliquez pour créer un nouveau service"
    }}
    onAddNew={() => handleAddNew('service')}
    onEditCard={handleEditCard}
    onDeleteCard={handleDeleteCard}
    className="bg-slate-50"
  />
</div>

{/* Carousel Réalisations */}
<div id="realisations">
  <AdminDatabaseCarousel
    type="realisation"
    title="Gestion des réalisations"
    cards={realisationsData}
    addCardData={{
      label: "Ajouter une réalisation",
      description: "Cliquez pour ajouter un nouveau projet"
    }}
    onAddNew={() => handleAddNew('realisation')}
    onEditCard={handleEditCard}
    onDeleteCard={handleDeleteCard}
    className="bg-white"
  />
</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}