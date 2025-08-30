'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Types pour les variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  target?: '_blank' | '_self';
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// Helper pour vérifier si c'est un lien
const isLinkProps = (props: ButtonProps): props is ButtonAsLinkProps => {
  return 'href' in props;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    className,
    children,
  } = props;

  // Classes pour les variants (couleurs selon votre bleu roi)
  const variantStyles: Record<ButtonVariant, string> = {
    primary: cn(
      'bg-blue-700 text-white border-blue-700',
      'hover:bg-blue-800 hover:border-blue-800',
      'focus:ring-blue-200',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-blue-700'
    ),
    secondary: cn(
      'bg-slate-100 text-slate-900 border-slate-100',
      'hover:bg-slate-200 hover:border-slate-200',
      'focus:ring-slate-200',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-slate-100'
    ),
    outline: cn(
      'bg-transparent text-blue-700 border-blue-700',
      'hover:bg-blue-50 hover:text-blue-800',
      'focus:ring-blue-200',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
    ),
    ghost: cn(
      'bg-transparent text-slate-700 border-transparent',
      'hover:bg-slate-100 hover:text-slate-900',
      'focus:ring-slate-200',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
    ),
    danger: cn(
      'bg-red-600 text-white border-red-600',
      'hover:bg-red-700 hover:border-red-700',
      'focus:ring-red-200',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-red-600'
    ),
  };

  // Classes pour les tailles
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Classes communes
  const baseClasses = cn(
    // Base
    'inline-flex items-center justify-center',
    'font-medium rounded-lg transition-all duration-200',
    'border focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transform hover:scale-105 active:scale-95',
    
    // Responsive (3 breakpoints standards)
    'text-sm sm:text-base lg:text-base',
    
    // Variants et tailles
    variantStyles[variant],
    sizeStyles[size],
    
    // Modificateurs
    fullWidth && 'w-full',
    disabled && 'pointer-events-none',
    loading && 'cursor-wait',
    
    // Custom classes
    className
  );

  // Contenu avec loading
  const content = (
    <>
      {loading && (
        <div className="animate-spin mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {children}
    </>
  );

  // Rendu conditionnel Link vs Button
  if (isLinkProps(props)) {
    const { href, target } = props;
    return (
      <Link
        href={href}
        target={target}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  } else {
    const { onClick, type = 'button' } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={baseClasses}
      >
        {content}
      </button>
    );
  }
};

// Composants spécialisés pour faciliter l'usage
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="outline" {...props} />
);

export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="ghost" {...props} />
);

export const DangerButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props} />
);

export default Button;