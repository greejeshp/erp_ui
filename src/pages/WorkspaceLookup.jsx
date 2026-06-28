import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';
import { ArrowRight, Globe } from 'lucide-react';
import '../landing.css';

export default function WorkspaceLookup() {
  const navigate = useNavigate();
  const { data, update, companies } = useOnboarding();
  const [subdomainInput, setSubdomainInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSub = subdomainInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    
    if (!cleanSub) {
      setError('Please enter your workspace subdomain.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    // Look up the company in the created companies list
    const found = companies.find(c => c.subdomain === cleanSub);
    if (found) {
      setTimeout(() => {
        setLoading(false);
        // Set this company as active and update onboarding context
        update({
          ...found,
          subdomain: found.subdomain,
          companyName: found.companyName,
        });
        navigate('/erp');
      }, 1200);
    } else {
      setLoading(false);
      setError('Workspace not found. Check the subdomain or start a free trial.');
    }
  };

  return (
    <div className="login-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 20 }}>
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: '#0f1d2e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 32,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        color: '#f0f6ff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(14,165,233,0.3)'
          }}>
            <Globe size={24} color="#fff" />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem', margin: '0 0 8px' }}>Sign In to ERP</h2>
        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#7e95ae', margin: '0 0 24px' }}>
          Enter your workspace subdomain and account credentials.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="p-field" style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>ERP Subdomain</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0 14px' }}>
              <input
                id="lookup-subdomain"
                type="text"
                value={subdomainInput}
                onChange={e => setSubdomainInput(e.target.value)}
                placeholder="my-company"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.875rem',
                  padding: '10px 0',
                }}
                required
                autoFocus
              />
              <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500, paddingLeft: 8 }}>.pivotalerp.app</span>
            </div>
          </div>

          <div className="p-field" style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Email Address</label>
            <input
              id="lookup-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              required
            />
          </div>

          <div className="p-field" style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Password</label>
            <input
              id="lookup-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.875rem',
                outline: 'none',
              }}
              required
            />
          </div>

          {error && <div style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: 16 }}>{error}</div>}

          <button
            id="lookup-submit-btn"
            type="submit"
            className="p-btn-primary p-btn-full"
            style={{ height: 42, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#7e95ae', margin: 0 }}>
            Don't have a workspace?{' '}
            <a href="#" onClick={e => { e.preventDefault(); navigate('/signup/account'); }} style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 }}>Start Free Trial</a>
          </p>
        </div>
      </div>
    </div>
  );
}
