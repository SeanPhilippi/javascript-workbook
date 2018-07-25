// 1. Write a JavaScript program to display the current day and time.
// assign variable to new Date() and make function that returns variable with toDateString() attached
const date = new Date();
const displayDate = () => date.toDateString();
displayDate();
// 2. Write a JavaScript program to convert a number to a string.
// use toString() on an argument passed thorugh a function
const numToString = (num) => {
  return num.toString()
}
numToString(25);
// 3. Write a JavaScript program to convert a string to the number.
// use parseInt on an argument passed thorugh a function
const stringToNum = (string) => {
    return parseInt(string);
}
// 4. Write a JavaScript program that takes in different datatypes and prints out whether they are a:
// Boolean
// Null
// Undefined
// Number
// NaN
// String
// Make a function and use typeof on the argument passed through
const typeOfData = (arg1) => {
  return typeof arg1;
}
typeOfData('red')
// 5. Write a JavaScript program that adds 2 numbers together.
// use function sumOfTwo and return sum of 2 arguments
const sumOfTwo = (num1, num2) => {
  return num1 + num2
}
// 6. Write a JavaScript program that runs only when 2 things are true.
// use an if statement within a function and use && to check if both arguments are === to true
const bothTrue = (arg1, arg2) => {
  if (arg1 && arg2) {
    return 'both things are true!';
  }
}
// 7. Write a JavaScript program that runs when 1 of 2 things are true.
// use an if statement within a function and use ||
const twoTrue = (arg1, arg2) => {
  if (arg1 || arg2) {
    return 'One of the 2 things is true!';
  }
}
// 8. Write a JavaScript program that runs when both things are not true.
// use an if statement within a function and use !== and &&
const bothNotTrue = (arg1, arg2) => {
  if (!arg1 && !arg2) {
    return 'Both things are not true!';
  }
}
