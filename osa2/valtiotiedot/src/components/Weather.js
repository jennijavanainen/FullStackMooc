const Weather = ({ weather }) => {
    return (
        <div>
            <p>temperature {Math.round((weather.main.temp - 272.15) * 100) / 100} &#x2103;</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='weather icon' />
            <p>wind {weather.wind.speed} m/s</p>
        </div>

    )
}

export default Weather