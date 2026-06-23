import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Form, Input, Select, Button, DatePicker, Checkbox, 
  Popover, Modal, Row, Col, Divider, Tooltip, Table, Space
} from 'antd';
import {
  SearchOutlined, SaveOutlined, PlusOutlined, DeleteOutlined,
  FullscreenOutlined, FullscreenExitOutlined, FileTextOutlined, ReloadOutlined,
  EditOutlined, ArrowLeftOutlined
} from '@ant-design/icons';

const { Option } = Select;

const PARTIES = [
  { code: '10684', name: '12 May to 15 July-Q2 Offer', balance: 0, pan: '', group: 'DAHUA OFFER FOLDER' },
  { code: '10685', name: '15 Feb to 15 March- (Buy 10/1 Free)', balance: 0, pan: '', group: 'DAHUA OFFER FOLDER' },
  { code: '10686', name: '15 June to 15 July-WIFI CAMERA OFFER', balance: 0, pan: '', group: 'DAHUA OFFER FOLDER' },
  { code: '11288', name: '(Nov 5 to Jan 15) DAHUA Q4-2024', balance: 0, pan: '', group: 'DAHUA RECEIVABLE FOLDER' },
  { code: '10687', name: '20 Feb to 20 April 2025 Monitor Offer', balance: 0, pan: '', group: 'DAHUA RECEIVABLE FOLDER' },
];

const PRODUCTS = [
  { code: 'P001', name: 'DAHUA 2MP CAMERA', group: 'CAMERA', stock: 45, unit: 'Pcs', rate: 2500 },
  { code: 'P002', name: 'DAHUA 4MP CAMERA', group: 'CAMERA', stock: 12, unit: 'Pcs', rate: 4200 },
  { code: 'P003', name: 'DAHUA XVR 4 CHANNEL', group: 'DVR/XVR', stock: 8, unit: 'Pcs', rate: 6500 },
  { code: 'P004', name: 'CAT6 CABLE BOX (305M)', group: 'ACCESSORIES', stock: 15, unit: 'Roll', rate: 9500 },
  { code: 'P005', name: '12V 2A POWER ADAPTER', group: 'ACCESSORIES', stock: 120, unit: 'Pcs', rate: 350 },
];

const ProductSearchSelector = ({ value, onSelectProduct, rowIdx }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  
  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (prod) => {
    onSelectProduct(rowIdx, prod);
    setOpen(false);
  };

  const popContent = (
    <div style={{ width: 450, padding: 8 }}>
      <Input
        placeholder="Search product by name or code..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        size="small"
        style={{ marginBottom: 8 }}
        prefix={<SearchOutlined />}
        autoFocus
      />
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '6px 8px' }}>Code</th>
              <th style={{ padding: '6px 8px' }}>Name</th>
              <th style={{ padding: '6px 8px' }}>Stock</th>
              <th style={{ padding: '6px 8px' }}>Unit</th>
              <th style={{ padding: '6px 8px' }}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr
                key={p.code}
                onClick={() => handleSelect(p)}
                style={{ cursor: 'pointer', borderBottom: '1px solid var(--gray-100)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '6px 8px' }}>{p.code}</td>
                <td style={{ padding: '6px 8px', color: 'var(--accent-blue)', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '6px 8px' }}>{p.stock}</td>
                <td style={{ padding: '6px 8px' }}>{p.unit}</td>
                <td style={{ padding: '6px 8px' }}>{p.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Popover
      content={popContent}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomLeft"
    >
      <Input
        value={value}
        readOnly
        placeholder="** Select Product **"
        style={{ cursor: 'pointer', background: 'var(--bg-card)' }}
        size="small"
      />
    </Popover>
  );
};

const MOCK_INVOICES = [
  { invoice: '2672', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'HMC - SERVICE ( Dahua)', amount: '2,900.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2671', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'HMC - SERVICE ( Dahua)', amount: '8,800.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2670', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'P. C. Mod Nepal Pvt. Ltd.', amount: '264,000.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2669', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Gadtola Suppliers', amount: '47,000.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2668', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Deeyana International Pvt. Ltd.', amount: '77,500.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2667', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Prime Technology', amount: '117,000.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2666', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Himmcom Int Pvt Ltd -Company', amount: '1,855,000.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2665', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Metavers Online Pvt.Ltd.', amount: '7,800.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2664', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Isha International', amount: '316,800.00', voucher: 'Sales', costClass: '2082.083' },
  { invoice: '2663', date: '2026-05-15', miti: '2083/02/01', days: 35, refNo: '', partyLedger: 'Opera Computer', amount: '22,800.00', voucher: 'Sales', costClass: '2082.083' }
];

export default function SalesInvoice({ darkMode }) {
  const [form] = Form.useForm();
  const [detailsForm] = Form.useForm();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mode, setMode] = useState('form'); // 'form' | 'directory'
  const [directorySearch, setDirectorySearch] = useState('');
  const [searchBy, setSearchBy] = useState('Invoice No.');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered invoices for Directory search
  const filteredInvoices = useMemo(() => {
    return MOCK_INVOICES.filter(inv => {
      const val = directorySearch.toLowerCase();
      if (!val) return true;
      if (searchBy === 'Invoice No.') {
        return inv.invoice.toLowerCase().includes(val);
      } else {
        return inv.partyLedger.toLowerCase().includes(val);
      }
    });
  }, [directorySearch, searchBy]);

  const directoryColumns = [
    { title: 'Invoice', dataIndex: 'invoice', key: 'invoice' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Miti', dataIndex: 'miti', key: 'miti' },
    { title: 'Days', dataIndex: 'days', key: 'days' },
    { title: 'Ref. No.', dataIndex: 'refNo', key: 'refNo' },
    { title: 'Party Ledger', dataIndex: 'partyLedger', key: 'partyLedger', render: text => <span style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{text}</span> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', align: 'right', style: { fontFamily: 'var(--font-mono)' } },
    { title: 'Voucher', dataIndex: 'voucher', key: 'voucher' },
    { title: 'CostClass', dataIndex: 'costClass', key: 'costClass' },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit"><EditOutlined style={{ color: '#096dd9', cursor: 'pointer' }} /></Tooltip>
          <Tooltip title="Delete"><DeleteOutlined style={{ color: '#f5222d', cursor: 'pointer' }} /></Tooltip>
          <Tooltip title="Print"><span style={{ color: '#2f54eb', cursor: 'pointer', fontSize: 13 }}>💾</span></Tooltip>
        </Space>
      )
    }
  ];

  // Party Dropdown State
  const [partySearch, setPartySearch] = useState('');
  const [isPartyDropdownOpen, setIsPartyDropdownOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  // Modal State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Form Row Data
  const [rowData, setRowData] = useState([
    { id: 1, product: '** Select Product **', closingStock: 0, actualQty: 0, unit: '', rate: 0, discountPer: 0, discountAmt: 0, amount: 0, isTaxable: false }
  ]);

  // Recalculations
  const totals = useMemo(() => {
    let subtotalQty = 0;
    let subtotalAmt = 0;
    let subtotalDiscount = 0;

    rowData.forEach(row => {
      const qty = parseFloat(row.actualQty) || 0;
      const rate = parseFloat(row.rate) || 0;
      const discAmt = parseFloat(row.discountAmt) || 0;
      subtotalQty += qty;
      subtotalDiscount += discAmt;
      subtotalAmt += (qty * rate) - discAmt;
    });

    return {
      qty: subtotalQty.toFixed(2),
      discount: subtotalDiscount.toFixed(2),
      subtotal: subtotalAmt.toFixed(2),
      grandTotal: subtotalAmt.toFixed(2)
    };
  }, [rowData]);

  const handleSelectProduct = (rowIdx, product) => {
    const updated = [...rowData];
    updated[rowIdx] = {
      ...updated[rowIdx],
      product: product.name,
      closingStock: product.stock,
      unit: product.unit,
      rate: product.rate,
      amount: product.rate * (updated[rowIdx].actualQty || 0)
    };
    setRowData(updated);
  };

  const handleRowChange = (rowIdx, field, val) => {
    const updated = [...rowData];
    const row = { ...updated[rowIdx], [field]: val };
    
    const qty = parseFloat(row.actualQty) || 0;
    const rate = parseFloat(row.rate) || 0;
    let discPer = parseFloat(row.discountPer) || 0;
    let discAmt = parseFloat(row.discountAmt) || 0;

    if (field === 'discountPer') {
      discAmt = (qty * rate) * (discPer / 100);
      row.discountAmt = discAmt;
    } else if (field === 'discountAmt') {
      if (qty * rate > 0) {
        discPer = (discAmt / (qty * rate)) * 100;
        row.discountPer = discPer;
      }
    } else {
      // Recompute discount amount based on percent
      discAmt = (qty * rate) * (discPer / 100);
      row.discountAmt = discAmt;
    }

    row.amount = (qty * rate) - discAmt;
    updated[rowIdx] = row;
    setRowData(updated);
  };

  const handleAddRow = () => {
    setRowData(prev => [
      ...prev,
      { id: Date.now(), product: '** Select Product **', closingStock: 0, actualQty: 0, unit: '', rate: 0, discountPer: 0, discountAmt: 0, amount: 0, isTaxable: false }
    ]);
  };

  const handleDeleteRow = (id) => {
    if (rowData.length <= 1) return;
    setRowData(prev => prev.filter(r => r.id !== id));
  };

  // Filter parties based on search
  const filteredParties = PARTIES.filter(p => 
    p.name.toLowerCase().includes(partySearch.toLowerCase()) || 
    p.code.toLowerCase().includes(partySearch.toLowerCase())
  );

  const handlePartySelect = (party) => {
    setSelectedParty(party);
    setIsPartyDropdownOpen(false);
    form.setFieldsValue({ partyName: party.name });
    setIsDetailsModalOpen(true);
  };

  const partyDropdownContent = (
    <div style={{ width: 600, padding: 8 }}>
      <Input 
        autoFocus
        placeholder="Search party by name or code..." 
        value={partySearch}
        onChange={e => setPartySearch(e.target.value)}
        style={{ marginBottom: 8 }}
        prefix={<SearchOutlined />}
      />
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', background: 'var(--gray-50)' }}>
              <th style={{ padding: '6px 8px' }}>Code</th>
              <th style={{ padding: '6px 8px' }}>Name</th>
              <th style={{ padding: '6px 8px' }}>Balance</th>
              <th style={{ padding: '6px 8px' }}>PAN/Vat</th>
              <th style={{ padding: '6px 8px' }}>Group</th>
            </tr>
          </thead>
          <tbody>
            {filteredParties.map(p => (
              <tr 
                key={p.code} 
                onClick={() => handlePartySelect(p)}
                style={{ cursor: 'pointer', borderBottom: '1px solid var(--gray-100)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '6px 8px' }}>{p.code}</td>
                <td style={{ padding: '6px 8px', color: 'var(--accent-blue)', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '6px 8px' }}>{p.balance}</td>
                <td style={{ padding: '6px 8px' }}>{p.pan}</td>
                <td style={{ padding: '6px 8px' }}>{p.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Button type="link" size="small">Add New</Button>
      </div>
    </div>
  );

  const outerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    ...(isFullscreen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      background: 'var(--bg-layout)',
    } : {})
  };

  const headerActionsEl = document.getElementById('header-actions');

  return (
    <div style={outerStyle}>
      {/* ── PAGE HEADER ── */}
      <div className="erp-page-header" style={{ flexShrink: 0, alignItems: 'center', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: context actions (title) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="erp-page-title" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 0 }}>
              Sales Invoice
            </div>
            <div style={{ width: 1, height: 16, background: 'var(--border-color)' }}></div>
            <div className="erp-page-breadcrumb" style={{ paddingBottom: 0, marginTop: 2 }}>
              <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Quick Access</span>
              <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
              <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setMode('form')}>Sales Invoice</span>
              {mode === 'directory' && (
                <>
                  <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {mode === 'form' && (
            <div style={{ display: 'flex', gap: 8, marginRight: 8, alignItems: 'center' }}>
              <Tooltip title="Clear form and start fresh">
                <Button size="small" icon={<ReloadOutlined />} onClick={() => form.resetFields()} style={{ borderRadius: 4, fontWeight: 500 }}>Reset</Button>
              </Tooltip>
              <Button size="small" type="primary" icon={<SaveOutlined />} 
                style={{ background: 'var(--primary)', borderColor: 'var(--primary)', borderRadius: 4, fontWeight: 500 }}>
                Save
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
              setMode(mode === 'directory' ? 'form' : 'directory');
            }}
            style={{ borderRadius: 4, borderColor: 'var(--border-color)', color: 'var(--text-main)', fontWeight: 500 }}
          >
            {mode === 'directory' ? 'Back to Form' : 'Directory'}
          </Button>

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

      {mode === 'form' ? (
        /* MAIN FORM CONTENT */
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        
        {/* HEADER FORM */}
        <div style={{ padding: '12px 16px', background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
          <Form form={form} layout="horizontal" size="small">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Invoice No." name="invoiceNo" style={{ marginBottom: 8 }}>
                  <Input defaultValue="2673" style={{ background: 'var(--bg-card)' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="For Year" name="forYear" style={{ marginBottom: 8 }}>
                  <Select defaultValue="2082.083">
                    <Option value="2082.083">2082.083</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Ref No" name="refNo" style={{ marginBottom: 8 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <span style={{ fontWeight: 500 }}>Voucher Date:</span>
                  <span style={{ background: 'var(--bg-card)', padding: '2px 8px', border: '1px solid var(--border-color)', borderRadius: 4 }}>
                    AD: 19-06-2026 | BS: 2083-03-05
                  </span>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={10}>
                <Form.Item label={<span style={{ color: 'red' }}>Party A/C*</span>} style={{ marginBottom: 8 }}>
                  <Popover 
                    content={partyDropdownContent} 
                    trigger="click" 
                    placement="bottomLeft"
                    open={isPartyDropdownOpen}
                    onOpenChange={setIsPartyDropdownOpen}
                  >
                    <Input 
                      placeholder="** Select Party **" 
                      value={selectedParty ? selectedParty.name : ''}
                      readOnly
                      style={{ cursor: 'pointer' }}
                    />
                  </Popover>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button size="small" type="primary" ghost onClick={() => selectedParty && setIsDetailsModalOpen(true)}>Detail</Button>
              </Col>
              <Col span={8}>
                <Form.Item label="Sales A/C" name="salesAc" style={{ marginBottom: 8 }}>
                  <Select defaultValue="sales">
                    <Option value="sales">SALES A/C - Sales -</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={10}>
                <Form.Item label="Salesman" name="salesman" style={{ marginBottom: 0 }}>
                  <Select placeholder="** Select Agent **" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* CUSTOM TABLE GRID SECTION */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 1000 }}>
            <thead>
              {/* Header row 1 */}
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', height: 32 }}>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 60, textAlign: 'center' }}>S.N.</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 280, textAlign: 'left' }}>Particulars</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 100, textAlign: 'right' }}>Closing Stock</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 180, textAlign: 'center' }} colSpan={2}>Quantity</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 100, textAlign: 'right' }}>Rate</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 180, textAlign: 'center' }} colSpan={2}>Discount</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 110, textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', width: 80, textAlign: 'center' }}>IsTaxable</th>
                <th style={{ padding: '4px 8px', width: 90, textAlign: 'center' }}>Action</th>
              </tr>
              {/* Header row 2 */}
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', height: 24, fontSize: 11, color: 'var(--text-secondary)' }}>
                <th colSpan={3} style={{ borderRight: '1px solid var(--border-color)' }}></th>
                <th style={{ padding: '2px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', width: 90 }}>Actual</th>
                <th style={{ padding: '2px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', width: 90 }}>Unit</th>
                <th style={{ borderRight: '1px solid var(--border-color)' }}></th>
                <th style={{ padding: '2px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', width: 90 }}>Per(%)</th>
                <th style={{ padding: '2px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', width: 90 }}>Amount</th>
                <th colSpan={3}></th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, idx) => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)', height: 36 }}>
                  {/* S.N. */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {String(idx + 1).padStart(3, '0')}
                  </td>
                  {/* Particulars with Search Popover */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>
                    <ProductSearchSelector 
                      value={row.product} 
                      onSelectProduct={handleSelectProduct} 
                      rowIdx={idx} 
                    />
                  </td>
                  {/* Closing Stock */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right' }}>
                    {row.closingStock}
                  </td>
                  {/* Quantity - Actual */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>
                    <Input 
                      type="number" 
                      value={row.actualQty || ''} 
                      onChange={e => handleRowChange(idx, 'actualQty', parseFloat(e.target.value) || 0)}
                      size="small" 
                      style={{ textAlign: 'right' }} 
                    />
                  </td>
                  {/* Quantity - Unit */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center' }}>
                    {row.unit || '-'}
                  </td>
                  {/* Rate */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>
                    <Input 
                      type="number" 
                      value={row.rate || ''} 
                      onChange={e => handleRowChange(idx, 'rate', parseFloat(e.target.value) || 0)}
                      size="small" 
                      style={{ textAlign: 'right' }} 
                    />
                  </td>
                  {/* Discount Per */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>
                    <Input 
                      type="number" 
                      value={row.discountPer || ''} 
                      onChange={e => handleRowChange(idx, 'discountPer', parseFloat(e.target.value) || 0)}
                      size="small" 
                      style={{ textAlign: 'right' }} 
                    />
                  </td>
                  {/* Discount Amount */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>
                    <Input 
                      type="number" 
                      value={row.discountAmt || ''} 
                      onChange={e => handleRowChange(idx, 'discountAmt', parseFloat(e.target.value) || 0)}
                      size="small" 
                      style={{ textAlign: 'right' }} 
                    />
                  </td>
                  {/* Amount */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right', fontWeight: 600 }}>
                    {(row.amount || 0).toFixed(2)}
                  </td>
                  {/* IsTaxable */}
                  <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <Checkbox 
                      checked={row.isTaxable} 
                      onChange={e => handleRowChange(idx, 'isTaxable', e.target.checked)} 
                    />
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '4px 8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      <Button size="small" type="primary" icon={<PlusOutlined />} onClick={handleAddRow} />
                      <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteRow(row.id)} />
                    </div>
                  </td>
                </tr>
              ))}

              {/* DYNAMIC SUB TOTAL ROW */}
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, height: 36 }}>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', color: 'var(--text-main)' }}>SUB TOTAL :</td>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right' }}>{totals.qty}</td>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right' }}>{totals.discount}</td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right' }}>{totals.subtotal}</td>
                <td colSpan={2}></td>
              </tr>

              {/* DYNAMIC DISCOUNT ROW */}
              <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)', fontWeight: 500, height: 36 }}>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>1(L)</td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)' }}>DISCOUNT - - Discount -</td>
                <td colSpan={5} style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ borderRight: '1px solid var(--border-color)' }}></td>
                <td style={{ padding: '4px 8px', borderRight: '1px solid var(--border-color)', textAlign: 'right' }}>0.00</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div style={{ padding: '12px 16px', background: 'var(--gray-50)', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
          <Row gutter={16} align="middle">
            <Col span={14}>
              <Form.Item label="Narration" style={{ marginBottom: 8 }}>
                <Input size="small" />
              </Form.Item>
              <Button size="small">Document Attach (0)</Button>
            </Col>
            <Col span={4} style={{ textAlign: 'right', fontWeight: 600 }}>
              Grand Total:
            </Col>
            <Col span={6}>
              <Input size="large" value={totals.grandTotal} readOnly style={{ textAlign: 'right', fontWeight: 700, fontSize: 16 }} />
            </Col>
          </Row>
        </div>
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
              <Select value={searchBy} onChange={setSearchBy} style={{ width: 140 }}>
                <Option value="Invoice No.">Invoice No.</Option>
                <Option value="Party Ledger">Party Ledger</Option>
              </Select>
              <Input
                prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
                placeholder="Search..."
                value={directorySearch}
                onChange={e => setDirectorySearch(e.target.value)}
                allowClear
                style={{ width: 200 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Show</span>
              <Select value={pageSize} onChange={e => setPageSize(e)} style={{ width: 75 }}>
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
              columns={directoryColumns}
              dataSource={filteredInvoices}
              rowKey="invoice"
              size="middle"
              onRow={record => ({
                style: { cursor: 'pointer' },
                onDoubleClick: () => {
                  setMode('form');
                }
              })}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: 2672,
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

      {/* SALES INVOICE DETAILS MODAL */}
      <Modal
        title={<div style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Sales Invoice Details</div>}
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        width={900}
        footer={[
          <Button key="cancel" onClick={() => setIsDetailsModalOpen(false)}>Cancel</Button>,
          <Button key="ok" type="primary" onClick={() => setIsDetailsModalOpen(false)}>Ok</Button>
        ]}
      >
        <Form form={detailsForm} layout="vertical" size="small">
          {/* Top Info */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ref. Voucher"><Input /></Form.Item>
              <Form.Item label="Other References"><Input /></Form.Item>
              <Form.Item label="Delivery Through"><Input /></Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Voucher No"><Input /></Form.Item>
              <Form.Item label="Terms of Delivery"><Input /></Form.Item>
              <Form.Item label="Delivery Doc No."><Input /></Form.Item>
            </Col>
          </Row>
          
          <Divider style={{ margin: '12px 0' }} />

          {/* Buyer Details */}
          <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Buyer Details</div>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Buyer *"><Input value={selectedParty?.name || ''} readOnly /></Form.Item>
              <Form.Item label="PAN/VAT No. *"><Input value={selectedParty?.pan || ''} readOnly /></Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Address *"><Input /></Form.Item>
              <Form.Item label="Credit Days"><Input /></Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone No."><Input /></Form.Item>
              <Form.Item label="Party A/C"><Input value={selectedParty?.name || ''} readOnly /></Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: '12px 0' }} />

          {/* Vehicle Details */}
          <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>Vehicle Details</div>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Vehicle No."><Input /></Form.Item>
              <Form.Item label="Driver's PhoneNo."><Input /></Form.Item>
              <Form.Item label="Transporter"><Input /></Form.Item>
              <Form.Item label="Export Country"><Input defaultValue="NEPAL" /></Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Bulty No."><Input /></Form.Item>
              <Form.Item label="Driver's Address"><Input /></Form.Item>
              <Form.Item label="Quantity"><Input /></Form.Item>
              <Form.Item label="Advance"><Input /></Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Driver's Name"><Input /></Form.Item>
              <Form.Item label="Licence No."><Input /></Form.Item>
              <Form.Item label="Freight Type">
                <Select placeholder="**Select FreightType**" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Total WT"><Input /></Form.Item>
              <Form.Item label="PP No."><Input /></Form.Item>
              <Form.Item label="PP Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

    </div>
  );
}
