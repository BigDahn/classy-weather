function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], '☀️'],
    [[1], '🌤'],
    [[2], '⛅️'],
    [[3], '☁️'],
    [[45, 48], '🌫'],
    [[51, 56, 61, 66, 80], '🌦'],
    [[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
    [[71, 73, 75, 77, 85, 86], '🌨'],
    [[95], '🌩'],
    [[96, 99], '⛈'],
  ])
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode))
  if (!arr) return 'NOT FOUND'
  return icons.get(arr)
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateStr))
}

const Weather = ({ countryFlag, weather }) => {
  const {
     temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
  } = weather
  console.log(weather)
  return <div>
   <h2>Weather {countryFlag}</h2>
   <ul className="weather">
    {dates?.map((day,index)=>{
      let isToday = index === 0
      return (
        <li className="day" key={day}>
          <span>{getWeatherIcon(codes.at(index))}</span>
          <p> {isToday ? 'Today' : formatDay(day)}</p>
          <p>
            {Math.floor(min.at(index))}&deg;C &mdash;
            <strong>{Math.ceil(max.at(index))}&deg;C</strong>
          </p>
        </li>
      )
    })}
   </ul>
  </div>
}

export default Weather
