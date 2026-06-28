import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarChart3, TrendingUp, Users, Star, Zap } from 'lucide-react'
import { useOnboarding } from '../context/OnboardingContext'
import '../landing.css'

const SLIDES = [
  {
    id: 'inventory',
    icon: <BarChart3 size={48} color="#0ea5e9" />,
    title: 'Real-Time Analytics',
    body: 'See every sale, purchase, and expense as it happens. Make faster decisions with live dashboards.',
    stats: [
      { num: '99.9%', lbl: 'Uptime SLA' },
      { num: '3x', lbl: 'Faster Reports' },
      { num: '500+', lbl: 'Businesses' },
      { num: '24/7', lbl: 'Support' },
    ],
  },
  {
    id: 'blog',
    icon: <TrendingUp size={48} color="#10b981" />,
    title: '5 Ways ERP Boosts Productivity',
    body: '"Teams using integrated ERP see 40% fewer manual errors and save 12+ hours every week on data entry alone." — PivotalERP Blog',
    stats: [
      { num: '40%', lbl: 'Fewer Errors' },
      { num: '12h', lbl: 'Saved / Week' },
      { num: '2x', lbl: 'Growth Rate' },
      { num: '98%', lbl: 'Satisfaction' },
    ],
  },
  {
    id: 'trust',
    icon: <Star size={48} color="#f59e0b" fill="#f59e0b" />,
    title: 'Trusted Across Nepal',
    body: 'From Birgunj wholesalers to Kathmandu retailers — PivotalERP powers businesses in every province.',
    stats: [
      { num: '7', lbl: 'Provinces' },
      { num: '500+', lbl: 'Companies' },
      { num: 'NPR 2B+', lbl: 'Processed' },
      { num: '4.9★', lbl: 'Rating' },
    ],
  },
  {
    id: 'feature',
    icon: <Zap size={48} color="#a78bfa" />,
    title: '✨ New: AI-Powered Reports',
    body: 'Our latest release brings intelligent report summaries, anomaly detection, and predictive restocking alerts.',
    stats: [
      { num: 'NEW', lbl: 'Feature' },
      { num: 'AI', lbl: 'Powered' },
      { num: '0 min', lbl: 'Setup' },
      { num: 'Free', lbl: 'Upgrade' },
    ],
  },
]

const SLIDE_DURATION = 5000

export default function CustomDomainLogin() {
  const navigate = useNavigate()
  const { subdomain: routeSubdomain } = useParams()
  const { data, companies } = useOnboarding()
  const [slideIdx, setSlideIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [email, setEmail] = useState(data.email || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const intervalRef = useRef(null)
  const progressRef = useRef(null)

  // Find company matching the URL subdomain parameter
  const matchedCompany = companies.find(c => c.subdomain === routeSubdomain)
  const companyName = matchedCompany ? matchedCompany.companyName : (data.companyName || 'PivotalERP')
  const subdomain = routeSubdomain || data.subdomain || 'demo'
  const initial = companyName[0]?.toUpperCase() || 'P'

  // Auto-advance slider
  useEffect(() => {
    let start = Date.now()

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100))
    }, 50)

    intervalRef.current = setTimeout(() => {
      setSlideIdx(s => (s + 1) % SLIDES.length)
      setProgress(0)
      start = Date.now()
    }, SLIDE_DURATION)

    return () => {
      clearInterval(progressRef.current)
      clearTimeout(intervalRef.current)
    }
  }, [slideIdx])

  const goToSlide = (i) => {
    setSlideIdx(i)
    setProgress(0)
    clearTimeout(intervalRef.current)
    clearInterval(progressRef.current)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please enter email and password.'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      navigate('/erp')
    }, 1500)
  }

  const slide = SLIDES[slideIdx]

  return (
    <div className="login-root">
      {/* Left: Sliding Content Panel */}
      <div className="login-left">
        {/* Progress bar */}
        <div className="login-progress" style={{ width: `${progress}%` }} />

        <div className="login-slide" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 48px' }}>
          <div style={{ transition: 'opacity 0.4s, transform 0.4s', textAlign: 'center', width: '100%', maxWidth: 380 }}>
            <div style={{ marginBottom: 20 }}>{slide.icon}</div>
            <div className="login-slide-title">{slide.title}</div>
            <div className="login-slide-body">{slide.body}</div>
            <div className="login-stat-grid" style={{ margin: '24px auto', maxWidth: 280 }}>
              {slide.stats.map((s, i) => (
                <div className="login-stat-card" key={i}>
                  <div className="login-stat-num">{s.num}</div>
                  <div className="login-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="login-slide-dots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`login-dot${slideIdx === i ? ' active' : ''}`}
              onClick={() => goToSlide(i)}
              id={`slide-dot-${i}`}
            />
          ))}
        </div>

        {/* Company watermark */}
        <div className="login-slide-watermark">{companyName} · {subdomain}.pivotalerp.app</div>

        {/* Decorative gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,165,233,0.05) 0%, rgba(16,185,129,0.05) 100%)', pointerEvents: 'none' }} />
      </div>

      {/* Right: Login Form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <div className="login-company-header">
            <div
              className="login-company-logo"
              style={{ background: 'linear-gradient(135deg, var(--p-primary), var(--p-accent))' }}
            >
              {initial}
            </div>
            <div>
              <div className="login-company-name">{companyName}</div>
              <div className="login-company-domain">{subdomain}.pivotalerp.app</div>
            </div>
          </div>

          <h2>Welcome back</h2>
          <p className="login-sub">Sign in to your ERP workspace</p>

          <form onSubmit={handleLogin}>
            <div className="p-field">
              <label>Email Address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div className="p-field">
              <label>Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
              />
            </div>

            <div className="login-extra">
              <label className="login-remember">
                <input type="checkbox" id="login-remember-me" />
                Remember me
              </label>
              <a href="#" className="login-forgot" id="login-forgot-link">Forgot password?</a>
            </div>

            {error && <div style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: 12 }}>{error}</div>}

            <button
              id="login-submit-btn"
              type="submit"
              className="p-btn-primary p-btn-full"
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Signing in…
                </span>
              ) : 'Sign In to ERP'}
            </button>
          </form>

          <div style={{ margin: '20px 0', borderTop: '1px solid var(--p-border)', paddingTop: 20 }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--p-muted)', textAlign: 'center' }}>
              Don't have an account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); navigate('/signup/account') }} style={{ color: 'var(--p-primary)', textDecoration: 'none' }}>Start Free Trial</a>
            </p>
          </div>

          <div className="login-powered">
            Powered by <a href="#" onClick={e => { e.preventDefault(); navigate('/') }}>PivotalERP</a>
          </div>
        </div>
      </div>
    </div>
  )
}
