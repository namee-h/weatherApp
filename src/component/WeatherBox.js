import React from "react";
import WeatherIcon from "./WeatherIcon";

const WeatherBox = ({ weather }) => {
  console.log("weather?", weather);
  const icon = [weather?.weather[0].icon];

  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp} ℃ /{" "}
        {(weather?.main.temp * (9 / 5) + 32).toFixed(1)} ℉
      </h2>
      <h3>{weather?.weather[0].description}</h3>
      <span className="icon"><WeatherIcon iconCode={icon} /></span>
    </div>
  );
};

export default WeatherBox;
