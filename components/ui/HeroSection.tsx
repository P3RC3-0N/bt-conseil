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
  const sectionHeight = 'h-[200px] sm:h-[33vh] md:h-[50vh]';

  // Classes pour l'alignement du texte
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  // Configuration selon le variant
  const variantConfig = {
    hero: {
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
      width={300}
      height={400}
      blur={variant === 'guide' ? true : config.blur}
      blurIntensity={variant === 'guide' ? "xs" : "md"}  // flou beaucoup plus léger
      overlay
      overlayColor={variant === 'guide' ? 'light' : 'dark'}
      overlayOpacity={config.overlayIntensity}
    />
  </div>

  {/* Contenu en overlay */}
  {variant === 'intro' ? (
    // Layout spécial pour intro
    <div
      className={cn(
        "relative z-20 h-full w-full flex flex-col px-4 sm:px-6 lg:px-8",
        alignStyles[textAlign]
      )}
    >
      <div className="container h-full mx-auto max-w-4xl flex flex-col">
        {/* Titre en haut */}
        {title && (
          <div className="pt-6 sm:pt-8 lg:pt-12 flex-shrink-0">
            <Heading
              level={2}
              color="white"
              weight="semibold"
              align={textAlign}
              className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-lg"
            >
              {title}
            </Heading>
          </div>
        )}

        {/* Sous-titre centré */}
        {subtitle && (
          <div className="flex-grow flex items-center justify-center">
            <Typography
              variant="h5"
              color="white"
              align={textAlign}
              className="text-base sm:text-lg lg:text-xl drop-shadow-md"
            >
              {subtitle}
            </Typography>
          </div>
        )}
      </div>
    </div>
  ) : variant === 'guide' ? (
    // Nouveau layout pour guide
    <div
      className={cn(
        "relative z-20 h-full flex flex-col px-4 sm:px-6 lg:px-8",
        alignStyles[textAlign]
      )}
    >
      <div className="h-full w-[100%] mx-auto flex flex-col">
        {/* Titre en haut */}
        {title && (
          <div className="pt-6 sm:pt-8 lg:pt-12 flex-shrink-0">
            <Heading
              level={2}
              color={config.titleColor}
              weight={config.titleWeight}
              align={textAlign}
              className="text-2xl sm:text-3xl lg:text-4xl drop-shadow-lg"
            >
              {title}
            </Heading>
          </div>
        )}

        {/* Sous-titre centré */}
        {subtitle && (
          <div className="flex-grow h-[100%] lg:h-auto flex translate-x-[0%] lg:translate-x-[100%] items-end justify-center">
            <Typography
              variant={config.subtitleVariant}
              color={config.subtitleColor}
              align={textAlign}
              className="text-base sm:text-lg lg:text-xl drop-shadow-md"
            >
              {subtitle}
            </Typography>
          </div>
        )}

        {/* Description centrée avec glassmorphisme + effet 3D */}
        {description && (
          <div className="flex-grow h-[33%] lg:h-auto translate-x-[100%] lg:translate-x-[0%] flex items-start justify-center">
  <div className="relative flex w-[66%] px-6 py-4 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg 
                  border-t border-l border-white/60 
                  border-b border-r border-white/20">
    <Body
      size={2}
      color={config.subtitleColor}
      align="left"
      className="text-left text-base"
    >
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </Body>

            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    // Layout normal pour hero
    <div
      className={cn(
        "relative z-20 h-full w-full flex px-4 sm:px-6 lg:px-8",
        alignStyles[textAlign]
      )}
    >
      <div className="container h-full mx-auto max-w-4xl flex flex-col justify-between">
        {/* Section supérieure */}
        <div className="space-y-2 sm:space-y-4 lg:space-y-6 pt-4 sm:pt-6 lg:pt-8">
          {title && (
            <Heading
              level={config.titleVariant === 'h1' ? 1 : config.titleVariant === 'h2' ? 2 : 3}
              color={config.titleColor}
              weight={config.titleWeight}
              align={textAlign}
              className="drop-shadow-lg text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {title}
            </Heading>
          )}

          {subtitle && (
            <Typography
              variant={config.subtitleVariant}
              color={config.subtitleColor}
              align={textAlign}
              className="drop-shadow-md text-lg sm:text-xl lg:text-2xl"
            >
              {subtitle}
            </Typography>
          )}

          {description && (
            <Body
              size={1}
              color="white"
              align={textAlign}
              className={cn(
                "max-w-2xl",
                textAlign === 'center' && "mx-auto",
                textAlign === 'right' && "ml-auto",
                "drop-shadow-md"
              )}
            >
              {description}
            </Body>
          )}
        </div>

        {/* CTA */}
        {config.showButton && ctaButton && (
          <div
            className={cn(
              "pb-4 sm:pb-6 lg:pb-8",
              textAlign === 'center' && "flex justify-center",
              textAlign === 'right' && "flex justify-end"
            )}
          >
            <Button
              href={ctaButton.href}
              variant="primary"
              size="md"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl"
            >
              {ctaButton.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )}
</section>


  );
};

export default HeroSection;