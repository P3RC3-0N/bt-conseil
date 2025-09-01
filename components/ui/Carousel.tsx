'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Heading } from '@/components/ui/Typographie';
import Card, {
    TeamCard,
    ServiceCard,
    RealisationCard,
    MessageCard,
    DevisCard,
    AddNewCard
} from '@/components/ui/Card';

// Types pour les données (réutilisation des types Card)
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

type AddNewCardData = {
    label: string;
    description?: string;
};

// Type de carousel
type CarouselVariant = 'user' | 'admin-database' | 'admin-forms';
type CarouselType = 'team' | 'service' | 'realisation' | 'message' | 'devis' | 'add-new';

interface CarouselProps {
    // Configuration
    variant: CarouselVariant;
    type: CarouselType;
    title?: string;

    // Données des cartes
    cards: Array<{
        type: CarouselType;
        data: TeamCardData | ServiceCardData | RealisationCardData | MessageCardData | DevisCardData | AddNewCardData;
        id: string;
    }>;

    // Configuration Admin
    showAddCard?: boolean;
    addCardData?: AddNewCardData;
    onAddNew?: () => void;
    onEditCard?: (type: CarouselType, id: string) => void;
    onDeleteCard?: (type: CarouselType, id: string) => void;
    onViewMore?: (type: CarouselType, id: string, data: any) => void;

    // Configuration affichage
    cardsPerView?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };

    // Style
    className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
    variant,
    type,
    title,
    cards,
    showAddCard = false,
    addCardData,
    onAddNew,
    onEditCard,
    onDeleteCard,
    onViewMore,
    cardsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    className
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Création du tableau de cartes avec la carte "Ajouter" à la fin si nécessaire
    const allCards = [...cards];
    if (showAddCard && addCardData) {
        allCards.push({
            type: 'add-new' as CarouselType,
            data: addCardData as any,
            id: 'add-new'
        });
    }

    const totalCards = allCards.length;

    // Gestion du responsive pour le nombre de cartes visibles
    const [cardsVisible, setCardsVisible] = useState(cardsPerView.desktop);

    const desktopBreakpoint = variant === 'admin-forms' ? 1280 : 1024;

    const gridColsClass = variant === 'admin-forms' ? 'xl:grid-cols-3 xl:mx-20 xl:mb-16' : 'lg:grid-cols-3 lg:mx-20 lg:mb-16';

    useEffect(() => {
        const updateCardsVisible = () => {


            if (window.innerWidth < 768) {
                setCardsVisible(cardsPerView.mobile);
            } else if (window.innerWidth < desktopBreakpoint) {
                setCardsVisible(cardsPerView.tablet);
            } else {
                setCardsVisible(cardsPerView.desktop); // ou une autre logique si besoin
            }
        };

        updateCardsVisible();
        window.addEventListener('resize', updateCardsVisible);
        return () => window.removeEventListener('resize', updateCardsVisible);
    }, [cardsPerView]);

    // Navigation du carousel
    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % totalCards);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const goToPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Calculer les cartes à afficher
    const getVisibleCards = () => {
        const visible = [];
        for (let i = 0; i < cardsVisible; i++) {
            const index = (currentIndex + i) % totalCards;
            visible.push({ ...allCards[index], displayIndex: i });
        }
        return visible;
    };

    // Fonction pour rendre une carte
    const renderCard = (card: typeof allCards[0], index: number) => {
        const isAdmin = variant !== 'user';

        if (card.type === 'add-new') {
            return (
                <AddNewCard
                    key={card.id}
                    data={card.data as AddNewCardData}
                    onClick={onAddNew}
                    className="h-full"
                />
            );
        }

        // Pour le mode formulaire, pas de bouton edit
        const commonProps = {
            isAdmin: variant !== 'user',
            onEdit: variant !== 'admin-forms' ? () => onEditCard?.(card.type, card.id) : undefined,
            onDelete: onDeleteCard ? () => onDeleteCard?.(card.type, card.id) : undefined,
            onClick: variant === 'admin-forms' ? () => onViewMore?.(card.type, card.id, card.data) : undefined,
            className: "h-full"
        };


        switch (card.type) {
            case 'message':
                return <MessageCard key={card.id} data={card.data as MessageCardData} {...commonProps} />;
            case 'team':
                return <TeamCard key={card.id} data={card.data as TeamCardData} {...commonProps} />;
            case 'service':
                return <ServiceCard key={card.id} data={card.data as ServiceCardData} {...commonProps} />;
            case 'realisation':
                return <RealisationCard key={card.id} data={card.data as RealisationCardData} {...commonProps} />;
            case 'devis':
                return <DevisCard key={card.id} data={card.data as DevisCardData} {...commonProps} />;

        }
    };


    if (totalCards === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Aucune carte à afficher</p>
            </div>
        );
    }

    return (
        <section className={cn(
            "py-12 sm:py-16 lg:py-20 w-[100vw]", // Même hauteur que SectionCards
            className
        )}>
            <div className="w-[100%] px-4 sm:px-6 lg:px-8">



                {/* Container du carousel */}
                <div className="relative flex flex-col justify-center items-center">

                    {/* Flèches de navigation */}


                    {/* Container des cartes - Structure grid comme SectionCards */}


                    <div className={`relative grid grid-cols-1 md:grid-cols-2 ${gridColsClass} mx-12 sm:mx-16 gap-8 mb-8 sm:mb-12 max-w-[1224px]`}>



                        {/* Titre du carousel */}
                        {title && (
                            <div className="col-span-full"> {/* Même espacement que SectionCards */}
                                <Heading
                                    level={2}
                                    color="primary"
                                    weight="semibold"
                                    className="text-2xl sm:text-3xl lg:text-4xl" > {/* Même style que SectionCards */}

                                    {title}
                                </Heading>
                            </div>
                        )}

                        <button
                            onClick={goToPrev}
                            disabled={isTransitioning}
                            className={cn(
                                "absolute left-0 top-1/2 -translate-y-1/2 z-20",
                                "w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white shadow-lg rounded-full",
                                "flex items-center justify-center",
                                "hover:bg-gray-50 transition-colors duration-200",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "-translate-x-10 sm:-translate-x-13 lg:-translate-x-16"
                            )}
                            aria-label="Carte précédente"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        <button
                            onClick={goToNext}
                            disabled={isTransitioning}
                            className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2 z-20",
                                "w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white shadow-lg rounded-full",
                                "flex items-center justify-center",
                                "hover:bg-gray-50 transition-colors duration-200",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "translate-x-10 sm:translate-x-13 lg:translate-x-16"
                            )}
                            aria-label="Carte suivante"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                        {getVisibleCards().map((card, index) => (
                            <div key={`${card.id}-${currentIndex + index}`} className="h-full">
                                {renderCard(card, index)}
                            </div>
                        ))}
                    </div>



                    {/* Indicateurs de navigation */}
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: totalCards }).map((_, index) => {
                            const isInCurrentView = getVisibleCards().some(visibleCard =>
                                allCards.findIndex(c => c.id === visibleCard.id) === index
                            );
                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (!isTransitioning) {
                                            setIsTransitioning(true);
                                            setCurrentIndex(index);
                                            setTimeout(() => setIsTransitioning(false), 300);
                                        }
                                    }}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-colors duration-200",
                                        isInCurrentView ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                                    )}
                                    aria-label={`Voir la carte ${index + 1}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Composants spécialisés
export const UserCarousel: React.FC<Omit<CarouselProps, 'variant'>> = (props) => (
    <Carousel variant="user" {...props} />
);

export const AdminDatabaseCarousel: React.FC<Omit<CarouselProps, 'variant'>> = (props) => (
    <Carousel variant="admin-database" showAddCard={true} {...props} />
);

export const AdminFormsCarousel: React.FC<Omit<CarouselProps, 'variant' | 'showAddCard'>> = (props) => (
    <Carousel variant="admin-forms" showAddCard={false} {...props} />
);

export default Carousel;