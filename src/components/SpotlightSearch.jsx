import React from 'react';
import { Input, Modal } from 'antd';
import { SearchOutlined, FileTextOutlined, ThunderboltOutlined } from '@ant-design/icons';

function flattenMenu(nodes, module = '') {
  let result = [];
  for (const n of nodes) {
    const mod = module || n.text;
    if (n.href && n.href !== '#') result.push({ text: n.text, href: n.href, module: mod });
    if (n.children) result = result.concat(flattenMenu(n.children, mod));
  }
  return result;
}

export default function SpotlightSearch({ open, onClose, onSelect, menuData }) {
  const [query, setQuery] = React.useState('');
  const allItems = React.useMemo(() => flattenMenu(menuData), [menuData]);

  const filtered = query.trim().length < 1
    ? allItems.slice(0, 12)
    : allItems.filter(i =>
        i.text.toLowerCase().includes(query.toLowerCase()) ||
        i.module.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 16);

  React.useEffect(() => { if (!open) setQuery(''); }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={560}
      style={{ top: 80 }}
      styles={{ body: { padding: 0 } }}
      className="erp-spotlight-content"
    >
      <div className="erp-spotlight-input-wrap">
        <SearchOutlined style={{ color: '#9ca3af', fontSize: 16 }} />
        <Input
          autoFocus
          bordered={false}
          placeholder="Search pages, forms, actions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ fontSize: 14, padding: '0 8px' }}
          onKeyDown={e => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Enter' && filtered.length > 0) { onSelect(filtered[0]); }
          }}
        />
        <span style={{ fontSize: 10, color: '#9ca3af', padding: '2px 6px', background: '#f3f4f6', borderRadius: 4 }}>ESC</span>
      </div>
      <div className="erp-spotlight-results">
        {filtered.length === 0 && (
          <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No results found</div>
        )}
        {filtered.map((item, i) => (
          <div key={i} className="erp-spotlight-item" onClick={() => onSelect(item)}>
            <FileTextOutlined style={{ color: '#9ca3af', fontSize: 14, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: '#111827', fontWeight: 500 }}>{item.text}</span>
            <span className="erp-spotlight-mod">{item.module}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 18px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 12 }}>
        <span style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
          <ThunderboltOutlined style={{ fontSize: 11 }} /> Quick tip: Use Ctrl+K anytime to search
        </span>
      </div>
    </Modal>
  );
}
