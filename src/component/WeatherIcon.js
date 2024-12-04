import React from 'react'

const WeatherIcon = ({iconCode}) => {
    const iconUrl =`http://openweathermap.org/img/wn/${iconCode}@2x.png`
  return <img src={iconUrl} alt="weather icon"/>
}

export default WeatherIcon
