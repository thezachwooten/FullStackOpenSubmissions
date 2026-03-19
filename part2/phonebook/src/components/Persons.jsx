import Person from "./Person";

function Persons({filteredPersons, deletePerson}) {
    return (
        <ul>
            {filteredPersons.map(person =>
              <li key={person.name}><Person name={person.name} number={person.number} deletePerson={deletePerson} id={person.id}/></li>
            )}
        </ul>
    );
}

export default Persons