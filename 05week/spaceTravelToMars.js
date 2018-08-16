'use strict';

const assert = require('assert');

const jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};



class CrewMember {
  constructor(name, job, specialSkill, ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  enterShip(ship) {
    // console.log(ship, 'here', this);
    ship.crew.push(this);
    this.ship = ship;

    // console.log(ship);
  }
}

class Ship {
  constructor(name, type, ability, crew) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }

  missionStatement() {
    if (this.crew.length > 0) {
      return this.ability;
      // console.log("console log: ", this.ability);
    } else {
      return "Can't perform a mission yet.";
    }
  }
}

const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
// crewMember1.name = 'crewMember1';
const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');

const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');


// console.log(mav.missionStatement());
// console.log(hermes.missionStatement());

crewMember1.enterShip(mav);
mav.missionStatement()
// console.log(mav.missionStatement());

// crewMember2.enterShip(hermes);
hermes.missionStatement();

// console.log(hermes.missionStatement());
// console.log(mav.crew.length)
// console.log(mav.crew[0])

//tests

// make a class called CrewMember, in the constructor, assign name, job, specialSkill, and ship
// build a class called Ship, in the constructor, assign name, a type, ability, and crew (empty array)
// Ship has a missionStatement
// enterShip() method in CrewMember class
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    // checks to see that member can be added to crew array when enterShip method is called on crewMember1
    it('can enter a ship', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  // can create new Ship called mav with properties of name, type, ability, and an empty crew upon creation
  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });
    // function can print a correct mission statement depending on whether there is a crew member or not
    it('can return a mission statement correctly', function(){
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
