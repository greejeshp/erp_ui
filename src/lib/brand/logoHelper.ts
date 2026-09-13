import classicLogo from '@/assets/brand-logo.png';
import modernLogo from '@/assets/brand-logo-modern.png';
import { useThemeStore } from '@/lib/store/themeStore';

export function useBrandLogo() {
  return classicLogo;
}

export { classicLogo, modernLogo };
