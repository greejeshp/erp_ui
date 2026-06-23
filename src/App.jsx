import React, { useState, useCallback, useEffect } from 'react';
import { Layout, ConfigProvider, theme as antdTheme, Modal, Table } from 'antd';
import { menuData } from './data/menuData';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import TabWorkspace from './components/TabWorkspace';
import SpotlightSearch from './components/SpotlightSearch';
import QuickCreateModal from './components/QuickCreateModal';
import BrandingModal from './components/BrandingModal';
import {
  COLOR_PALETTES, FONT_OPTIONS, DEFAULT_PALETTE_ID,
  applyPalette, applyFont, loadBranding,
} from './data/brandingConfig';
import './index.css';

const { Sider, Content } = Layout;

// LocalStorage loaders
const getSavedTabs = () => {
  try {
    const saved = localStorage.getItem('erp_workspace_tabs');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const getSavedActiveTabId = () => {
  try {
    const saved = localStorage.getItem('erp_workspace_active_tab_id');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const getSavedDarkMode = () => {
  try {
    return localStorage.getItem('erp_workspace_dark_mode') === 'true';
  } catch (e) {
    return false;
  }
};

const getSavedQuickAccess = () => {
  try {
    const saved = localStorage.getItem('erp_quick_access_items');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialTabs = getSavedTabs();
let tabIdSeq = initialTabs.length > 0 ? Math.max(...initialTabs.map(t => t.id)) + 1 : 1;

/* Recursively find a menu item by href in menuData */
function findMenuItemByHref(nodes, href, module = '') {
  for (const node of nodes) {
    const mod = module || node.text;
    if (node.href === href) return { text: node.text, href: node.href, module: mod };
    if (node.children?.length) {
      const found = findMenuItemByHref(node.children, href, mod);
      if (found) return found;
    }
  }
  return null;
}


const getTheme = (isDark) => ({
  algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: isDark ? '#1f543c' : '#28694b',
    colorSuccess: '#0f9d58',
    colorWarning: '#f29900',
    colorError: '#d93025',
    colorInfo: '#ff5f2d',
    borderRadius: 8,
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 13,
    colorBgContainer: isDark ? '#1c1c1e' : '#ffffff',
    colorBgLayout: isDark ? '#1c1c1e' : '#ebebdc',
    colorBorder: isDark ? '#424245' : '#dcdccc',
    colorText: isDark ? '#ebebdc' : '#29292c',
    colorTextSecondary: isDark ? '#a1a195' : '#6e6e73',
    colorTextPlaceholder: isDark ? '#57575b' : '#a1a195',
    boxShadow: '0 1px 3px rgba(110,110,115,0.12), 0 1px 2px rgba(110,110,115,0.08)',
  },
  components: {
    Menu: {
      darkItemBg: '#111318',
      darkSubMenuItemBg: '#111318',
      darkItemSelectedBg: '#6366f1',
      darkItemHoverBg: 'rgba(255,255,255,0.05)',
      darkItemColor: '#94a3b8',
      darkItemSelectedColor: '#ffffff',
      itemHeight: 36,
      subMenuItemBg: 'transparent',
      itemSelectedBg: '#0D2137',
      itemSelectedColor: '#ffffff',
      itemHoverBg: '#f1f3f4',
      itemHoverColor: '#0D2137',
    },
    Layout: {
      siderBg: isDark ? '#111318' : '#ffffff',
      headerBg: isDark ? '#1a1d27' : '#ffffff',
      bodyBg: isDark ? '#0f1117' : '#f8f9fa',
    },
    Table: {
      headerBg: isDark ? '#141720' : '#f8f9fa',
      headerColor: isDark ? '#94a3b8' : '#5f6368',
      rowHoverBg: isDark ? 'rgba(255,255,255,0.02)' : '#f8f9fa',
      borderColor: isDark ? '#2d3142' : '#e8eaed',
    },
    Form: {
      labelFontSize: 11,
      itemMarginBottom: 14,
      labelColor: isDark ? '#94a3b8' : '#5f6368',
    },
    Input: {
      paddingBlock: 7,
      paddingInline: 11,
      borderRadius: 8,
      activeBorderColor: '#1a6ef8',
    },
    Select: {
      borderRadius: 8,
    },
    Button: {
      primaryShadow: 'none',
      borderRadius: 8,
    },
    Tabs: {
      inkBarColor: isDark ? '#6366f1' : '#0D2137',
      itemActiveColor: isDark ? '#818cf8' : '#0D2137',
      itemSelectedColor: isDark ? '#818cf8' : '#0D2137',
    },
    Checkbox: {
      colorPrimary: isDark ? '#6366f1' : '#0D2137',
    },
  },
});

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTabId, setActiveTabId] = useState(getSavedActiveTabId);
  const [spotlight, setSpotlight] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getSavedDarkMode);
  const [quickAccessItems, setQuickAccessItems] = useState(getSavedQuickAccess);
  const [quickCreate, setQuickCreate] = useState(null); // { href, title }
  const [brandingOpen, setBrandingOpen]     = useState(false);
  const [activePaletteId, setActivePaletteId] = useState(DEFAULT_PALETTE_ID);
  const [activeFontId, setActiveFontId]       = useState('montserrat');

  // Restore saved branding on mount
  useEffect(() => {
    const saved = loadBranding();
    const palette = COLOR_PALETTES.find(p => p.id === saved.paletteId);
    const font    = FONT_OPTIONS.find(f => f.id === saved.fontId);
    if (palette) { applyPalette(palette); setActivePaletteId(palette.id); }
    if (font)    { applyFont(font);       setActiveFontId(font.id); }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('erp_workspace_tabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('erp_workspace_active_tab_id', JSON.stringify(activeTabId));
  }, [activeTabId]);

  useEffect(() => {
    localStorage.setItem('erp_workspace_dark_mode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('erp_quick_access_items', JSON.stringify(quickAccessItems));
  }, [quickAccessItems]);

  const toggleQuickAccess = useCallback((item) => {
    setQuickAccessItems(prev => {
      const exists = prev.find(q => q.href === item.href);
      if (exists) return prev.filter(q => q.href !== item.href);
      return [...prev, { text: item.text, href: item.href, module: item.module || '' }];
    });
  }, []);

  const closeTab = useCallback((tabId) => {
    setTabs(prev => {
      const idx = prev.findIndex(t => t.id === tabId);
      const next = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId && next.length > 0) {
        setActiveTabId(next[Math.min(idx, next.length - 1)].id);
      } else if (next.length === 0) {
        setActiveTabId(null);
      }
      return next;
    });
  }, [activeTabId]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handler = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlight(true);
      }

      if (!isInput) {
        if (e.key === '?' || e.key === '/') {
          e.preventDefault();
          setShortcutsOpen(prev => !prev);
        }

        if (e.altKey && e.key.toLowerCase() === 'w') {
          e.preventDefault();
          if (activeTabId !== null) {
            closeTab(activeTabId);
          }
        }

        if (e.altKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          e.preventDefault();
          const tabSequence = [null, ...tabs.map(t => t.id)];
          const currentIdx = tabSequence.indexOf(activeTabId);
          
          let nextIdx = currentIdx;
          if (e.key === 'ArrowRight') {
            nextIdx = currentIdx === tabSequence.length - 1 ? 0 : currentIdx + 1;
          } else {
            nextIdx = currentIdx === 0 ? tabSequence.length - 1 : currentIdx - 1;
          }
          setActiveTabId(tabSequence[nextIdx]);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tabs, activeTabId, closeTab]);

  const openTab = useCallback((item) => {
    if (!item.href) {
      setActiveTabId(null); // return to dashboard
      return;
    }
    setTabs(prev => {
      const existing = prev.find(t => t.href === item.href);
      if (existing) {
        setActiveTabId(existing.id);
        return prev;
      }
      const newTab = { id: tabIdSeq++, text: item.text, href: item.href, module: item.module || '' };
      setActiveTabId(newTab.id);
      return [...prev, newTab];
    });
  }, []);

  const activeTab = tabs.find(t => t.id === activeTabId) || null;

  const shortcutColumns = [
    { title: 'Action', dataIndex: 'action', key: 'action', width: 220, render: text => <strong>{text}</strong> },
    { title: 'Keyboard Shortcut', dataIndex: 'shortcut', key: 'shortcut', render: text => <code style={{ background: darkMode ? '#1e293b' : '#f1f5f9', padding: '3px 6px', borderRadius: 4, color: '#6366f1' }}>{text}</code> }
  ];

  const shortcutData = [
    { key: '1', action: 'Search pages/actions', shortcut: 'Ctrl + K' },
    { key: '2', action: 'Toggle Shortcut Helper', shortcut: 'Shift + ?' },
    { key: '3', action: 'Close current workspace tab', shortcut: 'Alt + W' },
    { key: '4', action: 'Next workspace tab', shortcut: 'Alt + ➔' },
    { key: '5', action: 'Previous workspace tab', shortcut: 'Alt + ⬅' },
    { key: '6', action: 'Go to Dashboard', shortcut: 'Alt + Left cycle to start' }
  ];

  return (
    <ConfigProvider theme={getTheme(darkMode)}>
      <Layout style={{ height: '100vh', overflow: 'hidden' }} className={darkMode ? 'dark' : ''}>
        {/* SIDEBAR */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={240}
          collapsedWidth={0}
          trigger={null}
          style={{ background: 'var(--bg-sidebar)', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 10, flexShrink: 0 }}
        >
          <Sidebar
            onItemClick={openTab}
            collapsed={collapsed}
            darkMode={darkMode}
            quickAccessItems={quickAccessItems}
            onToggleQuickAccess={toggleQuickAccess}
            onQuickCreate={(href, title) => setQuickCreate({ href, title })}
          />
        </Sider>

        {/* MAIN LAYOUT */}
        <Layout style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* TOP BAR */}
          <TopBar
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed(c => !c)}
            onSpotlight={() => setSpotlight(true)}
            darkMode={darkMode}
            onDarkMode={() => setDarkMode(d => !d)}
            onNavigate={openTab}
            onOpenBranding={() => setBrandingOpen(true)}
          />

          {/* CONTENT */}
          <Content style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-layout)' }}>
            <TabWorkspace
              tabs={tabs}
              activeTabId={activeTabId}
              onTabClick={setActiveTabId}
              onTabClose={closeTab}
              activeTab={activeTab}
              onQuickAccess={openTab}
              menuData={menuData}
              darkMode={darkMode}
              quickAccessItems={quickAccessItems}
              onToggleQuickAccess={toggleQuickAccess}
            />
          </Content>
        </Layout>

        {/* SPOTLIGHT SEARCH */}
        <SpotlightSearch
          open={spotlight}
          onClose={() => setSpotlight(false)}
          onSelect={(item) => { openTab(item); setSpotlight(false); }}
          menuData={menuData}
        />

        {/* UI & BRANDING MODAL */}
        <BrandingModal
          open={brandingOpen}
          onClose={() => setBrandingOpen(false)}
          darkMode={darkMode}
          activePaletteId={activePaletteId}
          activeFontId={activeFontId}
          onApply={(paletteId, fontId) => {
            setActivePaletteId(paletteId);
            setActiveFontId(fontId);
          }}
        />


        {/* QUICK CREATE MODAL */}
        <QuickCreateModal
          open={!!quickCreate}
          href={quickCreate?.href}
          onClose={() => setQuickCreate(null)}
          onOpenFullForm={(href) => {
            const found = findMenuItemByHref(menuData, href);
            openTab({ href, text: found?.text || quickCreate?.title || 'Form', module: found?.module || '' });
            setQuickCreate(null);
          }}
          darkMode={darkMode}
        />

        {/* KEYBOARD SHORTCUTS MODAL */}
        <Modal
          title="⌨️ Keyboard Navigation Shortcuts"
          open={shortcutsOpen}
          onCancel={() => setShortcutsOpen(false)}
          footer={null}
          width={500}
        >
          <Table
            columns={shortcutColumns}
            dataSource={shortcutData}
            pagination={false}
            size="small"
            bordered
            style={{ marginTop: 12 }}
          />
        </Modal>
      </Layout>
    </ConfigProvider>
  );
}
