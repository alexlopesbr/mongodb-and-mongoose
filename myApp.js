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

var findPersonById = (personId, done) => {
  Person.findById(personId, (err, nameId) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, nameId);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, personToEdit) => {
    if (err) {
      return console.log(err);
    } else {
      personToEdit.favoriteFoods.push(foodToAdd);
      personToEdit.save((err, updatedPerson) => {
        if (err) {
          return console.log(err);
        } else {
          done(null, updatedPerson);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedAge) => {
      if (err) {
        return console.log(err);
      } else {
        done(null, updatedAge);
      }
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, idToRemove) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, idToRemove);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  Person.deleteMany({ name: nameToRemove }, (err, nameToRemove) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, nameToRemove);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select('-age')
    .exec((err, searchResult) => {
      if (err) {
        return console.log(err);
      } else {
        done(null, searchResult);
      }
    });
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
