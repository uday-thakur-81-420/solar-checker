import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <nav className="navbar">
        <div className="logo">SolarCheck</div>
        <div className="nav-links">
          <button onClick={() => navigate("/login")} className="btn-outline">Login</button>
          <button onClick={() => navigate("/signup")} className="btn-primary">Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">Powered by NASA Satellite Data</div>
        <h1>Is Solar Worth It<br/>For Your Home?</h1>
        <p>Enter your electricity bill and roof size. Get a complete financial analysis in seconds.</p>
        <button onClick={() => navigate("/signup")} className="btn-hero">
          Check For Free
        </button>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">2.7 yrs</span>
            <span className="hero-stat-label">Avg Payback Period</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">9L+</span>
            <span className="hero-stat-label">Avg 25yr Savings</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">200+</span>
            <span className="hero-stat-label">Trees Equivalent/yr</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🛰️</div>
          <h3>Real NASA Data</h3>
          <p>Solar irradiance pulled directly from NASA satellites for your exact location</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏛️</div>
          <h3>Govt Subsidy Included</h3>
          <p>PM Surya Ghar subsidy of 78,000 automatically factored into your calculation</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Save Your Reports</h3>
          <p>Create an account to save and compare multiple property calculations</p>
        </div>
      </section>
    </div>
  )
}

export default Landing