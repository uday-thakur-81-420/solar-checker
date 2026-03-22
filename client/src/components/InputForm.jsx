import { useState } from "react"

const states = [
  "Haryana", "Punjab", "Delhi", "Rajasthan", "Uttar Pradesh",
  "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat",
  "West Bengal", "Madhya Pradesh", "Andhra Pradesh",
  "Telangana", "Kerala", "Bihar"
]

function InputForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    city: "",
    state: "Haryana",
    monthlyBill: "",
    roofSize: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="form-card">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Your City</label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Karnal"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your State</label>
          <select name="state" value={form.state} onChange={handleChange}>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Monthly Electricity Bill (₹)</label>
          <input
            type="number"
            name="monthlyBill"
            placeholder="e.g. 3000"
            value={form.monthlyBill}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available Roof Size (sq ft)</label>
          <input
            type="number"
            name="roofSize"
            placeholder="e.g. 500"
            value={form.roofSize}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Check Solar Feasibility"}
        </button>

      </form>
    </div>
  )
}

export default InputForm