import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { blogStore, type Blog } from "@/lib/mock/blogData";
import { useThemeStore } from "@/lib/store/themeStore";
import {
  Sun,
  Moon,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";

export default function BlogLandingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mode, setMode, palette } = useThemeStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBlogs(blogStore.getBlogs());
  }, []);

  const isDark = mode === "dark";
  const activeBlogId = searchParams.get("id");

  // Selected article
  const currentBlog = useMemo(() => {
    if (!activeBlogId) return null;
    return blogs.find((b) => b.id === activeBlogId) || null;
  }, [blogs, activeBlogId]);

  // Recent/other blogs for right-side panel
  const recentBlogs = useMemo(() => {
    return blogs.filter((b) => b.id !== activeBlogId);
  }, [blogs, activeBlogId]);

  const handleSelectBlog = (id: string) => {
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToAll = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: isDark
          ? "linear-gradient(180deg, #09151F 0%, #060B12 100%)"
          : "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        fontFamily: 'var(--font-primary, "Plus Jakarta Sans", sans-serif)',
        color: isDark ? "#F1F5F9" : "#0F172A",
      }}
    >
      {/* ─── Top Navigation Bar ────────────────────────────────────────── */}
      <nav
        style={{
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(15,23,42,0.08)",
          background: isDark
            ? "rgba(9, 21, 31, 0.92)"
            : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Brand Logo Lockup (Returns to Landing Page Hero) */}
        <Link
          to="/"
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          title="Pivotal ERP - Return to Hero"
        >
          <img
            src={brandLogo}
            alt="Pivotal ERP"
            style={{ height: 42, width: "auto", objectFit: "contain", display: "block" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderLeft: isDark
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid #E2E8F0",
              paddingLeft: "9px",
              marginLeft: "2px",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
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
              }}
            />
          </div>
        </Link>

        {/* Center/Right Nav Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button
            onClick={() => {
              if (currentBlog) {
                handleBackToAll();
              } else {
                navigate("/");
              }
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: isDark ? "rgba(255,255,255,0.8)" : "#475569",
              fontSize: "0.9rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {currentBlog ? "← All Articles" : "Home"}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setMode(isDark ? "light" : "dark")}
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
              color: isDark ? "#F8FAFC" : "#1E293B",
              borderRadius: "8px",
              padding: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link
            to="/login"
            style={{
              color: isDark ? "#FFFFFF" : "#0F172A",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "7px 16px",
              border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #CBD5E1",
              borderRadius: "8px",
              transition: "all 0.2s",
            }}
          >
            Log In
          </Link>

          <Link
            to="/trial"
            style={{
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 132, 230, 0.25)",
            }}
          >
            Free Trial
          </Link>
        </div>
      </nav>

      {/* ─── Body Area ─────────────────────────────────────────────────── */}
      <main style={{ flex: 1, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {currentBlog ? (
          /* ═══════════════════════════════════════════════════════════════════
             ARTICLE FULL-PAGE READER WITH RECENT BLOGS RIGHT PANEL
             ═══════════════════════════════════════════════════════════════════ */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 340px",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Left/Main Column: Full Article View */}
            <article
              style={{
                background: isDark ? "rgba(15, 23, 42, 0.65)" : "#FFFFFF",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.35)"
                  : "0 4px 20px rgba(15,23,42,0.04)",
              }}
            >
              {/* Breadcrumbs & Back Action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.85rem",
                    color: isDark ? "rgba(255,255,255,0.6)" : "#64748B",
                  }}
                >
                  <button
                    onClick={handleBackToAll}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: palette.secondary,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <ArrowLeft size={15} /> Knowledge Hub
                  </button>
                  <ChevronRight size={14} />
                  <span>{currentBlog.tags[0] || "Insight"}</span>
                </div>

                <button
                  onClick={handleShare}
                  style={{
                    background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    color: isDark ? "#F1F5F9" : "#334155",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                >
                  <Share2 size={13} /> {copied ? "Copied Link!" : "Share Article"}
                </button>
              </div>

              {/* Tags Badges */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                {currentBlog.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: isDark ? "rgba(0, 132, 230, 0.15)" : "rgba(0, 132, 230, 0.08)",
                      color: palette.secondary,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                  margin: "0 0 1.25rem 0",
                  letterSpacing: "-0.02em",
                  color: isDark ? "#FFFFFF" : "#0F172A",
                }}
              >
                {currentBlog.title}
              </h1>

              {/* Author & Publication Metadata */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  paddingBottom: "1.5rem",
                  borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                  marginBottom: "2rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      boxShadow: "0 2px 8px rgba(0, 132, 230, 0.3)",
                    }}
                  >
                    {currentBlog.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.925rem", color: isDark ? "#FFFFFF" : "#0F172A" }}>
                      {currentBlog.author}
                    </div>
                    {currentBlog.authorRole && (
                      <div style={{ fontSize: "0.75rem", color: isDark ? "rgba(255,255,255,0.6)" : "#64748B" }}>
                        {currentBlog.authorRole}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "0.825rem",
                    color: isDark ? "rgba(255,255,255,0.6)" : "#64748B",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Calendar size={14} /> {currentBlog.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Clock size={14} /> {currentBlog.readTime}
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              {currentBlog.imageUrl && (
                <div
                  style={{
                    width: "100%",
                    height: "360px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    marginBottom: "2.25rem",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={currentBlog.imageUrl}
                    alt={currentBlog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Lead Excerpt */}
              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  color: isDark ? "rgba(255,255,255,0.9)" : "#334155",
                  marginBottom: "2rem",
                  borderLeft: `4px solid ${palette.secondary}`,
                  paddingLeft: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                {currentBlog.excerpt}
              </p>

              {/* Primary Content Body */}
              <div
                style={{
                  fontSize: "1.025rem",
                  lineHeight: 1.8,
                  color: isDark ? "rgba(255,255,255,0.8)" : "#334155",
                  marginBottom: "2.5rem",
                }}
              >
                <p style={{ margin: "0 0 1.5rem 0" }}>{currentBlog.content}</p>

                {/* Structured Sections */}
                {currentBlog.sections?.map((section, sIdx) => (
                  <div key={sIdx} style={{ marginTop: "2rem" }}>
                    <h2
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: isDark ? "#FFFFFF" : "#0F172A",
                        margin: "0 0 0.85rem 0",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {section.heading}
                    </h2>
                    <p style={{ margin: 0, lineHeight: 1.8 }}>{section.body}</p>
                  </div>
                ))}
              </div>

              {/* Key Takeaways Callout Box */}
              {currentBlog.takeaways && currentBlog.takeaways.length > 0 && (
                <div
                  style={{
                    background: isDark ? "rgba(0, 132, 230, 0.08)" : "#F0FDF4",
                    border: isDark
                      ? "1px solid rgba(0, 132, 230, 0.25)"
                      : "1px solid #BBF7D0",
                    borderRadius: "12px",
                    padding: "1.75rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: isDark ? palette.secondary : "#166534",
                      marginBottom: "1rem",
                    }}
                  >
                    <Sparkles size={18} />
                    <span>Executive Takeaways for Financial Leaders</span>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                      color: isDark ? "rgba(255,255,255,0.85)" : "#1E293B",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {currentBlog.takeaways.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Post Actions & Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                  paddingTop: "1.75rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={handleBackToAll}
                  style={{
                    background: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                    border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #CBD5E1",
                    color: isDark ? "#FFFFFF" : "#0F172A",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                >
                  <ArrowLeft size={16} /> All Articles
                </button>

                <Link
                  to="/trial"
                  style={{
                    background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                    color: "#FFFFFF",
                    padding: "10px 22px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 10px rgba(0, 132, 230, 0.3)",
                  }}
                >
                  Experience Pivotal ERP <ArrowRight size={16} />
                </Link>
              </div>
            </article>

            {/* Right-Side Panel: Recent & Related Articles + Sticky Conversion Box */}
            <aside
              style={{
                position: "sticky",
                top: "92px",
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              {/* Recent Articles Card */}
              <div
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.65)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: isDark ? "#FFFFFF" : "#0F172A",
                    marginBottom: "1.25rem",
                    paddingBottom: "0.75rem",
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                  }}
                >
                  <TrendingUp size={16} color={palette.secondary} />
                  <span>Recent Articles</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {recentBlogs.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handleSelectBlog(b.id)}
                      style={{
                        display: "flex",
                        gap: "12px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        padding: "6px",
                        margin: "-6px",
                        transition: "background 0.2s ease, transform 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#F8FAFC";
                        e.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {/* Thumbnail */}
                      {b.imageUrl && (
                        <div
                          style={{
                            width: "72px",
                            height: "64px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={b.imageUrl}
                            alt={b.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            lineHeight: 1.35,
                            color: isDark ? "#F1F5F9" : "#1E293B",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {b.title}
                        </h4>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: isDark ? "rgba(255,255,255,0.5)" : "#64748B",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "4px",
                          }}
                        >
                          <span>{b.readTime}</span>
                          <span>•</span>
                          <span>{b.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Promo Card */}
              <div
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(0, 132, 230, 0.15) 0%, rgba(72, 187, 40, 0.1) 100%)"
                    : "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
                  border: isDark
                    ? "1px solid rgba(0, 132, 230, 0.3)"
                    : "1px solid #BFDBFE",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <span
                  style={{
                    background: isDark ? "rgba(0,132,230,0.25)" : "#DBEAFE",
                    color: palette.secondary,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Built for Nepal
                </span>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "0.75rem 0 0.5rem",
                    color: isDark ? "#FFFFFF" : "#0F172A",
                    lineHeight: 1.3,
                  }}
                >
                  Automate NFRS & 13% VAT with Pivotal ERP
                </h3>
                <p
                  style={{
                    fontSize: "0.825rem",
                    lineHeight: 1.6,
                    color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                    margin: "0 0 1.25rem",
                  }}
                >
                  Trusted by 500+ Nepalese enterprises. Dual Bikram Sambat calendar, certified IRD Annexure 13, and multi-branch ledger consolidation.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link
                    to="/trial"
                    style={{
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                      color: "#FFFFFF",
                      textAlign: "center",
                      padding: "9px 14px",
                      borderRadius: "7px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(0, 132, 230, 0.3)",
                    }}
                  >
                    Start 14-Day Free Trial
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      color: isDark ? "#E2E8F0" : "#1E293B",
                      textAlign: "center",
                      padding: "8px 14px",
                      borderRadius: "7px",
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1",
                    }}
                  >
                    Log In to Existing Account
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════
             KNOWLEDGE HUB GRID VIEW (ALL BLOGS)
             ═══════════════════════════════════════════════════════════════════ */
          <div>
            {/* Header / Intro */}
            <div style={{ textAlign: "center", marginBottom: "3rem", padding: "1rem 0" }}>
              <span
                style={{
                  background: isDark ? "rgba(0, 132, 230, 0.15)" : "rgba(0, 132, 230, 0.08)",
                  color: palette.secondary,
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Pivotal Knowledge Hub
              </span>
              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  margin: "0.75rem 0 0.5rem 0",
                  letterSpacing: "-0.02em",
                  color: isDark ? "#FFFFFF" : "#0F172A",
                }}
              >
                Blogs & Industry Regulatory Updates
              </h1>
              <p
                style={{
                  color: isDark ? "rgba(255,255,255,0.65)" : "#64748B",
                  fontSize: "1rem",
                  maxWidth: 620,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Stay ahead with authoritative commentary on NFRS standards, corporate tax compliance, 13% VAT reconciliation, and cloud ERP technology in Nepal.
              </p>
            </div>

            {/* Grid of Articles */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "2rem",
              }}
            >
              {blogs.map((b) => (
                <article
                  key={b.id}
                  onClick={() => handleSelectBlog(b.id)}
                  style={{
                    background: isDark ? "rgba(15, 23, 42, 0.65)" : "#FFFFFF",
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
                    borderRadius: "14px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    cursor: "pointer",
                    boxShadow: isDark
                      ? "0 4px 15px rgba(0,0,0,0.3)"
                      : "0 4px 15px rgba(15,23,42,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 12px 30px rgba(0,0,0,0.5)"
                      : "0 12px 30px rgba(15,23,42,0.08)";
                    e.currentTarget.style.borderColor = palette.secondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 4px 15px rgba(0,0,0,0.3)"
                      : "0 4px 15px rgba(15,23,42,0.03)";
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#E2E8F0";
                  }}
                >
                  {/* Hero thumbnail */}
                  {b.imageUrl && (
                    <div style={{ height: "190px", overflow: "hidden", position: "relative" }}>
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                        }}
                      >
                        {b.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              background: "rgba(9, 21, 31, 0.85)",
                              color: palette.secondary,
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              backdropFilter: "blur(6px)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div
                    style={{
                      padding: "1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: isDark ? "rgba(255,255,255,0.5)" : "#64748B",
                          fontSize: "0.78rem",
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Calendar size={13} /> {b.date} • {b.readTime}
                      </div>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: isDark ? "#FFFFFF" : "#0F172A",
                          margin: "0 0 0.65rem 0",
                          lineHeight: 1.35,
                        }}
                      >
                        {b.title}
                      </h3>
                      <p
                        style={{
                          color: isDark ? "rgba(255,255,255,0.65)" : "#475569",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          margin: "0 0 1.25rem 0",
                        }}
                      >
                        {b.excerpt}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #F1F5F9",
                        paddingTop: "0.85rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: isDark ? "rgba(255,255,255,0.6)" : "#64748B",
                          fontWeight: 500,
                        }}
                      >
                        By {b.author}
                      </span>
                      <span
                        style={{
                          color: palette.secondary,
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Read Full Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
          background: isDark ? "rgba(6, 11, 18, 0.95)" : "#FFFFFF",
          padding: "2rem 1.5rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.85rem",
            color: isDark ? "rgba(255,255,255,0.5)" : "#64748B",
          }}
        >
          <div>
            © {new Date().getFullYear()} Pivotal ERP. A product of Dynamic Technosoft Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/trial" style={{ color: "inherit", textDecoration: "none" }}>
              Free Trial
            </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              Log In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
