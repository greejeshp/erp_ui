import React, { useState } from 'react';
import { useThemeStore, BUILTIN_PALETTES } from '../lib/store/themeStore';
import {
  COLOR_PALETTES,
  FONT_OPTIONS,
  applyPalette,
  applyFont,
  saveBranding,
  loadBranding,
  DEFAULT_PALETTE_ID,
} from '../data/brandingConfig';
import { ChevronDown, Check } from 'lucide-react';

export default function BrandThemeHUD() {
  const { mode, palette, setPalette, font, setFont } = useThemeStore();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);

  const isDark = mode === "dark";

  // Label for active palette pill
  const getPaletteLabel = () => {
    const matched = COLOR_PALETTES.find((p) => p.id === palette.id);
    if (matched) return matched.name;
    return palette.name?.replace("Pivotal ", "") || "Brand Theme";
  };

  // Label for active font pill
  const getFontLabel = () => {
    const matched = FONT_OPTIONS.find((f) => f.name === font || f.id === font);
    return matched?.name || font || "Plus Jakarta Sans";
  };

  const handleSelectPalette = (p) => {
    const currentSaved = loadBranding();
    const currentSidebarMode = currentSaved.sidebarMode || (palette.sidebarType === 'white' ? 'light' : 'dark');

    // Apply CSS variables & theme store
    applyPalette(p, currentSidebarMode);

    const matchedStorePalette = BUILTIN_PALETTES.find((bp) => bp.id === p.id);
    if (matchedStorePalette) {
      setPalette({
        ...matchedStorePalette,
        sidebarType: currentSidebarMode === 'light' ? 'white' : 'dark',
      });
    }

    const currentFontOption = FONT_OPTIONS.find((f) => f.name === font || f.id === font);
    saveBranding(p.id, currentFontOption?.id || 'plus-jakarta-sans', currentSidebarMode);
    setPaletteOpen(false);
  };

  const handleSelectFont = (f) => {
    const currentSaved = loadBranding();
    const currentSidebarMode = currentSaved.sidebarMode || (palette.sidebarType === 'white' ? 'light' : 'dark');

    applyFont(f);
    saveBranding(palette.id, f.id, currentSidebarMode);
    setFontOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 8px",
        borderRadius: "14px",
        background: isDark
          ? "rgba(15, 23, 42, 0.88)"
          : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.14)"
          : "1px solid rgba(15, 23, 42, 0.12)",
        boxShadow: isDark
          ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
          : "0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)",
        userSelect: "none",
      }}
    >
      {/* ─── 1. Brand Theme Palette Pill Button ─── */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => {
            setPaletteOpen(!paletteOpen);
            setFontOpen(false);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "9px",
            background: isDark
              ? paletteOpen
                ? "rgba(255, 255, 255, 0.14)"
                : "rgba(255, 255, 255, 0.07)"
              : paletteOpen
              ? "rgba(15, 23, 42, 0.09)"
              : "rgba(15, 23, 42, 0.05)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(15, 23, 42, 0.1)",
            color: isDark ? "#FFFFFF" : "#0F172A",
            cursor: "pointer",
            fontSize: "0.825rem",
            fontWeight: 600,
            transition: "all 0.18s ease",
            outline: "none",
          }}
          title="Switch Brand Theme Palette"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            <span
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: palette.primary,
                display: "inline-block",
                boxShadow: "0 0 4px rgba(0,0,0,0.25)",
              }}
            />
            <span
              style={{
                width: 7.5,
                height: 7.5,
                borderRadius: "50%",
                background: palette.secondary,
                display: "inline-block",
              }}
            />
          </div>
          <span
            style={{
              maxWidth: 140,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getPaletteLabel()}
          </span>
          <ChevronDown
            size={13}
            style={{
              opacity: 0.7,
              transform: paletteOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* Palette Dropdown Popover */}
        {paletteOpen && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 10000 }}
              onClick={() => setPaletteOpen(false)}
            />
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                right: 0,
                width: "330px",
                maxHeight: "460px",
                overflowY: "auto",
                background: isDark ? "#0F172A" : "#FFFFFF",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.14)"
                  : "1px solid #E2E8F0",
                borderRadius: "14px",
                boxShadow: isDark
                  ? "0 14px 35px rgba(0,0,0,0.65)"
                  : "0 14px 30px rgba(0,0,0,0.12)",
                padding: "10px",
                zIndex: 10001,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  padding: "4px 8px 8px",
                  borderBottom: isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid #E2E8F0",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: isDark ? "#2DD4BF" : "#0F766E",
                  }}
                >
                  SYSTEM COLOR PALETTES
                </div>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: isDark ? "#E2E8F0" : "#334155",
                    marginTop: 2,
                  }}
                >
                  Select template from UI &amp; Branding:
                </div>
              </div>

              {COLOR_PALETTES.map((p) => {
                const isSelected = palette.id === p.id;
                const isDefault = p.id === DEFAULT_PALETTE_ID;
                const swatches = p.swatches || [
                  p.vars?.['--bg-sidebar'] || '#092825',
                  p.vars?.['--primary'] || '#0F766E',
                  p.vars?.['--accent'] || '#14B8A6',
                  p.vars?.['--bg-layout'] || '#F7F9F9',
                ];

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPalette(p)}
                    style={{
                      width: "100%",
                      padding: "9px 10px",
                      borderRadius: "9px",
                      border: isSelected
                        ? "1.5px solid #0F766E"
                        : isDark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid #F1F5F9",
                      background: isSelected
                        ? isDark
                          ? "rgba(15,118,110,0.18)"
                          : "#F0F9F8"
                        : isDark
                        ? "transparent"
                        : "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = isDark
                          ? "rgba(255,255,255,0.05)"
                          : "#F8FAFC";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = isDark
                          ? "transparent"
                          : "#FFFFFF";
                      }
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 }}>
                      {/* Subtitle & Tag Row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                        <span
                          style={{
                            fontSize: "0.64rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: isDark ? "#2DD4BF" : "#0F766E",
                          }}
                        >
                          {p.subtitle || "PALETTE"}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {p.tag && (
                            <span
                              style={{
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                padding: "1px 5px",
                                borderRadius: 3,
                                background: isDark ? "rgba(45, 212, 191, 0.16)" : "rgba(15, 118, 110, 0.1)",
                                color: isDark ? "#2DD4BF" : "#0F766E",
                              }}
                            >
                              {p.tag}
                            </span>
                          )}
                          {isDefault && (
                            <span
                              style={{
                                fontSize: "0.58rem",
                                fontWeight: 700,
                                padding: "1px 4px",
                                borderRadius: 3,
                                background: "#0F766E",
                                color: "#FFFFFF",
                              }}
                            >
                              DEFAULT
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <div
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: isDark ? "#F8FAFC" : "#0F172A",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.name}
                      </div>

                      {/* Swatch Strip */}
                      <div style={{ display: "flex", gap: 4, marginTop: 1 }}>
                        {swatches.slice(0, 5).map((color, idx) => (
                          <span
                            key={idx}
                            style={{
                              flex: 1,
                              height: 14,
                              borderRadius: 3,
                              background: color,
                              border: color === '#FFFFFF' || color === '#F7F9F9' || color === '#F8FAFC'
                                ? '1px solid rgba(0,0,0,0.1)'
                                : 'none',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#0F766E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ─── 2. Brand Font Pill Button ─── */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => {
            setFontOpen(!fontOpen);
            setPaletteOpen(false);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "6px 12px",
            borderRadius: "9px",
            background: isDark
              ? fontOpen
                ? "rgba(255, 255, 255, 0.14)"
                : "rgba(255, 255, 255, 0.07)"
              : fontOpen
              ? "rgba(15, 23, 42, 0.09)"
              : "rgba(15, 23, 42, 0.05)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(15, 23, 42, 0.1)",
            color: isDark ? "#FFFFFF" : "#0F172A",
            cursor: "pointer",
            fontSize: "0.825rem",
            fontWeight: 600,
            transition: "all 0.18s ease",
            outline: "none",
          }}
          title="Select Product Typography Font"
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 19,
              height: 19,
              borderRadius: 4,
              background: isDark
                ? "rgba(255, 255, 255, 0.14)"
                : "rgba(15, 23, 42, 0.08)",
              fontWeight: 800,
              fontSize: "0.75rem",
            }}
          >
            Aa
          </span>
          <span
            style={{
              maxWidth: 125,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getFontLabel()}
          </span>
          <ChevronDown
            size={13}
            style={{
              opacity: 0.7,
              transform: fontOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* Font Dropdown Popover */}
        {fontOpen && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 10000 }}
              onClick={() => setFontOpen(false)}
            />
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                right: 0,
                width: "310px",
                maxHeight: "440px",
                overflowY: "auto",
                background: isDark ? "#0F172A" : "#FFFFFF",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.14)"
                  : "1px solid #E2E8F0",
                borderRadius: "14px",
                boxShadow: isDark
                  ? "0 14px 35px rgba(0,0,0,0.65)"
                  : "0 14px 30px rgba(0,0,0,0.12)",
                padding: "10px",
                zIndex: 10001,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  padding: "4px 8px 8px",
                  borderBottom: isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid #E2E8F0",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: isDark ? "#2DD4BF" : "#0F766E",
                  }}
                >
                  TYPOGRAPHY / FONT
                </div>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: isDark ? "#E2E8F0" : "#334155",
                    marginTop: 2,
                  }}
                >
                  Choose typeface from UI &amp; Branding:
                </div>
              </div>

              {FONT_OPTIONS.map((f) => {
                const isSelected = font === f.name || font === f.id;
                const fontLabelTag = f.label.split('—')[1]?.trim() || 'Default';

                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleSelectFont(f)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      border: isSelected
                        ? "1.5px solid #0F766E"
                        : isDark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid #F1F5F9",
                      background: isSelected
                        ? isDark
                          ? "rgba(15,118,110,0.18)"
                          : "#F0F9F8"
                        : isDark
                        ? "transparent"
                        : "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      fontFamily: f.value,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = isDark
                          ? "rgba(255,255,255,0.05)"
                          : "#F8FAFC";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = isDark
                          ? "transparent"
                          : "#FFFFFF";
                      }
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.83rem",
                          fontWeight: 700,
                          color: isDark ? "#F8FAFC" : "#0F172A",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span>{f.name}</span>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            padding: "1px 5px",
                            borderRadius: "4px",
                            background: isSelected
                              ? "#0F766E"
                              : isDark
                              ? "rgba(255,255,255,0.1)"
                              : "#E2E8F0",
                            color: isSelected
                              ? "#FFFFFF"
                              : isDark
                              ? "#94A3B8"
                              : "#475569",
                            fontWeight: 600,
                          }}
                        >
                          {fontLabelTag}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          color: isDark ? "#94A3B8" : "#64748B",
                          marginTop: 2,
                        }}
                      >
                        {f.preview}
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#0F766E",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

