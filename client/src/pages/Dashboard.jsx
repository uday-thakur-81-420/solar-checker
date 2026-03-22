import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { navigate("/login"); return }
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/reports/my-reports", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReports(res.data.reports)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteReport = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:5000/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReports(reports.filter(r => r.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>SolarCheck</div>
        <div className="nav-links">
          <span className="nav-user">Hi, {user.name}</span>
          <button onClick={() => navigate("/calculator")} className="btn-primary">New Check</button>
          <button onClick={logout} className="btn-outline">Logout</button>
        </div>
      </nav>
      <div className="dashboard-content">
        <h1>Your Solar Reports</h1>
        <p className="dash-sub">All your saved feasibility checks in one place</p>
        {loading && <p className="loading-text">Loading your reports...</p>}
        {!loading && reports.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No reports yet</h3>
            <p>Run your first solar feasibility check</p>
            <button onClick={() => navigate("/calculator")} className="btn-primary">Check Now</button>
          </div>
        )}
        <div className="reports-grid">
          {reports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div>
                  <h3>{report.city}, {report.state}</h3>
                  <span className="report-date">{new Date(report.created_at).toLocaleDateString("en-IN")}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteReport(report.id)}>✕</button>
              </div>
              <div className="report-stats">
                <div className="r-stat">
                  <span className="r-label">Annual Savings</span>
                  <span className="r-value gold">₹{Number(report.annual_savings).toLocaleString()}</span>
                </div>
                <div className="r-stat">
                  <span className="r-label">Payback</span>
                  <span className="r-value">{report.payback_years} yrs</span>
                </div>
                <div className="r-stat">
                  <span className="r-label">CO₂ Saved</span>
                  <span className="r-value green">{Number(report.co2_offset).toLocaleString()} kg</span>
                </div>
                <div className="r-stat">
                  <span className="r-label">Lifetime</span>
                  <span className="r-value gold">₹{Number(report.lifetime_savings).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard