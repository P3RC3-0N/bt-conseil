"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/ui/LoginForm";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // Vérifie si l'email correspond à ton admin
      if (session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) return null; // ou un spinner

  const userNavigation = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" }
  ];

  if (!isAdmin) {
    // Page de login avec ton design existant
    return (
      <div className="bg-white flex flex-col min-h-screen">
        <Header
          variant="user"
          navigation={userNavigation}
          ctaButton={{ label: "Demander un devis", href: "/devis" }}
        />
        <main className="flex-grow flex justify-center items-center h-[75vh]">
          <LoginForm redirectAfterLogin="/admin/databases" />
        </main>
        <Footer />
      </div>
    );
  }

  // Admin connecté : afficher les pages protégées
  return <>{children}</>;
}
