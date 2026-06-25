import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  DatePicker, Select, Button, Input, Checkbox, Dropdown, Menu, Tooltip, notification, Modal
} from 'antd';
import {
  CalendarOutlined, SearchOutlined, FolderOpenOutlined, FilterOutlined,
  PrinterOutlined, FileExcelOutlined, FilePdfOutlined, LeftOutlined, RightOutlined,
  PlusOutlined, MinusOutlined, InfoCircleOutlined, DatabaseOutlined, SlidersOutlined,
  CloseOutlined, CheckOutlined, ClearOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

// ── Mock Data for Stock Summary ──
const STOCK_SUMMARY_DATA = [
  {
    key: '1',
    name: 'DH IPC HFW1230TC1-A-I2-V2',
    code: 'D000474',
    hsCode: '',
    group: 'IP CAMERA',
    godown: 'HMC Godown',
    openingQty: 80.00,
    openingRate: 3583.844,
    openingAmt: 286707.52,
    inQty: 2.00,
    inRate: 3583.844,
    inAmt: 7167.69,
    outQty: 15.00,
    outRate: 4200.000,
    outAmt: 63000.00,
    closingQty: 75.00,
    closingRate: 3583.844,
    closingAmt: 268707.52
  },
  {
    key: '2',
    name: 'DELL LATITUDE 3440 Core i5',
    code: 'D000476',
    hsCode: '84713010',
    group: 'LAPTOP AND TABLETS',
    godown: 'HMC Godown',
    openingQty: 0.00,
    openingRate: 0.00,
    openingAmt: 0.00,
    inQty: 3.00,
    inRate: 74000.000,
    inAmt: 222000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 3.00,
    closingRate: 74000.000,
    closingAmt: 222000.00
  },
  {
    key: '3',
    name: 'MSI GF65 I7/16gb/512GB RTX3060',
    code: 'M000477',
    hsCode: '84713010',
    group: 'LAPTOP AND TABLETS',
    godown: 'HMC Godown',
    openingQty: 0.00,
    openingRate: 0.00,
    openingAmt: 0.00,
    inQty: 1.00,
    inRate: 93000.000,
    inAmt: 93000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 1.00,
    closingRate: 93000.000,
    closingAmt: 93000.00
  },
  {
    key: '4',
    name: 'MEKER WALL MOUNT RACK 9U',
    code: 'M000478',
    hsCode: '84151000',
    group: 'ACCESSORIES',
    godown: 'HMC Godown',
    openingQty: 0.00,
    openingRate: 0.00,
    openingAmt: 0.00,
    inQty: 3.00,
    inRate: 1200.000,
    inAmt: 3600.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 3.00,
    closingRate: 1200.000,
    closingAmt: 3600.00
  },
  {
    key: '5',
    name: 'WALL MOUNT SPLIT AC 1.5 TON',
    code: 'W000479',
    hsCode: '84151000',
    group: 'ACCESSORIES',
    godown: 'HMC Godown',
    openingQty: 0.00,
    openingRate: 0.00,
    openingAmt: 0.00,
    inQty: 3.00,
    inRate: 2400.000,
    inAmt: 7200.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 3.00,
    closingRate: 2400.000,
    closingAmt: 7200.00
  },
  {
    key: '6',
    name: 'IPHONE 16 128GB BLACK',
    code: 'I000480',
    hsCode: '851713',
    group: 'MOBILE & PHONE',
    godown: 'HMC Godown',
    openingQty: 0.00,
    openingRate: 0.00,
    openingAmt: 0.00,
    inQty: 2.00,
    inRate: 115000.000,
    inAmt: 230000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 2.00,
    closingRate: 115000.000,
    closingAmt: 230000.00
  },
  {
    key: '7',
    name: 'DAHUA CAMERA DH-IPC-C22EP',
    code: 'D000481',
    hsCode: '',
    group: 'WIFI CAMERA',
    godown: 'HMC Godown',
    openingQty: 5.00,
    openingRate: 2200.000,
    openingAmt: 11000.00,
    inQty: 72.00,
    inRate: 2200.000,
    inAmt: 158400.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 77.00,
    closingRate: 2200.000,
    closingAmt: 169400.00
  },
  {
    key: '8',
    name: 'Wireless Series Table Lamp',
    code: 'W000482',
    hsCode: '',
    group: 'ACCESSORIES',
    godown: 'HMC Godown',
    openingQty: 13.00,
    openingRate: 450.000,
    openingAmt: 5850.00,
    inQty: 20.00,
    inRate: 450.000,
    inAmt: 9000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 33.00,
    closingRate: 450.000,
    closingAmt: 14850.00
  },
  {
    key: '9',
    name: '2023 Mini Hubble USB Hub',
    code: '2000483',
    hsCode: '85235100',
    group: 'ACCESSORIES',
    godown: 'HMC Godown',
    openingQty: 19.00,
    openingRate: 350.000,
    openingAmt: 6650.00,
    inQty: 50.00,
    inRate: 350.000,
    inAmt: 17500.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 69.00,
    closingRate: 350.000,
    closingAmt: 24150.00
  },
  {
    key: '10',
    name: 'DH-IPC-HDW1239V-P Camera',
    code: 'D000484',
    hsCode: '85258330',
    group: 'IP CAMERA',
    godown: 'HMC Godown',
    openingQty: 4.00,
    openingRate: 2800.000,
    openingAmt: 11200.00,
    inQty: 50.00,
    inRate: 2800.000,
    inAmt: 140000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 54.00,
    closingRate: 2800.000,
    closingAmt: 151200.00
  },
  {
    key: '11',
    name: 'DH-SD49216DB-HNY Camera',
    code: 'D000485',
    hsCode: '85258330',
    group: 'PTZ CAMERA',
    godown: 'HMC Godown',
    openingQty: 10.00,
    openingRate: 15000.000,
    openingAmt: 150000.00,
    inQty: 10.00,
    inRate: 15000.000,
    inAmt: 150000.00,
    outQty: 0.00,
    outRate: 0.00,
    outAmt: 0.00,
    closingQty: 20.00,
    closingRate: 15000.000,
    closingAmt: 300000.00
  }
];

const GROUPS_LIST = [
  'Primary Group', 'PEN DRIVE', 'PORTABLE SSD', 'PRINTING MACHINE', 
  'Project Series', 'Projector', 'Protable Monitor', 'IP CAMERA', 
  'LAPTOP AND TABLETS', 'ACCESSORIES', 'MOBILE & PHONE', 'WIFI CAMERA', 
  'SWITCH', 'CABLE'
];

const GODOWNS_LIST = [
  '**Select Godown**', 'HMC Godown', 'Main Godown', 'Sub Godown'
];

const SEARCH_BY_OPTIONS = [
  'ProductName', 'PartNo', 'Code', 'Group Name', 'CategoriesName', 
  'SalesQty', 'SalesQty(Al.Value1)', 'SalesQty(Al.Value2)', 'Sales Rate', 
  'SalesAmt', 'Return Qty', 'Return Qty(Al.Value1)', 'Return Qty(Al.Value2)', 
  'Return rate', 'Return Amt', 'Net Sales Qty', 'Unit', 'Net Qty(Al.Value1)', 
  'Net Qty(Al.Value2)'
];

const BRANCH_LIST = [
  'All Branches', 'Kathmandu Branch', 'Lalitpur Branch', 'Pokhara Branch'
];

const ALTERNATE_UNITS = [
  'None', 'Box', 'Cartoon', 'Packet', 'Piece'
];

export default function StockSummary({ darkMode }) {
  // ── States ──
  const [fromDate, setFromDate] = useState(dayjs('2025-07-17'));
  const [toDate, setToDate] = useState(dayjs('2026-06-25'));
  const [group, setGroup] = useState('Primary Group');
  const [godown, setGodown] = useState('**Select Godown**');
  const [findType, setFindType] = useState('Contain');
  const [findSearch, setFindSearch] = useState('');
  const [searchBy, setSearchBy] = useState('ProductName');
  const [gridSearch, setGridSearch] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState(new Set());

  // Custom Columns Manager Modal State
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    code: true,
    hsCode: true,
    group: true,
    godown: true,
    openingQty: true,
    openingRate: true,
    openingAmt: true,
    inQty: true,
    inRate: true,
    inAmt: true,
    outQty: true,
    outRate: true,
    outAmt: true,
    closingQty: true,
    closingRate: true,
    closingAmt: true
  });

  // ── Custom Columns Builder State ──
  const [customColumnsList, setCustomColumnsList] = useState([
    { id: 1, refColumn: 'Number Column 1-N_C1', sourceColumn: 'openingQty', newColumn: 'Balance Qty', formula: 'source * 1.0' }
  ]);

  const refColumnOptions = [
    { value: 'Number Column 1-N_C1', label: 'Number Column 1-N_C1' },
    { value: 'Number Column 2-N_C2', label: 'Number Column 2-N_C2' },
    { value: 'Number Column 3-N_C3', label: 'Number Column 3-N_C3' },
    { value: 'Number Column 4-N_C4', label: 'Number Column 4-N_C4' },
    { value: 'Text Column 1-T_C1', label: 'Text Column 1-T_C1' },
    { value: 'Text Column 2-T_C2', label: 'Text Column 2-T_C2' },
  ];

  const sourceColumnOptions = [
    { value: 'openingQty', label: 'Opening Qty' },
    { value: 'openingRate', label: 'Opening Rate' },
    { value: 'openingAmt', label: 'Opening Amt' },
    { value: 'inQty', label: 'In Qty' },
    { value: 'inRate', label: 'In Rate' },
    { value: 'inAmt', label: 'In Amt' },
    { value: 'outQty', label: 'Out Qty' },
    { value: 'outRate', label: 'Out Rate' },
    { value: 'outAmt', label: 'Out Amt' },
    { value: 'closingQty', label: 'Closing Qty' },
    { value: 'closingRate', label: 'Closing Rate' },
    { value: 'closingAmt', label: 'Closing Amt' },
  ];

  const handleAddCustomColumnRow = () => {
    const nextId = customColumnsList.length > 0 ? Math.max(...customColumnsList.map(c => c.id)) + 1 : 1;
    setCustomColumnsList([...customColumnsList, { id: nextId, refColumn: '', sourceColumn: '', newColumn: '', formula: '' }]);
  };

  const handleRemoveCustomColumnRow = (id) => {
    setCustomColumnsList(customColumnsList.filter(item => item.id !== id));
  };

  const handleUpdateCustomColumnRow = (id, key, val) => {
    setCustomColumnsList(customColumnsList.map(item => item.id === id ? { ...item, [key]: val } : item));
  };

  // State holding the finalized custom columns that are currently rendered in the table
  const [activeCustomColumns, setActiveCustomColumns] = useState([
    { id: 1, refColumn: 'Number Column 1-N_C1', sourceColumn: 'openingQty', newColumn: 'Balance Qty', formula: 'source * 1.0' }
  ]);

  const handleApplyCustomColumns = () => {
    const validCols = customColumnsList.filter(col => col.newColumn.trim() !== '');
    setActiveCustomColumns(validCols);
    setColumnsModalOpen(false);
    notification.success({
      message: 'Custom Columns Applied',
      description: `Added ${validCols.length} custom formula columns to the grid.`,
      placement: 'topRight',
      duration: 2
    });
  };

  const evaluateCustomFormula = (row, formula, sourceVal) => {
    if (!formula) return sourceVal || 0;
    try {
      const sanitized = formula.toLowerCase().replace(/source/g, String(sourceVal || 0));
      const result = new Function(`return (${sanitized})`)();
      return isNaN(result) ? 0 : result;
    } catch (e) {
      return 0;
    }
  };

  // Sidebar Drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // HUD state
  const [hudOpen, setHudOpen] = useState(false);
  const hudRef = useRef(null);
  const hudTriggerRef = useRef(null);

  // ── Sidebar / HUD Config Options (Buffered for manual apply) ──
  const [selectProduct, setSelectProduct] = useState('');
  const [selectGroup, setSelectGroup] = useState('Select 0');
  const [forBranch, setForBranch] = useState('All Branches');
  const [godownWise, setGodownWise] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [batchWiseDetails, setBatchWiseDetails] = useState(false);
  const [rackWiseDetails, setRackWiseDetails] = useState(false);
  const [fixedProductDetails, setFixedProductDetails] = useState(false);
  const [altUnit1, setAltUnit1] = useState('None');
  const [altUnit2, setAltUnit2] = useState('None');
  const [altUnit3, setAltUnit3] = useState('None');
  const [showStandardRates, setShowStandardRates] = useState(false);
  const [productCompany, setProductCompany] = useState('');
  const [productType, setProductType] = useState('');

  // Applied values (this actually drives the table rows/columns)
  const [appliedFilters, setAppliedFilters] = useState({
    selectProduct: '',
    selectGroup: 'Select 0',
    forBranch: 'All Branches',
    godownWise: true,
    showDetails: false,
    batchWiseDetails: false,
    rackWiseDetails: false,
    fixedProductDetails: false,
    altUnit1: 'None',
    altUnit2: 'None',
    altUnit3: 'None',
    showStandardRates: false,
    productCompany: '',
    productType: ''
  });

  // Close HUD on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (hudOpen && hudRef.current && !hudRef.current.contains(e.target) && !hudTriggerRef.current.contains(e.target)) {
        setHudOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hudOpen]);

  // Apply filters from Sidebar or HUD
  const handleApplyFilters = () => {
    setAppliedFilters({
      selectProduct,
      selectGroup,
      forBranch,
      godownWise,
      showDetails,
      batchWiseDetails,
      rackWiseDetails,
      fixedProductDetails,
      altUnit1,
      altUnit2,
      altUnit3,
      showStandardRates,
      productCompany,
      productType
    });
    setSidebarOpen(false);
    setHudOpen(false);
    notification.success({
      message: 'Stock Summary Filters Applied',
      description: 'The stock grid has been successfully filtered.',
      placement: 'topRight',
      duration: 2
    });
  };

  const handleLoadData = () => {
    setDataLoaded(true);
    notification.info({
      message: 'Stock Data Loaded',
      description: 'Stock Summary values populated from the selected dates & groups.',
      placement: 'topRight',
      duration: 2
    });
  };

  // Helper to format currency/numbers
  const formatNumber = (val, dec = 2) => {
    if (val === undefined || val === null || isNaN(val)) return '—';
    return val.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  };

  // Filter & process rows
  const processedRows = useMemo(() => {
    if (!dataLoaded) return [];

    return STOCK_SUMMARY_DATA.filter(row => {
      // Group filter
      if (group !== 'Primary Group' && row.group !== group) return false;

      // Godown filter
      if (godown !== '**Select Godown**' && row.godown !== godown) return false;

      // Find search
      if (findSearch) {
        const s = findSearch.toLowerCase();
        const target = row.name.toLowerCase();
        if (findType === 'Contain' && !target.includes(s)) return false;
        if (findType === 'Prefix' && !target.startsWith(s)) return false;
      }

      // Grid Search by specific column
      if (gridSearch) {
        const gs = gridSearch.toLowerCase();
        if (searchBy === 'ProductName' && !row.name.toLowerCase().includes(gs)) return false;
        if (searchBy === 'Code' && !row.code.toLowerCase().includes(gs)) return false;
        if (searchBy === 'Group Name' && !row.group.toLowerCase().includes(gs)) return false;
      }

      return true;
    });
  }, [dataLoaded, group, godown, findSearch, findType, searchBy, gridSearch]);

  // Aggregate totals
  const totals = useMemo(() => {
    const sum = { qty: 0, amt: 0, inQty: 0, inAmt: 0, outQty: 0, outAmt: 0, closingQty: 0, closingAmt: 0 };
    processedRows.forEach(r => {
      sum.qty += r.openingQty;
      sum.amt += r.openingAmt;
      sum.inQty += r.inQty;
      sum.inAmt += r.inAmt;
      sum.outQty += r.outQty;
      sum.outAmt += r.outAmt;
      sum.closingQty += r.closingQty;
      sum.closingAmt += r.closingAmt;
    });
    return sum;
  }, [processedRows]);

  const exportMenu = (
    <Menu items={[
      { key: 'excel', label: 'Export to Excel', icon: <FileExcelOutlined style={{ color: '#1d6f42' }} /> },
      { key: 'pdf', label: 'Export to PDF', icon: <FilePdfOutlined style={{ color: '#e01e22' }} /> },
    ]} />
  );

  // Custom Magnet U-shape Icon for Add Custom Columns
  const CustomColumnsIcon = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" style={{ verticalAlign: 'middle' }}>
      <path d="M512 128c-176.7 0-320 143.3-320 320v256c0 35.3 28.7 64 64 64h128c35.3 0 64-28.7 64-64V448H320v-8c0-106 86-192 192-192s192 86 192 192v8H576v256c0 35.3 28.7 64 64 64h128c35.3 0 64-28.7 64-64V448c0-176.7-143.3-320-320-320z"/>
    </svg>
  );

  // Column toggle handler
  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({
      ...prev,
      [col]: !prev[col]
    }));
  };

  return (
    <div className={`tb-wrapper ${darkMode ? 'dark' : ''}`} style={{ position: 'relative' }}>
      
      {/* Custom Columns Modal */}
      <Modal
        title={<span style={{ fontWeight: 600, fontSize: 16 }}>Custom Columns</span>}
        open={columnsModalOpen}
        onCancel={() => setColumnsModalOpen(false)}
        width={950}
        footer={[
          <Button key="cancel" onClick={() => setColumnsModalOpen(false)}>Cancel</Button>,
          <Button key="ok" type="primary" style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }} onClick={handleApplyCustomColumns}>Ok</Button>
        ]}
        className={darkMode ? 'dark-modal' : ''}
      >
        <div style={{ overflowX: 'auto', padding: '8px 0' }}>
          <table className="custom-cols-modal-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '1px solid #d9d9d9' }}>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: '60px', fontWeight: 600, color: '#333' }}>S.No.</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: '#333' }}>Ref. Column</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: '#333' }}>Source. Column</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: '#333' }}>New Column</th>
                <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 600, color: '#333' }}>Formula</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', width: '80px', fontWeight: 600, color: '#333' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customColumnsList.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontSize: '13px' }}>{index + 1}</td>
                  <td style={{ padding: '6px 8px' }}>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select ref column"
                      value={item.refColumn || undefined}
                      onChange={(val) => handleUpdateCustomColumnRow(item.id, 'refColumn', val)}
                      style={{ width: '100%' }}
                    >
                      {refColumnOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                      ))}
                    </Select>
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select source column"
                      value={item.sourceColumn || undefined}
                      onChange={(val) => handleUpdateCustomColumnRow(item.id, 'sourceColumn', val)}
                      style={{ width: '100%' }}
                    >
                      {sourceColumnOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                      ))}
                    </Select>
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <Input
                      placeholder="New Column Name"
                      value={item.newColumn}
                      onChange={(e) => handleUpdateCustomColumnRow(item.id, 'newColumn', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '6px 8px' }}>
                    <Input
                      placeholder="e.g. source * 1.13 or source + 10"
                      value={item.formula}
                      onChange={(e) => handleUpdateCustomColumnRow(item.id, 'formula', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Button
                        type="text"
                        icon={<PlusOutlined style={{ color: '#0066cc' }} />}
                        onClick={handleAddCustomColumnRow}
                        size="small"
                      />
                      <Button
                        type="text"
                        icon={<CloseOutlined style={{ color: '#ff3333' }} />}
                        onClick={() => handleRemoveCustomColumnRow(item.id)}
                        disabled={customColumnsList.length === 1}
                        size="small"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      
      {/* ── TOP FILTER CONTROL PANEL ── */}
      <div className="tb-filter-panel" style={{ position: 'relative' }}>

        {/* ── HUD OVERLAY PANEL (RECTANGULAR, FLOATS EXACTLY OVER FILTER PANEL ONLY) ── */}
        {hudOpen && (
          <div ref={hudRef} className="tb-hud-overlay-panel fade-in" style={{ gridTemplateColumns: '180px 1fr 100px' }}>
            <div className="tb-hud-overlay-left">
              <span className="tb-hud-overlay-title">Stock View Controls</span>
              <span className="tb-hud-overlay-subtitle">Toggle batch/rack details & branches</span>
              <div className="tb-hud-overlay-actions">
                <span className="tb-hud-overlay-reset" onClick={() => {
                  setSelectProduct('');
                  setSelectGroup('Select 0');
                  setForBranch('All Branches');
                  setGodownWise(true);
                  setShowDetails(false);
                  setBatchWiseDetails(false);
                  setRackWiseDetails(false);
                  setFixedProductDetails(false);
                  setAltUnit1('None');
                  setAltUnit2('None');
                  setAltUnit3('None');
                  setShowStandardRates(false);
                  setProductCompany('');
                  setProductType('');
                }}>Reset to Default</span>
              </div>
            </div>

            <div className="tb-hud-overlay-middle" style={{ gap: '12px', padding: '0 12px' }}>
              {/* Checkboxes Group 1 */}
              <div className="tb-hud-overlay-column">
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={godownWise} onChange={e => setGodownWise(e.target.checked)}>
                    GODOWN WISE
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showDetails} onChange={e => setShowDetails(e.target.checked)}>
                    SHOW DETAILS
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={batchWiseDetails} onChange={e => setBatchWiseDetails(e.target.checked)}>
                    BATCH WISE
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={rackWiseDetails} onChange={e => setRackWiseDetails(e.target.checked)}>
                    RACK WISE
                  </Checkbox>
                </div>
              </div>

              {/* Checkboxes Group 2 */}
              <div className="tb-hud-overlay-column">
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={fixedProductDetails} onChange={e => setFixedProductDetails(e.target.checked)}>
                    FIXED DETAILS
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showStandardRates} onChange={e => setShowStandardRates(e.target.checked)}>
                    STANDARD RATES
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item" style={{ visibility: 'hidden' }}>
                  <Checkbox>Hidden</Checkbox>
                </div>
                <div className="tb-hud-overlay-item" style={{ visibility: 'hidden' }}>
                  <Checkbox>Hidden</Checkbox>
                </div>
              </div>

              {/* Selects Group 1 */}
              <div className="tb-hud-overlay-column select-column">
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Select Group</span>
                  <Select value={selectGroup} onChange={setSelectGroup} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    <Option value="Select 0">Select 0</Option>
                    <Option value="Group A">Group A</Option>
                  </Select>
                </div>
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Branch</span>
                  <Select value={forBranch} onChange={setForBranch} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    {BRANCH_LIST.map(b => <Option key={b} value={b}>{b}</Option>)}
                  </Select>
                </div>
              </div>

              {/* Selects Group 2 */}
              <div className="tb-hud-overlay-column select-column">
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Alt Unit 1</span>
                  <Select value={altUnit1} onChange={setAltUnit1} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    {ALTERNATE_UNITS.map(u => <Option key={u} value={u}>{u}</Option>)}
                  </Select>
                </div>
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Alt Unit 2</span>
                  <Select value={altUnit2} onChange={setAltUnit2} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    {ALTERNATE_UNITS.map(u => <Option key={u} value={u}>{u}</Option>)}
                  </Select>
                </div>
              </div>
            </div>

            <div className="tb-hud-overlay-right">
              <Button type="text" size="small" icon={<CloseOutlined />} className="tb-hud-overlay-close-btn" onClick={() => setHudOpen(false)} />
              <Button type="primary" size="small" icon={<CheckOutlined />} className="tb-hud-overlay-apply-btn" onClick={handleApplyFilters}>
                Apply
              </Button>
            </div>
          </div>
        )}

        <div className="tb-filter-row">
          <div className="tb-field-group">
            <span className="tb-field-label">From:</span>
            <DatePicker
              value={fromDate}
              onChange={setFromDate}
              format="DD-MM-YYYY"
              suffixIcon={<CalendarOutlined />}
              className="tb-datepicker"
            />
          </div>
          
          <div className="tb-field-group">
            <span className="tb-field-label">To:</span>
            <DatePicker
              value={toDate}
              onChange={setToDate}
              format="DD-MM-YYYY"
              suffixIcon={<CalendarOutlined />}
              className="tb-datepicker"
            />
          </div>

          <div className="tb-field-group" style={{ width: 220 }}>
            <span className="tb-field-label">Group:</span>
            <Select
              value={group}
              onChange={setGroup}
              showSearch
              style={{ width: '100%' }}
              className="tb-select"
            >
              {GROUPS_LIST.map(g => <Option key={g} value={g}>{g}</Option>)}
            </Select>
          </div>

          <div className="tb-field-group" style={{ width: 220 }}>
            <span className="tb-field-label">Godown:</span>
            <Select
              value={godown}
              onChange={setGodown}
              showSearch
              style={{ width: '100%' }}
              className="tb-select"
            >
              {GODOWNS_LIST.map(g => <Option key={g} value={g}>{g}</Option>)}
            </Select>
          </div>

          <Button type="primary" icon={<DatabaseOutlined />} className="tb-load-btn" onClick={handleLoadData}>
            Load
          </Button>
        </div>

        {/* ── SECONDARY FILTER ROW ── */}
        <div className="tb-search-row">
          <div className="tb-search-section-left">
            <span className="tb-inline-label">Find:</span>
            <Select
              value={findType}
              onChange={setFindType}
              style={{ width: 90 }}
              className="tb-select"
            >
              <Option value="Contain">Contain</Option>
              <Option value="Prefix">Prefix</Option>
            </Select>
            <Input
              placeholder="Search..."
              value={findSearch}
              onChange={e => setFindSearch(e.target.value)}
              style={{ width: 140 }}
              className="tb-input"
            />
            <Button icon={<SearchOutlined />} size="small" />
          </div>

          <div className="tb-search-section-right">
            <span className="tb-inline-label">Search By:</span>
            <Select
              value={searchBy}
              onChange={setSearchBy}
              style={{ width: 140 }}
              className="tb-select"
            >
              {SEARCH_BY_OPTIONS.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
              <Input
                placeholder="Search in grid..."
                value={gridSearch}
                onChange={e => setGridSearch(e.target.value)}
                style={{ width: 130 }}
                className="tb-input"
              />
              <Button icon={<SearchOutlined />} size="small" />
              
              {/* HUD Trigger */}
              <Tooltip title="View Stock Controls HUD">
                <Button
                  ref={hudTriggerRef}
                  icon={<SlidersOutlined />}
                  onClick={() => setHudOpen(!hudOpen)}
                  className={`tb-hud-trigger-btn ${hudOpen ? 'active' : ''}`}
                />
              </Tooltip>
            </div>

            <div className="tb-grid-actions">
              <Checkbox
                checked={expandedKeys.size > 2}
                onChange={e => e.target.checked ? setExpandedKeys(new Set(['all'])) : setExpandedKeys(new Set())}
                className="tb-checkbox"
              >
                Expand
              </Checkbox>

              <Tooltip title="Decrease Font Size">
                <Button size="small" icon={<MinusOutlined />} />
              </Tooltip>
              
              <Dropdown overlay={exportMenu} trigger={['click']}>
                <Button size="small" icon={<FileExcelOutlined />} />
              </Dropdown>
              
              <Tooltip title="Print Stock Summary">
                <Button size="small" icon={<PrinterOutlined />} />
              </Tooltip>

              <Tooltip title="Add Custom Columns">
                <Button
                  size="small"
                  onClick={() => setColumnsModalOpen(true)}
                  icon={<CustomColumnsIcon />}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTAINER (TABLE + SIDEBAR CONFIG) ── */}
      <div className="tb-main-container">
        
        {/* LEFT: STOCK FINANCIAL GRID */}
        <div className="tb-grid-container" style={{ position: 'relative' }}>
          {!dataLoaded ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
              margin: '16px 20px',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              gap: 8
            }}>
              <InfoCircleOutlined style={{ fontSize: 24, color: 'var(--primary)' }} />
              <span style={{ fontSize: 13.5, fontWeight: 500 }}>Please Click the Load Button to display the data</span>
            </div>
          ) : (
            <div className="tb-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="tb-table" style={{ minWidth: 1600 }}>
                <thead>
                  <tr>
                    <th className="tb-th-particulars" style={{ width: 280 }}>Name</th>
                    {visibleColumns.code && <th style={{ width: 90 }}>Code</th>}
                    {visibleColumns.hsCode && <th style={{ width: 100 }}>HS Code</th>}
                    {visibleColumns.group && <th style={{ width: 150 }}>Group</th>}
                    {visibleColumns.godown && <th style={{ width: 120 }}>Godown</th>}
                    {visibleColumns.openingQty && <th style={{ textAlign: 'right', width: 100 }}>Opening Qty</th>}
                    
                    {/* Inject active custom columns right after Opening Qty if they reference it */}
                    {activeCustomColumns.map(cc => (
                      <th key={cc.id} style={{ textAlign: 'right', width: 110, color: 'var(--accent-blue)', fontWeight: 600 }}>{cc.newColumn}</th>
                    ))}

                    {visibleColumns.openingRate && <th style={{ textAlign: 'right', width: 100 }}>Opening Rate</th>}
                    {visibleColumns.openingAmt && <th style={{ textAlign: 'right', width: 120 }}>Opening Amt</th>}
                    {visibleColumns.inQty && <th style={{ textAlign: 'right', width: 100 }}>In Qty</th>}
                    {visibleColumns.inRate && <th style={{ textAlign: 'right', width: 100 }}>In Rate</th>}
                    {visibleColumns.inAmt && <th style={{ textAlign: 'right', width: 120 }}>In Amt</th>}
                    {visibleColumns.outQty && <th style={{ textAlign: 'right', width: 100 }}>Out Qty</th>}
                    {visibleColumns.outRate && <th style={{ textAlign: 'right', width: 100 }}>Out Rate</th>}
                    {visibleColumns.outAmt && <th style={{ textAlign: 'right', width: 120 }}>Out Amt</th>}
                    {visibleColumns.closingQty && <th style={{ textAlign: 'right', width: 100 }}>Closing Qty</th>}
                    {visibleColumns.closingRate && <th style={{ textAlign: 'right', width: 100 }}>Closing Rate</th>}
                    {visibleColumns.closingAmt && <th style={{ textAlign: 'right', width: 120 }}>Closing Amt</th>}
                  </tr>
                </thead>
                <tbody>
                  {processedRows.map(row => (
                    <tr key={row.key} className="tb-tr">
                      <td className="tb-td-particulars" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {row.name}
                      </td>
                      {visibleColumns.code && <td style={{ textAlign: 'left', color: 'var(--text-secondary)' }}>{row.code}</td>}
                      {visibleColumns.hsCode && <td style={{ textAlign: 'left' }}>{row.hsCode || '—'}</td>}
                      {visibleColumns.group && <td style={{ textAlign: 'left' }}>{row.group}</td>}
                      {visibleColumns.godown && <td style={{ textAlign: 'left' }}>{row.godown}</td>}
                      {visibleColumns.openingQty && <td className="tb-val">{formatNumber(row.openingQty)}</td>}
                      
                      {/* Inject active custom formula values dynamically */}
                      {activeCustomColumns.map(cc => {
                        const sourceVal = row[cc.sourceColumn] || 0;
                        const calcVal = evaluateCustomFormula(row, cc.formula, sourceVal);
                        return (
                          <td key={cc.id} className="tb-val" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                            {formatNumber(calcVal)}
                          </td>
                        );
                      })}

                      {visibleColumns.openingRate && <td className="tb-val">{formatNumber(row.openingRate, 3)}</td>}
                      {visibleColumns.openingAmt && <td className="tb-val">{formatNumber(row.openingAmt)}</td>}
                      {visibleColumns.inQty && <td className="tb-val">{formatNumber(row.inQty)}</td>}
                      {visibleColumns.inRate && <td className="tb-val">{formatNumber(row.inRate, 3)}</td>}
                      {visibleColumns.inAmt && <td className="tb-val">{formatNumber(row.inAmt)}</td>}
                      {visibleColumns.outQty && <td className="tb-val">{formatNumber(row.outQty)}</td>}
                      {visibleColumns.outRate && <td className="tb-val">{formatNumber(row.outRate, 3)}</td>}
                      {visibleColumns.outAmt && <td className="tb-val">{formatNumber(row.outAmt)}</td>}
                      {visibleColumns.closingQty && <td className="tb-val">{formatNumber(row.closingQty)}</td>}
                      {visibleColumns.closingRate && <td className="tb-val">{formatNumber(row.closingRate, 3)}</td>}
                      {visibleColumns.closingAmt && <td className="tb-val">{formatNumber(row.closingAmt)}</td>}
                    </tr>
                  ))}
                  
                  {/* Totals Row */}
                  {processedRows.length > 0 && (
                    <tr className="tb-tr-group" style={{ background: 'var(--gray-100)', fontWeight: 800 }}>
                      <td style={{ textAlign: 'left', fontWeight: 800 }}>Total</td>
                      {visibleColumns.code && <td></td>}
                      {visibleColumns.hsCode && <td></td>}
                      {visibleColumns.group && <td></td>}
                      {visibleColumns.godown && <td></td>}
                      {visibleColumns.openingQty && <td style={{ textAlign: 'right' }}>{formatNumber(totals.qty)}</td>}
                      
                      {/* Inject active custom column totals dynamically */}
                      {activeCustomColumns.map(cc => {
                        const totalSource = totals[cc.sourceColumn === 'openingQty' ? 'qty' : cc.sourceColumn === 'openingAmt' ? 'amt' : cc.sourceColumn] || 0;
                        const calcTotal = evaluateCustomFormula(totals, cc.formula, totalSource);
                        return (
                          <td key={cc.id} style={{ textAlign: 'right', color: 'var(--accent-blue)', fontWeight: 800 }}>
                            {formatNumber(calcTotal)}
                          </td>
                        );
                      })}

                      {visibleColumns.openingRate && <td></td>}
                      {visibleColumns.openingAmt && <td style={{ textAlign: 'right' }}>{formatNumber(totals.amt)}</td>}
                      {visibleColumns.inQty && <td style={{ textAlign: 'right' }}>{formatNumber(totals.inQty)}</td>}
                      {visibleColumns.inRate && <td></td>}
                      {visibleColumns.inAmt && <td style={{ textAlign: 'right' }}>{formatNumber(totals.inAmt)}</td>}
                      {visibleColumns.outQty && <td style={{ textAlign: 'right' }}>{formatNumber(totals.outQty)}</td>}
                      {visibleColumns.outRate && <td></td>}
                      {visibleColumns.outAmt && <td style={{ textAlign: 'right' }}>{formatNumber(totals.outAmt)}</td>}
                      {visibleColumns.closingQty && <td style={{ textAlign: 'right' }}>{formatNumber(totals.closingQty)}</td>}
                      {visibleColumns.closingRate && <td></td>}
                      {visibleColumns.closingAmt && <td style={{ textAlign: 'right' }}>{formatNumber(totals.closingAmt)}</td>}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── HOVER SENSOR ZONE FOR EDGE ACTIVATION (FULL HEIGHT OF WRAPPER) ── */}
      <div 
        className="tb-hover-sensor"
        onMouseEnter={() => setSidebarOpen(true)}
      />

      {/* RIGHT: TOGGLE PANEL SIDEBAR (FULL HEIGHT UP TO BREADCRUMBS HEADER) ── */}
      <div 
        className={`tb-config-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
        onMouseLeave={() => {
          // Keep open until applied or manually closed
        }}
      >
        <div className="tb-sidebar-toggle-tab" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <CloseOutlined className="tb-toggle-icon" />
          ) : (
            <div className="tb-filter-vertical-label">
              <FilterOutlined style={{ fontSize: 11 }} />
              <span>Filters</span>
            </div>
          )}
        </div>

        <div className="tb-sidebar-content">
          <div className="tb-sidebar-header">
            <span>Stock Filters</span>
            <span className="tb-reset-all" onClick={() => {
              setSelectProduct('');
              setSelectGroup('Select 0');
              setForBranch('All Branches');
              setGodownWise(true);
              setShowDetails(false);
              setBatchWiseDetails(false);
              setRackWiseDetails(false);
              setFixedProductDetails(false);
              setAltUnit1('None');
              setAltUnit2('None');
              setAltUnit3('None');
              setShowStandardRates(false);
              setProductCompany('');
              setProductType('');
            }}>Reset</span>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-select-item">
              <span className="tb-select-label-purple">Select Product</span>
              <Select value={selectProduct} onChange={setSelectProduct} className="tb-sidebar-select" style={{ width: '100%' }} placeholder="Search product">
                <Option value="">All Products</Option>
                <Option value="DH IPC HFW1230TC1">DH IPC HFW1230TC1</Option>
                <Option value="DELL LATITUDE 3440">DELL LATITUDE 3440</Option>
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Select Group</span>
              <Select value={selectGroup} onChange={setSelectGroup} className="tb-sidebar-select" style={{ width: '100%' }}>
                <Option value="Select 0">Select 0</Option>
                <Option value="Group A">Group A</Option>
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">For Branch</span>
              <Select value={forBranch} onChange={setForBranch} className="tb-sidebar-select" style={{ width: '100%' }}>
                {BRANCH_LIST.map(b => <Option key={b} value={b}>{b}</Option>)}
              </Select>
            </div>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-config-item">
              <Checkbox checked={godownWise} onChange={e => setGodownWise(e.target.checked)}>
                GODOWN WISE
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showDetails} onChange={e => setShowDetails(e.target.checked)}>
                SHOW DETAILS
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={batchWiseDetails} onChange={e => setBatchWiseDetails(e.target.checked)}>
                BATCH WISE DETAILS
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={rackWiseDetails} onChange={e => setRackWiseDetails(e.target.checked)}>
                RACK WISE DETAILS
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={fixedProductDetails} onChange={e => setFixedProductDetails(e.target.checked)}>
                FIXED PRODUCT DETAILS
              </Checkbox>
            </div>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-select-item">
              <span className="tb-select-label-purple">Alternate Units 1</span>
              <Select value={altUnit1} onChange={setAltUnit1} className="tb-sidebar-select" style={{ width: '100%' }}>
                {ALTERNATE_UNITS.map(u => <Option key={u} value={u}>{u}</Option>)}
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Alternate Units 2</span>
              <Select value={altUnit2} onChange={setAltUnit2} className="tb-sidebar-select" style={{ width: '100%' }}>
                {ALTERNATE_UNITS.map(u => <Option key={u} value={u}>{u}</Option>)}
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Alternate Units 3</span>
              <Select value={altUnit3} onChange={setAltUnit3} className="tb-sidebar-select" style={{ width: '100%' }}>
                {ALTERNATE_UNITS.map(u => <Option key={u} value={u}>{u}</Option>)}
              </Select>
            </div>

            <div className="tb-config-item" style={{ marginTop: 6 }}>
              <Checkbox checked={showStandardRates} onChange={e => setShowStandardRates(e.target.checked)}>
                SHOW STANDARD RATES
              </Checkbox>
            </div>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-select-item">
              <span className="tb-select-label-purple">Product Company</span>
              <Select value={productCompany} onChange={setProductCompany} className="tb-sidebar-select" style={{ width: '100%' }} placeholder="Select company">
                <Option value="">All Companies</Option>
                <Option value="Dahua">Dahua</Option>
                <Option value="Dell">Dell</Option>
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Product Type</span>
              <Select value={productType} onChange={setProductType} className="tb-sidebar-select" style={{ width: '100%' }} placeholder="Select type">
                <Option value="">All Types</Option>
                <Option value="Hardware">Hardware</Option>
                <Option value="Software">Software</Option>
              </Select>
            </div>
          </div>

          <div className="tb-sidebar-separator" />

          <div className="tb-sidebar-apply-container">
            <Button type="primary" block icon={<CheckOutlined />} className="tb-sidebar-apply-btn" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
