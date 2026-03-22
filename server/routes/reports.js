const express = require("express");
const router = express.Router();
const knex = require("../database/db");
const authenticateToken = require("../middleware/auth");

router.post("/save", authenticateToken, async (req, res) => {
  const { city, state, monthlyBill, roofSize, results } = req.body;
  const userId = req.user.id;

  try {
    await knex("reports").insert({
      user_id: userId,
      city, state,
      monthly_bill: monthlyBill,
      roof_size: roofSize,
      system_capacity: results.systemCapacityKW,
      annual_savings: results.annualSavings,
      payback_years: results.paybackYears,
      co2_offset: results.co2OffsetKg,
      trees_equivalent: results.treesEquivalent,
      lifetime_savings: results.lifeTimeSavings
    });
    res.json({ success: true, message: "Report saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save report" });
  }
});

router.get("/my-reports", authenticateToken, async (req, res) => {
  try {
    const reports = await knex("reports")
      .where({ user_id: req.user.id })
      .orderBy("created_at", "desc");
    res.json({ success: true, reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch reports" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await knex("reports")
      .where({ id: req.params.id, user_id: req.user.id })
      .delete();
    res.json({ success: true, message: "Report deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete report" });
  }
});

module.exports = router;
