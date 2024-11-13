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

// Placeholder data for products
// INSERT these into PG admin 4
let products = [
  { id: 1, name: "Sample Product 1", price: 19.99 },
  { id: 2, name: "Sample Product 2", price: 29.99 },
];

// Stub function to create products table
async function createProductsTable() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10, 2)
        );`
    );
  } catch (error) {
    console.error("Error creating users table:", err);
  }
}

// Endpoint to list all products
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Endpoint to add a new product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Endpoint to update a product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );

  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  products[productIndex] = { ...products[productIndex], name, price };
  res.json(products[productIndex]);
});

// Endpoint to delete a product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows === 0) {
      return res.status(404).send("Products not found");
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

createProductsTable().then(() =>
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
);
