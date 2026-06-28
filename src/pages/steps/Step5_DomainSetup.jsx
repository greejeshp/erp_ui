import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Globe, Rocket } from 'lucide-react'
import { SignupLayout } from '../SignupLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import '../../landing.css'

const PROVISION_STEPS = [
  'Registering subdomain…',
  'Configuring SSL certificate…',
  'Spinning up your workspace…',
  'Loading your modules…',
  'Almost ready…',
]

export default function Step5_DomainSetup() {
  const navigate = useNavigate()
  const { data, update, saveCompany } = useOnboarding()
  const [subdomain, setSubdomain] = useState(
    data.subdomain || (data.companyName ? data.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : '')
  )
  const [launching, setLaunching] = useState(false)
  const [provStep, setProvStep] = useState(0)
  const [done, setDone] = useState(false)

  const cleanSub = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-|-$/g, '') || 'mycompany'

  const handleLaunch = () => {
    if (!cleanSub) return
    setLaunching(true)
    update({ subdomain: cleanSub })
    PROVISION_STEPS.forEach((_, i) => {
      setTimeout(() => setProvStep(i), i * 700)
    })
    setTimeout(() => {
      // Save this company to the companies list
      saveCompany({
        companyName: data.companyName,
        bizType:     data.bizType,
        industry:    data.industry,
        pan:         data.pan,
        address:     data.address,
        city:        data.city,
        size:        data.size,
        website:     data.website,
        subdomain:   cleanSub,
      })
      setDone(true)
      setTimeout(() => navigate(`/login/workspace/${cleanSub}`), 1200)
    }, PROVISION_STEPS.length * 700 + 400)
  }

  return (
    <SignupLayout>
      <div className="p-form">
        <h2 className="p-form-title">Choose Your Domain</h2>
        <p className="p-form-sub">Your ERP will be available at your own branded URL.</p>

        <div className="domain-builder">
          <div className="domain-builder-label">Your custom ERP URL</div>
          <div className="domain-input-row">
            <input
              id="domain-prefix-input"
              className="domain-prefix-input"
              value={subdomain}
              onChange={e => setSubdomain(e.target.value)}
              placeholder="mycompany"
              maxLength={32}
              disabled={launching}
            />
            <div className="domain-suffix">.pivotalerp.app</div>
          </div>
          <div className="domain-preview">
            <Globe size={14} color="var(--p-primary)" />
            <span className="domain-preview-url">{cleanSub}.pivotalerp.app</span>
          </div>
          <div className="domain-avail-badge">
            <CheckCircle size={12} /> Available
          </div>
        </div>

        <div style={{ background: 'var(--p-card)', border: '1px solid var(--p-border)', borderRadius: 12, padding: '16px 18px', marginBottom: 24 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--p-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>What you get</div>
          {[
            '🌐  Branded login page for your team',
            '🔒  Free SSL — always secure (HTTPS)',
            '📧  Custom email notifications from your domain',
            '🎨  Company logo and colours on login',
          ].map((item, i) => (
            <div key={i} style={{ fontSize: '0.875rem', color: 'var(--p-muted)', marginBottom: 8 }}>{item}</div>
          ))}
        </div>

        {launching ? (
          <div className="provision-loader">
            {!done ? (
              <>
                <div className="spin" />
                {PROVISION_STEPS.map((step, i) => (
                  i <= provStep && (
                    <div className="provision-step" key={i}>
                      <CheckCircle size={14} color={i < provStep ? 'var(--p-accent)' : 'var(--p-primary)'} />
                      <span style={{ color: i < provStep ? 'var(--p-accent)' : 'var(--p-text)' }}>{step}</span>
                    </div>
                  )
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div className="p-confetti-burst" style={{ fontSize: '3rem' }}>🚀</div>
                <div style={{ color: 'var(--p-accent)', fontWeight: 700, marginTop: 8 }}>
                  {cleanSub}.pivotalerp.app is live!
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              id="launch-erp-btn"
              className="p-btn-primary p-btn-full"
              onClick={handleLaunch}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Rocket size={18} /> Launch My ERP
            </button>
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
              <button className="p-btn-back" onClick={() => navigate('/signup/company')}>← Back</button>
            </div>
          </>
        )}
      </div>
    </SignupLayout>
  )
}
