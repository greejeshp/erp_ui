// Pivotal ERP — Mock Data Layer
// Simulates database with localStorage persistence

export interface Company {
  id: string;
  name: string;
  code: string; // e.g. "PVT-001"
  subdomain: string; // e.g. "abctrading"
  email: string;
  phone: string;
  address: string;
  industry: string;
  panVat: string;
  registrationNo: string;
  subscriptionPlan: string;
  status: "pending" | "active" | "suspended" | "trial";
  isTrial: boolean;
  trialEndsAt?: string;
  autoVerified: boolean;
  createdAt: string;
  logoUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string; // mock: just store plaintext for demo
  companyId: string;
  role: "owner" | "admin" | "accountant" | "viewer";
  isFirstLogin: boolean;
  hasCompletedTour: boolean;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // NPR per month
  annualPrice: number;
  features: string[];
  industries: string[];
  maxUsers: number;
  maxCompanies: number;
  isActive: boolean;
  isPopular: boolean;
  color: string;
}

export interface Agreement {
  id: string;
  version: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminSettings {
  trialDurationDays: number;
  autoVerifyCompany: boolean;
  autoAssignSubdomain: boolean;
  autoAssignCompanyCode: boolean;
  trialEnabled: boolean;
  landingPageSections: {
    features: boolean;
    pricing: boolean;
    testimonials: boolean;
    industries: boolean;
  };
  heroTitle: string;
  heroSubtitle: string;
  signupCtaText: string;
  trialCtaText: string;
}

// ─── Mock Data ───────────────────────────────────────────────

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 4999,
    annualPrice: 49990,
    features: [
      "Chart of Accounts", "Journal Vouchers", "General Ledger",
      "Trial Balance", "Basic P&L", "VAT 13% Module", "2 Users",
      "Email Support"
    ],
    industries: ["Service", "Trading"],
    maxUsers: 2,
    maxCompanies: 1,
    isActive: true,
    isPopular: false,
    color: "#1D4EDB",
  },
  {
    id: "professional",
    name: "Professional",
    price: 12999,
    annualPrice: 129990,
    features: [
      "Everything in Starter", "All Voucher Types", "Balance Sheet",
      "Cash Flow Statement", "TDS Module", "IRD Annexure A/B/C",
      "Inventory Module", "HR & Payroll", "10 Users", "Priority Support"
    ],
    industries: ["Service", "Trading", "Manufacturing", "Retail"],
    maxUsers: 10,
    maxCompanies: 1,
    isActive: true,
    isPopular: true,
    color: "#008B94",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 29999,
    annualPrice: 299990,
    features: [
      "Everything in Professional", "Multi-branch", "Multi-company",
      "Custom Integrations", "API Access", "Custom Reports",
      "Dedicated Account Manager", "Unlimited Users", "SLA 99.9%"
    ],
    industries: ["All Industries"],
    maxUsers: 999,
    maxCompanies: 10,
    isActive: true,
    isPopular: false,
    color: "#0B132B",
  },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: "c-001",
    name: "ABC Trading Pvt. Ltd.",
    code: "PVT-001",
    subdomain: "abctrading",
    email: "admin@abctrading.com.np",
    phone: "+977-1-4567890",
    address: "Kathmandu, Nepal",
    industry: "Trading",
    panVat: "123456789",
    registrationNo: "REG-12345",
    subscriptionPlan: "professional",
    status: "active",
    isTrial: false,
    autoVerified: true,
    createdAt: "2024-08-01",
  },
  {
    id: "c-002",
    name: "XYZ Services Ltd.",
    code: "PVT-002",
    subdomain: "xyzservices",
    email: "info@xyzservices.com.np",
    phone: "+977-1-5678901",
    address: "Lalitpur, Nepal",
    industry: "Service",
    panVat: "987654321",
    registrationNo: "REG-54321",
    subscriptionPlan: "starter",
    status: "trial",
    isTrial: true,
    trialEndsAt: "2025-08-15",
    autoVerified: false,
    createdAt: "2025-07-16",
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "u-001",
    email: "admin@abctrading.com.np",
    name: "Ramesh Sharma",
    passwordHash: "Pass@1234",
    companyId: "c-001",
    role: "owner",
    isFirstLogin: false,
    hasCompletedTour: true,
    createdAt: "2024-08-01",
  },
  {
    id: "u-002",
    email: "newuser@xyzservices.com.np",
    name: "Sita Devi",
    passwordHash: "Pass@5678",
    companyId: "c-002",
    role: "owner",
    isFirstLogin: true,
    hasCompletedTour: false,
    createdAt: "2025-07-16",
  },
];

export const MOCK_ADMIN_SETTINGS: AdminSettings = {
  trialDurationDays: 14,
  autoVerifyCompany: true,
  autoAssignSubdomain: true,
  autoAssignCompanyCode: true,
  trialEnabled: true,
  landingPageSections: {
    features: true,
    pricing: true,
    testimonials: true,
    industries: true,
  },
  heroTitle: "Nepal's Most Intelligent Accounting ERP",
  heroSubtitle: "Built for NFRS compliance, VAT filing, and real-time financial clarity — trusted by 500+ businesses.",
  signupCtaText: "Start Free — Choose a Plan",
  trialCtaText: "Try Free for 14 Days",
};

export const MOCK_AGREEMENT: Agreement = {
  id: "agr-001",
  version: "1.2",
  title: "Pivotal ERP User Agreement",
  content: `<h2>Terms of Service & User Agreement</h2>
<p>Last updated: July 2025</p>
<p>By signing up for Pivotal ERP, you agree to the following terms:</p>
<h3>1. Service Usage</h3>
<p>Pivotal ERP provides accounting and financial management tools. You agree to use the service only for lawful purposes in compliance with Nepal's Companies Act 2063 and Income Tax Act 2058.</p>
<h3>2. Data Privacy</h3>
<p>Your financial data is encrypted and stored securely. We do not share your data with third parties without your consent, except as required by law.</p>
<h3>3. Payment Terms</h3>
<p>Subscription fees are billed monthly or annually in Nepali Rupees (NPR). Trial periods are non-renewable and do not require a credit card.</p>
<h3>4. Compliance</h3>
<p>You are responsible for ensuring your accounting entries comply with Nepal Financial Reporting Standards (NFRS) and IRD requirements.</p>
<h3>5. Termination</h3>
<p>You may cancel your subscription at any time. Data will be available for 30 days after termination for export.</p>`,
  isActive: true,
  createdAt: "2025-01-01",
};

// ─── Mock localStorage Storage ────────────────────────────────
export const mockDB = {
  getUsers: (): User[] => {
    if (typeof window === "undefined") return MOCK_USERS;
    const stored = localStorage.getItem("pivotal-users");
    return stored ? JSON.parse(stored) : MOCK_USERS;
  },
  saveUsers: (users: User[]) => {
    if (typeof window !== "undefined")
      localStorage.setItem("pivotal-users", JSON.stringify(users));
  },
  getCompanies: (): Company[] => {
    if (typeof window === "undefined") return MOCK_COMPANIES;
    const stored = localStorage.getItem("pivotal-companies");
    return stored ? JSON.parse(stored) : MOCK_COMPANIES;
  },
  saveCompanies: (companies: Company[]) => {
    if (typeof window !== "undefined")
      localStorage.setItem("pivotal-companies", JSON.stringify(companies));
  },
  getSettings: (): AdminSettings => {
    if (typeof window === "undefined") return MOCK_ADMIN_SETTINGS;
    const stored = localStorage.getItem("pivotal-admin-settings");
    return stored ? JSON.parse(stored) : MOCK_ADMIN_SETTINGS;
  },
  saveSettings: (settings: AdminSettings) => {
    if (typeof window !== "undefined")
      localStorage.setItem("pivotal-admin-settings", JSON.stringify(settings));
  },
  getPlans: (): SubscriptionPlan[] => {
    if (typeof window === "undefined") return MOCK_PLANS;
    const stored = localStorage.getItem("pivotal-plans");
    return stored ? JSON.parse(stored) : MOCK_PLANS;
  },
  savePlans: (plans: SubscriptionPlan[]) => {
    if (typeof window !== "undefined")
      localStorage.setItem("pivotal-plans", JSON.stringify(plans));
  },
  findUserByEmail: (email: string): User | undefined => {
    return mockDB.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  isEmailTaken: (email: string): boolean => {
    return !!mockDB.findUserByEmail(email);
  },
  registerUser: (user: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      ...user,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const users = mockDB.getUsers();
    users.push(newUser);
    mockDB.saveUsers(users);
    return newUser;
  },
  registerCompany: (company: Omit<Company, "id" | "createdAt">): Company => {
    const settings = mockDB.getSettings();
    const companies = mockDB.getCompanies();
    const codeNum = String(companies.length + 1).padStart(3, "0");
    const newCompany: Company = {
      ...company,
      id: `c-${Date.now()}`,
      code: settings.autoAssignCompanyCode ? `PVT-${codeNum}` : "",
      subdomain: settings.autoAssignSubdomain
        ? company.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20)
        : "",
      status: settings.autoVerifyCompany ? "active" : "pending",
      createdAt: new Date().toISOString(),
    };
    companies.push(newCompany);
    mockDB.saveCompanies(companies);
    return newCompany;
  },
};

// Admin credentials
export const ADMIN_CREDENTIALS = {
  email: "superadmin@pivotalerp.com",
  password: "Admin@2025!",
};
