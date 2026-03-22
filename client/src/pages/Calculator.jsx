import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import InputForm from "../components/InputForm"
import Results from "../components/Results"

function Calculator() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)
  const [lastForm, setLastForm] = useState(null)
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setSaved(false)
    setLastForm(formData)
    try {
      const response = await axios.post("https://solar-checker-api.onrender.com", formData)
      setResults(response.data)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const saveReport = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:5000/api/reports/save",
        { ...lastForm, results: results.results },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSaved(true)
    } catch (err) {
      alert("Could not save. Please login first.")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>SolarCheck</div>
        <div className="nav-links">
          {user.name && <span className="nav-user">Hi, {user.name}</span>}
          {user.name && <button onClick={() => navigate("/dashboard")} className="btn-outline">Dashboard</button>}
          {user.name && <button onClick={logout} className="btn-outline">Logout</button>}
          {!user.name && <button onClick={() => navigate("/login")} className="btn-primary">Login</button>}
        </div>
      </nav>
      <main>
        <InputForm onSubmit={handleSubmit} loading={loading} />
        {error && <p className="error">{error}</p>}
        {results && (
          <>
            <div className="save-bar">
              {!saved
                ? <button onClick={saveReport} className="save-btn">Save This Report</button>
                : <p className="saved-msg">Report saved to your dashboard!</p>
              }
            </div>
            <Results data={results} />
          </>
        )}
      </main>
    </div>
  )
}

export default Calculator