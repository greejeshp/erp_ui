import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { mockDB } from "@/lib/mock/mockData";
import { AgreementModal, CompanyCreationModal, SuccessModal } from "./SignupPage";
import { useBrandLogo } from "@/lib/brand/logoHelper";
import { useThemeStore } from "@/lib/store/themeStore";

function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  const brandLogo = useBrandLogo();
  const { palette } = useThemeStore();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #051820 0%, #0c2340 50%, #0B132B 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", fontFamily: "var(--font-primary)",
    }}>
      <div style={{ position: "fixed", top: "15%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${palette.primary}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{
        width: "100%", maxWidth: "520px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, padding: "2.5rem",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={brandLogo}
              alt="Pivotal ERP Logo"
              style={{ height: 52, width: "auto", objectFit: "contain" }}
            />
          </Link>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1rem",
            background: "rgba(0,139,148,0.15)", border: "1px solid rgba(0,139,148,0.3)",
            borderRadius: 100, padding: "4px 14px", color: "#22D3EE", fontSize: "0.8rem", fontWeight: 600,
          }}>
            🎉 14 Days Free Trial — No Credit Card Required
          </div>
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, error, required }: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; required?: boolean;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 16px", borderRadius: 10,
          border: error ? "2px solid #ef4444" : "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)", color: "white",
          fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-primary)",
        }}
      />
      {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export default function TrialPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=email, 1=agreement, 2=company, 3=success
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [showAgreement, setShowAgreement] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCompany, setCreatedCompany] = useState<ReturnType<typeof mockDB.registerCompany> | null>(null);
  const settings = mockDB.getSettings();

  useEffect(() => {
    const saved = localStorage.getItem("pivotal-signup-email");
    if (saved) setEmail(saved);
  }, []);

  const handleStart = () => {
    if (!email) { setEmailErr("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Invalid email format"); return; }
    if (mockDB.isEmailTaken(email)) { setEmailErr("This email is already registered. Please log in instead."); return; }
    setEmailErr("");
    setShowAgreement(true);
  };

  return (
    <>
      {showAgreement && !showCompany && (
        <AgreementModal onAccept={() => { setShowAgreement(false); setShowCompany(true); }} />
      )}
      {showCompany && !showSuccess && (
        <CompanyCreationModal
          userEmail={email}
          onSuccess={(company: any) => {
            const trialCompany = { ...company, isTrial: true, status: "trial" as const };
            setCreatedCompany(trialCompany);
            setShowCompany(false);
            setShowSuccess(true);
          }}
        />
      )}
      {showSuccess && createdCompany && (
        <SuccessModal
          company={createdCompany}
          email={email}
          onContinue={() => {
            mockDB.registerUser({ email, name: "Trial User", passwordHash: "Pivotal@2025", companyId: createdCompany.id, role: "owner", isFirstLogin: true, hasCompletedTour: false });
            navigate("/login");
          }}
        />
      )}

      <AuthShell
        title="Start Your Free Trial"
        subtitle={`${settings.trialDurationDays} days free, full access, no payment required`}
      >
        {/* What you get */}
        <div style={{
          background: "rgba(0,139,148,0.08)", border: "1px solid rgba(0,139,148,0.2)",
          borderRadius: 12, padding: "1rem", marginBottom: "1.5rem",
        }}>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem" }}>
            What&apos;s included in your trial:
          </div>
          {[
            "Full accounting module (NFRS compliant)",
            "VAT 13% & TDS calculations",
            "Bikram Sambat calendar integration",
            "Chart of accounts & vouchers",
            "Trial balance & financial statements",
            "AI assistant (30+ commands)",
          ].map((f) => (
            <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <span style={{ color: "#22D3EE", fontSize: "0.85rem" }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{f}</span>
            </div>
          ))}
        </div>

        <Input
          label="Work Email"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setEmailErr(""); }}
          placeholder="you@company.com.np"
          error={emailErr}
          required
        />

        <button onClick={handleStart} style={{
          width: "100%", padding: "13px", borderRadius: 10, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #008B94, #22D3EE)",
          color: "white", fontWeight: 700, fontSize: "0.95rem",
          fontFamily: "var(--font-primary)", transition: "opacity 0.2s",
        }}>
          Start Free Trial — No Credit Card →
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "1.25rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Want full features right away?{" "}
            <Link to="/signup" style={{ color: "#22D3EE", fontWeight: 600 }}>Choose a plan →</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "1rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#22D3EE" }}>Log in</Link>
        </p>
      </AuthShell>
    </>
  );
}
