#!/usr/bin/env node

const process = require("node:process");
const symbols = require("./symbols");

// function to generate password and the allowed characters
// Implementing all 3 customizable features
function generatePassword(length, options) {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
symbol-option

  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?-";
QAP1-Initial-Commit

  let characters = lowerCase; // sets passwords to default lowercase

  if (options.uppercase) {
    characters += upperCase;
  }
  if (options.numbers) {
    characters += numbers;
  }
  if (options.symbols) {
    characters += symbols;
  }

  if (characters.length === 0) {
    throw new Error("characters cannot be empty");
  }

  var password = ""; // "" to select any random characters based on your entry in terminal
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// help message, informing user how to use the application
function helpMessage() {
  console.log(`
    Usage: node password-generator '<text>: include from options below'

    Options:
        --length        Specifys length of password
        --uppercase     Must include uppercas letters
        --symbols       Must include symbols
        --numbers       Must include numbers
        --help          Show help message
    
    Example:
         node password-generator --length 8 --symbols -numbers
        ^ This should generator your desired password
         `);
}

// handle the invalid input message
function invalidInput(message) {
  console.error("Error " + message);
  process.exit(1);
}

// If i'm right, when entered in the terminal, this excludes node and script path when generating password.
var args = process.argv.slice(2);

// These are all default values
var options = {
  length: 8, // 8 is the default you told us
  uppercase: false,
  numbers: false,
  symbols: false,
};

// distinguish through the arguments and different flag options
for (var i = 0; i < args.length; i++) {
  var arg = args[i];
  switch (arg) {
    case "--length":
      var length = parseInt(args[i + 1], 10);
      if (isNaN(length) || length <= 0)
        invalidInput("Password length must be greater than 0");
      options.length = length;
      i++;
      break;
    case "--uppercase": // adds uppercase letters
      options.uppercase = true;
      break;
    case "--numbers": // adds numbers
      options.numbers = true;
      break;
    case "--symbols": // adds symbols
      options.symbols = true;
      break;
    case "--help": // shows help message and then exits
      helpMessage();
      process.exit(0);

    // if any flag entered is not one from above, an error message will appear
    default:
      if (arg.startsWith("--")) invalidInput("Error: " + arg);
      break;
  }
}

// Generate your password

try {
  var password = generatePassword(options.length, options); // will default it at 8, then include any other options you specify
  console.log("Your password: ", password);
} catch (error) {
  console.error("Error: ", error.message);
}
