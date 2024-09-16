#!/usr/bin/env node

const process = require("node:process");

function getWordCount(text) {
  return text.trim().split(" ").length;
}

function getCharCount(text) {
  return text.length;
}

function printHelpMessage() {
  console.log(
    `Usage: text-statistics '<text>' 
    
    Example: text-statistics "Hello world. This is a test" 
    
    Output: "the number of words in "Hello World. this is a test" is: 6 and the number of characters is 28`
  );
}

const userArguments = process.argv.slice(2);
if (userArguments.length !== 1) {
  printHelpMessage();
  return;
}

if (userArguments[0] === "--help" || userArguments[0] === "-h") {
  printHelpMessage();
  return;
}

console.log(
  `the number of words in ${userArguments[0]} is: ${getWordCount(
    userArguments[0]
  )} and the number of characters is ${getCharCount(userArguments[0])}`
);
