function Person({name, number, deletePerson, id}) {
    return (
        <>
        <span>{name} {number} <button onClick={() => deletePerson(id, name)}>Delete Person</button></span>
        </>
    );
}

export default Person