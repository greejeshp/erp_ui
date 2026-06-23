import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import {
  SearchOutlined,
  AccountBookOutlined, InboxOutlined, SettingOutlined,
  DollarCircleOutlined, BankOutlined, SafetyOutlined, BarChartOutlined,
  CustomerServiceOutlined, CheckCircleOutlined, ToolOutlined,
  FileTextOutlined, SwapOutlined, LineChartOutlined,
  ShoppingCartOutlined, TagsOutlined, DatabaseOutlined,
  AuditOutlined, FundOutlined, AppstoreOutlined,
  PlusOutlined, BookOutlined, WalletOutlined,
  PieChartOutlined, StockOutlined, FileDoneOutlined,
  TeamOutlined, ClockCircleOutlined, GlobalOutlined,
  SnippetsOutlined, BarsOutlined
} from '@ant-design/icons';

/* ─────────────────────────────────────────────
   MEGA MENU DATA  – mirrors the screenshot layout
───────────────────────────────────────────── */
const MEGA_SECTIONS = [
  {
    key: 'accounting',
    label: 'Accounting',
    color: '#0D2137',
    bg: '#e8f0fe',
    icon: <AccountBookOutlined />,
    groups: [
      {
        title: 'Creation',
        items: [
          { text: 'Ledger Group',        href: '/Account/Creation/LedgerGroup' },
          { text: 'Ledger',              href: '/Account/Creation/Ledger' },
          { text: 'Customer',            href: '/Account/Creation/Customer' },
          { text: 'Salesman',            href: '/Account/Creation/SalesMan' },
          { text: 'Area Master',         href: '/Account/Creation/AreaMaster' },
          { text: 'Currency',            href: '/Account/Creation/Currency' },
          { text: 'Narration Master',    href: '/Account/Creation/NarrationMaster' },
          { text: 'Voucher Mode',        href: '/Account/Creation/VoucherMode' },
        ],
      },
      {
        title: 'Transactions',
        items: [
          { text: 'Receipt',   href: '/Account/Transaction/Receipt' },
          { text: 'Payment',   href: '/Account/Transaction/Payment' },
          { text: 'Contra',    href: '/Account/Transaction/Contra' },
          { text: 'Journal',   href: '/Account/Transaction/Journal' },
        ],
      },
    ],
  },
  {
    key: 'financial',
    label: 'Financial Reports',
    color: '#1565c0',
    bg: '#e3f2fd',
    icon: <PieChartOutlined />,
    groups: [
      {
        title: 'Ledger & Books',
        items: [
          { text: 'Day Book',              href: '/Account/Reporting/DayBook' },
          { text: 'Receivables Summary',   href: '/Account/Reporting/BillsReceivable' },
          { text: 'General Ledger Voucher',href: '/Account/Reporting/ledgerVoucher' },
          { text: 'Multiple Ledger Voucher',href: '/Account/Reporting/MulLedgerVoucher' },
          { text: 'Sub Ledger Voucher',    href: '/Account/Reporting/CashBankLedgerVoucher' },
          { text: 'Income Expenditure',    href: '/Account/Reporting/IncomeExpenditure' },
          { text: 'Trial Balance',         href: '/Account/Reporting/GroupWise' },
          { text: 'Profit & Loss',         href: '/Account/Reporting/ProfitAndLoss' },
          { text: 'Balance Sheet',         href: '/Account/Reporting/BalanceSheet' },
        ],
      },
    ],
  },
  {
    key: 'outstanding',
    label: 'Outstanding Reports',
    color: '#6a1b9a',
    bg: '#f3e5f5',
    icon: <SnippetsOutlined />,
    groups: [
      {
        title: 'A/R (Receivables)',
        items: [
          { text: 'Receivables Summary', href: '/Account/Reporting/BillsReceivable' },
          { text: 'Ageing',              href: '/Inventory/Reporting/PartyAgeing' },
          { text: 'Bill wise Dues',      href: '/Account/Reporting/PartyWiseDuesBillList' },
        ],
      },
      {
        title: 'A/P (Payables)',
        items: [
          { text: 'Payables Summary', href: '/Account/Reporting/BillsPayable' },
          { text: 'Ageing',           href: '/Inventory/Reporting/CostCenterAgeing' },
          { text: 'Bill wise Dues',   href: '/Account/Reporting/PartyWiseDuesBillList' },
        ],
      },
    ],
  },
  {
    key: 'cash-bank',
    label: 'Cash & Bank Reports',
    color: '#00695c',
    bg: '#e0f2f1',
    icon: <WalletOutlined />,
    groups: [
      {
        title: 'Bank Books',
        items: [
          { text: 'Cash/Bank Book',       href: '/Account/Reporting/CashAndBankBook' },
          { text: 'CashBank Voucher',     href: '/Account/Reporting/CashBankLedgerVoucher' },
          { text: 'Bank Reconciliation',  href: '/Account/Reporting/BankReconciliation' },
          { text: 'Cheque Book Register', href: '/Account/Reporting/PostDatedCheque' },
        ],
      },
    ],
  },
  {
    key: 'sales',
    label: 'Sales Reports',
    color: '#e65100',
    bg: '#fff3e0',
    icon: <TagsOutlined />,
    groups: [
      {
        title: 'Sales',
        items: [
          { text: 'Sales Summary',            href: '/Inventory/Reporting/SalesAnalysis' },
          { text: 'Sales Analysis',           href: '/Inventory/Reporting/SalesAnalysisProductWise' },
          { text: 'Sales Vat Register',       href: '/Account/Reporting/SalesVatRegister' },
          { text: 'Sales Return Vat Register',href: '/Account/Reporting/SalesReturnVatRegister' },
          { text: 'One Lakh Above Sales',     href: '/Account/Reporting/OneLakhAboveSales' },
          { text: 'Pending Sales Order',      href: '/Inventory/Reporting/PendingSalesOrder' },
          { text: 'Pending Delivery',         href: '/Inventory/Reporting/PendingDeliveryNote' },
          { text: 'Delivery Analysis',        href: '/Inventory/Reporting/DeliveryAnalysis' },
          { text: 'Voucher Wise Costing',     href: '/Inventory/Reporting/StockSummary' },
        ],
      },
    ],
  },
  {
    key: 'purchase',
    label: 'Purchase Reports',
    color: '#ad1457',
    bg: '#fce4ec',
    icon: <ShoppingCartOutlined />,
    groups: [
      {
        title: 'Purchase',
        items: [
          { text: 'Purchase Summary',          href: '/Inventory/Reporting/PurchaseAnalysis' },
          { text: 'Purchase Analysis',         href: '/Inventory/Reporting/PurchaseAnalysisProductWise' },
          { text: 'Purchase Vat Register',     href: '/Account/Reporting/PurchaseVatRegister' },
          { text: 'Purchase Return Vat Reg.',  href: '/Account/Reporting/PurchaseReturnVatRegister' },
          { text: 'One Lakh Above Purchase',   href: '/Account/Reporting/OneLakhAbovePurchase' },
          { text: 'Pending Purchase Order',    href: '/Inventory/Reporting/PendingPurchaseOrder' },
          { text: 'Pending Purchase Note',     href: '/Inventory/Transaction/PendingPurchaseInvoice' },
          { text: 'Receipt Note Analysis',     href: '/Inventory/Reporting/ReceiptNoteAnalysis' },
          { text: 'Voucher Wise Costing',      href: '/Inventory/Reporting/StockSummary' },
        ],
      },
    ],
  },
  {
    key: 'inventory',
    label: 'Inventory Reports',
    color: '#558b2f',
    bg: '#f1f8e9',
    icon: <DatabaseOutlined />,
    groups: [
      {
        title: 'Stock & Products',
        items: [
          { text: 'Product Voucher',        href: '/Inventory/Reporting/ProductVoucher' },
          { text: 'Product Ageing',         href: '/Inventory/Reporting/ProductAgeing' },
          { text: 'Stock Summary',          href: '/Inventory/Reporting/StockSummary' },
          { text: 'Near Expiry',            href: '/Inventory/Reporting/NearExpiry' },
          { text: 'Price List',             href: '/Inventory/Reporting/ProductRateList' },
          { text: 'Consumption List',       href: '/Inventory/Reporting/ConsumptionList' },
          { text: 'Stock Transfer Register',href: '/Inventory/Reporting/StockTransfer' },
          { text: 'TDS Report',             href: '/Account/Reporting/TDSSummary' },
        ],
      },
    ],
  },
  {
    key: 'tax',
    label: 'Tax Reports',
    color: '#4527a0',
    bg: '#ede7f6',
    icon: <FileDoneOutlined />,
    groups: [
      {
        title: 'Tax & Compliance',
        items: [
          { text: 'Sales Vat Register',       href: '/Account/Reporting/SalesVatRegister' },
          { text: 'Purchase Vat Register',    href: '/Account/Reporting/PurchaseVatRegister' },
          { text: 'Purchase Vat Return Reg.', href: '/Account/Reporting/PurchaseReturnVatRegister' },
          { text: 'Annex 13',                 href: '/Account/Reporting/TDSSummary' },
          { text: 'Annex 15',                 href: '/Account/Reporting/TDSVat' },
          { text: 'Vat Summary',              href: '/Account/Reporting/VatSummary' },
          { text: 'Excise Register',          href: '/Account/Reporting/ExciseRegister' },
          { text: 'Parchi Register',          href: '/Account/Reporting/SalesVatRegister' },
          { text: 'Sales Maker (Annex 14)',   href: '/Account/Reporting/OneLakhAboveSales' },
        ],
      },
    ],
  },
  {
    key: 'audit',
    label: 'Audit & Compliance',
    color: '#c62828',
    bg: '#ffebee',
    icon: <AuditOutlined />,
    groups: [
      {
        title: 'System Audit',
        items: [
          { text: 'Audit Trail Report', href: '/Setup/Security/UserWiseLog' },
          { text: 'Sales Vat Register', href: '/Account/Reporting/SalesVatRegister' },
          { text: 'Web Api Log',        href: '/Setup/Security/WebApiLog' },
          { text: 'SQL Error Log',      href: '/Setup/Security/SqlErrorLog' },
          { text: 'SMS Api Log',        href: '/Setup/Security/NotificationLog' },
          { text: 'Notification Log',   href: '/Setup/Security/NotificationLog' },
          { text: 'Email Log',          href: '/Setup/Security/EmailLog' },
          { text: 'Job Log',            href: '/Setup/Security/LoginLog' },
          { text: 'SQL Error Log',      href: '/Setup/Security/SqlErrorLog' },
        ],
      },
    ],
  },
];

/* ── Flatten all items for search ── */
function flattenAll() {
  const results = [];
  MEGA_SECTIONS.forEach(sec => {
    sec.groups.forEach(grp => {
      grp.items.forEach(item => {
        results.push({
          ...item,
          section: sec.label,
          sectionColor: sec.color,
          group: grp.title,
        });
      });
    });
  });
  return results;
}
const ALL_ITEMS = flattenAll();

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function MegaMenu({ onNavigate, darkMode }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accounting');
  const [searchQuery, setSearchQuery] = useState('');
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setOpen(false); setSearchQuery(''); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavigate = useCallback((item) => {
    onNavigate({ text: item.text, href: item.href, module: item.section || '' });
    setOpen(false);
    setSearchQuery('');
  }, [onNavigate]);

  const currentSection = MEGA_SECTIONS.find(s => s.key === activeSection);

  /* Search results */
  const searchResults = searchQuery.trim().length > 0
    ? ALL_ITEMS.filter(item =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.group.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 24)
    : [];

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div style={{ position: 'relative' }}>
      {/* ── TRIGGER BUTTON ── */}
      <button
        ref={triggerRef}
        onClick={() => { setOpen(o => !o); setSearchQuery(''); }}
        className={`erp-megamenu-trigger ${open ? 'active' : ''}`}
        title="Application Menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* 3×3 dot grid icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3"  cy="3"  r="1.6" fill="currentColor" />
          <circle cx="8"  cy="3"  r="1.6" fill="currentColor" />
          <circle cx="13" cy="3"  r="1.6" fill="currentColor" />
          <circle cx="3"  cy="8"  r="1.6" fill="currentColor" />
          <circle cx="8"  cy="8"  r="1.6" fill="currentColor" />
          <circle cx="13" cy="8"  r="1.6" fill="currentColor" />
          <circle cx="3"  cy="13" r="1.6" fill="currentColor" />
          <circle cx="8"  cy="13" r="1.6" fill="currentColor" />
          <circle cx="13" cy="13" r="1.6" fill="currentColor" />
        </svg>
      </button>

      {/* ── MEGA PANEL ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="erp-megamenu-backdrop" onClick={() => { setOpen(false); setSearchQuery(''); }} />

          <div
            ref={panelRef}
            className={`erp-megamenu-panel ${darkMode ? 'dark' : ''}`}
            role="dialog"
            aria-label="Application Mega Menu"
          >
            {/* ── PANEL HEADER ── */}
            <div className="erp-megamenu-header">
              <div className="erp-megamenu-header-title">
                <AppstoreOutlined style={{ fontSize: 15, color: 'var(--primary)' }} />
                <span>Application Navigator</span>
              </div>
              <Input
                prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 12 }} />}
                placeholder="Search menus, reports, modules…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{ width: 260, borderRadius: 8, fontSize: 12 }}
                size="small"
                className="erp-megamenu-search"
                allowClear
              />
              <button
                className="erp-megamenu-close"
                onClick={() => { setOpen(false); setSearchQuery(''); }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {isSearching ? (
              /* ── SEARCH RESULTS ── */
              <div className="erp-megamenu-search-results">
                {searchResults.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <SearchOutlined style={{ fontSize: 28, marginBottom: 10, display: 'block' }} />
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>No results</div>
                    <div style={{ fontSize: 12 }}>Try a different keyword</div>
                  </div>
                ) : (
                  <div className="erp-megamenu-sr-grid">
                    {searchResults.map((item, i) => (
                      <div
                        key={i}
                        className="erp-megamenu-sr-item"
                        onClick={() => handleNavigate(item)}
                      >
                        <div className="erp-megamenu-sr-text">{item.text}</div>
                        <div className="erp-megamenu-sr-meta">
                          <span style={{ color: item.sectionColor }}>{item.section}</span>
                          <span style={{ margin: '0 4px', color: 'var(--text-muted)' }}>›</span>
                          <span>{item.group}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ── NAVIGATION LAYOUT ── */
              <div className="erp-megamenu-body">
                {/* Left: section tabs */}
                <nav className="erp-megamenu-nav" role="tablist">
                  {MEGA_SECTIONS.map(sec => (
                    <button
                      key={sec.key}
                      role="tab"
                      aria-selected={activeSection === sec.key}
                      className={`erp-megamenu-nav-item ${activeSection === sec.key ? 'active' : ''}`}
                      onClick={() => setActiveSection(sec.key)}
                      style={activeSection === sec.key ? {
                        '--sec-color': sec.color,
                        '--sec-bg': sec.bg,
                      } : {}}
                    >
                      <span
                        className="erp-megamenu-nav-icon"
                        style={activeSection === sec.key
                          ? { background: sec.color, color: '#fff' }
                          : { background: sec.bg, color: sec.color }
                        }
                      >
                        {sec.icon}
                      </span>
                      <span className="erp-megamenu-nav-label">{sec.label}</span>
                      {activeSection === sec.key && (
                        <span className="erp-megamenu-nav-arrow">›</span>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Right: content */}
                <div className="erp-megamenu-content" role="tabpanel">
                  {/* Section header strip */}
                  <div
                    className="erp-megamenu-section-header"
                    style={{ borderLeftColor: currentSection?.color }}
                  >
                    <span
                      className="erp-megamenu-section-icon"
                      style={{ background: currentSection?.color, color: '#fff' }}
                    >
                      {currentSection?.icon}
                    </span>
                    <div>
                      <div className="erp-megamenu-section-title">{currentSection?.label}</div>
                      <div className="erp-megamenu-section-sub">
                        {currentSection?.groups.reduce((a, g) => a + g.items.length, 0)} items
                      </div>
                    </div>
                  </div>

                  {/* Item columns */}
                  <div className="erp-megamenu-cols">
                    {currentSection?.groups.map((grp, gi) => (
                      <div key={gi} className="erp-megamenu-col">
                        <div className="erp-megamenu-col-title">
                          <span
                            className="erp-megamenu-col-dot"
                            style={{ background: currentSection.color }}
                          />
                          {grp.title}
                        </div>
                        <ul className="erp-megamenu-list">
                          {grp.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="erp-megamenu-item"
                              onClick={() => handleNavigate({ ...item, section: currentSection.label })}
                              style={{ '--hover-color': currentSection.color }}
                            >
                              <span className="erp-megamenu-item-dot" style={{ background: currentSection.color }} />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
