'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Typography from '@/components/ui/Typographie';

// Types pour la navigation
interface NavigationItem {
  label: string;
  href?: string;
  submenu?: NavigationItem[];
  onClick?: () => void;
}

interface HeaderProps {
  variant: 'user' | 'admin';
  navigation: NavigationItem[];
  ctaButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({
  variant,
  navigation,
  ctaButton
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  // Toggle dropdown pour desktop
  const toggleDropdown = (label: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(label)) {
      newOpenDropdowns.delete(label);
    } else {
      newOpenDropdowns.add(label);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  // Fermer tous les dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns(new Set());
  };

  // Vérifier si un lien est actif
  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  // Composant NavigationLink
  const NavigationLink: React.FC<{ item: NavigationItem; isMobile?: boolean }> = ({ 
    item, 
    isMobile = false 
  }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isDropdownOpen = openDropdowns.has(item.label);

    if (!hasSubmenu) {
      // Lien simple sans sous-menu
      const LinkComponent = item.href ? Link : 'button';
      return (
        <LinkComponent
          href={item.href || '#'}
          onClick={item.onClick}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive(item.href) 
              ? "text-blue-700 bg-blue-50" 
              : "text-slate-700 hover:text-blue-700 hover:bg-slate-50",
            isMobile && "block w-full text-left"
          )}
        >
          {item.label}
        </LinkComponent>
      );
    }

    // Lien avec sous-menu (votre logique de flèche séparée)
    return (
      <div className={cn("relative", isMobile && "w-full")}>
        <div className={cn("flex items-center", isMobile && "w-full")}>
          {/* Zone principale cliquable */}
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-l-md text-sm font-medium transition-colors flex-1",
                isActive(item.href) 
                  ? "text-blue-700 bg-blue-50" 
                  : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
              )}
              onClick={closeAllDropdowns}
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-3 py-2 text-sm font-medium text-slate-700 flex-1">
              {item.label}
            </span>
          )}

          {/* Bouton flèche séparé */}
          <button
            onClick={() => toggleDropdown(item.label)}
            className={cn(
              "p-2 rounded-r-md text-slate-700 hover:text-blue-700 hover:bg-slate-50 transition-colors",
              isDropdownOpen && "text-blue-700 bg-blue-50"
            )}
          >
            <ChevronDown 
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Sous-menu dropdown */}
        {isDropdownOpen && (
          <div className={cn(
            "absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 min-w-48",
            isMobile && "relative mt-2 w-full"
          )}>
            {item.submenu?.map((subItem) => (
              <Link
                key={subItem.label}
                href={subItem.href || '#'}
                onClick={() => {
                  closeAllDropdowns();
                  setIsMobileMenuOpen(false);
                  subItem.onClick?.();
                }}
                className={cn(
                  "block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors",
                  "first:rounded-t-md last:rounded-b-md",
                  isActive(subItem.href) && "text-blue-700 bg-blue-50"
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href={variant === 'admin' ? '/admin' : '/'} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center">
                <Typography variant="overline" color="white" weight="bold">
                  BT
                </Typography>
              </div>
              <Typography variant="h6" color="primary" weight="semibold">
                BT Conseil
              </Typography>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavigationLink key={item.label} item={item} />
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center">
            {ctaButton && (
              <>
                {ctaButton.href ? (
                  <Link
                    href={ctaButton.href}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      variant === 'admin' 
                        ? "text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                        : "text-white bg-blue-700 hover:bg-blue-800"
                    )}
                  >
                    {variant === 'admin' && <LogOut className="w-4 h-4 mr-2 inline" />}
                    {ctaButton.label}
                  </Link>
                ) : (
                  <button
                    onClick={ctaButton.onClick}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                      variant === 'admin' 
                        ? "text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                        : "text-white bg-blue-700 hover:bg-blue-800"
                    )}
                  >
                    {variant === 'admin' && <LogOut className="w-4 h-4 mr-2" />}
                    {ctaButton.label}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Menu Hamburger Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-blue-700 hover:bg-slate-50"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavigationLink key={item.label} item={item} isMobile />
              ))}
              
              {/* CTA Button Mobile */}
              {ctaButton && (
                <div className="pt-4 border-t border-slate-200 mt-4">
                  {ctaButton.href ? (
                    <Link
                      href={ctaButton.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block w-full px-4 py-2 rounded-md text-sm font-medium text-center transition-colors",
                        variant === 'admin' 
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                          : "text-white bg-blue-700 hover:bg-blue-800"
                      )}
                    >
                      {variant === 'admin' && <LogOut className="w-4 h-4 mr-2 inline" />}
                      {ctaButton.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        ctaButton.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "block w-full px-4 py-2 rounded-md text-sm font-medium text-center transition-colors",
                        variant === 'admin' 
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                          : "text-white bg-blue-700 hover:bg-blue-800"
                      )}
                    >
                      {variant === 'admin' && <LogOut className="w-4 h-4 mr-2 inline" />}
                      {ctaButton.label}
                    </button>
                  )}
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