import React, { useState, useMemo } from 'react';
import {
  Form, Input, Select, Button, Switch, Table, Tag, Tooltip,
  InputNumber, Divider, Space, notification, Modal
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, DownloadOutlined, ReloadOutlined, SaveOutlined,
  ArrowLeftOutlined, CheckCircleOutlined, BankOutlined,
  UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined,
  FileTextOutlined, DollarOutlined, SwapOutlined, TeamOutlined,
  TagsOutlined, FileDoneOutlined, FullscreenOutlined, FullscreenExitOutlined, SettingOutlined, MenuFoldOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

/* ══════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════ */
const LEDGER_GROUPS = [
  'Bank Accounts', 'Cash-in-hand', 'Sundry Debtors', 'Sundry Creditors',
  'Current Assets', 'Fixed Assets', 'Capital Account', 'Loans (Liability)',
  'Current Liabilities', 'Investments', 'Indirect Income', 'Direct Income',
  'Indirect Expenses', 'Direct Expenses'
];

const GROUP_COLOR = {
  'Bank Accounts': 'var(--accent-blue)', 'Cash-in-hand': '#0f9d58',
  'Sundry Debtors': '#0891b2', 'Sundry Creditors': '#d97706',
  'Current Assets': '#7c3aed', 'Fixed Assets': '#6366f1',
  'Capital Account': '#b45309', 'Loans (Liability)': '#dc2626',
  'Current Liabilities': '#ea580c', 'Investments': '#9333ea',
  'Indirect Income': '#16a34a', 'Direct Income': '#059669',
  'Indirect Expenses': '#e11d48', 'Direct Expenses': '#f59e0b',
};

const MOCK_LEDGERS = [
  { id: 1,  name: 'Nabil Bank A/C',             alias: 'NABIL-01',  code: 'LG-0001', group: 'Bank Accounts',      panVat: '601234567', mobile: '9841001001', status: 'Active',    address: 'New Road, Kathmandu' },
  { id: 2,  name: 'Global IME Bank A/C',         alias: 'GIBL-01',   code: 'LG-0002', group: 'Bank Accounts',      panVat: '601234568', mobile: '9841001002', status: 'Active',    address: 'Putalisadak, KTM' },
  { id: 3,  name: 'Cash Ledger',                 alias: 'CASH',      code: 'LG-0003', group: 'Cash-in-hand',       panVat: '—',         mobile: '—',          status: 'Active',    address: 'Head Office' },
  { id: 4,  name: 'Himalayan Traders Pvt. Ltd.', alias: 'HT-PVT',   code: 'LG-0004', group: 'Sundry Creditors',   panVat: '500123456', mobile: '9801234567', status: 'Active',    address: 'Baneshwor, KTM' },
  { id: 5,  name: 'Nepal Dairy Products',        alias: 'NDP-01',    code: 'LG-0005', group: 'Sundry Creditors',   panVat: '500654321', mobile: '9801234568', status: 'Active',    address: 'Balaju, KTM' },
  { id: 6,  name: 'Office Rent Account',         alias: 'RENT-01',   code: 'LG-0006', group: 'Indirect Expenses',  panVat: '—',         mobile: '—',          status: 'Active',    address: 'Lazimpat, KTM' },
  { id: 7,  name: 'Sales Revenue Account',       alias: 'SALES-REV', code: 'LG-0007', group: 'Direct Income',      panVat: '—',         mobile: '—',          status: 'Active',    address: '—' },
  { id: 8,  name: 'Everest Trading Co.',         alias: 'ETC-01',    code: 'LG-0008', group: 'Sundry Debtors',     panVat: '502345678', mobile: '9851234567', status: 'De-Active', address: 'Thamel, KTM' },
  { id: 9,  name: 'Building & Premises',         alias: 'BLDG-01',   code: 'LG-0009', group: 'Fixed Assets',       panVat: '—',         mobile: '—',          status: 'Active',    address: 'Head Office' },
  { id: 10, name: 'Share Capital',               alias: 'CAP-01',    code: 'LG-0010', group: 'Capital Account',    panVat: '—',         mobile: '—',          status: 'Active',    address: 'Head Office' },
  { id: 11, name: 'Salary Expenses',             alias: 'SAL-01',    code: 'LG-0011', group: 'Indirect Expenses',  panVat: '—',         mobile: '—',          status: 'Active',    address: '—' },
  { id: 12, name: 'Income Tax Payable',          alias: 'ITAX-01',   code: 'LG-0012', group: 'Current Liabilities',panVat: '—',         mobile: '—',          status: 'Active',    address: '—' },
  { id: 13, name: 'Machinery & Equipment',       alias: 'MACH-01',   code: 'LG-0013', group: 'Fixed Assets',       panVat: '—',         mobile: '—',          status: 'Active',    address: 'Factory Site' },
  { id: 14, name: 'Vertex Solutions Pvt. Ltd.',  alias: 'VRTX-01',   code: 'LG-0014', group: 'Sundry Debtors',     panVat: '503456789', mobile: '9861234567', status: 'Active',    address: 'Durbarmarg, KTM' },
  { id: 15, name: 'VAT Payable Account',         alias: 'VAT-01',    code: 'LG-0015', group: 'Current Liabilities',panVat: '—',         mobile: '—',          status: 'Active',    address: '—' },
  { id: 16, name: 'Cash Equivalents Reserve',    alias: 'CER-01',    code: 'LG-0016', group: 'Current Assets',     panVat: '—',         mobile: '—',          status: 'Active',    address: '—' },
  { id: 17, name: 'Furniture & Fixtures',        alias: 'FURN-01',   code: 'LG-0017', group: 'Fixed Assets',       panVat: '—',         mobile: '—',          status: 'De-Active', address: '—' },
  { id: 18, name: 'Kumari Bank A/C',             alias: 'KBL-01',    code: 'LG-0018', group: 'Bank Accounts',      panVat: '601234569', mobile: '9841001003', status: 'Active',    address: 'Putalisadak, KTM' },
];

/* ══════════════════════════════════════════════
   CONFIG TOGGLE — single row with switch
══════════════════════════════════════════════ */
function ConfigToggle({ label, description, value, onChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '9px 0',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{ flex: 1, paddingRight: 10, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 1 }}>
            {description}
          </div>
        )}
      </div>
      <Switch
        checked={value}
        onChange={onChange}
        size="small"
        style={{ flexShrink: 0 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONFIG SECTION — card wrapper
══════════════════════════════════════════════ */
function ConfigSection({ icon, title, children }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
      flexShrink: 0,
    }}>
      <div style={{
        padding: '7px 12px',
        background: 'var(--gray-50)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: 'var(--text-muted)',
      }}>
        {icon} {title}
      </div>
      <div style={{ padding: '2px 12px 8px' }}>{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION HEADER inside form
══════════════════════════════════════════════ */
function SectionLabel({ icon, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: 'var(--text-muted)',
      marginBottom: 14, marginTop: 4,
    }}>
      {icon} {label}
    </div>
  );
}

/* ══════════════════════════════════════════════
   FORM CARD inside form
══════════════════════════════════════════════ */
function FormCard({ icon, title, children }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 4px 12px var(--shadow-color, rgba(0,0,0,0.03))'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 24, paddingBottom: 12,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          background: 'var(--primary, var(--accent-blue))',
          color: '#ffffff',
          padding: '4px 8px',
          borderRadius: '4px',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {icon} {title}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MODE PILL BUTTON
══════════════════════════════════════════════ */
function ModePill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 16px', borderRadius: 7, border: 'none',
      cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      background: active ? 'var(--bg-card)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-secondary)',
      boxShadow: active ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.15s',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const DEFAULT_CONFIG = {
  active: true, billwise: false, inventory: false,
  costCenters: false, interest: false, cheque: false,
  isImportExport: false, fundTransfer: false,
  sms: false, email: false, notification: false, taxable: true,
};

export default function LedgerMaster({ darkMode }) {
  const [mode, setMode] = useState('form');         // 'form' | 'directory'
  const [activeTab, setActiveTab] = useState('basic');
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [config, setConfig] = useState({ ...DEFAULT_CONFIG });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMultipleModalOpen, setIsMultipleModalOpen] = useState(false);
  const [multipleRows, setMultipleRows] = useState([{ id: 1, panVatNo: '', name: '', alias: '', code: '', groupId: '' }]);
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(false);

  /* Directory filters */
  const [dirSearch, setDirSearch]   = useState('');
  const [searchBy, setSearchBy]     = useState('Ledger Name');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]     = useState(10);
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const setKey = k => v => setConfig(c => ({ ...c, [k]: v }));

  const notify = (msg, type = 'success') =>
    notification[type]({ message: msg, placement: 'bottomRight', duration: 2 });

  /* ── Load record into form for editing */
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      name: record.name, alias: record.alias,
      group: record.group, panVat: record.panVat !== '—' ? record.panVat : '',
      address: record.address !== '—' ? record.address : '',
      mobile: record.mobile !== '—' ? record.mobile : '',
    });
    setMode('form');
    setActiveTab('basic');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    form.resetFields();
    setEditingRecord(null);
    setActiveTab('basic');
    setConfig({ ...DEFAULT_CONFIG });
  };

  const handleSave = () => {
    form.validateFields()
      .then(() => {
        notify(editingRecord
          ? `Ledger "${editingRecord.name}" updated successfully!`
          : 'New Ledger created successfully!');
        if (!editingRecord) handleReset();
      })
      .catch(() => notify('Please fill all required fields', 'error'));
  };

  const handleAddMultipleRow = () => {
    setMultipleRows([...multipleRows, { id: Date.now(), panVatNo: '', name: '', alias: '', code: '', groupId: '' }]);
  };

  const handleRemoveMultipleRow = (id) => {
    if (multipleRows.length > 1) {
      setMultipleRows(multipleRows.filter(r => r.id !== id));
    }
  };

  const handleMultipleRowChange = (id, field, value) => {
    setMultipleRows(multipleRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSaveMultiple = () => {
    notify(`Successfully created ${multipleRows.length} ledgers!`);
    setIsMultipleModalOpen(false);
    setMultipleRows([{ id: 1, panVatNo: '', name: '', alias: '', code: '', groupId: '' }]);
  };

  /* ── Filtered directory */
  const filtered = useMemo(() => MOCK_LEDGERS.filter(l => {
    const q = dirSearch.toLowerCase();
    let ms = !q;
    if (q) {
      if (searchBy === 'Ledger Name') {
        ms = l.name.toLowerCase().includes(q);
      } else if (searchBy === 'Code') {
        ms = l.code.toLowerCase().includes(q);
      } else if (searchBy === 'Alias') {
        ms = l.alias?.toLowerCase().includes(q);
      }
    }
    const mg = groupFilter === 'all' || l.group === groupFilter;
    const mst = statusFilter === 'all' || l.status === statusFilter;
    return ms && mg && mst;
  }), [dirSearch, searchBy, groupFilter, statusFilter]);

  const activeCount   = MOCK_LEDGERS.filter(l => l.status === 'Active').length;
  const inactiveCount = MOCK_LEDGERS.filter(l => l.status === 'De-Active').length;

  /* ══ FORM TABS ══ */
  const TABS = [
    { key: 'basic',   label: 'Basic Info',        icon: <BankOutlined /> },
    { key: 'contact', label: 'Contact Details',    icon: <PhoneOutlined /> },
    { key: 'other',   label: 'Bank Details',       icon: <DollarOutlined /> },
    { key: 'docs',    label: 'Doc Attach',         icon: <FileTextOutlined /> },
    { key: 'udf',     label: 'Ledger UDF',         icon: <TagsOutlined /> },
    { key: 'config',  label: 'Configuration',      icon: <SettingOutlined /> },
  ];

  /* ══ DIRECTORY COLUMNS ══ */
  const columns = [
    {
      title: 'Ledger Account',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8, flexShrink: 0,
            background: GROUP_COLOR[r.group] + '18',
            border: `1px solid ${GROUP_COLOR[r.group]}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, color: GROUP_COLOR[r.group],
          }}>
            {r.group === 'Bank Accounts' ? '🏦' :
             r.group === 'Cash-in-hand' ? '💵' :
             r.group.includes('Debtors') ? '📤' :
             r.group.includes('Creditors') ? '📥' :
             r.group.includes('Expenses') ? '📉' :
             r.group.includes('Income') ? '📈' :
             r.group.includes('Assets') ? '🏗️' : '📒'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-main)', lineHeight: 1.3,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {text}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {r.alias} · {r.code}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      width: 160,
      render: v => (
        <span style={{
          display: 'inline-flex', padding: '3px 8px', borderRadius: 4,
          fontSize: 11, fontWeight: 500,
          background: (GROUP_COLOR[v] || '#888') + '15',
          color: GROUP_COLOR[v] || '#888',
          border: `1px solid ${(GROUP_COLOR[v] || '#888')}30`,
          whiteSpace: 'nowrap',
        }}>{v}</span>
      ),
    },
    {
      title: 'PAN/VAT',
      dataIndex: 'panVat',
      key: 'panVat',
      width: 110,
      render: v => (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11.5,
          color: v === '—' ? 'var(--text-muted)' : 'var(--text-main)',
        }}>{v}</span>
      ),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 125,
      render: v => (
        <span style={{ fontSize: 12, color: v === '—' ? 'var(--text-muted)' : 'var(--accent-blue)' }}>{v}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 96,
      render: v => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20,
          fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
          background: v === 'Active' ? '#e6f4ea' : '#fce8e6',
          color: v === 'Active' ? '#0f9d58' : '#d93025',
        }}>{v}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 110,
      render: (_, record) => (
        <Space size={2}>
          <Tooltip title="Edit Ledger">
            <Button type="text" size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ color: 'var(--accent-blue)' }}
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button type="text" size="small"
              icon={<EyeOutlined />}
              style={{ color: 'var(--text-secondary)' }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small"
              icon={<DeleteOutlined />}
              style={{ color: 'var(--error)' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  /* ══════════════════════════════════
     RENDER
  ══════════════════════════════════ */
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      ...(isFullscreen ? {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999, background: 'var(--bg-layout)',
      } : {})
    }}>

      {/* ── PAGE HEADER ── */}
      <div className="erp-page-header" style={{ flexShrink: 0, alignItems: 'center', paddingBottom: 8 }}>
        {/* Left: context actions (back button / editing state / title) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {editingRecord && mode === 'form' && (
            <Tooltip title="Back to Directory">
              <Button size="small" icon={<ArrowLeftOutlined />}
                onClick={() => { setMode('directory'); setEditingRecord(null); form.resetFields(); }}
              />
            </Tooltip>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="erp-page-title" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 0 }}>
              Ledger
              {editingRecord && (
                <span style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                  background: '#e8f0fe', color: 'var(--accent-blue)', border: '1px solid #c5d9fb',
                  display: 'inline-block', transform: 'translateY(-2px)'
                }}>EDITING: {editingRecord.name}</span>
              )}
            </div>
            
            <div style={{ width: 1, height: 16, background: 'var(--border-color)' }}></div>

            <div className="erp-page-breadcrumb" style={{ paddingBottom: 0, marginTop: 2 }}>
              <span className="breadcrumb-link" onClick={() => {}} style={{ color: 'var(--accent-blue)' }}>Accounting</span>
              <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
              <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setMode('form')}>Ledger</span>
              <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
              <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setMode('form')}>
                {{
                  basic: 'Basic Info',
                  contact: 'Contact Details',
                  other: 'Bank Details',
                  docs: 'Doc Attach',
                  udf: 'Ledger UDF',
                  config: 'Configuration'
                }[activeTab] || 'Basic Info'}
              </span>
              {mode === 'directory' && (
                <>
                  <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: mode switcher + action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Filters (Only visible in Directory mode) */}


          {mode === 'form' && (
            <div style={{ display: 'flex', gap: 8, marginRight: 8, alignItems: 'center' }}>
              <Tooltip title="Clear form and start fresh">
                <Button size="small" icon={<ReloadOutlined />} onClick={handleReset} style={{ borderRadius: 4, fontWeight: 500 }}>Reset</Button>
              </Tooltip>
              <Button size="small" type="primary" icon={<SaveOutlined />} onClick={handleSave}
                style={{ background: 'var(--primary)', borderColor: 'var(--primary)', borderRadius: 4, fontWeight: 500 }}>
                {editingRecord ? 'Update' : 'Save'}
              </Button>
              <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />
            </div>
          )}

          {/* Directory / Form Toggle */}
          <Button
            size="small"
            type="default"
            icon={mode === 'directory' ? <ArrowLeftOutlined /> : <span style={{ fontSize: 14 }}>📋</span>}
            onClick={() => {
              if (mode === 'directory') {
                setMode('form');
                setEditingRecord(null);
                form.resetFields();
              } else {
                setMode('directory');
              }
            }}
            style={{ borderRadius: 4, borderColor: 'var(--border-color)', color: 'var(--text-main)', fontWeight: 500 }}
          >
            {mode === 'directory' ? 'Back to Form' : 'Directory'}
          </Button>

          {/* Create Multiple Button */}
          {mode === 'form' && (
            <Button
              size="small"
              type="primary"
              style={{ background: 'var(--accent-blue)', borderColor: 'var(--accent-blue)', borderRadius: 4, fontWeight: 500 }}
              onClick={() => setIsMultipleModalOpen(true)}
            >
              Create Multiple
            </Button>
          )}

          <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}>
            <Button
              size="small"
              type="text"
              icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{ color: 'var(--text-muted)' }}
            />
          </Tooltip>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* ════════════════════════════
            FORM VIEW
        ════════════════════════════ */}
        {mode === 'form' && (
          <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

            {/* MAIN FORM AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'all 0.2s', position: 'relative' }}>

              {/* ── RIGHT HOVER TRIGGER ── */}
              <div 
                onMouseEnter={() => setIsRightPaneOpen(true)}
                style={{ 
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: 20, zIndex: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(to right, transparent, rgba(37, 99, 235, 0.05))',
                  cursor: 'pointer'
                }}
              >
                 <div style={{
                   background: 'var(--bg-card)', border: '1px solid var(--accent-blue)', borderRight: 'none',
                   padding: '14px 4px', borderRadius: '6px 0 0 6px', boxShadow: '-4px 0 12px rgba(37, 99, 235, 0.15)',
                   display: 'flex', alignItems: 'center'
                 }}>
                   <SettingOutlined style={{ color: 'var(--accent-blue)', fontSize: 14 }} />
                 </div>
              </div>

              {/* ── SLIDING CONFIG PANE ── */}
              <div 
                onMouseLeave={() => setIsRightPaneOpen(false)}
                style={{ 
                  position: 'absolute', right: isRightPaneOpen ? 0 : -360, top: 0, bottom: 0, width: 340, zIndex: 20,
                  background: 'var(--bg-card)', boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
                  borderLeft: '1px solid var(--border-color)', transition: 'right 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                 <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--gray-50)' }}>
                   <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}><SettingOutlined /> Ledger Configurations</span>
                   <MenuFoldOutlined onClick={() => setIsRightPaneOpen(false)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                   <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <ConfigSection icon={<CheckCircleOutlined style={{ fontSize: 10 }} />} title="Account Status">
                        <ConfigToggle label="Active" value={config.active} onChange={setKey('active')} />
                        <ConfigToggle label="Is Taxable" value={config.taxable} onChange={setKey('taxable')} />
                      </ConfigSection>

                      <ConfigSection icon={<DollarOutlined style={{ fontSize: 10 }} />} title="Accounting Behavior">
                        <ConfigToggle label="Bill-wise Adjustment" value={config.billwise} onChange={setKey('billwise')} />
                        <ConfigToggle label="Inventory Values" value={config.inventory} onChange={setKey('inventory')} />
                        <ConfigToggle label="Cost Centers" value={config.costCenters} onChange={setKey('costCenters')} />
                        <ConfigToggle label="Interest Calculation" value={config.interest} onChange={setKey('interest')} />
                        <ConfigToggle label="Active Cheque Details" value={config.cheque} onChange={setKey('cheque')} />
                      </ConfigSection>

                      <ConfigSection icon={<SwapOutlined style={{ fontSize: 10 }} />} title="Trade Flags">
                        <ConfigToggle label="Import/Export Ledger" value={config.isImportExport} onChange={setKey('isImportExport')} />
                        <ConfigToggle label="Fund Transfer" value={config.fundTransfer} onChange={setKey('fundTransfer')} />
                      </ConfigSection>

                      <ConfigSection icon={<MailOutlined style={{ fontSize: 10 }} />} title="Notifications">
                        <ConfigToggle label="Active SMS" value={config.sms} onChange={setKey('sms')} />
                        <ConfigToggle label="Active Email" value={config.email} onChange={setKey('email')} />
                        <ConfigToggle label="Notifications" value={config.notification} onChange={setKey('notification')} />
                      </ConfigSection>
                   </div>

                   <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--gray-50)', flexShrink: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 8 }}>
                        Active Config Summary
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {config.active   && <Tag color="green"  style={{ margin: 0 }}>Active</Tag>}
                        {config.taxable  && <Tag color="blue"   style={{ margin: 0 }}>Taxable</Tag>}
                        {config.billwise && <Tag color="orange" style={{ margin: 0 }}>Bill-wise</Tag>}
                        {config.inventory && <Tag color="purple" style={{ margin: 0 }}>Inventory</Tag>}
                        {config.costCenters && <Tag color="cyan" style={{ margin: 0 }}>Cost Centre</Tag>}
                        {config.interest && <Tag color="gold"   style={{ margin: 0 }}>Interest</Tag>}
                        {config.sms      && <Tag style={{ margin: 0 }}>SMS Enabled</Tag>}
                        {config.email    && <Tag style={{ margin: 0 }}>Email Enabled</Tag>}
                        {Object.values(config).every(v => !v) && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>No configuration active.</span>}
                      </div>
                   </div>
                 </div>
              </div>

              {/* Sub-tab bar */}
              <div style={{
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex', paddingLeft: 20, flexShrink: 0,
                overflowX: 'auto',
              }}>
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                    padding: '10px 16px', border: 'none',
                    background: 'transparent', cursor: 'pointer',
                    fontSize: 12.5, fontWeight: activeTab === t.key ? 700 : 500,
                    fontFamily: 'var(--font-sans)',
                    color: activeTab === t.key ? 'var(--primary)' : 'var(--text-secondary)',
                    borderBottom: activeTab === t.key
                      ? '2px solid var(--primary)' : '2px solid transparent',
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Form body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 24px' }}>
                <Form form={form} layout="vertical" className="compact-form">

                  {/* ── BASIC INFO ── */}
                  {activeTab === 'basic' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

                      {/* Identity */}
                      <FormCard icon={<BankOutlined />} title="Identity">
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 160px', gap: 10, marginBottom: 4 }}>
                          <Form.Item label="Ledger Account Name *" name="name"
                            rules={[{ required: true, message: 'Ledger name is required' }]}>
                            <Input placeholder="e.g. Nabil Bank A/C" />
                          </Form.Item>
                          <Form.Item label="Alias" name="alias">
                            <Input placeholder="Short code" className="font-mono" />
                          </Form.Item>
                          <Form.Item label="Account Code">
                            <Input disabled placeholder="Auto: LG-0019" className="font-mono"
                              style={{ background: 'var(--gray-50)', color: 'var(--text-muted)' }} />
                          </Form.Item>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 }}>
                          <Form.Item label="Account Group *" name="group"
                            rules={[{ required: true, message: 'Account group is required' }]}>
                            <Select placeholder="Choose account group" showSearch>
                              {LEDGER_GROUPS.map(g => <Option key={g} value={g}>{g}</Option>)}
                            </Select>
                          </Form.Item>
                          <Form.Item label="PAN / VAT Number" name="panVat">
                            <Input placeholder="9-digit PAN or 11-digit VAT" className="font-mono"
                              suffix={<SearchOutlined style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />} />
                          </Form.Item>
                        </div>
                        <Form.Item label="Registered Address" name="address" style={{ marginBottom: 4 }}>
                          <TextArea rows={2} placeholder="Full registered business address" />
                        </Form.Item>
                      </FormCard>

                      {/* Credit Settings */}
                      <FormCard icon={<DollarOutlined />} title="Credit Settings">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 190px', gap: 14, marginBottom: 4 }}>
                          <Form.Item label="Credit Limit (Rs)" name="creditLimit">
                            <InputNumber
                              style={{ width: '100%' }} placeholder="0.00" min={0} className="font-mono"
                              formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={v => v.replace(/,/g, '')}
                            />
                          </Form.Item>
                          <Form.Item label="Credit Days" name="creditDays">
                            <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
                          </Form.Item>
                          <Form.Item label="Credit Action" name="creditAs">
                            <Select defaultValue="ALLOW">
                              <Option value="ALLOW">
                                <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Allow Postings</span>
                              </Option>
                              <Option value="WARN">
                                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>⚠ Warn Overlimit</span>
                              </Option>
                              <Option value="BLOCK">
                                <span style={{ color: 'var(--error)', fontWeight: 600 }}>✕ Block Postings</span>
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </FormCard>

                      {/* Opening Balance */}
                      <FormCard icon={<SwapOutlined />} title="Opening Balance">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 1fr', gap: 14, marginBottom: 4 }}>
                          <Form.Item label="Opening Balance (Rs)" name="openingBal">
                            <InputNumber
                              style={{ width: '100%' }} placeholder="0.00" min={0} className="font-mono"
                              formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={v => v.replace(/,/g, '')}
                            />
                          </Form.Item>
                          <Form.Item label="Dr / Cr" name="drCr">
                            <Select defaultValue="Dr">
                              <Option value="Dr">
                                <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>Dr</span>
                              </Option>
                              <Option value="Cr">
                                <span style={{ color: '#0f9d58', fontWeight: 700 }}>Cr</span>
                              </Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Dues From (Date)" name="duesFrom">
                            <Input type="date" className="font-mono" />
                          </Form.Item>
                        </div>
                      </FormCard>

                      {/* Assignment & Routing */}
                      <FormCard icon={<TeamOutlined />} title="Assignment & Routing">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 }}>
                          <Form.Item label="Salesman" name="salesman">
                            <Select placeholder="** Select Salesman **" allowClear showSearch>
                              <Option value="s1">Bikash Shrestha</Option>
                              <Option value="s2">Sanjay Tamang</Option>
                              <Option value="s3">Priya Karki</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Area" name="area">
                            <Select placeholder="Select Area" allowClear showSearch>
                              <Option value="a1">Kathmandu Valley</Option>
                              <Option value="a2">Pokhara</Option>
                              <Option value="a3">Butwal</Option>
                              <Option value="a4">Biratnagar</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <Form.Item label="Debtor / Creditor Route" name="route" style={{ marginBottom: 4 }}>
                          <Select placeholder="Select routing preference" allowClear>
                            <Option value="direct">Direct</Option>
                            <Option value="via_agent">Via Agent</Option>
                            <Option value="online">Online Payment</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Remarks / Audit Notes" name="remarks">
                          <TextArea rows={2} placeholder="Internal notes or audit remarks..." />
                        </Form.Item>
                      </FormCard>
                    </div>
                  )}

                  {/* ── CONTACT DETAILS ── */}
                  {activeTab === 'contact' && (
                    <div>
                      <FormCard icon={<PhoneOutlined />} title="Contact Information">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                          <Form.Item label="Contact Person" name="contactName">
                            <Input prefix={<UserOutlined style={{ color: 'var(--text-muted)' }} />} />
                          </Form.Item>
                          <Form.Item label="Designation" name="designation">
                            <Input />
                          </Form.Item>
                          <Form.Item label="Mobile Number" name="mobile">
                            <Input prefix={<PhoneOutlined style={{ color: 'var(--text-muted)' }} />}
                              className="font-mono" placeholder="98XXXXXXXX" />
                          </Form.Item>
                          <Form.Item label="Telephone / Landline" name="telephone">
                            <Input prefix={<PhoneOutlined style={{ color: 'var(--text-muted)' }} />}
                              className="font-mono" placeholder="01-XXXXXXX" />
                          </Form.Item>
                          <Form.Item label="Email Address" name="email"
                            rules={[{ type: 'email', message: 'Enter a valid email' }]}>
                            <Input prefix={<MailOutlined style={{ color: 'var(--text-muted)' }} />}
                              placeholder="contact@example.com" />
                          </Form.Item>
                          <Form.Item label="Website" name="website">
                            <Input addonBefore="https://" placeholder="example.com" />
                          </Form.Item>
                          <Form.Item label="Billing Address" name="billingAddress" style={{ gridColumn: '1/-1' }}>
                            <TextArea rows={2} placeholder="Full billing address" />
                          </Form.Item>
                          <Form.Item label="Shipping Address" name="shippingAddress" style={{ gridColumn: '1/-1' }}>
                            <TextArea rows={2} placeholder="Leave blank if same as billing" />
                          </Form.Item>
                        </div>
                      </FormCard>
                    </div>
                  )}

                  {/* ── BANK DETAILS ── */}
                  {activeTab === 'other' && (
                    <div>
                      <FormCard icon={<BankOutlined />} title="Corporate Bank Details">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                          <Form.Item label="Bank Name" name="bankName"><Input /></Form.Item>
                          <Form.Item label="Account Number" name="bankAccountNo">
                            <Input className="font-mono" />
                          </Form.Item>
                          <Form.Item label="IFSC / SWIFT Code" name="bankIFSC">
                            <Input className="font-mono" />
                          </Form.Item>
                          <Form.Item label="Branch Name" name="bankBranch"><Input /></Form.Item>
                          <Form.Item label="Account Type" name="bankAccountType">
                            <Select defaultValue="Savings">
                              <Option value="Savings">Savings Account</Option>
                              <Option value="Current">Current Account</Option>
                              <Option value="Fixed">Fixed Deposit</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </FormCard>
                    </div>
                  )}

                  {/* ── DOC ATTACH ── */}
                  {activeTab === 'docs' && (
                    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                      <div style={{ fontSize: 42, marginBottom: 12 }}>📎</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                        Document Attachments
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 24, maxWidth: 360, margin: '0 auto 24px' }}>
                        Attach PAN/VAT certificate, business registration, bank letter, agreements, and other supporting documents.
                      </div>
                      <Button icon={<PlusOutlined />} type="dashed" size="large">
                        Attach Document
                      </Button>
                    </div>
                  )}

                  {/* ── UDF ── */}
                  {activeTab === 'udf' && (
                    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                      <div style={{ fontSize: 42, marginBottom: 12 }}>🏷️</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                        Ledger-Wise UDF
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                        User Defined Fields configured by System Administrator
                      </div>
                    </div>
                  )}

                  {/* ── CONFIGURATION TAB ── */}
                  {activeTab === 'config' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      <SectionLabel icon={<SettingOutlined />} label="Ledger Configuration" />
                      
                      <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24,
                      }}>
                        <ConfigSection icon={<CheckCircleOutlined style={{ fontSize: 10 }} />} title="Account Status">
                          <ConfigToggle label="Active" description="Usable in transactions" value={config.active} onChange={setKey('active')} />
                          <ConfigToggle label="Is Taxable" description="Apply VAT on this ledger" value={config.taxable} onChange={setKey('taxable')} />
                        </ConfigSection>

                        <ConfigSection icon={<DollarOutlined style={{ fontSize: 10 }} />} title="Accounting Behavior">
                          <ConfigToggle label="Bill-wise Adjustment" description="Track payments bill-by-bill" value={config.billwise} onChange={setKey('billwise')} />
                          <ConfigToggle label="Inventory Values" description="Affects inventory valuation" value={config.inventory} onChange={setKey('inventory')} />
                          <ConfigToggle label="Cost Centers" description="Enable cost center tracking" value={config.costCenters} onChange={setKey('costCenters')} />
                          <ConfigToggle label="Interest Calculation" description="Auto-calculate interest" value={config.interest} onChange={setKey('interest')} />
                          <ConfigToggle label="Active Cheque Details" description="Track cheque-based payments" value={config.cheque} onChange={setKey('cheque')} />
                        </ConfigSection>

                        <ConfigSection icon={<SwapOutlined style={{ fontSize: 10 }} />} title="Trade Flags">
                          <ConfigToggle label="Import/Export Ledger" description="International trade account" value={config.isImportExport} onChange={setKey('isImportExport')} />
                          <ConfigToggle label="Fund Transfer" description="Allow inter-account transfers" value={config.fundTransfer} onChange={setKey('fundTransfer')} />
                        </ConfigSection>

                        <ConfigSection icon={<MailOutlined style={{ fontSize: 10 }} />} title="Notifications">
                          <ConfigToggle label="Active SMS" value={config.sms} onChange={setKey('sms')} />
                          <ConfigToggle label="Active Email" value={config.email} onChange={setKey('email')} />
                          <ConfigToggle label="Notifications" value={config.notification} onChange={setKey('notification')} />
                        </ConfigSection>
                      </div>

                      {/* Active config tags summary */}
                      <div style={{ marginTop: 12, padding: 16, background: 'var(--gray-50)', borderRadius: 8, border: '1px dashed var(--border-color)' }}>
                        <div style={{
                          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 8,
                        }}>
                          Active Config Summary
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {config.active   && <Tag color="green"  style={{ margin: 0 }}>Active</Tag>}
                          {config.taxable  && <Tag color="blue"   style={{ margin: 0 }}>Taxable</Tag>}
                          {config.billwise && <Tag color="orange" style={{ margin: 0 }}>Bill-wise</Tag>}
                          {config.inventory && <Tag color="purple" style={{ margin: 0 }}>Inventory</Tag>}
                          {config.costCenters && <Tag color="cyan" style={{ margin: 0 }}>Cost Centre</Tag>}
                          {config.interest && <Tag color="gold"   style={{ margin: 0 }}>Interest</Tag>}
                          {config.sms      && <Tag style={{ margin: 0 }}>SMS Enabled</Tag>}
                          {config.email    && <Tag style={{ margin: 0 }}>Email Enabled</Tag>}
                          {Object.values(config).every(v => !v) && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>No configuration active.</span>}
                        </div>
                      </div>
                    </div>
                  )}

                </Form>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════
            DIRECTORY VIEW
        ════════════════════════════ */}
        {mode === 'directory' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--bg-layout)', display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: 'var(--shadow-xs)',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)' }}>Search By</span>
                <Select value={searchBy} onChange={val => setSearchBy(val)} style={{ width: 140 }}>
                  <Option value="Ledger Name">Ledger Name</Option>
                  <Option value="Code">Code</Option>
                  <Option value="Alias">Alias</Option>
                </Select>
                <Input
                  prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
                  placeholder="Search..."
                  value={dirSearch}
                  onChange={e => setDirSearch(e.target.value)}
                  allowClear
                  style={{ width: 180 }}
                />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)', marginLeft: 8 }}>Group</span>
                <Select value={groupFilter} onChange={setGroupFilter} style={{ width: 140 }} placeholder="Group">
                  <Option value="all">All Groups</Option>
                  {LEDGER_GROUPS.map(g => <Option key={g} value={g}>{g}</Option>)}
                </Select>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)', marginLeft: 8 }}>Status</span>
                <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 110 }}>
                  <Option value="all">All Status</Option>
                  <Option value="Active">Active</Option>
                  <Option value="De-Active">De-Active</Option>
                </Select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Show</span>
                <Select value={pageSize} onChange={val => setPageSize(val)} style={{ width: 75 }}>
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-xs)',
            }}>
              <Table
                columns={columns}
                dataSource={filtered}
                rowKey="id"
                size="middle"
                onRow={record => ({
                  style: { cursor: 'pointer' },
                  onDoubleClick: () => handleEdit(record),
                })}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filtered.length,
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    if (size !== pageSize) setPageSize(size);
                  },
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '25', '50'],
                  showTotal: (total, range) =>
                    `Showing ${range[0]}–${range[1]} of ${total} entries`,
                  style: { padding: '10px 20px', margin: 0, borderTop: '1px solid var(--border-color)' },
                }}
              />
            </div>

            <div style={{ marginTop: 10, fontSize: 11.5, color: 'var(--text-muted)', textAlign: 'center' }}>
              💡 Tip: Double-click any row to quickly load it into the edit form
            </div>
          </div>
        )}
      </div>

      {/* ── CREATE MULTIPLE MODAL ── */}
      <Modal
        title={<div style={{ fontWeight: 600, fontSize: 16 }}>Create Multiple Ledger</div>}
        open={isMultipleModalOpen}
        onCancel={() => setIsMultipleModalOpen(false)}
        width={950}
        footer={[
          <Button key="submit" type="primary" onClick={handleSaveMultiple} style={{ background: '#dc3545', borderColor: '#dc3545', borderRadius: 4, padding: '0 24px' }}>
            Ok
          </Button>
        ]}
        bodyStyle={{ padding: '20px 0', overflowX: 'auto' }}
        centered
      >
        <div style={{ minWidth: 800, padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 140px 1fr 140px 120px 140px 80px', gap: 8, padding: '8px 12px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', borderTop: '1px solid var(--border-color)', fontWeight: 600, fontSize: 13, color: 'var(--text-main)' }}>
            <div>S.No.</div>
            <div>PanVatNo</div>
            <div>Name</div>
            <div>Alias</div>
            <div>Code</div>
            <div>LedgerGroupId</div>
            <div style={{ textAlign: 'center' }}>Action</div>
          </div>
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {multipleRows.map((row, index) => (
              <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '50px 140px 1fr 140px 120px 140px 80px', gap: 8, padding: '8px 12px', borderBottom: '1px solid var(--gray-100)', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>{index + 1}</div>
                <Input size="small" value={row.panVatNo} onChange={e => handleMultipleRowChange(row.id, 'panVatNo', e.target.value)} />
                <Input size="small" value={row.name} onChange={e => handleMultipleRowChange(row.id, 'name', e.target.value)} />
                <Input size="small" value={row.alias} onChange={e => handleMultipleRowChange(row.id, 'alias', e.target.value)} />
                <Input size="small" value={row.code} onChange={e => handleMultipleRowChange(row.id, 'code', e.target.value)} />
                <Input size="small" value={row.groupId} onChange={e => handleMultipleRowChange(row.id, 'groupId', e.target.value)} defaultValue="0" />
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontSize: 16, fontWeight: 'bold' }} onClick={handleAddMultipleRow}>+</span>
                  <DeleteOutlined style={{ color: '#dc3545', cursor: 'pointer', fontSize: 15 }} onClick={() => handleRemoveMultipleRow(row.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

    </div>
  );
}
