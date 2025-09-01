'use client';

import { AdminFormsCarousel } from '@/components/ui/Carousel';

type Props = {
  type: 'message' | 'devis';
  title: string;
  cards: any[];
};

export default function AdminFormsCarouselClient({ type, title, cards }: Props) {
  const handleDeleteCard = (id: string) => {
    console.log(`Delete ${type} card:`, id);
    // Ici, tu peux ajouter un appel Supabase pour supprimer la carte
  };

  const handleViewMore = (id: string) => {
    console.log(`View more ${type} card:`, id);
  };

  return (
    <AdminFormsCarousel
      type={type}
      title={title}
      cards={cards}
      onDeleteCard={handleDeleteCard}
      onViewMore={handleViewMore}
      className={type === 'devis' ? 'bg-slate-50' : 'bg-white'}
    />
  );
}
