'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Heading, Body } from '@/components/ui/Typographie';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  className?: string;
  // Liens vers les réseaux sociaux
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  // Mentions légales
  legalText?: string;
}

const Footer: React.FC<FooterProps> = ({
  className,
  socialLinks = {},
  legalText = "© 2025 BT Conseil. Tous droits réservés. | Mentions légales | Politique de confidentialité"
}) => {
  const {
    facebook = "https://facebook.com/btconseil",
    instagram = "https://instagram.com/btconseil", 
    linkedin = "https://linkedin.com/company/btconseil"
  } = socialLinks;

  return (
    <footer className={cn(
      "bg-slate-800 text-white",
      "py-8 sm:py-12",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section réseaux sociaux */}
        <div className="text-center space-y-6 w-auto">
          
          {/* Titre "Nos réseaux sociaux" */}
          <Heading 
            level={3} 
            color="white"
            weight="semibold"
            align="center"
            className="text-xl sm:text-2xl"
          >
            Nos réseaux sociaux
          </Heading>
          
          {/* Ligne avec les 3 icônes */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 px-8 sm:px-20">
            
            {/* Facebook */}
            <a 
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-700 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Suivez-nous sur Facebook"
            >
              <Facebook className="w-6 h-6 text-white group-hover:text-white transition-colors" />
            </a>
            
            {/* Instagram */}
            <a 
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-700 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110"
              aria-label="Suivez-nous sur Instagram"
            >
              <Instagram className="w-6 h-6 text-white group-hover:text-white transition-colors" />
            </a>
            
            {/* LinkedIn */}
            <a 
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-700 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
              aria-label="Suivez-nous sur LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-white group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="border-t border-slate-600 my-8"></div>
        
        {/* Mentions légales */}
        <div className="text-center">
          <Body 
            size={2} 
            color="secondary"
            align="center"
            className="text-gray-400 text-sm leading-relaxed"
          >
            {legalText}
          </Body>
        </div>
      </div>
    </footer>
  );
};

export default Footer;