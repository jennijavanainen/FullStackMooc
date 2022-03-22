import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Matti Meikäläinen', id: 1, phone: '050-1234567'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const validate = (event) => {
        event.preventDefault()
        persons.map(names => names.name.toUpperCase()).includes(newName.toUpperCase()) ?
            window.alert(`${newName} is already added to phonebook`) :
            addPerson()
    }

    const addPerson = () => {
        const personObject = {
            name: newName,
            id: persons.length + 1,
            phone: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')

    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <h2>Add a new</h2>
            <PersonForm
                persons={persons}
                validate={validate}
                newName={newName}
                newNumber={newNumber}
                handlePersonChange={handlePersonChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filter}
            />
        </div>
    )

}
const PersonForm = (props) => {
    return (
        <form onSubmit={props.validate}>
            <div>
                name: <input
                value={props.newName}
                onChange={props.handlePersonChange}
            />
            </div>
            <div>
                number: <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Filter = (props) => {
    return (
        <div>
            filter shown with <input
            value={props.filter}
            onChange={props.handleFilterChange}
            />
        </div>
    )

}

const Persons = (props) => {
    const selectedPersons = props.persons.filter(person => person.name.toUpperCase().startsWith(props.filter.toUpperCase()))
    return (
        <div>
            {selectedPersons.map(person =>
                <p key={person.id}>{person.name} {person.phone}</p>
            )}
        </div>
    )
}

export default App
