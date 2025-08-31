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
    variant: 'user' | 'admin-database' | 'admin-forms';
    type: 'team' | 'service' | 'realisation' | 'message' | 'devis' | 'add-new';
    title?: string;
    cards: Array<{
        type: 'team' | 'service' | 'realisation' | 'message' | 'devis' | 'add-new';
        data: any;
        id: string;
    }>;
    showAddCard?: boolean;
    addCardData?: any;
    onAddNew?: () => void;
    onEditCard?: (type: string, id: string) => void;
    onDeleteCard?: (type: string, id: string) => void;
    onViewMore?: (type: string, id: string, data: any) => void;
    cardsPerView?: { mobile: number; tablet: number; desktop: number };
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
    const [cardsVisible, setCardsVisible] = useState(cardsPerView.desktop);
    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

    // Création du tableau de cartes avec la carte "Ajouter" à la fin si nécessaire
    const allCards = [...cards];
    if (showAddCard && addCardData) allCards.push({ type: 'add-new', data: addCardData, id: 'add-new' });
    const totalCards = allCards.length;

    const desktopBreakpoint = variant === 'admin-forms' ? 1280 : 1024;
    useEffect(() => {
        const updateCardsVisible = () => {
            if (window.innerWidth < 768) setCardsVisible(cardsPerView.mobile);
            else if (window.innerWidth < desktopBreakpoint) setCardsVisible(cardsPerView.tablet);
            else setCardsVisible(cardsPerView.desktop);
        };
        updateCardsVisible();
        window.addEventListener('resize', updateCardsVisible);
        return () => window.removeEventListener('resize', updateCardsVisible);
    }, [cardsPerView]);

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
    // Navigation
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

    // Cartes visibles
    const getVisibleCards = () => {
        const visible = [];
        for (let i = 0; i < cardsVisible; i++) {
            const index = (currentIndex + i) % totalCards;
            visible.push({ ...allCards[index], displayIndex: i });
        }
        return visible;
    };

    // Calcul de la hauteur max après chaque rendu
    useEffect(() => {
        const heights = cardsRef.current.map(card => card?.offsetHeight || 0);
        setMaxCardHeight(Math.max(...heights, 0));
    }, [currentIndex, cardsVisible, cards]);

    // Render carte
    const renderCard = (card: typeof allCards[0], index: number) => {
        const commonProps = {
            key: card.id,
            isAdmin: variant !== 'user',
            onEdit: onEditCard ? () => onEditCard(card.type, card.id) : undefined,
            onDelete: onDeleteCard ? () => onDeleteCard(card.type, card.id) : undefined,
            onClick: variant === 'admin-forms' ? () => onViewMore?.(card.type, card.id, card.data) : undefined,
            className: "h-full"
        };
        if (card.type === 'add-new') return <AddNewCard key={card.id} data={card.data} onClick={onAddNew} className="h-full" />;
        switch (card.type) {
            case 'team': return <TeamCard data={card.data} {...commonProps} />;
            case 'service': return <ServiceCard data={card.data} {...commonProps} />;
            case 'realisation': return <RealisationCard data={card.data} {...commonProps} />;
            case 'message': return <MessageCard data={card.data} {...commonProps} />;
            case 'devis': return <DevisCard data={card.data} {...commonProps} />;
            default: return null;
        }
    };

    if (totalCards === 0) return <div className="text-center py-12"><p className="text-gray-500">Aucune carte à afficher</p></div>;

    return (
        <section className={cn("pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 w-[100vw]", className)}>
            <div className="w-[100%] sm:px-6 lg:px-8">
                <div className="relative flex flex-col justify-center items-cente p-4">



                    {/* Container cartes avec hauteur fixe dynamique */}
                    <div
                        className="grid gap-4 max-w-[1224px] p-4 items-center"
                        style={{
                            minHeight: `${maxCardHeight}px`,
                            gridTemplateAreas: `
      "left-arrow title right-arrow"
      "left-arrow cards right-arrow"
      "left-arrow indicators right-arrow"
    `,
                            gridTemplateColumns: "auto auto auto", // colonnes ajustées
                            gridTemplateRows: "auto 1fr auto"
                        }}
                    >
                        {/* Flèche gauche */}
                        <button
                            onClick={goToPrev}
                            disabled={isTransitioning}
                            style={{ gridArea: "left-arrow" }}
                            className="flex justify-center items-center z-20"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Flèche droite */}
                        <button
                            onClick={goToNext}
                            disabled={isTransitioning}
                            style={{ gridArea: "right-arrow" }}
                            className="flex justify-center items-center z-20"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Titre */}
                        {title && (
                            <div style={{ gridArea: "title" }} className="flex justify-center">
                                <Heading
                                    level={2}
                                    color="primary"
                                    weight="semibold"
                                    className="text-2xl sm:text-3xl lg:text-4xl"
                                >
                                    {title}
                                </Heading>
                            </div>
                        )}

                        {/* Cartes */}
                        <div
                            style={{
                                gridArea: "cards",
                                display: "grid",
                                gridTemplateColumns: `repeat(${cardsVisible}, minmax(200px, 1fr))`,
                                gap: "1rem",
                                justifyContent: "center"
                            }}
                        >
                            {getVisibleCards().map((card, index) => (
                                <div
                                    key={`${card.id}-${currentIndex + index}`}
                                    ref={el => { cardsRef.current[index] = el; }}
                                    className="relative h-full"
                                >
                                    {renderCard(card, index)}
                                </div>
                            ))}
                        </div>

                        {/* Indicateurs */}
                        <div style={{ gridArea: "indicators" }} className="flex justify-center gap-2">
                            {Array.from({ length: totalCards }).map((_, index) => {
                                const isInCurrentView = getVisibleCards().some(
                                    vc => allCards.findIndex(c => c.id === vc.id) === index
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
                                            isInCurrentView
                                                ? "bg-blue-600"
                                                : "bg-gray-300 hover:bg-gray-400"
                                        )}
                                        aria-label={`Voir la carte ${index + 1}`}
                                    />
                                );
                            })}
                        </div>
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