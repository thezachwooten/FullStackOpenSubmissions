function PersonForm({className, addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) {


    return (
        <form className={className} onSubmit={addPerson}>
          <div>
            name: <input className={`${className}NameInput`} value={newName} onChange={handlePersonChange}/>
          </div>
          <div>
            number: <input className={`${className}NumberInput`} value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button className={`${className}SubmitButton`} type="submit">add</button>
          </div>
        </form>
    );
}

export default PersonForm