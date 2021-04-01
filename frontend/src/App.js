import React, { useEffect, useState } from 'react';
import personsService from './services/persons';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import Add from './components/Add';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [msgIsError, setMsgIsError] = useState(false);

  const successMessage = (text) => {
    setMessage(text);
    setMsgIsError(false);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const errorMessage = (text) => {
    setMessage(text);
    setMsgIsError(true);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQueryInput = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, would you like to replace old number with new one?`
        )
      ) {
        const oldEntry = persons.find((person) => person.name === newName);
        const updatedEntry = { ...oldEntry, number: newNumber };

        personsService
          .put(updatedEntry)
          .then(() => {
            setPersons(
              persons.map((person) => {
                return person.id === updatedEntry.id ? updatedEntry : person;
              })
            );
            successMessage(`Successfully updated number for ${newName}!`);
          })
          .catch((error) => {
            console.error(error);
            console.error(error.response.data.error);
            errorMessage(error.response.data.error);
          });

        setNewName('');
        setNewNumber('');
      }
    } else {
      const newEntry = {
        name: newName,
        number: newNumber,
        id: Math.round(Math.random() * 10000000000),
      };
      personsService
        .create(newEntry)
        .then((response) => {
          setPersons([...persons, newEntry]);
          successMessage(`Successfully added ${newName} to phonebook!`);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.data.error);
          errorMessage(error.response.data.error);
        });

      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personsService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
      successMessage(
        `Successfully deleted ${
          persons.find((person) => person.id === id).name
        } from phonebook`
      );
    }
  };

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={msgIsError} />
      <Filter query={query} onChange={handleQueryInput} />
      <h2>add new</h2>
      <Add
        onFormSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInput}
        onNumberChange={handleNumberInput}
      />

      <h2>Numbers</h2>
      <Numbers persons={persons} query={query} onDeleteClick={handleDelete} />
    </div>
  );
};

export default App;
