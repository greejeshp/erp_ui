import { mockDB } from "@/lib/mock/mockData";

export interface BlogSection {
  heading: string;
  body: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  sections?: BlogSection[];
  takeaways?: string[];
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
  featured: boolean;
}

export const INITIAL_BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "Understanding NFRS Compliance for Small Businesses in Nepal",
    excerpt: "A comprehensive guide to transitioning your company accounting structure to meet Nepal Financial Reporting Standards smoothly.",
    content: "Transitioning to Nepal Financial Reporting Standards (NFRS) can seem like a daunting challenge for small to mid-sized businesses. Under the guidelines set by the Institute of Chartered Accountants of Nepal (ICAN), compliance is crucial for transparency, tax audit smoothness, and bank credit approvals. Key areas to focus on include correct classification of assets vs liabilities, proper recording of employee benefits, and depreciation rules under the tax guidelines versus reporting guidelines. Using an ERP system that pre-structures your Chart of Accounts according to NFRS guidelines can save weeks of manual auditing corrections.",
    sections: [
      {
        heading: "1. The Evolution of Financial Reporting in Nepal",
        body: "Historically, most private entities in Nepal maintained books strictly based on Nepal Accounting Standards (NAS) or direct Income Tax Act requirements. However, as financial institutions and regulatory authorities tighten scrutiny, ICAN has progressively mandated NFRS for SMEs. The goal is to harmonize financial records with international benchmarks, making statutory audits predictable and reliable."
      },
      {
        heading: "2. Key Friction Points for Accounting Teams",
        body: "The primary challenges faced by Nepali enterprises revolve around component depreciation of fixed assets, recognition of impairment losses, and fair valuation of financial instruments. Traditional standalone desktop spreadsheets frequently lead to formula discrepancies, miscalculated carry-forward losses, and mismatched retained earnings during year-end reconciliation."
      },
      {
        heading: "3. How Pivotal ERP Pre-Structures Your Chart of Accounts",
        body: "Pivotal ERP eliminates guesswork by offering built-in NFRS Chart of Account templates customized for Nepalese trading houses, manufacturing entities, and hospitality ventures. Multi-branch balance sheets and profit & loss statements roll up automatically in real-time, matching ICAN reporting disclosures with one click."
      }
    ],
    takeaways: [
      "Ensure all asset capitalization follows ICAN's revised component depreciation schedules.",
      "Reconcile tax depreciation vs. financial statement depreciation before closing fiscal Q4.",
      "Adopt an integrated cloud ERP to prevent year-end audit discrepancy penalties."
    ],
    author: "Ramesh Sharma, CPA",
    authorRole: "Senior Audit Partner & Tax Advisor",
    date: "July 10, 2025",
    readTime: "5 min read",
    tags: ["NFRS", "Compliance", "Accounting"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
    featured: true
  },
  {
    id: "blog-2",
    title: "VAT Filing Guidelines: Avoiding Common 13% Tax Errors",
    excerpt: "Make sure you calculate input VAT and output VAT correctly to prevent heavy fines from the Inland Revenue Department (IRD).",
    content: "Under Nepal's Value Added Tax (VAT) Act, businesses with sales thresholds exceeding the limit (50 Lakhs for goods, 20 Lakhs for services) must collect and deposit 13% VAT. The most common errors happen in claiming input tax credits. Ensure all your purchases are backed by genuine, tax-authorized receipts and matched correctly on the IRD Annexure B purchase reports. Filing late attracts a 0.05% interest per day alongside basic penalties, so automating your sales register to log every transaction directly to the purchase and sales ledger is key to compliance.",
    sections: [
      {
        heading: "1. Input Tax Credit Discrepancies and IRD Annexure Matching",
        body: "One of the most frequent reasons for audit notices from Inland Revenue Offices (IRO) is claiming input VAT on purchases from unverified suppliers or non-VAT invoices. Under the current IRD portal sync, every purchase invoice PAN must reconcile directly with the seller's reported sales register. Ineligible input tax claims, such as restricted vehicle purchases or non-business entertainment, will be summarily disallowed with 100% penalties."
      },
      {
        heading: "2. Calculating Reverse Charge VAT on Imported Services",
        body: "Many businesses that utilize international cloud software, SaaS tools, or overseas consultancy fail to account for Reverse Charge VAT as mandated by Section 8(2) of the VAT Act. If an overseas entity does not hold a Nepali PAN, the local recipient is legally obligated to assess 13% VAT on the transaction value."
      },
      {
        heading: "3. Automated Annexure 13 Generation in Pivotal ERP",
        body: "Pivotal ERP automatically cross-verifies supplier PAN validity, distinguishes between taxable, exempt, and zero-rated sales, and generates certified Annexure 13 export files ready for batch upload directly into the IRD CBMS e-portal."
      }
    ],
    takeaways: [
      "Always verify that supplier invoices are uploaded before claiming month-end input VAT credit.",
      "Maintain a separate ledger for Section 8(2) reverse-charge VAT on overseas digital services.",
      "Leverage real-time Annexure 13 validation to prevent 0.05% daily compounding interest penalties."
    ],
    author: "Sita Karki",
    authorRole: "Chief Tax Analyst, Apex Advisory",
    date: "June 28, 2025",
    readTime: "4 min read",
    tags: ["VAT", "Taxation", "IRD"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
    featured: true
  },
  {
    id: "blog-3",
    title: "Why Nepal's Local Businesses are Migrating to Cloud ERPs",
    excerpt: "From real-time stock monitoring to automated TDS and Bikram Sambat date conversion, local cloud systems are taking over.",
    content: "Legacy desktop accounting software is rapidly falling behind. Modern enterprises require live synchronization. Whether it is tracking inventory moving between branches in Pokhara and Kathmandu, or automatically generating voucher entries with dates mapped in the Bikram Sambat calendar, cloud ERP systems provide unified access. Staff can enter data from their mobile devices, and management gets instantaneous balance sheet statements.",
    sections: [
      {
        heading: "1. The Pitfalls of Siloed Offline Desktop Software",
        body: "For over two decades, single-user desktop accounting software dominated the Nepalese market. While sufficient for single-store retail, multi-location companies struggle with file corruption, tedious backup routines, ransomware vulnerabilities, and out-of-sync branch stock registers. Consolidating end-of-month financials routinely took 7 to 10 days of manual data merging."
      },
      {
        heading: "2. Dual Calendar Support: Bikram Sambat & Gregorian Seamlessly Unified",
        body: "Operating in Nepal requires seamless integration with the Bikram Sambat (B.S.) calendar for government tax deadlines, fiscal quarters (Shrawan to Ashad), and public holidays, alongside the Gregorian (A.D.) calendar for international suppliers and bank statements. Modern cloud ERPs synchronize both timelines across all vouchers without manual date recalculation."
      },
      {
        heading: "3. Real-Time Multi-Branch Inventory Control",
        body: "Pivotal ERP allows warehouse managers in Birgunj, wholesale dispatchers in Butwal, and headquarters in Kathmandu to view exact SKU availability, stock transfer manifests, and landed cost recalculations instantly, eliminating phantom out-of-stock incidents."
      }
    ],
    takeaways: [
      "Eliminate manual data imports between branch locations and central accounting.",
      "Ensure automatic Bikram Sambat fiscal period transitions from Shrawan 1 without downtime.",
      "Access enterprise-grade role permissions, multi-factor authentication, and automated cloud backups."
    ],
    author: "Deepak Regmi",
    authorRole: "Enterprise Systems Consultant",
    date: "May 15, 2025",
    readTime: "6 min read",
    tags: ["Cloud", "ERP", "Business Growth"],
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60",
    featured: false
  }
];

export const blogStore = {
  getBlogs: (): Blog[] => {
    if (typeof window === "undefined") return INITIAL_BLOGS;
    const stored = localStorage.getItem("pivotal-blogs");
    if (!stored) return INITIAL_BLOGS;
    try {
      const parsed: Blog[] = JSON.parse(stored);
      // Merge INITIAL_BLOGS to guarantee rich sections and takeaways are available
      return INITIAL_BLOGS.map((init) => {
        const found = parsed.find((p) => p.id === init.id);
        return found ? { ...init, ...found, sections: init.sections || found.sections, takeaways: init.takeaways || found.takeaways } : init;
      }).concat(parsed.filter((p) => !INITIAL_BLOGS.some((init) => init.id === p.id)));
    } catch {
      return INITIAL_BLOGS;
    }
  },
  saveBlogs: (blogs: Blog[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pivotal-blogs", JSON.stringify(blogs));
    }
  },
  addBlog: (blog: Omit<Blog, "id" | "date">): Blog => {
    const blogs = blogStore.getBlogs();
    const newBlog: Blog = {
      ...blog,
      id: `blog-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    };
    blogs.push(newBlog);
    blogStore.saveBlogs(blogs);
    return newBlog;
  },
  getSliderSettings: (): { showBlogs: boolean; speed: number; slideItems: string[] } => {
    const defaultSettings = { showBlogs: true, speed: 5000, slideItems: ["blog-1", "blog-2", "features"] };
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem("pivotal-slider-settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  },
  saveSliderSettings: (settings: { showBlogs: boolean; speed: number; slideItems: string[] }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pivotal-slider-settings", JSON.stringify(settings));
    }
  }
};
