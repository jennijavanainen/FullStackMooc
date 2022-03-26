import Country from "./Country";
import Weather from "./Weather";

const Results = ({ countries, handleClick, weather }) => {

    if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]}/>
                { weather && <Weather weather={weather} /> }
            </div>
        )
    } else if (countries.length > 1 && countries.length <= 10) {
        return (countries.map((country, i) =>
            <div key={i}>
                <p>{country.name.common}
                    <button onClick={() => handleClick(country.name.common)}>show</button>
                </p>
            </div>
        ))
    } else {
        return <></>
    }


}

export default Results