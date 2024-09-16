#!/usr/bin/env node

// ^ the above line basically just says you want to execute the code with node

const process = require("node:process");

const arguments = process.argv.slice(2);

if (arguments.includes("--greet")) {
  console.log("Hello World");
} else if (
  arguments.includes("--help") ||
  arguments.includes("-h") ||
  arguments.includes("help")
) {
  console.log(`
                Usage: 
                    --greet     Print 'Hello, World!'
                    --help      Show this help message`);
} else {
  console.log(
    "No valid arguments provided, Use '--help' for usage information"
  );
}
