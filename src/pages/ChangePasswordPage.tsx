import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/lib/store/authStore";
import { mockDB } from "@/lib/mock/mockData";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user, setFirstLoginComplete } = useAuthStore();
  const [form, setForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showFields, setShowFields] = useState({ current: false, newPwd: false, confirm: false });

  const requirements = [
    { label: "At least 8 characters", met: form.newPwd.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(form.newPwd) },
    { label: "At least one number", met: /\d/.test(form.newPwd) },
    { label: "At least one special character", met: /[!@#$%^&*]/.test(form.newPwd) },
  ];

  const handleSubmit = async () => {
    const e: Record<string, string> = {};
    if (!form.current) e.current = "Current password required";
    if (!requirements.every((r) => r.met)) e.newPwd = "Password does not meet requirements";
    if (form.newPwd !== form.confirm) e.confirm = "Passwords do not match";
    if (form.current === form.newPwd) e.newPwd = "New password must be different from current";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Verify current password
    const dbUser = user ? mockDB.findUserByEmail(user.email) : null;
    if (dbUser && dbUser.passwordHash !== form.current) {
      setErrors({ current: "Current password is incorrect" });
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    // Update password in mock DB
    const users = mockDB.getUsers();
    const idx = users.findIndex((u) => u.email === user?.email);
    if (idx >= 0) {
      users[idx].passwordHash = form.newPwd;
      users[idx].isFirstLogin = false;
      mockDB.saveUsers(users);
    }

    setFirstLoginComplete();
    setLoading(false);
    navigate("/erp");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0B132B 0%, #1a2550 50%, #051820 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", fontFamily: "var(--font-primary)",
    }}>
      {/* Non-closable overlay warning */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        background: "linear-gradient(90deg, #D97706, #F59E0B)",
        padding: "10px", textAlign: "center", zIndex: 100,
        color: "white", fontSize: "0.875rem", fontWeight: 600,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8
      }}>
        <LockOutlined /> First Login Detected — You must change your password before accessing Pivotal ERP
      </div>

      <div style={{
        width: "100%", maxWidth: 480, marginTop: "40px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, padding: "2.5rem",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2rem", color: "var(--teal)", marginBottom: "0.5rem" }}>
            <LockOutlined />
          </div>
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Set Your New Password
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
            For security, please change your temporary password before continuing.
          </p>
        </div>

        {/* Current Password */}
        {[
          { id: "current" as const, label: "Current Password", placeholder: "Your temporary password" },
          { id: "newPwd" as const, label: "New Password", placeholder: "Min 8 chars, uppercase, number, special" },
          { id: "confirm" as const, label: "Confirm New Password", placeholder: "Re-enter new password" },
        ].map((field) => (
          <div key={field.id} style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
              {field.label} <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showFields[field.id] ? "text" : "password"}
                value={form[field.id]}
                onChange={(e) => { setForm((f) => ({ ...f, [field.id]: e.target.value })); setErrors((err) => ({ ...err, [field.id]: "" })); }}
                placeholder={field.placeholder}
                style={{
                  width: "100%", padding: "12px 48px 12px 16px", borderRadius: 10,
                  border: errors[field.id] ? "2px solid #ef4444" : "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)", color: "white",
                  fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-primary)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowFields((f) => ({ ...f, [field.id]: !f[field.id] }))}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}
              >
                {showFields[field.id] ? <EyeInvisibleOutlined style={{ fontSize: 16 }} /> : <EyeOutlined style={{ fontSize: 16 }} />}
              </button>
            </div>
            {errors[field.id] && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: 4 }}>{errors[field.id]}</p>}
          </div>
        ))}

        {/* Password Requirements */}
        {form.newPwd && (
          <div style={{
            background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "1rem", marginBottom: "1.25rem",
          }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>Password Requirements:</p>
            {requirements.map((r) => (
              <div key={r.label} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: r.met ? "#10b981" : "#ef4444", fontSize: "0.85rem", display: "inline-flex", alignItems: "center" }}>
                  {r.met ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                </span>
                <span style={{ color: r.met ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{r.label}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "14px", borderRadius: 10, border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, #1D4EDB, #008B94)",
            color: "white", fontWeight: 700, fontSize: "1rem",
            fontFamily: "var(--font-primary)", opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Updating password..." : "Set Password & Enter ERP →"}
        </button>
      </div>
    </div>
  );
}
