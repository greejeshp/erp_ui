/* ═══════════════════════════════════════════════════════════════
   quickCreateSchema.js
   Defines the "Create New" panel categories and modal field specs
   ═══════════════════════════════════════════════════════════════ */

// ── Shared option lists ──────────────────────────────────────────
export const LEDGER_GROUPS = [
  'Bank Accounts', 'Cash-in-hand', 'Sundry Debtors', 'Sundry Creditors',
  'Current Assets', 'Fixed Assets', 'Capital Account', 'Loans (Liability)',
  'Current Liabilities', 'Investments', 'Indirect Income', 'Direct Income',
  'Indirect Expenses', 'Direct Expenses',
];

export const PRODUCT_GROUPS = [
  'Electronics', 'Computers & Accessories', 'Peripherals', 'Networking',
  'Office Supplies', 'Furniture', 'Raw Materials', 'Finished Goods',
];

export const PRODUCT_UNITS = [
  'Pcs', 'Kg', 'Ltr', 'Box', 'Set', 'Meter', 'Pair', 'Dozen', 'Bundle',
];

export const CURRENCIES = [
  'NPR – Nepali Rupee', 'USD – US Dollar', 'EUR – Euro',
  'INR – Indian Rupee', 'GBP – British Pound',
];

export const PAYMENT_TYPES = ['Cash', 'Bank', 'Cheque', 'Online Transfer', 'Card'];

export const ASSET_TYPES = ['Furniture', 'Electronics', 'Vehicle', 'Machinery', 'Land & Building', 'Computer', 'Software'];

export const TASK_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

export const TICKET_CATEGORIES = ['Technical Issue', 'Billing', 'Feature Request', 'General Query', 'Bug Report'];

export const JOB_TYPES = ['Repair', 'Service', 'Installation', 'Maintenance', 'Inspection'];

export const VOUCHER_TYPES = [
  'Receipt', 'Payment', 'Journal', 'Contra', 'Sales', 'Purchase',
  'Credit Note', 'Debit Note',
];

// ── Panel categories (the dropdown grid) ────────────────────────
export const QUICK_CREATE_CATEGORIES = [
  {
    label: 'GENERAL',
    items: [
      { href: '/Account/Creation/Ledger',           title: 'Ledger',           icon: '📒' },
      { href: '/Account/Creation/LedgerGroup',      title: 'Ledger Group',     icon: '📁' },
      { href: '/Account/Creation/SalesMan',         title: 'Salesman',         icon: '👤' },
      { href: '/Account/Creation/AreaMaster',       title: 'Area Master',      icon: '📍' },
      { href: '/Account/Creation/Bank',             title: 'Bank',             icon: '🏦' },
      { href: '/Account/Creation/Currency',         title: 'Currency',         icon: '💱' },
      { href: '/Account/Creation/Department',       title: 'Department',       icon: '🏢' },
      { href: '/Account/Creation/PaymentTerms',     title: 'Payment Terms',    icon: '📅' },
      { href: '/Account/Creation/PaymentMode',      title: 'Payment Mode',     icon: '💳' },
      { href: '/Setup/Security/EntityProperties',    title: 'Entity Properties',icon: '⚙️' },
    ],
  },
  {
    label: 'INVENTORY',
    items: [
      { href: '/Inventory/Creation/Product',           title: 'Product',          icon: '📦' },
      { href: '/Inventory/Creation/ProductGroup',      title: 'Product Group',    icon: '📂' },
      { href: '/Inventory/Creation/ProductCompany',    title: 'Product Company',  icon: '🏭' },
      { href: '/Inventory/Creation/ProductCategories', title: 'Product Category', icon: '🗂️' },
      { href: '/Inventory/Creation/ProductBrand',      title: 'Product Brand',    icon: '🏷️' },
      { href: '/Inventory/Creation/Unit',              title: 'Product Unit',     icon: '📏' },
      { href: '/Inventory/Creation/Godown',            title: 'Godown',           icon: '🏪' },
    ],
  },
  {
    label: 'ACCOUNTING',
    items: [
      { href: '/Account/Transaction/Receipt',       title: 'Receipt',          icon: '💰' },
      { href: '/Account/Transaction/Payment',       title: 'Payment',          icon: '💸' },
      { href: '/Account/Transaction/Journal',       title: 'Journal',          icon: '📝' },
      { href: '/Account/Transaction/Contra',        title: 'Contra',           icon: '🔄' },
      { href: '/Account/Creation/VoucherMode',      title: 'Voucher Mode',     icon: '📋' },
      { href: '/Account/Creation/NarrationMaster',  title: 'Narration',        icon: '💬' },
      { href: '/Account/Creation/LedgerCategory',   title: 'Ledger Category',  icon: '🗃️' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { href: '/AssetsManagement/Creation/AssetsMaster', title: 'Asset',           icon: '⚙️' },
      { href: '/AssetsManagement/Creation/AssetGroup',   title: 'Asset Group',     icon: '📦' },
      { href: '/Task/Creation/CreateTask',               title: 'Task',            icon: '✅' },
      { href: '/Support/Creation/CreateTicket',          title: 'Support Ticket',  icon: '🎫' },
      { href: '/service/techtran/devicetype',            title: 'Device Type',     icon: '📱' },
      { href: '/Service/Creation/JobType',               title: 'Job Type',        icon: '🔧' },
    ],
  },
];

// ── Per-entity quick-create field schemas ────────────────────────
// Field types: 'text' | 'number' | 'select' | 'textarea' | 'email' | 'phone'
// span: 12 = half row, 24 = full row  (based on 24-col Ant grid)
export const QUICK_CREATE_FIELDS = {

  /* ── GENERAL ── */
  '/Account/Creation/Ledger': {
    title: 'New Ledger',
    subtitle: 'Create a ledger account in your chart of accounts',
    fields: [
      { key: 'name',    label: 'Ledger Name',   type: 'text',   required: true,  span: 24, placeholder: 'e.g. Nabil Bank A/C' },
      { key: 'group',   label: 'Ledger Group',  type: 'select', required: true,  span: 12, options: LEDGER_GROUPS, placeholder: 'Select group' },
      { key: 'alias',   label: 'Alias / Code',  type: 'text',   required: false, span: 12, placeholder: 'Short code' },
      { key: 'panVat',  label: 'PAN / VAT No.', type: 'text',   required: false, span: 12, placeholder: 'e.g. 500123456' },
      { key: 'mobile',  label: 'Mobile',        type: 'phone',  required: false, span: 12, placeholder: '98XXXXXXXX' },
      { key: 'address', label: 'Address',       type: 'text',   required: false, span: 24, placeholder: 'Street / City' },
    ],
  },

  '/Account/Creation/LedgerGroup': {
    title: 'New Ledger Group',
    subtitle: 'Create a parent group to categorize ledgers',
    fields: [
      { key: 'name',   label: 'Group Name',   type: 'text',   required: true,  span: 24, placeholder: 'e.g. Current Assets' },
      { key: 'under',  label: 'Under (Parent)',type: 'select', required: true,  span: 24, options: LEDGER_GROUPS, placeholder: 'Select parent group' },
    ],
  },

  '/Account/Creation/SalesMan': {
    title: 'New Salesman',
    subtitle: 'Add a salesman to track sales performance',
    fields: [
      { key: 'name',       label: 'Full Name',    type: 'text',   required: true,  span: 24, placeholder: 'e.g. Ram Prasad Shrestha' },
      { key: 'mobile',     label: 'Mobile',       type: 'phone',  required: true,  span: 12, placeholder: '98XXXXXXXX' },
      { key: 'email',      label: 'Email',        type: 'email',  required: false, span: 12, placeholder: 'email@example.com' },
      { key: 'area',       label: 'Area',         type: 'text',   required: false, span: 12, placeholder: 'Sales territory' },
      { key: 'commission', label: 'Commission %', type: 'number', required: false, span: 12, placeholder: '0.00' },
    ],
  },

  '/Account/Creation/AreaMaster': {
    title: 'New Area',
    subtitle: 'Define a sales or delivery area',
    fields: [
      { key: 'name',        label: 'Area Name',   type: 'text', required: true,  span: 24, placeholder: 'e.g. Kathmandu Valley' },
      { key: 'description', label: 'Description', type: 'text', required: false, span: 24, placeholder: 'Optional notes' },
    ],
  },

  '/Account/Creation/Bank': {
    title: 'New Bank',
    subtitle: 'Link a bank account to your chart of accounts',
    fields: [
      { key: 'name',      label: 'Bank Name',    type: 'text',   required: true,  span: 24, placeholder: 'e.g. Nabil Bank Ltd.' },
      { key: 'accountNo', label: 'Account No.',  type: 'text',   required: true,  span: 12, placeholder: 'Account number' },
      { key: 'ledger',    label: 'Ledger',       type: 'select', required: true,  span: 12, options: ['Nabil Bank A/C', 'Global IME Bank A/C', 'Kumari Bank A/C'], placeholder: 'Select ledger' },
      { key: 'branch',    label: 'Branch',       type: 'text',   required: false, span: 12, placeholder: 'Branch name' },
      { key: 'swift',     label: 'SWIFT Code',   type: 'text',   required: false, span: 12, placeholder: 'SWIFT / IBAN' },
    ],
  },

  '/Account/Creation/Currency': {
    title: 'New Currency',
    subtitle: 'Add a foreign currency for multi-currency transactions',
    fields: [
      { key: 'name',   label: 'Currency Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. US Dollar' },
      { key: 'symbol', label: 'Symbol',        type: 'text',   required: true,  span: 12, placeholder: 'e.g. $' },
      { key: 'code',   label: 'ISO Code',      type: 'text',   required: true,  span: 12, placeholder: 'e.g. USD' },
      { key: 'rate',   label: 'Exchange Rate', type: 'number', required: true,  span: 12, placeholder: '1.00' },
    ],
  },

  '/Account/Creation/Department': {
    title: 'New Department',
    subtitle: 'Create a department for cost center tracking',
    fields: [
      { key: 'name', label: 'Department Name', type: 'text', required: true, span: 24, placeholder: 'e.g. Finance & Accounts' },
      { key: 'code', label: 'Dept. Code',      type: 'text', required: false,span: 12, placeholder: 'Short code' },
    ],
  },

  '/Account/Creation/PaymentTerms': {
    title: 'New Payment Terms',
    subtitle: 'Define credit period terms for customers or vendors',
    fields: [
      { key: 'name',     label: 'Terms Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. Net 30' },
      { key: 'days',     label: 'Days',       type: 'number', required: true,  span: 12, placeholder: '30' },
      { key: 'discount', label: 'Discount %', type: 'number', required: false, span: 12, placeholder: '0.00' },
    ],
  },

  '/Account/Creation/PaymentMode': {
    title: 'New Payment Mode',
    subtitle: 'Add a mode of payment for transactions',
    fields: [
      { key: 'name', label: 'Mode Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. Fonepay / Esewa' },
      { key: 'type', label: 'Type',      type: 'select', required: true,  span: 12, options: PAYMENT_TYPES, placeholder: 'Select type' },
    ],
  },

  /* ── INVENTORY ── */
  '/Inventory/Creation/Product': {
    title: 'New Product',
    subtitle: 'Add a product or item to your inventory',
    fields: [
      { key: 'name',  label: 'Product Name',  type: 'text',   required: true,  span: 24, placeholder: 'e.g. Dell Latitude Laptop' },
      { key: 'group', label: 'Product Group', type: 'select', required: true,  span: 12, options: PRODUCT_GROUPS, placeholder: 'Select group' },
      { key: 'unit',  label: 'Unit',          type: 'select', required: true,  span: 12, options: PRODUCT_UNITS, placeholder: 'e.g. Pcs' },
      { key: 'code',  label: 'Product Code',  type: 'text',   required: false, span: 12, placeholder: 'SKU / Barcode' },
      { key: 'rate',  label: 'Sale Rate',     type: 'number', required: false, span: 12, placeholder: '0.00' },
    ],
  },

  '/Inventory/Creation/ProductGroup': {
    title: 'New Product Group',
    subtitle: 'Create a product category hierarchy node',
    fields: [
      { key: 'name',  label: 'Group Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. Laptops' },
      { key: 'under', label: 'Under',      type: 'select', required: false, span: 24, options: PRODUCT_GROUPS, placeholder: 'Select parent group' },
    ],
  },

  '/Inventory/Creation/ProductCompany': {
    title: 'New Product Company',
    subtitle: 'Add a product manufacturer or brand company',
    fields: [
      { key: 'name',    label: 'Company Name', type: 'text',  required: true,  span: 24, placeholder: 'e.g. Dell Technologies' },
      { key: 'country', label: 'Country',      type: 'text',  required: false, span: 12, placeholder: 'e.g. USA' },
      { key: 'contact', label: 'Contact',      type: 'phone', required: false, span: 12, placeholder: 'Phone number' },
    ],
  },

  '/Inventory/Creation/ProductCategories': {
    title: 'New Product Category',
    subtitle: 'Define a product classification category',
    fields: [
      { key: 'name',  label: 'Category Name',  type: 'text',   required: true,  span: 24, placeholder: 'e.g. Gaming Laptops' },
      { key: 'group', label: 'Product Group',  type: 'select', required: false, span: 24, options: PRODUCT_GROUPS, placeholder: 'Link to product group' },
    ],
  },

  '/Inventory/Creation/ProductBrand': {
    title: 'New Product Brand',
    subtitle: 'Add a brand name for product classification',
    fields: [
      { key: 'name',        label: 'Brand Name',   type: 'text', required: true,  span: 24, placeholder: 'e.g. Samsung' },
      { key: 'description', label: 'Description',  type: 'text', required: false, span: 24, placeholder: 'Optional notes' },
    ],
  },

  '/Inventory/Creation/Unit': {
    title: 'New Product Unit',
    subtitle: 'Define a unit of measurement for products',
    fields: [
      { key: 'name',   label: 'Unit Name',   type: 'text', required: true,  span: 12, placeholder: 'e.g. Kilogram' },
      { key: 'symbol', label: 'Symbol',      type: 'text', required: true,  span: 12, placeholder: 'e.g. Kg' },
    ],
  },

  '/Inventory/Creation/Godown': {
    title: 'New Godown / Warehouse',
    subtitle: 'Add a storage location for inventory',
    fields: [
      { key: 'name',     label: 'Godown Name', type: 'text', required: true,  span: 24, placeholder: 'e.g. Main Warehouse' },
      { key: 'location', label: 'Location',    type: 'text', required: false, span: 12, placeholder: 'City / Address' },
      { key: 'contact',  label: 'Contact',     type: 'phone',required: false, span: 12, placeholder: 'Phone number' },
    ],
  },

  /* ── ACCOUNTING TRANSACTIONS ── */
  '/Account/Transaction/Receipt': {
    title: 'Quick Receipt',
    subtitle: 'Record a quick cash or bank receipt',
    fields: [
      { key: 'party',   label: 'Party (Ledger)',  type: 'select', required: true,  span: 24, options: ['Himalayan Traders Pvt. Ltd.', 'Nepal Dairy Products', 'Everest Trading Co.', 'Vertex Solutions Pvt. Ltd.'], placeholder: 'Select party' },
      { key: 'amount',  label: 'Amount (NPR)',    type: 'number', required: true,  span: 12, placeholder: '0.00' },
      { key: 'bank',    label: 'Receipt Into',    type: 'select', required: true,  span: 12, options: ['Cash Ledger', 'Nabil Bank A/C', 'Global IME Bank A/C', 'Kumari Bank A/C'], placeholder: 'Cash / Bank' },
      { key: 'narration',label: 'Narration',      type: 'text',   required: false, span: 24, placeholder: 'Being received from...' },
    ],
  },

  '/Account/Transaction/Payment': {
    title: 'Quick Payment',
    subtitle: 'Record a quick cash or bank payment',
    fields: [
      { key: 'party',    label: 'Pay To (Ledger)', type: 'select', required: true,  span: 24, options: ['Himalayan Traders Pvt. Ltd.', 'Nepal Dairy Products', 'Office Rent Account', 'Salary Expenses'], placeholder: 'Select party' },
      { key: 'amount',   label: 'Amount (NPR)',    type: 'number', required: true,  span: 12, placeholder: '0.00' },
      { key: 'bank',     label: 'Pay From',        type: 'select', required: true,  span: 12, options: ['Cash Ledger', 'Nabil Bank A/C', 'Global IME Bank A/C', 'Kumari Bank A/C'], placeholder: 'Cash / Bank' },
      { key: 'narration', label: 'Narration',      type: 'text',   required: false, span: 24, placeholder: 'Being paid to...' },
    ],
  },

  '/Account/Transaction/Journal': {
    title: 'Quick Journal',
    subtitle: 'Pass a simple journal entry',
    fields: [
      { key: 'debit',    label: 'Debit Ledger',  type: 'select', required: true,  span: 12, options: LEDGER_GROUPS, placeholder: 'Select ledger' },
      { key: 'credit',   label: 'Credit Ledger', type: 'select', required: true,  span: 12, options: LEDGER_GROUPS, placeholder: 'Select ledger' },
      { key: 'amount',   label: 'Amount (NPR)',   type: 'number', required: true,  span: 12, placeholder: '0.00' },
      { key: 'narration', label: 'Narration',     type: 'text',   required: false, span: 12, placeholder: 'Being...' },
    ],
  },

  '/Account/Transaction/Contra': {
    title: 'Quick Contra',
    subtitle: 'Transfer between cash and bank accounts',
    fields: [
      { key: 'from',   label: 'From Account', type: 'select', required: true, span: 12, options: ['Cash Ledger', 'Nabil Bank A/C', 'Global IME Bank A/C'], placeholder: 'Source' },
      { key: 'to',     label: 'To Account',   type: 'select', required: true, span: 12, options: ['Cash Ledger', 'Nabil Bank A/C', 'Global IME Bank A/C'], placeholder: 'Destination' },
      { key: 'amount', label: 'Amount (NPR)',  type: 'number', required: true, span: 24, placeholder: '0.00' },
    ],
  },

  '/Account/Creation/VoucherMode': {
    title: 'New Voucher Mode',
    subtitle: 'Create a named voucher configuration',
    fields: [
      { key: 'name', label: 'Mode Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. Cash Sales Invoice' },
      { key: 'type', label: 'Type',      type: 'select', required: true,  span: 12, options: VOUCHER_TYPES, placeholder: 'Select type' },
    ],
  },

  '/Account/Creation/NarrationMaster': {
    title: 'New Narration',
    subtitle: 'Save a reusable narration template',
    fields: [
      { key: 'narration', label: 'Narration Text', type: 'textarea', required: true, span: 24, placeholder: 'e.g. Being received from party against invoice no...' },
    ],
  },

  '/Account/Creation/LedgerCategory': {
    title: 'New Ledger Category',
    subtitle: 'Create a classification category for ledgers',
    fields: [
      { key: 'name',        label: 'Category Name', type: 'text', required: true,  span: 24, placeholder: 'e.g. Key Customers' },
      { key: 'description', label: 'Description',   type: 'text', required: false, span: 24, placeholder: 'Optional notes' },
    ],
  },

  /* ── OPERATIONS ── */
  '/AssetsManagement/Creation/AssetsMaster': {
    title: 'New Asset',
    subtitle: 'Register a new fixed asset',
    fields: [
      { key: 'name',     label: 'Asset Name',     type: 'text',   required: true,  span: 24, placeholder: 'e.g. Dell Laptop #3' },
      { key: 'type',     label: 'Asset Type',     type: 'select', required: true,  span: 12, options: ASSET_TYPES, placeholder: 'Select type' },
      { key: 'date',     label: 'Purchase Date',  type: 'text',   required: true,  span: 12, placeholder: 'YYYY-MM-DD' },
      { key: 'cost',     label: 'Purchase Cost',  type: 'number', required: true,  span: 12, placeholder: '0.00' },
      { key: 'vendor',   label: 'Vendor / Supplier', type: 'text', required: false, span: 12, placeholder: 'Supplier name' },
    ],
  },

  '/AssetsManagement/Creation/AssetGroup': {
    title: 'New Asset Group',
    subtitle: 'Create a classification group for assets',
    fields: [
      { key: 'name',        label: 'Group Name',   type: 'text', required: true,  span: 24, placeholder: 'e.g. IT Equipment' },
      { key: 'description', label: 'Description',  type: 'text', required: false, span: 24, placeholder: 'Optional notes' },
    ],
  },

  '/Task/Creation/CreateTask': {
    title: 'New Task',
    subtitle: 'Create and assign a task to a team member',
    fields: [
      { key: 'title',      label: 'Task Title',    type: 'text',   required: true,  span: 24, placeholder: 'e.g. Reconcile bank statement for June' },
      { key: 'assignedTo', label: 'Assigned To',   type: 'select', required: true,  span: 12, options: ['Admin User', 'Accounts Manager', 'Inventory Lead', 'Sales Rep.'], placeholder: 'Select member' },
      { key: 'dueDate',    label: 'Due Date',      type: 'text',   required: true,  span: 12, placeholder: 'YYYY-MM-DD' },
      { key: 'priority',   label: 'Priority',      type: 'select', required: false, span: 12, options: TASK_PRIORITIES, placeholder: 'Select priority' },
      { key: 'notes',      label: 'Notes',         type: 'textarea',required: false,span: 24, placeholder: 'Additional details...' },
    ],
  },

  '/Support/Creation/CreateTicket': {
    title: 'New Support Ticket',
    subtitle: 'Raise a support request or issue',
    fields: [
      { key: 'title',    label: 'Issue Title',   type: 'text',   required: true,  span: 24, placeholder: 'Brief description of the issue' },
      { key: 'category', label: 'Category',      type: 'select', required: true,  span: 12, options: TICKET_CATEGORIES, placeholder: 'Select category' },
      { key: 'priority', label: 'Priority',      type: 'select', required: true,  span: 12, options: TASK_PRIORITIES, placeholder: 'Select priority' },
      { key: 'details',  label: 'Details',       type: 'textarea',required: false,span: 24, placeholder: 'Describe the issue in detail...' },
    ],
  },

  '/service/techtran/devicetype': {
    title: 'New Device Type',
    subtitle: 'Add a device classification for repair jobs',
    fields: [
      { key: 'name',        label: 'Device Type Name', type: 'text', required: true,  span: 24, placeholder: 'e.g. Smartphone' },
      { key: 'description', label: 'Description',      type: 'text', required: false, span: 24, placeholder: 'Optional notes' },
    ],
  },

  '/Service/Creation/JobType': {
    title: 'New Job Type',
    subtitle: 'Define a type of service/repair job',
    fields: [
      { key: 'name',    label: 'Job Type Name', type: 'text',   required: true,  span: 24, placeholder: 'e.g. Screen Replacement' },
      { key: 'type',    label: 'Category',      type: 'select', required: false, span: 12, options: JOB_TYPES, placeholder: 'Select category' },
      { key: 'chargeRate', label: 'Charge Rate', type: 'number', required: false, span: 12, placeholder: '0.00' },
    ],
  },
  '/Setup/Security/EntityProperties': {
    title: 'New Entity Property',
    subtitle: 'Define custom property fields for entities',
    fields: [
      { key: 'name',         label: 'Property Name',  type: 'text',   required: true,  span: 24, placeholder: 'e.g. Color, Size, Brand' },
      { key: 'entityType',   label: 'Entity Type',    type: 'select', required: true,  span: 12, options: ['Product', 'Ledger', 'Asset', 'Customer', 'Supplier'], placeholder: 'Select entity type' },
      { key: 'dataType',     label: 'Data Type',      type: 'select', required: true,  span: 12, options: ['Text', 'Number', 'Date', 'Boolean', 'Dropdown'], placeholder: 'Select data type' },
      { key: 'required',     label: 'Is Required',    type: 'select', required: false, span: 12, options: ['Yes', 'No'], placeholder: 'Select required' },
      { key: 'defaultValue', label: 'Default Value',  type: 'text',   required: false, span: 12, placeholder: 'e.g. N/A' },
    ],
  },
};
