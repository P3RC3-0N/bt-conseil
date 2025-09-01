import Header from '@/components/layout/Header';
import LoginForm from "@/components/ui/LoginForm";
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  // Navigation pour le header user
  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <div className="bg-white flex flex-col">
      {/* Header User */}
      <Header 
        variant="user"
        navigation={userNavigation}
        ctaButton={{ label: "Demander un devis", href: "/devis" }}
      />

      <main className="flex-grow flex justify-center items-center h-[75vh]">
        <LoginForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}