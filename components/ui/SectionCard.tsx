'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';
import Card, { 
  TeamCard, 
  ServiceCard, 
  RealisationCard,
  MessageCard,
  DevisCard,
  GenericCard,
  AddNewCard 
} from '@/components/ui/Card';

// Types pour les données des cartes (réutilisation des types du composant Card)
type TeamCardData = {
  photo: string;
  name: string;
  position: string;
  description: string;
};

type ServiceCardData = {
  icon: string;
  title: string;
  description: string;
};

type RealisationCardData = {
  photo: string;
  title: string;
  description: string;
  year: string;
  location?: string;
};

type MessageCardData = {
  senderName: string;
  email: string;
  date: string;
  messageExcerpt: string;
  fullMessage?: string;
};

type DevisCardData = {
  clientName: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  date: string;
};

type GenericCardData = {
  image?: string;
  title: string;
  description: string;
};

type AddNewCardData = {
  label: string;
  description?: string;
};

// Type pour définir le type de section
type SectionType = 'team' | 'service' | 'realisation' | 'message' | 'devis' | 'generic';

// Mapping des routes selon le type de section
const sectionRoutes: Record<SectionType, string> = {
  team: '/equipe',
  service: '/services',
  realisation: '/realisations',
  message: '/admin/messages',
  devis: '/admin/devis',
  generic: '#'
};

// Mapping des labels de boutons selon le type de section
const sectionButtonLabels: Record<SectionType, string> = {
  team: 'Découvrir notre équipe',
  service: 'Voir tous nos services',
  realisation: 'Voir toutes nos réalisations',
  message: 'Voir tous les messages',
  devis: 'Voir tous les devis',
  generic: 'En savoir plus'
};

interface SectionCardsProps {
  // Configuration de la section
  sectionType: SectionType;
  title: string;
  
  // Données des cartes
  cards: Array<
    | { type: 'team'; data: TeamCardData; id?: string }
    | { type: 'service'; data: ServiceCardData; id?: string }
    | { type: 'realisation'; data: RealisationCardData; id?: string }
    | { type: 'message'; data: MessageCardData; id?: string }
    | { type: 'devis'; data: DevisCardData; id?: string }
    | { type: 'generic'; data: GenericCardData; id?: string }
    | { type: 'add-new'; data: AddNewCardData; id?: string }
  >;
  
  // Configuration du bouton
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  
  // Mode admin
  isAdmin?: boolean;
  onEditCard?: (type: SectionType, id: string) => void;
  onDeleteCard?: (type: SectionType, id: string) => void;
  onClickCard?: (type: SectionType, id: string) => void;
  
  // Style
  backgroundColor?: 'white' | 'gray' | 'blue';
  className?: string;
}

const SectionCards: React.FC<SectionCardsProps> = ({
  sectionType,
  title,
  cards,
  showButton = true,
  buttonLabel,
  buttonHref,
  onButtonClick,
  isAdmin = false,
  onEditCard,
  onDeleteCard,
  onClickCard,
  backgroundColor = 'white',
  className
}) => {
  // Classes pour les backgrounds
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    blue: 'bg-blue-50'
  };

  // Fonction pour rendre une carte selon son type
  const renderCard = (card: typeof cards[0], index: number) => {
    const cardId = card.id || index.toString();
    
    const commonProps = {
      isAdmin,
      onEdit: () => onEditCard?.(sectionType, cardId),
      onDelete: () => onDeleteCard?.(sectionType, cardId),
      onClick: () => onClickCard?.(sectionType, cardId),
    };

    switch (card.type) {
      case 'team':
        return <TeamCard key={cardId} data={card.data} {...commonProps} />;
      case 'service':
        return <ServiceCard key={cardId} data={card.data} {...commonProps} />;
      case 'realisation':
        return <RealisationCard key={cardId} data={card.data} {...commonProps} />;
      case 'message':
        return <MessageCard key={cardId} data={card.data} {...commonProps} />;
      case 'devis':
        return <DevisCard key={cardId} data={card.data} {...commonProps} />;
      case 'generic':
        return <GenericCard key={cardId} data={card.data} {...commonProps} />;
      case 'add-new':
        return <AddNewCard key={cardId} data={card.data} {...commonProps} />;
      default:
        return null;
    }
  };

  // Détermine l'href du bouton
  const getButtonHref = () => {
    if (buttonHref) return buttonHref;
    return sectionRoutes[sectionType] || '#';
  };

  // Détermine le label du bouton
  const getButtonLabel = () => {
    if (buttonLabel) return buttonLabel;
    return sectionButtonLabels[sectionType] || 'En savoir plus';
  };

  return (
    <section className={cn(
      "py-12 sm:py-16 lg:py-20",
      backgroundStyles[backgroundColor],
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de la section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <Heading 
            level={2} 
            color="primary" 
            weight="semibold"
            className="text-2xl sm:text-3xl lg:text-4xl"
          >
            {title}
          </Heading>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {cards.map((card, index) => {
            // Logique d'affichage responsive
            const shouldShow = 
              (typeof window !== 'undefined' && window.innerWidth >= 1024) || // Desktop: toutes les cartes
              (typeof window !== 'undefined' && window.innerWidth >= 768 && index < 2) || // Tablette: 2 premières cartes
              (typeof window !== 'undefined' && window.innerWidth < 768 && index < 1) || // Mobile: 1ère carte seulement
              (typeof window === 'undefined'); // SSR: afficher toutes (sera ajusté côté client)

            return (
              <div 
                key={card.id || index}
                className={`
                  ${index == 0 ? 'block' : ''}
                  ${index == 1 ? 'hidden md:block' : ''} 
                  ${index == 2 ? 'hidden lg:block' : ''} 
                  ${index > 2 ? 'hidden' : ''}
                `}
              >
                {renderCard(card, index)}
              </div>
            );
          })}
        </div>

        {/* Bouton "En savoir plus" */}
        {showButton && (
          <div className="flex justify-center">
            <Button
              href={onButtonClick ? undefined : getButtonHref()}
              onClick={onButtonClick}
              variant="primary"
              size="md"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
            >
              {getButtonLabel()}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// Composants spécialisés pour faciliter l'usage
export const TeamSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="team" {...props} />
);

export const ServiceSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="service" {...props} />
);

export const RealisationSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="realisation" {...props} />
);

export const MessageSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="message" {...props} />
);

export const DevisSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="devis" {...props} />
);

export const GenericSection: React.FC<Omit<SectionCardsProps, 'sectionType'>> = (props) => (
  <SectionCards sectionType="generic" {...props} />
);

export default SectionCards;