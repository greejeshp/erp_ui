import { mockDB } from "@/lib/mock/mockData";

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
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
    author: "Ramesh Sharma, CPA",
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
    author: "Sita Karki, Tax Analyst",
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
    author: "Deepak Regmi, Tech Consultant",
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
    return stored ? JSON.parse(stored) : INITIAL_BLOGS;
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
