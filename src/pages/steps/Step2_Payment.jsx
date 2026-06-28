import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Smartphone, CreditCard, QrCode } from 'lucide-react'
import { SignupLayout } from '../SignupLayout'
import { useOnboarding } from '../../context/OnboardingContext'
import '../../landing.css'

const PLANS = {
  starter: { name: 'Starter', price: '1,499', priceNum: 1499 },
  growth: { name: 'Growth', price: '2,999', priceNum: 2999 },
}

const METHODS = [
  { id: 'connectips', label: 'Connect IPS', sub: 'Bank QR Payment', color: '#1B6CA8', bg: 'rgba(27,108,168,0.15)', icon: '🏦' },
  { id: 'khalti', label: 'Khalti', sub: 'Digital Wallet', color: '#5C2D91', bg: 'rgba(92,45,145,0.15)', icon: '🟣' },
  { id: 'esewa', label: 'eSewa', sub: 'Mobile Wallet', color: '#60BB46', bg: 'rgba(96,187,70,0.15)', icon: '🟢' },
  { id: 'card', label: 'Card', sub: 'Debit / Credit', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: <CreditCard size={20} /> },
]

export default function Step2_Payment() {
  const navigate = useNavigate()
  const { data, update } = useOnboarding()
  const [method, setMethod] = useState('growth')
  const [payMethod, setPayMethod] = useState('connectips')
  const [processing, setProcessing] = useState(false)
  const [paid, setPaid] = useState(false)
  const [cardForm, setCardForm] = useState({ num: '', expiry: '', cvv: '', name: '' })
  const [walletNum, setWalletNum] = useState('')
  const plan = PLANS[method] || PLANS.growth

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setPaid(true)
      update({ plan: plan.name, paymentMethod: payMethod })
      setTimeout(() => navigate('/signup/welcome'), 1600)
    }, 2000)
  }

  const formatCard = (v) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5)

  return (
    <SignupLayout>
      <div className="p-form">
        <h2 className="p-form-title">Choose Your Plan</h2>
        <p className="p-form-sub">Select a plan and complete payment to activate your ERP.</p>

        {/* Plan Toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {Object.entries(PLANS).map(([key, p]) => (
            <button
              key={key}
              id={`plan-btn-${key}`}
              onClick={() => setMethod(key)}
              style={{
                flex: 1, padding: '10px 14px', border: '2px solid', borderRadius: 10, cursor: 'pointer',
                borderColor: method === key ? 'var(--p-primary)' : 'var(--p-border)',
                background: method === key ? 'rgba(14,165,233,0.08)' : 'var(--p-card)',
                color: method === key ? 'var(--p-primary)' : 'var(--p-muted)',
                fontWeight: 700, fontSize: '0.875rem', transition: 'all 0.2s',
              }}
            >
              {p.name} — NPR {p.price}/mo
            </button>
          ))}
        </div>

        {/* Plan Summary */}
        <div className="p-plan-summary">
          <h4>Order Summary</h4>
          <div className="p-plan-row"><span>Plan</span><span style={{ color: 'var(--p-text)' }}>{plan.name}</span></div>
          <div className="p-plan-row"><span>Billing</span><span>Monthly</span></div>
          <div className="p-plan-row"><span>VAT (13%)</span><span>NPR {Math.round(plan.priceNum * 0.13).toLocaleString()}</span></div>
          <div className="p-plan-row total"><span>Total</span><span style={{ color: 'var(--p-primary)' }}>NPR {Math.round(plan.priceNum * 1.13).toLocaleString()}/mo</span></div>
        </div>

        {/* Payment Methods */}
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--p-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Payment Method</div>
        <div className="p-pay-methods">
          {METHODS.map(m => (
            <button
              key={m.id}
              id={`pay-method-${m.id}`}
              className={`p-pay-method-btn${payMethod === m.id ? ' selected' : ''}`}
              onClick={() => setPayMethod(m.id)}
            >
              <div className="p-pay-logo" style={{ background: m.bg, color: m.color, fontSize: '1.2rem' }}>
                {typeof m.icon === 'string' ? m.icon : m.icon}
              </div>
              <div className="method-name">{m.label}</div>
              <div className="method-sub">{m.sub}</div>
            </button>
          ))}
        </div>

        {/* Method-specific input */}
        {payMethod === 'connectips' && (
          <div className="p-qr-box">
            <div className="p-qr-code">▉▉▉<br />█ ▉ █<br />▉▉▉</div>
            <div className="p-qr-label">Scan with your bank's Connect IPS app<br /><strong>NPR {Math.round(plan.priceNum * 1.13).toLocaleString()}</strong></div>
          </div>
        )}

        {(payMethod === 'khalti' || payMethod === 'esewa') && (
          <div className="p-field">
            <label>{payMethod === 'khalti' ? 'Khalti' : 'eSewa'} Registered Mobile</label>
            <input
              id={`${payMethod}-mobile`}
              placeholder="98XXXXXXXX"
              value={walletNum}
              onChange={e => setWalletNum(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>
        )}

        {payMethod === 'card' && (
          <div>
            <div className="p-field">
              <label>Card Number</label>
              <input id="card-number" value={cardForm.num} onChange={e => setCardForm(f => ({ ...f, num: formatCard(e.target.value) }))} placeholder="4242 4242 4242 4242" maxLength={19} />
            </div>
            <div className="p-form-row">
              <div className="p-field">
                <label>Expiry</label>
                <input id="card-expiry" value={cardForm.expiry} onChange={e => setCardForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))} placeholder="MM/YY" maxLength={5} />
              </div>
              <div className="p-field">
                <label>CVV</label>
                <input id="card-cvv" value={cardForm.cvv} onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="123" maxLength={4} />
              </div>
            </div>
            <div className="p-field">
              <label>Cardholder Name</label>
              <input id="card-name" value={cardForm.name} onChange={e => setCardForm(f => ({ ...f, name: e.target.value }))} placeholder="As on card" />
            </div>
          </div>
        )}

        {paid ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="p-confetti-burst">🎉✨🎊</div>
            <div style={{ color: 'var(--p-accent)', fontWeight: 700, marginTop: 8 }}>Payment Successful!</div>
          </div>
        ) : (
          <button
            id="pay-now-btn"
            className="p-btn-primary p-btn-full"
            onClick={handlePay}
            disabled={processing}
            style={{ marginTop: 4 }}
          >
            {processing ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Processing…
              </span>
            ) : (
              <>Pay NPR {Math.round(plan.priceNum * 1.13).toLocaleString()} <ArrowRight size={18} /></>
            )}
          </button>
        )}

        <button id="pay-skip-btn" className="p-pay-skip" onClick={() => { update({ plan: 'Free Trial' }); navigate('/signup/welcome') }}>
          Skip for now — Start Free Trial
        </button>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 20 }}>
          <button className="p-btn-back" onClick={() => navigate('/signup/account')}>← Back</button>
        </div>
      </div>
    </SignupLayout>
  )
}
