const Persons = (props) => {
    return (
        <div>
            {props.persons.map(person =>
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