const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "solar_secret_key_2024";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Please login." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
}

module.exports = authenticateToken;