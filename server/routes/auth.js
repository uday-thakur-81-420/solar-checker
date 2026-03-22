const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../database/db");

const JWT_SECRET = process.env.JWT_SECRET || "solar_secret_key_2024";

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  if (password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters" });

  try {
    const existing = await knex("users").where({ email }).first();
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const [id] = await knex("users").insert({ name, email, password: hashedPassword });

    const token = jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, user: { id, name, email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const user = await knex("users").where({ email }).first();
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;