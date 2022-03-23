import {useState, useEffect} from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('useEffect called')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

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

export default App
