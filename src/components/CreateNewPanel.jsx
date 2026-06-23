import React, { useEffect, useRef } from 'react';
import { QUICK_CREATE_CATEGORIES } from '../data/quickCreateSchema';

/* ═══════════════════════════════════════════════════════
   CreateNewPanel.jsx
   The categorized dropdown panel that appears when the
   user clicks "Quick Create" in the sidebar.
   openUpward: true = panel anchors above the button (bottom sidebar)
   ═══════════════════════════════════════════════════════ */
export default function CreateNewPanel({ open, onClose, onSelect, darkMode, anchorEl, openUpward }) {

  const panelRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) &&
          anchorEl && !anchorEl.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose, anchorEl]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0,
          zIndex: 1050,
          background: 'transparent',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`erp-create-panel${darkMode ? ' dark' : ''}${openUpward ? ' upward' : ''}`}
      >

        {/* Header */}
        <div className="erp-create-panel-header">
          <span className="erp-create-panel-title">
            <span className="erp-create-panel-title-icon">＋</span>
            Create New
          </span>
          <button className="erp-create-panel-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Category columns */}
        <div className="erp-create-panel-grid">
          {QUICK_CREATE_CATEGORIES.map((cat) => (
            <div key={cat.label} className="erp-create-panel-column">
              <div className="erp-create-panel-category-label">{cat.label}</div>
              <div className="erp-create-panel-items">
                {cat.items.map((item) => (
                  <button
                    key={item.href}
                    className="erp-create-panel-item"
                    onClick={() => {
                      onSelect(item.href, item.title);
                      onClose();
                    }}
                  >
                    <span className="erp-create-panel-item-plus">＋</span>
                    <span className="erp-create-panel-item-icon">{item.icon}</span>
                    <span className="erp-create-panel-item-label">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="erp-create-panel-footer">
          <span>💡 Tip: Fill only required fields, then use <strong>Add More Details</strong> for complete setup</span>
        </div>
      </div>
    </>
  );
}
