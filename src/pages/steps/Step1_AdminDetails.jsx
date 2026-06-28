import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, CheckCircle, Globe, Rocket, Upload, Check, User, Building2, Server } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import '../../landing.css'

function getStrength(pwd) {
  let s = 0
  if (pwd.length >= 8) s++
  if (/[A-Z]/.test(pwd)) s++
  if (/[0-9]/.test(pwd)) s++
  if (/[^A-Za-z0-9]/.test(pwd)) s++
  return s
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_CLASS = ['', 'w', 'f', 'g', 's']

const INDUSTRIES = ['Trading', 'Manufacturing', 'Retail', 'Services', 'Construction', 'IT & Technology', 'Healthcare', 'Education', 'Hospitality', 'Other']
const BIZ_TYPES = ['Sole Proprietorship', 'Partnership', 'Pvt. Ltd.', 'Ltd.', 'NGO / INGOs', 'Government', 'Other']
const SIZES = ['1–10', '11–50', '51–200', '201–500', '500+']

const PROVISION_STEPS = [
  'Registering subdomain…',
  'Configuring SSL certificate…',
  'Spinning up your workspace…',
  'Loading your modules…',
  'Almost ready…',
]

export default function Step1_AdminDetails() {
  const navigate = useNavigate()
  const { data, update, saveCompany } = useOnboarding()

  // Wizard active sub-step: 0 (Account info), 1 (Company info), 2 (Domain info)
  const [activeStep, setActiveStep] = useState(0)

  // Sub-step 0 Form
  const [accountForm, setAccountForm] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    password: '',
    confirm: '',
  })
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const strength = getStrength(accountForm.password)

  // Sub-step 1 Form
  const [companyForm, setCompanyForm] = useState({
    companyName: data.companyName || '',
    bizType: data.bizType || '',
    industry: data.industry || '',
    pan: data.pan || '',
    address: data.address || '',
    city: data.city || '',
    size: data.size || '',
    website: data.website || '',
  })
  const [logoPreview, setLogoPreview] = useState(null)

  // Sub-step 2 Form
  const [subdomain, setSubdomain] = useState('')
  const [launching, setLaunching] = useState(false)
  const [provStep, setProvStep] = useState(0)
  const [done, setDone] = useState(false)

  const [errors, setErrors] = useState({})

  const cleanSub = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-|-$/g, '') || 'mycompany'

  const setAcc = (k, v) => setAccountForm(f => ({ ...f, [k]: v }))
  const setCo = (k, v) => {
    setCompanyForm(f => {
      const next = { ...f, [k]: v };
      if (k === 'companyName' && !subdomain) {
        const generated = v.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        setSubdomain(generated);
      }
      return next;
    });
  }

  const validateAccount = () => {
    const e = {}
    if (!accountForm.firstName.trim()) e.firstName = 'First name is required'
    if (!accountForm.lastName.trim()) e.lastName = 'Last name is required'
    if (!accountForm.email.includes('@')) e.email = 'Valid email is required'
    if (!accountForm.phone.trim()) e.phone = 'Phone is required'
    if (accountForm.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (accountForm.password !== accountForm.confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateCompany = () => {
    const e = {}
    if (!companyForm.companyName.trim()) e.companyName = 'Company name is required'
    if (!companyForm.bizType) e.bizType = 'Select business type'
    if (!companyForm.industry) e.industry = 'Select industry'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNextAccount = () => {
    if (!validateAccount()) return
    setErrors({})
    update({
      firstName: accountForm.firstName,
      lastName: accountForm.lastName,
      email: accountForm.email,
      phone: accountForm.phone,
      companyName: '', // empty to trigger company setup
      subdomain: '', // empty to trigger domain setup
      showSetupModal: true, // flag to open the setup popup on dashboard
    })
    navigate('/erp')
  }

  const handleNextCompany = () => {
    if (!validateCompany()) return
    setErrors({})
    setActiveStep(2)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setLogoPreview(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleLaunch = () => {
    if (!cleanSub) return
    setLaunching(true)
    
    // Save state to context
    const updatedData = {
      firstName: accountForm.firstName,
      lastName: accountForm.lastName,
      email: accountForm.email,
      phone: accountForm.phone,
      ...companyForm,
      subdomain: cleanSub,
      plan: 'Free Trial',
    }
    update(updatedData)

    PROVISION_STEPS.forEach((_, i) => {
      setTimeout(() => setProvStep(i), i * 600)
    })

    setTimeout(() => {
      saveCompany(updatedData)
      setDone(true)
      setTimeout(() => navigate('/login'), 1200)
    }, PROVISION_STEPS.length * 600 + 400)
  }

  const initialLetter = companyForm.companyName ? companyForm.companyName[0].toUpperCase() : '?'

  return (
    <div className="signup-root" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--p-bg)', padding: '40px 20px' }}>
      <div className="signup-right" style={{ width: '100%', maxWidth: 820, minHeight: 'unset', height: 'auto', padding: '40px 32px', background: 'var(--p-surface)', borderRadius: 20, border: '1px solid var(--p-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        
        {/* Header Branding */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--p-primary), var(--p-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 900, color: '#fff', fontSize: '1rem' }}>P</div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>Pivotal<span style={{ color: 'var(--p-primary)' }}>ERP</span></span>
        </div>

        {/* Steps Tab Bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, borderBottom: '1px solid var(--p-border)', paddingBottom: 16 }}>
          {[
            { label: 'Administrator', icon: <User size={16} /> },
            { label: 'Company Profile', icon: <Building2 size={16} /> },
            { label: 'Workspace URL', icon: <Server size={16} /> },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600,
                color: activeStep === i ? '#fff' : 'var(--p-muted)',
                background: activeStep === i ? 'rgba(14,165,233,0.15)' : 'transparent',
                border: activeStep === i ? '1px solid var(--p-primary)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {step.icon}
              <span>{step.label}</span>
              {activeStep > i && <Check size={14} color="var(--p-accent)" />}
            </div>
          ))}
        </div>

        {/* Step 1: Admin Details */}
        {activeStep === 0 && (
          <div className="p-form" style={{ maxWidth: '100%' }}>
            <h2 className="p-form-title">Create your admin account</h2>
            <p className="p-form-sub">Enter your credentials to manage your ERP workspace.</p>

            <div className="p-form-row">
              <div className="p-field">
                <label>First Name</label>
                <input id="signup-first-name" value={accountForm.firstName} onChange={e => setAcc('firstName', e.target.value)} placeholder="Aarav" />
                {errors.firstName && <span className="p-field-error">{errors.firstName}</span>}
              </div>
              <div className="p-field">
                <label>Last Name</label>
                <input id="signup-last-name" value={accountForm.lastName} onChange={e => setAcc('lastName', e.target.value)} placeholder="Sharma" />
                {errors.lastName && <span className="p-field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="p-form-row">
              <div className="p-field">
                <label>Work Email</label>
                <input id="signup-email" type="email" value={accountForm.email} onChange={e => setAcc('email', e.target.value)} placeholder="you@company.com" />
                {errors.email && <span className="p-field-error">{errors.email}</span>}
              </div>
              <div className="p-field">
                <label>Phone Number</label>
                <input id="signup-phone" value={accountForm.phone} onChange={e => setAcc('phone', e.target.value)} placeholder="+977 98XXXXXXXX" />
                {errors.phone && <span className="p-field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="p-form-row">
              <div className="p-field">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="signup-password"
                    type={showPwd ? 'text' : 'password'}
                    value={accountForm.password}
                    onChange={e => setAcc('password', e.target.value)}
                    placeholder="Min. 8 characters"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--p-muted)', cursor: 'pointer', display: 'flex' }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {accountForm.password && (
                  <>
                    <div className="p-strength-bar">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`p-strength-seg ${strength >= i ? STRENGTH_CLASS[strength] : ''}`} />
                      ))}
                    </div>
                    <div className="p-strength-label">{STRENGTH_LABELS[strength]}</div>
                  </>
                )}
                {errors.password && <span className="p-field-error">{errors.password}</span>}
              </div>

              <div className="p-field">
                <label>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="signup-confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={accountForm.confirm}
                    onChange={e => setAcc('confirm', e.target.value)}
                    placeholder="Repeat password"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--p-muted)', cursor: 'pointer', display: 'flex' }}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <span className="p-field-error">{errors.confirm}</span>}
              </div>
            </div>

            <button id="signup-next-btn" className="p-btn-primary p-btn-full" onClick={handleNextAccount} style={{ marginTop: 16 }}>
              Continue Setup <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Company Setup */}
        {activeStep === 1 && (
          <div className="p-form" style={{ maxWidth: '100%' }}>
            <h2 className="p-form-title">Register your company</h2>
            <p className="p-form-sub">Tell us about your business to configure your ledger profiles.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 20, alignItems: 'start' }}>
              <div>
                <div className="p-field">
                  <label>Company Name *</label>
                  <input id="company-name" value={companyForm.companyName} onChange={e => setCo('companyName', e.target.value)} placeholder="Sharma Traders Pvt. Ltd." />
                  {errors.companyName && <span className="p-field-error">{errors.companyName}</span>}
                </div>

                <div className="p-form-row">
                  <div className="p-field">
                    <label>Business Type *</label>
                    <select id="company-biz-type" value={companyForm.bizType} onChange={e => setCo('bizType', e.target.value)}>
                      <option value="">Select…</option>
                      {BIZ_TYPES.map(b => <option key={b}>{b}</option>)}
                    </select>
                    {errors.bizType && <span className="p-field-error">{errors.bizType}</span>}
                  </div>
                  <div className="p-field">
                    <label>Industry *</label>
                    <select id="company-industry" value={companyForm.industry} onChange={e => setCo('industry', e.target.value)}>
                      <option value="">Select…</option>
                      {INDUSTRIES.map(ind => <option key={ind}>{ind}</option>)}
                    </select>
                    {errors.industry && <span className="p-field-error">{errors.industry}</span>}
                  </div>
                </div>

                <div className="p-form-row">
                  <div className="p-field">
                    <label>PAN / VAT Number</label>
                    <input id="company-pan" value={companyForm.pan} onChange={e => setCo('pan', e.target.value)} placeholder="123456789" />
                  </div>
                  <div className="p-field">
                    <label>Company Size</label>
                    <select id="company-size" value={companyForm.size} onChange={e => setCo('size', e.target.value)}>
                      <option value="">Employees</option>
                      {SIZES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="p-form-row">
                  <div className="p-field">
                    <label>City</label>
                    <input id="company-city" value={companyForm.city} onChange={e => setCo('city', e.target.value)} placeholder="Kathmandu" />
                  </div>
                  <div className="p-field">
                    <label>Website</label>
                    <input id="company-website" value={companyForm.website} onChange={e => setCo('website', e.target.value)} placeholder="www.company.com" />
                  </div>
                </div>

                <div className="p-field">
                  <label>Address</label>
                  <input id="company-address" value={companyForm.address} onChange={e => setCo('address', e.target.value)} placeholder="Street, Ward, City" />
                </div>
              </div>

              {/* Logo Upload & Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label htmlFor="logo-upload" className="logo-upload-zone" style={{ cursor: 'pointer', padding: '16px', border: '2px dashed var(--p-border)', borderRadius: 12, textAlign: 'center', background: 'var(--p-card)' }}>
                  <Upload size={20} color="var(--p-muted)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '0.75rem', margin: 0 }}>Upload Logo</p>
                  <input id="logo-upload" type="file" accept="image/*" hidden onChange={handleLogoChange} />
                </label>

                <div className="company-preview-card" style={{ background: 'var(--p-card)', border: '1px solid var(--p-border)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                  <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--p-muted)', margin: '0 0 8px' }}>Preview</h4>
                  <div className="company-preview-avatar" style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--p-primary), var(--p-accent))', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    {logoPreview ? <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : initialLetter}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{companyForm.companyName || 'My Company'}</div>
                </div>
              </div>
            </div>

            <div className="p-form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
              <button className="p-btn-back" onClick={() => setActiveStep(0)}>← Back</button>
              <button id="company-next-btn" className="p-btn-primary" onClick={handleNextCompany}>
                Configure URL <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Domain Setup & Provisioning */}
        {activeStep === 2 && (
          <div className="p-form" style={{ maxWidth: '100%' }}>
            <h2 className="p-form-title">Choose your workspace URL</h2>
            <p className="p-form-sub">Your ERP platform will be hosted securely on this subdomain.</p>

            <div className="domain-builder">
              <div className="domain-builder-label">Custom Subdomain</div>
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
              <div className="domain-preview" style={{ marginTop: 12 }}>
                <Globe size={14} color="var(--p-primary)" />
                <span className="domain-preview-url" style={{ fontWeight: 700, color: 'var(--p-primary)', marginLeft: 6 }}>{cleanSub}.pivotalerp.app</span>
              </div>
              <div className="domain-avail-badge" style={{ marginTop: 8 }}>
                <CheckCircle size={12} /> Domain Available
              </div>
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
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div className="p-confetti-burst" style={{ fontSize: '3rem' }}>🚀</div>
                    <div style={{ color: 'var(--p-accent)', fontWeight: 700, marginTop: 8, fontSize: '1.1rem' }}>
                      {cleanSub}.pivotalerp.app is live!
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button className="p-btn-back" onClick={() => setActiveStep(1)}>← Back</button>
                <button
                  id="launch-erp-btn"
                  className="p-btn-primary"
                  onClick={handleLaunch}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Rocket size={16} /> Complete Setup &amp; Launch
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
