import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm.jsx';
import FilterForm from './components/FilterForm.jsx';
import Persons from './components/Persons.jsx';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchFilter, setNewSearchFilter] = useState('');

  const hook = () => {
    console.log('effect');
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        console.log("Promise filled")
        setPersons(res.data)
      })
  }

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault()
    
    const hasDuplicateName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    const hasDuplicateNumber = persons.some(person => person.number === newNumber);

    if (hasDuplicateName  || hasDuplicateNumber) {
      alert(`${newName} or ${newNumber} already exists`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
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

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <FilterForm className="searchFilter" newSearchFilter={newSearchFilter} handleSearchFilter={handleSearchFilter}/>
        <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
          <Persons filteredPersons={filteredPersons}/>
      </div>
    </>
  )
}

export default App
