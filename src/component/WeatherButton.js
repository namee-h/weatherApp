import React from "react";
import { Button } from "react-bootstrap";
const WeatherButton = ({ cities, setCity ,handleCityChange}) => {
  console.log("cities?", cities);

  return (
    <div className="buttons">
      <button onClick={()=>handleCityChange("current")}>현재위치</button>
      {cities.map((item, index) => (
        <button key={index} onClick={()=>setCity(item)}>{item}</button>
      ))}
    </div>
  );
};

export default WeatherButton;
