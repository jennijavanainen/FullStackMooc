import {useState, useEffect} from 'react'
import axios from 'axios'
import FindForm from "./components/FindForm";
import Results from "./components/Results";

const App = () => {

    const [filter, setFilter] = useState('')
    const [countries, setCountries ] = useState([])
    const [selected, setSelected] = useState([])
    const [weather, setWeather] = useState(undefined)


    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    useEffect(() => {
        const filtered = countries
            .filter(country => country.name.common
                .toString()
                .toUpperCase()
                .startsWith(filter.toUpperCase())
            )
        setSelected(filtered)
    }, [filter])

    useEffect(() => {
        if (selected.length === 1) {
            const APIkey = '9b1ee31c85245e9051ce24c3c122878b'
            const lat = selected[0].capitalInfo.latlng[0]
            const lon = selected[0].capitalInfo.latlng[1]
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
                .then(response => {
                    setWeather(response.data)
                })
        }
    }, [selected])

    const handleFilterChange = event => {
        setFilter(event.target.value)
    }

    const handleClick = country => {
        setFilter(country)
    }

    return (
        <div>
            <FindForm
                handleFilterChange={handleFilterChange}
                filter={filter}
            />
            <Results
                handleClick={handleClick}
                countries={selected}
                weather={weather}
            />
        </div>
    )

}

export default App
