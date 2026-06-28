import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Layout, ConfigProvider, theme as antdTheme, Modal, Table } from 'antd';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { menuData } from './data/menuData';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import TabWorkspace from './components/TabWorkspace';
import SpotlightSearch from './components/SpotlightSearch';
import QuickCreateModal from './components/QuickCreateModal';
import BrandingModal from './components/BrandingModal';
import { Plus, ChevronDown, Check, LogOut, Upload, ArrowRight, Globe } from 'lucide-react';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import LandingPage from './pages/LandingPage';
import Step1_AdminDetails from './pages/steps/Step1_AdminDetails';
import Step2_Payment from './pages/steps/Step2_Payment';
import Step3_Welcome from './pages/steps/Step3_Welcome';
import Step4_CompanySetup from './pages/steps/Step4_CompanySetup';
import Step5_DomainSetup from './pages/steps/Step5_DomainSetup';
import CustomDomainLogin from './pages/CustomDomainLogin';
import WorkspaceLookup from './pages/WorkspaceLookup';
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

/* ── Company Switcher Dropdown ─────────────────────────── */
export function CompanySwitcher() {
  const navigate = useNavigate();
  const { data, companies, activeCompanyIdx, switchCompany, update } = useOnboarding();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const companyName = data.companyName || 'Demo Company';
  const subdomain   = data.subdomain   || '';
  const initial     = companyName[0]?.toUpperCase() || 'D';

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAddCompany = () => {
    update({ companyName: '', bizType: '', industry: '', pan: '', address: '', city: '', size: '', website: '', subdomain: '' });
    setOpen(false);
    navigate('/signup/company');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        id="company-switcher-trigger"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'none', border: 'none',
          padding: '4px 8px', cursor: 'pointer',
          width: '100%', transition: 'all 0.2s',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: '#fff', fontSize: '0.95rem',
        }}>
          {initial}
        </div>
        <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {companyName}
          </div>
          {subdomain && (
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {subdomain}.pivotalerp.app
            </div>
          )}
        </div>
        <ChevronDown size={14} color="#64748b" style={{ flexShrink: 0, marginLeft: 4, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          borderRadius: 12, overflow: 'hidden', zIndex: 999,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)', width: 220,
        }}>
          {companies.length > 0 && (
            <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ padding: '4px 14px 8px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                Workspaces
              </div>
              {companies.map((c, i) => (
                <button
                  key={i}
                  id={`company-switch-${i}`}
                  onClick={() => { switchCompany(i); setOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                    transition: 'background 0.15s',
                    backgroundColor: i === activeCompanyIdx ? 'rgba(14,165,233,0.08)' : 'transparent',
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                    background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Outfit', fontWeight: 900, color: '#fff', fontSize: '0.82rem',
                  }}>
                    {c.companyName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>{c.companyName}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.subdomain}.pivotalerp.app</div>
                  </div>
                  {i === activeCompanyIdx && <Check size={13} color="#10b981" />}
                </button>
              ))}
            </div>
          )}

          <button
            id="add-new-company-btn"
            onClick={handleAddCompany}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
              color: '#0ea5e9', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif',
              transition: 'background 0.15s',
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 7, background: 'rgba(14,165,233,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Plus size={15} color="#0ea5e9" />
            </div>
            Add New Company
          </button>
        </div>
      )}
    </div>
  );
}

function ERPApp({ collapsed, setCollapsed, tabs, activeTabId, setActiveTabId, closeTab, activeTab, openTab, toggleQuickAccess, quickAccessItems, spotlight, setSpotlight, brandingOpen, setBrandingOpen, activePaletteId, setActivePaletteId, activeFontId, setActiveFontId, quickCreate, setQuickCreate, shortcutsOpen, setShortcutsOpen, shortcutColumns, shortcutData, darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  return (
    <ConfigProvider theme={getTheme(darkMode)}>
      <Layout style={{ height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0 }} className={darkMode ? 'dark' : ''}>
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

        <Layout style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TopBar
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed(c => !c)}
            onSpotlight={() => setSpotlight(true)}
            darkMode={darkMode}
            onDarkMode={() => setDarkMode(d => !d)}
            onNavigate={openTab}
            onOpenBranding={() => setBrandingOpen(true)}
            onLogout={() => navigate(`/login/workspace/${data?.subdomain || 'demo'}`)}
          />

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

        <SpotlightSearch
          open={spotlight}
          onClose={() => setSpotlight(false)}
          onSelect={(item) => { openTab(item); setSpotlight(false); }}
          menuData={menuData}
        />

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

        {/* ONBOARDING SETUP MODAL (NON-CLOSABLE) */}
        <OnboardingSetupModal />
      </Layout>
    </ConfigProvider>
  );
}

/* ── Onboarding Setup Modal Component ────────────────────── */
const SETUP_PLANS = {
  starter: { name: 'Starter', price: '1,499', priceNum: 1499 },
  growth: { name: 'Growth', price: '2,999', priceNum: 2999 },
};

const SETUP_METHODS = [
  { id: 'connectips', label: 'Connect IPS', sub: 'Bank QR Payment', color: '#1B6CA8', bg: 'rgba(27,108,168,0.15)', icon: '🏦' },
  { id: 'khalti', label: 'Khalti', sub: 'Digital Wallet', color: '#5C2D91', bg: 'rgba(92,45,145,0.15)', icon: '🟣' },
  { id: 'esewa', label: 'eSewa', sub: 'Mobile Wallet', color: '#60BB46', bg: 'rgba(96,187,70,0.15)', icon: '🟢' },
  { id: 'card', label: 'Card', sub: 'Debit / Credit', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: '💳' },
];

const SETUP_INDUSTRIES = ['Trading', 'Manufacturing', 'Retail', 'Services', 'Construction', 'IT & Technology', 'Healthcare', 'Education', 'Hospitality', 'Other'];
const SETUP_BIZ_TYPES = ['Sole Proprietorship', 'Partnership', 'Pvt. Ltd.', 'Ltd.', 'NGO / INGOs', 'Government', 'Other'];
const SETUP_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];

function OnboardingSetupModal() {
  const { data, update, saveCompany } = useOnboarding();
  const [step, setStep] = useState(0); // 0: Company, 1: Domain, 2: Payment, 3: Success

  // Company Form State
  const [compForm, setCompForm] = useState({
    companyName: data.companyName || '',
    bizType: data.bizType || '',
    industry: data.industry || '',
    pan: data.pan || '',
    address: data.address || '',
    city: data.city || '',
    size: data.size || '',
    website: data.website || '',
  });
  const [logoPreview, setLogoPreview] = useState(null);

  // Domain Form State
  const [subdomain, setSubdomain] = useState('');
  
  // Payment Form State
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [selectedMethod, setSelectedMethod] = useState('connectips');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const [errors, setErrors] = useState({});

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setLogoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyChange = (val) => {
    setCompForm(prev => {
      const next = { ...prev, companyName: val };
      if (!subdomain) {
        const generated = val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        setSubdomain(generated);
      }
      return next;
    });
  };

  if (!data.showSetupModal) return null;

  const cleanSub = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-|-$/g, '') || 'mycompany';

  const handleCompanySubmit = () => {
    const e = {};
    if (!compForm.companyName.trim()) e.companyName = 'Company name is required';
    if (!compForm.bizType) e.bizType = 'Select business type';
    if (!compForm.industry) e.industry = 'Select industry';
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep(1);
  };

  const handleDomainSubmit = () => {
    if (!cleanSub) return;
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      
      const updatedCompany = {
        ...compForm,
        subdomain: cleanSub,
        plan: selectedPlan === 'starter' ? 'Starter' : 'Growth',
        paymentMethod: selectedMethod,
      };

      // Save company to local list
      saveCompany(updatedCompany);
      
      // Update active onboarding state
      update({
        ...updatedCompany,
        showSetupModal: false, // Close setup modal
      });

      setStep(3);
    }, 1800);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(8,15,26,0.92)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: 20, fontFamily: 'Montserrat, sans-serif'
    }}>
      <div style={{
        width: '100%', maxWidth: step === 0 ? 760 : 540,
        background: '#0f1d2e', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        color: '#f0f6ff', overflowY: 'auto', maxHeight: '90vh'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: '1.8rem' }}>🎉</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '8px 0 4px', color: '#fff' }}>Congratulations, {data.firstName}!</h2>
          <p style={{ fontSize: '0.82rem', color: '#7e95ae', margin: 0 }}>Your admin account is created. Let's finish configuring your ERP.</p>
        </div>

        {/* Step progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 30, justifyContent: 'center' }}>
          {['Company Profile', 'Workspace URL', 'Payment / Activation'].map((label, i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 8, fontSize: '0.72rem', fontWeight: 700,
              background: step === i ? 'rgba(14,165,233,0.15)' : 'transparent',
              border: step === i ? '1px solid #0ea5e9' : '1px solid transparent',
              color: step === i ? '#fff' : '#7e95ae',
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* STEP 0: COMPANY SETUP */}
        {step === 0 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16, color: '#fff' }}>1. Register your company</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 24, alignItems: 'start' }}>
              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="p-field" style={{ marginBottom: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Name *</label>
                  <input 
                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                    value={compForm.companyName} 
                    onChange={e => handleCompanyChange(e.target.value)} 
                    placeholder="E.g. Nepal Traders Pvt. Ltd." 
                  />
                  {errors.companyName && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.companyName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="p-field" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Business Type *</label>
                    <select 
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                      value={compForm.bizType} 
                      onChange={e => setCompForm({ ...compForm, bizType: e.target.value })}
                    >
                      <option value="" style={{ background: '#0f1d2e' }}>Select…</option>
                      {SETUP_BIZ_TYPES.map(b => <option key={b} value={b} style={{ background: '#0f1d2e' }}>{b}</option>)}
                    </select>
                    {errors.bizType && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.bizType}</span>}
                  </div>

                  <div className="p-field" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Industry *</label>
                    <select 
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                      value={compForm.industry} 
                      onChange={e => setCompForm({ ...compForm, industry: e.target.value })}
                    >
                      <option value="" style={{ background: '#0f1d2e' }}>Select…</option>
                      {SETUP_INDUSTRIES.map(ind => <option key={ind} value={ind} style={{ background: '#0f1d2e' }}>{ind}</option>)}
                    </select>
                    {errors.industry && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.industry}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="p-field" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>PAN / VAT Number</label>
                    <input 
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                      value={compForm.pan} 
                      onChange={e => setCompForm({ ...compForm, pan: e.target.value })} 
                      placeholder="E.g. 123456789" 
                    />
                  </div>

                  <div className="p-field" style={{ marginBottom: 0 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Size</label>
                    <select 
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                      value={compForm.size} 
                      onChange={e => setCompForm({ ...compForm, size: e.target.value })}
                    >
                      <option value="" style={{ background: '#0f1d2e' }}>Employees</option>
                      {SETUP_SIZES.map(s => <option key={s} value={s} style={{ background: '#0f1d2e' }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="p-field" style={{ marginBottom: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Address</label>
                  <input 
                    style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                    value={compForm.address} 
                    onChange={e => setCompForm({ ...compForm, address: e.target.value })} 
                    placeholder="Street name, Ward" 
                  />
                </div>
              </div>

              {/* Logo Upload Card (Right Pane) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
                <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(14,165,233,0.3)' }}>
                    {logoPreview ? <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : (compForm.companyName ? compForm.companyName[0].toUpperCase() : '?')}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{compForm.companyName || 'My Company'}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>Workspace Identity</div>
                </div>

                <label className="logo-upload-zone" style={{ cursor: 'pointer', padding: '16px 12px', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, textAlign: 'center', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' }}>
                  <Upload size={20} style={{ color: '#0ea5e9' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>Upload Logo</span>
                  <span style={{ fontSize: '0.62rem', color: '#64748b' }}>PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/*" hidden onChange={handleLogoChange} />
                </label>
              </div>
            </div>

            <button className="p-btn-primary p-btn-full" onClick={handleCompanySubmit} style={{ marginTop: 24, height: 44, fontSize: '0.9rem', fontWeight: 700 }}>
              Continue to URL Setup <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1: DOMAIN SETUP */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16, color: '#fff' }}>2. Choose your workspace URL</h3>
            <div className="domain-builder" style={{ margin: 0, padding: 18 }}>
              <div className="domain-builder-label">Custom Subdomain</div>
              <div className="domain-input-row">
                <input
                  className="domain-prefix-input"
                  value={subdomain}
                  onChange={e => setSubdomain(e.target.value)}
                  placeholder="mycompany"
                  maxLength={32}
                />
                <div className="domain-suffix">.pivotalerp.app</div>
              </div>
              <div className="domain-preview" style={{ marginTop: 10 }}>
                <Globe size={14} color="#0ea5e9" />
                <span className="domain-preview-url" style={{ fontWeight: 700, color: '#0ea5e9', marginLeft: 6 }}>{cleanSub}.pivotalerp.app</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="p-btn-back" onClick={() => setStep(0)} style={{ flex: 1 }}>Back</button>
              <button className="p-btn-primary" onClick={handleDomainSubmit} style={{ flex: 2 }}>
                Continue to Activation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16, color: '#fff' }}>3. Select Plan &amp; Activate</h3>
            
            {/* Plan selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              {Object.entries(SETUP_PLANS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  style={{
                    flex: 1, padding: '8px 12px', border: '2px solid', borderRadius: 8, cursor: 'pointer',
                    borderColor: selectedPlan === key ? '#0ea5e9' : 'rgba(255,255,255,0.08)',
                    background: selectedPlan === key ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.02)',
                    color: selectedPlan === key ? '#0ea5e9' : '#7e95ae',
                    fontWeight: 700, fontSize: '0.8rem',
                  }}
                >
                  {p.name} — NPR {p.price}/mo
                </button>
              ))}
            </div>

            {/* Payment method selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {SETUP_METHODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px',
                    border: '2px solid', borderRadius: 8, cursor: 'pointer',
                    borderColor: selectedMethod === m.id ? '#0ea5e9' : 'rgba(255,255,255,0.08)',
                    background: selectedMethod === m.id ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.02)',
                    color: '#fff', textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>{m.label}</div>
                    <div style={{ fontSize: '0.62rem', color: '#7e95ae' }}>{m.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {selectedMethod === 'connectips' && (
              <div style={{ background: '#fff', borderRadius: 10, padding: 12, textAlign: 'center', marginBottom: 16, color: '#333' }}>
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>▉▉▉<br />█ ▉ █<br />▉▉▉</div>
                <div style={{ fontSize: '0.75rem', marginTop: 6 }}>Scan QR with bank app to activate.</div>
              </div>
            )}

            <button
              className="p-btn-primary p-btn-full"
              onClick={handlePaymentSubmit}
              disabled={processing}
            >
              {processing ? 'Activating Workspace…' : 'Activate & Launch ERP'}
            </button>

            <button
              style={{ background: 'none', border: 'none', color: '#7e95ae', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', width: '100%', textAlign: 'center', marginTop: 12 }}
              onClick={() => {
                const updatedCompany = {
                  ...compForm,
                  subdomain: cleanSub,
                  plan: 'Free Trial',
                  paymentMethod: 'trial',
                };
                saveCompany(updatedCompany);
                update({ ...updatedCompany, showSetupModal: false });
              }}
            >
              Skip payment — Start Free Trial
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTabId, setActiveTabId] = useState(getSavedActiveTabId);
  const [spotlight, setSpotlight] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getSavedDarkMode);
  const [quickAccessItems, setQuickAccessItems] = useState(getSavedQuickAccess);
  const [quickCreate, setQuickCreate] = useState(null); 
  const [brandingOpen, setBrandingOpen]     = useState(false);
  const [activePaletteId, setActivePaletteId] = useState(DEFAULT_PALETTE_ID);
  const [activeFontId, setActiveFontId]       = useState('montserrat');

  useEffect(() => {
    const saved = loadBranding();
    const palette = COLOR_PALETTES.find(p => p.id === saved.paletteId);
    const font    = FONT_OPTIONS.find(f => f.id === saved.fontId);
    if (palette) { applyPalette(palette); setActivePaletteId(palette.id); }
    if (font)    { applyFont(font);       setActiveFontId(font.id); }
  }, []);

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
      setActiveTabId(null); 
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
    <Routes>
      <Route path="/"               element={<LandingPage />} />
      <Route path="/signup"         element={<Navigate to="/signup/account" replace />} />
      <Route path="/signup/account" element={<Step1_AdminDetails />} />
      <Route path="/signup/payment" element={<Step2_Payment />} />
      <Route path="/signup/welcome" element={<Step3_Welcome />} />
      <Route path="/signup/company" element={<Step4_CompanySetup />} />
      <Route path="/signup/domain"  element={<Step5_DomainSetup />} />
      <Route path="/login"          element={<WorkspaceLookup />} />
      <Route path="/login/workspace/:subdomain" element={<CustomDomainLogin />} />
      <Route path="/erp/*"          element={<ERPApp collapsed={collapsed} setCollapsed={setCollapsed} tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} closeTab={closeTab} activeTab={activeTab} openTab={openTab} toggleQuickAccess={toggleQuickAccess} quickAccessItems={quickAccessItems} spotlight={spotlight} setSpotlight={setSpotlight} brandingOpen={brandingOpen} setBrandingOpen={setBrandingOpen} activePaletteId={activePaletteId} setActivePaletteId={setActivePaletteId} activeFontId={activeFontId} setActiveFontId={setActiveFontId} quickCreate={quickCreate} setQuickCreate={setQuickCreate} shortcutsOpen={shortcutsOpen} setShortcutsOpen={setShortcutsOpen} shortcutColumns={shortcutColumns} shortcutData={shortcutData} darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route path="*"               element={<Navigate to="/" replace />} />
    </Routes>
  );
}
