const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database/solar.db"
  },
  useNullAsDefault: true
});

async function initDB() {
  const hasUsers = await knex.schema.hasTable("users");
  if (!hasUsers) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }

  const hasReports = await knex.schema.hasTable("reports");
  if (!hasReports) {
    await knex.schema.createTable("reports", (table) => {
      table.increments("id").primary();
      table.integer("user_id").notNullable();
      table.string("city");
      table.string("state");
      table.float("monthly_bill");
      table.float("roof_size");
      table.float("system_capacity");
      table.float("annual_savings");
      table.float("payback_years");
      table.float("co2_offset");
      table.integer("trees_equivalent");
      table.float("lifetime_savings");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }

  console.log("Database ready!");
}

initDB();

module.exports = knex;