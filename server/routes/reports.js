const express = require("express");
const router = express.Router();
const db = require("../database/db");
const authenticateToken = require("../middleware/auth");

router.post("/save", authenticateToken, async (req, res) => {
  const { city, state, monthlyBill, roofSize, results } = req.body;
  try {
    await db.execute({
      sql: `INSERT INTO reports (
        user_id, city, state, monthly_bill, roof_size,
        system_capacity, annual_savings, payback_years,
        co2_offset, trees_equivalent, lifetime_savings
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        req.user.id, city, state, monthlyBill, roofSize,
        results.systemCapacityKW, results.annualSavings,
        results.paybackYears, results.co2OffsetKg,
        results.treesEquivalent, results.lifeTimeSavings
      ]
    });
    res.json({ success: true, message: "Report saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save report" });
  }
});

router.get("/my-reports", authenticateToken, async (req, res) => {
  try {
    const result = await db.execute({
      sql: "SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC",
      args: [req.user.id]
    });
    res.json({ success: true, reports: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch reports" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await db.execute({
      sql: "DELETE FROM reports WHERE id = ? AND user_id = ?",
      args: [req.params.id, req.user.id]
    });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete" });
  }
});

module.exports = router;