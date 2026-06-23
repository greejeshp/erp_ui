import React from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import {
  CloseOutlined, DownOutlined, CloseCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Dashboard from './Dashboard';
import ERPForm from './ERPForm';
import GridView from './GridView';
import LedgerMaster from './LedgerMaster';
import SalesInvoice from './SalesInvoice';
import EntityProperties from './EntityProperties';

function getComponent(tab, onQuickAccess, darkMode, quickAccessItems, onToggleQuickAccess) {
  if (!tab) return <Dashboard onQuickAccess={onQuickAccess} darkMode={darkMode} quickAccessItems={quickAccessItems} onToggleQuickAccess={onToggleQuickAccess} />;
  const { href } = tab;

  if (href === '/Account/Creation/Ledger') {
    return <LedgerMaster darkMode={darkMode} />;
  }

  if (href === '/Inventory/Transaction/SalesInvoice') {
    return <SalesInvoice darkMode={darkMode} />;
  }

  if (href === '/Setup/Security/EntityProperties') {
    return <EntityProperties darkMode={darkMode} />;
  }

  const isForm =
    href === '/Account/Creation/Customer' ||
    href === '/Account/Creation/LedgerGroup' ||
    href === '/Account/Creation/SalesMan' ||
    href === '/Account/Creation/SalesManTarget' ||
    href === '/Account/Creation/CustomerTarget' ||
    href === '/Account/Creation/AreaMaster' ||
    href === '/Account/Creation/Currency' ||
    href === '/Account/Creation/SubLedger' ||
    href === '/Account/Creation/NarrationMaster' ||
    href === '/Account/Creation/VoucherMode' ||
    href === '/Account/Creation/SecurityDeposit' ||
    href === '/Account/Transaction/Receipt' ||
    href === '/Account/Transaction/Payment' ||
    href === '/Account/Transaction/Journal' ||
    href === '/Account/Transaction/Contra' ||
    href === '/Inventory/Creation/Product' ||
    href === '/Inventory/Creation/ProductGroup' ||
    href === '/Inventory/Creation/ProductRateSetting' ||
    href?.includes('Invoice') ||
    href?.includes('SalesReturn') ||
    href?.includes('SalesOrder') ||
    href?.includes('PurchaseOrder') ||
    href?.includes('CounterInvoice') ||
    href?.includes('Expenses') ||
    href?.includes('Setup/Creation') ||
    href?.includes('Assets') ||
    href?.includes('Task') ||
    href?.includes('Support/Creation') ||
    href?.includes('Repair') ||
    href === '/Setup/Creation/CompanyDetail';

  if (isForm) return <ERPForm tab={tab} key={tab.href} darkMode={darkMode} />;
  return <GridView tab={tab} key={tab.href} darkMode={darkMode} />;
}

export default function TabWorkspace({ tabs, activeTabId, onTabClick, onTabClose, activeTab, onQuickAccess, darkMode, quickAccessItems, onToggleQuickAccess }) {

  const closeAllItems = [
    {
      key: 'close-others',
      label: 'Close Other Tabs',
      icon: <CloseOutlined />,
      onClick: () => tabs.forEach(tab => { if (tab.id !== activeTabId) onTabClose(tab.id); }),
      disabled: tabs.length <= 1,
    },
    {
      key: 'close-all',
      label: 'Close All Tabs',
      icon: <CloseCircleOutlined />,
      onClick: () => tabs.forEach(tab => onTabClose(tab.id)),
      disabled: tabs.length === 0,
      danger: true,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ── TABS BAR ── */}
      <div className="erp-tabbar">
        <div style={{ display: 'flex', overflowX: 'auto', flex: 1, gap: 6, scrollbarWidth: 'none' }}>
          {/* Dashboard tab */}
          <div
            className={`erp-tab${activeTabId === null ? ' active' : ''}`}
            onClick={() => onTabClick(null)}
          >
            <HomeOutlined style={{ fontSize: 12 }} />
            <span>Dashboard</span>
          </div>

          {/* Dynamic tabs */}
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`erp-tab${tab.id === activeTabId ? ' active' : ''}`}
              onClick={() => onTabClick(tab.id)}
            >
              <span
                className="erp-tab-text"
                title={tab.text}
                style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {tab.text}
              </span>
              <button
                className="erp-tab-close"
                onClick={e => { e.stopPropagation(); onTabClose(tab.id); }}
                title="Close tab"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Close workspace button */}
        {tabs.length > 0 && (
          <Dropdown menu={{ items: closeAllItems }} placement="bottomRight" trigger={['click']}>
            <Button
              size="small"
              type="text"
              style={{ color: 'var(--text-muted)', fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              Workspace <DownOutlined style={{ fontSize: 8 }} />
            </Button>
          </Dropdown>
        )}
      </div>

      {/* ── PAGE HEADER ── */}
      {(!activeTab || (
        activeTab.href !== '/Account/Creation/Ledger' && 
        activeTab.href !== '/Inventory/Transaction/SalesInvoice' &&
        activeTab.href !== '/Inventory/Creation/Product' &&
        activeTab.href !== '/Account/Creation/VoucherMode' &&
        activeTab.href !== '/Setup/Security/EntityProperties'
      )) && (
        <div className="erp-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="erp-page-title" style={{ margin: 0, padding: 0 }}>
              {activeTab ? activeTab.text : 'Overview Dashboard'}
            </div>
            {activeTab && <div style={{ width: 1, height: 16, background: 'var(--border-color)' }}></div>}
            <div className="erp-page-breadcrumb" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
              {activeTab ? (() => {
                const href = activeTab.href || '';
                const isForm = (
                  href === '/Account/Creation/Customer' ||
                  href === '/Account/Creation/LedgerGroup' ||
                  href === '/Account/Creation/SalesMan' ||
                  href === '/Account/Creation/SalesManTarget' ||
                  href === '/Account/Creation/CustomerTarget' ||
                  href === '/Account/Creation/AreaMaster' ||
                  href === '/Account/Creation/Currency' ||
                  href === '/Account/Creation/SubLedger' ||
                  href === '/Account/Creation/NarrationMaster' ||
                  href === '/Account/Creation/VoucherMode' ||
                  href === '/Account/Creation/SecurityDeposit' ||
                  href === '/Account/Transaction/Receipt' ||
                  href === '/Account/Transaction/Payment' ||
                  href === '/Account/Transaction/Journal' ||
                  href === '/Account/Transaction/Contra' ||
                  href === '/Inventory/Creation/Product' ||
                  href === '/Inventory/Creation/ProductGroup' ||
                  href === '/Inventory/Creation/ProductRateSetting' ||
                  href?.includes('Invoice') ||
                  href?.includes('SalesReturn') ||
                  href?.includes('SalesOrder') ||
                  href?.includes('PurchaseOrder') ||
                  href?.includes('CounterInvoice') ||
                  href?.includes('Expenses') ||
                  href?.includes('Setup/Creation') ||
                  href?.includes('Assets') ||
                  href?.includes('Task') ||
                  href?.includes('Support/Creation') ||
                  href?.includes('Repair') ||
                  href === '/Setup/Creation/CompanyDetail'
                );
                return (
                  <>
                    <span className="breadcrumb-link" onClick={() => onTabClick(null)} style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>
                      {activeTab.module || 'Accounting'}
                    </span>
                    <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: isForm ? 600 : 500 }}>{activeTab.text}</span>
                    {!isForm && (
                      <>
                        <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
                      </>
                    )}
                  </>
                );
              })() : (
                <>
                  <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)' }}>DynamicERP</span>
                  <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Overview</span>
                </>
              )}
            </div>
          </div>
          {/* Portal target for header actions */}
          <div id="header-actions"></div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="erp-workspace fade-in">
        {getComponent(activeTab, onQuickAccess, darkMode, quickAccessItems, onToggleQuickAccess)}
      </div>
    </div>
  );
}
