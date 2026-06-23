import React, { useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import {
  PlusOutlined, SwapOutlined, EditOutlined, SearchOutlined,
  AlertOutlined, InboxOutlined, DollarCircleOutlined, LineChartOutlined,
  FilterOutlined, DownloadOutlined, EllipsisOutlined, ArrowUpOutlined,
  StarOutlined
} from '@ant-design/icons';

/* ── Mock Product Data ── */
const PRODUCTS = [
  {
    sku: 'IDB-2023-X90',
    emoji: '🔩',
    name: 'Industrial Power Drill XT-90',
    desc: 'High-torque heavy duty',
    category: 'Power Tools',
    warehouse: 'Kathmandu Central',
    available: 12,
    reorderPt: 50,
    status: 'CRITICAL',
  },
  {
    sku: 'NET-GW-52',
    emoji: '📡',
    name: 'Smart Gateway Hub Gen 2',
    desc: 'Wireless IoT Controller',
    category: 'Networking',
    warehouse: 'Lalitpur Hub',
    available: 142,
    reorderPt: 40,
    status: 'HEALTHY',
  },
  {
    sku: 'VLV-004-PR',
    emoji: '🔧',
    name: 'Precision Valve Model B-4',
    desc: 'Industrial Grade Brass',
    category: 'Plumbing',
    warehouse: 'Butwal Depot',
    available: 45,
    reorderPt: 40,
    status: 'LOW STOCK',
  },
  {
    sku: 'SKU-8821',
    emoji: '🧱',
    name: 'Premium OPC Cement',
    desc: '50kg grade 53 packaging',
    category: 'Construction',
    warehouse: 'Kathmandu Central',
    available: 1240,
    reorderPt: 200,
    status: 'HEALTHY',
  },
  {
    sku: 'SKU-9021',
    emoji: '🚿',
    name: 'UPVC Pressure Pipe 4in',
    desc: 'High density pipe fitting',
    category: 'Plumbing',
    warehouse: 'Lalitpur Hub',
    available: 8,
    reorderPt: 30,
    status: 'CRITICAL',
  },
  {
    sku: 'SKU-7721',
    emoji: '💡',
    name: 'LED Floodlight 200W',
    desc: 'IP65 outdoor rated',
    category: 'Electrical',
    warehouse: 'Kathmandu Central',
    available: 56,
    reorderPt: 20,
    status: 'HEALTHY',
  },
];

const STATUS_CONFIG = {
  'CRITICAL':  { cls: 'critical',  label: 'CRITICAL' },
  'HEALTHY':   { cls: 'healthy',   label: 'HEALTHY' },
  'LOW STOCK': { cls: 'low-stock', label: 'LOW STOCK' },
};

const EMOJI_MAP = {
  '/Account/Creation/Ledger':                   '📒',
  '/Account/Creation/Customer':                 '🏢',
  '/Inventory/Creation/Product':                '📦',
  '/Inventory/Transaction/PurchaseInvoice':     '🛒',
  '/Inventory/Transaction/SalesInvoice':        '🏷️',
  '/Account/Transaction/Receipt':               '💰',
  '/Account/Transaction/Payment':              '💸',
  '/Inventory/Reporting/StockSummary':          '📊',
  '/Account/Creation/VoucherMode':              '📋',
  '/Account/Creation/LedgerGroup':              '📁',
  '/Account/Transaction/Journal':               '📝',
  '/Account/Transaction/Contra':                '🔄',
  '/Inventory/Transaction/SalesReturn':         '↩️',
  '/Inventory/Transaction/CounterSales':        '🏪',
  '/Account/Reporting/ledgerVoucher':           '📋',
  '/Inventory/Reporting/ProductVoucher':        '🗂️',
};

function getEmoji(href) {
  return EMOJI_MAP[href] || '⚡';
}

export default function Dashboard({ onQuickAccess, darkMode, quickAccessItems = [], onToggleQuickAccess }) {
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');

  const criticalCount = PRODUCTS.filter(p => p.status === 'CRITICAL').length;

  const filtered = PRODUCTS.filter(p => {
    if (filter === 'CRITICAL' && p.status !== 'CRITICAL') return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.warehouse.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="erp-dash fade-in">

      {/* ── TITLE + ACTIONS ── */}
      <div className="erp-dash-title-section">
        <div>
          <div className="erp-dash-title">Stock Levels</div>
          <div className="erp-dash-subtitle">
            Real-time inventory tracking across <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>all</span> warehouses
          </div>
        </div>
        <div className="erp-dash-actions">
          <Button icon={<SwapOutlined />} style={{ borderRadius: 8, fontWeight: 500 }}>
            Transfer Stock
          </Button>
          <Button icon={<EditOutlined />} style={{ borderRadius: 8, fontWeight: 500 }}>
            Stock Adjustment
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              background: 'var(--primary)',
              borderColor: 'var(--primary)',
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            + Add Item
          </Button>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="erp-kpi-grid">
        {/* Total SKUs */}
        <div className="erp-kpi-card">
          <div className="erp-kpi-header">
            <div className="erp-kpi-label">Total SKUs</div>
            <div className="erp-kpi-icon">
              <InboxOutlined style={{ fontSize: 15 }} />
            </div>
          </div>
          <div className="erp-kpi-value">1,248</div>
          <div className="erp-kpi-trend positive">
            <ArrowUpOutlined style={{ fontSize: 10 }} /> +12 new this month
          </div>
        </div>

        {/* Critical Alert */}
        <div className="erp-kpi-card critical">
          <div className="erp-kpi-header">
            <div className="erp-kpi-label">Critical Alert</div>
            <div className="erp-kpi-icon">
              <AlertOutlined style={{ fontSize: 15 }} />
            </div>
          </div>
          <div className="erp-kpi-value">24 Items</div>
          <div className="erp-kpi-trend">Requires immediate restock</div>
        </div>

        {/* Asset Value */}
        <div className="erp-kpi-card">
          <div className="erp-kpi-header">
            <div className="erp-kpi-label">Asset Value</div>
            <div className="erp-kpi-icon">
              <DollarCircleOutlined style={{ fontSize: 15 }} />
            </div>
          </div>
          <div className="erp-kpi-value">NPR 4.2M</div>
          <div className="erp-kpi-trend">Current inventory valuation</div>
        </div>

        {/* Turnover */}
        <div className="erp-kpi-card">
          <div className="erp-kpi-header">
            <div className="erp-kpi-label">Turnover</div>
            <div className="erp-kpi-icon">
              <LineChartOutlined style={{ fontSize: 15 }} />
            </div>
          </div>
          <div className="erp-kpi-value">4.8x</div>
          <div className="erp-kpi-trend">Annualized average rate</div>
        </div>
      </div>

      {/* ── PRODUCT CATALOG ── */}
      <div className="erp-catalog-card">
        {/* Header */}
        <div className="erp-catalog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="erp-catalog-title">Product Catalog</div>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 6 }}>
              <div
                className={`erp-filter-pill ${filter === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilter('ALL')}
              >
                ALL STOCK
              </div>
              <div
                className={`erp-filter-pill critical-pill ${filter === 'CRITICAL' ? 'active' : ''}`}
                onClick={() => setFilter('CRITICAL')}
              >
                CRITICAL ({criticalCount})
              </div>
            </div>
          </div>

          <div className="erp-catalog-actions">
            <Input
              prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 12 }} />}
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ width: 200, borderRadius: 8, fontSize: 12 }}
              size="small"
            />
            <Tooltip title="Filter">
              <Button type="text" size="small" icon={<FilterOutlined />} style={{ color: 'var(--text-muted)' }} />
            </Tooltip>
            <Tooltip title="Export">
              <Button type="text" size="small" icon={<DownloadOutlined />} style={{ color: 'var(--text-muted)' }} />
            </Tooltip>
            <Tooltip title="More options">
              <Button type="text" size="small" icon={<EllipsisOutlined />} style={{ color: 'var(--text-muted)' }} />
            </Tooltip>
          </div>
        </div>

        {/* Table */}
        <table className="erp-table" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Product Details</th>
              <th>SKU ID</th>
              <th>Category</th>
              <th>Warehouse</th>
              <th>Available</th>
              <th>Reorder Pt.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(p => (
              <tr key={p.sku}>
                <td>
                  <div className="erp-prod-row">
                    <div className="erp-prod-thumb">{p.emoji}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className="erp-prod-name"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </div>
                      <div className="erp-prod-desc">{p.desc}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="erp-prod-sku">{p.sku}</span>
                </td>
                <td>
                  <span className="erp-cat-pill">{p.category}</span>
                </td>
                <td>
                  <span className="erp-wh-link">{p.warehouse}</span>
                </td>
                <td>
                  <span className={p.available <= p.reorderPt ? 'erp-units-critical' : 'erp-units-ok'}>
                    {p.available.toLocaleString()} units
                  </span>
                </td>
                <td>
                  <span className="erp-units-muted">{p.reorderPt} units</span>
                </td>
                <td>
                  <span className={`erp-status-badge ${STATUS_CONFIG[p.status].cls}`}>
                    {STATUS_CONFIG[p.status].label}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  No products match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── QUICK ACCESS ── */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 12,
        padding: '16px 20px',
        boxShadow: 'var(--shadow-xs)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ⚡ Quick Access
          <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)' }}>
            — Star menu items in the sidebar to pin them here
          </span>
        </div>

        {quickAccessItems.length === 0 ? (
          <div style={{
            padding: '28px 20px',
            textAlign: 'center',
            border: '1.5px dashed var(--border-color)',
            borderRadius: 10,
            background: 'var(--bg-layout)',
          }}>
            <StarOutlined style={{ fontSize: 28, color: '#f59e0b', marginBottom: 10, display: 'block' }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
              No shortcuts yet
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
              Hover over any menu item and click <strong>★</strong> to pin it here
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}>
            {quickAccessItems.map((q, i) => (
              <div
                key={i}
                onClick={() => onQuickAccess(q)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-layout)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--primary-light)';
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-layout)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span style={{ fontSize: 16 }}>{getEmoji(q.href)}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
