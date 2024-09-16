# QAP1 - Password Generator
- Completed September 2024

# Set up password generater
- Create a function to generate the password & define the allowed characters
- Set the password default to be lowercase letters, as instructed
- Set password to "", so when generated, it will select any random characters based on your entry

# Help Message
- console.log() your help message. Once "--help" is entered, this will help anyone trying to run the program.

# Invalid Input
- Any input entered that is not defined, will result of an error message.

# Args and Options
- State your arguments (var args = process.argv.slice(2);) to exclude node & script path (If im right)
- Define all flag options as their defaults
- Provide a case for each argument and flag options, so when called, the system knows what to generate.
- Define a default option: Meaning if any flag entered is not one from above, throw an error message

# Open terminal, path to your folder, enter (for example): "node password-generator --length 8 --symbols -numbers". This will generate a password with 8 char, symbols and numbers.
