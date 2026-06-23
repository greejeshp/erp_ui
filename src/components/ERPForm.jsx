import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Form, Input, Select, Button, Checkbox, Tabs, notification, Divider, Tag, Table, Space, Tooltip } from 'antd';
import {
  SaveOutlined, ReloadOutlined, PrinterOutlined,
  CheckCircleOutlined, WarningOutlined, PlusOutlined,
  BankOutlined, DollarOutlined, FileTextOutlined, TagsOutlined, FullscreenOutlined,
  DeleteOutlined, TeamOutlined, DatabaseOutlined, ProfileOutlined, SettingOutlined, MenuFoldOutlined,
  EditOutlined, FullscreenExitOutlined, ArrowLeftOutlined, SearchOutlined
} from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';

const { Option } = Select;
const { TextArea } = Input;

const LEDGER_GROUPS = [
  'Bank Accounts', 'Cash-in-hand', 'Sundry Debtors', 'Sundry Creditors',
  'Current Assets', 'Fixed Assets', 'Capital Account', 'Loans (Liability)',
  'Current Liabilities', 'Investments', 'Indirect Income', 'Direct Income',
  'Indirect Expenses', 'Direct Expenses'
];

const ledgerAccounts = [
  { name: 'Nabil Bank A/C', group: 'Bank Accounts' },
  { name: 'Global IME Bank A/C', group: 'Bank Accounts' },
  { name: 'Cash Ledger', group: 'Cash-in-hand' },
  { name: 'Himalayan Traders Pvt. Ltd.', group: 'Sundry Creditors' },
  { name: 'Nepal Dairy Products', group: 'Sundry Creditors' },
  { name: 'Office Rent Account', group: 'Indirect Expenses' }
];

const productList = [
  { name: 'Dell Latitude Laptop', rate: 75000 },
  { name: 'HP LaserJet Printer', rate: 28000 },
  { name: 'Samsung 24" Monitor', rate: 18500 },
  { name: 'Logitech Wireless Mouse', rate: 1200 }
];

/* ── Shared Settings Panel ── */
function SettingsPanel({ title, items }) {
  return (
    <div className="erp-settings-card">
      <div className="erp-settings-card-header">{title}</div>
      <div className="erp-settings-card-body">
        {items.map(([label, defaultChecked]) => (
          <div key={label} className="erp-settings-item">
            <Checkbox defaultChecked={defaultChecked} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Form Card Wrapper ── */
function FormCard({ title, subtitle, badge, children, footer }) {
  return (
    <div className="erp-main-form-card">
      <div className="erp-form-card-header">
        <div>
          <div className="erp-form-card-title">{title}</div>
          {subtitle && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
        </div>
        {badge && <Tag color="blue" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{badge}</Tag>}
      </div>
      <div className="erp-form-card-body">{children}</div>
      {footer && <div className="erp-form-footer">{footer}</div>}
    </div>
  );
}

/* ── Custom Tab Bar for matching Ledger ── */
function CustomTabs({ activeKey, onChange, items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{
        background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)',
        display: 'flex', paddingLeft: 20, flexShrink: 0, overflowX: 'auto',
      }}>
        {items.map(t => (
          <button key={t.key} type="button" onClick={() => onChange(t.key)} style={{
            padding: '10px 8px', border: 'none', background: 'transparent', cursor: 'pointer',
            fontSize: 11.5, fontWeight: activeKey === t.key ? 700 : 500, fontFamily: 'var(--font-sans)',
            color: activeKey === t.key ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottom: activeKey === t.key ? '2px solid var(--primary)' : '2px solid transparent',
            display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {items.find(t => t.key === activeKey)?.children}
      </div>
    </div>
  );
}

/* ── PreferredSupplierGrid ── */
function PreferredSupplierGrid() {
  const [rows, setRows] = useState([{ id: 1, supplier: '' }]);
  
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '8px 12px', textAlign: 'left', width: 60, borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>S.No.</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>Supplier</th>
            <th style={{ padding: '8px 12px', textAlign: 'center', width: 80, fontWeight: 600, color: 'var(--text-main)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '4px 12px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
              <td style={{ padding: '4px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} placeholder="** Select Vendor Ledger **" bordered={false}>
                  <Option value="Vendor 1">Vendor 1</Option>
                </Select>
              </td>
              <td style={{ padding: '4px 12px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {idx === rows.length - 1 && (
                    <Button size="small" type="text" icon={<PlusOutlined style={{ color: 'var(--accent-blue)' }} />} onClick={() => setRows([...rows, { id: Date.now(), supplier: '' }])} />
                  )}
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} onClick={() => {
                    if (rows.length === 1) return;
                    setRows(rows.filter(r => r.id !== row.id));
                  }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── DefaultRackGrid ── */
function DefaultRackGrid() {
  const [rows, setRows] = useState([{ id: 1, godown: '', rack: '' }]);
  
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '8px 12px', textAlign: 'left', width: 60, borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>S.No.</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>Godown</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>Rack</th>
            <th style={{ padding: '8px 12px', textAlign: 'center', width: 80, fontWeight: 600, color: 'var(--text-main)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '4px 12px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
              <td style={{ padding: '4px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} bordered={false} />
              </td>
              <td style={{ padding: '4px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} bordered={false} />
              </td>
              <td style={{ padding: '4px 12px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {idx === rows.length - 1 && (
                    <Button size="small" type="text" icon={<PlusOutlined style={{ color: 'var(--accent-blue)' }} />} onClick={() => setRows([...rows, { id: Date.now(), godown: '', rack: '' }])} />
                  )}
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} onClick={() => {
                    if (rows.length === 1) return;
                    setRows(rows.filter(r => r.id !== row.id));
                  }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── ProductUdfGrid ── */
function ProductUdfGrid() {
  const [rows, setRows] = useState([
    { id: 1, name: '', label: '', dataType: 'String', defaultValue: '', isMandatory: false, selectOptions: '', after: '', source: '', formula: '', width: 120, references: '', textCol: '' }
  ]);
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, minWidth: 1200 }}>
        <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '8px 10px', textAlign: 'left', width: 50, borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>S.No.</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Name</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Label</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Data Type</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Default Value</th>
            <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 80 }}>IsMandatory</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>SelectOptions</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>After</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Source</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Formula</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 60 }}>Width</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>References</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Text Col</th>
            <th style={{ padding: '8px 10px', textAlign: 'center', width: 70, fontWeight: 600, color: 'var(--text-main)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '4px 10px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} placeholder="Name" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} placeholder="Label" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" defaultValue="String" style={{ width: '100%' }} bordered={false}>
                  <Option value="String">String</Option>
                  <Option value="Number">Number</Option>
                  <Option value="Date">Date</Option>
                </Select>
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}><Checkbox /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} placeholder="Select After" bordered={false} />
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} defaultValue="120" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} placeholder="References" bordered={false} />
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '4px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {idx === rows.length - 1 && (
                    <Button size="small" type="text" icon={<PlusOutlined style={{ color: 'var(--accent-blue)', fontSize: 11 }} />} onClick={() => setRows([...rows, { id: Date.now(), name: '', label: '', dataType: 'String', defaultValue: '', isMandatory: false, selectOptions: '', after: '', source: '', formula: '', width: 120, references: '', textCol: '' }])} />
                  )}
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)', fontSize: 11 }} />} onClick={() => {
                    if (rows.length === 1) return;
                    setRows(rows.filter(r => r.id !== row.id));
                  }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── VoucherUdfGrid ── */
function VoucherUdfGrid() {
  const [rows, setRows] = useState([
    { id: 1, name: '', label: '', dataType: 'String', defaultValue: '', isMandatory: false, selectOptions: '', placement: '', source: '', formula: '', width: 3, references: '', textCol: '' }
  ]);
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, minWidth: 1200 }}>
        <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '8px 10px', textAlign: 'left', width: 50, borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>S.No.</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Name</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Label</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Data Type</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Default Value</th>
            <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 80 }}>IsMandatory</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>SelectOptions</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>In</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Source</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Formula</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 60 }}>Width</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>References</th>
            <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)', width: 100 }}>Text Col</th>
            <th style={{ padding: '8px 10px', textAlign: 'center', width: 70, fontWeight: 600, color: 'var(--text-main)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '4px 10px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} placeholder="Name" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} placeholder="Label" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" defaultValue="String" style={{ width: '100%' }} bordered={false}>
                  <Option value="String">String</Option>
                  <Option value="Number">Number</Option>
                  <Option value="Date">Date</Option>
                </Select>
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}><Checkbox /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} placeholder="In" bordered={false} />
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} defaultValue="3" /></td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                <Select size="small" style={{ width: '100%' }} placeholder="References" bordered={false} />
              </td>
              <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" bordered={false} /></td>
              <td style={{ padding: '4px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {idx === rows.length - 1 && (
                    <Button size="small" type="text" icon={<PlusOutlined style={{ color: 'var(--accent-blue)', fontSize: 11 }} />} onClick={() => setRows([...rows, { id: Date.now(), name: '', label: '', dataType: 'String', defaultValue: '', isMandatory: false, selectOptions: '', placement: '', source: '', formula: '', width: 3, references: '', textCol: '' }])} />
                  )}
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)', fontSize: 11 }} />} onClick={() => {
                    if (rows.length === 1) return;
                    setRows(rows.filter(r => r.id !== row.id));
                  }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── AdditionalChargeGrid ── */
function AdditionalChargeGrid() {
  const [chargeRows, setChargeRows] = useState([
    { id: 1, orderNo: 0, ledgerName: '', reverseLedger: '', sign: '+', rate: 0, amount: 0, canEdit: false, isMandatory: false }
  ]);
  const [dataRows, setDataRows] = useState([]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, background: 'var(--gray-50)', padding: 10, borderRadius: 6, border: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>For:</span>
        <Select placeholder="Select For" style={{ width: 160 }} size="small">
          <Option value="Sales">Sales</Option>
          <Option value="Purchase">Purchase</Option>
        </Select>
        <span style={{ fontSize: 12, fontWeight: 600 }}>S.No.:</span>
        <Input size="small" style={{ width: 100 }} />
        <Button size="small" type="primary" style={{ background: '#2e7d32', borderColor: '#2e7d32' }} icon={<PlusOutlined />} onClick={() => setDataRows([...dataRows, { id: Date.now(), for: 'Sales', name: 'Charge ' + (dataRows.length + 1) }])}>Add</Button>
      </div>

      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: '#fff', marginBottom: 16 }}>
        <div style={{ background: 'var(--gray-50)', padding: '6px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>Additional Charge Detail</span>
          <Button size="small" type="link" icon={<PlusOutlined />} onClick={() => setChargeRows([...chargeRows, { id: Date.now(), orderNo: 0, ledgerName: '', reverseLedger: '', sign: '+', rate: 0, amount: 0, canEdit: false, isMandatory: false }])}>Add Row</Button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
          <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '8px 10px', textAlign: 'left', width: 50, borderRight: '1px solid var(--border-color)' }}>S.No.</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Order No.</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Ledger Name</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Reverse Ledger</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid var(--border-color)', width: 70 }}>Sign</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', width: 80 }}>Rate</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)', width: 90 }}>Amount</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid var(--border-color)', width: 80 }}>Can Edit</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', borderRight: '1px solid var(--border-color)', width: 90 }}>Is Mandatory</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: 70 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {chargeRows.map((row, idx) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '4px 10px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" defaultValue={row.orderNo} bordered={false} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                  <Select size="small" placeholder="** Select Ledger **" style={{ width: '100%' }} bordered={false}>
                    <Option value="Ledger 1">Ledger 1</Option>
                  </Select>
                </td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}>
                  <Select size="small" placeholder="** Select Ledger **" style={{ width: '100%' }} bordered={false}>
                    <Option value="Ledger 2">Ledger 2</Option>
                  </Select>
                </td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <Select size="small" defaultValue="+" style={{ width: 60 }} bordered={false}>
                    <Option value="+">+</Option>
                    <Option value="-">-</Option>
                  </Select>
                </td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" defaultValue={row.rate} bordered={false} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" defaultValue={row.amount} bordered={false} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)', textAlign: 'center' }}><Checkbox checked={row.canEdit} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)', textAlign: 'center' }}><Checkbox checked={row.isMandatory} /></td>
                <td style={{ padding: '4px', textAlign: 'center' }}>
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} onClick={() => {
                    if (chargeRows.length === 1) return;
                    setChargeRows(chargeRows.filter(r => r.id !== row.id));
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <div style={{ background: 'var(--gray-50)', padding: '6px 12px', borderBottom: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>Data List</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
          <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '6px 12px', textAlign: 'left', width: 60 }}>S.No.</th>
              <th style={{ padding: '6px 12px', textAlign: 'left' }}>For</th>
              <th style={{ padding: '6px 12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '6px 12px', textAlign: 'center', width: 80 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, idx) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '6px 12px' }}>{idx + 1}</td>
                <td style={{ padding: '6px 12px' }}>{row.for}</td>
                <td style={{ padding: '6px 12px', color: 'var(--accent-blue)' }}>{row.name}</td>
                <td style={{ padding: '4px', textAlign: 'center' }}>
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} onClick={() => setDataRows(dataRows.filter(r => r.id !== row.id))} />
                </td>
              </tr>
            ))}
            {dataRows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>No records added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── LedgerAllocationGrid ── */
function LedgerAllocationGrid() {
  const [rows, setRows] = useState([
    { id: 1, particular: '', debit: 0, credit: 0, remarks: '' }
  ]);
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Reference Journal Voucher:</span>
        <Select placeholder="Select Reference JV" style={{ width: 220 }} size="small" allowClear />
      </div>
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <div style={{ background: 'var(--gray-50)', padding: '6px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>Particular Allocations</span>
          <Button size="small" type="link" icon={<PlusOutlined />} onClick={() => setRows([...rows, { id: Date.now(), particular: '', debit: 0, credit: 0, remarks: '' }])}>Add Row</Button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
          <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '8px 10px', textAlign: 'left', width: 50, borderRight: '1px solid var(--border-color)' }}>S.No.</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Particular's</th>
              <th style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid var(--border-color)', width: 120 }}>Debit</th>
              <th style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid var(--border-color)', width: 120 }}>Credit</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Remarks</th>
              <th style={{ padding: '8px 10px', textAlign: 'center', width: 70 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '4px 10px', textAlign: 'center', color: 'var(--primary)', borderRight: '1px solid var(--border-color)' }}>{idx + 1}</td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" defaultValue={row.particular} bordered={false} placeholder="Account Particular Name" /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" style={{ textAlign: 'right' }} defaultValue={row.debit} bordered={false} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" style={{ textAlign: 'right' }} defaultValue={row.credit} bordered={false} /></td>
                <td style={{ padding: '2px', borderRight: '1px solid var(--border-color)' }}><Input size="small" defaultValue={row.remarks} bordered={false} placeholder="Narration notes" /></td>
                <td style={{ padding: '4px', textAlign: 'center' }}>
                  <Button size="small" type="text" icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} onClick={() => {
                    if (rows.length === 1) return;
                    setRows(rows.filter(r => r.id !== row.id));
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── ContactGrid sub-component ── */
function ContactGrid({ darkMode }) {
  const [rows, setRows] = useState([]);
  const [form] = Form.useForm();
  const cols = [
    { headerName: 'Contact Name', field: 'name', flex: 1 },
    { headerName: 'Designation', field: 'designation', flex: 1 },
    { headerName: 'Mobile', field: 'mobile', width: 130, cellClass: 'font-mono' },
    { headerName: 'Email', field: 'email', flex: 1 },
  ];
  return (
    <div>
      <Form form={form} layout="inline" style={{ marginBottom: 12, flexWrap: 'wrap', gap: 8 }}
        onFinish={v => { setRows(r => [...r, v]); form.resetFields(); }}>
        <Form.Item name="name" rules={[{ required: true }]}><Input placeholder="Name" style={{ width: 140 }} /></Form.Item>
        <Form.Item name="designation"><Input placeholder="Designation" style={{ width: 140 }} /></Form.Item>
        <Form.Item name="mobile"><Input placeholder="Mobile" style={{ width: 130 }} /></Form.Item>
        <Form.Item name="email"><Input placeholder="Email" style={{ width: 180 }} /></Form.Item>
        <Form.Item><Button type="primary" htmlType="submit" size="small" icon={<PlusOutlined />}>Add</Button></Form.Item>
      </Form>
      <div className={darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} style={{ height: 180, borderRadius: 8, overflow: 'hidden' }}>
        <AgGridReact columnDefs={cols} rowData={rows} rowHeight={34} headerHeight={36} defaultColDef={{ resizable: true }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const MOCK_PRODUCTS = [
  { code: 'P001', name: 'DAHUA 2MP CAMERA', group: 'CAMERA', stock: 45, unit: 'Pcs', rate: 2500, status: 'Active' },
  { code: 'P002', name: 'DAHUA 4MP CAMERA', group: 'CAMERA', stock: 12, unit: 'Pcs', rate: 4200, status: 'Active' },
  { code: 'P003', name: 'DAHUA XVR 4 CHANNEL', group: 'DVR/XVR', stock: 8, unit: 'Pcs', rate: 6500, status: 'Active' },
  { code: 'P004', name: 'CAT6 CABLE BOX (305M)', group: 'ACCESSORIES', stock: 15, unit: 'Roll', rate: 9500, status: 'Active' },
  { code: 'P005', name: '12V 2A POWER ADAPTER', group: 'ACCESSORIES', stock: 120, unit: 'Pcs', rate: 350, status: 'Active' },
  { code: 'P006', name: 'Dell Latitude Laptop', group: 'COMPUTERS', stock: 5, unit: 'Pcs', rate: 75000, status: 'Active' },
  { code: 'P007', name: 'HP LaserJet Printer', group: 'PRINTERS', stock: 3, unit: 'Pcs', rate: 28000, status: 'Active' },
  { code: 'P008', name: 'Samsung 24" Monitor', group: 'MONITORS', stock: 8, unit: 'Pcs', rate: 18500, status: 'Active' },
  { code: 'P009', name: 'Logitech Wireless Mouse', group: 'ACCESSORIES', stock: 50, unit: 'Pcs', rate: 1200, status: 'Active' }
];

const MOCK_VOUCHER_MODES = [
  { id: 1, name: 'Sales Invoice (Normal)', type: 'Sales', abbr: 'SI', numbering: 'Auto', sno: 1, status: 'Active' },
  { id: 2, name: 'Purchase Invoice (VAT)', type: 'Purchase', abbr: 'PI', numbering: 'Auto', sno: 2, status: 'Active' },
  { id: 3, name: 'Cash Receipt', type: 'Receipt', abbr: 'CR', numbering: 'Manual', sno: 3, status: 'Active' },
  { id: 4, name: 'Bank Payment', type: 'Payment', abbr: 'BP', numbering: 'Auto', sno: 4, status: 'Active' },
  { id: 5, name: 'Contra Voucher', type: 'Contra', abbr: 'CO', numbering: 'Auto', sno: 5, status: 'Active' }
];

export default function ERPForm({ tab, darkMode }) {
  const { href } = tab;
  const [form] = Form.useForm();
  const [headerEl, setHeaderEl] = useState(null);
  const [activeProductTab, setActiveProductTab] = useState('basic');
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(false);
  const [productMode, setProductMode] = useState('form'); // 'form' | 'directory'
  const [editingRecord, setEditingRecord] = useState(null);
  const [productFullscreen, setProductFullscreen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productSearchBy, setProductSearchBy] = useState('Product Name');
  const [productPageSize, setProductPageSize] = useState(10);
  const [productCurrentPage, setProductCurrentPage] = useState(1);

  // Voucher Mode states
  const [vModeActiveTab, setVModeActiveTab] = useState('basic');
  const [vModeMode, setVModeMode] = useState('form'); // 'form' | 'directory'
  const [vModeFullscreen, setVModeFullscreen] = useState(false);
  const [vModeSearch, setVModeSearch] = useState('');
  const [vModeSearchBy, setVModeSearchBy] = useState('Voucher Name');
  const [vModePageSize, setVModePageSize] = useState(10);
  const [vModeCurrentPage, setVModeCurrentPage] = useState(1);
  const [editingVModeRecord, setEditingVModeRecord] = useState(null);

  const filteredProducts = React.useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const val = productSearch.toLowerCase();
      if (!val) return true;
      if (productSearchBy === 'Code') {
        return p.code.toLowerCase().includes(val);
      } else {
        return p.name.toLowerCase().includes(val);
      }
    });
  }, [productSearch, productSearchBy]);

  const productColumns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 100, style: { fontFamily: 'var(--font-mono)' } },
    { title: 'Product Name', dataIndex: 'name', key: 'name', render: text => <span style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{text}</span> },
    { title: 'Group', dataIndex: 'group', key: 'group', width: 140 },
    { title: 'Unit', dataIndex: 'unit', key: 'unit', width: 80 },
    { title: 'Stock Qty', dataIndex: 'stock', key: 'stock', width: 110, align: 'right' },
    { title: 'Rate (Rs.)', dataIndex: 'rate', key: 'rate', width: 110, align: 'right', style: { fontFamily: 'var(--font-mono)' } },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 90,
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
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <EditOutlined 
              style={{ color: '#096dd9', cursor: 'pointer' }} 
              onClick={(e) => {
                e.stopPropagation();
                setEditingRecord(record);
                form.setFieldsValue({
                  name: record.name,
                  code: record.code,
                  group: record.group,
                  rate: record.rate,
                  status: record.status,
                  baseUnit: 'Primary',
                  category: 'Primary',
                  productType: 'Primary'
                });
                setProductMode('form');
                setActiveProductTab('basic');
              }} 
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined style={{ color: '#f5222d', cursor: 'pointer' }} />
          </Tooltip>
        </Space>
      )
    }
  ];

  const filteredVModes = React.useMemo(() => {
    return MOCK_VOUCHER_MODES.filter(vm => {
      const val = vModeSearch.toLowerCase();
      if (!val) return true;
      if (vModeSearchBy === 'Abbreviation') {
        return vm.abbr.toLowerCase().includes(val);
      } else {
        return vm.name.toLowerCase().includes(val);
      }
    });
  }, [vModeSearch, vModeSearchBy]);

  const vModeColumns = [
    { title: 'S.No.', dataIndex: 'sno', key: 'sno', width: 80, align: 'center' },
    { title: 'Voucher Name', dataIndex: 'name', key: 'name', render: text => <span style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{text}</span> },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 140 },
    { title: 'Abbr.', dataIndex: 'abbr', key: 'abbr', width: 100 },
    { title: 'Numbering Method', dataIndex: 'numbering', key: 'numbering', width: 160 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
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
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <EditOutlined 
              style={{ color: '#096dd9', cursor: 'pointer' }} 
              onClick={(e) => {
                e.stopPropagation();
                setEditingVModeRecord(record);
                form.setFieldsValue({
                  name: record.name,
                  type: record.type,
                  abbr: record.abbr,
                  numbering: record.numbering,
                  sno: record.sno,
                  status: record.status
                });
                setVModeMode('form');
                setVModeActiveTab('basic');
              }} 
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined style={{ color: '#f5222d', cursor: 'pointer' }} />
          </Tooltip>
        </Space>
      )
    }
  ];
  

  const productAttributesConfig = [
    ['isActive', 'Is Active', true, 'green'],
    ['ignoreNegative', 'Ignore Negative Balance', false, 'red'],
    ['editRateSales', 'Can Edit Rate Sales', true, 'blue'],
    ['editRatePurchase', 'Can Edit Rate Purchase', false, 'cyan'],
    ['setAltUnit', 'Set Alternate Unit', false, 'purple'],
    ['setStdRate', 'Set Standard Rate', false, 'orange'],
    ['setOpening', 'Set Opening', false, 'geekblue'],
    ['maintainBatch', 'Maintain Batch', false, 'magenta'],
    ['useMfg', 'Use MFG Date', false, 'volcano'],
    ['useExp', 'Use EXP Date', false, 'gold'],
    ['isTaxable', 'Is Taxable', true, 'lime'],
    ['allowSalespoint', 'Allow Salespoint', true, 'processing'],
    ['activeSerial', 'Active Serial No.', false, 'error'],
  ];

  useEffect(() => {
    setHeaderEl(document.getElementById('header-actions'));
  }, [tab]);
  const notify    = msg => notification.success({ message: msg, placement: 'bottomRight', duration: 2 });
  const notifyErr = msg => notification.error({ message: msg, placement: 'bottomRight', duration: 3 });

  /* ── LEDGER GROUP ── */
  if (href === '/Account/Creation/LedgerGroup') {
    return (
      <div style={{ padding: 24 }}>
        <FormCard
          title="Ledger Group Master"
          subtitle="Define accounting group hierarchies"
          footer={
            <>
              <Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>Reset</Button>
              <Button type="primary" htmlType="submit" form="lgForm" icon={<SaveOutlined />}>Save Group</Button>
            </>
          }
        >
          <Form id="lgForm" form={form} layout="vertical"
            onFinish={v => notify(`Ledger Group "${v.name}" saved!`)}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="Code"><Input disabled placeholder="Auto (Group Code)" className="font-mono" /></Form.Item>
            <Form.Item label="Group Name *" name="name" rules={[{ required: true }]}><Input placeholder="e.g. Current Assets" /></Form.Item>
            <Form.Item label="Parent Group" name="parent">
              <Select placeholder="Select Parent Account Group">
                {['Capital Account', 'Loans (Liability)', 'Current Liabilities', 'Fixed Assets', 'Current Assets'].map(g =>
                  <Option key={g} value={g}>{g}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Balance Type" name="nature">
              <Select defaultValue="Dr"><Option value="Dr">Debit (Dr)</Option><Option value="Cr">Credit (Cr)</Option></Select>
            </Form.Item>
          </Form>
        </FormCard>
      </div>
    );
  }

  /* ── CUSTOMER MASTER ── */
  if (href === '/Account/Creation/Customer') {
    return (
      <div className="erp-form-layout">
        <div className="erp-settings-panel">
          <SettingsPanel
            title="Customer Config"
            items={[
              ['Active Client', true],
              ['SMS Alerts', true],
              ['Email Statements', true],
              ['Web Portal Access', true],
            ]}
          />
        </div>
        <div className="erp-main-form-card">
          <Tabs style={{ padding: '0 20px' }} items={[
            {
              key: 'basic', label: 'Customer Profile',
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form layout="vertical" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}
                    onFinish={v => notify(`Customer "${v.name}" saved!`)}>
                    <Form.Item label="Customer Legal Name *" name="name" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item label="Trade Alias" name="alias"><Input /></Form.Item>
                    <Form.Item label="Customer Code" name="code"><Input disabled placeholder="CUST-0091" className="font-mono" /></Form.Item>
                    <Form.Item label="Ledger Group *" name="group">
                      <Select defaultValue="Sundry Debtors">
                        <Option value="Sundry Debtors">Sundry Debtors</Option>
                        <Option value="Retail Customers">Retail Customers</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="PAN/VAT Number" name="panVat"><Input className="font-mono" /></Form.Item>
                    <Form.Item label="Contact Mobile" name="mobile"><Input className="font-mono" /></Form.Item>
                    <Form.Item label="Credit Limit (Rs)" name="creditLimit"><Input defaultValue="0.00" className="font-mono" /></Form.Item>
                    <Form.Item label="Credit Days" name="creditDays"><Input type="number" defaultValue={0} /></Form.Item>
                    <Form.Item label="Credit Restriction" name="creditAs">
                      <Select defaultValue="ALLOW">
                        <Option value="ALLOW">Allow Posting</Option>
                        <Option value="WARN">Warn on Limit</Option>
                        <Option value="BLOCK">Block Limit</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Head Office Address" name="address" style={{ gridColumn: '1/-1' }}>
                      <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item style={{ gridColumn: '1/-1' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <Button icon={<ReloadOutlined />}>Reset</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save Customer</Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            { key: 'contacts', label: 'Contact List', children: <div style={{ padding: '16px 0' }}><ContactGrid darkMode={darkMode} /></div> },
            {
              key: 'billing', label: 'Bill / Ship To',
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form layout="vertical">
                    <Form.Item label="Billing Address"><TextArea rows={2} /></Form.Item>
                    <Form.Item label="Shipping Address"><TextArea rows={2} placeholder="Same as billing" /></Form.Item>
                  </Form>
                </div>
              ),
            },
          ]} />
        </div>
      </div>
    );
  }

  /* ── PRODUCT MASTER ── */
  if (href === '/Inventory/Creation/Product') {
    const SectionCard = ({ icon, title, children }) => (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px',
        padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px var(--shadow-color, rgba(0,0,0,0.03))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>
          <div style={{
            background: 'var(--primary, var(--accent-blue))', color: '#ffffff', padding: '4px 8px', borderRadius: '4px',
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            {icon} {title}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
      </div>
    );

    const outerStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...(productFullscreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        background: 'var(--bg-layout)',
      } : {})
    };

    return (
      <div style={outerStyle}>
        {/* ── PAGE HEADER ── */}
        <div className="erp-page-header" style={{ flexShrink: 0, alignItems: 'center', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
          {/* Left: context actions (title & breadcrumbs) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {editingRecord && productMode === 'form' && (
              <Tooltip title="Back to Directory">
                <Button size="small" icon={<ArrowLeftOutlined />}
                  onClick={() => { setProductMode('directory'); setEditingRecord(null); form.resetFields(); }}
                />
              </Tooltip>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="erp-page-title" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 0 }}>
                Product Master
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
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Inventory</span>
                <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setProductMode('form')}>Product Master</span>
                <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setProductMode('form')}>
                  {{
                    basic: 'Basic Info',
                    additional: 'Additional Details',
                    costing: 'Product Costing',
                    terms: 'Term Condition For Invoice',
                    ecommerce: 'For Ecommerce',
                    supplier: 'Preferred Supplier',
                    rack: 'Default Rack',
                    udf: 'Product Wise UDF',
                    attributes: 'Product Attributes'
                  }[activeProductTab] || 'Basic Info'}
                </span>
                {productMode === 'directory' && (
                  <>
                    <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: action buttons and filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {productMode === 'form' && (
              <div style={{ display: 'flex', gap: 8, marginRight: 8, alignItems: 'center' }}>
                <Button size="small" icon={<ReloadOutlined />} onClick={() => {
                  form.resetFields();
                  setEditingRecord(null);
                }} style={{ borderRadius: 4, fontWeight: 500 }}>Reset</Button>
                <Button size="small" type="primary" onClick={() => {
                  form.validateFields()
                    .then(() => {
                      notify(editingRecord ? `Product "${editingRecord.name}" updated successfully!` : 'New Product created successfully!');
                      if (!editingRecord) {
                        form.resetFields();
                      }
                    })
                    .catch(() => notifyErr('Please fill all required fields'));
                }} icon={<SaveOutlined />} style={{ background: 'var(--primary)', borderColor: 'var(--primary)', borderRadius: 4, fontWeight: 500 }}>
                  {editingRecord ? 'Update' : 'Save'}
                </Button>
                <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />
              </div>
            )}

            {/* Directory / Form Toggle */}
            <Button
              size="small"
              type="default"
              icon={productMode === 'directory' ? <ArrowLeftOutlined /> : <span style={{ fontSize: 14 }}>📋</span>}
              onClick={() => {
                setProductMode(productMode === 'directory' ? 'form' : 'directory');
              }}
              style={{ borderRadius: 4, borderColor: 'var(--border-color)', color: 'var(--text-main)', fontWeight: 500 }}
            >
              {productMode === 'directory' ? 'Back to Form' : 'Directory'}
            </Button>

            <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />

            <Tooltip title={productFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}>
              <Button
                size="small"
                type="text"
                icon={productFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={() => setProductFullscreen(!productFullscreen)}
                style={{ color: 'var(--text-muted)' }}
              />
            </Tooltip>
          </div>
        </div>

        {productMode === 'form' ? (
          /* FORM VIEW */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          
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
               <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}><SettingOutlined /> Product Attributes Config</span>
               <MenuFoldOutlined onClick={() => setIsRightPaneOpen(false)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <Form form={form} layout="vertical" className="compact-form" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                   <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {productAttributesConfig.map(([name, label, defaultChecked]) => (
                            <div key={`side-${name}`} style={{
                              background: 'var(--gray-50)', border: '1px solid var(--border-color)', borderRadius: '6px',
                              padding: '6px 12px', display: 'flex', alignItems: 'center', transition: 'all 0.2s', flexShrink: 0
                            }}>
                              <Form.Item name={name} valuePropName="checked" initialValue={defaultChecked} style={{ marginBottom: 0, width: '100%' }}>
                                <Checkbox style={{ width: '100%', fontWeight: 500, color: 'var(--text-main)', fontSize: '12.5px' }}>{label}</Checkbox>
                              </Form.Item>
                            </div>
                          ))}
                     </div>
                   </div>
                   
                   <Form.Item noStyle shouldUpdate>
                      {() => {
                        const vals = form.getFieldsValue();
                        const activeCount = productAttributesConfig.filter(([name]) => vals[name]).length;
                        return (
                          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--gray-50)', flexShrink: 0 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 8 }}>
                              Active Summary
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {productAttributesConfig.map(([name, label, , color]) => 
                                vals[name] ? <Tag key={`sum-${name}`} color={color} style={{ margin: 0, fontSize: 11 }}>{label}</Tag> : null
                              )}
                              {activeCount === 0 && <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>No active attributes.</span>}
                            </div>
                          </div>
                        );
                      }}
                   </Form.Item>
                </Form>
             </div>
          </div>

          <CustomTabs activeKey={activeProductTab} onChange={setActiveProductTab} items={[
            {
              key: 'basic', label: 'Basic Info', icon: <BankOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form" onFinish={v => notify(`Product "${v.name}" saved!`)}>
                    <SectionCard icon={<CheckCircleOutlined />} title="Basic Information">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                        <Form.Item label="Name *" name="name" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item label="Alias" name="alias"><Input /></Form.Item>
                        <Form.Item label="S.No." name="sno"><Input defaultValue="0" /></Form.Item>
                        
                        <Form.Item label="Group *" name="group" rules={[{ required: true }]}><Select defaultValue="Primary Group"><Option value="Primary Group">Primary Group</Option></Select></Form.Item>
                        <Form.Item label="Base Unit" name="baseUnit"><Select defaultValue="Primary"><Option value="Primary">Primary</Option></Select></Form.Item>
                        <Form.Item label="Code *" name="code" rules={[{ required: true }]}><Input /></Form.Item>
                        
                        <Form.Item label="H.S.Code" name="hsCode"><Input /></Form.Item>
                        <Form.Item label="Category" name="category"><Select defaultValue="Primary"><Option value="Primary">Primary</Option></Select></Form.Item>
                        <Form.Item label="Product Type" name="productType"><Select defaultValue="Primary"><Option value="Primary">Primary</Option></Select></Form.Item>
                        
                        <Form.Item label="Purchase Ledger" name="purchaseLedger"><Select placeholder="** Select Purchase Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        <Form.Item label="Purchase Return Ledger" name="purchaseReturnLedger"><Select placeholder="** Select Return Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        <Form.Item label="Sales Ledger" name="salesLedger"><Select placeholder="** Select Sales Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        
                        <Form.Item label="Sales Return Ledger" name="salesReturnLedger"><Select placeholder="** Select Return Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        <Form.Item label="Branch Purchase Ledger" name="branchPurchaseLedger"><Select placeholder="** Select Purchase Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        <Form.Item label="Branch Sales Ledger" name="branchSalesLedger"><Select placeholder="** Select Sales Name **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        
                        <Form.Item label="Income Ledger" name="incomeLedger"><Select placeholder="** Select Income Ledger **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        <Form.Item label="Expenses Ledger" name="expensesLedger"><Select placeholder="** Select Expenses Ledger **"><Option value="1">Ledger 1</Option></Select></Form.Item>
                        
                        <Form.Item label="Description" name="desc" style={{ gridColumn: '1/-1' }}><TextArea rows={2} /></Form.Item>
                      </div>
                    </SectionCard>

                  </Form>
                </div>
              ),
            },
            {
              key: 'additional', label: 'Additional Details', icon: <PlusOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form">
                    <SectionCard icon={<PlusOutlined />} title="Additional Specifications">
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16 }}>
                        <div style={{ border: '1px dashed var(--border-color)', height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                          <span style={{ fontSize: 24, color: '#999' }}>🖼️</span>
                          <span style={{ fontSize: 12, color: 'var(--primary)', marginTop: 8 }}>Add Image</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, gridColumn: '2/-1' }}>
                          <Form.Item label="Division" name="division"><Select /></Form.Item>
                          <Form.Item label="Brand" name="brand"><Select /></Form.Item>
                          <Form.Item label="Color" name="color"><Select /></Form.Item>
                          <Form.Item label="Flavour" name="flavour"><Select /></Form.Item>
                          <Form.Item label="Shape" name="shape"><Select /></Form.Item>
                          <Form.Item label="Product Company" name="productCompany"><Select defaultValue="Not Applicable"><Option value="Not Applicable">Not Applicable</Option></Select></Form.Item>
                          <Form.Item label="Purchase C.C. Rate" name="purchaseCcRate"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Purchase Rate Formula" name="purchaseRateFormula"><Input /></Form.Item>
                          <Form.Item label="Sales C.C. Rate" name="salesCcRate"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Sales Rate Formula" name="salesRateFormula"><Input /></Form.Item>
                          <Form.Item label="Warranty Month" name="warrantyMonth"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="T.S.C. Rate" name="tscRate"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Profit Margin %" name="profitMargin"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Vat Rate %" name="vatRate"><Input defaultValue="13" /></Form.Item>
                          <Form.Item label="Excise Duty Rate" name="exciseDutyRate"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Excise Unit" name="exciseUnit"><Select /></Form.Item>
                          <Form.Item label="Excise On" name="exciseOn"><Select /></Form.Item>
                          <Form.Item label="Discount On" name="discountOn"><Select /></Form.Item>
                          <Form.Item label="Purchase UOM" name="purchaseUom"><Select /></Form.Item>
                          <Form.Item label="Purchase Costing UOM" name="purchaseCostingUom"><Select /></Form.Item>
                          <Form.Item label="Sales UOM" name="salesUom"><Select /></Form.Item>
                          <Form.Item label="Sales Cost UOM" name="salesCostUom"><Select /></Form.Item>
                          <Form.Item label="For Branch" name="forBranch"><Select /></Form.Item>
                          <Form.Item label="1 PCS - Weight" name="pcsWeight"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Weight Unit" name="weightUnit"><Select /></Form.Item>
                          <Form.Item label="1 PCS - Volume" name="pcsVolume"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Volume Unit" name="volumeUnit"><Select /></Form.Item>
                        </div>
                      </div>
                    </SectionCard>

                  </Form>
                </div>
              ),
            },
            {
              key: 'costing', label: 'Product Costing', icon: <CheckCircleOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form">
                    <SectionCard icon={<CheckCircleOutlined />} title="Costing & Valuation">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                        <Form.Item label="Costing Method" name="costingMethod"><Select defaultValue="Avg_Cost"><Option value="Avg_Cost">Avg_Cost</Option></Select></Form.Item>
                        <Form.Item label="Market Valuation Method" name="marketValuationMethod"><Select defaultValue="Avg_Price"><Option value="Avg_Price">Avg_Price</Option></Select></Form.Item>
                        <Form.Item label="Treat all sales as new manufacture" name="treatSalesAsManufacture"><Select defaultValue="No"><Option value="No">No</Option><Option value="Yes">Yes</Option></Select></Form.Item>
                        <Form.Item label="Treat all Purchase as Consumed" name="treatPurchaseAsConsumed"><Select defaultValue="No"><Option value="No">No</Option><Option value="Yes">Yes</Option></Select></Form.Item>
                        <Form.Item label="Treat all rejection inward as scrap" name="treatRejectionAsScrap"><Select defaultValue="No"><Option value="No">No</Option><Option value="Yes">Yes</Option></Select></Form.Item>
                        <Form.Item name="includedVat" valuePropName="checked" style={{ paddingTop: 24 }}><Checkbox>Included Vat</Checkbox></Form.Item>
                      </div>
                    </SectionCard>

                  </Form>
                </div>
              ),
            },
            {
              key: 'terms', label: 'Term Condition For Invoice', icon: <PrinterOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form">
                    <SectionCard icon={<PrinterOutlined />} title="Invoice Terms">
                      <div style={{ border: '1px solid var(--border-color)', borderRadius: 4, padding: 8 }}>
                        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 8, marginBottom: 8, display: 'flex', gap: 8 }}>
                          <Button size="small" type="text"><b>B</b></Button>
                          <Button size="small" type="text"><i>I</i></Button>
                          <Button size="small" type="text"><u>U</u></Button>
                        </div>
                        <TextArea rows={12} bordered={false} placeholder="Enter terms and conditions here..." />
                      </div>
                    </SectionCard>

                  </Form>
                </div>
              ),
            },
            {
              key: 'ecommerce', label: 'For Ecommerce', icon: <SaveOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form">
                    <SectionCard icon={<SaveOutlined />} title="Ecommerce Details">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                        <Form.Item label="Title" name="ecomTitle"><Input /></Form.Item>
                        <Form.Item label="Sub Title" name="ecomSubTitle"><Input /></Form.Item>
                        <div style={{ gridColumn: '1/-1', border: '1px solid var(--border-color)', borderRadius: 4, padding: 8 }}>
                          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 8, marginBottom: 8, display: 'flex', gap: 8 }}>
                            <Button size="small" type="text"><b>B</b></Button>
                            <Button size="small" type="text"><i>I</i></Button>
                            <Button size="small" type="text"><u>U</u></Button>
                          </div>
                          <TextArea rows={12} bordered={false} placeholder="Enter product description here..." />
                        </div>
                      </div>
                    </SectionCard>

                  </Form>
                </div>
              ),
            },
            {
              key: 'supplier', label: 'Preferred Supplier', icon: <TeamOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <PreferredSupplierGrid />
                </div>
              )
            },
            {
              key: 'rack', label: 'Default Rack', icon: <DatabaseOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <DefaultRackGrid />
                </div>
              )
            },
            {
              key: 'udf', label: 'Product Wise UDF', icon: <ProfileOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: 8 }}>
                    <p style={{ marginBottom: 8 }}>No UDF fields configured for products.</p>
                    <Button size="small">Configure UDFs</Button>
                  </div>
                </div>
              )
            },
            {
              key: 'attributes', label: 'Product Attributes', icon: <SettingOutlined />,
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Form form={form} layout="vertical" className="compact-form">
                    <SectionCard icon={<SettingOutlined />} title="Configuration Options">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '8px 0' }}>
                        {productAttributesConfig.map(([name, label, defaultChecked]) => (
                          <div key={`tab-${name}`} style={{
                            background: 'var(--gray-50)', border: '1px solid var(--border-color)', borderRadius: '6px',
                            padding: '8px 12px', display: 'flex', alignItems: 'center', transition: 'all 0.2s'
                          }}>
                            <Form.Item name={name} valuePropName="checked" initialValue={defaultChecked} style={{ marginBottom: 0, width: '100%' }}>
                              <Checkbox style={{ width: '100%', fontWeight: 500, color: 'var(--text-main)', fontSize: '13px' }}>{label}</Checkbox>
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    </SectionCard>

                    <Form.Item noStyle shouldUpdate>
                      {() => {
                        const vals = form.getFieldsValue();
                        const activeCount = productAttributesConfig.filter(([name]) => vals[name]).length;
                        
                        return (
                          <div style={{ marginTop: 12, padding: 16, background: 'var(--gray-50)', borderRadius: 8, border: '1px dashed var(--border-color)' }}>
                            <div style={{
                              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                              letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 8,
                            }}>
                              Active Product Attributes Summary
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {productAttributesConfig.map(([name, label, , color]) => 
                                vals[name] ? <Tag key={`tab-sum-${name}`} color={color} style={{ margin: 0 }}>{label}</Tag> : null
                              )}
                              {activeCount === 0 && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>No attributes active.</span>}
                            </div>
                          </div>
                        );
                      }}
                    </Form.Item>
                  </Form>
                </div>
              )
            }
          ]} />
          </div>
      ) : (
        /* DIRECTORY VIEW */
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--bg-layout)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)' }}>Search By</span>
              <Select value={productSearchBy} onChange={val => setProductSearchBy(val)} style={{ width: 140 }}>
                <Option value="Product Name">Product Name</Option>
                <Option value="Code">Code</Option>
              </Select>
              <Input
                prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
                placeholder="Search..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                allowClear
                style={{ width: 200 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Show</span>
              <Select value={productPageSize} onChange={val => setProductPageSize(val)} style={{ width: 75 }}>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-xs)',
            overflow: 'hidden'
          }}>
            <Table
              columns={productColumns}
              dataSource={filteredProducts}
              rowKey="code"
              size="middle"
              onRow={record => ({
                style: { cursor: 'pointer' },
                onDoubleClick: () => {
                  setEditingRecord(record);
                  form.setFieldsValue({
                    name: record.name,
                    code: record.code,
                    group: record.group,
                    rate: record.rate,
                    status: record.status,
                    baseUnit: 'Primary',
                    category: 'Primary',
                    productType: 'Primary'
                  });
                  setProductMode('form');
                  setActiveProductTab('basic');
                }
              })}
              pagination={{
                current: productCurrentPage,
                pageSize: productPageSize,
                total: filteredProducts.length,
                onChange: (page, size) => {
                  setProductCurrentPage(page);
                  if (size !== productPageSize) setProductPageSize(size);
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
    );
  }

  /* ── INVOICES (Sales & Purchase) ── */
  if (href?.includes('Invoice') || href?.includes('SalesOrder') || href?.includes('PurchaseOrder')) {
    const isSales = href?.includes('Sales');
    const [rows, setRows] = useState([{ id: 1, product: '', qty: 1, rate: 0, disc: 0 }]);
    const subtotal = rows.reduce((s, r) => s + Number(r.qty || 0) * Number(r.rate || 0) * (1 - Number(r.disc || 0) / 100), 0);
    const vat = subtotal * 0.13;

    const cols = [
      { headerName: '#', width: 56, valueGetter: p => p.node.rowIndex + 1 },
      { headerName: 'Product / Account *', field: 'product', flex: 2, editable: true,
        cellEditor: 'agSelectCellEditor', cellEditorParams: { values: productList.map(p => p.name) } },
      { headerName: 'Qty', field: 'qty', width: 80, editable: true, type: 'numericColumn', cellClass: 'font-mono' },
      { headerName: 'Rate', field: 'rate', width: 110, editable: true, type: 'numericColumn', cellClass: 'font-mono' },
      { headerName: 'Disc %', field: 'disc', width: 80, editable: true, type: 'numericColumn', cellClass: 'font-mono' },
      { headerName: 'Amount', width: 120, type: 'numericColumn', cellClass: 'font-mono',
        valueGetter: p => (Number(p.data.qty || 0) * Number(p.data.rate || 0) * (1 - Number(p.data.disc || 0) / 100)).toFixed(2) },
    ];

    const onCellValueChanged = e => {
      if (e.colDef.field === 'product') {
        const item = productList.find(p => p.name === e.data.product);
        if (item) { e.data.rate = item.rate; e.api.refreshCells({ rowNodes: [e.node], force: true }); }
      }
    };

    return (
      <div style={{ padding: 24 }}>
        <Form layout="vertical" onFinish={() => notify(`${tab.text} posted successfully!`)}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
                  {tab.text}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  {isSales ? 'Sales' : 'Purchase'} → Invoice Entry
                </div>
              </div>
              <Tag color="blue" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                Double-Entry Journal
              </Tag>
            </div>

            {/* Fields */}
            <div style={{ padding: '20px 20px 0' }}>
              <div className="erp-invoice-header">
                <Form.Item label="Fiscal Year">
                  <Select defaultValue="2081/2082"><Option value="2081/2082">2081/2082</Option></Select>
                </Form.Item>
                <Form.Item label="Voucher Number">
                  <Input disabled defaultValue="INV-2081-0492" className="font-mono" />
                </Form.Item>
                <Form.Item label="Party Reference">
                  <Input placeholder="e.g. REF-23A" className="font-mono" />
                </Form.Item>
                <Form.Item label="Date">
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="font-mono" />
                </Form.Item>
                <Form.Item label={isSales ? 'Customer Account *' : 'Supplier Account *'} name="party" rules={[{ required: true }]}>
                  <Select placeholder="Choose Account">
                    {ledgerAccounts.map(l => <Option key={l.name} value={l.name}>{l.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Currency">
                  <Select defaultValue="NPR"><Option value="NPR">NPR (Rs.)</Option><Option value="USD">USD ($)</Option></Select>
                </Form.Item>
              </div>

              {/* Balance indicator */}
              <div className="erp-balance-checker">
                <span><CheckCircleOutlined style={{ marginRight: 6 }} />Double-Entry ledger verified. Trial allocation balanced.</span>
                <span className="font-mono" style={{ color: 'var(--success)', fontSize: 11 }}>Balanced ✓</span>
              </div>

              {/* Line items grid */}
              <div style={{ margin: '16px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Line Items</div>
                <Button size="small" type="primary" icon={<PlusOutlined />}
                  onClick={() => setRows(r => [...r, { id: Date.now(), product: '', qty: 1, rate: 0, disc: 0 }])}>
                  Add Row
                </Button>
              </div>
              <div className={darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
                style={{ height: 200, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                <AgGridReact columnDefs={cols} rowData={rows} rowHeight={34} headerHeight={36}
                  defaultColDef={{ resizable: true }} singleClickEdit stopEditingWhenCellsLoseFocus
                  onCellValueChanged={onCellValueChanged} />
              </div>
            </div>

            {/* Totals */}
            <div style={{ padding: '0 20px 4px' }}>
              <div className="erp-invoice-totals">
                <Form.Item label="Narration">
                  <TextArea rows={3} placeholder="Write voucher narration..." />
                </Form.Item>
                <div style={{ minWidth: 240 }}>
                  <div className="erp-calc-row"><span>Sub Total:</span><span className="font-mono">Rs. {subtotal.toFixed(2)}</span></div>
                  <div className="erp-calc-row"><span>Discount:</span><span className="font-mono">Rs. 0.00</span></div>
                  <div className="erp-calc-row"><span>VAT (13%):</span><span className="font-mono">Rs. {vat.toFixed(2)}</span></div>
                  <div className="erp-grand-total"><span>Grand Total:</span><span>Rs. {(subtotal + vat).toFixed(2)}</span></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="erp-form-footer">
              <Button icon={<PrinterOutlined />}>Print</Button>
              <Button icon={<ReloadOutlined />}>Revert</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save & Post</Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  /* ── RECEIPT / PAYMENT / JOURNAL / CONTRA ── */
  if (['/Account/Transaction/Receipt', '/Account/Transaction/Payment',
       '/Account/Transaction/Journal', '/Account/Transaction/Contra'].includes(href)) {
    const isReceipt = href.includes('Receipt');
    const [rcptRows, setRcptRows] = useState([
      { id: 1, ledger: 'Himalayan Traders Pvt. Ltd.', type: isReceipt ? 'Cr' : 'Dr', amount: 45000, narration: '' },
      { id: 2, ledger: 'Nabil Bank A/C', type: isReceipt ? 'Dr' : 'Cr', amount: 45000, narration: '' },
    ]);

    const totalDr = rcptRows.filter(r => r.type === 'Dr').reduce((s, r) => s + Number(r.amount || 0), 0);
    const totalCr = rcptRows.filter(r => r.type === 'Cr').reduce((s, r) => s + Number(r.amount || 0), 0);
    const balanced = totalDr === totalCr && totalDr > 0;

    const cols = [
      { headerName: '#', width: 56, valueGetter: p => p.node.rowIndex + 1 },
      { headerName: 'Ledger Account *', field: 'ledger', flex: 2, editable: true,
        cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ledgerAccounts.map(l => l.name) } },
      { headerName: 'Type', field: 'type', width: 110, editable: true,
        cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['Dr', 'Cr'] },
        cellRenderer: p => (
          <span style={{ fontWeight: 700, color: p.value === 'Dr' ? 'var(--accent-blue)' : '#0f9d58' }}>
            {p.value === 'Dr' ? '↑ Debit (Dr)' : '↓ Credit (Cr)'}
          </span>
        ) },
      { headerName: 'Amount (Rs) *', field: 'amount', width: 150, editable: true, type: 'numericColumn', cellClass: 'font-mono' },
      { headerName: 'Description', field: 'narration', flex: 1, editable: true },
    ];

    const getRowClass = p => p.data.type === 'Dr' ? 'ledger-debit' : 'ledger-credit';

    const handleSave = () => {
      if (!balanced) {
        notifyErr('Unbalanced entry! Debits must equal Credits.');
        return;
      }
      notify(`${tab.text} voucher posted!`);
    };

    return (
      <div style={{ padding: 24 }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{tab.text}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                Double-Entry Voucher
              </div>
            </div>
            <Tag color={balanced ? 'green' : 'red'} style={{ fontWeight: 600 }}>
              {balanced ? '✓ Balanced Entry' : '⚠ Unbalanced'}
            </Tag>
          </div>

          <div style={{ padding: '20px 20px 0' }}>
            <div className="erp-invoice-header" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <Form.Item label="Voucher Type"><Input disabled defaultValue={tab.text} /></Form.Item>
              <Form.Item label="Journal Number"><Input disabled defaultValue="VCHR-2081-99" className="font-mono" /></Form.Item>
              <Form.Item label="Entry Date">
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="font-mono" />
              </Form.Item>
            </div>

            <div className={`erp-balance-checker ${!balanced ? 'unbalanced' : ''}`}>
              {balanced ? (
                <span><CheckCircleOutlined style={{ marginRight: 6 }} />Double-entry verified. Debits match Credits.</span>
              ) : (
                <span><WarningOutlined style={{ marginRight: 6 }} />
                  Unbalanced! Difference: Rs. {Math.abs(totalDr - totalCr).toLocaleString()}
                </span>
              )}
              <span className="font-mono" style={{ fontSize: 11 }}>
                Dr: {totalDr.toLocaleString()} | Cr: {totalCr.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 8px' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Journal Lines</div>
              <Button size="small" type="primary" icon={<PlusOutlined />}
                onClick={() => setRcptRows(r => [...r, { id: Date.now(), ledger: '', type: 'Dr', amount: 0, narration: '' }])}>
                Add Row
              </Button>
            </div>

            <div className={darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
              style={{ height: 230, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              <AgGridReact columnDefs={cols} rowData={rcptRows} rowHeight={36} headerHeight={36}
                defaultColDef={{ resizable: true }} singleClickEdit stopEditingWhenCellsLoseFocus
                getRowClass={getRowClass} onCellValueChanged={() => setRcptRows([...rcptRows])} />
            </div>

            <div style={{ display: 'flex', gap: 24, marginBottom: 4 }}>
              <Form.Item label="Narration" style={{ flex: 1 }}>
                <TextArea rows={2} placeholder="Explain purpose of this voucher..." />
              </Form.Item>
              <div style={{ minWidth: 200, textAlign: 'right' }}>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 4 }}>Total Allocation</div>
                <div className="erp-grand-total">Rs. {totalDr.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="erp-form-footer">
            <Button icon={<PrinterOutlined />}>Print</Button>
            <Button icon={<ReloadOutlined />}>Reset</Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>Post Voucher</Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── VOUCHER MODE MASTER ── */
  if (href === '/Account/Creation/VoucherMode') {
    const SectionCard = ({ icon, title, children }) => (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px',
        padding: '20px', marginBottom: '20px', boxShadow: '0 4px 12px var(--shadow-color, rgba(0,0,0,0.02))'
      }}>
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--border-color)' }}>
            <div style={{
              background: 'var(--primary, var(--accent-blue))', color: '#ffffff', padding: '3px 8px', borderRadius: '4px',
              display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              {icon} {title}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</div>
      </div>
    );

    const outerStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...(vModeFullscreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        background: 'var(--bg-layout)',
      } : {})
    };

    return (
      <div style={outerStyle}>
        {/* ── PAGE HEADER ── */}
        <div className="erp-page-header" style={{ flexShrink: 0, alignItems: 'center', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {editingVModeRecord && vModeMode === 'form' && (
              <Tooltip title="Back to Directory">
                <Button size="small" icon={<ArrowLeftOutlined />}
                  onClick={() => { setVModeMode('directory'); setEditingVModeRecord(null); form.resetFields(); }}
                />
              </Tooltip>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="erp-page-title" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 0 }}>
                Voucher Mode Config
                {editingVModeRecord && (
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                    background: '#e8f0fe', color: 'var(--accent-blue)', border: '1px solid #c5d9fb',
                    display: 'inline-block', transform: 'translateY(-2px)'
                  }}>EDITING: {editingVModeRecord.name}</span>
                )}
              </div>
              <div style={{ width: 1, height: 16, background: 'var(--border-color)' }}></div>
              <div className="erp-page-breadcrumb" style={{ paddingBottom: 0, marginTop: 2 }}>
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Accounting</span>
                <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setVModeMode('form')}>Voucher Mode</span>
                <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setVModeMode('form')}>
                  {{
                    basic: 'Basic Info',
                    printing: 'Printing Setup',
                    date: 'Date Setup',
                    additional: 'Additional Details',
                    product: 'Product Setup',
                    others: 'Others Detail Setup',
                    productUdf: 'Product UDF',
                    voucherUdf: 'Voucher UDF',
                    additionalCharge: 'Additional Charge',
                    ledgerAllocation: 'Ledger Allocation',
                    rewardPoint: 'Reward Point'
                  }[vModeActiveTab] || 'Basic Info'}
                </span>
                {vModeMode === 'directory' && (
                  <>
                    <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {vModeMode === 'form' && (
              <div style={{ display: 'flex', gap: 8, marginRight: 8, alignItems: 'center' }}>
                <Button size="small" icon={<ReloadOutlined />} onClick={() => {
                  form.resetFields();
                  setEditingVModeRecord(null);
                }} style={{ borderRadius: 4, fontWeight: 500 }}>Reset</Button>
                <Button size="small" type="primary" onClick={() => {
                  form.validateFields()
                    .then(() => {
                      notify(editingVModeRecord ? `Voucher Mode "${editingVModeRecord.name}" updated successfully!` : 'New Voucher Mode created successfully!');
                      if (!editingVModeRecord) {
                        form.resetFields();
                      }
                    })
                    .catch(() => notifyErr('Please fill all required fields'));
                }} icon={<SaveOutlined />} style={{ background: 'var(--primary)', borderColor: 'var(--primary)', borderRadius: 4, fontWeight: 500 }}>
                  {editingVModeRecord ? 'Update' : 'Save'}
                </Button>
                <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />
              </div>
            )}



            <Button
              size="small"
              type="default"
              icon={vModeMode === 'directory' ? <ArrowLeftOutlined /> : <span style={{ fontSize: 14 }}>📋</span>}
              onClick={() => {
                setVModeMode(vModeMode === 'directory' ? 'form' : 'directory');
              }}
              style={{ borderRadius: 4, borderColor: 'var(--border-color)', color: 'var(--text-main)', fontWeight: 500 }}
            >
              {vModeMode === 'directory' ? 'Back to Form' : 'Directory'}
            </Button>

            <div style={{ width: 1, height: 16, background: 'var(--border-color)', margin: '0 4px' }} />

            <Tooltip title={vModeFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}>
              <Button
                size="small"
                type="text"
                icon={vModeFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={() => setVModeFullscreen(!vModeFullscreen)}
                style={{ color: 'var(--text-muted)' }}
              />
            </Tooltip>
          </div>
        </div>

        {vModeMode === 'form' ? (
          /* FORM VIEW */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            <CustomTabs activeKey={vModeActiveTab} onChange={setVModeActiveTab} items={[
              {
                key: 'basic', label: 'Basic Info', icon: <BankOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Basic Voucher Identification">
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', gap: 12 }}>
                          <Form.Item label="Voucher Name *" name="name" rules={[{ required: true }]}><Input placeholder="e.g. Sales Invoice (VAT)" /></Form.Item>
                          <Form.Item label="Voucher Type *" name="type" rules={[{ required: true }]}>
                            <Select defaultValue="Sales">
                              <Option value="Sales">Sales</Option>
                              <Option value="Purchase">Purchase</Option>
                              <Option value="Receipt">Receipt</Option>
                              <Option value="Payment">Payment</Option>
                              <Option value="Journal">Journal</Option>
                              <Option value="Contra">Contra</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Abbreviation *" name="abbr" rules={[{ required: true }]}><Input placeholder="e.g. SI" /></Form.Item>
                          <Form.Item label="Numbering Method *" name="numbering" rules={[{ required: true }]}>
                            <Select defaultValue="Auto">
                              <Option value="Auto">Auto</Option>
                              <Option value="Manual">Manual</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="S.No.*" name="sno" rules={[{ required: true }]}><Input defaultValue="0" /></Form.Item>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 140px 140px 2fr 1.5fr', gap: 12, marginTop: 8 }}>
                          <Form.Item label="Start Number *" name="startNo" rules={[{ required: true }]}><Input defaultValue="1" /></Form.Item>
                          <Form.Item label="Numerical Part Width" name="width"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="No of decimal places" name="decimals"><Input defaultValue="2" /></Form.Item>
                          <Form.Item label="Default Ledger" name="defaultLedger">
                            <Select placeholder="** Select Default Ledger **">
                              {ledgerAccounts.map(l => <Option key={l.name} value={l.name}>{l.name}</Option>)}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Default Salesman" name="defaultSalesman">
                            <Select placeholder="Select Default Salesman" allowClear />
                          </Form.Item>
                        </div>
                      </SectionCard>

                      <SectionCard title="Voucher Parameters & Controls">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                          {[
                            ['allowDuplicate', 'Allow Duplicate Voucher No.'],
                            ['prefillZero', 'Prefill Zero'],
                            ['useRefNo', 'Use Ref. No.'],
                            ['allowMultipleCurrency', 'Allow Multiple Currency'],
                            ['activePaymentUnder', 'Active Payment Under'],
                            ['activeReceivedNo', 'Active Received No.'],
                            ['activeReceivedNo2', 'Active Received No. (Aux)'],
                            ['isMandatoryRefNo', 'Is Mandatory Ref. No.'],
                            ['useCommonNarration', 'Use Common Narration'],
                            ['narrationForEachEntry', 'Narration for Each Entry'],
                            ['showDocumentDetails', 'Show Document Details'],
                            ['isAbbInvoice', 'Is Abb. Invoice'],
                            ['activeSalesman', 'Active Salesman'],
                            ['useCostcenter', 'Use Costcenter'],
                            ['usePartyCostcenter', 'Use Party Costcenter'],
                            ['useSubLedger', 'Use Sub Ledger'],
                            ['autoCreateParty', 'Auto Create Party'],
                            ['showPendingVoucher', 'Show Pending Voucher'],
                            ['defaultRefVoucher', 'Default Ref. Voucher'],
                            ['autoPost', 'Auto Post'],
                            ['allowCashPurchaseSale', 'Allow Cash Purchase/Sale'],
                            ['activeBillingShippingAddress', 'Active Billing/Shipping Address'],
                            ['activeInterBranch', 'Active Inter Branch'],
                            ['requiredPostRemarks', 'Required Post Remarks'],
                            ['activeMultipleBatch', 'Active Multiple Batch'],
                            ['isActive', 'Is Active'],
                            ['activeProject', 'Active Project'],
                            ['activeTwoFactor', 'Active Two Factor'],
                            ['allowNegativeEntry', 'Allow Negative Entry'],
                            ['enableAuthorized', 'Enable Authorized'],
                            ['allowDuplicateLedgerAllocation', 'Allow Duplicate Ledger Allocation'],
                            ['effectAccount', 'Effect Account'],
                            ['effectInventory', 'Effect Inventory']
                          ].map(([fieldName, label]) => (
                            <Form.Item key={fieldName} label={label} name={fieldName} valuePropName="checked" style={{ marginBottom: 4 }}>
                              <Checkbox style={{ fontWeight: 500 }}>Yes, Enable</Checkbox>
                            </Form.Item>
                          ))}
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'printing', label: 'Printing Setup', icon: <PrinterOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Invoice Printing Preferences">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                          <Form.Item label="Print After Saving" name="printAfterSave" valuePropName="checked">
                            <Checkbox>Yes, Print automatically</Checkbox>
                          </Form.Item>
                          <Form.Item label="Print After Modify" name="printAfterModify" valuePropName="checked">
                            <Checkbox>Yes, Print after edits</Checkbox>
                          </Form.Item>
                          <Form.Item label="Auto Print on Default Printer" name="autoPrintDefault" valuePropName="checked">
                            <Checkbox>Directly send to default printer</Checkbox>
                          </Form.Item>
                          <Form.Item label="Show Print Preview" name="showPreview" valuePropName="checked">
                            <Checkbox>Yes, Show layout popup</Checkbox>
                          </Form.Item>
                          <Form.Item label="No. of Copies" name="noOfCopies"><Input defaultValue="1" /></Form.Item>
                          <Form.Item label="No. of Reports" name="noOfReports"><Input defaultValue="1" /></Form.Item>
                          <Form.Item label="Print Preview As" name="previewAs">
                            <Select defaultValue="Modal Dialog">
                              <Option value="Modal Dialog">Modal Dialog</Option>
                              <Option value="New Tab">New Tab</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'date', label: 'Date Setup', icon: <PlusOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Voucher Date Configurations">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                          <Form.Item label="Voucher Date Label" name="dateLabel"><Input defaultValue="Date" /></Form.Item>
                          <Form.Item label="Voucher Date As" name="dateAs">
                            <Select defaultValue="Current Date">
                              <Option value="Current Date">Current Date</Option>
                              <Option value="Custom Date">Custom Date</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Date Style" name="dateStyle">
                            <Select defaultValue="B.S.">
                              <Option value="B.S.">B.S. (Bikram Sambat)</Option>
                              <Option value="A.D.">A.D. (Anno Domini)</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Date Format" name="dateFormat">
                            <Select defaultValue="YYYY-MM-DD">
                              <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                              <Option value="DD-MM-YYYY">DD-MM-YYYY</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Entry Date Label" name="entryDateLabel"><Input defaultValue="Entry Date" /></Form.Item>
                          <Form.Item label="Use Entry Date for Voucher" name="useEntryDate" valuePropName="checked">
                            <Checkbox>Yes, enforce entry date</Checkbox>
                          </Form.Item>
                          <Form.Item label="Show Time" name="showTime" valuePropName="checked">
                            <Checkbox>Display stamp time</Checkbox>
                          </Form.Item>
                          <Form.Item label="Show warning for back Date Entry" name="warningBackDate" valuePropName="checked">
                            <Checkbox>Warn on past dates</Checkbox>
                          </Form.Item>
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'additional', label: 'Additional Details', icon: <SettingOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Branch & Cost Specifications">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                          <Form.Item label="Branch" name="branch"><Select placeholder="Select Branch" /></Form.Item>
                          <Form.Item label="Active Party Details" name="activePartyDetails" valuePropName="checked"><Checkbox>Yes</Checkbox></Form.Item>
                          <Form.Item label="Can Edit Party Details" name="canEditParty" valuePropName="checked"><Checkbox>Yes</Checkbox></Form.Item>
                          <Form.Item label="Active Additional Cost" name="activeAddCost" valuePropName="checked"><Checkbox>Yes</Checkbox></Form.Item>
                          <Form.Item label="Active Additional Cost On Basis" name="addCostBasis" valuePropName="checked"><Checkbox>Yes</Checkbox></Form.Item>
                          <Form.Item label="Additional Cost As" name="addCostAs">
                            <Select defaultValue="Ref. Voucher"><Option value="Ref. Voucher">Ref. Voucher</Option></Select>
                          </Form.Item>
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'product', label: 'Product Setup', icon: <DatabaseOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Product Options & Rates">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                          {[
                            ['allowDiscount', 'Allow Discount'],
                            ['allowScheme', 'Allow Scheme'],
                            ['allowFreeQty', 'Allow Free Qty'],
                            ['showRate', 'Show Rate'],
                            ['showAmount', 'Show Amount'],
                            ['canEditableAmount', 'Can Editable Amount'],
                            ['allowZeroRate', 'Allow Zero Rate'],
                            ['allowZeroAmount', 'Allow Zero Amount'],
                            ['showAlternateUnit', 'Show Alternate Unit'],
                            ['useMfgDate', 'Use MFG Date'],
                            ['useExpDate', 'Use EXP Date'],
                            ['showProductWiseDescription', 'Show Product Wise Description'],
                            ['showProductWiseExcise', 'Show Product Wise Excise Duty'],
                            ['showProductWiseVat', 'Show Product Wise Vat'],
                            ['showProductRateDetails', 'Show Product Rate Details'],
                            ['showProductQtyPoint', 'Show Product Quantity Point'],
                            ['activeAlternateUnitColumn', 'Active Alternate Unit Column'],
                            ['showMrp', 'Show MRP'],
                            ['showPurchaseSalesRate', 'Show Purchase/Sales Rate'],
                            ['activeLandedCost', 'Active Landed Cost'],
                            ['activeTsc', 'Active T.S.C.'],
                            ['showTransactionHistory', 'Show Transaction History'],
                            ['allowDuplicateProduct', 'Allow Duplicate Product'],
                            ['showBalanceProductOnly', 'Show Balance Product Only'],
                            ['activeCc', 'Active C.C.'],
                            ['activeRack', 'Active Rack'],
                            ['activeSerialNo', 'Active Serial No.'],
                            ['imageAttachment', 'Image Attachment']
                          ].map(([field, label]) => (
                            <Form.Item key={field} label={label} name={field} valuePropName="checked" style={{ marginBottom: 4 }}>
                              <Checkbox>Enable</Checkbox>
                            </Form.Item>
                          ))}
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'others', label: 'Others Detail Setup', icon: <SettingOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Additional Register & Validation Parameters">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                          {[
                            ['showVatRegister', 'Show Dialouge for showing in vat Register'],
                            ['noEffectVatRegister', 'Not Effect In Vat Register'],
                            ['showBatchClosingOutward', 'Show Batch Wise Closing List for Outward'],
                            ['activeMessageAlert', 'Active Confirmation Message Alert'],
                            ['activeBarcode', 'Active BarCode'],
                            ['activeSummaryEntry', 'Active Summary Entry'],
                            ['activeTender', 'Active Tender'],
                            ['mandatoryCreditDays', 'Mandatory Credit Days'],
                            ['activeProfitCenter1', 'Active Profit Center 1'],
                            ['activeProfitCenter2', 'Active Profit Center 2'],
                            ['activeProfitCenter3', 'Active Profit Center 3'],
                            ['activeProfitCenter4', 'Active Profit Center 4'],
                            ['activeProfitCenter5', 'Active Profit Center 5'],
                            ['showPartyLedgerCash', 'Show Party Ledger On Cash']
                          ].map(([field, label]) => (
                            <Form.Item key={field} label={label} name={field} valuePropName="checked" style={{ marginBottom: 4 }}>
                              <Checkbox>Enable</Checkbox>
                            </Form.Item>
                          ))}
                          
                          <Form.Item label="Default Party Ledger" name="defaultPartyLedger">
                            <Select placeholder="** Select Default Ledger **" allowClear>
                              {ledgerAccounts.map(l => <Option key={l.name} value={l.name}>{l.name}</Option>)}
                            </Select>
                          </Form.Item>
                          
                          <Form.Item label="Default Tran Ledger" name="defaultTranLedger">
                            <Select placeholder="** Select Default Ledger **" allowClear>
                              {ledgerAccounts.map(l => <Option key={l.name} value={l.name}>{l.name}</Option>)}
                            </Select>
                          </Form.Item>

                          <Form.Item label="Voucher Relation" name="voucherRelation">
                            <Select defaultValue="Optional">
                              <Option value="Optional">Optional</Option>
                              <Option value="Mandatory">Mandatory</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item label="Max Credit Days" name="maxCreditDays"><Input defaultValue="0" /></Form.Item>
                          <Form.Item label="Series" name="series"><Input /></Form.Item>
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              },
              {
                key: 'productUdf', label: 'Product UDF', icon: <TagsOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <ProductUdfGrid />
                  </div>
                )
              },
              {
                key: 'voucherUdf', label: 'Voucher UDF', icon: <TagsOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <VoucherUdfGrid />
                  </div>
                )
              },
              {
                key: 'additionalCharge', label: 'Additional Charge', icon: <DollarOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <AdditionalChargeGrid />
                  </div>
                )
              },
              {
                key: 'ledgerAllocation', label: 'Ledger Allocation', icon: <TeamOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <LedgerAllocationGrid />
                  </div>
                )
              },
              {
                key: 'rewardPoint', label: 'Reward Point', icon: <TagsOutlined />,
                children: (
                  <div style={{ padding: '16px 0' }}>
                    <Form form={form} layout="vertical" className="compact-form">
                      <SectionCard title="Point Setup">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <Form.Item name="activateRewardProgram" valuePropName="checked" style={{ margin: 0 }}>
                              <Checkbox style={{ color: 'var(--text-main)', fontSize: '13px' }}>Activate Reward Program</Checkbox>
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Amount to points(reward)*:
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Form.Item name="amtToPointsAmt" style={{ margin: 0 }}>
                                <Input style={{ width: '100px' }} defaultValue="0" />
                              </Form.Item>
                              <Form.Item name="amtToPointsVal" style={{ margin: 0 }}>
                                <Input style={{ width: '100px' }} defaultValue="1" disabled />
                              </Form.Item>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                For every Rs customer will receive '1' point(s)
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Minimum invoice value for generating points*:
                            </span>
                            <Form.Item name="minInvoiceValPoints" style={{ margin: 0 }}>
                              <Input style={{ width: '300px' }} defaultValue="0" />
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Maximum points which can be generated per invoice :
                            </span>
                            <Form.Item name="maxPointsPerInvoice" style={{ margin: 0 }}>
                              <Input style={{ width: '300px' }} defaultValue="0" />
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <Form.Item name="roundOffPoints" valuePropName="checked" style={{ margin: 0 }}>
                              <Checkbox style={{ color: 'var(--text-main)', fontSize: '13px' }}>Round off points per invoice</Checkbox>
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Expire points after
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Form.Item name="expirePointsAfterDays" style={{ margin: 0 }}>
                                <Input style={{ width: '300px' }} defaultValue="0" />
                              </Form.Item>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>day(s)</span>
                            </div>
                          </div>
                        </div>
                      </SectionCard>

                      <SectionCard title="Redeem Setup" style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Point redeem value*:
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Form.Item name="pointRedeemValue" style={{ margin: 0 }}>
                                <Input style={{ width: '300px' }} defaultValue="0" />
                              </Form.Item>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                For Every 1 point(s) customer can avail Rs.
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Maximum points which can be redeem in invoice*:
                            </span>
                            <Form.Item name="maxRedeemPointsInvoice" style={{ margin: 0 }}>
                              <Input style={{ width: '300px' }} defaultValue="0" />
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Minimum points to be redeemed in invoice*:
                            </span>
                            <Form.Item name="minRedeemPointsInvoice" style={{ margin: 0 }}>
                              <Input style={{ width: '300px' }} defaultValue="0" />
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                            <span style={{ width: '320px', flexShrink: 0, color: 'var(--text-main)', fontSize: '13px' }}>
                              Minimum points balance to be maintained
                            </span>
                            <Form.Item name="minPointsBalanceMaintain" style={{ margin: 0 }}>
                              <Input style={{ width: '300px' }} defaultValue="0" />
                            </Form.Item>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                            <span style={{ color: 'var(--text-main)', fontSize: '13px' }}>
                              Loyalty Expenses A/C
                            </span>
                            <Form.Item name="loyaltyExpensesAc" style={{ margin: 0 }}>
                              <Select placeholder="** Select Loyalty Ledger **" style={{ width: '100%' }}>
                                {ledgerAccounts.map(l => <Option key={l.name} value={l.name}>{l.name}</Option>)}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>
                      </SectionCard>
                    </Form>
                  </div>
                )
              }
            ]} />
          </div>
        ) : (
          /* DIRECTORY VIEW */
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--bg-layout)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '12px 20px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-main)' }}>Search By</span>
                <Select value={vModeSearchBy} onChange={val => setVModeSearchBy(val)} style={{ width: 140 }}>
                  <Option value="Voucher Name">Voucher Name</Option>
                  <Option value="Abbreviation">Abbreviation</Option>
                </Select>
                <Input
                  prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
                  placeholder="Search..."
                  value={vModeSearch}
                  onChange={e => setVModeSearch(e.target.value)}
                  allowClear
                  style={{ width: 200 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Show</span>
                <Select value={vModePageSize} onChange={val => setVModePageSize(val)} style={{ width: 75 }}>
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Select>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              <Table
                columns={vModeColumns}
                dataSource={filteredVModes}
                rowKey="id"
                size="middle"
                onRow={record => ({
                  style: { cursor: 'pointer' },
                  onDoubleClick: () => {
                    setEditingVModeRecord(record);
                    form.setFieldsValue({
                      name: record.name,
                      type: record.type,
                      abbr: record.abbr,
                      numbering: record.numbering,
                      sno: record.sno,
                      status: record.status,
                      startNo: 1,
                      width: 0,
                      decimals: 2
                    });
                    setVModeMode('form');
                    setVModeActiveTab('basic');
                  }
                })}
                pagination={{
                  current: vModeCurrentPage,
                  pageSize: vModePageSize,
                  total: filteredVModes.length,
                  onChange: (page, size) => {
                    setVModeCurrentPage(page);
                    if (size !== vModePageSize) setVModePageSize(size);
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
    );
  }


  /* ── SIMPLE FORMS ── */
  const simpleConfigs = {
    '/Account/Creation/SalesMan':        { title: 'Salesman Master',         fields: [['Name *','name',true],['Phone','phone'],['Email','email'],['Commission Rate %','commission']] },
    '/Account/Creation/AreaMaster':      { title: 'Area Master',             fields: [['Area Name *','name',true],['Description','desc']] },
    '/Account/Creation/Currency':        { title: 'Currency Profiles',       fields: [['Currency Name *','name',true],['Symbol','symbol'],['Exchange Rate to NPR','rate']] },
    '/Account/Creation/NarrationMaster': { title: 'Narration Templates',     fields: [['Narration Template *','narration',true]] },
    '/Setup/Creation/CompanyDetail':     { title: 'Company Profile',         fields: [['Company Name *','name',true],['PAN/VAT *','panVat',true],['Phone','phone'],['Email','email'],['Website','website']] },
    '/Support/Creation/CreateTicket':    { title: 'Support Ticket',          fields: [['Subject *','subject',true],['Description *','desc',true]] },
  };

  const cfg = simpleConfigs[href];
  if (cfg) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ maxWidth: 600 }}>
          <FormCard title={cfg.title}
            footer={
              <>
                <Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>Reset</Button>
                <Button type="primary" htmlType="submit" form="simpleForm" icon={<SaveOutlined />}>Save Record</Button>
              </>
            }
          >
            <Form id="simpleForm" form={form} layout="vertical"
              onFinish={() => notify(`${cfg.title} saved!`)}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {cfg.fields.map(([label, name, req]) => (
                <Form.Item
                  key={name}
                  label={label}
                  name={name}
                  rules={req ? [{ required: true, message: 'Required' }] : []}
                  style={label.toLowerCase().includes('desc') || label.toLowerCase().includes('narration') ? { gridColumn: '1/-1' } : {}}
                >
                  {label.toLowerCase().includes('desc') || label.toLowerCase().includes('narration')
                    ? <TextArea rows={3} />
                    : <Input />}
                </Form.Item>
              ))}
            </Form>
          </FormCard>
        </div>
      </div>
    );
  }

  /* ── FALLBACK ── */
  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <FormCard title={tab.text}
        footer={
          <>
            <Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" htmlType="submit" form="fallbackForm" icon={<SaveOutlined />}>Save</Button>
          </>
        }
      >
        <Form id="fallbackForm" form={form} layout="vertical" onFinish={() => notify(`${tab.text} saved!`)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <Form.Item label="Code"><Input disabled placeholder="Auto-generated" className="font-mono" /></Form.Item>
          <Form.Item label="Name *" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Description" name="desc" style={{ gridColumn: '1/-1' }}><TextArea rows={3} /></Form.Item>
          <Form.Item label="Status" name="status">
            <Select defaultValue="Active"><Option value="Active">Active</Option><Option value="Inactive">Inactive</Option></Select>
          </Form.Item>
        </Form>
      </FormCard>
    </div>
  );
}
