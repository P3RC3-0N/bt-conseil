'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from '@/components/ui/Image';
import Typography, { Heading, Body } from '@/components/ui/Typographie';
import Button from '@/components/ui/Button';

type SectionLayout = 'image-left' | 'image-right';

interface SectionProps {
  layout: SectionLayout;
  
  // Contenu
  title: string;
  description: string;
  
  // Image
  image: {
    src: string;
    alt: string;
  };
  
  // Bouton optionnel
  ctaButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  
  // Style
  backgroundColor?: 'white' | 'gray' | 'blue';
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  layout,
  title,
  description,
  image,
  ctaButton,
  backgroundColor = 'white',
  className
}) => {
  // Classes pour les backgrounds
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    blue: 'bg-blue-50'
  };

  // Ordre des colonnes selon le layout
  const isImageLeft = layout === 'image-left';

  return (
    <section className={cn(
      "py-12 sm:py-16 lg:py-20",
      backgroundStyles[backgroundColor],
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center",
          "lg:gap-x-16"
        )}>
          
          {/* Image */}
          <div className={cn(
            "lg:col-span-1",
            // Ordre responsive basé sur la position
            isImageLeft 
              ? "order-1 lg:order-1"  // Image à gauche : reste au-dessus en mobile
              : "order-2 lg:order-2"  // Image à droite : passe en dessous en mobile
          )}>
            <div className="relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 sm:h-72 lg:h-80"
                rounded
                containerClassName="shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>

          {/* Contenu */}
          <div className={cn(
            "lg:col-span-2",
            // Ordre responsive basé sur la position
            isImageLeft 
              ? "order-2 lg:order-2"  // Image à gauche : texte après en mobile
              : "order-1 lg:order-1"  // Image à droite : texte avant en mobile
            ,
            "space-y-4 sm:space-y-6"
          )}>
            
            {/* Titre */}
            <Heading 
              level={2} 
              color="primary" 
              weight="semibold"
              className="text-xl sm:text-2xl lg:text-3xl"
            >
              {title}
            </Heading>

            {/* Description */}
            <Body 
              size={1} 
              color="secondary"
              className="text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Body>

            {/* Bouton optionnel */}
            {ctaButton && (
              <div className="pt-2">
                <Button
                  href={ctaButton.href}
                  onClick={ctaButton.onClick}
                  variant={ctaButton.variant || 'outline'}
                  size="md"
                  className="text-sm sm:text-base"
                >
                  {ctaButton.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composants spécialisés pour faciliter l'usage
export const ImageLeftSection: React.FC<Omit<SectionProps, 'layout'>> = (props) => (
  <Section layout="image-left" {...props} />
);

export const ImageRightSection: React.FC<Omit<SectionProps, 'layout'>> = (props) => (
  <Section layout="image-right" {...props} />
);

export default Section;