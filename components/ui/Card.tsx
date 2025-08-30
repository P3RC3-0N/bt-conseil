'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from '@/components/ui/Image';
import { Heading, Body } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Euro
} from 'lucide-react';

// Types pour les différentes cartes
type CardType = 'team' | 'service' | 'realisation' | 'message' | 'devis' | 'add-new' | 'generic';

interface BaseCardProps {
  type: CardType;
  isAdmin?: boolean;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

interface TeamCardData {
  photo: string;
  name: string;
  position: string;
  description: string;
}

interface ServiceCardData {
  icon: string; // URL ou composant icône
  title: string;
  description: string;
}

interface RealisationCardData {
  photo: string;
  title: string;
  description: string;
  year: string;
  location?: string;
}

interface MessageCardData {
  senderName: string;
  email: string;
  date: string;
  messageExcerpt: string;
  fullMessage?: string;
}

interface DevisCardData {
  clientName: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  date: string;
}

interface GenericCardData {
  image?: string;
  title: string;
  description: string;
}

interface AddNewCardData {
  label: string;
  description?: string;
}

type CardData = TeamCardData | ServiceCardData | RealisationCardData | 
                MessageCardData | DevisCardData | GenericCardData | AddNewCardData;

interface CardProps extends BaseCardProps {
  data: CardData;
}

// Hook pour gérer les modales "Voir plus"
const useCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const openModal = (content: any) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return { isOpen, modalContent, openModal, closeModal };
};

// Composant Modal simple (vous pourrez le remplacer par votre modal)
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// Composant principal Card
const Card: React.FC<CardProps> = ({
  type,
  data,
  isAdmin = false,
  className,
  onEdit,
  onDelete,
  onClick
}) => {
  const { isOpen, modalContent, openModal, closeModal } = useCardModal();

  // Boutons CRUD pour admin
  const renderAdminButtons = () => {
    if (!isAdmin || type === 'add-new') return null;

    return (
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {(type === 'message' || type === 'devis') && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              openModal(data);
            }}
          >
            <Button
              size="sm"
              variant="outline"
              className="p-2 bg-white/90 hover:bg-white"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        >
          <Button
            size="sm"
            variant="outline"
            className="p-2 bg-white/90 hover:bg-white"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <Button
            size="sm"
            variant="outline"
            className="p-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Rendu selon le type
  const renderCardContent = () => {
    switch (type) {
      case 'add-new':
        const addData = data as AddNewCardData;
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <Plus className="w-12 h-12 mb-3" />
            <Heading level={3} className="text-lg mb-2">{addData.label}</Heading>
            {addData.description && (
              <Body size={2} className="text-center text-gray-400">
                {addData.description}
              </Body>
            )}
          </div>
        );

      case 'team':
        const teamData = data as TeamCardData;
        return (
          <>
            <div 
              className="aspect-square w-full mb-4 rounded-lg"
              style={{
                backgroundImage: `url(${teamData.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div className="space-y-2 flex-grow flex flex-col">
              <Heading level={3} className="text-lg font-semibold">
                {teamData.name}
              </Heading>
              <Body size={2} color="primary" className="font-medium">
                {teamData.position}
              </Body>
              <Body size={2} color="secondary" className="flex-grow">
                {teamData.description}
              </Body>
            </div>
          </>
        );

      case 'service':
        const serviceData = data as ServiceCardData;
        return (
          <>
            {/* Icône - hauteur fixe en haut */}
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-50 rounded-lg flex-shrink-0">
              <Image
                src={serviceData.icon}
                alt={serviceData.title}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            
            <div className="flex-grow flex flex-col justify-between space-y-4">
              {/* Zone titre - hauteur minimale pour 3 lignes */}
              <div className="min-h-[1.5rem] lg:min-h-[5.625rem] xl:min-h-[3.75rem] flex items-start">
                <Heading level={3} className="text-lg font-semibold leading-tight">
                  {serviceData.title}
                </Heading>
              </div>
              
              {/* Zone description - prend l'espace restant */}
              <div className="flex-grow">
                <Body size={2} color="secondary" className="leading-relaxed">
                  {serviceData.description}
                </Body>
              </div>
            </div>
          </>
        );

      case 'realisation':
        const realisationData = data as RealisationCardData;
        return (
          <>
            {/* Image - hauteur fixe à 1/3 de la carte */}
            <div 
              className="h-48 w-full mb-4 rounded-lg flex-shrink-0"
              style={{
                backgroundImage: `url(${realisationData.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            <div className="flex-grow flex flex-col justify-between space-y-2">
              {/* Zone titre - hauteur minimale pour 3 lignes */}
              <div className="min-h-[1.5rem] lg:min-h-[5.625rem] xl:min-h-[3.75rem] flex items-start">
                <Heading level={3} className="text-lg font-semibold leading-tight">
                  {realisationData.title}
                </Heading>
              </div>
              
              {/* Zone description - prend l'espace restant */}
              <div className="flex-grow">
                <Body size={2} color="secondary" className="leading-relaxed">
                  {realisationData.description}
                </Body>
              </div>
              
              {/* Zone date/lieu - hauteur fixe en bas */}
              <div className="h-8 flex items-center gap-4 text-sm text-gray-500 mt-auto">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {realisationData.year}
                </div>
                {realisationData.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {realisationData.location}
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case 'message':
        const messageData = data as MessageCardData;
        return (
          <>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Heading level={3} className="text-lg font-semibold">
                    {messageData.senderName}
                  </Heading>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    {messageData.email}
                  </div>
                </div>
                <Body size={2} color="secondary">
                  {messageData.date}
                </Body>
              </div>
              <Body size={2} color="secondary" className="line-clamp-4">
                {messageData.messageExcerpt}
              </Body>
            </div>
          </>
        );

      case 'devis':
        const devisData = data as DevisCardData;
        return (
          <>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Heading level={3} className="text-lg font-semibold">
                    {devisData.clientName}
                  </Heading>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      {devisData.email}
                    </div>
                    {devisData.phone && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        {devisData.phone}
                      </div>
                    )}
                  </div>
                </div>
                <Body size={2} color="secondary">
                  {devisData.date}
                </Body>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Body size={2} className="font-medium mb-1">
                  {devisData.projectType}
                </Body>
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <Euro className="w-4 h-4" />
                  {devisData.budget}
                </div>
              </div>
            </div>
          </>
        );

      case 'generic':
        const genericData = data as GenericCardData;
        return (
          <>
            {genericData.image && (
              <div 
                className="aspect-[4/3] w-full mb-4 rounded-lg"
                style={{
                  backgroundImage: `url(${genericData.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
            <div className="space-y-3 flex-grow flex flex-col">
              <Heading level={3} className="text-lg font-semibold">
                {genericData.title}
              </Heading>
              <Body size={2} color="secondary" className="flex-grow">
                {genericData.description}
              </Body>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Rendu de la modale pour messages et devis
  const renderModal = () => {
    if (type === 'message' && modalContent) {
      const data = modalContent as MessageCardData;
      return (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <Heading level={2} className="text-xl mb-2">Message de {data.senderName}</Heading>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {data.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {data.date}
              </div>
            </div>
          </div>
          <Body size={1}>
            {data.fullMessage || data.messageExcerpt}
          </Body>
        </div>
      );
    }

    if (type === 'devis' && modalContent) {
      const data = modalContent as DevisCardData;
      return (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <Heading level={2} className="text-xl mb-2">Demande de devis - {data.clientName}</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {data.email}
              </div>
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.phone}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {data.date}
              </div>
              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4" />
                Budget: {data.budget}
              </div>
            </div>
          </div>
          <div>
            <Heading level={3} className="text-lg mb-2">Type de projet</Heading>
            <Body size={1}>{data.projectType}</Body>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={cn(
          "relative bg-white rounded-lg shadow-sm border border-gray-200 p-6",
          "hover:shadow-md transition-shadow duration-200",
          "group h-full flex flex-col", // Ajout de h-full et flex flex-col
          onClick && "cursor-pointer",
          type === 'add-new' && "border-dashed hover:shadow-none",
          className
        )}
        onClick={onClick}
      >
        {renderCardContent()}
        {renderAdminButtons()}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {renderModal()}
      </Modal>
    </>
  );
};

// Composants spécialisés pour faciliter l'usage
export const TeamCard: React.FC<{ data: TeamCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="team" data={data} {...props} />
);

export const ServiceCard: React.FC<{ data: ServiceCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="service" data={data} {...props} />
);

export const RealisationCard: React.FC<{ data: RealisationCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="realisation" data={data} {...props} />
);

export const MessageCard: React.FC<{ data: MessageCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="message" data={data} {...props} />
);

export const DevisCard: React.FC<{ data: DevisCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="devis" data={data} {...props} />
);

export const GenericCard: React.FC<{ data: GenericCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="generic" data={data} {...props} />
);

export const AddNewCard: React.FC<{ data: AddNewCardData } & Omit<BaseCardProps, 'type'>> = ({ data, ...props }) => (
  <Card type="add-new" data={data} {...props} />
);

export default Card;