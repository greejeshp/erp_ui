import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, BarChart3, Package, Users, CreditCard, Building2 } from 'lucide-react'
import '../landing.css'

const STEPS = [
  { label: 'Account', path: '/signup/account' },
  { label: 'Payment', path: '/signup/payment' },
  { label: 'Welcome', path: '/signup/welcome' },
  { label: 'Company', path: '/signup/company' },
  { label: 'Domain', path: '/signup/domain' },
]

const LEFT_MODULES = [
  { icon: <BarChart3 size={18} />, color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', title: 'MIS Reports', sub: 'Real-time analytics' },
  { icon: <Package size={18} />, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Inventory', sub: 'Multi-warehouse' },
  { icon: <Users size={18} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', title: 'HR & Payroll', sub: 'Automated payroll' },
  { icon: <CreditCard size={18} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: 'Accounting', sub: 'VAT/PAN compliant' },
  { icon: <Building2 size={18} />, color: '#f43f5e', bg: 'rgba(244,63,94,0.12)', title: 'Multi-Branch', sub: 'Central control' },
]

export function SignupLayout({ children, currentStep }) {
  const navigate = useNavigate()
  const location = useLocation()
  const stepIdx = STEPS.findIndex(s => s.path === location.pathname)

  return (
    <div className="signup-root" style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Right Panel */}
      <div className="signup-right" style={{ width: '100%', maxWidth: 640, padding: '40px 24px' }}>
        {/* Step Indicator */}
        <div className="step-indicator">
          {STEPS.map((step, i) => {
            const done = i < stepIdx
            const active = i === stepIdx
            return (
              <div className="step-item" key={i}>
                <div className="step-wrapper">
                  <div className={`step-circle ${done ? 'done' : active ? 'active' : ''}`}>
                    {done ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  <div className={`step-label ${done ? 'done' : active ? 'active' : ''}`}>{step.label}</div>
                </div>
                {i < STEPS.length - 1 && <div className={`step-connector ${done ? 'done' : ''}`} style={{ alignSelf: 'flex-start', marginTop: 15 }} />}
              </div>
            )
          })}
        </div>
        {children}
      </div>
    </div>
  )
}
