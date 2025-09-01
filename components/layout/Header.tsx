'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";

type HeaderVariant = 'user' | 'admin';

interface NavigationSection {
  label: string;
  id: string;
}

interface NavigationItem {
  label: string;
  href: string;
  sections?: NavigationSection[];
}

interface HeaderProps {
  variant: HeaderVariant;
  navigation: NavigationItem[];
  ctaButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  variant,
  navigation,
  ctaButton,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (href: string, id?: string) => {
    const isCurrentPage = window.location.pathname === href;

    if (id) {
      if (!isCurrentPage) {
        router.push(href);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (!isCurrentPage) {
      router.push(href);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Nouveau : fonction de déconnexion pour admin
  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // redirection vers login
  };

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-sm bg-white/95 border-b border-gray-200/50",
        isScrolled ? "shadow-lg backdrop-blur-lg" : "shadow-sm",
        className
      )}
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 pl-2 lg:pl-4">
            <a
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              BT Conseil
            </a>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex flex-1 items-center justify-center px-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => handleScrollToSection(item.href)}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
                  >
                    {item.label}
                    {item.sections && <ChevronDown className="ml-1 w-4 h-4" />}
                  </button>
                  {item.sections && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                      {item.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleScrollToSection(item.href, section.id)}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center flex-shrink-0 pr-2 lg:pr-4">
            {variant === "admin" ? (
              <Button
                onClick={handleAdminLogout}
                variant="primary"
                size="md"
                className="px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg"
              >
                Déconnexion
              </Button>
            ) : (
              ctaButton && (
                <Button
                  href={ctaButton.href}
                  onClick={ctaButton.onClick}
                  variant="primary"
                  size="md"
                  className="px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  {ctaButton.label}
                </Button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0 pr-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-colors"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-3">
              {navigation.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center px-4">
                    <button
                      onClick={() => handleScrollToSection(item.href)}
                      className="text-gray-700 font-medium py-2 flex-1 text-left"
                    >
                      {item.label}
                    </button>
                    {item.sections && (
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        className="text-gray-700 p-2"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.sections && openDropdown === item.label && (
                    <div className="pl-6 pt-2 space-y-1">
                      {item.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleScrollToSection(item.href, section.id)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                        >
                          {section.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA Button Mobile */}
              {variant === "admin" ? (
                <div className="px-4 pt-3 border-t border-gray-200/50">
                  <Button
                    onClick={() => {
                      handleAdminLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    size="md"
                    className="w-full py-3 text-sm font-semibold"
                  >
                    Déconnexion
                  </Button>
                </div>
              ) : (
                ctaButton && (
                  <div className="px-4 pt-3 border-t border-gray-200/50">
                    <Button
                      href={ctaButton.href}
                      onClick={() => {
                        ctaButton.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="primary"
                      size="md"
                      className="w-full py-3 text-sm font-semibold"
                    >
                      {ctaButton.label}
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;