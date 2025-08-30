'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from '@/components/ui/Image';
import Typography, { Heading, Body } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';

type HeroVariant = 'hero' | 'intro' | 'guide';

interface HeroSectionProps {
  variant: HeroVariant;
  
  // Contenu
  title?: string;
  subtitle?: string;
  description?: string;
  
  // Image
  backgroundImage: string;
  imageAlt: string;
  
  // Bouton (pour variant "hero")
  ctaButton?: {
    label: string;
    href: string;
  };
  
  // Style
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  title,
  subtitle,
  description,
  backgroundImage,
  imageAlt,
  ctaButton,
  textAlign = 'center',
  className
}) => {
  // Hauteur fixe md pour toutes les sections hero
  const sectionHeight = 'h-[200px] sm:h-[33vh] lg:h-[45vh]';

  // Classes pour l'alignement du texte
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  // Configuration selon le variant
  const variantConfig = {
    hero: {
      // Page d'accueil - slogan + bouton
      titleVariant: 'h1' as const,
      titleColor: 'white' as const,
      titleWeight: 'bold' as const,
      subtitleVariant: 'h4' as const,
      subtitleColor: 'white' as const,
      overlayIntensity: 'medium' as const,
      blur: false,
      showButton: true
    },
    intro: {
      // Pages services/réalisations - titre simple
      titleVariant: 'h2' as const,
      titleColor: 'white' as const,
      titleWeight: 'semibold' as const,
      subtitleVariant: 'h5' as const,
      subtitleColor: 'white' as const,
      overlayIntensity: 'medium' as const,
      blur: false,
      showButton: false
    },
    guide: {
      // Pages admin - texte explicatif sur image floutée
      titleVariant: 'h3' as const,
      titleColor: 'primary' as const,
      titleWeight: 'semibold' as const,
      subtitleVariant: 'h6' as const,
      subtitleColor: 'secondary' as const,
      overlayIntensity: 'heavy' as const,
      blur: true,
      showButton: false
    }
  };

  const config = variantConfig[variant];

  return (
    <section className={cn("relative w-full", sectionHeight, className)}>
      {/* Image de background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          blur={config.blur}
          blurIntensity="md"
          overlay
          overlayColor={variant === 'guide' ? 'light' : 'dark'}
          overlayOpacity={config.overlayIntensity}
        />
      </div>

      {/* Contenu en overlay */}
      <div className={cn(
  "relative z-20 h-[100%] w-full flex px-4 sm:px-6 lg:px-8",
  alignStyles[textAlign]
)}>
  <div className="container h-[100%] mx-auto max-w-4xl flex flex-col justify-between">
    
    {/* Section supérieure : Titre + Slogan */}
    <div className="space-y-2 sm:space-y-4 lg:space-y-6 m-[1%]  sm:m-[2%] lg:m-[5%]">
      {/* Titre principal */}
      {title && (
        <Heading
          level={config.titleVariant === 'h1' ? 1 : config.titleVariant === 'h2' ? 2 : 3}
          color={config.titleColor}
          weight={config.titleWeight}
          align={textAlign}
          className={cn(
            "drop-shadow-lg",
            variant === 'hero' && "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
            variant === 'intro' && "text-3xl sm:text-4xl lg:text-5xl",
            variant === 'guide' && "text-2xl sm:text-3xl lg:text-4xl"
          )}
        >
          {title}
        </Heading>
      )}

      {/* Sous-titre */}
      {subtitle && (
        <Typography
          variant={config.subtitleVariant}
          color={config.subtitleColor}
          align={textAlign}
          className={cn(
            variant !== 'guide' && "drop-shadow-md",
            variant === 'hero' && "text-lg sm:text-xl lg:text-2xl",
            variant === 'intro' && "text-base sm:text-lg lg:text-xl",
            variant === 'guide' && "text-sm sm:text-base lg:text-lg"
          )}
        >
          {subtitle}
        </Typography>
      )}

      {/* Description (principalement pour variant "guide") */}
      {description && (
        <Body
          size={1}
          color={variant === 'guide' ? 'secondary' : 'white'}
          align={textAlign}
          className={cn(
            "max-w-2xl",
            textAlign === 'center' && "mx-auto",
            textAlign === 'right' && "ml-auto",
            variant !== 'guide' && "drop-shadow-md"
          )}
        >
          {description}
        </Body>
      )}
    </div>

    {/* Espace central vide - sera automatiquement créé par justify-between */}
    
    {/* Section inférieure : Bouton CTA */}
    {config.showButton && ctaButton && (
      <div className={cn(
        "mt-auto", // Pour s'assurer qu'il reste en bas
        textAlign === 'center' && "flex justify-center",
        textAlign === 'right' && "flex justify-end"
      )}>
        <Button
          href={ctaButton.href}
          variant="primary"
          size="md"
          className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl m-[1%] sm:m-[2%] lg:m-[5%]"
        >
          {ctaButton.label}
        </Button>
      </div>
    )}
  </div>
</div>
    </section>
  );
};

// Composants spécialisés pour faciliter l'usage
export const HeroHome: React.FC<Omit<HeroSectionProps, 'variant'>> = (props) => (
  <HeroSection variant="hero" {...props} />
);

export const IntroSection: React.FC<Omit<HeroSectionProps, 'variant' | 'ctaButton'>> = (props) => (
  <HeroSection variant="intro" {...props} />
);

export const GuideSection: React.FC<Omit<HeroSectionProps, 'variant' | 'ctaButton'>> = (props) => (
  <HeroSection variant="guide" {...props} />
);

export default HeroSection;