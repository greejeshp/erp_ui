import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Building2, LayoutDashboard, Plus } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import '../../landing.css'

const CHECKS = [
  { title: 'Account Created', sub: 'Admin credentials secured' },
  { title: 'Payment Confirmed', sub: 'Subscription activated' },
  { title: 'ERP Access Granted', sub: 'All modules unlocked' },
]

export default function Step3_Welcome() {
  const navigate = useNavigate()
  const { data, companies, update } = useOnboarding()
  const [visible, setVisible] = useState([])
  const [showAll, setShowAll] = useState(false)

  const hasExistingCompany = companies && companies.length > 0

  useEffect(() => {
    CHECKS.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), 400 + i * 400)
    })
  }, [])

  const handleNewCompany = () => {
    // Clear company-specific fields so they start fresh, keep account data
    update({
      companyName: '',
      bizType: '',
      industry: '',
      pan: '',
      address: '',
      city: '',
      size: '',
      website: '',
      subdomain: '',
    })
    navigate('/signup/company')
  }

  return (
    <div className="welcome-root">
      {/* Confetti dots */}
      {[...Array(24)].map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${6 + Math.random() * 8}px`,
          height: `${6 + Math.random() * 8}px`,
          borderRadius: '50%',
          background: ['#0ea5e9', '#10b981', '#f59e0b', '#a78bfa', '#f43f5e'][i % 5],
          opacity: 0.6,
          animation: `confettiDrop ${1.5 + Math.random()}s ease-out forwards`,
          animationDelay: `${Math.random() * 0.5}s`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="welcome-icon">🎉</div>

      <h1>
        {hasExistingCompany
          ? `You're in, ${data.firstName || 'there'}!`
          : `Welcome, ${data.firstName || 'there'}!`}
      </h1>

      <p>
        {hasExistingCompany
          ? 'Your account is active. Add a new company workspace or go back to your dashboard.'
          : "Your PivotalERP account is ready. Let's finish setting up your company."}
      </p>

      {/* Status checks */}
      <div className="welcome-checks">
        {CHECKS.map((c, i) => (
          visible.includes(i) && (
            <div className="welcome-check-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="welcome-check-icon">
                <CheckCircle size={18} />
              </div>
              <div className="welcome-check-text">
                <strong>{c.title}</strong>
                {c.sub}
              </div>
            </div>
          )
        ))}
      </div>

      {/* CTA Buttons — shown after all checks animate in */}
      {visible.length === CHECKS.length && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 340 }}>

          {hasExistingCompany ? (
            <>
              {/* Primary: Go to Dashboard */}
              <button
                id="welcome-dashboard-btn"
                className="p-btn-primary p-btn-lg welcome-btn"
                onClick={() => navigate('/erp')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              >
                <LayoutDashboard size={20} />
                Go to Dashboard
              </button>

              {/* Secondary: Create New Company */}
              <button
                id="welcome-new-company-btn"
                onClick={handleNewCompany}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px 24px', border: '1px solid var(--p-border)',
                  background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                  color: 'var(--p-text)', fontSize: '1rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--p-primary)'; e.currentTarget.style.background = 'rgba(14,165,233,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--p-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              >
                <Plus size={20} color="var(--p-primary)" />
                Create New Company
              </button>

              {/* Existing companies list */}
              {companies.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{ fontSize: '0.75rem', color: 'var(--p-muted)', textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setShowAll(s => !s)}
                  >
                    {showAll ? 'Hide' : `View ${companies.length} existing workspace${companies.length > 1 ? 's' : ''}`}
                  </div>
                  {showAll && (
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {companies.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            background: 'var(--p-card)', border: '1px solid var(--p-border)',
                            borderRadius: 10, padding: '10px 14px', cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onClick={() => navigate('/erp')}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--p-primary)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--p-border)'}
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: 'linear-gradient(135deg, var(--p-primary), var(--p-accent))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Outfit', fontWeight: 900, color: '#fff',
                          }}>
                            {c.companyName?.[0]?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--p-text)' }}>{c.companyName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--p-muted)' }}>{c.subdomain}.pivotalerp.app</div>
                          </div>
                          <ArrowRight size={14} color="var(--p-muted)" style={{ marginLeft: 'auto' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* First-time user: Set Up Company is primary */}
              <button
                id="welcome-continue-btn"
                className="p-btn-primary p-btn-lg welcome-btn"
                onClick={() => navigate('/signup/company')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              >
                <Building2 size={20} />
                Set Up Your Company <ArrowRight size={20} />
              </button>

              {/* Skip to ERP (ghost) */}
              <button
                id="welcome-skip-btn"
                onClick={() => navigate('/erp')}
                style={{
                  background: 'none', border: 'none', color: 'var(--p-muted)',
                  fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline',
                  padding: '8px', fontFamily: 'Inter, sans-serif',
                }}
              >
                Skip for now — go to dashboard
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes confettiDrop {
          from { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          to   { transform: translateY(80px) rotate(180deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
