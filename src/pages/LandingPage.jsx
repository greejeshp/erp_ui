import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3, Package, Users, FileText, Building2,
  ShoppingCart, CheckCircle, ArrowRight, Star, Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../landing.css'

const FEATURES = [
  { icon: <BarChart3 size={22} />, color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)', title: 'MIS Reports', desc: 'Real-time dashboards, profit-loss statements, and custom analytics.' },
  { icon: <Package size={22} />, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Inventory', desc: 'Multi-warehouse stock management, batch tracking, and reorder alerts.' },
  { icon: <Users size={22} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', title: 'HR & Payroll', desc: 'Employee management, attendance, leave, and automated payroll.' },
  { icon: <FileText size={22} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: 'Sales & Invoicing', desc: 'GST/VAT-compliant invoicing, quotations, and receivables.' },
  { icon: <Building2 size={22} />, color: '#f43f5e', bg: 'rgba(244,63,94,0.12)', title: 'Multi-Branch', desc: 'Centralized control across branches, cities, and regions.' },
  { icon: <ShoppingCart size={22} />, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', title: 'Purchase & CRM', desc: 'Vendor management, purchase orders, and customer relationship tools.' },
]

const PRICING = [
  { name: 'Starter', price: '1,499', period: '/mo', desc: 'Perfect for small businesses', features: ['Up to 3 users', 'Invoicing & Ledger', 'Basic Reports', 'Email Support'], featured: false },
  { name: 'Growth', price: '2,999', period: '/mo', desc: 'Most popular for growing teams', features: ['Up to 15 users', 'All modules included', 'Advanced Analytics', 'Priority Support', 'Custom Domain'], featured: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large organizations', features: ['Unlimited users', 'White-labeling', 'API Access', 'Dedicated Manager', 'SLA guarantee'], featured: false },
]

const TESTIMONIALS = [
  { quote: '"PivotalERP transformed how we manage inventory across our 3 branches in Kathmandu. The reports are incredible."', name: 'Aarav Sharma', role: 'CEO, Sharma Traders', avatar: 'A', color: '#0ea5e9' },
  { quote: '"Setup was effortless. We were live within a day. The payroll module alone saved us 10 hours a month."', name: 'Priya Thapa', role: 'CFO, Thapa Enterprises', avatar: 'P', color: '#10b981' },
  { quote: '"The custom domain made our brand look professional. Clients trust us more seeing our own ERP login page."', name: 'Rohan KC', role: 'MD, KC Group', avatar: 'R', color: '#a78bfa' },
]

const MARQUEE_ITEMS = ['Sharma & Sons Ltd', 'Nepal Traders Co.', 'Himalaya Distributors', 'Everest Group', 'Kathmandu Retail', 'Pokhara Enterprises', 'Summit Holdings', 'Annapurna Trading']

export default function LandingPage() {
  const navigate = useNavigate()
  const [heroEmail, setHeroEmail] = useState('')

  const handleHeroSubmit = (e) => {
    e.preventDefault()
    if (heroEmail.trim()) {
      localStorage.setItem('pivotal_onboarding', JSON.stringify({ email: heroEmail }))
      navigate('/signup/account')
    }
  }

  return (
    <div className="landing-root">
      {/* Navbar */}
      <motion.nav 
        className="p-navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <a className="p-navbar-logo" href="#top">
          <div className="p-navbar-logo-icon">P</div>
          <span className="p-navbar-logo-text">Pivotal<span>ERP</span></span>
        </a>
        <div className="p-nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Reviews</a>
        </div>
        <div className="p-navbar-actions">
          <button className="p-btn-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="p-btn-primary" onClick={() => navigate('/signup/account')}>Start Free Trial</button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section id="top" className="p-hero" style={{ overflow: 'hidden', position: 'relative' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.45,
            pointerEvents: 'none'
          }}
        >
          <source src="./bg-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,15,26,0.2) 0%, rgba(8,15,26,0.85) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div className="p-orb p-orb-1" style={{ zIndex: 2 }} />
        <div className="p-orb p-orb-2" style={{ zIndex: 2 }} />
        <motion.div 
          className="p-hero-badge"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ zIndex: 3, position: 'relative' }}
        >
          <span />Nepal's #1 Cloud ERP Platform
        </motion.div>
        
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ zIndex: 3, position: 'relative' }}
        >
          Your Business,<br /><span className="gradient-text">Fully Managed.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ zIndex: 3, position: 'relative' }}
        >
          From invoicing to inventory, payroll to purchases — PivotalERP brings your entire business onto one powerful platform.
        </motion.p>

        <motion.form 
          className="p-hero-email-form" 
          onSubmit={handleHeroSubmit}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ zIndex: 3, position: 'relative' }}
        >
          <input
            type="email"
            placeholder="Enter your work email"
            value={heroEmail}
            onChange={e => setHeroEmail(e.target.value)}
            required
            id="hero-email-input"
          />
          <button type="submit" className="p-btn-primary" id="hero-cta-btn">
            Start Free Trial
          </button>
        </motion.form>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ 
            zIndex: 3, 
            position: 'relative', 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 16, 
            marginTop: 28 
          }}
        >
          {[
            { text: '14-day free trial' },
            { text: 'No payment required' },
            { text: 'Setup in 5 minutes' }
          ].map((item, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 100,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#94a3b8',
                backdropFilter: 'blur(4px)'
              }}
            >
              <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0 }} />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="p-marquee-wrap">
        <div className="p-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span className="p-marquee-item" key={i}>⬡ {item}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="p-section">
        <motion.div 
          className="p-section-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-section-label">Everything You Need</div>
          <h2 className="p-section-title">One Platform.<br />Every Business Function.</h2>
          <p className="p-section-sub">Powerful modules that work together seamlessly — built for Nepal's business landscape.</p>
        </motion.div>

        <motion.div 
          className="p-features-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div 
              className="p-feature-card" 
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-feature-icon" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="p-section" style={{ borderTop: '1px solid var(--p-border)' }}>
        <motion.div 
          className="p-section-header center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-section-label">Trusted by 500+ Businesses</div>
          <h2 className="p-section-title">What Our Customers Say</h2>
        </motion.div>

        <motion.div 
          className="p-testimonials"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              className="p-testimonial-card" 
              key={i}
              variants={{
                hidden: { y: 24, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="p-testimonial-quote">{t.quote}</p>
              <div className="p-testimonial-author">
                <div className="p-testimonial-avatar" style={{ background: `${t.color}22`, color: t.color }}>{t.avatar}</div>
                <div>
                  <div className="p-testimonial-name">{t.name}</div>
                  <div className="p-testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="p-section" style={{ borderTop: '1px solid var(--p-border)' }}>
        <motion.div 
          className="p-section-header center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-section-label">Simple Pricing</div>
          <h2 className="p-section-title">Transparent Plans in NPR</h2>
          <p className="p-section-sub">No hidden fees. Cancel anytime. VAT inclusive.</p>
        </motion.div>

        <motion.div 
          className="p-pricing-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {PRICING.map((plan, i) => (
            <motion.div 
              className={`p-pricing-card${plan.featured ? ' featured' : ''}`} 
              key={i}
              variants={{
                hidden: { y: 30, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--p-muted)', marginBottom: 8 }}>{plan.name}</div>
              <div className="p-price">
                {plan.price !== 'Custom' ? <><sup>NPR </sup>{plan.price}</> : 'Custom'}
                <sub>{plan.period}</sub>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--p-muted)', marginBottom: 0 }}>{plan.desc}</p>
              <ul className="p-pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j}><CheckCircle size={16} className="check" />{f}</li>
                ))}
              </ul>
              <button
                id={`pricing-btn-${plan.name.toLowerCase()}`}
                className={`p-btn-primary p-btn-full${plan.featured ? '' : ' p-btn-ghost'}`}
                style={!plan.featured ? { background: 'transparent', border: '1px solid var(--p-border)', color: 'var(--p-muted)' } : {}}
                onClick={() => navigate('/signup/account')}
              >
                {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'} <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="p-section" style={{ borderTop: '1px solid var(--p-border)', textAlign: 'center' }}>
        <motion.div 
          style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(16,185,129,0.08))', border: '1px solid var(--p-border)', borderRadius: 24, padding: '60px 40px', maxWidth: 720, margin: '0 auto' }}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Zap size={40} color="var(--p-primary)" style={{ marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.2rem', color: '#fff', marginBottom: 12 }}>Ready to get started?</h2>
          <p style={{ color: 'var(--p-muted)', marginBottom: 28 }}>Join 500+ businesses running smarter with PivotalERP.</p>
          <button id="bottom-cta-btn" className="p-btn-primary p-btn-lg" onClick={() => navigate('/signup/account')}>
            Start Your Free Trial Today <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="p-footer">
        <div className="p-footer-main">
          <div className="p-footer-brand">
            <div className="p-navbar-logo" style={{ marginBottom: 10 }}>
              <div className="p-navbar-logo-icon">P</div>
              <span className="p-navbar-logo-text">Pivotal<span>ERP</span></span>
            </div>
            <p>Nepal's most trusted cloud ERP solution for growing businesses.</p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'] },
          ].map((col, i) => (
            <div className="p-footer-links" key={i}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="p-footer-bottom">
          <p>© 2025 PivotalERP. All rights reserved. Made with ❤️ in Nepal.</p>
          <p>Adarshnagar, Birgunj, Province 2, Nepal</p>
        </div>
      </footer>
    </div>
  )
}
