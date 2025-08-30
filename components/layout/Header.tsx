'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

type HeaderVariant = 'user' | 'admin';

interface NavigationItem {
  label: string;
  href: string;
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
  className
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détecter le scroll pour ajuster l'ombre
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
      // Effet glassmorphism renforcé + ombre dynamique
      "backdrop-blur-sm bg-white/95 border-b border-gray-200/50",
      isScrolled ? "shadow-lg backdrop-blur-lg" : "shadow-sm",
      className
    )}>
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo - Minimum de largeur, collé à gauche */}
          <div className="flex-shrink-0 pl-2 lg:pl-4">
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              BT Conseil
            </a>
          </div>

          {/* Navigation Desktop - Centrée dans l'espace restant */}
          <nav className="hidden lg:flex flex-1 items-center justify-center px-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  {/* Underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </nav>

          {/* CTA Button Desktop - Minimum de largeur, collé à droite */}
          <div className="hidden lg:flex items-center flex-shrink-0 pr-2 lg:pr-4">
            {ctaButton && (
              <Button
                href={ctaButton.href}
                onClick={ctaButton.onClick}
                variant="primary"
                size="md"
                className="px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg"
              >
                {ctaButton.label}
              </Button>
            )}
          </div>

          {/* Mobile menu button - Collé à droite */}
          <div className="lg:hidden flex-shrink-0 pr-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/50 transition-colors"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-3">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* CTA Button Mobile */}
              {ctaButton && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;