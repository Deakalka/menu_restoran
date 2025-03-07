import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className = '',
  ...rest
}) => {
  const { theme } = useTheme();
  
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    styles[`theme-${theme}`],
    fullWidth ? styles.fullWidth : '',
    className
  ].join(' ');
  
  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button; 