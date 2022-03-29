import {useState, useEffect} from 'react'
import personComm from './services/personComm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        personComm
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const selectedPersons = (filter.length === 0) ? persons :
        persons.filter(p => p.name.toUpperCase().includes(filter.toUpperCase()))

    const validate = (event) => {
        event.preventDefault()
        if (!persons.map(names => names.name.toUpperCase()).includes(newName.toUpperCase())){
            addPerson()
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const id = persons.find(person => person.name === newName).id
                updatePerson(id)
            }
        }
    }

    const notify = (text, type) => {
        setNotification({text, type})
        setTimeout(() => {
            setNotification(null)
        }, 2500)
    }

    const updatePerson = (id) => {
        const personObject = {
            name: newName,
            number: newNumber,
            id : id
        }
        personComm
            .update(id, personObject)
            .then(response => {
                setPersons(persons.map(person => person.id === id ? response.data : person))
                notify(`Updated ${newName}`, 'info')
            }).catch(() => {
            notify(`Person '${newName}' was already removed from server`, 'alert')
            setPersons(persons.filter(p => p.id !== id))
        })
        setNewName('')
        setNewNumber('')

    }

    const addPerson = () => {
        const personObject = {
            name: newName,
            number: newNumber
        }
        personComm
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                notify(`Added ${newName}`, 'info')
            })
            .catch(error => {
                console.log(error.response.data)
                notify(error.response.data.error, 'alert')
            })
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

    const handleDeleteClick = (id, name) => {
        if (window.confirm(`Poistetaanko henkilö ${name}?`)) {
            personComm
                .remove(id)
                .then(() => {
                    notify(`Deleted ${name}`, 'info')
                    personComm
                        .getAll()
                        .then(response => {
                            setPersons(response.data)
                        })
                }).catch(() => {
                notify(`Person '${newName}' was already removed from server`, 'alert')
                setPersons(persons.filter(p => p.id !== id))
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
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
                handleDeleteClick={handleDeleteClick}
                persons={selectedPersons}
                filter={filter}
            />
        </div>
    )

}

export default App
