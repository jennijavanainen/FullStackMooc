const Persons = (props) => {
    const selectedPersons = props.persons.filter(person => person.name.toUpperCase().startsWith(props.filter.toUpperCase()))

    return (
        <div>
            {selectedPersons.map(person =>
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => props.handleDeleteClick(person.id, person.name)}>
                        delete
                    </button>
                </p>
            )}
        </div>
    )
}

export default Persons