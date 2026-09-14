import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { mockDB, ADMIN_CREDENTIALS } from "@/lib/mock/mockData";
import { useAuthStore } from "@/lib/store/authStore";
import { useThemeStore } from "@/lib/store/themeStore";
import { useBrandLogo } from "@/lib/brand/logoHelper";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { blogStore } from "@/lib/mock/blogData";

function LoginSlider() {
  const { mode, palette } = useThemeStore();
  const brandLogo = useBrandLogo();
  const isDark = mode === "dark";
  const [current, setCurrent] = useState(0);
  const blogs = useMemo(() => blogStore.getBlogs(), []);
  const settings = useMemo(() => blogStore.getSliderSettings(), []);

  const slides = useMemo(() => {
    const list: { title: string; subtitle: string; tag?: string; image?: string; isBlog?: boolean; blogId?: string }[] = [];
    settings.slideItems.forEach((itemId) => {
      if (itemId === "features") {
        list.push({
          title: "Intelligent Features Set",
          subtitle: "Automate your invoices, tracking registers, TDS/VAT annexures, and Bikram Sambat ledger balances.",
          tag: "Pivotal Premium Features",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60"
        });
      } else {
        const blog = blogs.find((b) => b.id === itemId);
        if (blog) {
          list.push({
            title: blog.title,
            subtitle: blog.excerpt,
            tag: blog.tags.join(" · "),
            image: blog.imageUrl,
            isBlog: true,
            blogId: blog.id
          });
        }
      }
    });
    // Fallback if empty
    if (list.length === 0) {
      list.push({
        title: "Welcome to Pivotal ERP",
        subtitle: "Nepal's premium financial accounting and business operations suite.",
        tag: "Branding"
      });
    }
    return list;
  }, [blogs, settings]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, settings.speed || 5000);
    return () => clearInterval(timer);
  }, [slides, settings.speed]);

  const activeSlide = slides[current] || slides[0];

  return (
    <div style={{
      flex: "0 0 52%", display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "4.5rem", background: isDark ? "linear-gradient(180deg, #0F172A 0%, #090D16 100%)" : `linear-gradient(180deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
      borderRight: isDark ? "1px solid #1E293B" : "none", position: "relative", overflow: "hidden"
    }} className="hide-on-mobile">
      
      {/* Background Image with blur overlay */}
      {activeSlide.image && (
        <div style={{
          position: "absolute", inset: 0, backgroundImage: `url(${activeSlide.image})`,
          backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12, zIndex: 0,
          transition: "background-image 0.5s ease-in-out"
        }} />
      )}

      <div style={{ zIndex: 1, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <img
            src={brandLogo}
            alt="Pivotal ERP Logo"
            style={{ height: 48, width: "auto", objectFit: "contain", filter: isDark ? "none" : (palette.id.startsWith("pivotal-") ? "none" : "brightness(0) invert(1)") }}
          />
        </div>
      </div>

      <div style={{ zIndex: 1, position: "relative", margin: "auto 0" }}>
        {activeSlide.tag && (
          <span style={{
            background: isDark ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.2)",
            color: isDark ? "#22D3EE" : "#FFFFFF", padding: "4px 10px",
            borderRadius: 6, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: 0.5, display: "inline-block", marginBottom: "1rem"
          }}>
            {activeSlide.tag}
          </span>
        )}
        <h2 style={{
          color: "white", fontSize: "2rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "1rem",
          transition: "all 0.3s ease", letterSpacing: "-0.015em"
        }}>
          {activeSlide.title}
        </h2>
        <p style={{
          color: isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)", lineHeight: 1.7, fontSize: "1rem",
          transition: "all 0.3s ease", maxWidth: "90%"
        }}>
          {activeSlide.subtitle}
        </p>

        {activeSlide.isBlog && (
          <Link
            to={activeSlide.blogId ? `/blog?id=${encodeURIComponent(activeSlide.blogId)}` : "/blog"}
            style={{
              color: isDark ? "#22D3EE" : "#A7F3D0", textDecoration: "none", fontSize: "0.85rem",
              fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1rem"
            }}
          >
            Read Full Article ↗
          </Link>
        )}
      </div>

      {/* Slider dots indicator */}
      <div style={{ zIndex: 1, position: "relative", display: "flex", gap: 8, marginTop: "2rem" }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: idx === current ? 24 : 8, height: 8, borderRadius: 4, border: "none",
              background: idx === current ? (isDark ? "#22D3EE" : "#FFFFFF") : "rgba(255,255,255,0.25)",
              cursor: "pointer", transition: "all 0.3s"
            }}
          />
        ))}
      </div>

    </div>
  );
}

function LoginPageInner() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    const e: Record<string, string> = {};
    if (!companyCode && email !== ADMIN_CREDENTIALS.email) e.companyCode = "Company Code is required";
    if (!email) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    // Check admin
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      login({ id: "admin", email, name: "Super Admin", role: "admin" }, "admin-token");
      navigate("/erp");
      return;
    }

    // Check regular user
    const user = mockDB.findUserByEmail(email);
    if (!user || user.passwordHash !== password) {
      setErrors({ form: "Invalid email or password. Please try again." });
      setLoading(false);
      return;
    }

    // Verify company code constraint
    const companies = mockDB.getCompanies();
    const userCompany = companies.find((c) => c.id === user.companyId);

    if (!companyCode) {
      setErrors({ companyCode: "Company Code is required", form: "Please enter your Company Code to log in." });
      setLoading(false);
      return;
    }
    if (userCompany && userCompany.code?.toUpperCase() !== companyCode.trim().toUpperCase()) {
      setErrors({ companyCode: "Invalid Company Code", form: "The Company Code does not match this user account." });
      setLoading(false);
      return;
    }

    // Check company status
    if (userCompany && userCompany.status === "suspended") {
      setErrors({ form: "Your company account has been suspended. Please contact Pivotal ERP support." });
      setLoading(false);
      return;
    }

    login(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: "company_user",
        companyId: user.companyId,
        companyName: userCompany?.name,
        companyCode: userCompany?.code,
        subdomain: userCompany?.subdomain,
        isFirstLogin: user.isFirstLogin,
        hasCompletedTour: user.hasCompletedTour,
      } as Parameters<typeof login>[0],
      `token-${user.id}`
    );

    // First login → force password change
    if (user.isFirstLogin) {
      navigate("/change-password");
    } else {
      navigate("/erp");
    }
  };

  const { mode, palette } = useThemeStore();
  const brandLogo = useBrandLogo();
  const isDark = mode === "dark";

  return (
    <div style={{
      minHeight: "100vh",
      background: isDark 
        ? "linear-gradient(135deg, #0B132B 0%, #1a2550 40%, #051820 100%)"
        : "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 40%, #CBD5E1 100%)",
      display: "flex", fontFamily: "var(--font-primary)",
    }}>
      <LoginSlider />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", boxSizing: "border-box" }}>
        <div style={{
          width: "100%",
          maxWidth: 460,
          background: isDark ? "#131C2E" : "#FFFFFF",
          borderRadius: 14,
          border: isDark ? "1px solid #1E293B" : "1px solid #E2E8F0",
          boxShadow: isDark
            ? "0 4px 24px rgba(0,0,0,0.35)"
            : "0 1px 3px rgba(0,0,0,0.04), 0 10px 25px -5px rgba(0,0,0,0.04)",
          padding: "2.25rem 2.25rem",
          boxSizing: "border-box",
        }}>
          {/* Mobile Logo Brand */}
          <div className="show-on-mobile-flex" style={{ display: "none", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <img
              src={brandLogo}
              alt="Pivotal ERP Logo"
              style={{ height: 44, width: "auto", objectFit: "contain" }}
            />
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <span style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isDark ? "#22D3EE" : "#0F766E",
              display: "block",
              marginBottom: 4,
            }}>
              Enterprise Portal
            </span>
            <h1 style={{
              color: isDark ? "#F8FAFC" : "#0F172A",
              fontSize: "1.5rem",
              fontWeight: 800,
              margin: "0 0 6px 0",
              letterSpacing: "-0.015em",
            }}>
              Sign In
            </h1>
            <p style={{
              color: isDark ? "#94A3B8" : "#64748B",
              fontSize: "0.85rem",
              margin: 0,
              lineHeight: 1.4,
            }}>
              Enter your Company Code, work email and password
            </p>
          </div>

          {errors.form && (
            <div style={{
              background: isDark ? "rgba(239,68,68,0.12)" : "#FEF2F2",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
              color: isDark ? "#FCA5A5" : "#DC2626",
              fontSize: "0.8125rem",
              fontWeight: 500,
            }}>
              {errors.form}
            </div>
          )}

          {/* Company Code */}
          <div style={{ marginBottom: "1.15rem" }}>
            <label style={{
              display: "block",
              color: isDark ? "rgba(255,255,255,0.85)" : "#334155",
              fontSize: "0.8125rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
              letterSpacing: "-0.01em",
            }}>
              Company Code <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="text"
              value={companyCode}
              onChange={(e) => { setCompanyCode(e.target.value.toUpperCase()); setErrors({}); }}
              placeholder="e.g. PVT-001"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                height: 42,
                padding: "0 14px",
                borderRadius: 8,
                border: errors.companyCode
                  ? "1.5px solid #EF4444"
                  : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontSize: "0.875rem",
                outline: "none",
                fontFamily: "var(--font-primary)",
                letterSpacing: "0.04em",
                fontWeight: 600,
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                if (!errors.companyCode) {
                  e.target.style.borderColor = isDark ? "#22D3EE" : "#0F766E";
                  e.target.style.boxShadow = isDark
                    ? "0 0 0 2px rgba(34,211,238,0.2)"
                    : "0 0 0 2px rgba(15,118,110,0.15)";
                }
              }}
              onBlur={(e) => {
                if (!errors.companyCode) {
                  e.target.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1";
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {errors.companyCode && (
              <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>
                {errors.companyCode}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div style={{ marginBottom: "1.15rem" }}>
            <label style={{
              display: "block",
              color: isDark ? "rgba(255,255,255,0.85)" : "#334155",
              fontSize: "0.8125rem",
              fontWeight: 600,
              marginBottom: "0.4rem",
              letterSpacing: "-0.01em",
            }}>
              Email Address <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
              placeholder="you@company.com.np"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                height: 42,
                padding: "0 14px",
                borderRadius: 8,
                border: errors.email
                  ? "1.5px solid #EF4444"
                  : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontSize: "0.875rem",
                outline: "none",
                fontFamily: "var(--font-primary)",
                boxSizing: "border-box",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = isDark ? "#22D3EE" : "#0F766E";
                  e.target.style.boxShadow = isDark
                    ? "0 0 0 2px rgba(34,211,238,0.2)"
                    : "0 0 0 2px rgba(15,118,110,0.15)";
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1";
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {errors.email && (
              <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.35rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label style={{
                color: isDark ? "rgba(255,255,255,0.85)" : "#334155",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}>
                Password <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: isDark ? "#22D3EE" : "#0F766E",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                placeholder="Your password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  height: 42,
                  padding: "0 42px 0 14px",
                  borderRadius: 8,
                  border: errors.password
                    ? "1.5px solid #EF4444"
                    : (isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #CBD5E1"),
                  background: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  fontSize: "0.875rem",
                  outline: "none",
                  fontFamily: "var(--font-primary)",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = isDark ? "#22D3EE" : "#0F766E";
                    e.target.style.boxShadow = isDark
                      ? "0 0 0 2px rgba(34,211,238,0.2)"
                      : "0 0 0 2px rgba(15,118,110,0.15)";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isDark ? "rgba(255,255,255,0.4)" : "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                }}
                title={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "4px 0 0", fontWeight: 500 }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 8,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "rgba(15, 118, 110, 0.5)"
                : (isDark
                    ? `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`
                    : `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`),
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.875rem",
              fontFamily: "var(--font-primary)",
              transition: "all 0.2s ease",
              boxShadow: loading
                ? "none"
                : `0 4px 14px ${palette.primary}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          {/* Links */}
          <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "0.8125rem", margin: 0 }}>
              Don&apos;t have an account?{" "}
              <Link to="/signup" style={{ color: isDark ? "#22D3EE" : "#0F766E", fontWeight: 700, textDecoration: "none" }}>
                Create account
              </Link>
              {" "}or{" "}
              <Link to="/trial" style={{ color: isDark ? "#22D3EE" : "#0F766E", fontWeight: 700, textDecoration: "none" }}>
                Start free trial
              </Link>
            </p>
          </div>

          {/* Refined Demo Credentials Box with One-Click Fill */}
          <div style={{
            marginTop: "1.5rem",
            background: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
            borderRadius: 10,
            padding: "1rem",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.6rem",
            }}>
              <span style={{
                color: isDark ? "#94A3B8" : "#475569",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>
                ⚡ Quick Demo Fill
              </span>
              <span style={{ fontSize: "0.7rem", color: isDark ? "#64748B" : "#94A3B8" }}>
                Click to autofill
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button
                type="button"
                onClick={() => {
                  setCompanyCode("PVT-001");
                  setEmail("admin@abctrading.com.np");
                  setPassword("Pass@1234");
                  setErrors({});
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
                  background: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "rgba(0,139,148,0.15)" : "#F0FDFA"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF"; }}
              >
                <div>
                  <span style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 4,
                    background: isDark ? "rgba(0,139,148,0.25)" : "#CCFBF1",
                    color: isDark ? "#22D3EE" : "#0F766E",
                    marginRight: 6,
                  }}>
                    PVT-001
                  </span>
                  <span style={{ fontSize: "0.78rem", color: isDark ? "#E2E8F0" : "#334155" }}>
                    admin@abctrading.com.np
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                  Fill →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompanyCode("PVT-002");
                  setEmail("newuser@xyzservices.com.np");
                  setPassword("Pass@5678");
                  setErrors({});
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #E2E8F0",
                  background: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "rgba(0,139,148,0.15)" : "#F0FDFA"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF"; }}
              >
                <div>
                  <span style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 4,
                    background: isDark ? "rgba(0,139,148,0.25)" : "#CCFBF1",
                    color: isDark ? "#22D3EE" : "#0F766E",
                    marginRight: 6,
                  }}>
                    PVT-002
                  </span>
                  <span style={{ fontSize: "0.78rem", color: isDark ? "#E2E8F0" : "#334155" }}>
                    newuser@xyzservices.com.np
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", color: isDark ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                  Fill →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ color: "white", padding: "2rem", textAlign: "center" }}>Loading login page...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
