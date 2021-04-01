const mongoose = require('mongoose');

if (
  process.argv.length < 3 ||
  process.argv.length === 4 ||
  process.argv.length > 5
) {
  console.log(
    '\nTo view all entries, please provide the password as an argument:\n\n\tnode mongo.js <password>\n\nOr, to add a new entry, provide the password, name, and phone number:\n\n\tnode mongo.js <password> <name> <number>\n'
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://jonnythedog:${password}@cluster0.v6s5j.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

const nameToAdd = process.argv[3];
const numberToAdd = process.argv[4];

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model('Person', personSchema);

    if (nameToAdd && numberToAdd) {
      const person = new Person({
        name: nameToAdd,
        number: numberToAdd,
      });

      person.save().then((result) => {
        console.log(
          `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
      });
    } else {
      Person.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
  })
  .catch((error) => {
    console.log('Connection error!\n', error);
  });
