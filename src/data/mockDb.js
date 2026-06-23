// Mock Database with LocalStorage persistence

const LEDGER_GROUPS_KEY = 'erp_db_ledger_groups';
const LEDGERS_KEY = 'erp_db_ledgers';
const CUSTOMERS_KEY = 'erp_db_customers';
const PRODUCTS_KEY = 'erp_db_products';
const TRANSACTIONS_KEY = 'erp_db_transactions';

const initialLedgerGroups = [
  'Bank Accounts', 'Cash-in-hand', 'Sundry Debtors', 'Sundry Creditors',
  'Current Assets', 'Fixed Assets', 'Capital Account', 'Loans (Liability)',
  'Current Liabilities', 'Investments', 'Indirect Income', 'Direct Income',
  'Indirect Expenses', 'Direct Expenses'
];

const initialLedgers = [
  { id: 1, code: 'LED-0001', name: 'Capital Account', group: 'Capital Account', balance: '1000000.00', drCr: 'Cr', status: 'active' },
  { id: 2, code: 'LED-0002', name: 'Nabil Bank A/C', group: 'Bank Accounts', balance: '450000.00', drCr: 'Dr', status: 'active' },
  { id: 3, code: 'LED-0003', name: 'Cash Ledger', group: 'Cash-in-hand', balance: '25000.00', drCr: 'Dr', status: 'active' },
  { id: 4, code: 'LED-0004', name: 'Office Rent Account', group: 'Indirect Expenses', balance: '120000.00', drCr: 'Dr', status: 'active' },
  { id: 5, code: 'LED-0005', name: 'Himalayan Traders Pvt. Ltd.', group: 'Sundry Creditors', balance: '89250.00', drCr: 'Cr', status: 'active' },
  { id: 6, code: 'LED-0006', name: 'Sunrise Corporation', group: 'Sundry Debtors', balance: '125600.00', drCr: 'Dr', status: 'active' },
  { id: 7, code: 'LED-0007', name: 'Nepal Dairy Products', group: 'Sundry Creditors', balance: '62400.00', drCr: 'Cr', status: 'active' },
  { id: 8, code: 'LED-0008', name: 'Global Tech Supplies', group: 'Sundry Creditors', balance: '89250.00', drCr: 'Cr', status: 'active' },
  { id: 9, code: 'LED-0009', name: 'Mountain View Retailers', group: 'Sundry Debtors', balance: '33750.00', drCr: 'Dr', status: 'active' }
];

const initialCustomers = [
  { id: 1, code: 'CUST-0001', name: 'Sunrise Corporation', group: 'Sundry Debtors', mobile: '9851098234', balance: '125600.00', status: 'active', address: 'Kathmandu, Nepal' },
  { id: 2, code: 'CUST-0002', name: 'Mountain View Retailers', group: 'Retail Customers', mobile: '9841298451', balance: '33750.00', status: 'active', address: 'Pokhara, Nepal' },
  { id: 3, code: 'CUST-0003', name: 'Himalayan Traders Pvt. Ltd.', group: 'Sundry Debtors', mobile: '9801234567', balance: '45000.00', status: 'active', address: 'Lalitpur, Nepal' }
];

const initialProducts = [
  { id: 1, code: 'PROD-0001', name: 'Dell Latitude Laptop', group: 'Computers & IT', baseUnit: 'Pcs', balance: '15', rate: '75000.00', status: 'active' },
  { id: 2, code: 'PROD-0002', name: 'HP LaserJet Printer', group: 'Computers & IT', baseUnit: 'Pcs', balance: '8', rate: '28000.00', status: 'active' },
  { id: 3, code: 'PROD-0003', name: 'Samsung 24" Monitor', group: 'Electronics', baseUnit: 'Pcs', balance: '22', rate: '18500.00', status: 'active' },
  { id: 4, code: 'PROD-0004', name: 'Logitech Wireless Mouse', group: 'Electronics', baseUnit: 'Pcs', balance: '50', rate: '1200.00', status: 'active' },
  { id: 5, code: 'PROD-0005', name: 'HDMI Cable 3m', group: 'Electronics', baseUnit: 'Pcs', balance: '120', rate: '450.00', status: 'active' }
];

const initialTransactions = [
  { id: 1, code: 'RCPT-0049', date: '2081-03-15', type: 'Receipt', group: 'Nabil Bank A/C', name: 'Himalayan Traders Pvt. Ltd.', balance: '45000.00', narration: 'Voucher receipt', status: 'active' },
  { id: 2, code: 'INV-0492', date: '2081-03-14', type: 'Sales', group: 'Sales Accounts', name: 'Sunrise Corporation', balance: '125600.00', narration: 'Sales invoice generated', status: 'active' },
  { id: 3, code: 'PYMT-0031', date: '2081-03-14', type: 'Payment', group: 'Cash Ledger', name: 'Nepal Dairy Products', balance: '62400.00', narration: 'Voucher payment', status: 'active' },
  { id: 4, code: 'PINV-0210', date: '2081-03-13', type: 'Purchase', group: 'Purchase Accounts', name: 'Global Tech Supplies', balance: '89250.00', narration: 'Purchase invoice received', status: 'active' },
  { id: 5, code: 'JRNL-0018', date: '2081-03-12', type: 'Journal', group: 'Office Rent Account', name: 'Depreciation Entry', balance: '15000.00', narration: 'Depreciation on Assets', status: 'active' },
  { id: 6, code: 'RCPT-0048', date: '2081-03-11', type: 'Receipt', group: 'Cash Ledger', name: 'Mountain View Retailers', balance: '33750.00', narration: 'Payment from client', status: 'active' }
];

const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export const mockDb = {
  init() {
    getStored(LEDGER_GROUPS_KEY, initialLedgerGroups);
    getStored(LEDGERS_KEY, initialLedgers);
    getStored(CUSTOMERS_KEY, initialCustomers);
    getStored(PRODUCTS_KEY, initialProducts);
    getStored(TRANSACTIONS_KEY, initialTransactions);
  },

  get(type) {
    this.init();
    switch (type) {
      case 'ledgerGroups': return getStored(LEDGER_GROUPS_KEY, initialLedgerGroups);
      case 'ledgers': return getStored(LEDGERS_KEY, initialLedgers);
      case 'customers': return getStored(CUSTOMERS_KEY, initialCustomers);
      case 'products': return getStored(PRODUCTS_KEY, initialProducts);
      case 'transactions': return getStored(TRANSACTIONS_KEY, initialTransactions);
      default: return [];
    }
  },

  save(type, data) {
    switch (type) {
      case 'ledgerGroups': setStored(LEDGER_GROUPS_KEY, data); break;
      case 'ledgers': setStored(LEDGERS_KEY, data); break;
      case 'customers': setStored(CUSTOMERS_KEY, data); break;
      case 'products': setStored(PRODUCTS_KEY, data); break;
      case 'transactions': setStored(TRANSACTIONS_KEY, data); break;
    }
  },

  add(type, item) {
    const data = this.get(type);
    const id = data.length > 0 ? Math.max(...data.map(i => i.id || 0)) + 1 : 1;
    const newItem = { id, ...item };
    data.push(newItem);
    this.save(type, data);
    return newItem;
  },

  delete(type, id) {
    let data = this.get(type);
    data = data.filter(item => item.id !== Number(id));
    this.save(type, data);
    return data;
  },

  update(type, id, updatedItem) {
    const data = this.get(type);
    const idx = data.findIndex(item => item.id === Number(id));
    if (idx !== -1) {
      data[idx] = { ...data[idx], ...updatedItem };
      this.save(type, data);
    }
    return data;
  }
};
