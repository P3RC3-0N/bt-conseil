import React from 'react';
import { cn } from '@/lib/utils';

// Types pour nos variants
type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

type TypographyColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'white' | 'inherit';

interface TypographyProps {
  variant?: TypographyVariant;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType; // Permet de changer le tag HTML
}

// Configuration des styles pour chaque variant (3 breakpoints : mobile, tablette, desktop)
const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight',
  h2: 'text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight',
  h3: 'text-lg sm:text-xl lg:text-2xl leading-snug',
  h4: 'text-base sm:text-lg lg:text-xl leading-snug',
  h5: 'text-sm sm:text-base lg:text-lg leading-normal',
  h6: 'text-sm sm:text-base lg:text-base leading-normal',
  body1: 'text-sm sm:text-base lg:text-base leading-relaxed',
  body2: 'text-xs sm:text-sm lg:text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  overline: 'text-xs uppercase tracking-wider leading-normal',
};

// Mapping des variants vers les tags HTML par défaut
const defaultElements: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

// Styles pour l'alignement
const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

// Styles pour le poids
const weightStyles: Record<TypographyWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

// Styles pour les couleurs (adaptées à BT Conseil)
const colorStyles: Record<TypographyColor, string> = {
  primary: 'text-slate-900',       // Texte principal (noir)
  secondary: 'text-slate-600',     // Texte secondaire (gris)
  muted: 'text-slate-500',         // Texte discret (gris clair)
  accent: 'text-blue-700',         // Bleu roi de BT Conseil
  white: 'text-white',
  inherit: 'text-inherit',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  align = 'left',
  weight = 'normal',
  color = 'primary',
  className,
  children,
  as,
  ...props
}) => {
  // Détermine le tag HTML à utiliser
  const Component = as || defaultElements[variant];

  // Combine toutes les classes
  const classes = cn(
    variantStyles[variant],
    alignStyles[align],
    weightStyles[weight],
    colorStyles[color],
    className
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

// Composants spécialisés pour plus de facilité d'utilisation
export const Heading: React.FC<Omit<TypographyProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  level,
  ...props
}) => {
  const variant = `h${level}` as TypographyVariant;
  return <Typography variant={variant} {...props} />;
};

export const Body: React.FC<Omit<TypographyProps, 'variant'> & { size?: 1 | 2 }> = ({
  size = 1,
  ...props
}) => {
  const variant = `body${size}` as TypographyVariant;
  return <Typography variant={variant} {...props} />;
};

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Overline: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="overline" {...props} />
);

// Export default pour usage simple
export default Typography;