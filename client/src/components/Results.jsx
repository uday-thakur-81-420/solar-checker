import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Results({ data }) {
  const { results, solarData, location } = data

  const chartData = {
    labels: Object.keys(solarData.monthly),
    datasets: [{
      label: "Solar Energy (kWh/m²/day)",
      data: Object.values(solarData.monthly),
      backgroundColor: "#f59e0b"
    }]
  }

  return (
    <div className="results-card">
      <h2>Results for {location.city}, {location.state}</h2>

      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">System Size</span>
          <span className="stat-value">{results.systemCapacityKW} kW</span>
        </div>
        <div className="stat">
          <span className="stat-label">Annual Generation</span>
          <span className="stat-value">{results.annualGeneration.toLocaleString()} kWh</span>
        </div>
        <div className="stat highlight">
          <span className="stat-label">Annual Savings</span>
          <span className="stat-value">
  {results.annualSavings >= 100000
    ? `₹${(results.annualSavings / 100000).toFixed(2)} Lakh`
    : `₹${results.annualSavings.toLocaleString()}`
  }
</span>
        </div>
        <div className="stat highlight">
          <span className="stat-label">Payback Period</span>
          <span className="stat-value">{results.paybackYears} years</span>
        </div>
        <div className="stat">
          <span className="stat-label">Installation Cost</span>
          <span className="stat-value">₹{results.installationCost.toLocaleString()}</span>
        </div>
        <div className="stat green">
          <span className="stat-label">After Govt Subsidy</span>
          <span className="stat-value">₹{results.costAfterSubsidy.toLocaleString()}</span>
        </div>
        <div className="stat green">
          <span className="stat-label">CO₂ Saved/Year</span>
          <span className="stat-value">{results.co2OffsetKg.toLocaleString()} kg</span>
        </div>
        <div className="stat green">
          <span className="stat-label">Trees Equivalent</span>
          <span className="stat-value">{results.treesEquivalent} 🌳</span>
        </div>
      </div>

      <div className="lifetime">
        <h3>25-Year Lifetime Savings</h3>
        <p className="big-number">
  {results.lifeTimeSavings >= 100000
    ? `₹${(results.lifeTimeSavings / 100000).toFixed(2)} Lakh`
    : `₹${results.lifeTimeSavings.toLocaleString()}`
  }
</p>
      </div>

      <div className="chart-container">
        <h3>Monthly Solar Potential in {location.city}</h3>
        <Bar data={chartData} options={{
  plugins: { legend: { labels: { color: "#a78bfa" } } },
  scales: {
    x: { ticks: { color: "#6b7280" }, grid: { color: "#ffffff08" } },
    y: { ticks: { color: "#6b7280" }, grid: { color: "#ffffff08" } }
  }
}} />
      </div>
    </div>
  )
}

export default Results