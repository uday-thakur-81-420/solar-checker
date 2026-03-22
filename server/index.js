require("dotenv").config();
const express = require("express");
const cors = require("cors");
const solarRoutes = require("./routes/solar");
const authRoutes = require("./routes/auth");
const reportsRoutes = require("./routes/reports");
require("./database/db");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/solar", solarRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Solar Checker API is running!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
