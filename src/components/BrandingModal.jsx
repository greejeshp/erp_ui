import React, { useState, useEffect } from 'react';
import { Modal, Button, Divider, Tooltip, notification } from 'antd';
import {
  BgColorsOutlined, FontColorsOutlined, CheckOutlined,
  ReloadOutlined, CloseOutlined,
} from '@ant-design/icons';
import {
  COLOR_PALETTES, FONT_OPTIONS, DEFAULT_PALETTE_ID,
  applyPalette, applyFont, resetToDefault, saveBranding,
} from '../data/brandingConfig';

/* ═══════════════════════════════════════════════════════════════
   BrandingModal.jsx
   UI & Branding settings — color palette selector + font picker.
   Applies changes live to CSS custom properties on :root.
   ═══════════════════════════════════════════════════════════════ */

function SwatchStrip({ swatches }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
      {swatches.map((color, i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: color,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function BrandingModal({ open, onClose, darkMode, activePaletteId, activeFontId, onApply }) {
  const [selectedPaletteId, setSelectedPaletteId] = useState(activePaletteId || DEFAULT_PALETTE_ID);
  const [selectedFontId, setSelectedFontId]       = useState(activeFontId || 'montserrat');
  const [previewPaletteId, setPreviewPaletteId]   = useState(null);

  /* Sync incoming props when modal opens */
  useEffect(() => {
    if (open) {
      setSelectedPaletteId(activePaletteId || DEFAULT_PALETTE_ID);
      setSelectedFontId(activeFontId || 'montserrat');
      setPreviewPaletteId(null);
    }
  }, [open, activePaletteId, activeFontId]);

  const handlePaletteHover = (paletteId) => {
    const palette = COLOR_PALETTES.find(p => p.id === paletteId);
    if (palette) applyPalette(palette);
    setPreviewPaletteId(paletteId);
  };

  const handlePaletteLeave = () => {
    // Restore current selected palette
    const palette = COLOR_PALETTES.find(p => p.id === selectedPaletteId);
    if (palette) applyPalette(palette);
    setPreviewPaletteId(null);
  };

  const handlePaletteSelect = (paletteId) => {
    setSelectedPaletteId(paletteId);
    const palette = COLOR_PALETTES.find(p => p.id === paletteId);
    if (palette) applyPalette(palette);
  };

  const handleFontSelect = (fontId) => {
    setSelectedFontId(fontId);
    const font = FONT_OPTIONS.find(f => f.id === fontId);
    if (font) applyFont(font);
  };

  const handleApply = () => {
    const palette = COLOR_PALETTES.find(p => p.id === selectedPaletteId);
    const font    = FONT_OPTIONS.find(f => f.id === selectedFontId);
    if (palette) applyPalette(palette);
    if (font)    applyFont(font);
    saveBranding(selectedPaletteId, selectedFontId);
    if (onApply) onApply(selectedPaletteId, selectedFontId);
    notification.success({
      message: 'Branding applied!',
      description: `Theme: ${palette?.name} · Font: ${font?.name}`,
      placement: 'topRight',
      duration: 3,
      icon: <BgColorsOutlined style={{ color: 'var(--primary)' }} />,
    });
    onClose();
  };

  const handleReset = () => {
    resetToDefault();
    setSelectedPaletteId(DEFAULT_PALETTE_ID);
    setSelectedFontId('montserrat');
    saveBranding(DEFAULT_PALETTE_ID, 'montserrat');
    if (onApply) onApply(DEFAULT_PALETTE_ID, 'montserrat');
    notification.info({
      message: 'Reset to default',
      description: 'Emerald Tangerine Morning theme restored.',
      placement: 'topRight',
      duration: 3,
    });
    onClose();
  };

  const handleClose = () => {
    // Restore currently active palette on cancel
    const palette = COLOR_PALETTES.find(p => p.id === activePaletteId);
    const font    = FONT_OPTIONS.find(f => f.id === activeFontId);
    if (palette) applyPalette(palette);
    if (font)    applyFont(font);
    onClose();
  };

  const displayPaletteId = previewPaletteId || selectedPaletteId;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      width={700}
      footer={null}
      destroyOnClose={false}
      centered
      className={`branding-modal${darkMode ? ' dark' : ''}`}
      title={null}
      styles={{
        content: { padding: 0, borderRadius: 16, overflow: 'hidden', background: darkMode ? '#1a1d27' : '#fff' },
        mask: { backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.35)' },
      }}
    >
      {/* ── Header ── */}
      <div className="bm-header">
        <div className="bm-header-left">
          <div className="bm-header-icon">
            <BgColorsOutlined />
          </div>
          <div>
            <div className="bm-title">UI &amp; Branding</div>
            <div className="bm-subtitle">Customize the color palette and typography of your ERP</div>
          </div>
        </div>
        <button className="bm-close-btn" onClick={handleClose}><CloseOutlined /></button>
      </div>

      <Divider style={{ margin: 0, borderColor: darkMode ? '#2d3142' : '#f0f0f0' }} />

      <div className="bm-body">

        {/* ── Section: Color Palettes ── */}
        <div className="bm-section-label">
          <BgColorsOutlined style={{ marginRight: 6 }} />
          COLOR PALETTE
        </div>
        <p className="bm-section-hint">
          Hover to preview · Click to select · Changes apply instantly
        </p>

        <div className="bm-palette-grid">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = selectedPaletteId === palette.id;
            const isPreviewing = previewPaletteId === palette.id;
            const isDefault = palette.id === DEFAULT_PALETTE_ID;
            return (
              <div
                key={palette.id}
                className={`bm-palette-card${isSelected ? ' selected' : ''}${isPreviewing ? ' previewing' : ''}`}
                onMouseEnter={() => handlePaletteHover(palette.id)}
                onMouseLeave={handlePaletteLeave}
                onClick={() => handlePaletteSelect(palette.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${palette.name} palette`}
              >
                {/* Check + Default badges */}
                <div className="bm-palette-badges">
                  {isDefault && <span className="bm-badge default">Default</span>}
                  {isSelected && <span className="bm-check"><CheckOutlined /></span>}
                </div>

                {/* Swatch strip */}
                <SwatchStrip swatches={palette.swatches} />

                {/* Name + description */}
                <div className="bm-palette-name">{palette.name}</div>
                <div className="bm-palette-desc">{palette.description}</div>
              </div>
            );
          })}
        </div>

        <Divider style={{ margin: '20px 0 16px', borderColor: darkMode ? '#2d3142' : '#f0f0f0' }} />

        {/* ── Section: Font ── */}
        <div className="bm-section-label">
          <FontColorsOutlined style={{ marginRight: 6 }} />
          TYPOGRAPHY / FONT
        </div>
        <p className="bm-section-hint">
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
