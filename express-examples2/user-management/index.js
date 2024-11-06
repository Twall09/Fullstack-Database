const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "wall.11",
  port: 5432,
});

// Middleware to parse JSON requests
app.use(express.json());

// Placeholder data instead of a database (for now)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// Stub function to create users table
async function createUsersTable() {
  try {
    // TODO: Add SQL logic to create the users table in PostgreSQL
    console.log("Creating users table...");
    //id of the user
    //name of the user
    //email of the user
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
        );`);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

// Endpoint to list all users
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// Endpoint to add a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || name.length() === 0) {
    return res.status(400).send("Error, missing required name");
  }
  if (!email || email.length() === 0) {
    return res.status(400).send("Error, missing required email");
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2);",
      [name, email]
    );
    res.status(201).send();
  } catch (error) {
    console.error("Error occurred while inserting a new user!", error);
    res.status(500).send("Server error");
  }
});

// Endpoint to update a user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users[userIndex] = { ...users[userIndex], name, email };
  res.json(users[userIndex]);
});

// Endpoint to delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

createUsersTable().then(() =>
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
);
