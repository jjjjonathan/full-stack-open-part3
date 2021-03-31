const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jonnythedog:${password}@cluster0.v6s5j.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

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

    const person = new Person({
      name: 'Jonny the dog',
      number: '507-413-bark-bark',
    });

    person.save().then((result) => {
      console.log(result);
      console.log('SUCCESS, note saved!');
      mongoose.connection.close();
    });

    /*

    Note.find({ important: true }).then((result) => {
      result.forEach((note) => {
        console.log(note);
      });
      mongoose.connection.close();
    });
     */
  });
