// Pivotal ERP — Theme & UI State Store
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";
export type FontFamily = "Poppins" | "Inter" | "Roboto" | "Outfit" | "DM Sans";

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  sidebarType?: "dark" | "white";
  sidebarBg?: string;
  sidebarText?: string;
  sidebarBorder?: string;
  headingColor?: string;
  headerBg?: string;
  logoBg?: string;
  tabbarBg?: string;
  debitColor?: string;
  creditColor?: string;
  logoKey?: "classic" | "modern";
}

export const BUILTIN_PALETTES: ColorPalette[] = [
  // ─── Official Pivotal Brand Palettes from Logos ──────────────────
  {
    id: "pivotal-cloud-growth",
    name: "Pivotal Sky & Meadow (Cloud Growth)",
    primary: "#0083CA", // Vivid Cloud Blue
    secondary: "#62B237", // Growth Meadow Green
    accent: "#00B4D8", // Vibrant Sky Cyan
    bg: "#F4F9FD",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #071F32 0%, #0B314F 100%)",
    sidebarText: "rgba(255, 255, 255, 0.9)",
    sidebarBorder: "rgba(0, 131, 202, 0.25)",
    headingColor: "#0083CA",
    headerBg: "#FFFFFF",
    debitColor: "#0083CA",
    creditColor: "#62B237",
    logoKey: "classic",
  },
  {
    id: "pivotal-cobalt-slate",
    name: "Pivotal Cobalt & Deep Slate (Modern Geometric)",
    primary: "#1A56DB", // Radiant Cobalt Royal Blue
    secondary: "#0F1E36", // Executive Deep Slate Navy
    accent: "#3B82F6", // Luminous Electric Blue
    bg: "#F8FAFC",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #0A1124 0%, #111C3A 100%)",
    sidebarText: "rgba(255, 255, 255, 0.9)",
    sidebarBorder: "rgba(26, 86, 219, 0.22)",
    headingColor: "#1A56DB",
    headerBg: "#FFFFFF",
    debitColor: "#1A56DB",
    creditColor: "#10B981",
    logoKey: "modern",
  },
  // ─── 6 Official Pivotal Brand Options ─────────────────────────────
  {
    id: "brand-opt1-deep-teal",
    name: "Option 1: Deep Teal + Graphite",
    primary: "#0F766E",
    secondary: "#115E59",
    accent: "#14B8A6",
    bg: "#F7F9F9",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #092825 0%, #0F3D39 100%)",
    sidebarText: "rgba(255, 255, 255, 0.85)",
    sidebarBorder: "rgba(20, 184, 166, 0.15)",
    headingColor: "#0F766E",
    debitColor: "#0F766E",
    creditColor: "#14B8A6",
    logoKey: "classic",
  },
  {
    id: "brand-opt2-indigo-slate",
    name: "Option 2: Indigo + Slate",
    primary: "#4F46E5",
    secondary: "#3730A3",
    accent: "#6366F1",
    bg: "#F8F9FC",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #0E1026 0%, #171A38 100%)",
    sidebarText: "rgba(255, 255, 255, 0.85)",
    sidebarBorder: "rgba(99, 102, 241, 0.18)",
    headingColor: "#3730A3",
    debitColor: "#4F46E5",
    creditColor: "#6366F1",
  },
  {
    id: "brand-opt3-emerald-charcoal",
    name: "Option 3: Emerald + Charcoal",
    primary: "#047857",
    secondary: "#065F46",
    accent: "#10B981",
    bg: "#F7FAF9",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #061F17 0%, #0B2D22 100%)",
    sidebarText: "rgba(255, 255, 255, 0.85)",
    sidebarBorder: "rgba(16, 185, 129, 0.15)",
    headingColor: "#047857",
    debitColor: "#047857",
    creditColor: "#10B981",
  },
  {
    id: "brand-opt4-navy-copper",
    name: "Option 4: Navy + Copper (Dark Navy Sidebar)",
    primary: "#172554",
    secondary: "#0F172A",
    accent: "#C47A44",
    bg: "#F8F8F7",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #091024 0%, #0F172A 100%)",
    sidebarText: "rgba(255, 255, 255, 0.85)",
    sidebarBorder: "rgba(196, 122, 68, 0.2)",
    headingColor: "#172554",
    debitColor: "#172554",
    creditColor: "#C47A44",
  },
  {
    id: "brand-opt4-copper-sidebar",
    name: "Option 4: Navy + Copper (Copper Sidebar)",
    primary: "#172554",
    secondary: "#0F172A",
    accent: "#C47A44",
    bg: "#F8F8F7",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #C47A44 0%, #9A5B2B 100%)",
    sidebarText: "#FFFFFF",
    sidebarBorder: "rgba(255, 255, 255, 0.15)",
    headingColor: "#172554",
    debitColor: "#172554",
    creditColor: "#C47A44",
  },
  {
    id: "brand-opt5-charcoal-lime",
    name: "Option 5: Charcoal + Electric Lime",
    primary: "#18181B",
    secondary: "#3F3F46",
    accent: "#84CC16",
    bg: "#F7F7F7",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #121215 0%, #1E1E24 100%)",
    sidebarText: "rgba(255, 255, 255, 0.88)",
    sidebarBorder: "rgba(132, 204, 22, 0.2)",
    headingColor: "#18181B",
    debitColor: "#18181B",
    creditColor: "#84CC16",
  },
  {
    id: "brand-opt6-bluegreen-gray",
    name: "Option 6: Blue-Green + Warm Gray",
    primary: "#164E63",
    secondary: "#083344",
    accent: "#0891B2",
    bg: "#F7F8F7",
    sidebarType: "white",
    sidebarBg: "#FFFFFF",
    sidebarText: "#1C2426",
    sidebarBorder: "#DFE5E5",
    headingColor: "#164E63",
    debitColor: "#164E63",
    creditColor: "#0891B2",
  },
  // ─── Specialized Curated & Legacy Presets ──────────────────────────
  {
    id: "tigg-classic",
    name: "Tigg Classic (Ice & Royal Navy)",
    primary: "#143E9F",
    secondary: "#1DB954",
    accent: "#FC814A",
    bg: "#EAF1F9",
    sidebarType: "white",
    sidebarBg: "#EDF2F8",
    sidebarText: "#343C46",
    sidebarBorder: "#E0E5EB",
    headingColor: "#10223B",
    debitColor: "#143E9F",
    creditColor: "#FC814A",
  },
  {
    id: "tigg-copy",
    name: "TIGG COPY",
    primary: "#143E9F",
    secondary: "#1DB954",
    accent: "#FC814A",
    bg: "#EAF1F9",
    sidebarType: "white",
    sidebarBg: "#DCE5F0",
    sidebarText: "#243242",
    sidebarBorder: "#CAD6E4",
    headingColor: "#10223B",
    debitColor: "#143E9F",
    creditColor: "#FC814A",
  },
  {
    id: "tigg-copy-1",
    name: "tigg copy 1",
    primary: "#143E9F",
    secondary: "#1DB954",
    accent: "#FC814A",
    bg: "#EAF1F9",
    sidebarType: "white",
    sidebarBg: "#DCE5F0",
    sidebarText: "#243242",
    sidebarBorder: "#CAD6E4",
    headingColor: "#1DB954",
    headerBg: "#1DB954",
    debitColor: "#143E9F",
    creditColor: "#FC814A",
  },
  {
    id: "tigg-copy-2",
    name: "tigg copy 2",
    primary: "#143E9F",
    secondary: "#1DB954",
    accent: "#FC814A",
    bg: "#EAF1F9",
    sidebarType: "white",
    sidebarBg: "#DCE5F0",
    sidebarText: "#243242",
    sidebarBorder: "#CAD6E4",
    headingColor: "#10223B",
    headerBg: "#DCE5F0",
    tabbarBg: "#FFFFFF",
    debitColor: "#143E9F",
    creditColor: "#FC814A",
  },
  {
    id: "open-emr",
    name: "open emr",
    primary: "#185fa5",
    secondary: "#3b6d11",
    accent: "#378add",
    bg: "#f8f9fb",
    sidebarType: "white",
    sidebarBg: "#FFFFFF",
    sidebarText: "#5c6478",
    sidebarBorder: "rgba(26, 31, 54, 0.12)",
    headingColor: "#1a1f36",
    headerBg: "#FFFFFF",
    debitColor: "#185fa5",
    creditColor: "#a32d2d",
  },
  {
    id: "ocean-amber-dark",
    name: "Ocean & Amber (Dark Sidebar)",
    primary: "#04618E",
    secondary: "#4E6B4D",
    accent: "#F1890B",
    bg: "#F7F7F7",
    sidebarType: "dark",
    sidebarBg: "linear-gradient(180deg, #051A27 0%, #082030 100%)",
    sidebarText: "rgba(255, 255, 255, 0.82)",
    sidebarBorder: "rgba(255, 255, 255, 0.08)",
    headingColor: "#04618E",
    debitColor: "#04618E",
    creditColor: "#F1890B",
  },
  {
    id: "ocean-amber-white",
    name: "Ocean & Amber (Clean White Sidebar)",
    primary: "#04618E",
    secondary: "#4E6B4D",
    accent: "#F1890B",
    bg: "#F7F7F7",
    sidebarType: "white",
    sidebarBg: "#FFFFFF",
    sidebarText: "#334155",
    sidebarBorder: "#E2E8F0",
    headingColor: "#04618E",
    debitColor: "#04618E",
    creditColor: "#F1890B",
  },
  { id: "default", name: "Pivotal Default", primary: "#1D4EDB", secondary: "#008B94", accent: "#22D3EE", bg: "#0B132B" },
  { id: "teal-finance", name: "Teal Finance", primary: "#008B94", secondary: "#1D4EDB", accent: "#22D3EE", bg: "#0B132B" },
  { id: "aqua-pro", name: "Aqua Modern", primary: "#22D3EE", secondary: "#008B94", accent: "#1D4EDB", bg: "#0B132B" },
  { id: "slate-navy", name: "Slate Corporate", primary: "#1D4EDB", secondary: "#22D3EE", accent: "#008B94", bg: "#1F2937" },
];

interface ThemeState {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  palette: ColorPalette;
  font: FontFamily;
  sidebarCollapsed: boolean;
  sidebarOpen: boolean; // mobile

  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: ColorPalette) => void;
  setFont: (font: FontFamily) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  updateCustomPalette: (updates: Partial<ColorPalette>) => void;
  applyTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light",
      resolvedMode: "light",
      palette: BUILTIN_PALETTES[0],
      font: "Poppins",
      sidebarCollapsed: false,
      sidebarOpen: false,

      setMode: (mode) => {
        const resolved =
          mode === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : mode;
        set({ mode, resolvedMode: resolved });
        document.documentElement.setAttribute("data-theme", resolved);
      },

      setPalette: (palette) => {
        set({ palette });
        get().applyTheme();
      },

      updateCustomPalette: (updates) => {
        const current = get().palette;
        const updated: ColorPalette = {
          ...current,
          ...updates,
          id: current.id.startsWith("custom") ? current.id : "custom-palette",
          name: current.id.startsWith("custom") ? current.name : "Custom Theme",
        };
        set({ palette: updated });
        get().applyTheme();
      },

      setFont: (font) => {
        set({ font });
        document.documentElement.style.setProperty("--font-primary", `"${font}", sans-serif`);
        document.documentElement.style.setProperty("--font-data", `"${font}", sans-serif`);
      },

      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      applyTheme: () => {
        const { palette, resolvedMode } = get();
        const root = document.documentElement;
        root.style.setProperty("--finance-blue", palette.primary);
        root.style.setProperty("--color-primary", palette.primary);
        root.style.setProperty("--teal", palette.secondary);
        root.style.setProperty("--color-success", palette.secondary);
        root.style.setProperty("--aqua", palette.accent);
        root.style.setProperty("--color-accent", palette.accent);
        
        if (palette.headingColor) {
          root.style.setProperty("--heading-color", palette.headingColor);
        } else {
          root.style.setProperty("--heading-color", resolvedMode === "dark" ? "#F8FAFC" : palette.primary);
        }

        if (palette.headerBg) {
          root.style.setProperty("--bg-topbar", palette.headerBg);
        } else {
          root.style.setProperty("--bg-topbar", resolvedMode === "dark" ? "#0c0f1d" : "#FFFFFF");
        }

        if (palette.tabbarBg) {
          root.style.setProperty("--bg-tabbar", palette.tabbarBg);
        } else {
          root.style.setProperty("--bg-tabbar", "var(--bg-topbar)");
        }

        if (palette.logoBg) {
          root.style.setProperty("--logo-bg", palette.logoBg);
        } else {
          root.style.setProperty("--logo-bg", "transparent");
        }

        if (palette.sidebarBg) {
          root.style.setProperty("--sidebar-bg", palette.sidebarBg);
        } else {
          root.style.setProperty("--sidebar-bg", "linear-gradient(180deg, #0a0e1a 0%, #0d1222 100%)");
        }

        if (palette.sidebarText) {
          root.style.setProperty("--sidebar-text", palette.sidebarText);
        } else {
          root.style.setProperty("--sidebar-text", "rgba(255, 255, 255, 0.75)");
        }

        if (palette.sidebarBorder) {
          root.style.setProperty("--sidebar-border", palette.sidebarBorder);
        } else {
          root.style.setProperty("--sidebar-border", "rgba(255, 255, 255, 0.08)");
        }

        root.style.setProperty("--sidebar-type", palette.sidebarType || "dark");

        root.style.setProperty("--color-debit", palette.debitColor || palette.primary || "#143E9F");
        root.style.setProperty("--color-credit", palette.creditColor || palette.accent || "#FC814A");

        if (palette.id === "open-emr") {
          root.style.setProperty("--border-color", "rgba(26, 31, 54, 0.12)");
          root.style.setProperty("--border-strong", "rgba(26, 31, 54, 0.22)");
          root.style.setProperty("--bg-card", "#FFFFFF");
          root.style.setProperty("--bg-secondary", "#f1f3f7");
          root.style.setProperty("--bg-tertiary", "#e2e5ed");
          root.style.setProperty("--text-primary", "#1a1f36");
          root.style.setProperty("--text-secondary", "#5c6478");
          root.style.setProperty("--text-tertiary", "#9299aa");
        }

        if (resolvedMode === "dark") {
          root.style.setProperty("--deep-navy", palette.bg);
        } else if (palette.bg && palette.bg !== "#F7F8FA") {
          root.style.setProperty("--bg-primary", palette.bg);
        }
      },
    }),
    { name: "pivotal-theme" }
  )
);
