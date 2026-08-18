'use client'

import { useState } from 'react'

// EDIT THIS LIST — it's what coaches see when they tap Premium
const FEATURES = [
  {
    title: 'The full drill library',
    detail: 'Every drill, not just the starter set. Filter by age, skill, and equipment on hand.',
  },
  {
    title: 'Build practice plans',
    detail: 'Drag drills into a timed plan. Save it, reuse it, tweak it next week.',
  },
  {
    title: 'Print and share',
    detail: 'Send the plan to your assistant coaches or print it for the clipboard.',
  },
  {
    title: 'Works offline',
    detail: 'Plans stay on your phone. No signal at the field is fine.',
  },
  {
    title: 'New drills every month',
    detail: 'Added continuously. Your library grows without you doing anything.',
  },
]

const PLANS = {
  monthly: { label: 'Monthly', price: '$8', cadence: 'per month', note: null },
  annual: { label: 'Annual', price: '$64', cadence: 'per year', note: 'Two months free' },
}

export default function PricingPage() {
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout.')
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start checkout. Try again in a moment.')
      setLoading(false)
    }
  }

  const active = PLANS[plan]

  return (
    <>
      <style>{css}</style>

      <main className="df-wrap">
        <header>
          <p className="df-eyebrow">Drill Finder</p>
          <h1 className="df-title">
            Premium
            <span className="df-title-sub">Everything you get</span>
          </h1>
        </header>

        <section className="df-board" aria-labelledby="df-included">
          <h2 id="df-included" className="df-board-label">Included</h2>

          <ul className="df-features">
            {FEATURES.map((f) => (
              <li key={f.title} className="df-feature">
                <span className="df-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M4 13l6 6L20 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="df-feature-title">{f.title}</h3>
                  <p className="df-feature-detail">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="df-buy" aria-label="Choose a plan">
          <div className="df-toggle" role="radiogroup" aria-label="Billing period">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => (
              <button
                key={key}
                role="radio"
                aria-checked={plan === key}
                className={`df-toggle-btn ${plan === key ? 'is-on' : ''}`}
                onClick={() => setPlan(key)}
              >
                {PLANS[key].label}
                {PLANS[key].note && <span className="df-tag">{PLANS[key].note}</span>}
              </button>
            ))}
          </div>

          <div className="df-price">
            <span className="df-amount">{active.price}</span>
            <span className="df-cadence">{active.cadence}</span>
          </div>

          <button className="df-cta" onClick={startCheckout} disabled={loading}>
            {loading ? 'Opening checkout…' : 'Start Premium'}
          </button>

          {error && <p className="df-error" role="alert">{error}</p>}

          <p className="df-fine">Cancel anytime from your account settings.</p>
        </section>
      </main>
    </>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Public+Sans:wght@400;500;600&display=swap');

.df-wrap {
  --paper: #FAF8F3;
  --ink: #12211C;
  --board: #163029;
  --board-line: #24443B;
  --chalk: #EDEFE8;
  --chalk-dim: #A9B8B1;
  --signal: #FFC24B;
  --rule: #DDDACF;

  max-width: 620px;
  margin: 0 auto;
  padding: 48px 20px 72px;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Public Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.df-eyebrow {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #6B7A73;
  margin: 0 0 10px;
}

.df-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: clamp(52px, 14vw, 78px);
  line-height: 0.88;
  letter-spacing: -0.015em;
  margin: 0 0 36px;
  display: flex;
  flex-direction: column;
}
.df-title-sub {
  font-size: 17px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 0;
  color: #5C6B64;
  margin-top: 14px;
}

.df-board {
  background: var(--board);
  color: var(--chalk);
  border-radius: 4px;
  padding: 30px 26px 34px;
  position: relative;
  overflow: hidden;
}
.df-board::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px solid var(--board-line);
  border-radius: 2px;
  pointer-events: none;
}
.df-board::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 10px;
  bottom: 10px;
  width: 1px;
  background: var(--board-line);
  pointer-events: none;
}

.df-board-label {
  position: relative;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--signal);
  margin: 0 0 22px;
}

.df-features { list-style: none; margin: 0; padding: 0; position: relative; }

.df-feature {
  display: flex;
  gap: 14px;
  padding: 15px 0;
  border-top: 1px solid var(--board-line);
}
.df-feature:first-child { border-top: none; padding-top: 0; }

.df-check {
  flex: 0 0 20px;
  height: 20px;
  margin-top: 2px;
  color: var(--signal);
}
.df-check svg { width: 20px; height: 20px; display: block; }

.df-feature-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 3px;
  line-height: 1.3;
}
.df-feature-detail {
  font-size: 14px;
  line-height: 1.5;
  color: var(--chalk-dim);
  margin: 0;
}

.df-buy { margin-top: 32px; }

.df-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 22px;
}
.df-toggle-btn {
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 13px 10px;
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 3px;
  color: #5C6B64;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: border-color .15s, color .15s, background .15s;
}
.df-toggle-btn:hover { border-color: #B9B5A7; }
.df-toggle-btn.is-on {
  border-color: var(--ink);
  color: var(--ink);
  background: #fff;
  font-weight: 600;
}
.df-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8A7433;
}
.df-toggle-btn.is-on .df-tag { color: #8A6B15; }

.df-price {
  display: flex;
  align-items: baseline;
  gap: 9px;
  margin-bottom: 18px;
}
.df-amount {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 46px;
  line-height: 1;
}
.df-cadence { font-size: 15px; color: #5C6B64; }

.df-cta {
  width: 100%;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 19px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 17px;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background .15s;
}
.df-cta:hover:not(:disabled) { background: #1E3A31; }
.df-cta:disabled { opacity: .55; cursor: default; }

.df-error {
  margin: 12px 0 0;
  font-size: 14px;
  color: #A33B2A;
}
.df-fine {
  margin: 14px 0 0;
  font-size: 13px;
  color: #6B7A73;
  text-align: center;
}

.df-wrap :focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .df-wrap * { transition: none !important; }
