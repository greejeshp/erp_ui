import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ShopOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  HomeOutlined,
  ShoppingOutlined,
  DollarOutlined,
  CoffeeOutlined,
  RobotOutlined,
  UploadOutlined,
  CalendarOutlined,
  DownOutlined,
  UpOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  CheckCircleFilled,
  FileTextOutlined,
  CloseOutlined,
  CloseCircleFilled,
  DragOutlined,
  BranchesOutlined,
  BarcodeOutlined,
  SendOutlined,
  AppstoreAddOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { mockDB, MOCK_PLANS, MOCK_AGREEMENT } from "@/lib/mock/mockData";
import { formatNPR } from "@/lib/mock/accountingData";
import { useThemeStore } from "@/lib/store/themeStore";
import { useBrandLogo } from "@/lib/brand/logoHelper";

import {
  SafetyCertificateOutlined,
  LockOutlined,
  KeyOutlined,
  UserOutlined,
  CreditCardOutlined,
  BankOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined,
  WhatsAppOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

// ─── Enterprise Split Layout (Linear/Stripe Standard) ─────────
interface StepperItem {
  key: number;
  title: string;
  subtitle: string;
  badge?: string;
}

const ONBOARDING_STEPS: StepperItem[] = [
  { key: 0, title: "Your Profile", subtitle: "Personal & email verification" },
  { key: 1, title: "Setup Organization", subtitle: "Entity, fiscal year & AI modules" },
  { key: 2, title: "Plan Selection", subtitle: "Starter, Growth & Enterprise" },
  { key: 3, title: "Billing & Launch", subtitle: "Tax invoice, terms & activation" },
];

// ─── Testimonials Data & Interactive Slider ──────────────────
// ─── Blended Enterprise Slider (AI Features + Customer Social Proof) ───
type BlendedCardType = "ai" | "testimonial";

interface BlendedSlideItem {
  id: string;
  type: BlendedCardType;
  badge: string;
  category: string;
  headline: string;
  description: string;
  highlight: string;
  authorMeta?: {
    name: string;
    role: string;
    company: string;
    initials: string;
  };
}

const BLENDED_SLIDES: BlendedSlideItem[] = [
  // 1. AI Spotlight: Smart OCR
  {
    id: "ai-ocr",
    type: "ai",
    badge: "COPILOT™ AI",
    category: "Smart Ingestion",
    headline: "AI Bill & VAT Invoice Capture",
    description: "Scan tax invoices, receipts, and challans with instant line-item and PAN recognition.",
    highlight: "⚡ 99.4% Extraction Accuracy",
  },
  // 2. Verified Client: Trading
  {
    id: "test-trading",
    type: "testimonial",
    badge: "CLIENT STORY",
    category: "Trading & Distribution",
    headline: "Automated VAT & 4-Branch Reconciliation",
    description: "Pivotal ERP automated our VAT filing and inventory reconciliation across 4 branches within days.",
    highlight: "✓ Verified Nepal Enterprise",
    authorMeta: {
      name: "Rajan K. Shrestha",
      role: "CFO",
      company: "Himalayan Trading Group",
      initials: "R",
    },
  },
  // 3. AI Spotlight: Predictive Treasury
  {
    id: "ai-cashflow",
    type: "ai",
    badge: "COPILOT™ AI",
    category: "Predictive Radar",
    headline: "Cash-Flow & Anomaly Forecast",
    description: "Predict liquidity shortfalls and identify irregular expense spikes 30 days ahead.",
    highlight: "⚡ 30-Day Predictive Runway",
  },
  // 4. Verified Client: Manufacturing
  {
    id: "test-mfg",
    type: "testimonial",
    badge: "CLIENT STORY",
    category: "Manufacturing",
    headline: "Multi-Level BOM & 18% Waste Reduction",
    description: "Multi-level BOM costing and raw material batch tracking reduced our manufacturing waste by 18%.",
    highlight: "✓ Verified Nepal Enterprise",
    authorMeta: {
      name: "Prashant Thapa",
      role: "Head of Operations",
      company: "Yeti Pharma & Mfg",
      initials: "P",
    },
  },
  // 5. AI Spotlight: Statutory IRD Sync
  {
    id: "ai-ird",
    type: "ai",
    badge: "COPILOT™ AI",
    category: "Statutory Sync",
    headline: "Instant CBMS Annex Reconcile",
    description: "Auto-reconcile Annex 5/7/8/9 ledgers against live Nepal Inland Revenue CBMS portals.",
    highlight: "⚡ Zero-Lag IRD Audit Trail",
  },
  // 6. Verified Client: Services & IT
  {
    id: "test-services",
    type: "testimonial",
    badge: "CLIENT STORY",
    category: "Services & IT",
    headline: "Direct IRD CBMS E-Billing Audit Peace",
    description: "Direct IRD CBMS e-billing synchronization gives our audit committee 100% peace of mind every month.",
    highlight: "✓ Verified Nepal Enterprise",
    authorMeta: {
      name: "Sunita Adhikari, FCA",
      role: "Managing Partner",
      company: "Apex Advisory & Tech",
      initials: "S",
    },
  },
];

function BlendedEnterpriseSlider({ isDark }: { isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Smooth cross-fade transition helper
  const transitionTo = (nextIdx: number) => {
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setFadeState("in");
    }, 200);
  };

  // Auto-advance every 5.5 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      transitionTo((currentIndex + 1) % BLENDED_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const current = BLENDED_SLIDES[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    transitionTo((currentIndex - 1 + BLENDED_SLIDES.length) % BLENDED_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    transitionTo((currentIndex + 1) % BLENDED_SLIDES.length);
  };

  const isAi = current.type === "ai";

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: "transparent",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.18)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.18)",
        padding: "0.85rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "155px",
        boxSizing: "border-box",
      }}
    >
      {/* Header: Tag + Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {isAi ? (
            <RobotOutlined style={{ color: isDark ? "#22D3EE" : "#6EE7B7", fontSize: 13 }} />
          ) : (
            <SafetyCertificateOutlined style={{ color: isDark ? "#34D399" : "#6EE7B7", fontSize: 13 }} />
          )}
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "1px 6px",
              borderRadius: 4,
              background: isAi
                ? isDark ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.18)"
                : isDark ? "rgba(16,185,129,0.14)" : "rgba(255,255,255,0.18)",
              color: isAi ? (isDark ? "#22D3EE" : "#A7F3D0") : (isDark ? "#34D399" : "#A7F3D0"),
            }}
          >
            {current.badge}
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              color: isDark ? "#94A3B8" : "rgba(255,255,255,0.7)",
              fontWeight: 500,
            }}
          >
            • {current.category}
          </span>
        </div>

        {/* Micro-Navigation Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.14)",
              border: "none",
              cursor: "pointer",
              color: "#FFFFFF",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              fontSize: 9,
              transition: "background 0.2s",
            }}
          >
            <LeftOutlined />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.14)",
              border: "none",
              cursor: "pointer",
              color: "#FFFFFF",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              fontSize: 9,
              transition: "background 0.2s",
            }}
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      {/* Smooth Cross-Fade Dynamic Content Container (Fixed Height) */}
      <div
        style={{
          height: "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: fadeState === "in" ? 1 : 0,
          transform: fadeState === "in" ? "translateY(0)" : "translateY(2px)",
          transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
        }}
      >
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: isDark ? "#F8FAFC" : "#FFFFFF",
            letterSpacing: "-0.01em",
            marginBottom: 3,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {isAi ? current.headline : `“${current.headline}”`}
        </div>

        <p
          style={{
            fontSize: "0.7rem",
            color: isDark ? "#CBD5E1" : "rgba(255,255,255,0.85)",
            margin: 0,
            lineHeight: 1.38,
            fontStyle: isAi ? "normal" : "italic",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {current.description}
        </p>
      </div>

      {/* Footer: Metadata + Progress Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 4,
        }}
      >
        {/* Author / Metric */}
        {current.authorMeta ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: isDark ? "#008B94" : "rgba(255,255,255,0.25)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                fontWeight: 800,
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {current.authorMeta.initials}
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                color: isDark ? "#38BDF8" : "#FFFFFF",
                fontWeight: 650,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "180px",
              }}
            >
              {current.authorMeta.name} · <span style={{ color: isDark ? "#94A3B8" : "rgba(255,255,255,0.75)", fontWeight: 400 }}>{current.authorMeta.company}</span>
            </div>
          </div>
        ) : (
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: isDark ? "#38BDF8" : "#A7F3D0",
              letterSpacing: "0.02em",
            }}
          >
            {current.highlight}
          </span>
        )}

        {/* Unified Micro-Progress Indicators */}
        <div style={{ display: "flex", gap: 3, alignItems: "center", flexShrink: 0 }}>
          {BLENDED_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => transitionTo(idx)}
              style={{
                width: currentIndex === idx ? 12 : 4,
                height: 3.5,
                borderRadius: 2,
                background: currentIndex === idx
                  ? (isDark ? "#22D3EE" : "#FFFFFF")
                  : (isDark ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.35)"),
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnterpriseSplitLayout({
  children,
  currentStep,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  currentStep: number;
  title: string;
  subtitle: string;
}) {
  const { mode, palette } = useThemeStore();
  const brandLogo = useBrandLogo();
  const isDark = mode === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: isDark ? "#090D16" : "#F8FAFC",
        fontFamily: "var(--font-primary)",
        color: isDark ? "#F8FAFC" : "#0F172A",
      }}
    >
      {/* ── Left Sidebar (Brand & Vertical Stepper) ── */}
      <aside
        style={{
          width: "350px",
          minWidth: "320px",
          maxWidth: "360px",
          flexShrink: 0,
          boxSizing: "border-box",
          background: isDark
            ? "linear-gradient(180deg, #0F172A 0%, #090D16 100%)"
            : `linear-gradient(180deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
          color: "#FFFFFF",
          padding: "1.75rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          borderRight: isDark ? "1px solid #1E293B" : "none",
          boxShadow: isDark
            ? "4px 0 24px rgba(0,0,0,0.4)"
            : `4px 0 20px ${palette.primary}33`,
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem", paddingTop: "1.75rem" }}>
          {/* Brand Header */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "0.25rem",
            }}
          >
            <img
              src={brandLogo}
              alt="Pivotal ERP Logo"
              style={{
                height: 48,
                width: "auto",
                objectFit: "contain",
                filter: isDark ? "none" : (palette.id.startsWith("pivotal-") ? "none" : "brightness(0) invert(1)"),
              }}
            />
          </Link>

          <div>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isDark ? "#22D3EE" : "#A7F3D0",
                display: "block",
                marginBottom: 2,
              }}
            >
              Enterprise Onboarding
            </span>
            <h2
              style={{
                fontSize: "1.08rem",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 3px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Setup Your Workspace
            </h2>
            <p
              style={{
                fontSize: "0.76rem",
                color: isDark ? "#94A3B8" : "rgba(255,255,255,0.85)",
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              4 streamlined steps · Nepal IRD &amp; NFRS compliant
            </p>
          </div>

          {/* Vertical Stepper: Ergonomically scaled with relaxed breathing room */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {ONBOARDING_STEPS.map((s, idx) => {
              const isDone = s.key < currentStep;
              const isActive = s.key === currentStep;

              return (
                <div key={s.key} style={{ display: "flex", gap: "14px", position: "relative" }}>
                  {/* Step Connector Line */}
                  {idx < ONBOARDING_STEPS.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "30px",
                        bottom: "-2px",
                        width: "2px",
                        background: isDone
                          ? isDark ? "#008B94" : "#34D399"
                          : isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.22)",
                        transition: "background 0.3s ease",
                      }}
                    />
                  )}

                  {/* Step Circle */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      zIndex: 1,
                      transition: "all 0.25s ease",
                      background: isDone
                        ? isDark ? "#008B94" : "#10B981"
                        : isActive
                        ? "#FFFFFF"
                        : isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)",
                      color: isDone
                        ? "#FFFFFF"
                        : isActive
                        ? (isDark ? "#0F172A" : "#0F766E")
                        : (isDark ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)"),
                      border: isActive
                        ? `2px solid ${isDark ? "#22D3EE" : "#6EE7B7"}`
                        : "none",
                      boxShadow: isActive
                        ? "0 0 10px rgba(255,255,255,0.25)"
                        : "none",
                    }}
                  >
                    {isDone ? <CheckOutlined style={{ fontSize: 12, strokeWidth: 3 }} /> : s.key + 1}
                  </div>

                  {/* Step Text */}
                  <div style={{ paddingBottom: idx === ONBOARDING_STEPS.length - 1 ? "0.2rem" : "1.25rem" }}>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: isActive ? 700 : 600,
                        color: isActive
                          ? "#FFFFFF"
                          : isDone
                          ? (isDark ? "#E2E8F0" : "#F0FDF4")
                          : (isDark ? "#64748B" : "rgba(255,255,255,0.6)"),
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {s.title}
                      {isActive && (
                        <span
                          style={{
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            padding: "1px 5px",
                            borderRadius: 4,
                            background: isDark ? "rgba(34,211,238,0.2)" : "rgba(255,255,255,0.2)",
                            color: isDark ? "#22D3EE" : "#FFFFFF",
                            letterSpacing: "0.02em",
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: isDark ? "#94A3B8" : "rgba(255,255,255,0.7)",
                        marginTop: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flexible spacer */}
        <div style={{ flex: 1, minHeight: "0.5rem" }} />

        {/* ── Bottom Section: Blended Slider + Terminal Trust & Compliance Strip ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Unified Blended Slider (AI Capabilities & Client Stories) */}
          <BlendedEnterpriseSlider isDark={isDark} />

          {/* Placed at the very end: Seamless Blended Support Strip (Icons + Plain White Phone) */}
          <div
            style={{
              padding: "0.4rem 0.25rem 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              fontSize: "0.78rem",
            }}
          >
            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/9779801234567?text=Hello%20Pivotal%20ERP%20Support%2C%20I%20have%20a%20query%20regarding%20my%20onboarding."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#25D366",
                fontSize: 15,
                lineHeight: 1,
                textDecoration: "none",
                transition: "transform 0.15s ease, opacity 0.15s ease",
                opacity: 0.95,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "0.95";
              }}
            >
              <WhatsAppOutlined style={{ fontSize: 15 }} />
            </a>

            {/* Viber Icon */}
            <a
              href="viber://chat?number=%2B9779801234567"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on Viber"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8F5DB7",
                fontSize: 15,
                lineHeight: 1,
                textDecoration: "none",
                transition: "transform 0.15s ease, opacity 0.15s ease",
                opacity: 0.95,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "0.95";
              }}
            >
              <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
                <path d="M19.78 3.01C16.89.8 11.23.99 8.21 2.39 5.34 3.72 3.19 6.25 2.5 9.47c-.51 2.4-.2 5.25.96 7.42l-.84 3.97a.88.88 0 001.07 1.04l3.92-.93c2.27 1.1 4.7 1.49 7.15 1.14 3.32-.47 6.13-2.34 7.68-5.3 1.63-3.1 1.42-7.07-.48-9.97l-2.18-3.83zm-1.85 11.75c-.24.71-1.04 1.34-1.8 1.49-.67.13-1.57.17-3.95-.81-2.9-1.2-4.83-4.14-4.98-4.34-.14-.2-1.18-1.58-1.18-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.19.01.44-.07.69.53.25.61.86 2.11.94 2.26.07.16.12.34.02.54-.1.2-.15.33-.3.51-.15.17-.32.39-.45.52-.15.15-.31.31-.13.62.17.31.78 1.28 1.67 2.07 1.15 1.02 2.11 1.34 2.42 1.49.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.1 1.84.87 2.16 1.03.31.15.52.23.6.36.08.13.08.77-.16 1.48z"/>
              </svg>
            </a>

            {/* Subtle Divider dot */}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", lineHeight: 1 }}>•</span>

            {/* General Phone Number with matched phone icon */}
            <a
              href="tel:+977015970000"
              title="Call Support Hotline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#FFFFFF",
                fontSize: "0.78rem",
                fontWeight: 600,
                textDecoration: "none",
                background: "transparent",
                border: "none",
                padding: 0,
                letterSpacing: "0.02em",
                lineHeight: 1,
                transition: "opacity 0.15s ease",
                opacity: 0.95,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.95"; }}
            >
              <PhoneOutlined style={{ color: isDark ? "#22D3EE" : "#34D399", fontSize: 14, display: "inline-flex" }} />
              <span style={{ color: "#FFFFFF" }}>+977-1-5970000</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ── Right Content Area ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top Minimal Bar */}
        <header
          style={{
            padding: "0.85rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: isDark ? "1px solid #1E293B" : "1px solid #E2E8F0",
            background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: "0.8125rem",
                color: isDark ? "#94A3B8" : "#64748B",
                fontWeight: 500,
              }}
            >
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}:
            </span>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: isDark ? "#F8FAFC" : "#0F172A",
              }}
            >
              {ONBOARDING_STEPS[currentStep]?.title}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: "0.8125rem", color: isDark ? "#94A3B8" : "#64748B" }}>
              Already registered?
            </span>
            <Link
              to="/login"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: isDark ? "#22D3EE" : "#0F766E",
                textDecoration: "none",
              }}
            >
              Sign In →
            </Link>
          </div>
        </header>

        {/* Main Step Canvas */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem 2.5rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "780px",
              background: isDark ? "#131C2E" : "#FFFFFF",
              borderRadius: 14,
              border: isDark ? "1px solid #1E293B" : "1px solid #E2E8F0",
              boxShadow: isDark
                ? "0 4px 24px rgba(0,0,0,0.35)"
                : "0 1px 3px rgba(0,0,0,0.04), 0 10px 25px -5px rgba(0,0,0,0.04)",
              padding: "2rem 2.25rem",
              boxSizing: "border-box",
            }}
          >
            {/* Header within card */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h1
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.015em",
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: isDark ? "#94A3B8" : "#64748B",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Input Component ──────────────────────────────────────────
function Input({ label, type = "text", value, onChange, placeholder, error, required }: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; required?: boolean;
}) {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <div style={{ marginBottom: "1.15rem" }}>
      <label style={{
        display: "block",
        color: isDark ? "rgba(255,255,255,0.85)" : "#334155",
        fontSize: "0.8125rem",
        fontWeight: 600,
        marginBottom: "0.4rem",
        letterSpacing: "-0.01em",
      }}>
        {label}{required && <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          height: 42,
          padding: "0 14px",
          borderRadius: 8,
          border: error ? "1.5px solid #EF4444" : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
          background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF", 
          color: isDark ? "#F8FAFC" : "#0F172A",
          fontSize: "0.875rem",
          outline: "none",
          fontFamily: "var(--font-primary)",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          if (!error) {
            (e.target as HTMLInputElement).style.borderColor = isDark ? "#22D3EE" : "#0F766E";
            (e.target as HTMLInputElement).style.boxShadow = isDark
              ? "0 0 0 2px rgba(34,211,238,0.2)"
              : "0 0 0 2px rgba(15,118,110,0.15)";
          }
        }}
        onBlur={(e) => {
          if (!error) {
            (e.target as HTMLInputElement).style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1";
            (e.target as HTMLInputElement).style.boxShadow = "none";
          }
        }}
      />
      {error && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{error}</p>}
    </div>
  );
}

// ─── 6-Digit Premium Light OTP Input Component ────────────────
function DigitOtpInput({
  value,
  onChange,
  error,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Split value into array of 6 chars
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  const handleDigitChange = (index: number, char: string) => {
    // Only accept numeric digits
    const clean = char.replace(/\D/g, "");
    if (!clean && char !== "") return;

    const newDigits = [...digits];
    newDigits[index] = clean.slice(-1); // Take last typed digit
    const combined = newDigits.join("");
    onChange(combined);

    // Auto-focus next box if digit was typed
    if (clean && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move to previous box if current is already empty
        const prevInput = document.getElementById(`otp-digit-${index - 1}`) as HTMLInputElement | null;
        if (prevInput) {
          prevInput.focus();
          const newDigits = [...digits];
          newDigits[index - 1] = "";
          onChange(newDigits.join(""));
        }
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) prevInput.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData) {
      onChange(pasteData);
      const focusTargetIdx = Math.min(pasteData.length, 5);
      const targetInput = document.getElementById(`otp-digit-${focusTargetIdx}`) as HTMLInputElement | null;
      if (targetInput) {
        targetInput.focus();
        targetInput.select();
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          maxWidth: "340px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const isFocused = focusedIndex === i;
          const isFilled = Boolean(digits[i]);

          return (
            <input
              key={i}
              id={`otp-digit-${i}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digits[i]}
              disabled={disabled}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => {
                setFocusedIndex(i);
                e.target.select();
              }}
              onBlur={() => setFocusedIndex(null)}
              style={{
                width: "48px",
                height: "52px",
                textAlign: "center",
                fontSize: "1.25rem",
                fontWeight: 500,
                fontFamily: "var(--font-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
                borderRadius: 10,
                outline: "none",
                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                color: isDark ? "#FFFFFF" : "#0F172A",
                background: isDark
                  ? isFocused
                    ? "rgba(0,139,148,0.12)"
                    : isFilled
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.04)"
                  : isFocused
                  ? "#FFFFFF"
                  : isFilled
                  ? "#F8FAFC"
                  : "#FFFFFF",
                border: error
                  ? "2px solid #ef4444"
                  : isFocused
                  ? "2px solid #008B94"
                  : isFilled
                  ? isDark
                    ? "1.5px solid rgba(0,139,148,0.5)"
                    : "1.5px solid rgba(0,139,148,0.4)"
                  : isDark
                  ? "1px solid rgba(255,255,255,0.14)"
                  : "1px solid rgba(15,23,42,0.12)",
                boxShadow: error
                  ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
                  : isFocused
                  ? "0 4px 14px rgba(0,139,148,0.2), 0 0 0 3px rgba(0,139,148,0.12)"
                  : isFilled
                  ? "0 2px 6px rgba(0,0,0,0.04)"
                  : "0 1px 3px rgba(0,0,0,0.02)",
                transform: isFocused ? "translateY(-1px)" : "none",
              }}
            />
          );
        })}
      </div>
      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: 8, marginBottom: 0, fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Primary Button ───────────────────────────────────────────
function PrimaryButton({ children, onClick, loading, fullWidth, variant = "primary" }: {
  children: React.ReactNode; onClick?: () => void; loading?: boolean; fullWidth?: boolean; variant?: "primary" | "secondary" | "outline";
}) {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: isDark
        ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
        : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
      color: "#FFFFFF",
      boxShadow: isDark ? "0 4px 16px rgba(0, 139, 148, 0.3)" : "0 4px 14px rgba(15, 118, 110, 0.25)",
    },
    secondary: {
      background: isDark
        ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
        : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
      color: "#FFFFFF",
      boxShadow: isDark ? "0 4px 16px rgba(0, 139, 148, 0.3)" : "0 4px 14px rgba(15, 118, 110, 0.25)",
    },
    outline: {
      background: "transparent",
      color: isDark ? "#22D3EE" : "#0F766E",
      border: isDark ? "1.5px solid rgba(34,211,238,0.4)" : "1.5px solid #0F766E",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: fullWidth ? "100%" : "auto",
        height: 44,
        padding: "0 24px",
        borderRadius: 8,
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "var(--font-primary)",
        fontWeight: 700,
        fontSize: "0.875rem",
        opacity: loading ? 0.7 : 1,
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...styles[variant],
      }}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

// ─── Agreement Modal (Used by TrialPage) ──────────────────────
export function AgreementModal({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false);
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.8)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
        borderRadius: 14, width: "100%", maxWidth: 600,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        padding: "1.5rem 2rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ color: isDark ? "#F8FAFC" : "#0F172A", margin: 0 }}>{MOCK_AGREEMENT.title}</h3>
          <button
            type="button"
            onClick={() => {
              const textContent = `PIVOTAL ERP - TERMS OF SERVICE & USER AGREEMENT\nLast Updated: July 2025\n\n` +
                MOCK_AGREEMENT.content.replace(/<[^>]+>/g, "\n").replace(/\n\s*\n/g, "\n\n").trim();
              const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "Pivotal_ERP_User_Agreement.txt";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            title="Download Agreement as Text/Document"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #CBD5E1",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: isDark ? "#E2E8F0" : "#334155",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <DownloadOutlined style={{ color: "#008B94", fontSize: 13 }} />
            <span>Download</span>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", fontSize: "0.85rem", color: isDark ? "#CBD5E1" : "#334155", lineHeight: 1.6, padding: "10px 0" }}
          dangerouslySetInnerHTML={{ __html: MOCK_AGREEMENT.content }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 8, margin: "1rem 0", cursor: "pointer" }}>
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span style={{ fontSize: "0.85rem", color: isDark ? "#E2E8F0" : "#0F172A" }}>I agree to the Terms of Service & Privacy Policy</span>
        </label>
        <button
          onClick={onAccept}
          disabled={!checked}
          style={{
            padding: "10px", borderRadius: 8, border: "none",
            background: checked ? "#008B94" : "#94A3B8", color: "white", fontWeight: 700, cursor: checked ? "pointer" : "not-allowed",
          }}
        >
          Accept &amp; Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Company Creation Modal (Used by TrialPage) ────────────────
export function CompanyCreationModal({ onSuccess, userEmail }: { onSuccess: (company: any) => void; userEmail: string }) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Trading");
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.8)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
        borderRadius: 14, width: "100%", maxWidth: 480, padding: "2rem",
      }}>
        <h3 style={{ color: isDark ? "#F8FAFC" : "#0F172A", margin: "0 0 12px 0" }}>Set Up Organization</h3>
        <Input label="Organization Name" value={name} onChange={setName} placeholder="e.g. Acme Corp" required />
        <button
          onClick={() => {
            if (!name.trim()) return;
            const company = mockDB.registerCompany({
              name,
              code: "",
              subdomain: "",
              email: userEmail,
              phone: "+977-9800000000",
              address: "Kathmandu, Nepal",
              industry,
              panVat: "123456789",
              registrationNo: "",
              subscriptionPlan: "starter",
              status: "trial",
              isTrial: true,
              autoVerified: true,
            });
            onSuccess(company);
          }}
          disabled={!name.trim()}
          style={{
            width: "100%", padding: "12px", borderRadius: 8, border: "none",
            background: name.trim() ? "#008B94" : "#94A3B8", color: "white", fontWeight: 700, cursor: name.trim() ? "pointer" : "not-allowed",
          }}
        >
          Complete Setup &amp; Launch →
        </button>
      </div>
    </div>
  );
}

// ─── Organization Setup Component (Senior ERP Standard) ───────
export function OrganizationSetupForm({
  userEmail,
  userPhone,
  onBack,
  onProceedToAgreement,
}: {
  userEmail: string;
  userPhone: string;
  onBack: () => void;
  onProceedToAgreement: (orgData: {
    name: string;
    industry: string;
    address: string;
    startDate: string;
    isVatRegistered: string;
    logoUrl?: string;
    email: string;
    phone: string;
    panNumber: string;
    accountingFeatures: Record<string, boolean>;
  }) => void;
}) {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  // Core organization profile
  const [name, setName] = useState("Techno Trip Pvt. Ltd.");
  const [industry, setIndustry] = useState("Travel & Tours");
  const [address, setAddress] = useState("Jhamsikhel, Lalitpur");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Contact & Statutory Details
  const [orgEmail, setOrgEmail] = useState(userEmail || "contact@technotrip.com");
  const [orgPhone, setOrgPhone] = useState(userPhone || "+977-9841234567");
  const [panNumber, setPanNumber] = useState("123456789");

  // Accounting & Enterprise Features
  const [accountingFeatures, setAccountingFeatures] = useState<Record<string, boolean>>({
    trackInventory: true,
    multipleLocations: true,
    enableManufacturing: false,
    multipleWarehouses: false,
    posRetail: false,
    multiCurrency: false,
    posRestaurant: false,
    aiCopilot: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFeature = (key: string) => {
    setAccountingFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Logo file size must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAndProceed = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Organization name is required";
    if (!orgEmail.trim()) errs.orgEmail = "Organization email is required";
    if (panNumber.trim() && !/^\d{9}$/.test(panNumber.trim())) {
      errs.panNumber = "PAN must be a valid 9-digit number";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onProceedToAgreement({
      name,
      industry,
      address,
      startDate: "01-04-2081",
      isVatRegistered: panNumber.trim() ? "Yes" : "No",
      logoUrl: logoPreview || undefined,
      email: orgEmail,
      phone: orgPhone,
      panNumber,
      accountingFeatures,
    });
  };

  const industries = [
    "Travel & Tours",
    "Trading & Distribution",
    "Service & Consultancy",
    "Manufacturing & Production",
    "Retail & E-commerce",
    "Hospitality & Restaurants",
    "Healthcare & Pharmaceuticals",
    "Construction & Real Estate",
    "Information Technology",
    "Education & Academy",
    "Agriculture & Livestock",
    "NGO / INGO / Non-Profit",
  ];

  // ── Enterprise Module Catalog (Beyond Tigg: True ERP Architecture) ──
  const MODULE_CATALOG = [
    {
      key: "trackInventory",
      icon: <ShopOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Multi-Echelon Inventory",
      category: "Supply Chain",
      badge: "Core Ops",
      desc: "Batch & serial tracking, warehouse godown transfers, landed cost allocation & valuation.",
    },
    {
      key: "aiCopilot",
      icon: <RobotOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Pivotal Copilot™ AI",
      category: "Autonomous AI",
      badge: "AI Powered",
      desc: "Smart bill/receipt OCR ingestion, auto bank feed reconciliation & cash forecasting.",
    },
    {
      key: "irdSync",
      icon: <SafetyCertificateOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Nepal IRD E-Billing Sync",
      category: "Compliance",
      badge: "Statutory",
      desc: "Direct CBMS API push to Inland Revenue Dept, Annex 5/7/8/9 auto-generation & audit trail.",
    },
    {
      key: "enableManufacturing",
      icon: <ToolOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Manufacturing & BOM",
      category: "Production",
      badge: "Advanced",
      desc: "Multi-level Bills of Materials, shop-floor WIP costing, and raw material assembly orders.",
    },
    {
      key: "posRetail",
      icon: <ShoppingOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Omnichannel POS",
      category: "Retail / F&B",
      badge: "Counter Register",
      desc: "High-speed barcode scanning, touch registers, split payments & thermal receipt printing.",
    },
    {
      key: "multiCurrency",
      icon: <DollarOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Multi-Currency Treasury",
      category: "Finance",
      badge: "Treasury",
      desc: "Live NRB daily exchange rates, FX gain/loss accounting & foreign currency bank ledgers.",
    },
    {
      key: "multipleLocations",
      icon: <BranchesOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Multi-Branch Ledger",
      category: "Enterprise",
      badge: "Consolidation",
      desc: "Segmented branch Profit & Loss, inter-branch ledger reconciliations & cost centers.",
    },
    {
      key: "arBot",
      icon: <SendOutlined style={{ fontSize: 18, color: "#008B94" }} />,
      title: "Automated A/R Bot",
      category: "Automation",
      badge: "Cash Flow",
      desc: "Automated WhatsApp/SMS payment reminders with Fonepay & ConnectIPS deep-links.",
    },
  ];

  // Drag & drop state
  const [draggedKey, setDraggedKey] = useState<string | null>(null);
  const [isDragOverDropzone, setIsDragOverDropzone] = useState(false);

  // Active vs Available lists derived from accountingFeatures state
  const activeModules = MODULE_CATALOG.filter((m) => Boolean(accountingFeatures[m.key]));
  const availableModules = MODULE_CATALOG.filter((m) => !accountingFeatures[m.key]);

  const addModule = (key: string) => {
    setAccountingFeatures((prev) => ({ ...prev, [key]: true }));
  };

  const removeModule = (key: string) => {
    setAccountingFeatures((prev) => ({ ...prev, [key]: false }));
  };

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, key: string) => {
    e.dataTransfer.setData("text/plain", key);
    setDraggedKey(key);
  };

  const handleDropToActive = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverDropzone(false);
    const key = e.dataTransfer.getData("text/plain") || draggedKey;
    if (key) {
      addModule(key);
    }
    setDraggedKey(null);
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData("text/plain") || draggedKey;
    if (key) {
      removeModule(key);
    }
    setDraggedKey(null);
  };

  // 1-Click Industry Presets & Active Selection Tracker
  const [activePreset, setActivePreset] = useState<string>("Trading");

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    const presets: Record<string, string[]> = {
      Trading: ["trackInventory", "aiCopilot", "irdSync", "multiCurrency"],
      Manufacturing: ["trackInventory", "enableManufacturing", "aiCopilot", "irdSync", "multipleLocations"],
      Retail: ["trackInventory", "posRetail", "aiCopilot", "irdSync", "arBot"],
      Services: ["aiCopilot", "irdSync", "multiCurrency", "arBot"],
      "Hospitality & Tours": ["posRetail", "multiCurrency", "aiCopilot", "irdSync", "multipleLocations"],
    };

    const targetKeys = presets[presetName] || ["trackInventory", "aiCopilot", "irdSync"];
    const updated: Record<string, boolean> = {};
    MODULE_CATALOG.forEach((m) => {
      updated[m.key] = targetKeys.includes(m.key);
    });
    setAccountingFeatures(updated);
  };

  return (
    <div style={{ textAlign: "left" }}>
      {/* Enterprise Organization Information Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px 20px",
        marginBottom: "1.75rem",
      }}>
        {/* Row 1, Col 1: Organization Name */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Organization Name <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g. Techno Trip Pvt. Ltd."
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: errors.name ? "1.5px solid #EF4444" : isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {errors.name && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{errors.name}</p>}
        </div>

        {/* Row 1, Col 2: Industry */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Industry <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {industries.map((ind) => (
              <option key={ind} value={ind} style={{ background: isDark ? "#1E293B" : "#FFFFFF", color: isDark ? "#F8FAFC" : "#0F172A" }}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2, Col 1: Organization Email */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Organization Email <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
          </label>
          <input
            type="email"
            value={orgEmail}
            onChange={(e) => {
              setOrgEmail(e.target.value);
              setErrors((prev) => ({ ...prev, orgEmail: "" }));
            }}
            placeholder="contact@company.com"
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: errors.orgEmail ? "1.5px solid #EF4444" : isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {errors.orgEmail && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{errors.orgEmail}</p>}
        </div>

        {/* Row 2, Col 2: Organization Phone */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Organization Phone
          </label>
          <input
            type="text"
            value={orgPhone}
            onChange={(e) => setOrgPhone(e.target.value)}
            placeholder="+977-9841234567"
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Row 3, Col 1: PAN / VAT Number */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            PAN / VAT Number
          </label>
          <input
            type="text"
            value={panNumber}
            onChange={(e) => {
              setPanNumber(e.target.value.replace(/\D/g, "").slice(0, 9));
              setErrors((prev) => ({ ...prev, panNumber: "" }));
            }}
            placeholder="9-digit PAN (123456789)"
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: errors.panNumber ? "1.5px solid #EF4444" : isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {errors.panNumber && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{errors.panNumber}</p>}
        </div>

        {/* Row 3, Col 2: Organization Address */}
        <div>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Organization Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
            placeholder="e.g. Jhamsikhel, Lalitpur"
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              fontSize: "0.875rem",
              borderRadius: 8,
              border: errors.address ? "1.5px solid #EF4444" : isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
              background: isDark ? "#0F172A" : "#FFFFFF",
              color: isDark ? "#F8FAFC" : "#0F172A",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {errors.address && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{errors.address}</p>}
        </div>

        {/* Row 4: Company Logo (Full Width Horizontal Upload Card) */}
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
            Company Brand Logo
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/png, image/jpeg, image/gif, image/webp"
            style={{ display: "none" }}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: "100%",
              border: isDark ? "1.5px dashed rgba(255,255,255,0.2)" : "1.5px dashed #CBD5E1",
              borderRadius: 10,
              background: isDark ? "#0F172A" : "#F8FAFC",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "10px 16px",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#0F766E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "#CBD5E1";
            }}
          >
            {/* Square 1:1 Preview / Placeholder */}
            <div style={{
              width: 58,
              height: 58,
              minWidth: 58,
              aspectRatio: "1/1",
              borderRadius: 8,
              background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
              border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <UploadOutlined style={{ fontSize: 20, color: "#64748B" }} />
              )}
            </div>

            {/* Upload prompt text */}
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: "0.84rem", fontWeight: 600, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                  {logoPreview ? "Replace Logo" : "Upload Brand Logo"}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.72rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                Recommended 300×300px square format. Supports PNG, JPG, or WEBP up to 5MB.
              </p>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              style={{
                padding: "6px 14px",
                fontSize: "0.78rem",
                fontWeight: 600,
                borderRadius: 6,
                border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
                background: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                color: isDark ? "#E2E8F0" : "#334155",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      {/* ── Enterprise ERP Module Studio: Drag-and-Drop & Click-to-Move Canvas ── */}
      <div style={{ marginBottom: "1.75rem" }}>
        {/* Header & Quick Blueprints */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: "0.85rem",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AppstoreAddOutlined style={{ fontSize: 18, color: "#008B94" }} />
              <h3 style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: isDark ? "#F8FAFC" : "#0F172A",
                margin: 0,
              }}>
                Enterprise Capability Studio
              </h3>
            </div>
            <p style={{
              fontSize: "0.78rem",
              color: isDark ? "#94A3B8" : "#64748B",
              margin: "3px 0 0",
            }}>
              Drag modules into your workspace or click any tile below to activate. Click <span style={{ color: "#EF4444", fontWeight: 700 }}>✕</span> to remove.
            </p>
          </div>

          {/* Quick 1-Click Industry Presets (Enterprise Grade Segmented Pills) */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: isDark ? "#22D3EE" : "#0F766E",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginRight: 2,
            }}>
              Presets:
            </span>
            {[
              { name: "Trading", icon: <ShopOutlined style={{ fontSize: 11 }} /> },
              { name: "Manufacturing", icon: <ToolOutlined style={{ fontSize: 11 }} /> },
              { name: "Retail", icon: <ShoppingOutlined style={{ fontSize: 11 }} /> },
              { name: "Services", icon: <DollarOutlined style={{ fontSize: 11 }} /> },
              { name: "Hospitality & Tours", icon: <CoffeeOutlined style={{ fontSize: 11 }} /> },
            ].map(({ name: pName, icon }) => {
              const isSelected = activePreset === pName;
              return (
                <button
                  key={pName}
                  type="button"
                  onClick={() => applyPreset(pName)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: 20,
                    border: isSelected
                      ? "1px solid #008B94"
                      : isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
                    background: isSelected
                      ? (isDark ? "rgba(0,139,148,0.22)" : "#E6FFFA")
                      : (isDark ? "rgba(255,255,255,0.04)" : "#F8FAFC"),
                    color: isSelected
                      ? (isDark ? "#22D3EE" : "#008B94")
                      : (isDark ? "#CBD5E1" : "#475569"),
                    fontSize: "0.72rem",
                    fontWeight: isSelected ? 700 : 600,
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxShadow: isSelected ? "0 1px 6px rgba(0,139,148,0.2)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#008B94";
                      (e.currentTarget as HTMLButtonElement).style.color = "#008B94";
                      (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(0,139,148,0.1)" : "#F0FDFA";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0";
                      (e.currentTarget as HTMLButtonElement).style.color = isDark ? "#CBD5E1" : "#475569";
                      (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(255,255,255,0.04)" : "#F8FAFC";
                    }
                  }}
                >
                  {icon}
                  <span>{pName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Capabilities Dropzone Container ── */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOverDropzone(true);
          }}
          onDragLeave={() => setIsDragOverDropzone(false)}
          onDrop={handleDropToActive}
          style={{
            minHeight: "84px",
            borderRadius: 10,
            padding: "0.85rem 1rem",
            marginBottom: "1rem",
            border: isDragOverDropzone
              ? "2px dashed #008B94"
              : isDark
              ? "1.5px dashed #334155"
              : "1.5px dashed #008B94",
            background: isDragOverDropzone
              ? (isDark ? "rgba(0, 139, 148, 0.18)" : "#E6FFFA")
              : (isDark ? "rgba(15, 23, 42, 0.6)" : "#F0FDFA"),
            boxShadow: isDragOverDropzone
              ? "0 0 16px rgba(0, 139, 148, 0.25)"
              : "none",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: isDark ? "#22D3EE" : "#0F766E",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <CheckCircleFilled style={{ fontSize: 13, color: isDark ? "#22D3EE" : "#0F766E" }} />
              Active Workspace Modules ({activeModules.length} enabled)
            </div>
            <span style={{ fontSize: "0.68rem", color: isDark ? "#94A3B8" : "#64748B" }}>
              Dropzone · Drag modules here or click ✕ to dismiss
            </span>
          </div>

          {activeModules.length === 0 ? (
            <div style={{
              padding: "1rem",
              textAlign: "center",
              fontSize: "0.78rem",
              color: isDark ? "#64748B" : "#94A3B8",
              fontStyle: "italic",
            }}>
              No optional modules selected. Drag modules from below or click any tile to add to your ERP workspace.
            </div>
          ) : (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              {activeModules.map((item) => (
                <div
                  key={item.key}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px 6px 12px",
                    borderRadius: 8,
                    background: isDark ? "#1E293B" : "#FFFFFF",
                    border: isDark ? "1px solid #008B94" : "1.5px solid #008B94",
                    boxShadow: "0 2px 6px rgba(0, 139, 148, 0.15)",
                    cursor: "grab",
                    userSelect: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
                  <span style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: isDark ? "#F8FAFC" : "#0F172A",
                  }}>
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: isDark ? "rgba(0, 139, 148, 0.2)" : "rgba(15, 118, 110, 0.1)",
                      color: isDark ? "#22D3EE" : "#0F766E",
                    }}
                  >
                    {item.badge}
                  </span>
                  {/* Close / Dismiss Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeModule(item.key);
                    }}
                    title="Remove module"
                    style={{
                      border: "none",
                      background: isDark ? "rgba(239, 68, 68, 0.15)" : "#FEE2E2",
                      color: "#EF4444",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: 0,
                      marginLeft: 4,
                      transition: "transform 0.12s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    <CloseOutlined style={{ fontSize: 9, strokeWidth: 3 }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Available ERP Module Repository (Click or Drag to Activate) ── */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToAvailable}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {MODULE_CATALOG.map((mod) => {
            const isActive = Boolean(accountingFeatures[mod.key]);

            return (
              <div
                key={mod.key}
                draggable
                onDragStart={(e) => handleDragStart(e, mod.key)}
                onClick={() => {
                  if (isActive) {
                    removeModule(mod.key);
                  } else {
                    addModule(mod.key);
                  }
                }}
                style={{
                  border: isActive
                    ? "1.5px solid #008B94"
                    : isDark
                    ? "1px solid #334155"
                    : "1px solid #CBD5E1",
                  background: isActive
                    ? (isDark ? "rgba(0, 139, 148, 0.1)" : "#F0FDFA")
                    : (isDark ? "#0F172A" : "#FFFFFF"),
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  userSelect: "none",
                  boxShadow: isActive
                    ? "0 2px 8px rgba(0, 139, 148, 0.15)"
                    : "0 1px 3px rgba(0,0,0,0.03)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#008B94";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? "#334155" : "#CBD5E1";
                  }
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: isActive
                        ? "#008B94"
                        : isDark
                        ? "rgba(255,255,255,0.06)"
                        : "#F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? "#FFFFFF" : "#008B94",
                      flexShrink: 0,
                    }}>
                      {mod.icon}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          padding: "1px 5px",
                          borderRadius: 4,
                          background: isDark ? "#1E293B" : "#F1F5F9",
                          color: isDark ? "#94A3B8" : "#64748B",
                        }}
                      >
                        {mod.badge}
                      </span>
                      {isActive ? (
                        <span
                          title="Click to remove"
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "#008B94",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 9,
                          }}
                        >
                          ✓
                        </span>
                      ) : (
                        <DragOutlined style={{ fontSize: 12, color: isDark ? "#475569" : "#94A3B8" }} />
                      )}
                    </div>
                  </div>

                  <h4 style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: isDark ? "#F8FAFC" : "#0F172A",
                    margin: "0 0 4px",
                    lineHeight: 1.3,
                  }}>
                    {mod.title}
                  </h4>

                  <p style={{
                    fontSize: "0.7rem",
                    color: isDark ? "#94A3B8" : "#64748B",
                    margin: 0,
                    lineHeight: 1.35,
                  }}>
                    {mod.desc}
                  </p>
                </div>

                {/* Micro Action Bar */}
                <div style={{
                  marginTop: 8,
                  paddingTop: 6,
                  borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: "0.65rem", color: isDark ? "#64748B" : "#94A3B8" }}>
                    {mod.category}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: isActive ? "#EF4444" : "#008B94",
                    }}
                  >
                    {isActive ? "Remove ✕" : "+ Add"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: isDark ? "1px solid #475569" : "1px solid #CBD5E1",
            background: "transparent",
            color: isDark ? "#94A3B8" : "#475569",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          &lt; Back
        </button>

        <button
          type="button"
          onClick={validateAndProceed}
          style={{
            height: 44,
            padding: "0 28px",
            borderRadius: 8,
            border: "none",
            background: isDark
              ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
              : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
            color: "#FFFFFF",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: isDark
              ? "0 4px 14px rgba(0, 139, 148, 0.3)"
              : "0 4px 14px rgba(15, 118, 110, 0.25)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Save and Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Success Modal (Enterprise Grade with Particle Popper Animation) ─────────
export function SuccessModal({
  company,
  email,
  onContinue,
}: {
  company: ReturnType<typeof mockDB.registerCompany>;
  email: string;
  onContinue: () => void;
}) {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  // Local Icon Particle Popper state
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
    delay: number;
    shape: "circle" | "rect" | "star";
  }>>([]);

  // Full-Screen Celebratory Confetti Popper state
  const [fullscreenConfetti, setFullscreenConfetti] = useState<Array<{
    id: number;
    left: number; // percentage across screen (0 - 100)
    startY: number; // initial Y
    targetX: number; // drift X
    targetY: number; // falling distance
    size: number;
    color: string;
    rotation: number;
    shape: "circle" | "ribbon" | "square";
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate 36 local particle burst around the checkmark
    const localColors = ["#10B981", "#008B94", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6", "#FBBF24"];
    const localShapes: ("circle" | "rect" | "star")[] = ["circle", "rect", "star"];
    const localItems = Array.from({ length: 36 }).map((_, i) => {
      const angle = (i / 36) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 55 + Math.random() * 85;
      return {
        id: i,
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        color: localColors[Math.floor(Math.random() * localColors.length)],
        size: 5 + Math.random() * 6,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.15,
        shape: localShapes[Math.floor(Math.random() * localShapes.length)],
      };
    });
    setParticles(localItems);

    // Generate 90 full-screen festive confetti pieces erupting and raining down
    const colors = [
      "#10B981", "#008B94", "#0F766E", "#3B82F6", "#6366F1",
      "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#14B8A6", "#FBBF24"
    ];
    const shapes: ("circle" | "ribbon" | "square")[] = ["circle", "ribbon", "square"];

    const items = Array.from({ length: 90 }).map((_, i) => {
      // Left vs Right cannons for celebratory popper burst
      const isLeftCannon = i < 45;
      const initialLeft = isLeftCannon ? Math.random() * 25 : 75 + Math.random() * 25;
      const drift = (Math.random() - 0.5) * 260 + (isLeftCannon ? 120 : -120);

      return {
        id: i,
        left: initialLeft,
        startY: Math.random() * -30 - 20, // start above or near top
        targetX: drift,
        targetY: 800 + Math.random() * 400,
        size: 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 720,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        duration: 2.4 + Math.random() * 1.8,
        delay: Math.random() * 0.45,
      };
    });

    setFullscreenConfetti(items);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.75)",
      zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", backdropFilter: "blur(4px)",
      overflow: "hidden",
    }}>
      {/* Keyframe animations for full-screen confetti popper & modal */}
      <style>{`
        @keyframes popInModal {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fullScreenConfettiRain {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0);
            opacity: 1;
          }
          15% {
            transform: translate3d(calc(var(--target-x) * 0.4), -120px, 0) rotate(180deg) scale(1.2);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--target-x), var(--target-y), 0) rotate(var(--target-rot)) scale(0.8);
            opacity: 0;
          }
        }
        @keyframes pulseIconRing {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45); }
          70% { box-shadow: 0 0 0 22px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes bounceIcon {
          0% { transform: scale(0.2); opacity: 0; }
          50% { transform: scale(1.2); }
          70% { transform: scale(0.92); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* ── Full-Screen Celebratory Confetti Particles ── */}
      <div style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1002,
        overflow: "hidden",
      }}>
        {fullscreenConfetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: "absolute",
              top: `${c.startY}px`,
              left: `${c.left}%`,
              width: c.shape === "ribbon" ? c.size * 0.45 : c.size,
              height: c.shape === "ribbon" ? c.size * 2.2 : c.size,
              borderRadius: c.shape === "circle" ? "50%" : c.shape === "ribbon" ? "2px" : "1px",
              backgroundColor: c.color,
              // @ts-ignore
              "--target-x": `${c.targetX}px`,
              "--target-y": `${c.targetY}px`,
              "--target-rot": `${c.rotation}deg`,
              animation: `fullScreenConfettiRain ${c.duration}s cubic-bezier(0.22, 1, 0.36, 1) ${c.delay}s forwards`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>

      <div style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
        borderRadius: 16,
        width: "100%",
        maxWidth: 540,
        padding: "2.5rem 2rem 2rem",
        textAlign: "center",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
        position: "relative",
        animation: "popInModal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        overflow: "visible",
      }}>
        {/* Animated Checkmark with Particle Popper Explosion */}
        <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 1.5rem" }}>
          {/* Confetti Particles Container */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}>
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.shape === "rect" ? p.size * 1.6 : p.size,
                  borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "2px" : "1px",
                  background: p.color,
                  // CSS variables for transform animation
                  // @ts-ignore
                  "--tx": `${p.x}px`,
                  "--ty": `${p.y}px`,
                  "--rot": `${p.rotation}deg`,
                  animation: `particleBurst 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${p.delay}s forwards`,
                }}
              />
            ))}
          </div>

          {/* Glowing pulse ring behind icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: isDark ? "rgba(16, 185, 129, 0.15)" : "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulseIconRing 1.8s infinite ease-out, bounceIcon 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            position: "relative",
            zIndex: 2,
          }}>
            <CheckCircleFilled style={{ fontSize: 44, color: "#10B981" }} />
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          color: isDark ? "#F8FAFC" : "#0F172A",
          fontSize: "1.35rem",
          fontWeight: 800,
          margin: "0 0 1.5rem 0",
          letterSpacing: "-0.015em",
          lineHeight: 1.35,
        }}>
          Congratulations! Account Created Successfully
        </h2>

        {/* Credentials Delivery Callout Banner (Matching screenshot exactly) */}
        <div style={{
          background: isDark ? "rgba(0, 139, 148, 0.1)" : "#F0FDFA",
          border: isDark ? "1px solid rgba(0, 139, 148, 0.3)" : "1px solid rgba(15, 118, 110, 0.25)",
          borderRadius: 12,
          padding: "1.1rem 1.25rem",
          marginBottom: "1.5rem",
          textAlign: "left",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem",
            fontWeight: 700,
            color: isDark ? "#22D3EE" : "#0F766E",
            marginBottom: 6,
          }}>
            <InfoCircleOutlined style={{ fontSize: 16 }} /> Credentials Dispatched
          </div>
          <p style={{
            fontSize: "0.8125rem",
            color: isDark ? "#CBD5E1" : "#334155",
            margin: 0,
            lineHeight: 1.55,
          }}>
            Your administrator username, temporary password, and company code have been securely generated and dispatched to: <strong style={{ color: isDark ? "#22D3EE" : "#0F766E", wordBreak: "break-all" }}>{email}</strong>.
          </p>
        </div>

        {/* Action Button to Launch / Go to Login */}
        <button
          type="button"
          onClick={onContinue}
          style={{
            width: "100%",
            height: 46,
            borderRadius: 8,
            border: "none",
            background: isDark
              ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
              : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
            color: "#FFFFFF",
            fontSize: "0.925rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: isDark
              ? "0 4px 14px rgba(0, 139, 148, 0.3)"
              : "0 4px 14px rgba(15, 118, 110, 0.25)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Proceed to Sign In →
        </button>

        {/* ── Customer Support & Dedicated Assistance Card (WhatsApp / Viber) ── */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "0.9rem 1rem",
            borderRadius: 12,
            background: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: isDark ? "rgba(0,139,148,0.15)" : "#E6FFFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDark ? "#22D3EE" : "#0F766E",
                fontSize: 17,
                flexShrink: 0,
              }}
            >
              💬
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                Need Help or Have Billing Queries?
              </div>
              <div style={{ fontSize: "0.74rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 2 }}>
                Our dedicated support team is available 24/7 in Nepal
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/9779801234567?text=Hello%20Pivotal%20ERP%20Support%2C%20I%20have%20a%20query%20regarding%20my%20account%20setup."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 6,
                background: "#25D366",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 1px 4px rgba(37,211,102,0.25)",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.764.459 3.423 1.261 4.869l-1.34 4.898 5.016-1.316c1.393.762 2.979 1.192 4.663 1.192 5.514 0 10-4.486 10-10s-4.486-10-10-10z"/>
              </svg>
              WhatsApp
            </a>

            {/* Viber Direct */}
            <a
              href="viber://chat?number=%2B9779801234567"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                borderRadius: 6,
                background: "#7360F2",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 1px 4px rgba(115,96,242,0.25)",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.78 3.01C16.89.8 11.23.99 8.21 2.39 5.34 3.72 3.19 6.25 2.5 9.47c-.51 2.4-.2 5.25.96 7.42l-.84 3.97a.88.88 0 001.07 1.04l3.92-.93c2.27 1.1 4.7 1.49 7.15 1.14 3.32-.47 6.13-2.34 7.68-5.3 1.63-3.1 1.42-7.07-.48-9.97l-2.18-3.83zm-1.85 11.75c-.24.71-1.04 1.34-1.8 1.49-.67.13-1.57.17-3.95-.81-2.9-1.2-4.83-4.14-4.98-4.34-.14-.2-1.18-1.58-1.18-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.19.01.44-.07.69.53.25.61.86 2.11.94 2.26.07.16.12.34.02.54-.1.2-.15.33-.3.51-.15.17-.32.39-.45.52-.15.15-.31.31-.13.62.17.31.78 1.28 1.67 2.07 1.15 1.02 2.11 1.34 2.42 1.49.3.15.48.13.66-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.1 1.84.87 2.16 1.03.31.15.52.23.6.36.08.13.08.77-.16 1.48z"/>
              </svg>
              Viber
            </a>

            {/* Hotline Phone */}
            <a
              href="tel:+977015970000"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 12px",
                borderRadius: 6,
                background: isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #CBD5E1",
                color: isDark ? "#22D3EE" : "#0F766E",
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              📞 +977-1-5970000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Form ─────────────────────────────────────────────
type PaymentMethod = "card" | "esewa" | "khalti" | "connectips";

export function PaymentForm({
  plan,
  billingCycle = "annual",
  orgData,
  userEmail,
  adminName,
  onSuccess,
}: {
  plan: typeof MOCK_PLANS[0];
  billingCycle?: "monthly" | "annual";
  orgData?: {
    name: string;
    industry: string;
    address: string;
    startDate: string;
    isVatRegistered: string;
    logoUrl?: string;
    email: string;
    phone: string;
    panNumber: string;
    accountingFeatures: Record<string, boolean>;
  } | null;
  userEmail?: string;
  adminName?: string;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [mobileNum, setMobileNum] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  // Financial calculations (Nepal Statutory VAT 13%)
  const basePrice = billingCycle === "annual" ? (plan.annualPrice || plan.price * 10) : plan.price;
  const vatAmount = Math.round(basePrice * 0.13);
  const totalPayable = basePrice + vatAmount;

  // Active module tags
  const activeFeaturesList = orgData?.accountingFeatures
    ? Object.entries(orgData.accountingFeatures)
        .filter(([_, active]) => active)
        .map(([key]) => {
          const names: Record<string, string> = {
            trackInventory: "Inventory",
            aiCopilot: "AI Copilot",
            irdSync: "IRD Sync",
            enableManufacturing: "BOM/Mfg",
            posRetail: "Retail POS",
            multiCurrency: "Multi-Currency",
            multipleLocations: "Multi-Branch",
            arBot: "A/R Bot",
          };
          return names[key] || key;
        })
    : ["Core Accounting", "NFRS Ledger", "Tax Engine"];

  // Card brand detection & validation
  const detectCardType = (num: string): "visa" | "mastercard" | "sct" | null => {
    const clean = num.replace(/\D/g, "");
    if (!clean) return null;
    if (/^4/.test(clean)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^(60|62|65|94|5081)/.test(clean)) return "sct";
    return null;
  };

  const detectedBrand = detectCardType(card.number);

  const handlePay = async () => {
    const e: Record<string, string> = {};
    if (!agreementChecked) {
      e.agreement = "Please review and accept the Master Services Agreement to proceed";
    }
    if (method === "card") {
      const cleanNum = card.number.replace(/\s/g, "");
      if (!cleanNum || cleanNum.length < 16) {
        e.number = "Enter a valid 16-digit card number";
      } else if (!detectedBrand) {
        e.number = "Unsupported card. Please use Visa, Mastercard, or SCT";
      }
      if (!card.name) e.name = "Cardholder name required";
      if (!card.expiry || !/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Format: MM/YY";
      if (!card.cvv || card.cvv.length < 3) e.cvv = "Invalid CVV";
    }
    if (["esewa", "khalti"].includes(method)) {
      if (!mobileNum || !/^(\+977)?[0-9]{10}$/.test(mobileNum.replace(/\s/g, ""))) e.mobile = "Enter valid mobile number";
    }
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    onSuccess();
  };

  const paymentMethods: { id: PaymentMethod; label: string; color: string }[] = [
    { id: "card", label: "Credit/Debit Card", color: "#1D4EDB" },
    { id: "esewa", label: "eSewa", color: "#60BB46" },
    { id: "khalti", label: "Khalti", color: "#5C2D91" },
    { id: "connectips", label: "ConnectIPS", color: "#E31837" },
  ];

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\D/g, "").substring(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, "").substring(0, 4);
    return v.length >= 3 ? `${v.substring(0, 2)}/${v.substring(2)}` : v;
  };

  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  return (
    <div style={{ marginTop: "0.25rem" }}>
      {/* ── Enterprise Order & Tax Summary (B2B Tax Invoice Breakdown) ── */}
      <div
        style={{
          background: isDark ? "#0F172A" : "#FFFFFF",
          border: isDark ? "1px solid #334155" : "1px solid #CBD5E1",
          borderRadius: 12,
          padding: "1.1rem 1.25rem",
          marginBottom: "1.25rem",
          boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem", borderBottom: isDark ? "1px solid #1E293B" : "1px solid #F1F5F9", paddingBottom: "0.75rem" }}>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#008B94", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
              Enterprise Tax Invoice Summary
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: isDark ? "#F8FAFC" : "#0F172A" }}>
              {orgData?.name || "Your Organization"}
            </div>
            <div style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 2 }}>
              PAN / VAT: <strong style={{ color: isDark ? "#E2E8F0" : "#1E293B" }}>{orgData?.panNumber || "123456789"}</strong> · Industry: {orgData?.industry || "Trading"}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: isDark ? "#CBD5E1" : "#475569" }}>
              Admin Account
            </div>
            <div style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 2 }}>
              {adminName || "Administrator"}
            </div>
          </div>
        </div>

        {/* Selected Plan Details & Pricing */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <div>
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
              {plan.name} Tier
            </span>
            <span style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B", marginLeft: 8 }}>
              (Up to {plan.maxUsers} Users · Annual Billing)
            </span>
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: isDark ? "#F8FAFC" : "#0F172A" }}>
            Rs. {formatNPR(basePrice)}
          </div>
        </div>

        {/* Enterprise Capability Overview Strip (Modern inline minimal metadata design) */}
        <div style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px 14px",
          padding: "8px 12px",
          borderRadius: 6,
          background: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC",
          border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
          marginBottom: "0.95rem",
          fontSize: "0.75rem",
        }}>
          <span style={{
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: isDark ? "#22D3EE" : "#0F766E",
          }}>
            Included Modules:
          </span>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px 12px" }}>
            {activeFeaturesList.map((tag, idx) => (
              <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: isDark ? "#E2E8F0" : "#334155", fontWeight: 500 }}>
                {idx > 0 && <span style={{ color: isDark ? "#475569" : "#CBD5E1", fontSize: "0.65rem" }}>•</span>}
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Line-item Math breakdown */}
        <div
          style={{
            background: isDark ? "#1E293B" : "#F8FAFC",
            borderRadius: 8,
            padding: "0.75rem 1rem",
            fontSize: "0.8125rem",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", color: isDark ? "#CBD5E1" : "#64748B" }}>
            <span>Subtotal (Base Software Fee)</span>
            <span>Rs. {formatNPR(basePrice)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: isDark ? "#CBD5E1" : "#64748B" }}>
            <span>Nepal Inland Revenue VAT (13%)</span>
            <span>Rs. {formatNPR(vatAmount)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 800,
              fontSize: "0.95rem",
              color: isDark ? "#22D3EE" : "#0F766E",
              borderTop: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
              paddingTop: 6,
              marginTop: 2,
            }}
          >
            <span>Total Payable Amount</span>
            <span>Rs. {formatNPR(totalPayable)} NPR</span>
          </div>
        </div>
      </div>

      {/* Payment Method Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        {paymentMethods.map((pm) => (
          <button
            key={pm.id}
            type="button"
            onClick={() => setMethod(pm.id)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: 8,
              cursor: "pointer",
              border: method === pm.id
                ? `2px solid ${pm.color}`
                : isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,23,42,0.15)",
              background: method === pm.id
                ? `${pm.color}22`
                : isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
              color: method === pm.id
                ? isDark ? "white" : pm.color
                : isDark ? "rgba(255,255,255,0.6)" : "var(--text-secondary)",
              fontSize: "0.78rem",
              fontWeight: 700,
              fontFamily: "var(--font-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 40,
              transition: "all 0.18s ease",
            }}
          >
            {pm.label}
          </button>
        ))}
      </div>

      {/* Card Form */}
      {method === "card" && (
        <div style={{ marginBottom: "1.25rem" }}>
          <div>
            <Input
              label="Card Number"
              value={card.number}
              onChange={(v) => {
                setCard((c) => ({ ...c, number: formatCardNumber(v) }));
                if (errors.number) setErrors((prev) => ({ ...prev, number: "" }));
              }}
              placeholder="1234 5678 9012 3456"
              error={errors.number}
              required
            />
          </div>
          <Input
            label="Cardholder Name"
            value={card.name}
            onChange={(v) => {
              setCard((c) => ({ ...c, name: v }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="As on card"
            error={errors.name}
            required
          />
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Expiry"
                value={card.expiry}
                onChange={(v) => {
                  setCard((c) => ({ ...c, expiry: formatExpiry(v) }));
                  if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }));
                }}
                placeholder="MM/YY"
                error={errors.expiry}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                label="CVV"
                type="password"
                value={card.cvv}
                onChange={(v) => {
                  setCard((c) => ({ ...c, cvv: v.replace(/\D/g, "").slice(0, 4) }));
                  if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: "" }));
                }}
                placeholder="•••"
                error={errors.cvv}
                required
              />
            </div>
          </div>

          {/* Card Brands with Real-Time Validation Highlighting & Authentic Logos */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: "0.72rem", color: isDark ? "#94A3B8" : "#64748B", marginRight: 2 }}>
              Accepted Cards:
            </span>
            {[
              {
                id: "visa",
                label: "VISA",
                brandColor: "#1A1F71",
                logo: (
                  <svg width="38" height="13" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8 1.1L12.4 15.2H8.3L5.1 3.5C4.9 2.8 4.7 2.5 4.1 2.2C3.1 1.7 1.5 1.2 0 0.9L0.1 0.5H6.9C7.8 0.5 8.5 1.1 8.7 2.1L10.4 10.7L14.6 0.5H18.8V1.1ZM35.3 10.5C35.3 6.5 29.6 6.3 29.7 4.5C29.7 3.9 30.2 3.3 31.4 3.1C32 3 33.6 3 35.3 3.7L36 0.6C35.1 0.3 33.9 0 32.3 0C28.4 0 25.6 2.1 25.6 5.1C25.5 7.3 27.5 8.6 29 9.3C30.5 10.1 31.1 10.6 31.1 11.2C31.1 12.2 29.9 12.7 28.7 12.7C26.7 12.7 25.5 12.4 24.3 11.9L23.6 15.1C24.9 15.7 26.6 16.1 28.4 16.1C32.6 16.1 35.3 14 35.3 10.5ZM45.6 15.2H49.2L46.1 0.5H42.7C42 0.5 41.3 0.9 41.1 1.6L35.1 15.2H39.2L40 13H45L45.6 15.2ZM41.1 10L43.2 4.1L44.4 10H41.1ZM24.7 0.5L21.5 15.2H17.6L20.8 0.5H24.7Z" fill="#1A1F71" />
                  </svg>
                ),
              },
              {
                id: "mastercard",
                label: "MASTERCARD",
                brandColor: "#EB001B",
                logo: (
                  <svg width="30" height="18" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="11" r="10" fill="#EB001B" />
                    <circle cx="24" cy="11" r="10" fill="#F79E1B" fillOpacity="0.92" />
                    <path d="M18 4.2C19.8 6 21 8.4 21 11C21 13.6 19.8 16 18 17.8C16.2 16 15 13.6 15 11C15 8.4 16.2 6 18 4.2Z" fill="#FF5F00" />
                  </svg>
                ),
              },
              {
                id: "sct",
                label: "SCT",
                brandColor: "#0072CE",
                logo: (
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <svg width="18" height="15" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 10C3 5 7 1 12 1C15.5 1 18.5 3 20 6L16 8.5C15 6.8 13.6 5.5 12 5.5C9.5 5.5 7.5 7.5 7.5 10C7.5 12.5 9.5 14.5 12 14.5C13.6 14.5 15 13.2 16 11.5L20 14C18.5 17 15.5 19 12 19C7 19 3 15 3 10Z" fill="#0072CE" />
                      <circle cx="19" cy="10" r="3" fill="#10B981" />
                    </svg>
                    <span style={{ fontSize: "0.74rem", fontWeight: 900, color: "#0072CE", letterSpacing: "0.04em", fontFamily: "sans-serif" }}>
                      SCT
                    </span>
                  </div>
                ),
              },
            ].map(({ id, label, brandColor, logo }) => {
              const isMatched = detectedBrand === id;
              const hasInput = Boolean(card.number.replace(/\s/g, ""));
              return (
                <div
                  key={id}
                  title={`Accepted: ${label}`}
                  style={{
                    height: 28,
                    padding: "0 8px",
                    borderRadius: 5,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isMatched
                      ? `1.5px solid ${brandColor}`
                      : isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #CBD5E1",
                    background: isMatched
                      ? (isDark ? "#FFFFFF" : "#FFFFFF")
                      : isDark ? "#FFFFFF" : "#FFFFFF",
                    opacity: hasInput && !isMatched ? 0.35 : 1,
                    transition: "all 0.2s ease",
                    boxShadow: isMatched ? `0 2px 8px ${brandColor}40` : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {logo}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* eSewa / Khalti */}
      {(method === "esewa" || method === "khalti") && (
        <div style={{ marginBottom: "1.25rem" }}>
          <Input
            label={`${method === "esewa" ? "eSewa" : "Khalti"} Registered Mobile Number`}
            value={mobileNum}
            onChange={setMobileNum}
            placeholder="+977-98XXXXXXXX"
            error={errors.mobile}
            required
          />
          <div style={{
            background: method === "esewa" ? "rgba(96,187,70,0.1)" : "rgba(92,45,145,0.1)",
            border: `1px solid ${method === "esewa" ? "rgba(96,187,70,0.3)" : "rgba(92,45,145,0.3)"}`,
            borderRadius: 8, padding: "0.85rem 1rem",
          }}>
            <p style={{ color: isDark ? "rgba(255,255,255,0.8)" : "var(--text-primary)", fontSize: "0.825rem", lineHeight: 1.5, margin: 0 }}>
              You will receive an instant push request on your {method === "esewa" ? "eSewa" : "Khalti"} app to authorize Rs. {formatNPR(totalPayable)}.
            </p>
          </div>
        </div>
      )}

      {/* ConnectIPS */}
      {method === "connectips" && (
        <div style={{
          background: "rgba(227,24,55,0.08)", border: "1px solid rgba(227,24,55,0.2)",
          borderRadius: 8, padding: "1rem", marginBottom: "1.25rem",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <BankOutlined style={{ color: "#E31837", fontSize: 16, marginTop: 2, flexShrink: 0 }} />
          <p style={{ color: isDark ? "rgba(255,255,255,0.85)" : "var(--text-primary)", fontSize: "0.825rem", lineHeight: 1.6, margin: 0 }}>
            You will be routed to the <strong>ConnectIPS (NCHL)</strong> banking gateway to authorize direct bank debit from your registered corporate or personal account.
          </p>
        </div>
      )}

      {/* ── Embedded Legal Agreement Card Box ── */}
      <div
        style={{
          background: isDark ? "rgba(0, 139, 148, 0.08)" : "#F0FDFA",
          border: isDark ? "1px solid rgba(0, 139, 148, 0.25)" : "1px solid rgba(0, 139, 148, 0.3)",
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <div
              onClick={() => {
                setAgreementChecked(!agreementChecked);
                setErrors((prev) => ({ ...prev, agreement: "" }));
              }}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: agreementChecked ? "none" : isDark ? "1.5px solid #64748B" : "1.5px solid #94A3B8",
                background: agreementChecked ? "#0F766E" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {agreementChecked && <CheckOutlined style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "bold" }} />}
            </div>
            <div style={{ fontSize: "0.8125rem", color: isDark ? "#E2E8F0" : "#1E293B", lineHeight: 1.4 }}>
              <span>I agree to Pivotal ERP&apos;s </span>
              <button
                type="button"
                onClick={() => setShowAgreementModal(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0F766E",
                  fontWeight: 700,
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "inherit",
                }}
              >
                Master Services Agreement
              </button>
              <span> &amp; Nepal NFRS / Inland Revenue data governance compliance.</span>
            </div>
          </div>

          {/* Small download icon button in agreement card box (right side) */}
          <button
            type="button"
            onClick={() => {
              const textContent = `PIVOTAL ERP - TERMS OF SERVICE & USER AGREEMENT\nLast Updated: July 2025\n\n` +
                MOCK_AGREEMENT.content.replace(/<[^>]+>/g, "\n").replace(/\n\s*\n/g, "\n\n").trim();
              const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "Pivotal_ERP_User_Agreement.txt";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            title="Download Master Services Agreement"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 6,
              background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #CBD5E1",
              color: isDark ? "#22D3EE" : "#0F766E",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#0F766E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "#CBD5E1";
            }}
          >
            <DownloadOutlined style={{ fontSize: 15 }} />
          </button>
        </div>
        {errors.agreement && (
          <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "6px 0 0 28px", fontWeight: 600 }}>
            {errors.agreement}
          </p>
        )}
      </div>

      {/* Security Footnote (Auto-provisioning banner removed) */}
      <div style={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        color: isDark ? "rgba(255,255,255,0.6)" : "#64748B",
        marginBottom: "1.25rem",
        padding: "0 4px",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <LockOutlined style={{ color: "#10B981" }} /> 256-bit TLS Encrypted · PCI-DSS Compliant
        </span>
      </div>

      <PrimaryButton
        onClick={handlePay}
        fullWidth
        loading={loading}
        variant="secondary"
      >
        Pay Rs. {formatNPR(totalPayable)} &amp; Launch Workspace →
      </PrimaryButton>

      {/* Embedded Terms Preview Modal */}
      {showAgreementModal && (
        <AgreementModal onAccept={() => { setAgreementChecked(true); setShowAgreementModal(false); }} />
      )}
    </div>
  );
}

// ─── Signup Page Inner ──────────────────────────────────────────
function SignupPageInner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get("plan");
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  // 5 Enterprise Steps: 0="Your Profile", 1="Plan", 2="Payment", 3="Setup Organization", 4="User Agreement"
  const steps = ["Your Profile", "Plan", "Payment", "Organization", "Agreement"];
  const [step, setStep] = useState(0);

  // Profile & Contact Info
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    designation: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Organization Setup Data
  const [orgData, setOrgData] = useState<{
    name: string;
    industry: string;
    address: string;
    startDate: string;
    isVatRegistered: string;
    logoUrl?: string;
    email: string;
    phone: string;
    panNumber: string;
    accountingFeatures: Record<string, boolean>;
  } | null>(null);

  // Agreement checkbox
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isSubmittingAgreement, setIsSubmittingAgreement] = useState(false);

  // OTP Verification State
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpNotification, setOtpNotification] = useState<string | null>(null);

  // Plan selection & Billing Cycle (Enterprise Monthly / Annual Toggle)
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan || "");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  // Modals & Success
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCompany, setCreatedCompany] = useState<ReturnType<typeof mockDB.registerCompany> | null>(null);

  // Pre-fill email or step if provided via search query
  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
    }
    if (preselectedPlan) {
      setSelectedPlan(preselectedPlan);
    }
  }, [searchParams, preselectedPlan]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  // Send or Resend OTP
  const handleSendOtp = async () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid work email address";
    } else if (mockDB.isEmailTaken(email.trim())) {
      errs.email = "This email is already registered. Please log in instead.";
    }

    if (errs.email) {
      setFormErrors((prev) => ({ ...prev, email: errs.email }));
      return;
    }

    // Clear email error
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.email;
      delete copy.otp;
      return copy;
    });

    setOtpSending(true);
    await new Promise((r) => setTimeout(r, 600));

    // Generate random 6-digit OTP (e.g. 582194)
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setIsOtpSent(true);
    setOtpTimer(30);
    setOtpSending(false);
    setOtpNotification(`Verification code sent to ${email}. (Demo OTP: ${newOtp})`);
  };

  // Verify entered OTP
  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      setFormErrors((prev) => ({ ...prev, otp: "Please enter the 6-digit verification code" }));
      return;
    }
    if (otpCode.trim() !== generatedOtp && otpCode.trim() !== "123456") {
      setFormErrors((prev) => ({ ...prev, otp: "Invalid verification code. Please check and try again." }));
      return;
    }

    setOtpVerifying(true);
    await new Promise((r) => setTimeout(r, 500));
    setOtpVerifying(false);
    setIsEmailVerified(true);
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.otp;
      return copy;
    });
  };

  // Step 0 validation and proceed to Plan
  const handleStep0Next = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Invalid email address";
    else if (mockDB.isEmailTaken(email.trim())) errs.email = "This email is already registered. Please log in.";

    if (!isEmailVerified) {
      errs.otp = "Please verify your email with the OTP code before continuing";
    }

    if (!profile.fullName.trim()) errs.fullName = "Full name is required";
    if (!profile.phone.trim()) errs.phone = "Phone number is required";
    if (!profile.designation.trim()) errs.designation = "Designation / Role is required";

    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Proceed to Step 1: Setup Organization
    setStep(1);
  };

  const plans = mockDB.getPlans().filter((p) => p.isActive);
  const plan = plans.find((p) => p.id === selectedPlan) || plans[1];

  // Handle final submission of provisioning after payment and agreement
  const handleFinalAgreementSubmit = async () => {
    setIsSubmittingAgreement(true);
    await new Promise((r) => setTimeout(r, 1200)); // Provisioning latency simulation

    const companyName = orgData?.name || "My Organization";
    const company = mockDB.registerCompany({
      name: companyName,
      code: "",
      subdomain: "",
      email: orgData?.email || email,
      phone: orgData?.phone || profile.phone,
      address: orgData?.address || "Kathmandu, Nepal",
      industry: orgData?.industry || "Trading",
      panVat: orgData?.panNumber || "123456789",
      registrationNo: "",
      subscriptionPlan: selectedPlan || "starter",
      status: "active",
      isTrial: false,
      autoVerified: true,
      logoUrl: orgData?.logoUrl,
    });

    // Register initial user with admin credentials
    mockDB.registerUser({
      email,
      name: profile.fullName || "Administrator",
      passwordHash: "Pivotal@2025",
      companyId: company.id,
      role: "owner",
      isFirstLogin: true,
      hasCompletedTour: false,
    });

    localStorage.removeItem("pivotal-signup-email");
    setCreatedCompany(company);
    setIsSubmittingAgreement(false);
    setShowSuccess(true);
  };

  return (
    <>
      {showSuccess && createdCompany && (
        <SuccessModal
          company={createdCompany}
          email={email}
          onContinue={() => {
            navigate("/login");
          }}
        />
      )}

      <EnterpriseSplitLayout
        currentStep={step}
        title={
          step === 0
            ? "Your Profile"
            : step === 1
            ? "Setup Organization"
            : step === 2
            ? "Plan Selection"
            : "Billing & Launch"
        }
        subtitle={
          step === 0
            ? "Personal & email verification"
            : step === 1
            ? "Entity, fiscal year & AI modules"
            : step === 2
            ? "Starter, Growth & Enterprise"
            : "Tax invoice, terms & activation"
        }
      >
        {/* ── Step 0: Profile & Email OTP Verification (Zero-Scroll 2-Column Grid) ── */}
        {step === 0 && (
          <div>
            {/* Contact & Professional Details Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "1.25rem" }}>
              {/* Top Section: Work Email with Integrated Enterprise Verification Panel */}
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.02)" : "#F8FAFC",
                  border: isEmailVerified
                    ? (isDark ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(16,185,129,0.35)")
                    : isOtpSent
                    ? (isDark ? "1px solid rgba(0,139,148,0.35)" : "1px solid rgba(15,118,110,0.3)")
                    : (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0"),
                  borderRadius: 10,
                  padding: "14px 16px",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{
                    color: isDark ? "rgba(255,255,255,0.9)" : "#0F172A",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                  }}>
                    Work Email Address <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  {isEmailVerified ? (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#10b981",
                      background: "rgba(16, 185, 129, 0.12)",
                      padding: "2px 8px",
                      borderRadius: 12,
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}>
                      ✓ Email Verified &amp; Secured
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.72rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                      We will dispatch login credentials &amp; company code here
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    disabled={isEmailVerified}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.email;
                        return copy;
                      });
                    }}
                    placeholder="you@company.com.np"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: formErrors.email
                        ? "2px solid #ef4444"
                        : isDark
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid #CBD5E1",
                      background: isEmailVerified
                        ? (isDark ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.04)")
                        : (isDark ? "#0F172A" : "#FFFFFF"),
                      color: isDark ? "white" : "var(--text-primary)",
                      fontSize: "0.875rem",
                      outline: "none",
                      fontFamily: "var(--font-primary)",
                      opacity: isEmailVerified ? 0.9 : 1,
                    }}
                  />

                  {!isEmailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpSending || !email || otpTimer > 0}
                      style={{
                        padding: "0 18px",
                        borderRadius: 8,
                        border: "none",
                        background: otpTimer > 0 
                          ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)")
                          : "linear-gradient(135deg, #008B94, #0F766E)",
                        color: otpTimer > 0 
                          ? (isDark ? "rgba(255,255,255,0.4)" : "var(--text-secondary)")
                          : "white",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        cursor: otpTimer > 0 || otpSending || !email ? "not-allowed" : "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                        minWidth: 104,
                      }}
                    >
                      {otpSending ? "Sending..." : isOtpSent ? (otpTimer > 0 ? `Resend (${otpTimer}s)` : "Resend OTP") : "Send OTP"}
                    </button>
                  )}

                  {isEmailVerified && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEmailVerified(false);
                        setIsOtpSent(false);
                        setOtpCode("");
                        setGeneratedOtp("");
                        setOtpNotification(null);
                      }}
                      style={{
                        padding: "0 14px",
                        borderRadius: 8,
                        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #CBD5E1",
                        background: "transparent",
                        color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Change Email
                    </button>
                  )}
                </div>
                {formErrors.email && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "4px 0 0" }}>{formErrors.email}</p>}

                {/* Inline OTP Notification banner */}
                {otpNotification && !isEmailVerified && (
                  <div style={{
                    background: isDark ? "rgba(0, 139, 148, 0.12)" : "#ECFDF5",
                    border: "1px solid rgba(0, 139, 148, 0.25)",
                    borderRadius: 6,
                    padding: "7px 12px",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <span style={{ fontSize: "0.9rem" }}>✉️</span>
                    <p style={{
                      margin: 0,
                      fontSize: "0.78rem",
                      color: isDark ? "#22D3EE" : "#065F46",
                      lineHeight: 1.4,
                      fontWeight: 600,
                    }}>
                      {otpNotification}
                    </p>
                  </div>
                )}

                {/* 6-Digit OTP Verification Row */}
                {isOtpSent && !isEmailVerified && (
                  <div style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: isDark ? "1px dashed rgba(255,255,255,0.12)" : "1px dashed #CBD5E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}>
                    <div>
                      <div style={{
                        color: isDark ? "#F8FAFC" : "#0F172A",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        marginBottom: 2,
                      }}>
                        Enter 6-Digit Verification Code <span style={{ color: "#ef4444" }}>*</span>
                      </div>
                      <div style={{
                        fontSize: "0.72rem",
                        color: isDark ? "#94A3B8" : "#64748B",
                      }}>
                        Check your inbox or spam. Code expires in 5 minutes.
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <DigitOtpInput
                        value={otpCode}
                        onChange={(val) => {
                          setOtpCode(val);
                          setFormErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.otp;
                            return copy;
                          });
                        }}
                        error={formErrors.otp}
                        disabled={otpVerifying}
                      />

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otpVerifying || otpCode.length < 6}
                        style={{
                          padding: "10px 18px",
                          borderRadius: 8,
                          border: "none",
                          background: "linear-gradient(135deg, #008B94, #0F766E)",
                          color: "white",
                          fontSize: "0.8125rem",
                          fontWeight: 700,
                          cursor: otpVerifying || otpCode.length < 6 ? "not-allowed" : "pointer",
                          opacity: otpCode.length < 6 ? 0.55 : 1,
                          boxShadow: otpCode.length === 6 ? "0 4px 14px rgba(0,139,148,0.3)" : "none",
                          transition: "all 0.15s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {otpVerifying ? "Verifying..." : "Verify Code ✓"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2-Column Grid for Remaining Profile Details: Full Name, Phone, Designation */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "20px",
                  rowGap: "14px",
                }}
              >
                {/* Full Name */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", color: isDark ? "rgba(255,255,255,0.85)" : "#334155", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                    Full Name <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setProfile((p) => ({ ...p, fullName: v }));
                      setFormErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.fullName;
                        return copy;
                      });
                    }}
                    placeholder="e.g. Ramesh Sharma"
                    style={{
                      width: "100%", height: 42, padding: "0 14px", borderRadius: 8,
                      border: formErrors.fullName ? "1.5px solid #EF4444" : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                      background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                      color: isDark ? "#F8FAFC" : "#0F172A",
                      fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                  {formErrors.fullName && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{formErrors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label style={{ display: "block", color: isDark ? "rgba(255,255,255,0.85)" : "#334155", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                    Phone Number <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => {
                      const v = e.target.value;
                      setProfile((p) => ({ ...p, phone: v }));
                      setFormErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.phone;
                        return copy;
                      });
                    }}
                    placeholder="+977-98XXXXXXXX"
                    style={{
                      width: "100%", height: 42, padding: "0 14px", borderRadius: 8,
                      border: formErrors.phone ? "1.5px solid #EF4444" : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                      background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                      color: isDark ? "#F8FAFC" : "#0F172A",
                      fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                  {formErrors.phone && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{formErrors.phone}</p>}
                </div>

                {/* Designation / Role */}
                <div>
                  <label style={{ display: "block", color: isDark ? "rgba(255,255,255,0.85)" : "#334155", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
                    Designation / Role <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={profile.designation}
                    onChange={(e) => {
                      const v = e.target.value;
                      setProfile((p) => ({ ...p, designation: v }));
                      setFormErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.designation;
                        return copy;
                      });
                    }}
                    placeholder="e.g. Owner, CFO, Accountant"
                    style={{
                      width: "100%", height: 42, padding: "0 14px", borderRadius: 8,
                      border: formErrors.designation ? "1.5px solid #EF4444" : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                      background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                      color: isDark ? "#F8FAFC" : "#0F172A",
                      fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                  {formErrors.designation && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>{formErrors.designation}</p>}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleStep0Next}
                style={{
                  height: 44,
                  padding: "0 28px",
                  borderRadius: 8,
                  border: "none",
                  background: isDark
                    ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
                    : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: isDark
                    ? "0 4px 14px rgba(0, 139, 148, 0.3)"
                    : "0 4px 14px rgba(15, 118, 110, 0.25)",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Continue to Setup Organization →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Setup Organization (In-Page Enterprise Configuration) ── */}
        {step === 1 && (
          <OrganizationSetupForm
            userEmail={email}
            userPhone={profile.phone}
            onBack={() => setStep(0)}
            onProceedToAgreement={(data) => {
              setOrgData(data);
              setStep(2);
            }}
          />
        )}

        {/* ── Step 2: Choose Plan (Enterprise 3-Column Grid) ── */}
        {step === 2 && (
          <div>
            {/* Header: Configured Entity on Left + Annual Plan Badge on Right */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: "1.25rem",
              paddingBottom: "0.85rem",
              borderBottom: isDark ? "1px solid #1E293B" : "1px solid #E2E8F0",
            }}>
              <div>
                <div style={{ fontSize: "0.8125rem", color: isDark ? "#94A3B8" : "#64748B" }}>
                  Configured Entity
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                  {orgData?.name || "Your Organization"} · <span style={{ color: "#008B94" }}>{orgData?.industry || "Trading"}</span>
                </div>
              </div>

              {/* Annual Billing Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 20,
                background: isDark ? "rgba(16,185,129,0.15)" : "#DCFCE7",
                border: isDark ? "1px solid rgba(16,185,129,0.3)" : "1px solid #86EFAC",
                color: isDark ? "#34D399" : "#15803D",
                fontSize: "0.78rem",
                fontWeight: 700,
              }}>
                <span>Annual Enterprise Plan</span>
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: 10,
                  background: isDark ? "rgba(52,211,153,0.25)" : "#BBF7D0",
                  color: isDark ? "#A7F3D0" : "#166534",
                }}>
                  Save ~17%
                </span>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "1.5rem",
            }}>
              {plans.map((p) => {
                const isSelected = selectedPlan === p.id;
                // Annual pricing only
                const displayPrice = Math.round((p.annualPrice || p.price * 10) / 12);
                const billedTotal = p.annualPrice || p.price * 10;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    style={{
                      border: isSelected
                        ? `2px solid ${p.color}`
                        : (isDark ? "1px solid #334155" : "1px solid #CBD5E1"),
                      background: isSelected
                        ? (isDark ? "rgba(0, 139, 148, 0.1)" : "rgba(15, 118, 110, 0.04)")
                        : (isDark ? "#0F172A" : "#FFFFFF"),
                      borderRadius: 10,
                      padding: "1.25rem 1rem",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: isSelected
                        ? "0 4px 14px rgba(0, 139, 148, 0.15)"
                        : "none",
                    }}
                  >
                    {p.isPopular && (
                      <span
                        style={{
                          position: "absolute",
                          top: -10,
                          right: 12,
                          background: p.color,
                          color: "white",
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: 10,
                          letterSpacing: "0.04em",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        MOST POPULAR
                      </span>
                    )}

                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: isDark ? "#F8FAFC" : "#0F172A" }}>
                          {p.name}
                        </h4>
                        <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: `2px solid ${isSelected ? p.color : isDark ? "#475569" : "#CBD5E1"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />}
                        </div>
                      </div>

                      <div style={{ margin: "8px 0 12px" }}>
                        <div style={{ fontSize: "1.3rem", fontWeight: 800, color: isDark ? "#22D3EE" : "#0F766E" }}>
                          Rs. {displayPrice.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: isDark ? "#94A3B8" : "#64748B", marginTop: 2 }}>
                          per month · Rs. {billedTotal.toLocaleString()} billed annually
                        </div>
                      </div>

                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: isDark ? "#E2E8F0" : "#334155", marginBottom: 6 }}>
                        Up to {p.maxUsers} users
                      </div>

                      <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        fontSize: "0.75rem",
                        color: isDark ? "#94A3B8" : "#64748B",
                        lineHeight: 1.5,
                      }}>
                        {p.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                            <CheckOutlined style={{ color: "#10B981", fontSize: 10 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: isDark ? "1px solid #475569" : "1px solid #CBD5E1",
                  background: "transparent",
                  color: isDark ? "#94A3B8" : "#475569",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                &lt; Back to Organization
              </button>

              <button
                type="button"
                onClick={() => { if (selectedPlan) setStep(3); }}
                style={{
                  height: 44,
                  padding: "0 28px",
                  borderRadius: 8,
                  border: "none",
                  background: isDark
                    ? "linear-gradient(135deg, #008B94 0%, #0F766E 100%)"
                    : "linear-gradient(135deg, #0F766E 0%, #0D5D57 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: isDark
                    ? "0 4px 14px rgba(0, 139, 148, 0.3)"
                    : "0 4px 14px rgba(15, 118, 110, 0.25)",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Continue with {plan.name} →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Billing & Launch (Integrated Enterprise Order Summary, Payment & Legal Agreement) ── */}
        {step === 3 && (
          <div>
            <PaymentForm
              plan={plan}
              billingCycle={billingCycle}
              orgData={orgData}
              userEmail={email}
              adminName={profile.fullName}
              onSuccess={handleFinalAgreementSubmit}
            />
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "1rem" }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  background: "transparent", 
                  border: isDark ? "1px solid #475569" : "1px solid #CBD5E1",
                  color: isDark ? "#94A3B8" : "#475569",
                  padding: "10px 20px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-primary)"
                }}
              >
                &lt; Back to Plan Selection
              </button>
            </div>
          </div>
        )}
      </EnterpriseSplitLayout>
    </>
  );
}

import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ color: "white", padding: "2rem", textAlign: "center" }}>Loading signup page...</div>}>
      <SignupPageInner />
    </Suspense>
  );
}
