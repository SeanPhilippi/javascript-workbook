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

// do... while loop
