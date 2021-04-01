require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

/* app.get('/info', (request, response) => {
  const entries = persons.length;

  response.send(`<p>Phonebook contains ${entries} entries</p>
  <p>${new Date().toString()}<p>`);
}); */

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      console.log('404 Not Found on GET request');
      console.log(error.message);
      response.status(404).end();
    });
});

/* app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});
*/

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'name and number missing',
    });
  } else if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  } /* else if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name already exists in phonebook',
    });
  } */

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log('Error saving new entry to database');
      console.log(error.message);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
