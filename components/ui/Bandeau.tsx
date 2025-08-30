'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';

type BandeauType = 'contact' | 'devis';

interface BandeauProps {
  type: BandeauType;
  className?: string;
  onButtonClick?: () => void;
}

// Configuration des contenus selon le type
const bandeauConfig = {
  contact: {
    slogan: "Une question, un projet ? Parlons-en dès aujourd'hui.",
    buttonLabel: "Nous contacter",
    buttonHref: "/contact"
  },
  devis: {
    slogan: "Obtenez votre devis personnalisé en quelques clics.",
    buttonLabel: "Demander un devis", 
    buttonHref: "/devis"
  }
};

const Bandeau: React.FC<BandeauProps> = ({
  type,
  className,
  onButtonClick
}) => {
  const config = bandeauConfig[type];

  return (
    <section className={cn(
      "relative overflow-hidden w-full",
      "h-[15vh] sm:h-[20vh] lg:h-[15vh]", // 25vh par défaut, 15vh sur lg+
      className
    )}>
      {/* Fond bleu complet */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700">
        {/* Motifs décoratifs sur tout le fond */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots-overlay" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots-overlay)" />
          </svg>
        </div>
        
        {/* Formes géométriques subtiles réparties */}
        <div className="absolute top-2 left-8 w-10 h-10 border-2 border-white/15 rounded-full"></div>
        <div className="absolute bottom-2 left-20 w-6 h-6 bg-white/8 rounded rotate-45"></div>
        <div className="absolute top-1/2 left-32 w-8 h-8 border border-white/12 rounded -rotate-12 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-20 w-12 h-12 border border-white/10 rounded-lg rotate-12"></div>
        <div className="absolute bottom-1/4 right-32 w-4 h-4 bg-white/6 rounded-full"></div>
      </div>

      {/* Overlay transparent à droite - uniquement sur lg+ */}
      <div className="hidden lg:block absolute inset-0">
        <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-white/70" 
             style={{ marginLeft: '60%' }}></div>
      </div>
      
      {/* Layout Desktop (lg+) - 2 divs côte à côte */}
      <div className="hidden lg:grid lg:grid-cols-3 h-full relative z-10">
        
        {/* Div gauche 2/3 - Slogan centré */}
        <div className="lg:col-span-2 h-full flex items-center justify-center px-8">
          <Heading 
            level={2} 
            color="white"
            weight="semibold"
            align="center"
            className="text-xl lg:text-2xl leading-tight drop-shadow-sm"
          >
            {config.slogan}
          </Heading>
        </div>

        {/* Div droite 1/3 - Bouton centré */}
        <div className="lg:col-span-1 h-full flex items-center justify-center px-8">
          <Button
            href={onButtonClick ? undefined : config.buttonHref}
            onClick={onButtonClick}
            variant="primary"
            size="lg"
            className="px-6 py-3 text-base font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 bg-white text-blue-600 hover:bg-gray-50 border-0"
          >
            {config.buttonLabel}
          </Button>
        </div>
      </div>

      {/* Layout Mobile/Tablette (< lg) - Stack vertical */}
      <div className="lg:hidden h-full flex flex-col items-center justify-center px-6 sm:px-8 relative z-10">
        
        {/* Slogan en haut, centré par rapport à toute la largeur */}
        <div className="flex-1 flex items-center justify-center text-center p-2">
          <Heading 
            level={2} 
            color="white"
            weight="semibold"
            align="center"
            className="text-lg sm:text-xl leading-tight drop-shadow-sm max-w-md"
          >
            {config.slogan}
          </Heading>
        </div>
        
        {/* Bouton en bas, centré par rapport à toute la largeur */}
        <div className="flex-1 flex items-center justify-center">
          <Button
            href={onButtonClick ? undefined : config.buttonHref}
            onClick={onButtonClick}
            variant="primary"
            size="md"
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 bg-white text-blue-600 hover:bg-gray-50 border-0"
          >
            {config.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};

// Composants spécialisés
export const ContactBandeau: React.FC<Omit<BandeauProps, 'type'>> = (props) => (
  <Bandeau type="contact" {...props} />
);

export const DevisBandeau: React.FC<Omit<BandeauProps, 'type'>> = (props) => (
  <Bandeau type="devis" {...props} />
);

export default Bandeau;