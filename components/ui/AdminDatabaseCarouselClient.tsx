// components/ui/AdminDatabaseCarouselClient.tsx
"use client";

import { AdminDatabaseCarousel } from "@/components/ui/Carousel";

type Props = {
  type: "team" | "service" | "realisation";
  title: string;
  cards: any[];
};

export default function AdminDatabaseCarouselClient({ type, title, cards }: Props) {
  const handleEditCard = (id: string) => {
    console.log(`✏️ Edit ${type} card:`, id);
    // futur supabaseBrowser.update(...)
  };

  const handleDeleteCard = (id: string) => {
    console.log(`🗑 Delete ${type} card:`, id);
    // futur supabaseBrowser.delete(...)
  };

  const handleAddNew = () => {
    console.log(`➕ Add new ${type}`);
    // futur supabaseBrowser.insert(...)
  };

  return (
    <AdminDatabaseCarousel
      type={type}
      title={title}
      cards={cards}
      addCardData={{
        label: `Ajouter ${type === "team" ? "un membre" : type === "service" ? "un service" : "une réalisation"}`,
        description: `Cliquez pour ajouter ${type === "team" ? "un nouveau membre" : type === "service" ? "un nouveau service" : "un nouveau projet"}`,
      }}
      onAddNew={handleAddNew}
      onEditCard={handleEditCard}
      onDeleteCard={handleDeleteCard}
      className={type === "service" ? "bg-slate-50" : "bg-white"}
    />
  );
}
