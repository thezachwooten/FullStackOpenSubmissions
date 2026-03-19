import Person from "./Person";

function Persons({filteredPersonsfd}) {
    return (
        <ul>
            {filteredPersons.map(person =>
              <Person key={person.name} name={person.name} number={person.number}/>
            )}
        </ul>
    );
}

export default Persons