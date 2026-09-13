import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogStore, type Blog } from "@/lib/mock/blogData";
import { useThemeStore } from "@/lib/store/themeStore";
import { Sun, Moon } from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";

export default function BlogLandingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { mode, setMode } = useThemeStore();

  useEffect(() => {
    setBlogs(blogStore.getBlogs());
  }, []);

  const isDark = mode === "dark";

  return (
    <div style={{
      minHeight: "100vh",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: isDark
        ? "linear-gradient(135deg, #0B132B 0%, #1a2550 40%, #051820 100%)"
        : "#F3F4F6",
      fontFamily: "var(--font-primary)",
      color: isDark ? "white" : "var(--text-primary)"
    }}>
      {/* Navbar */}
      <nav style={{
        padding: "0 2rem", height: "64px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
        background: isDark ? "rgba(11,19,43,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        flexShrink: 0,
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={brandLogo}
            alt="Pivotal ERP Logo"
            style={{ height: 40, width: "auto", objectFit: "contain" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Link to="/" style={{ color: isDark ? "rgba(255,255,255,0.8)" : "var(--text-primary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Home</Link>
          <Link to="/login" style={{
            color: isDark ? "rgba(255,255,255,0.8)" : "var(--text-primary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
            padding: "6px 14px", border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(15,23,42,0.2)", borderRadius: 6,
          }}>
            Log In
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem", flexShrink: 0 }}>
          <span style={{
            background: isDark ? "rgba(34,211,238,0.1)" : "rgba(29,78,219,0.08)",
            color: isDark ? "#22D3EE" : "var(--finance-blue)",
            padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase"
          }}>
            Pivotal Knowledge Hub
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 800, margin: "0.5rem 0 0.25rem 0", color: isDark ? "white" : "var(--text-primary)" }}>
            Blogs & Industry Updates
          </h1>
          <p style={{ color: isDark ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", fontSize: "0.85rem", maxWidth: 580, margin: "0 auto" }}>
            Stay informed with expert guidance on NFRS, corporate tax compliance, VAT updates, and Nepali accounting regulations.
          </p>
        </div>

        {/* Blogs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, overflowY: "auto", flex: 1, paddingRight: 4 }}>
          {blogs.map((b) => (
            <article key={b.id} style={{
              background: isDark ? "rgba(255,255,255,0.03)" : "var(--bg-card)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-color)",
              borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column",
              transition: "transform 0.2s", cursor: "pointer"
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {b.imageUrl && (
                <div style={{ height: 130, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <img src={b.imageUrl} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{
                    position: "absolute", bottom: 8, left: 8, display: "flex", gap: 4, flexWrap: "wrap"
                  }}>
                    {b.tags.map((t) => (
                      <span key={t} style={{
                        background: "rgba(11,19,43,0.85)", color: "#22D3EE", padding: "2px 6px",
                        borderRadius: 4, fontSize: "0.65rem", fontWeight: 600
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: isDark ? "rgba(255,255,255,0.4)" : "var(--text-secondary)", fontSize: "0.7rem", marginBottom: "0.25rem" }}>
                    {b.date} · {b.readTime}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: isDark ? "white" : "var(--text-primary)", margin: "0 0 0.4rem 0", lineHeight: 1.3 }}>
                    {b.title}
                  </h3>
                  <p style={{ color: isDark ? "rgba(255,255,255,0.6)" : "var(--text-secondary)", fontSize: "0.75rem", lineHeight: 1.5, margin: "0 0 0.75rem 0" }}>
                    {b.excerpt}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,23,42,0.06)", paddingTop: "0.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: isDark ? "rgba(255,255,255,0.5)" : "var(--text-secondary)" }}>By {b.author}</span>
                  <span style={{ color: "var(--teal)", fontSize: "0.75rem", fontWeight: 600 }}>Read Article →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
