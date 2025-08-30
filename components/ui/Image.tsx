'use client';

import React from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  
  // Props spécifiques à notre design system
  blur?: boolean;
  blurIntensity?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
  overlayColor?: 'dark' | 'light' | 'blue';
  overlayOpacity?: 'light' | 'medium' | 'heavy';
  
  // Props de style
  className?: string;
  containerClassName?: string; // Nouvelle prop pour styler le conteneur
  rounded?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  
  // Callbacks
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality = 75,
  
  // Props spécifiques
  blur = false,
  blurIntensity = 'md',
  overlay = false,
  overlayColor = 'dark',
  overlayOpacity = 'medium',
  
  // Style props
  className,
  containerClassName,
  rounded = false,
  objectFit = 'cover',
  
  // Callbacks
  onClick,
  onLoad,
  onError,
  
  ...props
}) => {
  // Classes pour le blur
  const blurStyles = {
    sm: 'blur-sm',
    md: 'blur-md', 
    lg: 'blur-lg'
  };

  // Classes pour l'overlay
  const overlayStyles = {
    dark: {
      light: 'bg-black/20',
      medium: 'bg-black/40', 
      heavy: 'bg-black/60'
    },
    light: {
      light: 'bg-white/20',
      medium: 'bg-white/40',
      heavy: 'bg-white/60'
    },
    blue: {
      light: 'bg-blue-700/20',
      medium: 'bg-blue-700/40',
      heavy: 'bg-blue-700/60'
    }
  };

  // Classes pour l'object-fit
  const objectFitStyles = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        // Pour fill, le conteneur doit avoir des dimensions définies
        fill && "w-full h-full",
        rounded && "rounded-lg",
        onClick && "cursor-pointer",
        containerClassName
      )}
      onClick={onClick}
    >
      {/* Image Next.js */}
      <NextImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes || (fill ? "100vw" : undefined)}
        priority={priority}
        quality={quality}
        onLoad={onLoad}
        onError={onError}
        className={cn(
          objectFitStyles[objectFit],
          blur && blurStyles[blurIntensity],
          "transition-all duration-300",
          className
        )}
        {...props}
      />

      {/* Overlay */}
      {overlay && (
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300 z-10",
            overlayStyles[overlayColor][overlayOpacity]
          )}
        />
      )}
    </div>
  );
};

// Composants spécialisés pour différents use cases
export const HeroImage: React.FC<Omit<ImageProps, 'fill' | 'overlay' | 'blur'> & {
  overlay?: boolean;
  blur?: boolean;
}> = ({ 
  overlay = true, 
  blur = false,
  overlayColor = 'dark',
  overlayOpacity = 'medium',
  className,
  ...props 
}) => (
  <Image
    {...props}
    fill
    overlay={overlay}
    blur={blur}
    overlayColor={overlayColor}
    overlayOpacity={overlayOpacity}
    className={cn("w-full h-[60vh] lg:h-[70vh]", className)}
  />
);

export const GalleryImage: React.FC<Omit<ImageProps, 'rounded' | 'objectFit'>> = ({ 
  className,
  ...props 
}) => (
  <Image
    {...props}
    rounded
    objectFit="cover"
    className={cn("w-full h-64 lg:h-80", className)}
  />
);

export const ProfileImage: React.FC<Omit<ImageProps, 'rounded' | 'objectFit'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ 
  size = 'md',
  className,
  ...props 
}) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <Image
      {...props}
      width={size === 'sm' ? 48 : size === 'md' ? 64 : size === 'lg' ? 96 : 128}
      height={size === 'sm' ? 48 : size === 'md' ? 64 : size === 'lg' ? 96 : 128}
      rounded
      objectFit="cover"
      className={cn(sizes[size], "rounded-full", className)}
    />
  );
};

export const CardImage: React.FC<Omit<ImageProps, 'rounded'>> = ({ 
  className,
  ...props 
}) => (
  <Image
    {...props}
    rounded
    className={cn("w-full h-48", className)}
  />
);

export default Image;