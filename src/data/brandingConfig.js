/* ═══════════════════════════════════════════════════════════════
   brandingConfig.js
   Color palette definitions + font options for the UI & Branding
   settings. Each palette maps directly to CSS custom properties.
   ═══════════════════════════════════════════════════════════════ */

/* ── The original/default palette (stored for reset) ─────────── */
export const DEFAULT_PALETTE_ID = 'nordic-deep-teal';

export const NORDIC_DEEP_TEAL_PALETTE = {
  id: 'nordic-deep-teal',
  name: 'Nordic Deep Teal',
  subtitle: 'OPTION 3',
  tag: 'Linear Style',
  description: 'Distinguished executive look, lowest eye glare on data tables.',
  swatches: ['#092825', '#0F766E', '#14B8A6', '#F7F9F9'],
  previewItem: {
    title: 'Ledger Annexure 13',
    badge: 'Reconciled',
    amount: 'रू 62,72,500',
    button: 'Sync Ledger',
  },
  vars: {
    '--primary':              '#0F766E',
    '--primary-mid':          '#115E59',
    '--primary-light':        '#E6F4F2',
    '--primary-hover':        '#0D5E58',
    '--accent-blue':          '#14B8A6',
    '--accent':               '#14B8A6',
    '--bg-layout':            '#F7F9F9',
    '--bg-app':               '#F7F9F9',
    '--bg-card':              '#FFFFFF',
    '--bg-sidebar':           '#092825',
    '--border-color':         '#E2E8F0',
    '--border-input':         '#CBD5E1',
    '--text-main':            '#0F172A',
    '--text-secondary':       '#475569',
    '--text-muted':           '#64748B',
    '--text-sidebar':         'rgba(255, 255, 255, 0.85)',
    '--text-sidebar-hover':   '#14B8A6',
    '--text-logo':            '#0F766E',
    '--bg-sidebar-hover':     '#0F3D39',
    '--gray-50':              '#F8FAFC',
    '--gray-100':             '#F1F5F9',
    '--gray-200':             '#E2E8F0',
    '--finance-blue':         '#0F766E',
    '--color-primary':        '#0F766E',
    '--color-accent':         '#14B8A6',
    '--color-debit':          '#0F766E',
    '--color-credit':         '#14B8A6',
    '--heading-color':        '#0F766E',
    '--sidebar-bg':           'linear-gradient(180deg, #092825 0%, #0F3D39 100%)',
  },
};

export const DEFAULT_PALETTE = NORDIC_DEEP_TEAL_PALETTE;

/* ── Color palettes ────────────────────────────────────────────── */
export const COLOR_PALETTES = [
  NORDIC_DEEP_TEAL_PALETTE,
  {
    id: 'fintech-precision',
    name: 'Fintech Precision',
    subtitle: 'OPTION 1',
    tag: 'Logo Matched',
    description: 'Modern 2026 Ramp/Stripe feel, exact fit for Pivotal logo.',
    swatches: ['#0A1128', '#0084E6', '#48BB28', '#F8FAFC'],
    previewItem: {
      title: 'Sales Invoice #2081',
      badge: 'IRD Matched',
      amount: 'रू 12,40,000',
      button: 'Post Voucher',
    },
    vars: {
      '--primary':            '#0084E6',
      '--primary-mid':        '#0069CC',
      '--primary-light':      '#EBF5FF',
      '--primary-hover':      '#005BB5',
      '--accent-blue':        '#48BB28',
      '--accent':             '#48BB28',
      '--bg-layout':          '#F8FAFC',
      '--bg-app':             '#F8FAFC',
      '--bg-card':            '#FFFFFF',
      '--bg-sidebar':         '#0A1128',
      '--border-color':       '#E2E8F0',
      '--border-input':       '#CBD5E1',
      '--text-main':          '#0F172A',
      '--text-secondary':     '#475569',
      '--text-muted':         '#64748B',
      '--text-sidebar':       'rgba(255, 255, 255, 0.85)',
      '--text-sidebar-hover': '#0084E6',
      '--text-logo':          '#0084E6',
      '--bg-sidebar-hover':   '#131E3A',
      '--finance-blue':       '#0084E6',
      '--color-primary':      '#0084E6',
      '--color-accent':       '#48BB28',
      '--color-debit':        '#0084E6',
      '--color-credit':       '#48BB28',
      '--heading-color':      '#0084E6',
      '--sidebar-bg':         'linear-gradient(180deg, #0A1128 0%, #131E3A 100%)',
    },
  },
  {
    id: 'institutional-cobalt',
    name: 'Institutional Cobalt',
    subtitle: 'OPTION 2',
    tag: 'SAP / Oracle',
    description: 'Traditional banking stability, maximum CFO audit trust.',
    swatches: ['#0F172A', '#0F52BA', '#E2E8F0', '#FFFFFF'],
    previewItem: {
      title: 'Audit Trial Balance',
      badge: 'NFRS Valid',
      amount: 'रू 4,82,50,000',
      button: 'Generate P&L',
    },
    vars: {
      '--primary':            '#0F52BA',
      '--primary-mid':        '#0D459D',
      '--primary-light':      '#EEF4FD',
      '--primary-hover':      '#0A3882',
      '--accent-blue':        '#3B82F6',
      '--accent':             '#3B82F6',
      '--bg-layout':          '#F8FAFC',
      '--bg-app':             '#F8FAFC',
      '--bg-card':            '#FFFFFF',
      '--bg-sidebar':         '#0F172A',
      '--border-color':       '#E2E8F0',
      '--border-input':       '#CBD5E1',
      '--text-main':          '#0F172A',
      '--text-secondary':     '#475569',
      '--text-muted':         '#64748B',
      '--text-sidebar':       'rgba(255, 255, 255, 0.85)',
      '--text-sidebar-hover': '#0F52BA',
      '--text-logo':          '#0F52BA',
      '--bg-sidebar-hover':   '#1E293B',
      '--finance-blue':       '#0F52BA',
      '--color-primary':      '#0F52BA',
      '--color-accent':       '#3B82F6',
      '--color-debit':        '#0F52BA',
      '--color-credit':       '#3B82F6',
      '--heading-color':      '#0F52BA',
      '--sidebar-bg':         'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
    },
  },

  {
    id: 'heirloom-plum-brunch',
    name: 'Heirloom Plum Brunch',
    description: 'Rich plum and deep burgundy with warm pink and burnt orange.',
    swatches: ['#E97BB0', '#6B1E3C', '#C4C1D8', '#C4A0C4', '#4A1640', '#D45C1C'],
    vars: {
      '--primary':              '#6B1E3C',
      '--primary-mid':          '#561830',
      '--primary-light':        '#f7e8ef',
      '--primary-hover':        '#430f25',
      '--accent-blue':          '#D45C1C',
      '--accent':               '#D45C1C',
      '--bg-layout':            '#f9f1f5',
      '--bg-app':               '#f9f1f5',
      '--bg-card':              '#ffffff',
      '--bg-sidebar':           '#ffffff',
      '--border-color':         '#e8d5de',
      '--border-input':         '#d4b8c6',
      '--text-main':            '#2a0f1c',
      '--text-secondary':       '#7a4a5e',
      '--text-muted':           '#b08898',
      '--text-sidebar':         '#4a1f30',
      '--text-sidebar-hover':   '#6B1E3C',
      '--text-logo':            '#6B1E3C',
      '--bg-sidebar-hover':     '#f7e8ef',
      '--gray-50':              '#fdf5f8',
      '--gray-100':             '#f2e2ea',
      '--gray-200':             '#e5ccd8',
    },
  },

  {
    id: 'amethyst-wisteria-twilight',
    name: 'Amethyst Wisteria Twilight',
    description: 'Soft purple and lavender with warm peach and slate blue.',
    swatches: ['#6B4A8E', '#B87AA0', '#F0EEF2', '#F5D9B0', '#C8A4C0', '#6B6EA8'],
    vars: {
      '--primary':              '#6B4A8E',
      '--primary-mid':          '#573c73',
      '--primary-light':        '#ede6f5',
      '--primary-hover':        '#422d5a',
      '--accent-blue':          '#6B6EA8',
      '--accent':               '#6B6EA8',
      '--bg-layout':            '#f4f0f8',
      '--bg-app':               '#f4f0f8',
      '--bg-card':              '#ffffff',
      '--bg-sidebar':           '#ffffff',
      '--border-color':         '#dfd5eb',
      '--border-input':         '#ccc0dc',
      '--text-main':            '#1e1228',
      '--text-secondary':       '#6b4a7a',
      '--text-muted':           '#a08ab4',
      '--text-sidebar':         '#3d2454',
      '--text-sidebar-hover':   '#6B4A8E',
      '--text-logo':            '#6B4A8E',
      '--bg-sidebar-hover':     '#ede6f5',
      '--gray-50':              '#faf8fc',
      '--gray-100':             '#f0eaf8',
      '--gray-200':             '#e0d4ef',
    },
  },

  {
    id: 'jade-mahogany-muse',
    name: 'Jade Mahogany Muse',
    description: 'Earthy blush and mauve with sage mint and deep mahogany.',
    swatches: ['#E0A898', '#8E6878', '#5C5858', '#A8C8B8', '#5C2830'],
    vars: {
      '--primary':              '#5C2830',
      '--primary-mid':          '#4a2028',
      '--primary-light':        '#f0e6e7',
      '--primary-hover':        '#3a1820',
      '--accent-blue':          '#A8C8B8',
      '--accent':               '#A8C8B8',
      '--bg-layout':            '#f5f0ee',
      '--bg-app':               '#f5f0ee',
      '--bg-card':              '#ffffff',
      '--bg-sidebar':           '#ffffff',
      '--border-color':         '#e5d8d4',
      '--border-input':         '#d4c0ba',
      '--text-main':            '#1e1210',
      '--text-secondary':       '#7a5850',
      '--text-muted':           '#a88e88',
      '--text-sidebar':         '#3c2018',
      '--text-sidebar-hover':   '#5C2830',
      '--text-logo':            '#5C2830',
      '--bg-sidebar-hover':     '#f0e6e7',
      '--gray-50':              '#faf7f6',
      '--gray-100':             '#f0e8e4',
      '--gray-200':             '#e4d4ce',
    },
  },

  {
    id: 'sage-peridot-morning',
    name: 'Sage Peridot Morning',
    description: 'Deep forest green with peridot olive, aqua mint and spring green.',
    swatches: ['#2E5C30', '#8E9C30', '#90E8D8', '#90C890'],
    vars: {
      '--primary':              '#2E5C30',
      '--primary-mid':          '#254a28',
      '--primary-light':        '#e6f2e7',
      '--primary-hover':        '#1c3a1e',
      '--accent-blue':          '#8E9C30',
      '--accent':               '#8E9C30',
      '--bg-layout':            '#f0f5f0',
      '--bg-app':               '#f0f5f0',
      '--bg-card':              '#ffffff',
      '--bg-sidebar':           '#ffffff',
      '--border-color':         '#d5e4d6',
      '--border-input':         '#c0d4c2',
      '--text-main':            '#0e1e10',
      '--text-secondary':       '#4a6a4c',
      '--text-muted':           '#7a9e7c',
      '--text-sidebar':         '#1e3e20',
      '--text-sidebar-hover':   '#2E5C30',
      '--text-logo':            '#2E5C30',
      '--bg-sidebar-hover':     '#e6f2e7',
      '--gray-50':              '#f4f9f4',
      '--gray-100':             '#e6f0e6',
      '--gray-200':             '#d4e4d4',
    },
  },

  {
    id: 'jade-blossom-daylight',
    name: 'Jade Blossom Daylight',
    description: 'Bright emerald and lime-yellow with charcoal, cyan and soft pink.',
    swatches: ['#3CB878', '#D4E890', '#3C3C3C', '#A0F0F0', '#F0B8E8'],
    vars: {
      '--primary':              '#3CB878',
      '--primary-mid':          '#30a068',
      '--primary-light':        '#e6f8f0',
      '--primary-hover':        '#248858',
      '--accent-blue':          '#3C3C3C',
      '--accent':               '#3C3C3C',
      '--bg-layout':            '#f0faf4',
      '--bg-app':               '#f0faf4',
      '--bg-card':              '#ffffff',
      '--bg-sidebar':           '#ffffff',
      '--border-color':         '#d0eedf',
      '--border-input':         '#b0dcc8',
      '--text-main':            '#0e2018',
      '--text-secondary':       '#3a7058',
      '--text-muted':           '#70a890',
      '--text-sidebar':         '#1a4030',
      '--text-sidebar-hover':   '#3CB878',
      '--text-logo':            '#3CB878',
      '--bg-sidebar-hover':     '#e6f8f0',
      '--gray-50':              '#f4fdf8',
      '--gray-100':             '#e4f5ec',
      '--gray-200':             '#d0eade',
    },
  },
];

/* ── Font options ──────────────────────────────────────────────── */
export const FONT_OPTIONS = [
  {
    id: 'montserrat',
    name: 'Montserrat',
    label: 'Montserrat (Default)',
    value: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  {
    id: 'inter',
    name: 'Inter',
    label: 'Inter — Modern & Clean',
    value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    label: 'Outfit — Friendly & Round',
    value: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  {
    id: 'nunito',
    name: 'Nunito',
    label: 'Nunito — Soft & Readable',
    value: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    label: 'DM Sans — Minimal & Sharp',
    value: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    label: 'Poppins — Bold & Geometric',
    value: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    googleUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    preview: 'The quick brown fox jumps over the lazy dog',
  },
];

/* ── Apply a palette to the document root ──────────────────────── */
export function applyPalette(palette, sidebarMode = null) {
  const root = document.documentElement;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Determine effective sidebar mode: passed mode > palette default > 'dark'
  const effectiveSidebarMode = sidebarMode || palette.sidebarMode || (palette.vars['--bg-sidebar'] === '#ffffff' ? 'light' : 'dark');

  if (effectiveSidebarMode === 'light') {
    // Light sidebar theme
    root.style.setProperty('--sidebar-type', 'light');
    root.style.setProperty('--bg-sidebar', '#FFFFFF');
    root.style.setProperty('--sidebar-bg', '#FFFFFF');
    root.style.setProperty('--sidebar-border', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--sidebar-text', '#1E293B');
    root.style.setProperty('--text-sidebar', '#1E293B');
    root.style.setProperty('--text-sidebar-hover', palette.vars['--primary'] || '#0F766E');
    root.style.setProperty('--bg-sidebar-hover', palette.vars['--primary-light'] || '#E6F4F2');
  } else {
    // Dark sidebar theme (matches palette dark tone)
    const darkBg = palette.vars['--bg-sidebar'] && palette.vars['--bg-sidebar'] !== '#ffffff' 
      ? palette.vars['--bg-sidebar'] 
      : (palette.swatches[0] || '#092825');
    const darkGrad = palette.vars['--sidebar-bg'] || `linear-gradient(180deg, ${darkBg} 0%, #0F3D39 100%)`;

    root.style.setProperty('--sidebar-type', 'dark');
    root.style.setProperty('--bg-sidebar', darkBg);
    root.style.setProperty('--sidebar-bg', darkGrad);
    root.style.setProperty('--sidebar-border', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--sidebar-text', 'rgba(255, 255, 255, 0.85)');
    root.style.setProperty('--text-sidebar', 'rgba(255, 255, 255, 0.85)');
    root.style.setProperty('--text-sidebar-hover', palette.vars['--accent'] || '#14B8A6');
    root.style.setProperty('--bg-sidebar-hover', 'rgba(255, 255, 255, 0.08)');
  }
}

/* ── Apply a font to the document root ────────────────────────── */
export function applyFont(fontOption) {
  // Inject Google Font link if not already loaded
  const linkId = `gfont-${fontOption.id}`;
  if (!document.getElementById(linkId) && fontOption.googleUrl) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = fontOption.googleUrl;
    document.head.appendChild(link);
  }
  document.documentElement.style.setProperty('--font-sans', fontOption.value);
  document.body.style.fontFamily = fontOption.value;
}

/* ── Reset all custom properties to CSS defaults ──────────────── */
export function resetToDefault() {
  const root = document.documentElement;
  // Remove all inline overrides — falls back to :root in CSS
  const defaultVarKeys = Object.keys(DEFAULT_PALETTE.vars);
  defaultVarKeys.forEach(key => root.style.removeProperty(key));
  root.style.removeProperty('--font-sans');
  root.style.removeProperty('--sidebar-type');
  document.body.style.fontFamily = '';
}

/* ── LocalStorage persistence ─────────────────────────────────── */
const STORAGE_KEY_PALETTE = 'erp-branding-palette';
const STORAGE_KEY_FONT    = 'erp-branding-font';
const STORAGE_KEY_SIDEBAR = 'erp-branding-sidebar-mode';

export function saveBranding(paletteId, fontId, sidebarMode = 'dark') {
  localStorage.setItem(STORAGE_KEY_PALETTE, paletteId);
  localStorage.setItem(STORAGE_KEY_FONT, fontId);
  localStorage.setItem(STORAGE_KEY_SIDEBAR, sidebarMode);
}

export function loadBranding() {
  return {
    paletteId:   localStorage.getItem(STORAGE_KEY_PALETTE) || DEFAULT_PALETTE_ID,
    fontId:      localStorage.getItem(STORAGE_KEY_FONT)    || 'montserrat',
    sidebarMode: localStorage.getItem(STORAGE_KEY_SIDEBAR) || 'dark',
  };
}
