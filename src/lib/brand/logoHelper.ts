import classicLogo from '@/assets/brand-logo.png';
import modernLogo from '@/assets/brand-logo-modern.png';
import { useThemeStore } from '@/lib/store/themeStore';

export function useBrandLogo() {
  const { palette } = useThemeStore();
  if (palette?.logoKey === 'modern') {
    return modernLogo;
  }
  return classicLogo;
}

export { classicLogo, modernLogo };
