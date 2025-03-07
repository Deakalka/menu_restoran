import React, { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...rest }, ref) => {
    const { theme } = useTheme();
    
    const inputClasses = [
      styles.input,
      styles[`theme-${theme}`],
      error ? styles.errorInput : '',
      fullWidth ? styles.fullWidth : '',
      className
    ].join(' ');
    
    return (
      <div className={`${styles.inputGroup} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={inputClasses} {...rest} />
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 