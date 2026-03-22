const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "solar.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    city TEXT,
    state TEXT,
    monthly_bill REAL,
    roof_size REAL,
    system_capacity REAL,
    annual_savings REAL,
    payback_years REAL,
    co2_offset REAL,
    trees_equivalent INTEGER,
    lifetime_savings REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Database ready!");

module.exports = db;