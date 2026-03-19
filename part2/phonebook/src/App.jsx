import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm.jsx';
import FilterForm from './components/FilterForm.jsx';
import Persons from './components/Persons.jsx';
import phoneService from './services/numbers.js'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchFilter, setNewSearchFilter] = useState('');

  // UseEffect to use phoneService to getAll of perons from db instead of doing the axios calls here. GetAll returns a promise 
  useEffect(() => {
    phoneService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const hasDuplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    // const hasDuplicateNumber = persons.some(person => person.number === newNumber);

    if (hasDuplicateName) {
      const replace = confirm(`${newName} already exists, would you like to replace their number`);
      if (replace) {
        const curPerson = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase());
        const curId = curPerson.id;
        const curName = curPerson.name
        phoneService
          .updatePerson(curId, curName, newNumber)
          .then(updatedPerson => {
              setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
              setNewName('')
              setNewNumber('')
          })
          .catch(err => console.log(err))
        return
      } else return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    // setPersons(persons.concat(newPerson));
    // setNewName('');
    // setNewNumber('');
    phoneService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const filteredPersons =  persons ? persons.filter(person =>
    person.name.toLowerCase().includes(newSearchFilter.toLowerCase())
  ) : [];

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchFilter = (event) => {
    setNewSearchFilter(event.target.value);
  }

  const removePerson = (id, name) => {
    const result = confirm(`Are you sure you want to delete ${name}?`)
    if (result) {
      phoneService
      .deletePerson(id)
      .then(returnedData => setPersons(persons.filter(n => n.id !== returnedData.id)))
      .catch(err => alert(err))
    }
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <FilterForm className="searchFilter" newSearchFilter={newSearchFilter} handleSearchFilter={handleSearchFilter}/>
        <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
          <Persons filteredPersons={filteredPersons} deletePerson={removePerson}/>
      </div>
    </>
  )
}

export default App
