/* ═══════════════════════════════════════════════════════════════
   brandingConfig.js
   Color palette definitions + font options for the UI & Branding
   settings. Each palette maps directly to CSS custom properties.
   ═══════════════════════════════════════════════════════════════ */

/* ── The original/default palette (stored for reset) ─────────── */
export const DEFAULT_PALETTE_ID = 'emerald-tangerine';

export const DEFAULT_PALETTE = {
  id: DEFAULT_PALETTE_ID,
  name: 'Emerald Tangerine Morning',
  description: 'The original Dynamic ERP palette — forest green with tangerine accents.',
  swatches: ['#28694b', '#ff5f2d', '#ebebdc', '#ffffff', '#6e6e73'],
  vars: {
    '--primary':              '#28694b',
    '--primary-mid':          '#1f543c',
    '--primary-light':        '#e5efe9',
    '--primary-hover':        '#1b4733',
    '--accent-blue':          '#ff5f2d',
    '--accent':               '#ff5f2d',
    '--bg-layout':            '#ebebdc',
    '--bg-app':               '#ebebdc',
    '--bg-card':              '#ffffff',
    '--bg-sidebar':           '#ffffff',
    '--border-color':         '#dcdccc',
    '--border-input':         '#c1c1b3',
    '--text-main':            '#29292c',
    '--text-secondary':       '#6e6e73',
    '--text-muted':           '#a1a195',
    '--text-sidebar':         '#424245',
    '--text-sidebar-hover':   '#28694b',
    '--text-logo':            '#28694b',
    '--bg-sidebar-hover':     '#e5efe9',
    '--gray-50':              '#f6f6f2',
    '--gray-100':             '#ebebdc',
    '--gray-200':             '#dcdccc',
  },
};

/* ── Color palettes ────────────────────────────────────────────── */
export const COLOR_PALETTES = [
  DEFAULT_PALETTE,

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
export function applyPalette(palette) {
  const root = document.documentElement;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
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
  document.body.style.fontFamily = '';
}

/* ── LocalStorage persistence ─────────────────────────────────── */
const STORAGE_KEY_PALETTE = 'erp-branding-palette';
const STORAGE_KEY_FONT    = 'erp-branding-font';

export function saveBranding(paletteId, fontId) {
  localStorage.setItem(STORAGE_KEY_PALETTE, paletteId);
  localStorage.setItem(STORAGE_KEY_FONT, fontId);
}

export function loadBranding() {
  return {
    paletteId: localStorage.getItem(STORAGE_KEY_PALETTE) || DEFAULT_PALETTE_ID,
    fontId:    localStorage.getItem(STORAGE_KEY_FONT)    || 'montserrat',
  };
}
