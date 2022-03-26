
const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object
                    .values(country.languages)
                    .map((value, i) =>
                        <li key={i}>{value}</li>)}
            </ul>
            <img src={country.flags.png} alt='Flag'/>
            <h2>Weather in {country.capital} </h2>
        </div>
    )
}

export default Country