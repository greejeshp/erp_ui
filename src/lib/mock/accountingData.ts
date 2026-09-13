// Pivotal ERP — Accounting Mock Data (NFRS Chart of Accounts + Vouchers)

export interface Account {
  id: string;
  code: string;
  name: string;
  type: "Asset" | "Liability" | "Equity" | "Income" | "Expense";
  subType: string;
  parentId?: string;
  isGroup: boolean;
  isActive: boolean;
  openingBalance: number;
  currentBalance: number;
  normalBalance: "Dr" | "Cr";
}

export interface VoucherLine {
  id: string;
  accountId: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
}

export interface Voucher {
  id: string;
  voucherNo: string;
  type: "Journal" | "Payment" | "Receipt" | "Contra" | "Sales" | "Purchase";
  dateBS: string;
  dateAD: string;
  narration: string;
  lines: VoucherLine[];
  totalDebit: number;
  totalCredit: number;
  isPosted: boolean;
  createdBy: string;
  companyId: string;
  fiscalYearId: string;
}

// NFRS-compliant Chart of Accounts
export const CHART_OF_ACCOUNTS: Account[] = [
  // Assets
  { id: "a-1", code: "1000", name: "Assets", type: "Asset", subType: "Group", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Dr" },
  { id: "a-1-1", code: "1100", name: "Current Assets", type: "Asset", subType: "Group", parentId: "a-1", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Dr" },
  { id: "a-1-1-1", code: "1110", name: "Cash in Hand", type: "Asset", subType: "Cash", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 150000, currentBalance: 245000, normalBalance: "Dr" },
  { id: "a-1-1-2", code: "1120", name: "Cash at Bank", type: "Asset", subType: "Bank", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 850000, currentBalance: 1240000, normalBalance: "Dr" },
  { id: "a-1-1-3", code: "1130", name: "Accounts Receivable", type: "Asset", subType: "Receivable", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 320000, currentBalance: 580000, normalBalance: "Dr" },
  { id: "a-1-1-4", code: "1140", name: "Inventory", type: "Asset", subType: "Inventory", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 450000, currentBalance: 620000, normalBalance: "Dr" },
  { id: "a-1-1-5", code: "1150", name: "Advance Tax Paid (TDS)", type: "Asset", subType: "Tax", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 45000, normalBalance: "Dr" },
  { id: "a-1-1-6", code: "1160", name: "Input VAT Receivable", type: "Asset", subType: "Tax", parentId: "a-1-1", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 32500, normalBalance: "Dr" },
  { id: "a-1-2", code: "1200", name: "Non-Current Assets", type: "Asset", subType: "Group", parentId: "a-1", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Dr" },
  { id: "a-1-2-1", code: "1210", name: "Property, Plant & Equipment", type: "Asset", subType: "Fixed Asset", parentId: "a-1-2", isGroup: false, isActive: true, openingBalance: 2500000, currentBalance: 2350000, normalBalance: "Dr" },
  { id: "a-1-2-2", code: "1220", name: "Accumulated Depreciation", type: "Asset", subType: "Contra Asset", parentId: "a-1-2", isGroup: false, isActive: true, openingBalance: -150000, currentBalance: -300000, normalBalance: "Cr" },
  { id: "a-1-2-3", code: "1230", name: "Intangible Assets", type: "Asset", subType: "Intangible", parentId: "a-1-2", isGroup: false, isActive: true, openingBalance: 100000, currentBalance: 85000, normalBalance: "Dr" },

  // Liabilities
  { id: "a-2", code: "2000", name: "Liabilities", type: "Liability", subType: "Group", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Cr" },
  { id: "a-2-1", code: "2100", name: "Current Liabilities", type: "Liability", subType: "Group", parentId: "a-2", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Cr" },
  { id: "a-2-1-1", code: "2110", name: "Accounts Payable", type: "Liability", subType: "Payable", parentId: "a-2-1", isGroup: false, isActive: true, openingBalance: 280000, currentBalance: 420000, normalBalance: "Cr" },
  { id: "a-2-1-2", code: "2120", name: "Short-term Borrowings", type: "Liability", subType: "Loan", parentId: "a-2-1", isGroup: false, isActive: true, openingBalance: 500000, currentBalance: 350000, normalBalance: "Cr" },
  { id: "a-2-1-3", code: "2130", name: "Output VAT Payable", type: "Liability", subType: "Tax", parentId: "a-2-1", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 58500, normalBalance: "Cr" },
  { id: "a-2-1-4", code: "2140", name: "TDS Payable", type: "Liability", subType: "Tax", parentId: "a-2-1", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 22000, normalBalance: "Cr" },
  { id: "a-2-1-5", code: "2150", name: "Salary Payable", type: "Liability", subType: "Payroll", parentId: "a-2-1", isGroup: false, isActive: true, openingBalance: 120000, currentBalance: 180000, normalBalance: "Cr" },
  { id: "a-2-2", code: "2200", name: "Non-Current Liabilities", type: "Liability", subType: "Group", parentId: "a-2", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Cr" },
  { id: "a-2-2-1", code: "2210", name: "Long-term Bank Loan", type: "Liability", subType: "Loan", parentId: "a-2-2", isGroup: false, isActive: true, openingBalance: 1200000, currentBalance: 1000000, normalBalance: "Cr" },

  // Equity
  { id: "a-3", code: "3000", name: "Equity", type: "Equity", subType: "Group", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Cr" },
  { id: "a-3-1", code: "3100", name: "Share Capital", type: "Equity", subType: "Capital", parentId: "a-3", isGroup: false, isActive: true, openingBalance: 2000000, currentBalance: 2000000, normalBalance: "Cr" },
  { id: "a-3-2", code: "3200", name: "Retained Earnings", type: "Equity", subType: "Reserves", parentId: "a-3", isGroup: false, isActive: true, openingBalance: 470000, currentBalance: 685000, normalBalance: "Cr" },

  // Income
  { id: "a-4", code: "4000", name: "Revenue", type: "Income", subType: "Group", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Cr" },
  { id: "a-4-1", code: "4100", name: "Sales Revenue", type: "Income", subType: "Operating", parentId: "a-4", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 3250000, normalBalance: "Cr" },
  { id: "a-4-2", code: "4200", name: "Service Revenue", type: "Income", subType: "Operating", parentId: "a-4", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 850000, normalBalance: "Cr" },
  { id: "a-4-3", code: "4300", name: "Other Income", type: "Income", subType: "Non-Operating", parentId: "a-4", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 45000, normalBalance: "Cr" },

  // Expenses
  { id: "a-5", code: "5000", name: "Expenses", type: "Expense", subType: "Group", isGroup: true, isActive: true, openingBalance: 0, currentBalance: 0, normalBalance: "Dr" },
  { id: "a-5-1", code: "5100", name: "Cost of Goods Sold", type: "Expense", subType: "COGS", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 1850000, normalBalance: "Dr" },
  { id: "a-5-2", code: "5200", name: "Salary & Wages", type: "Expense", subType: "Administrative", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 540000, normalBalance: "Dr" },
  { id: "a-5-3", code: "5300", name: "Rent Expense", type: "Expense", subType: "Administrative", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 180000, normalBalance: "Dr" },
  { id: "a-5-4", code: "5400", name: "Utilities Expense", type: "Expense", subType: "Administrative", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 36000, normalBalance: "Dr" },
  { id: "a-5-5", code: "5500", name: "Depreciation Expense", type: "Expense", subType: "Administrative", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 75000, normalBalance: "Dr" },
  { id: "a-5-6", code: "5600", name: "Marketing & Promotion", type: "Expense", subType: "Selling", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 95000, normalBalance: "Dr" },
  { id: "a-5-7", code: "5700", name: "Bank Charges & Interest", type: "Expense", subType: "Financial", parentId: "a-5", isGroup: false, isActive: true, openingBalance: 0, currentBalance: 48000, normalBalance: "Dr" },
];

// Mock Vouchers
export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: "v-001",
    voucherNo: "JV-2081-001",
    type: "Journal",
    dateBS: "2081-04-01",
    dateAD: "2024-07-16",
    narration: "Opening balance adjustment for fiscal year 2081/82",
    lines: [
      { id: "vl-1", accountId: "a-1-1-1", accountName: "Cash in Hand", description: "Opening Cash", debit: 150000, credit: 0 },
      { id: "vl-2", accountId: "a-3-1", accountName: "Share Capital", description: "Capital balance", debit: 0, credit: 150000 },
    ],
    totalDebit: 150000,
    totalCredit: 150000,
    isPosted: true,
    createdBy: "admin@abctrading.com.np",
    companyId: "c-001",
    fiscalYearId: "fy-81-82",
  },
  {
    id: "v-002",
    voucherNo: "SV-2081-045",
    type: "Sales",
    dateBS: "2081-04-10",
    dateAD: "2024-07-25",
    narration: "Sales to Himalayan Traders with 13% VAT",
    lines: [
      { id: "vl-3", accountId: "a-1-1-3", accountName: "Accounts Receivable", description: "Invoice #INV-045", debit: 113000, credit: 0 },
      { id: "vl-4", accountId: "a-4-1", accountName: "Sales Revenue", description: "Taxable Sales", debit: 0, credit: 100000 },
      { id: "vl-5", accountId: "a-2-1-3", accountName: "Output VAT Payable", description: "13% VAT on sales", debit: 0, credit: 13000 },
    ],
    totalDebit: 113000,
    totalCredit: 113000,
    isPosted: true,
    createdBy: "admin@abctrading.com.np",
    companyId: "c-001",
    fiscalYearId: "fy-81-82",
  },
  {
    id: "v-003",
    voucherNo: "PV-2081-012",
    type: "Purchase",
    dateBS: "2081-04-15",
    dateAD: "2024-07-30",
    narration: "Purchase of goods from Everest Impex with VAT",
    lines: [
      { id: "vl-6", accountId: "a-1-1-4", accountName: "Inventory", description: "Stock items purchase", debit: 200000, credit: 0 },
      { id: "vl-7", accountId: "a-1-1-6", accountName: "Input VAT Receivable", description: "13% Input VAT", debit: 26000, credit: 0 },
      { id: "vl-8", accountId: "a-2-1-1", accountName: "Accounts Payable", description: "Everest Impex bill #982", debit: 0, credit: 226000 },
    ],
    totalDebit: 226000,
    totalCredit: 226000,
    isPosted: true,
    createdBy: "admin@abctrading.com.np",
    companyId: "c-001",
    fiscalYearId: "fy-81-82",
  },
  {
    id: "v-004",
    voucherNo: "CP-2081-088",
    type: "Payment",
    dateBS: "2081-04-20",
    dateAD: "2024-08-04",
    narration: "Salary payment for Shrawan 2081 with TDS deduction",
    lines: [
      { id: "vl-9", accountId: "a-5-2", accountName: "Salary & Wages", description: "Staff gross salaries", debit: 180000, credit: 0 },
      { id: "vl-10", accountId: "a-2-1-4", accountName: "TDS Payable", description: "1% / 10% TDS withheld", debit: 0, credit: 9000 },
      { id: "vl-11", accountId: "a-1-1-2", accountName: "Cash at Bank", description: "Nabil Bank transfer", debit: 0, credit: 171000 },
    ],
    totalDebit: 180000,
    totalCredit: 180000,
    isPosted: true,
    createdBy: "admin@abctrading.com.np",
    companyId: "c-001",
    fiscalYearId: "fy-81-82",
  },
];

// Nepali number formatter
export function formatNPR(amount: number): string {
  if (isNaN(amount)) return "0.00";
  const [integer, decimal = "00"] = amount.toFixed(2).split(".");
  const intNum = parseInt(integer, 10);
  if (intNum < 1000) return `${integer}.${decimal}`;
  
  let result = "";
  const intStr = Math.abs(intNum).toString();
  const len = intStr.length;
  
  // Last 3 digits
  result = intStr.slice(len - 3);
  // Remaining in groups of 2
  let remaining = intStr.slice(0, len - 3);
  while (remaining.length > 0) {
    result = remaining.slice(-2) + "," + result;
    remaining = remaining.slice(0, -2);
  }
  
  return `${intNum < 0 ? "-" : ""}${result}.${decimal}`;
}

export function formatNPRCurrency(amount: number): string {
  return `रू ${formatNPR(amount)}`;
}

// Calculate VAT at 13%
export function calculateVAT(amount: number): { base: number; vat: number; total: number } {
  const base = Math.round(Number(amount) * 100) / 100;
  const vat = Math.round(base * 0.13 * 100) / 100;
  const total = Math.round((base + vat) * 100) / 100;
  return {
    base,
    vat,
    total,
  };
}
