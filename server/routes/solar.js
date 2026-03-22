const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getSolarData } = require("../services/nasaApi");
const { calculate } = require("../services/calculator");
const { getRateByState } = require("../data/electricityRates");

router.post("/calculate", async (req, res) => {
  try {
    const { city, state, monthlyBill, roofSize } = req.body;

    // Step 1 - get lat/lng from city name
    const geoRes = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${city}, ${state}, India`,
          key: process.env.OPENCAGE_API_KEY,
          limit: 1
        }
      }
    );

    const { lat, lng } = geoRes.data.results[0].geometry;

    // Step 2 - get solar data from NASA
    const { monthly, annualAverage } = await getSolarData(lat, lng);

    // Step 3 - get electricity rate for state
    const electricityRate = getRateByState(state);

    // Step 4 - run calculations
    const results = calculate({
      monthlyBill: Number(monthlyBill),
      roofSizeSqFt: Number(roofSize),
      peakSunHours: annualAverage,
      electricityRate
    });

    res.json({
      success: true,
      location: { city, state, lat, lng },
      solarData: { monthly, annualAverage },
      electricityRate,
      results
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;