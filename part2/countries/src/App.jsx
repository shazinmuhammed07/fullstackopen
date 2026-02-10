import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!capital) return

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  if (!weather) return null

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} width="150" alt="flag" />

      <Weather capital={country.capital[0]} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries{' '}
      <input
        value={filter}
        onChange={e => {
          setFilter(e.target.value)
          setSelected(null)
        }}
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelected(country)}>show</button>
          </div>
        ))}

      {filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]} />
      )}

      {selected && <Country country={selected} />}
    </div>
  )
}

export default App
