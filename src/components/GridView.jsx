import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, DatePicker, Input, Space, Tag, Popconfirm, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, PrinterOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { mockDb } from '../data/mockDb';

const { RangePicker } = DatePicker;

// Column definitions per module (detected from href)
function getColDefs(href, onDelete) {
  const actionsCol = {
    headerName: 'Actions',
    field: 'actions',
    width: 90,
    pinned: 'right',
    sortable: false,
    cellRenderer: (p) => (
      <Space size={4}>
        <Tooltip title="Edit"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#4f46e5' }} /></Tooltip>
        <Popconfirm title="Delete this record?" okText="Yes" cancelText="No" onConfirm={() => onDelete(p.data.id)}>
          <Tooltip title="Delete"><Button type="text" size="small" icon={<DeleteOutlined />} danger /></Tooltip>
        </Popconfirm>
      </Space>
    )
  };

  if (href?.includes('Ledger') && !href?.includes('Group')) return [
    { headerName: 'Code', field: 'code', width: 90, pinned: 'left' },
    { headerName: 'Ledger Name', field: 'name', flex: 1 },
    { headerName: 'Group', field: 'group', width: 160 },
    { headerName: 'Balance', field: 'balance', width: 130, type: 'numericColumn', cellStyle: { fontWeight: 600 } },
    { headerName: 'Dr/Cr', field: 'drCr', width: 70, cellRenderer: p => <Tag color={p.value === 'Dr' ? 'red' : 'green'} style={{fontSize:10}}>{p.value}</Tag> },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
  if (href?.includes('Invoice') || href?.includes('SalesReturn') || href?.includes('PurchaseReturn')) return [
    { headerName: 'Invoice No', field: 'code', width: 110, pinned: 'left' },
    { headerName: 'Date', field: 'date', width: 100 },
    { headerName: 'Party Name', field: 'name', flex: 1 },
    { headerName: 'Grand Total', field: 'balance', width: 120, type: 'numericColumn', cellStyle: { fontWeight: 700 } },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
  if (href?.includes('Receipt') || href?.includes('Payment') || href?.includes('Journal')) return [
    { headerName: 'Voucher No', field: 'code', width: 110, pinned: 'left' },
    { headerName: 'Date', field: 'date', width: 100 },
    { headerName: 'Cash/Bank', field: 'group', width: 140 },
    { headerName: 'Particulars', field: 'name', flex: 1 },
    { headerName: 'Amount (Rs.)', field: 'balance', width: 130, type: 'numericColumn', cellStyle: { fontWeight: 600 } },
    { headerName: 'Narration', field: 'narration', flex: 1 },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
  if (href?.includes('Customer')) return [
    { headerName: 'Code', field: 'code', width: 90, pinned: 'left' },
    { headerName: 'Customer Name', field: 'name', flex: 1 },
    { headerName: 'Group', field: 'group', width: 160 },
    { headerName: 'Mobile', field: 'mobile', width: 120 },
    { headerName: 'Balance', field: 'balance', width: 120, type: 'numericColumn' },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
  if (href?.includes('Product')) return [
    { headerName: 'Code', field: 'code', width: 100, pinned: 'left' },
    { headerName: 'Product Name', field: 'name', flex: 1 },
    { headerName: 'Group', field: 'group', width: 140 },
    { headerName: 'Unit', field: 'baseUnit', width: 80 },
    { headerName: 'Stock Qty', field: 'balance', width: 110, type: 'numericColumn' },
    { headerName: 'Rate (Rs.)', field: 'rate', width: 110, type: 'numericColumn' },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
  // Default
  return [
    { headerName: 'S.N.', field: 'id', width: 70 },
    { headerName: 'Code', field: 'code', width: 100, pinned: 'left' },
    { headerName: 'Name / Description', field: 'name', flex: 1 },
    { headerName: 'Reference', field: 'group', width: 160 },
    { headerName: 'Amount (Rs.)', field: 'balance', width: 130, type: 'numericColumn' },
    { headerName: 'Status', field: 'status', width: 90, cellRenderer: p => <span className={`badge-${p.value?.toLowerCase()}`}>{p.value}</span> },
    actionsCol
  ];
}

export default function GridView({ tab, darkMode }) {
  const [quickFilter, setQuickFilter] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [records, setRecords] = useState([]);

  // Determine mockDb collection key based on href
  const dbKey = useMemo(() => {
    const href = tab?.href || '';
    if (href.includes('Ledger') && !href.includes('Group')) return 'ledgers';
    if (href.includes('Customer')) return 'customers';
    if (href.includes('Product')) return 'products';
    if (href.includes('Invoice') || href.includes('Receipt') || href.includes('Payment') || href.includes('Journal') || href.includes('Contra')) return 'transactions';
    return 'transactions';
  }, [tab?.href]);

  // Load records from mockDb
  const loadData = useCallback(() => {
    mockDb.init();
    let data = mockDb.get(dbKey);
    // Filter transactions by type if specific route is active
    if (dbKey === 'transactions') {
      const href = tab?.href || '';
      if (href.includes('SalesInvoice')) {
        data = data.filter(t => t.type === 'Sales');
      } else if (href.includes('PurchaseInvoice')) {
        data = data.filter(t => t.type === 'Purchase');
      } else if (href.includes('Receipt')) {
        data = data.filter(t => t.type === 'Receipt');
      } else if (href.includes('Payment')) {
        data = data.filter(t => t.type === 'Payment');
      } else if (href.includes('Journal')) {
        data = data.filter(t => t.type === 'Journal');
      } else if (href.includes('Contra')) {
        data = data.filter(t => t.type === 'Contra');
      }
    }
    setRecords(data);
  }, [dbKey, tab?.href]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Delete handler
  const handleDelete = useCallback((id) => {
    mockDb.delete(dbKey, id);
    loadData();
  }, [dbKey, loadData]);

  const columnDefs = useMemo(() => getColDefs(tab?.href, handleDelete), [tab?.href, handleDelete]);

  const defaultColDef = useMemo(() => ({
    sortable: true, resizable: true, filter: true,
    floatingFilter: false, suppressMenu: false,
  }), []);

  const statusBar = useMemo(() => ({
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agSelectedRowCountComponent', align: 'center' },
      { statusPanel: 'agAggregationComponent', align: 'right' },
    ],
  }), []);

  const onExportExcel = useCallback(() => {
    gridApi?.exportDataAsExcel({ fileName: `${tab?.text || 'Report'}_Export.xlsx` });
  }, [gridApi, tab]);

  return (
    <div className="erp-grid-view">
      {/* TOOLBAR */}
      <div className="erp-grid-toolbar">
        <span className="erp-grid-toolbar-title">{tab?.text} — Records</span>
        <RangePicker size="small" style={{ fontSize: 12 }} />
        <Input
          prefix={<SearchOutlined />}
          placeholder="Quick search..."
          size="small"
          value={quickFilter}
          onChange={e => setQuickFilter(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Button size="small" icon={<ReloadOutlined />} onClick={loadData}>Refresh</Button>
        <Button size="small" icon={<PrinterOutlined />}>Print</Button>
        <Button size="small" icon={<DownloadOutlined />} type="primary" onClick={onExportExcel}>Export Excel</Button>
      </div>

      {/* AG GRID */}
      <div className={darkMode ? "ag-theme-alpine-dark" : "ag-theme-alpine"} style={{ height: 480, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={records}
          rowHeight={36}
          headerHeight={38}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          statusBar={statusBar}
          rowSelection="multiple"
          enableRangeSelection
          animateRows
          pagination
          paginationPageSize={15}
          onGridReady={p => setGridApi(p.api)}
        />
      </div>
    </div>
  );
}
