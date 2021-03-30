const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { request } = require("express");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "lol-pallo",
    number: "1",
    id: 6,
  },
  {
    name: "Juha",
    number: "123123",
    id: 8,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>landing test</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const entries = persons.length;

  response.send(`<p>Phonebook contains ${entries} entries</p>
  <p>${new Date().toString()}<p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const newId = () => {
  return Math.round(Math.random() * 100000000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name and number missing",
    });
  } else if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name already exists in phonebook",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: newId(),
  };

  persons = [...persons, newPerson];

  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
