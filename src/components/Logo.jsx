import React from 'react';
import brandLogo from '@/assets/brand-logo.png';

export default function Logo({ variant = 'full-color', iconOnly = false, showSubtitle = false, size = 36, className = '' }) {
  // Brand Logo with Cloud & Arrow Bar Graph and "pivotalerp" typography
  const height = size;
  
  return (
    <div 
      className={`pivotal-brand-logo-wrap ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: iconOnly ? 0 : 8,
        textDecoration: 'none',
        verticalAlign: 'middle',
        userSelect: 'none'
      }}
    >
      <img
        src={brandLogo}
        alt="Pivotal ERP Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: iconOnly ? `${height}px` : 'none',
          objectFit: 'contain',
          display: 'block',
          filter: variant === 'reversed' ? 'drop-shadow(0 2px 8px rgba(0, 168, 232, 0.35))' : 'none'
        }}
      />
    </div>
  );
}
