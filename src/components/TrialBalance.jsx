import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  DatePicker, Select, Button, Input, Checkbox, Dropdown, Menu, Tooltip, notification
} from 'antd';
import {
  CalendarOutlined, SearchOutlined, FolderOpenOutlined, FilterOutlined,
  PrinterOutlined, FileExcelOutlined, FilePdfOutlined, LeftOutlined, RightOutlined,
  PlusOutlined, MinusOutlined, InfoCircleOutlined, DatabaseOutlined, SlidersOutlined,
  CloseOutlined, CheckOutlined, ClearOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

// ── Mock Data for Trial Balance ──
const TRIAL_BALANCE_DATA = [
  {
    key: '1',
    particulars: 'Primary',
    opening: -63236088.60,
    transactionDr: 2138033794.95,
    transactionCr: 2138033794.95,
    closing: -63236088.60,
    pdc: 20858624.15,
    pdcClosing: -84094712.75,
    alias: '',
    code: '001',
    isGroup: true,
    level: 0,
    children: [
      {
        key: '1-1',
        particulars: 'Capital Account',
        opening: -5000000.00,
        transactionDr: 0.00,
        transactionCr: 1500000.00,
        closing: -6500000.00,
        pdc: 0.00,
        pdcClosing: -6500000.00,
        alias: 'CAPITAL',
        code: '101',
        isGroup: true,
        level: 1,
        children: [
          {
            key: '1-1-1',
            particulars: 'Share Capital',
            opening: -5000000.00,
            transactionDr: 0.00,
            transactionCr: 1500000.00,
            closing: -6500000.00,
            pdc: 0.00,
            pdcClosing: -6500000.00,
            alias: 'SC-01',
            code: '10101',
            isGroup: false,
            level: 2
          }
        ]
      },
      {
        key: '1-2',
        particulars: 'Current Assets',
        opening: 12450000.00,
        transactionDr: 54200000.00,
        transactionCr: 48900000.00,
        closing: 17750000.00,
        pdc: 500000.00,
        pdcClosing: 18250000.00,
        alias: 'CURR-ASSET',
        code: '102',
        isGroup: true,
        level: 1,
        children: [
          {
            key: '1-2-1',
            particulars: 'Bank Account',
            opening: 8450000.00,
            transactionDr: 34200000.00,
            transactionCr: 28900000.00,
            closing: 13750000.00,
            pdc: 500000.00,
            pdcClosing: 14250000.00,
            alias: 'BANKS',
            code: '10201',
            isGroup: true,
            level: 2,
            children: [
              {
                key: '1-2-1-1',
                particulars: 'Nabil Bank A/C',
                opening: 4450000.00,
                transactionDr: 18200000.00,
                transactionCr: 14900000.00,
                closing: 7750000.00,
                pdc: 200000.00,
                pdcClosing: 7950000.00,
                alias: 'NABIL-01',
                code: '1020101',
                isGroup: false,
                level: 3
              },
              {
                key: '1-2-1-2',
                particulars: 'Global IME Bank A/C',
                opening: 4000000.00,
                transactionDr: 16000000.00,
                transactionCr: 14000000.00,
                closing: 6000000.00,
                pdc: 300000.00,
                pdcClosing: 6300000.00,
                alias: 'GIBL-01',
                code: '1020102',
                isGroup: false,
                level: 3
              }
            ]
          },
          {
            key: '1-2-2',
            particulars: 'Cash-in-hand',
            opening: 4000000.00,
            transactionDr: 20000000.00,
            transactionCr: 20000000.00,
            closing: 4000000.00,
            pdc: 0.00,
            pdcClosing: 4000000.00,
            alias: 'CASH',
            code: '10202',
            isGroup: false,
            level: 2
          }
        ]
      },
      {
        key: '1-3',
        particulars: 'Diff. In Opening Balance',
        opening: 63236088.60,
        transactionDr: 0.00,
        transactionCr: 0.00,
        closing: 63236088.60,
        pdc: 0.00,
        pdcClosing: 63236088.60,
        alias: 'DIFF-OP',
        code: '999',
        isGroup: false,
        level: 1
      }
    ]
  }
];

const GROUPS_LIST = [
  'Primary', 'Capital Account', 'Current Assets', 'Fixed Assets',
  'Investments', 'Loans (Liability)', 'Current Liabilities', 'Suspense A/c'
];

const SEARCH_BY_OPTIONS = [
  'Particulars', 'Group', 'Nature', 'Opening', 'Opening Dr', 'Opening Cr',
  'Transaction Dr', 'Transaction Cr', 'Closing', 'Closing Dr', 'Closing Cr',
  'Alias', 'Code', 'PDC', 'PDC Closing'
];

export default function TrialBalance({ darkMode }) {
  // ── States ──
  const [fromDate, setFromDate] = useState(dayjs('2025-07-17'));
  const [toDate, setToDate] = useState(dayjs('2026-07-16'));
  const [group, setGroup] = useState('Primary');
  const [findType, setFindType] = useState('Contain');
  const [findSearch, setFindSearch] = useState('');
  const [searchBy, setSearchBy] = useState('Particulars');
  const [gridSearch, setGridSearch] = useState('');
  const [expandedKeys, setExpandedKeys] = useState(new Set(['1', '1-1', '1-2', '1-2-1']));
  
  // Sidebar Drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // HUD state
  const [hudOpen, setHudOpen] = useState(false);
  const hudRef = useRef(null);
  const hudTriggerRef = useRef(null);

  // ── Sidebar / HUD Config Options (Buffered for manual apply) ──
  const [showZeroBalance, setShowZeroBalance] = useState(false);
  const [showPdc, setShowPdc] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showCostCenter, setShowCostCenter] = useState(false);
  const [showAsList, setShowAsList] = useState(false);
  const [showDebtorCreditors, setShowDebtorCreditors] = useState(true);
  const [showMonthWise, setShowMonthWise] = useState(false);
  const [subLedgerAs, setSubLedgerAs] = useState('Normal');
  const [brand, setBrand] = useState('');
  const [showOpClDrCr, setShowOpClDrCr] = useState(false);
  const [project, setProject] = useState('Select 0');
  const [printDateStyle, setPrintDateStyle] = useState('A.D.');

  // Applied values (this actually drives the table rows)
  const [appliedFilters, setAppliedFilters] = useState({
    showZeroBalance: false,
    showPdc: true,
    showDetails: true,
    showCostCenter: false,
    showAsList: false,
    showDebtorCreditors: true,
    showMonthWise: false,
    subLedgerAs: 'Normal',
    brand: '',
    showOpClDrCr: false,
    project: 'Select 0',
    printDateStyle: 'A.D.'
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
      showZeroBalance,
      showPdc,
      showDetails,
      showCostCenter,
      showAsList,
      showDebtorCreditors,
      showMonthWise,
      subLedgerAs,
      brand,
      showOpClDrCr,
      project,
      printDateStyle
    });
    setSidebarOpen(false);
    setHudOpen(false);
    notification.success({
      message: 'Filters Applied',
      description: 'The Trial Balance grid has been updated.',
      placement: 'topRight',
      duration: 2
    });
  };

  // Toggle node expansion
  const toggleExpand = (key) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const expandAllNodes = () => {
    const allKeys = new Set();
    const collectKeys = (nodes) => {
      nodes.forEach(n => {
        allKeys.add(n.key);
        if (n.children) collectKeys(n.children);
      });
    };
    collectKeys(TRIAL_BALANCE_DATA);
    setExpandedKeys(allKeys);
  };

  const collapseAllNodes = () => {
    setExpandedKeys(new Set());
  };

  // Helper to format values
  const formatCurrency = (val) => {
    if (val === undefined || val === null) return '—';
    const num = parseFloat(val);
    if (isNaN(num)) return '—';
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Recursive flat map or filtered tree based on sidebar & filter settings
  const processedRows = useMemo(() => {
    const filterAndFlatten = (nodes, parentVisible = true) => {
      let result = [];
      nodes.forEach(node => {
        // Apply Zero Balance filter
        const isZero = node.opening === 0 && node.transactionDr === 0 && node.transactionCr === 0 && node.closing === 0;
        if (appliedFilters.showZeroBalance && isZero) return;

        // Find/Search filter at the top level search box
        let matchesSearch = true;
        if (findSearch) {
          const s = findSearch.toLowerCase();
          const targetText = node.particulars.toLowerCase();
          if (findType === 'Contain') {
            matchesSearch = targetText.includes(s);
          } else if (findType === 'Prefix') {
            matchesSearch = targetText.startsWith(s);
          }
        }

        // Search By specific column filter
        let matchesGrid = true;
        if (gridSearch) {
          const gs = gridSearch.toLowerCase();
          if (searchBy === 'Particulars') matchesGrid = node.particulars.toLowerCase().includes(gs);
          else if (searchBy === 'Alias') matchesGrid = node.alias?.toLowerCase().includes(gs);
          else if (searchBy === 'Code') matchesGrid = node.code?.toLowerCase().includes(gs);
        }

        const passesFilters = matchesSearch && matchesGrid;

        const row = {
          ...node,
          visible: passesFilters,
          expanded: expandedKeys.has(node.key)
        };

        if (appliedFilters.showAsList) {
          // If we show as flat list, collect all leaves and nodes that pass filters
          if (passesFilters) {
            result.push({ ...row, level: 0 }); // reset level for flat list
          }
          if (node.children) {
            result = [...result, ...filterAndFlatten(node.children, parentVisible)];
          }
        } else {
          // Tree hierarchy
          result.push(row);
          if (node.children && expandedKeys.has(node.key)) {
            result = [...result, ...filterAndFlatten(node.children, parentVisible && row.expanded)];
          }
        }
      });
      return result;
    };

    return filterAndFlatten(TRIAL_BALANCE_DATA);
  }, [findSearch, findType, gridSearch, searchBy, expandedKeys, appliedFilters]);

  // Export dropdown menus
  const exportMenu = (
    <Menu items={[
      { key: 'excel', label: 'Export to Excel', icon: <FileExcelOutlined style={{ color: '#1d6f42' }} /> },
      { key: 'pdf', label: 'Export to PDF', icon: <FilePdfOutlined style={{ color: '#e01e22' }} /> },
    ]} />
  );

  return (
    <div className={`tb-wrapper ${darkMode ? 'dark' : ''}`}>
      
      {/* ── TOP FILTER CONTROL PANEL ── */}
      <div className="tb-filter-panel" style={{ position: 'relative' }}>
        
        {/* ── HUD OVERLAY PANEL (RECTANGULAR, FLOATS EXACTLY OVER FILTER PANEL ONLY) ── */}
        {hudOpen && (
          <div ref={hudRef} className="tb-hud-overlay-panel fade-in">
            <div className="tb-hud-overlay-left">
              <span className="tb-hud-overlay-title">Quick View Controls</span>
              <span className="tb-hud-overlay-subtitle">Configure grid visibility & date styles</span>
              <div className="tb-hud-overlay-actions">
                <span className="tb-hud-overlay-reset" onClick={() => {
                  setShowZeroBalance(false);
                  setShowPdc(true);
                  setShowDetails(true);
                  setShowCostCenter(false);
                  setShowAsList(false);
                  setShowDebtorCreditors(true);
                  setShowMonthWise(false);
                  setSubLedgerAs('Normal');
                  setBrand('');
                  setShowOpClDrCr(false);
                  setProject('Select 0');
                  setPrintDateStyle('A.D.');
                }}>Reset to Default</span>
              </div>
            </div>

            <div className="tb-hud-overlay-middle">
              {/* Checkboxes Group 1 */}
              <div className="tb-hud-overlay-column">
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showZeroBalance} onChange={e => setShowZeroBalance(e.target.checked)}>
                    ZERO BAL
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showPdc} onChange={e => setShowPdc(e.target.checked)}>
                    SHOW PDC
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showDetails} onChange={e => setShowDetails(e.target.checked)}>
                    DETAILS
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showCostCenter} onChange={e => setShowCostCenter(e.target.checked)}>
                    COSTCENTER
                  </Checkbox>
                </div>
              </div>

              {/* Checkboxes Group 2 */}
              <div className="tb-hud-overlay-column">
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showAsList} onChange={e => setShowAsList(e.target.checked)}>
                    AS LIST
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showDebtorCreditors} onChange={e => setShowDebtorCreditors(e.target.checked)}>
                    DEBT/CRED
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showMonthWise} onChange={e => setShowMonthWise(e.target.checked)}>
                    MONTH WISE
                  </Checkbox>
                </div>
                <div className="tb-hud-overlay-item">
                  <Checkbox checked={showOpClDrCr} onChange={e => setShowOpClDrCr(e.target.checked)}>
                    OP/CL DRCR
                  </Checkbox>
                </div>
              </div>

              {/* Selects Group 1 */}
              <div className="tb-hud-overlay-column select-column">
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Sub Ledger</span>
                  <Select value={subLedgerAs} onChange={setSubLedgerAs} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    <Option value="Normal">Normal</Option>
                    <Option value="Detailed">Detailed</Option>
                  </Select>
                </div>
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Brand</span>
                  <Select value={brand} onChange={setBrand} size="small" className="tb-hud-select" style={{ width: '100%' }} placeholder="Brand">
                    <Option value="">None</Option>
                    <Option value="Brand A">Brand A</Option>
                  </Select>
                </div>
              </div>

              {/* Selects Group 2 */}
              <div className="tb-hud-overlay-column select-column">
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Project</span>
                  <Select value={project} onChange={setProject} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    <Option value="Select 0">Select 0</Option>
                    <Option value="Project Alpha">Project Alpha</Option>
                  </Select>
                </div>
                <div className="tb-hud-overlay-select-field">
                  <span className="tb-hud-overlay-select-label">Date Style</span>
                  <Select value={printDateStyle} onChange={setPrintDateStyle} size="small" className="tb-hud-select" style={{ width: '100%' }}>
                    <Option value="A.D.">A.D.</Option>
                    <Option value="B.S.">B.S.</Option>
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
              format="YYYY-MM-DD"
              suffixIcon={<CalendarOutlined />}
              className="tb-datepicker"
            />
          </div>
          
          <div className="tb-field-group">
            <span className="tb-field-label">To:</span>
            <DatePicker
              value={toDate}
              onChange={setToDate}
              format="YYYY-MM-DD"
              suffixIcon={<CalendarOutlined />}
              className="tb-datepicker"
            />
          </div>
          
          <div className="tb-field-group" style={{ flex: 1, minWidth: 200 }}>
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

          <Button type="primary" icon={<DatabaseOutlined />} className="tb-load-btn">
            Load
          </Button>
        </div>

        {/* ── SECONDARY FILTER ROW (FIND & GRID SEARCH + HUD TRIGGER) ── */}
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
              style={{ width: 130 }}
              className="tb-select"
            >
              {SEARCH_BY_OPTIONS.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
            
            {/* Shifting grid search box left to place HUD trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
              <Input
                placeholder="Search in grid..."
                value={gridSearch}
                onChange={e => setGridSearch(e.target.value)}
                style={{ width: 130 }}
                className="tb-input"
              />
              <Button icon={<SearchOutlined />} size="small" />
              
              {/* ── HUD TRIGGER BUTTON ── */}
              <Tooltip title="View Controls HUD">
                <Button
                  ref={hudTriggerRef}
                  icon={<SlidersOutlined />}
                  onClick={() => setHudOpen(!hudOpen)}
                  className={`tb-hud-trigger-btn ${hudOpen ? 'active' : ''}`}
                />
              </Tooltip>

              {/* Removed old compact HUD block from here since it is now a full overlay above */}
            </div>

            <div className="tb-grid-actions">
              <Checkbox
                checked={expandedKeys.size > 2}
                onChange={e => e.target.checked ? expandAllNodes() : collapseAllNodes()}
                className="tb-checkbox"
              >
                Expand
              </Checkbox>

              <Tooltip title="Decrease Font Size">
                <Button size="small" icon={<MinusOutlined />} />
              </Tooltip>
              <Tooltip title="Print Report">
                <Button size="small" icon={<PrinterOutlined />} />
              </Tooltip>
              
              <Dropdown overlay={exportMenu} trigger={['click']}>
                <Button size="small" icon={<FileExcelOutlined />} />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN SPLIT CONTAINER (TABLE + SIDEBAR CONFIG) ── */}
      <div className="tb-main-container">
        
        {/* LEFT: THE FINANCIAL GRID */}
        <div className="tb-grid-container">
          <div className="tb-table-wrapper">
            <table className="tb-table">
              <thead>
                <tr>
                  <th className="tb-th-particulars">Particulars</th>
                  <th>Opening</th>
                  <th>Transaction Dr</th>
                  <th>Transaction Cr</th>
                  <th>Closing</th>
                  {appliedFilters.showPdc && <th>PDC</th>}
                  {appliedFilters.showPdc && <th>PDC Closing</th>}
                  <th>Alias</th>
                </tr>
              </thead>
              <tbody>
                {processedRows.map(row => {
                  const paddingLeft = appliedFilters.showAsList ? 10 : (row.level * 20) + 12;
                  
                  return (
                    <tr key={row.key} className={`tb-tr ${row.isGroup ? 'tb-tr-group' : ''}`}>
                      <td className="tb-td-particulars" style={{ paddingLeft }}>
                        {!appliedFilters.showAsList && row.isGroup && (
                          <span className="tb-expand-icon" onClick={() => toggleExpand(row.key)}>
                            {row.expanded ? <MinusOutlined /> : <PlusOutlined />}
                          </span>
                        )}
                        <span className="tb-node-text">{row.particulars}</span>
                        {row.code && <span className="tb-node-code">({row.code})</span>}
                      </td>
                      <td className={`tb-val ${row.opening < 0 ? 'tb-neg' : ''}`}>
                        {formatCurrency(Math.abs(row.opening))} {row.opening < 0 ? 'Cr' : 'Dr'}
                      </td>
                      <td className="tb-val">{formatCurrency(row.transactionDr)}</td>
                      <td className="tb-val">{formatCurrency(row.transactionCr)}</td>
                      <td className={`tb-val ${row.closing < 0 ? 'tb-neg' : ''}`}>
                        {formatCurrency(Math.abs(row.closing))} {row.closing < 0 ? 'Cr' : 'Dr'}
                      </td>
                      {appliedFilters.showPdc && <td className="tb-val">{formatCurrency(row.pdc)}</td>}
                      {appliedFilters.showPdc && (
                        <td className={`tb-val ${row.pdcClosing < 0 ? 'tb-neg' : ''}`}>
                          {formatCurrency(Math.abs(row.pdcClosing))} {row.pdcClosing < 0 ? 'Cr' : 'Dr'}
                        </td>
                      )}
                      <td className="tb-alias">{row.alias || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
        {/* Grip tab: transitions between "Filters" text/icon and "✕" Close icon */}
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
            <span>Report Filters</span>
            <span className="tb-reset-all" onClick={() => {
              setShowZeroBalance(false);
              setShowPdc(true);
              setShowDetails(true);
              setShowCostCenter(false);
              setShowAsList(false);
              setShowDebtorCreditors(true);
              setShowMonthWise(false);
              setSubLedgerAs('Normal');
              setBrand('');
              setShowOpClDrCr(false);
              setProject('Select 0');
              setPrintDateStyle('A.D.');
            }}>Reset</span>
          </div>
          
          <div className="tb-sidebar-section">
            <div className="tb-config-item">
              <Checkbox checked={showZeroBalance} onChange={e => setShowZeroBalance(e.target.checked)}>
                SHOW ZERO BALANCE
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showPdc} onChange={e => setShowPdc(e.target.checked)}>
                SHOW PDC
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showDetails} onChange={e => setShowDetails(e.target.checked)}>
                SHOW DETAILS
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showCostCenter} onChange={e => setShowCostCenter(e.target.checked)}>
                SHOW COSTCENTER
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showAsList} onChange={e => setShowAsList(e.target.checked)}>
                SHOW AS LIST
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showDebtorCreditors} onChange={e => setShowDebtorCreditors(e.target.checked)}>
                SHOW DEBTOR AND CREDITORS
              </Checkbox>
            </div>
            <div className="tb-config-item">
              <Checkbox checked={showMonthWise} onChange={e => setShowMonthWise(e.target.checked)}>
                SHOW MONTH WISE
              </Checkbox>
            </div>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-select-item">
              <span className="tb-select-label-purple">Sub Ledger As</span>
              <Select value={subLedgerAs} onChange={setSubLedgerAs} className="tb-sidebar-select" style={{ width: '100%' }}>
                <Option value="Normal">Normal</Option>
                <Option value="Detailed">Detailed</Option>
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Brand</span>
              <Select value={brand} onChange={setBrand} className="tb-sidebar-select" style={{ width: '100%' }} placeholder="Select brand">
                <Option value="">None</Option>
                <Option value="Brand A">Brand A</Option>
              </Select>
            </div>
          </div>

          <div className="tb-sidebar-section">
            <div className="tb-config-item">
              <Checkbox checked={showOpClDrCr} onChange={e => setShowOpClDrCr(e.target.checked)}>
                Show Opening/Closing DrCr
              </Checkbox>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Project</span>
              <Select value={project} onChange={setProject} className="tb-sidebar-select" style={{ width: '100%' }}>
                <Option value="Select 0">Select 0</Option>
                <Option value="Project Alpha">Project Alpha</Option>
              </Select>
            </div>

            <div className="tb-select-item">
              <span className="tb-select-label-purple">Print Date Style</span>
              <Select value={printDateStyle} onChange={setPrintDateStyle} className="tb-sidebar-select" style={{ width: '100%' }}>
                <Option value="A.D.">A.D.</Option>
                <Option value="B.S.">B.S.</Option>
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
