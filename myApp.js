require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// estrutura do schema do mongoose
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);
// fim estrutura

// funcao para salvar no banco de dados
const createAndSavePerson = (done) => {
  // cria novo modelo baseado no schema Person
  let ale = new Person({
    name: 'Alexandre',
    age: 34,
    favoriteFoods: ['item1', 'item2', 'item3'],
  });

  // salva no banco de dados
  ale.save((err, data) => {
    if (err) {
      return console.log(error);
    } else {
      done(null, data);
    }
  });
};

// array que será passada na função que salva vários modelos ao mesmo tempo
let arrayOfPeople = [
  { name: 'João', age: 30, favoriteFoods: ['food1'] },
  { name: 'Silva', age: 20, favoriteFoods: ['food2'] },
  { name: 'José', age: 40, favoriteFoods: ['food3'] },
];

let createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      console.log(error);
    } else {
      done(null, people);
    }
  });
};

// acha a pessoa pelo nome
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, findPerson) => {
    if (err) {
      console.log(error);
    } else {
      done(null, findPerson);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, findOneFood) => {
    if (err) {
      console.log(error);
    } else {
      done(null, findOneFood);
    }
  });
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
