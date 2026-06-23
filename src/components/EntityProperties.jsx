import React, { useState, useMemo } from 'react';
import {
  Button, Select, Input, Checkbox, Tooltip, notification, Tag,
} from 'antd';
import {
  SyncOutlined, ReloadOutlined, CodeOutlined,
  SearchOutlined, SaveOutlined, ThunderboltOutlined,
  ControlOutlined, DatabaseOutlined, FilterOutlined,
  FullscreenOutlined, FullscreenExitOutlined,
} from '@ant-design/icons';

const { Option } = Select;

/* ═══════════════════════════════════════════════════════════════
   ENTITY PROPERTIES — Mock schema data
   Mirrors the Tigg ERP "Entity Properties" screen exactly.
   ═══════════════════════════════════════════════════════════════ */

const MODULES = ['Account', 'Inventory', 'Setup', 'HR', 'Assets'];
const ENTITY_TYPES = ['Creation', 'Transaction', 'Reporting', 'Security'];

const ENTITIES_BY_MODULE = {
  Account: { Creation: ['Ledger', 'Customer', 'LedgerGroup', 'SalesMan', 'Currency', 'AreaMaster', 'VoucherMode'], Transaction: ['Receipt', 'Payment', 'Journal', 'Contra'] },
  Inventory: { Creation: ['Product', 'ProductGroup', 'Warehouse', 'Unit'], Transaction: ['SalesInvoice', 'PurchaseInvoice', 'DeliveryNote'] },
  Setup: { Creation: ['CompanyDetail', 'DocumentType', 'ReportTemplate'], Security: ['User', 'UserGroup', 'Branch'] },
  HR: { Creation: ['Employee', 'Department', 'Designation'], Transaction: ['Attendance', 'Leave'] },
  Assets: { Creation: ['AssetGroup', 'AssetType', 'AssetsMaster'], Transaction: ['AssetsInward', 'AssetTransfer'] },
};

/* Full property schema for Ledger (Account/Creation) */
const LEDGER_PROPERTIES = [
  { properties: 'LedgerGroupId', alias: '', label: 'Group', dataType: 'Int32', defaultValue: '0', isMandatory: true, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'Notes', alias: '', label: 'Remarks', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'AgentId', alias: '', label: 'Salesman', dataType: 'Int32', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'CurrencyId', alias: '', label: 'Currency', dataType: 'Int32', defaultValue: '0', isMandatory: true, mandatoryMsg: '', showHide: 'Hide', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'CreditLimitAmount', alias: '', label: 'Credit Limit', dataType: 'Double', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'CreditLimitDays', alias: '', label: 'Credit Days', dataType: 'Int32', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'CreditLimitDaysType', alias: '', label: 'Credit Days', dataType: 'Int32', defaultValue: '1', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'AccountNo', alias: '', label: 'Bank Account', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'AreaId', alias: '', label: 'Area', dataType: 'Int32', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'Address', alias: '', label: 'Address', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'Status', alias: '', label: 'Status', dataType: 'Boolean', defaultValue: 'true', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'BillWiseAdjustment', alias: '', label: 'BillWise Adjus', dataType: 'Boolean', defaultValue: 'false', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'InventoryValuesAreAffected', alias: '', label: 'Inventory Val.', dataType: 'Boolean', defaultValue: 'false', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'CostCentersAreApplied', alias: '', label: 'Cost Centers', dataType: 'Boolean', defaultValue: 'false', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'ActiveInterestCalculation', alias: '', label: 'Active Interes', dataType: 'Boolean', defaultValue: 'false', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'OpeningAmount', alias: '', label: 'Opening Bala.', dataType: 'Double', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'DFC*', alias: '', label: 'DrCr', dataType: 'Int32', defaultValue: '1', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'ContactPersons.Name', alias: '', label: 'Name', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'ContactPersons.Post', alias: '', label: 'Designation', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'ContactPersons.ContactNo', alias: '', label: 'Contact No', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'ContactPersons.Email', alias: '', label: 'Email', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  { properties: 'OpeningVatAmount', alias: '', label: 'Opening VAT', dataType: 'Double', defaultValue: '0', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
];

/* Generic placeholder properties for other entities */
function generateGenericProps(entity) {
  return [
    { properties: `${entity}Id`, alias: '', label: 'ID', dataType: 'Int32', defaultValue: '0', isMandatory: true, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'Name', alias: '', label: 'Name', dataType: 'String', defaultValue: '', isMandatory: true, mandatoryMsg: '', showHide: 'Show', maxLen: '100', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'Code', alias: '', label: 'Code', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '20', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'Description', alias: '', label: 'Description', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'Status', alias: '', label: 'Status', dataType: 'Boolean', defaultValue: 'true', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'Notes', alias: '', label: 'Remarks', dataType: 'String', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Show', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'CreatedDate', alias: '', label: 'Created Date', dataType: 'DateTime', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Hide', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
    { properties: 'ModifiedDate', alias: '', label: 'Modified Date', dataType: 'DateTime', defaultValue: '', isMandatory: false, mandatoryMsg: '', showHide: 'Hide', maxLen: '0', minLen: '0', dropDownList: '', colWidth: '0', formula: '', source: '', filterPara: '' },
  ];
}

/* DataType color badge */
const DATA_TYPE_COLORS = {
  Int32:    { bg: '#e8f0fe', color: '#3c4fe0', border: '#c3d0fb' },
  String:   { bg: '#e6f4ea', color: '#1a6b36', border: '#b8dfc5' },
  Double:   { bg: '#fce8e6', color: '#c5221f', border: '#f5b8b4' },
  Boolean:  { bg: '#fff3e0', color: '#b06000', border: '#ffd08a' },
  DateTime: { bg: '#f3e8fd', color: '#7c3aed', border: '#d8b4fe' },
};

function DataTypeBadge({ type }) {
  const style = DATA_TYPE_COLORS[type] || { bg: '#f0f0f0', color: '#555', border: '#ddd' };
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 10,
      fontWeight: 700,
      padding: '1px 7px',
      borderRadius: 5,
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
    }}>
      {type}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */
export default function EntityProperties({ darkMode }) {
  const [module, setModule]         = useState('Account');
  const [entityType, setEntityType] = useState('Creation');
  const [entity, setEntity]         = useState('Ledger');
  const [search, setSearch]         = useState('');
  const [rows, setRows]             = useState(LEDGER_PROPERTIES.map((r, i) => ({ ...r, _id: i })));
  const [dirty, setDirty]           = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* entity list by module + type */
  const entityOptions = useMemo(() => {
    return (ENTITIES_BY_MODULE[module]?.[entityType] || []);
  }, [module, entityType]);

  /* load properties on entity change */
  const loadProperties = (ent) => {
    setEntity(ent);
    const data = ent === 'Ledger' ? LEDGER_PROPERTIES : generateGenericProps(ent);
    setRows(data.map((r, i) => ({ ...r, _id: i })));
    setDirty(false);
  };

  /* filter rows by search */
  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(r =>
      r.properties.toLowerCase().includes(q) ||
      r.label.toLowerCase().includes(q) ||
      r.dataType.toLowerCase().includes(q)
    );
  }, [rows, search]);

  /* update a cell */
  const updateCell = (id, field, value) => {
    setRows(prev => prev.map(r => r._id === id ? { ...r, [field]: value } : r));
    setDirty(true);
  };

  const handleSave = () => {
    setDirty(false);
    notification.success({ message: 'Entity properties saved!', description: `${entity} configuration updated.`, placement: 'topRight', duration: 3 });
  };

  const handleReset = () => {
    const data = entity === 'Ledger' ? LEDGER_PROPERTIES : generateGenericProps(entity);
    setRows(data.map((r, i) => ({ ...r, _id: i })));
    setDirty(false);
    notification.info({ message: 'Reset to default', description: 'All properties reverted to defaults.', placement: 'topRight', duration: 2 });
  };

  const handleAction = (type, row) => {
    const labels = { C: 'Constraint Editor', B: 'Business Rule', F: 'Filter / Formula' };
    notification.info({ message: `${labels[type]} — ${row.properties}`, description: 'Feature opens in a dialog (mock).', duration: 2 });
  };

  const colWidthStyle = { minWidth: 70, maxWidth: 90 };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      ...(isFullscreen ? {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999, background: 'var(--bg-layout)',
      } : {})
    }}>
      {/* ── PAGE HEADER ── */}
      <div className="erp-page-header" style={{ flexShrink: 0, alignItems: 'center', paddingBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="erp-page-title" style={{ paddingBottom: 0 }}>
            Entity Properties
          </div>
          <div style={{ width: 1, height: 16, background: 'var(--border-color)' }}></div>
          <div className="erp-page-breadcrumb" style={{ paddingBottom: 0, marginTop: 2 }}>
            <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Setup</span>
            <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
            <span className="breadcrumb-link" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Entity Properties</span>
            <span style={{ color: 'var(--gray-300)', margin: '0 4px' }}>›</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Directory</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

      <div className={`ep-root${darkMode ? ' dark' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Filter Bar ── */}
      <div className="ep-filter-bar">
        <div className="ep-filter-group">
          <label className="ep-filter-label">Module</label>
          <Select
            value={module}
            onChange={v => { setModule(v); setEntityType('Creation'); const ents = ENTITIES_BY_MODULE[v]?.Creation || []; loadProperties(ents[0] || ''); }}
            style={{ width: 130 }}
            className="ep-select"
          >
            {MODULES.map(m => <Option key={m} value={m}>{m}</Option>)}
          </Select>
        </div>

        <div className="ep-filter-group">
          <label className="ep-filter-label">Entity Type</label>
          <Select
            value={entityType}
            onChange={v => { setEntityType(v); const ents = ENTITIES_BY_MODULE[module]?.[v] || []; loadProperties(ents[0] || ''); }}
            style={{ width: 140 }}
            className="ep-select"
          >
            {ENTITY_TYPES.map(t => <Option key={t} value={t}>{t}</Option>)}
          </Select>
        </div>

        <div className="ep-filter-group">
          <label className="ep-filter-label">Entity</label>
          <Select
            value={entity}
            onChange={loadProperties}
            style={{ width: 160 }}
            className="ep-select"
          >
            {entityOptions.map(e => <Option key={e} value={e}>{e}</Option>)}
          </Select>
        </div>

        <div className="ep-filter-divider" />

        {/* Action buttons */}
        <div className="ep-action-group">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={!dirty}
            className="ep-btn-primary"
          >
            Update Data
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            className="ep-btn-secondary"
          >
            Reset as Default
          </Button>
          <Button
            icon={<CodeOutlined />}
            className="ep-btn-secondary"
            onClick={() => notification.info({ message: 'Validation Function Editor', description: 'Opens a code editor (mock).', duration: 2 })}
          >
            Validation Function
          </Button>
        </div>

        {/* Search */}
        <div style={{ marginLeft: 'auto' }}>
          <Input
            prefix={<SearchOutlined style={{ color: 'var(--text-muted)', fontSize: 13 }} />}
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            style={{ width: 200, borderRadius: 7 }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="ep-table-wrap">
        <table className="ep-table">
          <thead>
            <tr>
              <th className="ep-th ep-col-properties">Properties</th>
              <th className="ep-th ep-col-alias">Alias</th>
              <th className="ep-th ep-col-label">Label</th>
              <th className="ep-th ep-col-datatype">DataType</th>
              <th className="ep-th ep-col-default">Default Value</th>
              <th className="ep-th ep-col-mandatory">Is Mandatory</th>
              <th className="ep-th ep-col-msg">Mandatory MSG</th>
              <th className="ep-th ep-col-showhide">Show Hide</th>
              <th className="ep-th ep-col-num">Max Len</th>
              <th className="ep-th ep-col-num">Min Len</th>
              <th className="ep-th ep-col-dropdown">DropDown List</th>
              <th className="ep-th ep-col-num">Col Width</th>
              <th className="ep-th ep-col-formula">Formula</th>
              <th className="ep-th ep-col-source">Source</th>
              <th className="ep-th ep-col-filter">Filter Para</th>
              <th className="ep-th ep-col-action">Action(Event)</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={row._id} className={`ep-tr${idx % 2 === 0 ? '' : ' ep-tr-alt'}`}>

                {/* Properties */}
                <td className="ep-td ep-col-properties">
                  <span className="ep-prop-name">{row.properties}</span>
                </td>

                {/* Alias */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.alias}
                    onChange={e => updateCell(row._id, 'alias', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Label */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input ep-cell-input-label"
                    value={row.label}
                    onChange={e => updateCell(row._id, 'label', e.target.value)}
                  />
                </td>

                {/* DataType */}
                <td className="ep-td ep-col-datatype">
                  <DataTypeBadge type={row.dataType} />
                </td>

                {/* Default Value */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.defaultValue}
                    onChange={e => updateCell(row._id, 'defaultValue', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Is Mandatory */}
                <td className="ep-td ep-col-center">
                  <Checkbox
                    checked={row.isMandatory}
                    onChange={e => updateCell(row._id, 'isMandatory', e.target.checked)}
                    className="ep-checkbox"
                  />
                </td>

                {/* Mandatory MSG */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.mandatoryMsg}
                    onChange={e => updateCell(row._id, 'mandatoryMsg', e.target.value)}
                    placeholder="—"
                    disabled={!row.isMandatory}
                  />
                </td>

                {/* Show Hide */}
                <td className="ep-td ep-col-showhide">
                  <select
                    className="ep-cell-select"
                    value={row.showHide}
                    onChange={e => updateCell(row._id, 'showHide', e.target.value)}
                  >
                    <option value="Show">Show</option>
                    <option value="Hide">Hide</option>
                    <option value="ReadOnly">ReadOnly</option>
                  </select>
                </td>

                {/* Max Len */}
                <td className="ep-td ep-col-center">
                  <input
                    className="ep-cell-input ep-cell-num"
                    value={row.maxLen}
                    onChange={e => updateCell(row._id, 'maxLen', e.target.value)}
                  />
                </td>

                {/* Min Len */}
                <td className="ep-td ep-col-center">
                  <input
                    className="ep-cell-input ep-cell-num"
                    value={row.minLen}
                    onChange={e => updateCell(row._id, 'minLen', e.target.value)}
                  />
                </td>

                {/* DropDown List */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.dropDownList}
                    onChange={e => updateCell(row._id, 'dropDownList', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Col Width */}
                <td className="ep-td ep-col-center">
                  <input
                    className="ep-cell-input ep-cell-num"
                    value={row.colWidth}
                    onChange={e => updateCell(row._id, 'colWidth', e.target.value)}
                  />
                </td>

                {/* Formula */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.formula}
                    onChange={e => updateCell(row._id, 'formula', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Source */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.source}
                    onChange={e => updateCell(row._id, 'source', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Filter Para */}
                <td className="ep-td">
                  <input
                    className="ep-cell-input"
                    value={row.filterPara}
                    onChange={e => updateCell(row._id, 'filterPara', e.target.value)}
                    placeholder="—"
                  />
                </td>

                {/* Action */}
                <td className="ep-td ep-col-action">
                  <div className="ep-action-btns">
                    <Tooltip title="Constraint Editor" placement="top">
                      <button className="ep-act-btn ep-act-c" onClick={() => handleAction('C', row)}>C</button>
                    </Tooltip>
                    <Tooltip title="Business Rule" placement="top">
                      <button className="ep-act-btn ep-act-b" onClick={() => handleAction('B', row)}>B</button>
                    </Tooltip>
                    <Tooltip title="Filter / Formula" placement="top">
                      <button className="ep-act-btn ep-act-f" onClick={() => handleAction('F', row)}>F</button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={16} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 13 }}>
                  <DatabaseOutlined style={{ fontSize: 28, display: 'block', marginBottom: 8 }} />
                  No properties found for "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Status Bar ── */}
      <div className="ep-statusbar">
        <span className="ep-status-info">
          <DatabaseOutlined style={{ marginRight: 5 }} />
          {filteredRows.length} of {rows.length} properties — {module} / {entityType} / <strong>{entity}</strong>
        </span>
        <span className="ep-status-hint">
          Tip: Click any cell to edit · C = Constraint · B = Business Rule · F = Filter Formula
        </span>
      </div>
    </div>
  </div>
  );
}
