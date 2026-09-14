import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockDB, MOCK_PLANS } from "@/lib/mock/mockData";
import { useThemeStore, BUILTIN_PALETTES } from "@/lib/store/themeStore";
import { useBrandLogo } from "@/lib/brand/logoHelper";
import {
  Sun,
  Moon,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Building2,
  FileSpreadsheet,
  Layers,
  ChevronDown,
  Sparkles,
  Receipt,
  ChevronRight,
  BookOpen,
  ShoppingCart,
  Factory,
  Hotel,
  Stethoscope,
  Ruler,
  GraduationCap,
  Play,
  Download,
  Send,
  Calculator,
  Clock,
  ShieldAlert,
  Database,
  Check,
  X,
  ScanLine,
  QrCode,
  Palette,
} from "lucide-react";



// ─── Top Navigation ──────────────────────────────────────────────────────────
function LandingNav({ scrolled }: { scrolled: boolean }) {
  const { mode, setMode, palette } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = mode === "dark";
  const brandLogo = useBrandLogo();

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 1.5rem",
          height: "74px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled || mobileMenuOpen
            ? isDark
              ? "rgba(10, 17, 40, 0.94)"
              : "rgba(255, 255, 255, 0.95)"
            : isDark
            ? "rgba(10, 17, 40, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(15, 23, 42, 0.08)"
            : "1px solid transparent",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Left: Brand Logo Lockup */}
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === "/" || window.location.pathname === "/erp_ui" || window.location.pathname === "/erp_ui/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              window.scrollTo({ top: 0 });
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: "260px",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          title="Pivotal ERP - Return to Hero"
        >
          <img
            src={brandLogo}
            alt="Pivotal ERP"
            style={{
              height: 42,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Parent company endorsement lockup (like Busy | an indiamart company) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderLeft: isDark
                ? "1px solid rgba(255, 255, 255, 0.18)"
                : "1px solid #E2E8F0",
              paddingLeft: "9px",
              marginLeft: "1px",
            }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                color: isDark ? "rgba(255,255,255,0.55)" : "#64748B",
                fontWeight: 500,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              a product of
            </span>
            <img
              src="/erp_ui/dynamic-technosoft-logo.png"
              alt="Dynamic Technosoft"
              title="Dynamic Technosoft"
              style={{
                height: 17,
                width: "auto",
                objectFit: "contain",
                display: "block",
                opacity: isDark ? 0.9 : 0.95,
                filter: isDark ? "drop-shadow(0 0 3px rgba(255,255,255,0.12))" : "none",
              }}
            />
          </div>
        </Link>

        {/* Center: Main Landing Page Navigation Menu */}
        <div
          className="hide-on-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flex: 1,
          }}
        >
          <a
            href="#features"
            style={{
              color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Features
          </a>
          <a
            href="#industries"
            style={{
              color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Industries
          </a>
          <a
            href="#pricing"
            style={{
              color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Pricing
          </a>
          <a
            href="#faq"
            style={{
              color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            FAQ
          </a>
          <Link
            to="/blog"
            style={{
              color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            Blog
          </Link>
        </div>

        {/* Desktop actions */}
        <div
          className="hide-on-mobile"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {/* Theme switcher */}
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(15,23,42,0.04)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(15,23,42,0.12)",
              color: isDark ? "#ffffff" : "#0D2B28",
              width: "56px",
              height: "30px",
              borderRadius: "100px",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "2px 4px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              outline: "none",
            }}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                padding: "0 4px",
                color: isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.3)",
              }}
            >
              <Sun size={12} />
              <Moon size={12} />
            </div>
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: isDark ? "28px" : "3px",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0, 132, 230, 0.4)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {isDark ? (
                <Moon size={11} color="white" />
              ) : (
                <Sun size={11} color="white" />
              )}
            </div>
          </button>

          <Link
            to="/login"
            style={{
              color: isDark ? "#E2E8F0" : "#1E293B",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.2s",
            }}
          >
            Log In
          </Link>

          <Link
            to="/signup"
            style={{
              background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "0.925rem",
              fontWeight: 600,
              padding: "9px 20px",
              borderRadius: "8px",
              boxShadow: `0 4px 14px ${palette.primary}55`,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >
            Get Started <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile controls */}
        <div
          className="show-on-mobile-flex"
          style={{ display: "none", alignItems: "center", gap: "10px" }}
        >
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(15,23,42,0.04)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(15,23,42,0.12)",
              color: isDark ? "white" : "#0D2B28",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(15,23,42,0.06)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(15,23,42,0.15)",
              color: isDark ? "white" : "#0D2B28",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 74,
            left: 0,
            right: 0,
            background: isDark ? "#092825" : "#ffffff",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #e2e8f0",
            padding: "1.5rem",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Features
          </a>
          <a
            href="#industries"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Industries
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            FAQ
          </a>
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Blog
          </Link>
          <div
            style={{
              height: "1px",
              background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
              margin: "4px 0",
            }}
          />
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isDark ? "white" : "#0D2B28",
              border: isDark
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid #cbd5e1",
              textDecoration: "none",
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
              color: "white",
              textDecoration: "none",
              fontSize: "0.95rem",
              textAlign: "center",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Get Started Free
          </Link>
        </div>
      )}
    </>
  );
}

// ─── Hero Section with Interactive Live Preview Mockup ───────────────────────
function HeroSection({
  settings,
}: {
  settings: ReturnType<typeof mockDB.getSettings>;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [activeTab, setActiveTab] = useState<"vouchers" | "annexure13" | "branches" | "copilot">("vouchers");
  const [copilotPrompt, setCopilotPrompt] = useState("Show me top 5 debtors with overdue > 45 days in Biratnagar branch");
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  const handleRunCopilot = (promptText?: string) => {
    const q = promptText || copilotPrompt;
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      if (q.toLowerCase().includes("debtor") || q.toLowerCase().includes("overdue")) {
        setCopilotResponse(
          "Found 3 overdue accounts in Biratnagar branch totaling Rs. 18,45,000. Top account: Surya Traders (48 days overdue, Rs. 9,20,000). Automated payment reminder generated via SMS & Email."
        );
      } else if (q.toLowerCase().includes("vat") || q.toLowerCase().includes("annexure")) {
        setCopilotResponse(
          "Fiscal Year 2081/82 VAT Annexure 13 analysis complete: 1,482 vouchers reconciled. Unclaimed purchase VAT credits identified: Rs. 42,300 across 2 supplier invoices."
        );
      } else {
        setCopilotResponse(
          `Analysis complete for "${q}": All ledgers balanced with zero suspense account discrepancy. Real-time cash position: Rs. 84,20,150 across Nabil and Global IME bank accounts.`
        );
      }
    }, 400);
  };

  const handleSignup = () => {
    if (!email) {
      setEmailErr("Please enter your work email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Please enter a valid work email.");
      return;
    }
    if (mockDB.isEmailTaken(email)) {
      setEmailErr("This email is already registered. Please log in.");
      return;
    }
    navigate(`/signup?email=${encodeURIComponent(email)}`);
  };

  const handleTrial = () => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      localStorage.setItem("pivotal-signup-email", email);
    }
    navigate("/trial");
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "80px",
        background: isDark
          ? "linear-gradient(180deg, #092825 0%, #061C1A 100%)"
          : "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)",
        borderBottom: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid #E2E8F0",
      }}
    >
      {/* Background Decorative Glow Gradients */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: isDark
            ? "radial-gradient(circle, rgba(0, 132, 230, 0.18) 0%, rgba(72, 187, 40, 0.08) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(0, 132, 230, 0.12) 0%, rgba(72, 187, 40, 0.06) 50%, transparent 80%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)"
            : "radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main Hero Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "880px",
            margin: "0 auto 3.5rem",
          }}
        >

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.2vw, 3.85rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            The Operating System for{" "}
            <span
              className="pivotal-gradient-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${palette.primary} 20%, ${palette.secondary} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
              }}
            >
              Modern Nepalese Business
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: isDark ? "#94A3B8" : "#475569",
              lineHeight: 1.6,
              maxWidth: "720px",
              margin: "0 auto 2.25rem",
            }}
          >
            Consolidate your multi-branch bookkeeping, IRD Annexure tax filings,
            inventory, and live audits in one unified, high-speed cloud platform.
          </p>

          {/* Email Capture & CTA Form */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.85rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "100%",
                maxWidth: "540px",
                flexWrap: "wrap",
                background: isDark
                  ? "rgba(15, 23, 42, 0.8)"
                  : "rgba(255, 255, 255, 0.95)",
                padding: "6px",
                borderRadius: "12px",
                border: emailErr
                  ? "1px solid #EF4444"
                  : isDark
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid #CBD5E1",
                boxShadow: isDark
                  ? "0 10px 25px rgba(0,0,0,0.5)"
                  : "0 10px 25px rgba(0,0,0,0.06)",
              }}
            >
              <input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr("");
                }}
                style={{
                  flex: "1 1 240px",
                  padding: "12px 16px",
                  border: "none",
                  borderRadius: "8px",
                  background: "transparent",
                  color: isDark ? "#FFFFFF" : "#0D2B28",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              />
              <button
                onClick={handleSignup}
                style={{
                  background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: `0 4px 14px ${palette.primary}66`,
                  transition: "all 0.2s",
                }}
              >
                {settings.signupCtaText || "Get Started Free"}
                <ArrowRight size={16} />
              </button>
            </div>

            {emailErr && (
              <p
                style={{
                  color: "#EF4444",
                  fontSize: "0.85rem",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {emailErr}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                marginTop: "0.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleTrial}
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDark ? palette.accent : palette.primary,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "underline",
                }}
              >
                Instant 14-Day Free Trial
              </button>
              <span style={{ color: isDark ? "#475569" : "#CBD5E1" }}>•</span>
              <a
                href="#preview"
                style={{
                  color: isDark ? "#94A3B8" : "#64748B",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Explore Live Interactive Mockup ↓
              </a>
            </div>
          </div>
        </div>

        {/* ─── Hero Live Dashboard Mockup ─── */}
        <div
          id="preview"
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            borderRadius: "16px",
            background: isDark ? "#0D2B28" : "#FFFFFF",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid #E2E8F0",
            boxShadow: isDark
              ? "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 132, 230, 0.15)"
              : "0 25px 60px -15px rgba(15, 23, 42, 0.15), 0 0 30px rgba(0, 132, 230, 0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Mock Window Top Bar */}
          <div
            style={{
              padding: "12px 20px",
              background: isDark ? "#090E1D" : "#F8FAFC",
              borderBottom: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#EF4444",
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#F59E0B",
                }}
              />
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#10B981",
                }}
              />
              <span
                style={{
                  marginLeft: 14,
                  fontSize: "0.8rem",
                  color: isDark ? "#64748B" : "#94A3B8",
                  fontFamily: "monospace",
                }}
              >
                https://app.pivotalerp.com/erp/dashboard
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "rgba(72, 187, 40, 0.15)",
                  color: "#48BB28",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#48BB28",
                  }}
                />
                IRD Gateway Live
              </span>
              <span
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(15,23,42,0.06)",
                  color: isDark ? "#CBD5E1" : "#475569",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 6,
                }}
              >
                BS 2081-11-26
              </span>
            </div>
          </div>

          {/* Interactive Console Sub-Navigation Bar */}
          <div
            style={{
              display: "flex",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              background: isDark ? "#0D1429" : "#F1F5F9",
              overflowX: "auto",
              padding: "0 8px",
            }}
          >
            {[
              { id: "vouchers", label: "Double-Entry Vouchers", icon: FileSpreadsheet, badge: "NFRS Balanced" },
              { id: "annexure13", label: "IRD Annexure 13 & 5", icon: Receipt, badge: "13% VAT Exact" },
              { id: "branches", label: "Multi-Branch Telemetry", icon: Building2, badge: "3 Live Locations" },
              { id: "copilot", label: "AI Copilot ⌘K", icon: Sparkles, badge: "Natural Language" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "transparent",
                    border: "none",
                    borderBottom: isActive ? `2px solid ${palette.primary}` : "2px solid transparent",
                    color: isActive
                      ? (isDark ? "#FFFFFF" : "#0D2B28")
                      : (isDark ? "#94A3B8" : "#64748B"),
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={15} color={isActive ? palette.primary : "currentColor"} />
                  {tab.label}
                  <span
                    style={{
                      fontSize: "0.68rem",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      background: isActive
                        ? `${palette.primary}22`
                        : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                      color: isActive ? palette.primary : (isDark ? "#94A3B8" : "#64748B"),
                      fontWeight: 600,
                    }}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mock Dashboard Body: Dynamic Tab Content */}
          <div style={{ padding: "1.75rem" }}>
            {/* TAB 1: Smart Double-Entry Vouchers */}
            {activeTab === "vouchers" && (
              <div>
                {/* Top Stat Summary */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ background: isDark ? "#0B2623" : "#F8FAFC", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0", borderRadius: 8, padding: "1rem" }}>
                    <div style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B" }}>Total Debits (BS 2081)</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28", marginTop: 4 }}>Rs. 4,82,50,000</div>
                    <div style={{ fontSize: "0.72rem", color: palette.secondary, marginTop: 4 }}>✓ Matched Credits exactly</div>
                  </div>
                  <div style={{ background: isDark ? "#0B2623" : "#F8FAFC", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0", borderRadius: 8, padding: "1rem" }}>
                    <div style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B" }}>Vouchers Cleared</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, color: palette.primary, marginTop: 4 }}>1,482 Vouchers</div>
                    <div style={{ fontSize: "0.72rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 4 }}>0 Unbalanced journals</div>
                  </div>
                  <div style={{ background: isDark ? "#0B2623" : "#F8FAFC", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0", borderRadius: 8, padding: "1rem" }}>
                    <div style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B" }}>Suspense Account</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, color: palette.primary, marginTop: 4 }}>Rs. 0.00</div>
                    <div style={{ fontSize: "0.72rem", color: palette.secondary, marginTop: 4 }}>Zero audit discrepancies</div>
                  </div>
                </div>

                {/* Voucher Ledger Table */}
                <div style={{ borderRadius: 8, border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0", overflow: "hidden" }}>
                  <div style={{ padding: "10px 16px", background: isDark ? "#0F332F" : "#F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155" }}>
                    <span>Live NFRS Double-Entry Journal (Dual Calendar BS 2081 / AD 2025)</span>
                    <span style={{ color: palette.primary, fontSize: "0.75rem", cursor: "pointer" }}>Export Excel / PDF →</span>
                  </div>
                  <div style={{ background: isDark ? "#081F1D" : "#FFFFFF", padding: "8px 16px" }}>
                    {[
                      { id: "JV-2081-0491", date: "2081-11-26", debit: "Nabil Bank Ltd (A/c 012)", credit: "Sales Revenue (Domestic)", amount: "Rs. 12,40,000", status: "Posted & Locked" },
                      { id: "PV-2081-0812", date: "2081-11-25", debit: "Inventory - Raw Materials", credit: "Sundry Creditors (Kathmandu Steels)", amount: "Rs. 8,50,000", status: "Posted & Locked" },
                      { id: "RV-2081-0304", date: "2081-11-24", debit: "Office Rent Expenses", credit: "TDS Payable (10% Sec 88)", amount: "Rs. 1,45,200", status: "Posted & Locked" },
                    ].map((row, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: idx < 2 ? (isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #F1F5F9") : "none", fontSize: "0.82rem" }}>
                        <div style={{ width: "130px", fontFamily: "monospace", color: palette.primary, fontWeight: 600 }}>{row.id}</div>
                        <div style={{ width: "100px", color: isDark ? "#94A3B8" : "#64748B" }}>{row.date}</div>
                        <div style={{ flex: 1, color: isDark ? "#FFFFFF" : "#1E293B", fontWeight: 500 }}>
                          <div><strong>Dr:</strong> {row.debit}</div>
                          <div style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "0.75rem" }}><strong>Cr:</strong> {row.credit}</div>
                        </div>
                        <div style={{ width: "130px", textAlign: "right", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>{row.amount}</div>
                        <div style={{ width: "130px", textAlign: "right" }}>
                          <span style={{ background: "rgba(72, 187, 40, 0.15)", color: "#48BB28", padding: "2px 8px", borderRadius: 4, fontSize: "0.72rem", fontWeight: 600 }}>
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: IRD Annexure 13 & 5 Compliance */}
            {activeTab === "annexure13" && (
              <div>
                <div style={{ background: `${palette.primary}12`, border: `1px solid ${palette.primary}33`, borderRadius: 8, padding: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>
                      Inland Revenue Department (IRD) Nepal Integrated Tax Module
                    </div>
                    <div style={{ fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 2 }}>
                      Automated Sales Book (Annexure 13) and Purchase Book (Annexure 5) ready for IRD e-portal upload.
                    </div>
                  </div>
                  <span style={{ background: "#48BB28", color: "white", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>
                    IRD API Verified
                  </span>
                </div>

                <div style={{ borderRadius: 8, border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0", overflow: "hidden" }}>
                  <div style={{ padding: "10px 16px", background: isDark ? "#0F332F" : "#F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155" }}>
                    <span>Annexure 13 (Sales Ledger) - Tax Breakdown</span>
                    <span style={{ color: "#48BB28", fontSize: "0.75rem", fontWeight: 600 }}>Generate IRD XML File ↓</span>
                  </div>
                  <div style={{ background: isDark ? "#081F1D" : "#FFFFFF", padding: "8px 16px" }}>
                    {[
                      { inv: "TI-81-0021", pan: "601928374", buyer: "Himalayan Wholesale Mart", taxable: "Rs. 10,00,000", vat: "Rs. 1,30,000", total: "Rs. 11,30,000" },
                      { inv: "TI-81-0022", pan: "302819475", buyer: "Pokhara Tech Distributors", taxable: "Rs. 6,50,000", vat: "Rs. 84,500", total: "Rs. 7,34,500" },
                      { inv: "TI-81-0023", pan: "602938471", buyer: "Butwal Agro Supplies", taxable: "Rs. 4,20,000", vat: "Rs. 54,600", total: "Rs. 4,74,600" },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: idx < 2 ? (isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #F1F5F9") : "none", fontSize: "0.82rem" }}>
                        <div style={{ width: "110px", fontFamily: "monospace", color: palette.primary, fontWeight: 600 }}>{item.inv}</div>
                        <div style={{ width: "110px", color: isDark ? "#94A3B8" : "#64748B", fontFamily: "monospace" }}>PAN: {item.pan}</div>
                        <div style={{ flex: 1, color: isDark ? "#FFFFFF" : "#1E293B", fontWeight: 500 }}>{item.buyer}</div>
                        <div style={{ width: "110px", textAlign: "right", color: isDark ? "#94A3B8" : "#64748B" }}>{item.taxable}</div>
                        <div style={{ width: "100px", textAlign: "right", color: "#48BB28", fontWeight: 600 }}>{item.vat}</div>
                        <div style={{ width: "110px", textAlign: "right", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>{item.total}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Multi-Branch Telemetry */}
            {activeTab === "branches" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
                  {[
                    { branch: "Kathmandu Central (HQ)", sales: "Rs. 2,45,00,000", vouchers: "840 Txns", sync: "Real-time sync", status: "Healthy" },
                    { branch: "Biratnagar Industrial Area", sales: "Rs. 1,32,50,000", vouchers: "420 Txns", sync: "Real-time sync", status: "Healthy" },
                    { branch: "Pokhara Lakeside Branch", sales: "Rs. 1,05,00,000", vouchers: "222 Txns", sync: "Real-time sync", status: "Healthy" },
                  ].map((b, idx) => (
                    <div key={idx} style={{ background: isDark ? "#0B2623" : "#F8FAFC", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0", borderRadius: 8, padding: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>{b.branch}</span>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#48BB28" }} />
                      </div>
                      <div style={{ fontSize: "1.3rem", fontWeight: 800, color: palette.primary, marginTop: 8 }}>{b.sales}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.75rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                        <span>{b.vouchers}</span>
                        <span style={{ color: "#48BB28", fontWeight: 600 }}>{b.sync}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 16px", borderRadius: 8, background: isDark ? "#092825" : "#EEF2F6", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #CBD5E1", fontSize: "0.82rem", color: isDark ? "#94A3B8" : "#475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>Consolidated Balance Sheet reflects inter-branch transfers instantaneously without manual reconciliation files.</span>
                  <span style={{ fontWeight: 600, color: palette.primary }}>Instant Consolidation</span>
                </div>
              </div>
            )}

            {/* TAB 4: AI Copilot Natural Language Query Console */}
            {activeTab === "copilot" && (
              <div>
                <div style={{ background: isDark ? "#0A1022" : "#F8FAFC", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0", borderRadius: 8, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                    <Sparkles size={16} color={palette.primary} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>
                      Ask Pivotal AI Copilot (Natural Language ERP Queries)
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginBottom: "0.75rem" }}>
                    <input
                      type="text"
                      value={copilotPrompt}
                      onChange={(e) => setCopilotPrompt(e.target.value)}
                      placeholder="e.g. Show top debtors with overdue > 45 days"
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 6,
                        border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
                        background: isDark ? "#0B2623" : "#FFFFFF",
                        color: isDark ? "#FFFFFF" : "#0D2B28",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleRunCopilot()}
                    />
                    <button
                      onClick={() => handleRunCopilot()}
                      disabled={isQuerying}
                      style={{
                        padding: "10px 18px",
                        borderRadius: 6,
                        border: "none",
                        background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {isQuerying ? "Analyzing..." : "Ask Copilot"}
                      <Send size={14} />
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
                    {[
                      "Show top 5 debtors with overdue > 45 days",
                      "Reconcile Annexure 13 VAT credits",
                      "Compare current Shrawan-Mangsir sales vs 2080",
                    ].map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setCopilotPrompt(suggestion);
                          handleRunCopilot(suggestion);
                        }}
                        style={{
                          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                          borderRadius: 4,
                          padding: "4px 10px",
                          fontSize: "0.75rem",
                          color: isDark ? "#CBD5E1" : "#475569",
                          cursor: "pointer",
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  {copilotResponse ? (
                    <div style={{ padding: "12px 14px", borderRadius: 6, background: `${palette.primary}18`, border: `1px solid ${palette.primary}33`, fontSize: "0.82rem", color: isDark ? "#FFFFFF" : palette.primary, lineHeight: 1.5 }}>
                      <strong>Copilot Intelligence:</strong> {copilotResponse}
                    </div>
                  ) : (
                    <div style={{ padding: "10px 14px", borderRadius: 6, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                      Type an executive query above or click a suggestion to see how natural language transforms deep ledger access.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #E2E8F0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: palette.primary,
                letterSpacing: "-0.02em",
              }}
            >
              500+
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: isDark ? "#94A3B8" : "#64748B",
                marginTop: 4,
              }}
            >
              Enterprises Across 7 Provinces
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: palette.primary,
                letterSpacing: "-0.02em",
              }}
            >
              Rs. 4.5+ Arba
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: isDark ? "#94A3B8" : "#64748B",
                marginTop: 4,
              }}
            >
              Annual Reconciled Volume
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: palette.primary,
                letterSpacing: "-0.02em",
              }}
            >
              100%
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: isDark ? "#94A3B8" : "#64748B",
                marginTop: 4,
              }}
            >
              IRD Annexure 13 & 5 Compliance
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: palette.primary,
                letterSpacing: "-0.02em",
              }}
            >
              99.99%
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: isDark ? "#94A3B8" : "#64748B",
                marginTop: 4,
              }}
            >
              Zero-Downtime Cloud SLA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2026 Bento Grid Capabilities Section ──────────────────────────────────
function BentoCapabilities() {
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <section
      id="features"
      style={{
        padding: "5.5rem 1.5rem",
        background: isDark ? "#060A14" : "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Purpose-built for Nepal&apos;s fiscal rigor, speed &amp; enterprise volume
          </h2>
          <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "1.05rem", marginTop: "1rem" }}>
            Explore our cloud ledger capabilities, compare against legacy desktop setups, and calculate direct quantifiable hours saved for your organization.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* Bento 1: BS Native Dual Calendar (8 columns) */}
          <div
            className="bento-col-8 interactive-card"
            style={{
              background: isDark ? "#061715" : "#F8FAFC",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: `${palette.primary}18`,
                  color: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Calendar size={22} />
              </div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: isDark ? "#FFFFFF" : "#0D2B28", margin: "0 0 8px" }}>
                Native Bikram Sambat (BS) Dual Calendar Engine
              </h3>
              <p style={{ fontSize: "0.95rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.6, margin: 0, maxWidth: "600px" }}>
                Automatic Shrawan-Ashadh fiscal year synchronization. Seamlessly toggle between BS and Gregorian AD with one click on any voucher, ledger, or report without date rounding drift.
              </p>
            </div>

            <div
              style={{
                marginTop: "2rem",
                background: isDark ? "#101935" : "#FFFFFF",
                borderRadius: "12px",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: isDark ? "#94A3B8" : "#64748B", textTransform: "uppercase", fontWeight: 600 }}>Active Fiscal Year</span>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: palette.primary }}>2081/82 (Shrawan 1 – Ashadh 32)</div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ background: isDark ? "#1E293B" : "#F1F5F9", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", color: isDark ? "#FFFFFF" : "#0D2B28", fontWeight: 600 }}>
                  BS: 2081 Falgun 26
                </div>
                <div style={{ background: isDark ? "#1E293B" : "#F1F5F9", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                  AD: 2025 March 10
                </div>
              </div>
            </div>
          </div>

          {/* Bento 2: 13% Exact VAT Calculation (4 columns) */}
          <div
            className="bento-col-4 interactive-card"
            style={{
              background: isDark ? "#061715" : "#F8FAFC",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: `${palette.secondary}18`,
                  color: palette.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Receipt size={22} />
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: isDark ? "#FFFFFF" : "#0D2B28", margin: "0 0 8px" }}>
                13% VAT Exact Match
              </h3>
              <p style={{ fontSize: "0.9rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.6, margin: 0 }}>
                Zero rounding drift. Automatically separates taxable, exempt, and export sales with certified Annexure 13 column layouts.
              </p>
            </div>

            <div
              style={{
                marginTop: "1.75rem",
                padding: "1rem",
                background: isDark ? "#101935" : "#FFFFFF",
                borderRadius: "10px",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                <span>Mandatory Rate:</span>
                <strong style={{ color: palette.secondary }}>13.00% Fixed</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 6 }}>
                <span>Rounding Drift:</span>
                <strong style={{ color: isDark ? "#FFFFFF" : "#0D2B28" }}>Rs. 0.00 (Zero Drift)</strong>
              </div>
            </div>
          </div>

          {/* Bento 3: Cryptographic Audit Trail (4 columns) */}
          <div
            className="bento-col-4 interactive-card"
            style={{
              background: isDark ? "#061715" : "#F8FAFC",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: `${palette.accent}18`,
                  color: palette.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: isDark ? "#FFFFFF" : "#0D2B28", margin: "0 0 8px" }}>
                Cryptographic Audit Log
              </h3>
              <p style={{ fontSize: "0.9rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.6, margin: 0 }}>
                Every edit, cancellation, and journal entry is cryptographically logged with user timestamps and reason codes to guarantee tax audit compliance.
              </p>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "8px 12px",
                background: isDark ? "#101935" : "#FFFFFF",
                borderRadius: "8px",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            >
              HASH: 9b2d8e4f... [IMMUTABLE]
            </div>
          </div>

          {/* Bento 4: AG-Grid High-Density Ledger (8 columns) */}
          <div
            className="bento-col-8 interactive-card"
            style={{
              background: isDark ? "#061715" : "#F8FAFC",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: `${palette.primary}18`,
                  color: palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Database size={22} />
              </div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: isDark ? "#FFFFFF" : "#0D2B28", margin: "0 0 8px" }}>
                High-Density AG-Grid Financial Ledger
              </h3>
              <p style={{ fontSize: "0.95rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.6, margin: 0, maxWidth: "600px" }}>
                Effortlessly view and filter 100,000+ financial voucher lines with zero lag. Full keyboard shortcut support, instant Excel pivot export, and inline voucher drill-downs.
              </p>
            </div>

            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              <div style={{ background: isDark ? "#101935" : "#FFFFFF", padding: "12px", borderRadius: "8px", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: palette.primary }}>&lt; 16ms</div>
                <div style={{ fontSize: "0.75rem", color: isDark ? "#94A3B8" : "#64748B" }}>Row Virtualization</div>
              </div>
              <div style={{ background: isDark ? "#101935" : "#FFFFFF", padding: "12px", borderRadius: "8px", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: palette.secondary }}>1-Click</div>
                <div style={{ fontSize: "0.75rem", color: isDark ? "#94A3B8" : "#64748B" }}>Excel / CSV / PDF</div>
              </div>
              <div style={{ background: isDark ? "#101935" : "#FFFFFF", padding: "12px", borderRadius: "8px", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0D2B28" }}>⌘ + K</div>
                <div style={{ fontSize: "0.75rem", color: isDark ? "#94A3B8" : "#64748B" }}>Keyboard Controls</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tally / Legacy vs Pivotal Comparison Section ────────────────────────────
function ComparisonSection() {
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  const COMPARISON_ROWS = [
    {
      feature: "Accessibility & Cloud Hosting",
      legacy: "Desktop-locked (Local PC or vulnerable hard drive)",
      pivotal: "100% Cloud-native • Real-time access across all branches",
    },
    {
      feature: "Nepal IRD Compliance (Annexure 13 & 5)",
      legacy: "Manual Excel copy-pasting, high penalty exposure",
      pivotal: "1-Click automated IRD e-portal XML generation",
    },
    {
      feature: "Bikram Sambat (BS) & Fiscal Year Logic",
      legacy: "Third-party add-ons or clumsy workarounds",
      pivotal: "Native Shrawan–Ashadh fiscal cycle & auto BS/AD converter",
    },
    {
      feature: "Multi-Branch & Consolidated P&L",
      legacy: "Merge files manually at month-end",
      pivotal: "Live multi-branch consolidation with zero sync delay",
    },
    {
      feature: "Data Safety & Disaster Recovery",
      legacy: "Manual flash drives, highly vulnerable to loss",
      pivotal: "Continuous Tier-4 cloud backups & cryptographic audit trail",
    },
    {
      feature: "AI Querying & Operational Speed",
      legacy: "Complex menu hierarchies & rigid reporting",
      pivotal: "Natural language Copilot ⌘K & high-density AG-Grid",
    },
  ];

  return (
    <section
      id="comparison"
      style={{
        padding: "5rem 1.5rem",
        background: isDark ? "#071A18" : "#F8FAFC",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            How Pivotal ERP Compares to Legacy Desktop Software
          </h2>
          <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "1rem", marginTop: "0.75rem" }}>
            See why leading enterprises in Nepal are transitioning from desktop-bound software to our cloud ledger.
          </p>
        </div>

        <div
          style={{
            borderRadius: "16px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.5)"
              : "0 20px 40px rgba(0,0,0,0.04)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: isDark ? "#060A14" : "#F1F5F9" }}>
                <th style={{ padding: "16px 20px", fontSize: "0.9rem", color: isDark ? "#94A3B8" : "#64748B", width: "30%" }}>
                  Core Capability
                </th>
                <th style={{ padding: "16px 20px", fontSize: "0.9rem", color: isDark ? "#EF4444" : "#DC2626", width: "35%" }}>
                  Legacy Offline Desktop Software
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "0.95rem",
                    color: palette.primary,
                    fontWeight: 700,
                    width: "35%",
                    background: isDark ? `${palette.primary}18` : "#F0F9FF",
                    borderLeft: `2px solid ${palette.primary}`,
                  }}
                >
                  Pivotal Cloud ERP 🇳🇵
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #EEF2F6",
                    background: isDark ? "#061715" : "#FFFFFF",
                  }}
                >
                  <td style={{ padding: "16px 20px", fontWeight: 600, color: isDark ? "#FFFFFF" : "#0D2B28", fontSize: "0.9rem" }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: "16px 20px", color: isDark ? "#94A3B8" : "#64748B", fontSize: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <X size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      color: isDark ? "#E2E8F0" : "#1E293B",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      background: isDark ? `${palette.primary}10` : "#F0F9FF",
                      borderLeft: `2px solid ${palette.primary}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <Check size={16} color={palette.secondary} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{row.pivotal}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              padding: "18px 24px",
              background: isDark ? "#101935" : "#F8FAFC",
              borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <strong style={{ color: isDark ? "#FFFFFF" : "#0D2B28", fontSize: "0.95rem" }}>
                Already have accounts in Tally or Excel?
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: "0.825rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                Our Kathmandu onboarding team migrates your Chart of Accounts and Opening Balances in &lt; 24 hours.
              </p>
            </div>
            <Link
              to="/trial"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "8px 18px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Start Free Migration <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Interactive ROI Estimator ──────────────────────────────────────────────
function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(4);
  const [monthlyVouchers, setMonthlyVouchers] = useState(1200);
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  const hoursSavedPerMonth = Math.round((monthlyVouchers * 12) / 60);
  const costSavingsNPR = hoursSavedPerMonth * 450;
  const auditHoursSaved = teamSize * 35;

  return (
    <section
      id="roi"
      style={{
        padding: "5rem 1.5rem",
        background: isDark ? "#060A14" : "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Calculate how many hours Pivotal ERP saves your finance team
          </h2>
          <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "1rem", marginTop: "0.75rem" }}>
            Eliminate double-data entry, manual Annexure 13 Excel sheets, and fiscal year closing headaches.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            background: isDark ? "#061715" : "#F8FAFC",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "2.5rem",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.5)"
              : "0 20px 40px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.95rem", fontWeight: 600, color: isDark ? "#FFFFFF" : "#0D2B28" }}>
                  Finance & Accounting Staff
                </label>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: palette.primary }}>
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: "100%", accentColor: palette.primary, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: isDark ? "#64748B" : "#94A3B8", marginTop: 4 }}>
                <span>1 user</span>
                <span>15 users</span>
                <span>30+ users</span>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.95rem", fontWeight: 600, color: isDark ? "#FFFFFF" : "#0D2B28" }}>
                  Monthly Tax Invoices & Vouchers
                </label>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: palette.secondary }}>
                  {monthlyVouchers.toLocaleString()} Vouchers
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={monthlyVouchers}
                onChange={(e) => setMonthlyVouchers(Number(e.target.value))}
                style={{ width: "100%", accentColor: palette.secondary, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: isDark ? "#64748B" : "#94A3B8", marginTop: 4 }}>
                <span>100</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

            <div
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                background: `${palette.secondary}14`,
                border: `1px solid ${palette.secondary}33`,
                fontSize: "0.85rem",
                color: isDark ? "#FFFFFF" : palette.primary,
                lineHeight: 1.5,
              }}
            >
              💡 <strong>Instant ROI:</strong> Automated IRD VAT Annexure 13 & 5 eliminates manual reconciliation errors that typically trigger costly tax assessment penalties.
            </div>
          </div>

          <div
            style={{
              background: isDark ? "#101935" : "#FFFFFF",
              borderRadius: "12px",
              padding: "2rem",
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                Estimated Monthly Savings
              </span>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: palette.primary, letterSpacing: "-0.03em", margin: "6px 0 12px" }}>
                Rs. {costSavingsNPR.toLocaleString()}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0", paddingTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: isDark ? "#E2E8F0" : "#334155" }}>
                  <Clock size={16} color={palette.secondary} />
                  <strong>{hoursSavedPerMonth} hours/month</strong> saved on data entry & VAT matching
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: isDark ? "#E2E8F0" : "#334155" }}>
                  <TrendingUp size={16} color={palette.primary} />
                  <strong>{auditHoursSaved} audit prep hours</strong> saved during Ashadh year-end closing
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: isDark ? "#E2E8F0" : "#334155" }}>
                  <ShieldAlert size={16} color="#F59E0B" />
                  <strong>100% legal immunity</strong> against Annexure 13 misreporting fines
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.75rem" }}>
              <a
                href="#pricing"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  boxShadow: `0 4px 12px ${palette.primary}44`,
                }}
              >
                Choose a Plan to Capture These Savings →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Industry Segment Switcher ───────────────────────────────────────────────
const INDUSTRY_DETAILS = [
  {
    id: "trading",
    name: "Trading & Wholesale",
    icon: ShoppingCart,
    tagline: "Batch tracking, multi-warehouse inventory & margin control",
    features: [
      "Purchase Orders with automated landed cost calculation",
      "Multi-godown stock transfer with transit tracking",
      "Customer credit limits & aging receivables alerts",
      "Instant barcode scanning & thermal invoice printing",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    tagline: "Bill of Materials (BOM), WIP costing & assembly tracking",
    features: [
      "Multi-stage BOM with raw material auto-deduction",
      "Machine & labor overhead allocation per batch",
      "Scrap and shrinkage accounting",
      "Finished goods quality check & serial numbers",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Hotels",
    icon: Hotel,
    tagline: "Room folio billing, F&B restaurant POS & kitchen tokens",
    features: [
      "Front desk guest check-in & consolidated room folio",
      "Restaurant Table POS with KOT kitchen routing",
      "Service charge and luxury tax auto-breakdown",
      "Multi-outlet beverage & inventory stock controls",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    icon: Stethoscope,
    tagline: "OPD/IPD patient ledger, pharmacy billing & doctor cuts",
    features: [
      "Doctor consultation fees & commission splitting",
      "Expiry date alert & batch control for pharmacy",
      "Laboratory test receipts with auto sample tokens",
      "Health insurance credit billing & claim reconciliation",
    ],
  },
  {
    id: "construction",
    name: "Construction & Projects",
    icon: Ruler,
    tagline: "BOQ milestone billing, retention money & contractor advances",
    features: [
      "Bill of Quantities (BOQ) with subcontractor ledger",
      "Running bill calculation with VAT & TDS retention",
      "Site-wise material consumption logs",
      "Machinery rental & diesel logbook accounting",
    ],
  },
  {
    id: "education",
    name: "Education & Institutes",
    icon: GraduationCap,
    tagline: "Student tuition fee billing, payroll & scholarship vouchers",
    features: [
      "Term fee invoicing with fine & discount logic",
      "Online fee receipt portal with QR code payment",
      "Teacher & staff payroll with SSF deduction",
      "Hostel and transport billing integration",
    ],
  },
];

function IndustriesSection() {
  const [selectedInd, setSelectedInd] = useState(INDUSTRY_DETAILS[0].id);
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  const activeData =
    INDUSTRY_DETAILS.find((i) => i.id === selectedInd) || INDUSTRY_DETAILS[0];

  return (
    <section
      id="industries"
      style={{
        padding: "5.5rem 1.5rem",
        background: isDark ? "#061C1A" : "#F8FAFC",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid #E2E8F0",
        borderBottom: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid #E2E8F0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto 3.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Sector-Specific Modules Pre-Loaded
          </h2>
          <p
            style={{
              color: isDark ? "#94A3B8" : "#64748B",
              fontSize: "1.05rem",
              marginTop: "0.75rem",
            }}
          >
            No need to pay for custom software development. Select your industry
            to unlock tailored workflows out of the box.
          </p>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {INDUSTRY_DETAILS.map((ind) => {
            const isSelected = ind.id === selectedInd;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedInd(ind.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "100px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isSelected
                    ? `1px solid ${palette.primary}`
                    : isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid #CBD5E1",
                  background: isSelected
                    ? `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`
                    : isDark
                    ? "#0D2B28"
                    : "#FFFFFF",
                  color: isSelected
                    ? "#FFFFFF"
                    : isDark
                    ? "#E2E8F0"
                    : "#334155",
                  boxShadow: isSelected
                    ? `0 4px 14px ${palette.primary}44`
                    : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <ind.icon size={16} />
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: isDark ? "#0D2B28" : "#FFFFFF",
            borderRadius: "16px",
            padding: "2.5rem",
            border: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid #E2E8F0",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.5)"
              : "0 20px 40px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <activeData.icon size={26} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  color: isDark ? "#FFFFFF" : "#0D2B28",
                  margin: 0,
                }}
              >
                {activeData.name} Solution
              </h3>
              <p
                style={{
                  color: isDark ? "#94A3B8" : "#64748B",
                  fontSize: "0.95rem",
                  margin: "4px 0 0",
                }}
              >
                {activeData.tagline}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.25rem",
              marginTop: "2rem",
            }}
          >
            {activeData.features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px",
                  borderRadius: "8px",
                  background: isDark ? "#0F332F" : "#F8FAFC",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid #EEF2F6",
                }}
              >
                <CheckCircle2
                  size={18}
                  color={palette.secondary}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span
                  style={{
                    fontSize: "0.925rem",
                    color: isDark ? "#E2E8F0" : "#334155",
                    fontWeight: 500,
                  }}
                >
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                color: isDark ? "#94A3B8" : "#64748B",
              }}
            >
              Need a custom workflow for {activeData.name}?
            </span>
            <Link
              to={`/signup?industry=${activeData.id}`}
              style={{
                color: palette.primary,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.925rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Launch {activeData.name} Workspace <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section with Monthly/Annual Toggle ──────────────────────────────
function PricingSection() {
  const plans = MOCK_PLANS;
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <section
      id="pricing"
      style={{
        padding: "5.5rem 1.5rem",
        background: isDark ? "#092825" : "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto 3.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Invest in clarity. Scale without surprises.
          </h2>
          <p
            style={{
              color: isDark ? "#94A3B8" : "#64748B",
              fontSize: "1.05rem",
              marginTop: "0.75rem",
              lineHeight: 1.6,
            }}
          >
            All plans are billed annually and include continuous IRD tax compliance updates, 
            instant Annexure filings, and guaranteed SLA cloud backups.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan) => {
            const annualPrice = plan.annualPrice || (plan.price * 10);
            const monthlyEquivalent = Math.round(annualPrice / 12);

            return (
              <div
                key={plan.id}
                style={{
                  background: isDark ? "#0D2B28" : "#FFFFFF",
                  border: plan.isPopular
                    ? `2px solid ${palette.primary}`
                    : isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  boxShadow: plan.isPopular
                    ? isDark
                      ? `0 20px 40px ${palette.primary}44`
                      : `0 20px 40px ${palette.primary}25`
                    : isDark
                    ? "0 10px 30px rgba(0,0,0,0.3)"
                    : "0 10px 30px rgba(0,0,0,0.04)",
                  transform: plan.isPopular ? "scale(1.02)" : "none",
                }}
              >
                {plan.isPopular && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                      color: "white",
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      boxShadow: `0 4px 10px ${palette.primary}44`,
                    }}
                  >
                    MOST POPULAR FOR ENTERPRISES
                  </div>
                )}

                <div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <h3
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 800,
                        color: isDark ? "#FFFFFF" : "#0D2B28",
                        margin: "0 0 6px",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: isDark ? "#94A3B8" : "#64748B",
                        margin: 0,
                      }}
                    >
                      Designed for up to {plan.maxUsers} active users
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.35rem",
                          fontWeight: 800,
                          color: isDark ? "#FFFFFF" : "#0D2B28",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        Rs. {annualPrice.toLocaleString("ne-NP")}
                      </span>
                      <span
                        style={{
                          color: isDark ? "#94A3B8" : "#64748B",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                        }}
                      >
                        / year
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: isDark ? "#94A3B8" : "#64748B",
                        fontWeight: 500,
                      }}
                    >
                      (Equivalent to Rs. {monthlyEquivalent.toLocaleString("ne-NP")}/mo billed annually)
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid #F1F5F9",
                      paddingTop: "1.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.85rem",
                      }}
                    >
                      {plan.features.map((feat, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: "0.9rem",
                            color: isDark ? "#E2E8F0" : "#334155",
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            color={plan.isPopular ? palette.primary : palette.secondary}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/signup?plan=${plan.id}&billing=annual`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    background: plan.isPopular
                      ? `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`
                      : isDark
                      ? "#1E293B"
                      : "#F1F5F9",
                    color: plan.isPopular
                      ? "white"
                      : isDark
                      ? "#FFFFFF"
                      : "#0D2B28",
                    border: plan.isPopular
                      ? "none"
                      : isDark
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "1px solid #CBD5E1",
                    boxShadow: plan.isPopular
                      ? `0 4px 14px ${palette.primary}44`
                      : "none",
                    transition: "transform 0.15s",
                  }}
                >
                  Start with {plan.name} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Interactive FAQ Section ────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is Pivotal ERP fully certified and compliant with Nepal IRD?",
    a: "Yes. Pivotal ERP formats invoices, Annexure 13, and Purchase Annexure 5 strictly according to Inland Revenue Department (IRD) Nepal specifications. Every tax invoice follows the legal numbering standard and includes all mandated audit fields.",
  },
  {
    q: "Can we migrate from our existing Tally or Excel spreadsheets?",
    a: "Absolutely. We offer 1-click import templates for Ledgers, Opening Balances, Customers, Vendors, and Inventory items. Our customer onboarding team in Kathmandu assists your accounting staff through the initial setup at zero extra charge.",
  },
  {
    q: "How does the Bikram Sambat (BS) calendar work in the system?",
    a: "Every transaction date, report interval, and voucher supports seamless BS and AD conversion. The Nepalese fiscal cycle (Shrawan 1 to Ashadh end) is natively programmed, enabling automatic year-end closing and financial statements without date misalignments.",
  },
  {
    q: "Where is our business data stored, and is it secure?",
    a: "All data is hosted in Tier-4 enterprise cloud facilities with automated daily encrypted backups. Role-Based Access Control (RBAC) guarantees that branch accountants only access their assigned vouchers, while CFOs maintain full consolidated visibility.",
  },
  {
    q: "Can we use Pivotal ERP on tablets and mobile phones?",
    a: "Yes. Pivotal ERP is completely responsive and cloud-based. Field sales representatives can generate estimates or invoices on their phones, while warehouse managers use tablets for real-time godown transfers.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <section
      id="faq"
      style={{
        padding: "5.5rem 1.5rem",
        background: isDark ? "#061C1A" : "#F8FAFC",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid #E2E8F0",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.5rem)",
              fontWeight: 800,
              color: isDark ? "#FFFFFF" : "#0D2B28",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{
                  background: isDark ? "#0D2B28" : "#FFFFFF",
                  borderRadius: "12px",
                  border: isOpen
                    ? `1px solid ${palette.primary}`
                    : isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid #E2E8F0",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: isDark ? "#FFFFFF" : "#0D2B28",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                      color: isOpen ? palette.primary : "#94A3B8",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem",
                      color: isDark ? "#94A3B8" : "#64748B",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      borderTop: isDark
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid #F1F5F9",
                      paddingTop: "1rem",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ─────────────────────────────────────────────────────────────
function CtaBanner() {
  const navigate = useNavigate();
  const { mode, palette } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <section style={{ padding: "5rem 1.5rem", background: isDark ? "#061715" : "#F8FAFC" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
          padding: "5rem 2.5rem",
          textAlign: "center",
          color: "#FFFFFF",
          boxShadow: isDark
            ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${palette.primary}33`
            : `0 24px 60px ${palette.primary}35`,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Ambient Top Right Glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Ambient Bottom Left Glow */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `${palette.accent || palette.secondary}44`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4.2vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.18,
              marginBottom: "1.25rem",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 10px rgba(0,0,0,0.18)",
            }}
          >
            Ready to upgrade your enterprise accounting?
          </h2>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
              color: "rgba(255, 255, 255, 0.95)",
              marginBottom: "2.75rem",
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: "680px",
              margin: "0 auto 2.75rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            Join 500+ Nepalese enterprises who streamlined their VAT filing,
            financial statements, and multi-branch audits with Pivotal ERP.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/trial")}
              style={{
                background: "#FFFFFF",
                color: palette.primary,
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "12px 26px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                height: "46px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
            >
              Start 14-Day Free Trial <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "0.95rem",
                padding: "12px 26px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                height: "46px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Modern Footer ──────────────────────────────────────────────────────────
function Footer() {
  const brandLogo = useBrandLogo();
  const { palette } = useThemeStore();

  return (
    <footer
      style={{
        background: "#061C1A",
        color: "rgba(255,255,255,0.7)",
        padding: "4rem 1.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <Link
                to="/"
                onClick={(e) => {
                  if (window.location.pathname === "/" || window.location.pathname === "/erp_ui" || window.location.pathname === "/erp_ui/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0 });
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255,255,255,0.06)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                title="Pivotal ERP - Return to Top"
              >
                <img
                  src={brandLogo}
                  alt="Pivotal ERP"
                  style={{
                    height: 38,
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.2)",
                    paddingLeft: "9px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                    a product of
                  </span>
                  <img
                    src="/erp_ui/dynamic-technosoft-logo.png"
                    alt="Dynamic Technosoft"
                    title="Dynamic Technosoft"
                    style={{
                      height: 18,
                      width: "auto",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                      opacity: 0.9,
                    }}
                  />
                </div>
              </Link>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 280,
              }}
            >
              Nepal&apos;s premier cloud ERP for enterprise accounting, IRD tax
              filings, inventory, and multi-branch management.
            </p>
            <div
              style={{
                marginTop: "1.25rem",
                fontSize: "0.8rem",
                color: palette.secondary,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <CheckCircle2 size={15} /> Verified with IRD Annexure 13
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Double-Entry Accounting", href: "#features" },
                { label: "VAT & TDS Filing", href: "#features" },
                { label: "Bikram Sambat Calendar", href: "#features" },
                { label: "Multi-Branch Ledger", href: "#features" },
                { label: "Pricing", href: "#pricing" },
              ],
            },
            {
              title: "Industries",
              links: [
                { label: "Wholesale & Trading", href: "#industries" },
                { label: "Manufacturing & BOM", href: "#industries" },
                { label: "Hotels & Restaurants", href: "#industries" },
                { label: "Healthcare & Clinics", href: "#industries" },
                { label: "Contracting & Projects", href: "#industries" },
              ],
            },
            {
              title: "Resources & Legal",
              links: [
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "IRD XML Standards", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  margin: "0 0 1.25rem",
                }}
              >
                {col.title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.825rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Pivotal ERP Pvt. Ltd. Kathmandu, Nepal.
            All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              to="/login"
              style={{ color: palette.accent || palette.primary, textDecoration: "none" }}
            >
              Staff Portal
            </Link>
            <Link
              to="/trial"
              style={{ color: palette.secondary, textDecoration: "none" }}
            >
              Free Trial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root Landing Page ───────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    setSettings(mockDB.getSettings());
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!settings) {
    return <div style={{ background: "#092825", minHeight: "100vh" }} />;
  }

  return (
    <main
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        fontFamily:
          'var(--font-primary, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        fontFeatureSettings: '"tnum" 1, "cv05" 1',
      }}
    >
      <LandingNav scrolled={scrolled} />
      <HeroSection settings={settings} />
      {settings.landingPageSections?.features !== false && (
        <>
          <BentoCapabilities />
          <ComparisonSection />
          <RoiCalculator />
        </>
      )}
      {settings.landingPageSections?.industries !== false && (
        <IndustriesSection />
      )}
      {settings.landingPageSections?.pricing !== false && <PricingSection />}
      <FAQSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}

