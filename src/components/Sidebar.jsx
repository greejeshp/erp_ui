import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Menu, Dropdown, Tooltip } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import {
  AccountBookOutlined, InboxOutlined, SettingOutlined, DollarCircleOutlined,
  BankOutlined, SafetyOutlined, BarChartOutlined, CustomerServiceOutlined,
  CheckCircleOutlined, ToolOutlined, ThunderboltOutlined, FileTextOutlined,
  PlusCircleOutlined, SwapOutlined, LineChartOutlined,
  ShoppingCartOutlined, TagsOutlined, DatabaseOutlined,
  AuditOutlined, FundOutlined, DownOutlined, QuestionCircleOutlined, PlusOutlined
} from '@ant-design/icons';
import CreateNewPanel from './CreateNewPanel';
import { menuData } from '../data/menuData';
import { CompanySwitcher } from '../App';

const MODULE_ICONS = {
  'Quick Access':         <ThunderboltOutlined style={{ color: '#f59e0b' }} />,
  'IRD Audit':            <SafetyOutlined style={{ color: '#0f9d58' }} />,
  'MIS Reports':          <BarChartOutlined style={{ color: '#1a6ef8' }} />,
  'Accounting':           <AccountBookOutlined style={{ color: '#0D2137' }} />,
  'Inventory':            <InboxOutlined style={{ color: '#7c3aed' }} />,
  'Repair & maintaince':  <ToolOutlined style={{ color: '#d97706' }} />,
  'Setup':                <SettingOutlined style={{ color: '#5f6368' }} />,
  'Expenses':             <DollarCircleOutlined style={{ color: '#d93025' }} />,
  'Assets Management':    <BankOutlined style={{ color: '#1a6ef8' }} />,
  'Task':                 <CheckCircleOutlined style={{ color: '#0f9d58' }} />,
  'Support':              <CustomerServiceOutlined style={{ color: '#7c3aed' }} />,
  'Creation':             <PlusCircleOutlined />,
  'Transaction':          <SwapOutlined />,
  'Reporting':            <LineChartOutlined />,
  'Ledger':               <AccountBookOutlined />,
  'Purchase':             <ShoppingCartOutlined />,
  'Sales':                <TagsOutlined />,
  'Stock':                <DatabaseOutlined />,
  'Audit Reports':        <AuditOutlined />,
  'MIS':                  <FundOutlined />,
};

function getIcon(text) {
  return MODULE_ICONS[text] || <FileTextOutlined />;
}

/* ── Emoji map for quick access icons ── */
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

function filterMenuNodes(nodes, query) {
  if (!query) return { filteredNodes: nodes, matchingKeys: [] };
  const matchedKeys = [];
  const q = query.toLowerCase();

  const filterRecursive = (items, depth = 0) =>
    items.map((item, idx) => {
      const key = (item.href && item.href !== '#') ? item.href : `${item.text}-${depth}-${idx}`;
      const isMatch = item.text.toLowerCase().includes(q);
      if (item.children?.length > 0) {
        const fc = filterRecursive(item.children, depth + 1);
        if (fc.length > 0) { matchedKeys.push(key); return { ...item, key, children: fc }; }
      }
      if (isMatch) return { ...item, key };
      return null;
    }).filter(Boolean);

  return { filteredNodes: filterRecursive(nodes), matchingKeys: matchedKeys };
}

/* ── Build Ant Design menu items with star buttons ── */
function buildMenuItems(nodes, onItemClick, onToggleStar, quickAccessHrefs, depth = 0, moduleName = '') {
  return nodes.map((node, i) => {
    const key = node.key || ((node.href && node.href !== '#') ? node.href : `${node.text}-${depth}-${i}`);
    const currentModule = depth === 0 ? node.text : moduleName;
    const isLeaf = !node.children?.length && node.href && node.href !== '#';
    const isStarred = isLeaf && quickAccessHrefs.has(node.href);

    if (node.children?.length > 0) {
      return {
        key,
        icon: depth === 0 ? getIcon(node.text) : null,
        label: node.text,
        children: buildMenuItems(node.children, onItemClick, onToggleStar, quickAccessHrefs, depth + 1, currentModule),
      };
    }

    return {
      key,
      icon: depth === 0 ? getIcon(node.text) : null,
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minWidth: 0, gap: '4px' }}
          className="erp-menu-leaf"
        >
          <span
            style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '4px' }}
            onClick={() => isLeaf && onItemClick({ text: node.text, href: node.href, module: currentModule })}
          >
            {node.text}
          </span>
          {isLeaf && (
            <Tooltip title={isStarred ? 'Remove from Quick Access' : 'Add to Quick Access'} placement="right">
              <span
                className={`erp-star-btn ${isStarred ? 'starred' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar({ text: node.text, href: node.href, module: currentModule });
                }}
                style={{ flexShrink: 0 }}
              >
                {isStarred
                  ? <StarFilled style={{ color: '#f59e0b', fontSize: 11 }} />
                  : <StarOutlined style={{ fontSize: 11 }} />
                }
              </span>
            </Tooltip>
          )}
        </div>
      ),
      onClick: () => isLeaf && onItemClick({ text: node.text, href: node.href, module: currentModule }),
    };
  });
}

const BRANCH_ITEMS = [
  { key: 'accounting', label: 'Accounting' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'operations', label: 'Operations' },
];

export default function Sidebar({ onItemClick, collapsed, darkMode, quickAccessItems, onToggleQuickAccess, onQuickCreate }) {
  const [search, setSearch] = useState('');
  const [openKeys, setOpenKeys] = useState([]);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const createBtnRef = useRef(null);

  const quickAccessHrefs = useMemo(
    () => new Set((quickAccessItems || []).map(q => q.href)),
    [quickAccessItems]
  );

  const { filteredNodes, matchingKeys } = useMemo(
    () => filterMenuNodes(menuData, search),
    [search]
  );

  React.useEffect(() => {
    if (search && matchingKeys.length > 0) setOpenKeys(matchingKeys);
  }, [search, matchingKeys]);

  const handleToggleStar = useCallback((item) => {
    if (onToggleQuickAccess) onToggleQuickAccess(item);
  }, [onToggleQuickAccess]);

  const categories = useMemo(() => {
    /* Filter out the Quick Access node — it's now user-managed */
    const nonQA = filteredNodes.filter(n => n.text !== 'Quick Access');
    const core = [], inventory = [], operations = [], sys = [];
    nonQA.forEach(node => {
      const t = node.text;
      if (['IRD Audit', 'MIS Reports'].includes(t)) core.push(node);
      else if (['Accounting', 'Inventory'].includes(t)) inventory.push(node);
      else if (['Expenses', 'Assets Management', 'Repair & maintaince'].includes(t)) operations.push(node);
      else sys.push(node);
    });
    return {
      core:       buildMenuItems(core,       onItemClick, handleToggleStar, quickAccessHrefs),
      inventory:  buildMenuItems(inventory,  onItemClick, handleToggleStar, quickAccessHrefs),
      operations: buildMenuItems(operations, onItemClick, handleToggleStar, quickAccessHrefs),
      sys:        buildMenuItems(sys,        onItemClick, handleToggleStar, quickAccessHrefs),
    };
  }, [filteredNodes, onItemClick, handleToggleStar, quickAccessHrefs]);

  /* ── Quick Access items in sidebar ── */
  const qaMenuItems = useMemo(() => {
    if (!quickAccessItems?.length) return [];
    return quickAccessItems.map((item, i) => ({
      key: `qa-${item.href}-${i}`,
      icon: <span style={{ fontSize: 14 }}>{getEmoji(item.href)}</span>,
      label: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
             className="erp-menu-leaf">
          <span
            style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            onClick={() => onItemClick(item)}
          >
            {item.text}
          </span>
          <Tooltip title="Remove from Quick Access" placement="right">
            <span
              className="erp-star-btn starred"
              onClick={(e) => { e.stopPropagation(); handleToggleStar(item); }}
            >
              <StarFilled style={{ color: '#f59e0b', fontSize: 11 }} />
            </span>
          </Tooltip>
        </div>
      ),
      onClick: () => onItemClick(item),
    }));
  }, [quickAccessItems, onItemClick, handleToggleStar]);

  const renderSection = (label, items) => {
    if (!items.length) return null;
    return (
      <div>
        {!collapsed && <div className="erp-sidebar-category-label">{label}</div>}
        <Menu
          mode="inline"
          theme={darkMode ? 'dark' : 'light'}
          items={items}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          className="erp-sidebar-menu"
          inlineCollapsed={collapsed}
          style={{ background: 'transparent', border: 'none' }}
        />
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-sidebar)',
      overflow: 'hidden',
    }}>


      {/* ── TOP SELECTOR CARD ── */}
      {!collapsed ? (
        <Dropdown menu={{ items: BRANCH_ITEMS }} trigger={['click']}>
          <div className="erp-sidebar-selector">
            <div className="erp-sidebar-selector-icon">
              <AccountBookOutlined />
            </div>
            <div className="erp-sidebar-selector-info">
              <div className="erp-sidebar-selector-title">Accounting</div>
              <div className="erp-sidebar-selector-sub">FY 2080/81</div>
            </div>
            <DownOutlined style={{ fontSize: 9, color: 'var(--text-muted)' }} />
          </div>
        </Dropdown>
      ) : (
        <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Accounting — FY 2080/81" placement="right">
            <div className="erp-sidebar-selector-icon" style={{ cursor: 'pointer' }}>
              <AccountBookOutlined />
            </div>
          </Tooltip>
        </div>
      )}



      {/* ── MENU SECTIONS ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 8 }}>

        {/* Quick Access — dynamic, user-managed */}
        {qaMenuItems.length > 0 && (
          <div>
            {!collapsed && (
              <div className="erp-sidebar-category-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ThunderboltOutlined style={{ color: '#f59e0b', fontSize: 10 }} />
                QUICK ACCESS
              </div>
            )}
            <Menu
              mode="inline"
              theme={darkMode ? 'dark' : 'light'}
              items={qaMenuItems}
              className="erp-sidebar-menu"
              inlineCollapsed={collapsed}
              style={{ background: 'transparent', border: 'none' }}
              selectable={false}
            />
          </div>
        )}

        {/* Empty quick access hint */}
        {qaMenuItems.length === 0 && !collapsed && (
          <div style={{
            margin: '6px 12px 4px',
            padding: '8px 10px',
            borderRadius: 6,
            background: 'var(--bg-layout)',
            border: '1px dashed var(--border-color)',
            fontSize: 11,
            color: 'var(--text-muted)',
            lineHeight: 1.45,
          }}>
            <StarOutlined style={{ color: '#f59e0b', marginRight: 5 }} />
            Star any menu item to pin it here
          </div>
        )}

        {renderSection('CORE MODULES', categories.core)}
        {renderSection('INVENTORY', categories.inventory)}
        {renderSection('OPERATIONS', categories.operations)}
        {renderSection('SYSTEM CONTROL', categories.sys)}
      </div>

      {/* ── BOTTOM ACTIONS (Quick Create + Help Center) ── */}
      <div style={{ flexShrink: 0, borderTop: '1px solid var(--border-color)', paddingTop: 8, paddingBottom: 4 }}>

        {/* Quick Create Button */}
        <Tooltip title={collapsed ? 'Quick Create' : ''} placement="right">
          <div
            ref={createBtnRef}
            className={`erp-create-new-btn${collapsed ? ' collapsed' : ''}`}
            onClick={() => setCreatePanelOpen(p => !p)}
            role="button"
            aria-label="Quick Create"
          >
            <div className="erp-create-new-btn-icon">
              <PlusOutlined style={{ fontSize: collapsed ? 14 : 13 }} />
            </div>
            {!collapsed && <span>Quick Create</span>}
          </div>
        </Tooltip>

        {/* Dropdown Panel */}
        <CreateNewPanel
          open={createPanelOpen}
          onClose={() => setCreatePanelOpen(false)}
          onSelect={(href, title) => {
            setCreatePanelOpen(false);
            if (onQuickCreate) onQuickCreate(href, title);
          }}
          darkMode={darkMode}
          anchorEl={createBtnRef.current}
          openUpward
        />

        {/* Help Center */}
        {!collapsed && (
          <div
            className="erp-sidebar-help-link"
            onClick={() => onItemClick({ text: 'Help Center', href: null })}
          >
            <QuestionCircleOutlined style={{ fontSize: 14 }} />
            <span>Help Center</span>
          </div>
        )}
      </div>


    </div>
  );
}
