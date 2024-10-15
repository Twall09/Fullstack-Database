const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "keyin_test",
  port: 5432,
  password: "keyin123",
});

/**
 * Creates the database table, if it does not already exist.
 */
async function createTable() {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name TEXT);"
    );
  } catch (error) {
    console.error("Error creating the table");
  }
}

/**
 * Inserts a new item into the table
 *
 * @param {string} itemName Name of the item being added
 */
async function insertItem(itemName) {
  const query = {
    text: `INSERT INTO items (name) VALUES ($1)`,
    values: [itemName],
  };
  await pool.query(query);
}

/**
 * Prints all items in the database to the console
 */
async function displayItems() {
  console.log("Items in the table are: ");
  const result = await pool.query("SELECT * FROM items");
  result.rows.forEach((row) => console.log(row));
}

async function deleteAllItems() {
  await pool.query("DELETE from items");
}

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log("Usage:");
  console.log("  insert <item_name> - Insert an item");
  console.log("  show - Show all items");
}

/**
 * Runs our CLI app to manage the items database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case "insert":
      if (!args[1]) {
        printHelp();
        return;
      }

      await insertItem(args[1]);
      break;
    case "show":
      await displayItems();
      break;
    case "delete":
      await deleteAllItems();
      break;
    default:
      printHelp();
      break;
  }

  await pool.end();
}

runCLI();
