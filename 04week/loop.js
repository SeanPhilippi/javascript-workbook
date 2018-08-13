// for loop
const carsInReverse = ['Honda', 'Chevy', 'Suburu', 'Hyundai', 'Toyota'];

for (let i = 0; i < carsInReverse.length; i++) {
  console.log(carsInReverse[i]);
}

// for...in loop
const persons = {
  firstName: 'Jane',
  lastName: 'Doe',
  birthDate: 'Jan 5, 1925',
  gender: 'female'
}

for (let prop in persons) {
  console.log(prop);
}

for (let prop in persons) {
  if (prop === 'birthDate') {
    console.log(persons.birthDate)
  }
}

// while loop
let i = 0;
while (i < 1000) {
  i++;
  console.log(i);
}

// do... while loop
let i = 0;
do {
  i++;
  console.log(i);
}
while  (i < 1000);

// When is a for loop better than a while loop?

// while loops are better when there is an unknown number of iterations needed or when you have a specific condition
// besides a number of iterations you need filled

// How is the readability of the code affected?

// for loop is more lean, while loop can be easier to read

// What is the difference between a for loop and a for...in loop?

// for in loop loops through the properties of an object, whereas for loop loops through items in an array

// What is the difference between a while loop and a do...while loop?

// the difference is that the do while loop will always excute at least once, even if the condition is false, because
// code block is executed before the condition is tested. 
