import React, { useState, useEffect } from 'react';
import { Modal, Button, Divider, Tooltip, notification } from 'antd';
import {
  BgColorsOutlined, FontColorsOutlined, CheckOutlined,
  ReloadOutlined, CloseOutlined,
} from '@ant-design/icons';
import {
  COLOR_PALETTES, FONT_OPTIONS, DEFAULT_PALETTE_ID,
  applyPalette, applyFont, resetToDefault, saveBranding, loadBranding,
} from '../data/brandingConfig';
import { useThemeStore } from '../lib/store/themeStore';

/* ═══════════════════════════════════════════════════════════════
   BrandingModal.jsx
   UI & Branding settings — color palette selector + font picker.
   Applies changes live to CSS custom properties on :root.
   ═══════════════════════════════════════════════════════════════ */

function SwatchStrip({ swatches }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${swatches.length}, 1fr)`, gap: 6, margin: '10px 0' }}>
      {swatches.map((color, i) => (
        <div
          key={i}
          style={{
            height: 38,
            borderRadius: 6,
            background: color,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '3px 5px',
            fontSize: '9.5px',
            fontFamily: 'monospace',
            fontWeight: 700,
            color: (color === '#FFFFFF' || color === '#F7F9F9' || color === '#F8FAFC' || color === '#ebebdc') ? '#0F172A' : '#FFFFFF',
            border: (color === '#FFFFFF' || color === '#F7F9F9' || color === '#F8FAFC') ? '1px solid rgba(0,0,0,0.1)' : 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        >
          {color}
        </div>
      ))}
    </div>
  );
}

export default function BrandingModal({ open, onClose, darkMode, activePaletteId, activeFontId, onApply }) {
  const currentTheme = useThemeStore();
  const getEffectivePaletteId = () => currentTheme?.palette?.id || activePaletteId || DEFAULT_PALETTE_ID;
  const getEffectiveFontId = () => {
    const storeFont = currentTheme?.font;
    const match = FONT_OPTIONS.find(f => f.name === storeFont || f.id === storeFont);
    return match?.id || activeFontId || 'plus-jakarta-sans';
  };

  const [selectedPaletteId, setSelectedPaletteId] = useState(getEffectivePaletteId);
  const [selectedFontId, setSelectedFontId]       = useState(getEffectiveFontId);
  const [previewPaletteId, setPreviewPaletteId]   = useState(null);
  
  // Track per-palette sidebar mode preference: { [paletteId]: 'dark' | 'light' }
  const [paletteSidebarModes, setPaletteSidebarModes] = useState(() => {
    const saved = loadBranding();
    return {
      [DEFAULT_PALETTE_ID]: saved.sidebarMode || 'dark',
      'pivotal-cloud-growth': 'dark',
      'pivotal-cobalt-slate': 'dark',
    };
  });

  /* Sync incoming props & themeStore when modal opens */
  useEffect(() => {
    if (open) {
      const saved = loadBranding();
      const effPalId = currentTheme?.palette?.id || activePaletteId || saved.paletteId || DEFAULT_PALETTE_ID;
      const storeFont = currentTheme?.font;
      const match = FONT_OPTIONS.find(f => f.name === storeFont || f.id === storeFont);
      const effFontId = match?.id || activeFontId || saved.fontId || 'plus-jakarta-sans';

      setSelectedPaletteId(effPalId);
      setSelectedFontId(effFontId);
      setPreviewPaletteId(null);
      setPaletteSidebarModes(prev => ({
        ...prev,
        [effPalId]: currentTheme?.palette?.sidebarType === 'white' ? 'light' : saved.sidebarMode || 'dark',
      }));
    }
  }, [open, activePaletteId, activeFontId, currentTheme?.palette?.id, currentTheme?.font]);

  const getSidebarModeFor = (paletteId) => {
    return paletteSidebarModes[paletteId] || 'dark';
  };

  const handleToggleSidebarMode = (e, paletteId) => {
    e.stopPropagation();
    const currentMode = getSidebarModeFor(paletteId);
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    
    setPaletteSidebarModes(prev => ({
      ...prev,
      [paletteId]: newMode,
    }));

    const palette = COLOR_PALETTES.find(p => p.id === paletteId);
    if (palette && (selectedPaletteId === paletteId || previewPaletteId === paletteId)) {
      applyPalette(palette, newMode);
    }
  };

  const handlePaletteHover = (paletteId) => {
    const palette = COLOR_PALETTES.find(p => p.id === paletteId);
    if (palette) applyPalette(palette, getSidebarModeFor(paletteId));
    setPreviewPaletteId(paletteId);
  };

  const handlePaletteLeave = () => {
    // Restore current selected palette
    const palette = COLOR_PALETTES.find(p => p.id === selectedPaletteId);
    if (palette) applyPalette(palette, getSidebarModeFor(selectedPaletteId));
    setPreviewPaletteId(null);
  };

  const handlePaletteSelect = (paletteId) => {
    setSelectedPaletteId(paletteId);
    const palette = COLOR_PALETTES.find(p => p.id === paletteId);
    if (palette) applyPalette(palette, getSidebarModeFor(paletteId));
  };

  const handleFontSelect = (fontId) => {
    setSelectedFontId(fontId);
    const font = FONT_OPTIONS.find(f => f.id === fontId);
    if (font) applyFont(font);
  };

  const handleApply = () => {
    const palette = COLOR_PALETTES.find(p => p.id === selectedPaletteId);
    const font    = FONT_OPTIONS.find(f => f.id === selectedFontId);
    const sidebarMode = getSidebarModeFor(selectedPaletteId);
    if (palette) applyPalette(palette, sidebarMode);
    if (font)    applyFont(font);
    saveBranding(selectedPaletteId, selectedFontId, sidebarMode);
    if (onApply) onApply(selectedPaletteId, selectedFontId, sidebarMode);
    notification.success({
      message: 'Branding applied!',
      description: `Theme: ${palette?.name} · Sidebar: ${sidebarMode.toUpperCase()} · Font: ${font?.name}`,
      placement: 'topRight',
      duration: 3,
      icon: <BgColorsOutlined style={{ color: 'var(--primary)' }} />,
    });
    onClose();
  };

  const handleReset = () => {
    resetToDefault();
    setSelectedPaletteId(DEFAULT_PALETTE_ID);
    setSelectedFontId('plus-jakarta-sans');
    setPaletteSidebarModes({ [DEFAULT_PALETTE_ID]: 'dark' });
    saveBranding(DEFAULT_PALETTE_ID, 'plus-jakarta-sans', 'dark');
    if (onApply) onApply(DEFAULT_PALETTE_ID, 'plus-jakarta-sans', 'dark');
    notification.info({
      message: 'Reset to default',
      description: 'Nordic Deep Teal theme & Plus Jakarta Sans typography restored.',
      placement: 'topRight',
      duration: 3,
    });
    onClose();
  };

  const handleClose = () => {
    // Restore currently active palette on cancel
    const palette = COLOR_PALETTES.find(p => p.id === activePaletteId);
    const font    = FONT_OPTIONS.find(f => f.id === activeFontId);
    const saved   = loadBranding();
    if (palette) applyPalette(palette, saved.sidebarMode || 'dark');
    if (font)    applyFont(font);
    onClose();
  };

  const displayPaletteId = previewPaletteId || selectedPaletteId;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      width={780}
      footer={null}
      destroyOnClose={false}
      centered
      className={`branding-modal${darkMode ? ' dark' : ''}`}
      title={null}
      styles={{
        content: { padding: 0, borderRadius: 16, overflow: 'hidden', background: darkMode ? '#0F1716' : '#fff' },
        mask: { backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.45)' },
      }}
    >
      {/* ── Header ── */}
      <div className="bm-header" style={{ padding: '16px 24px', background: darkMode ? '#09201E' : '#F8FAFC' }}>
        <div className="bm-header-left">
          <div className="bm-header-icon" style={{ background: '#0F766E', color: 'white', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BgColorsOutlined />
          </div>
          <div>
            <div className="bm-title" style={{ fontSize: 16, fontWeight: 700 }}>UI &amp; Branding</div>
            <div className="bm-subtitle" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Select your organization theme and typography</div>
          </div>
        </div>
        <button className="bm-close-btn" onClick={handleClose}><CloseOutlined /></button>
      </div>

      <Divider style={{ margin: 0, borderColor: darkMode ? '#143834' : '#E2E8F0' }} />

      <div className="bm-body" style={{ padding: '20px 24px', maxHeight: '72vh', overflowY: 'auto' }}>

        {/* ── Section: Color Palettes ── */}
        <div className="bm-section-label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#0F766E', marginBottom: 4 }}>
          <BgColorsOutlined style={{ marginRight: 6 }} />
          SYSTEM COLOR PALETTES
        </div>
        <p className="bm-section-hint" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          Hover to preview · Click to select · Use the sidebar slider to switch between Dark and Light sidebar styles
        </p>

        <div className="bm-palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {COLOR_PALETTES.map((palette) => {
            const isSelected = selectedPaletteId === palette.id;
            const isPreviewing = previewPaletteId === palette.id;
            const isDefault = palette.id === DEFAULT_PALETTE_ID;
            const isNordic = palette.id === 'nordic-deep-teal';
            const sidebarMode = getSidebarModeFor(palette.id);
            const isSidebarDark = sidebarMode === 'dark';

            return (
              <div
                key={palette.id}
                className={`bm-palette-card${isSelected ? ' selected' : ''}${isPreviewing ? ' previewing' : ''}`}
                style={{
                  background: isSelected 
                    ? (darkMode ? '#0A2623' : '#F0F9F8') 
                    : (darkMode ? '#0A1A18' : '#FFFFFF'),
                  borderColor: isSelected 
                    ? '#0F766E' 
                    : (darkMode ? 'rgba(20,184,166,0.18)' : '#E2E8F0'),
                  borderWidth: isSelected ? 2 : 1,
                  borderStyle: 'solid',
                  borderRadius: 12,
                  padding: 16,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 0 3px rgba(15,118,110,0.18), 0 8px 24px rgba(0,0,0,0.12)' : '0 2px 6px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={() => handlePaletteHover(palette.id)}
                onMouseLeave={handlePaletteLeave}
                onClick={() => handlePaletteSelect(palette.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${palette.name} palette`}
              >
                {/* Header Row: Option subtitle + Tag badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {palette.subtitle || 'COLOR PALETTE'}
                  </span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {palette.tag && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'rgba(20,184,166,0.15)', color: '#14B8A6' }}>
                        {palette.tag}
                      </span>
                    )}
                    {isDefault && <span className="bm-badge default" style={{ background: '#0F766E', color: '#FFFFFF', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Default</span>}
                    {isSelected && (
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#0F766E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                        <CheckOutlined />
                      </span>
                    )}
                  </div>
                </div>

                {/* Name + Description */}
                <div style={{ fontSize: 15, fontWeight: 800, color: darkMode ? '#F7F9F9' : '#0F172A', marginTop: 2 }}>
                  {palette.name}
                </div>
                <div style={{ fontSize: 11.5, color: darkMode ? '#94A3B8' : '#64748B', marginTop: 2, marginBottom: 8, lineHeight: 1.4 }}>
                  {palette.description}
                </div>

                {/* Swatch strip with Hex Labels */}
                <SwatchStrip swatches={palette.swatches} />

                {/* ── NEW: Sidebar Light / Dark Slider Switch ── */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    margin: '10px 0 8px',
                    borderRadius: 8,
                    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                      Sidebar Appearance
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      Current: <strong style={{ color: '#14B8A6' }}>{isSidebarDark ? 'Dark Pine' : 'Clean White'}</strong>
                    </span>
                  </div>

                  {/* Interactive Slider Pill Toggle */}
                  <div
                    onClick={(e) => handleToggleSidebarMode(e, palette.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: isSidebarDark ? '#092825' : '#E2E8F0',
                      border: '1px solid ' + (isSidebarDark ? '#14B8A6' : '#CBD5E1'),
                      borderRadius: 20,
                      padding: 2,
                      cursor: 'pointer',
                      width: 90,
                      height: 28,
                      position: 'relative',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      userSelect: 'none',
                    }}
                    title={`Click to set ${isSidebarDark ? 'Light' : 'Dark'} sidebar`}
                  >
                    {/* Active Thumb Slider */}
                    <div
                      style={{
                        position: 'absolute',
                        left: isSidebarDark ? 4 : 46,
                        width: 38,
                        height: 22,
                        borderRadius: 14,
                        background: isSidebarDark ? '#0F766E' : '#FFFFFF',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                        transition: 'left 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 800,
                        zIndex: 1,
                        color: isSidebarDark ? '#FFFFFF' : '#64748B',
                      }}
                    >
                      Dark
                    </span>
                    <span
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 800,
                        zIndex: 1,
                        color: !isSidebarDark ? '#0F766E' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      Light
                    </span>
                  </div>
                </div>

                {/* Live ERP Component Mockup (Matching Screenshot) */}
                <div
                  style={{
                    marginTop: 4,
                    borderRadius: 8,
                    padding: '10px 14px',
                    background: isNordic 
                      ? (isSidebarDark ? '#061715' : '#F7F9F9') 
                      : (palette.id === 'fintech-precision' 
                          ? (isSidebarDark ? '#0A1128' : '#F8FAFC') 
                          : (isSidebarDark ? '#0F172A' : '#FFFFFF')),
                    border: '1px solid ' + (isNordic ? 'rgba(20,184,166,0.22)' : 'rgba(0,0,0,0.1)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#14B8A6', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{palette.previewItem?.title || 'Ledger Annexure 13'}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: isSidebarDark ? '#FFFFFF' : '#0F172A', marginTop: 2 }}>
                      {palette.previewItem?.amount || 'Rs. 62,72,500'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'rgba(20,184,166,0.2)', color: '#14B8A6' }}>
                      {palette.previewItem?.badge || 'Reconciled'}
                    </span>
                    <button
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#0F766E',
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      }}
                    >
                      {palette.previewItem?.button || 'Sync Ledger'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <Divider style={{ margin: '24px 0 18px', borderColor: darkMode ? '#143834' : '#E2E8F0' }} />

        {/* ── Section: Font ── */}
        <div className="bm-section-label" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#0F766E', marginBottom: 4 }}>
          <FontColorsOutlined style={{ marginRight: 6 }} />
          TYPOGRAPHY / FONT
        </div>
        <p className="bm-section-hint" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          Choose the typeface used across the entire ERP interface
        </p>

        <div className="bm-font-grid">
          {FONT_OPTIONS.map((font) => {
            const isSelected = selectedFontId === font.id;
            return (
              <div
                key={font.id}
                className={`bm-font-card${isSelected ? ' selected' : ''}`}
                onClick={() => handleFontSelect(font.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${font.name} font`}
              >
                {isSelected && <span className="bm-check small"><CheckOutlined /></span>}
                <div className="bm-font-name" style={{ fontFamily: font.value }}>
                  {font.name}
                </div>
                <div className="bm-font-preview" style={{ fontFamily: font.value }}>
                  {font.preview}
                </div>
                <div className="bm-font-label">{font.label.split('—')[1]?.trim() || 'Default'}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Divider style={{ margin: 0, borderColor: darkMode ? '#2d3142' : '#f0f0f0' }} />

      {/* ── Footer ── */}
      <div className="bm-footer">
        <Tooltip title="Restore the original Emerald Tangerine Morning theme">
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            style={{ borderRadius: 8 }}
          >
            Reset to Default
          </Button>
        </Tooltip>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={handleClose} style={{ borderRadius: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleApply}
            style={{
              borderRadius: 8,
              background: 'var(--primary)',
              borderColor: 'var(--primary)',
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Apply Theme
          </Button>
        </div>
      </div>
    </Modal>
  );
}
