import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Upload } from 'lucide-react'
import { SignupLayout } from '../SignupLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import '../../landing.css'

const INDUSTRIES = ['Trading', 'Manufacturing', 'Retail', 'Services', 'Construction', 'IT & Technology', 'Healthcare', 'Education', 'Hospitality', 'Other']
const BIZ_TYPES = ['Sole Proprietorship', 'Partnership', 'Pvt. Ltd.', 'Ltd.', 'NGO / INGOs', 'Government', 'Other']
const SIZES = ['1–10', '11–50', '51–200', '201–500', '500+']

export default function Step4_CompanySetup() {
  const navigate = useNavigate()
  const { data, update } = useOnboarding()
  const [form, setForm] = useState({
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
  const [errors, setErrors] = useState({})
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.companyName.trim()) e.companyName = 'Company name is required'
    if (!form.bizType) e.bizType = 'Select business type'
    if (!form.industry) e.industry = 'Select industry'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setLogoPreview(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (!validate()) return
    update({ ...form })
    navigate('/signup/domain')
  }

  const initial = form.companyName ? form.companyName[0].toUpperCase() : '?'

  return (
    <SignupLayout>
      <div className="p-form" style={{ maxWidth: 820, padding: '24px 8px' }}>
        <h2 className="p-form-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>Register Your Company</h2>
        <p className="p-form-sub" style={{ fontSize: '0.85rem', color: '#7e95ae', marginBottom: 28 }}>Tell us about your business — this powers your ERP profile.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 28, alignItems: 'start' }}>
          {/* Left: Input Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="p-field" style={{ marginBottom: 0 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Name *</label>
              <input 
                id="company-name"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                value={form.companyName} 
                onChange={e => set('companyName', e.target.value)} 
                placeholder="Sharma Traders Pvt. Ltd." 
              />
              {errors.companyName && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.companyName}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Business Type *</label>
                <select 
                  id="company-biz-type"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                  value={form.bizType} 
                  onChange={e => set('bizType', e.target.value)}
                >
                  <option value="" style={{ background: '#0f1d2e' }}>Select…</option>
                  {BIZ_TYPES.map(b => <option key={b} value={b} style={{ background: '#0f1d2e' }}>{b}</option>)}
                </select>
                {errors.bizType && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.bizType}</span>}
              </div>

              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Industry *</label>
                <select 
                  id="company-industry"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                  value={form.industry} 
                  onChange={e => set('industry', e.target.value)}
                >
                  <option value="" style={{ background: '#0f1d2e' }}>Select…</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind} style={{ background: '#0f1d2e' }}>{ind}</option>)}
                </select>
                {errors.industry && <span className="p-field-error" style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 4, display: 'block' }}>{errors.industry}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>PAN / VAT Number</label>
                <input 
                  id="company-pan"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                  value={form.pan} 
                  onChange={e => set('pan', e.target.value)} 
                  placeholder="123456789" 
                />
              </div>

              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Size</label>
                <select 
                  id="company-size"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none', height: 42 }}
                  value={form.size} 
                  onChange={e => set('size', e.target.value)}
                >
                  <option value="" style={{ background: '#0f1d2e' }}>Employees</option>
                  {SIZES.map(s => <option key={s} value={s} style={{ background: '#0f1d2e' }}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>City</label>
                <input 
                  id="company-city"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                  value={form.city} 
                  onChange={e => set('city', e.target.value)} 
                  placeholder="Kathmandu" 
                />
              </div>

              <div className="p-field" style={{ marginBottom: 0 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Website</label>
                <input 
                  id="company-website"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                  value={form.website} 
                  onChange={e => set('website', e.target.value)} 
                  placeholder="www.company.com" 
                />
              </div>
            </div>

            <div className="p-field" style={{ marginBottom: 0 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Address</label>
              <input 
                id="company-address"
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.875rem', outline: 'none' }}
                value={form.address} 
                onChange={e => set('address', e.target.value)} 
                placeholder="Street, Ward, Department" 
              />
            </div>
          </div>

          {/* Right: Logo Upload & Live Preview Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 130 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(14,165,233,0.3)' }}>
                {logoPreview ? <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : initial}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.companyName || 'My Company'}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>{form.industry || 'Industry'} · {form.city || 'City'}</div>
            </div>

            <label htmlFor="logo-upload" className="logo-upload-zone" style={{ cursor: 'pointer', padding: '16px 12px', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, textAlign: 'center', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Upload size={20} style={{ color: '#0ea5e9' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
              <span style={{ fontSize: '0.62rem', color: '#64748b' }}>.PNG, .SVG, .JPG</span>
              <input id="logo-upload" type="file" accept="image/*" hidden onChange={handleLogoChange} />
            </label>
          </div>
        </div>

        <div className="p-form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          <button className="p-btn-back" onClick={() => navigate('/signup/welcome')} style={{ height: 42 }}>← Back</button>
          <button id="company-next-btn" className="p-btn-primary" style={{ padding: '0 24px', height: 42, borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }} onClick={handleNext}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </SignupLayout>
  )
}
