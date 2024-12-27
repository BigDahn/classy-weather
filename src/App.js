import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Button from './Button'
import Weather from "./Weather";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function App() {
  const [input,setInput] = useState("")
  const [Loading,setLoading] = useState(false)
  const [countryFlag,setCountryFlag] = useState()
  const [weather,setWeather] = useState({})
  const  refCon = useRef()


  useEffect(()=>{
    setWeather({})
    setCountryFlag()
  },[input])

useEffect(()=>{
  refCon.current.focus();
})

  async function handleClick() {
  if (!input) return
   try {
    setLoading(true)
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}`)
    const geoData = await response.json()
    console.log(geoData)
    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0)
     setCountryFlag(`${name} ${convertToFlag(country_code)}`)
       const weatherRes = await fetch(
         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
       )
       const weatherData = await weatherRes.json()
      
      const { temperature_2m_max, temperature_2m_min, time, weathercode } =
        weatherData.daily
        setWeather({
          temperature_2m_max,
          temperature_2m_min,
          time,
          weathercode
        })
        console.log(weather)
      setLoading(false)
   } catch (error) {
    
   }
  }
   
  return (
    <div className="app">
      <h1>CLASSY WEATHER</h1>
      <div>
        <Input input={input} onInput={setInput} refCon={refCon} />
      </div>
      <Button handleClick={handleClick}>Click here</Button>
      {Loading && <p className="loader">Loading...</p>}
      {countryFlag && <Weather countryFlag={countryFlag} weather={weather} />}
    </div>
  )
}

export default App;
