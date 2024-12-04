import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Clock from "./component/Clock";

const cities = ["seoul", "new york", "paris", "tokyo"];
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// 1. 앱이 시작하면 현재위치 기반 날씨를 보여줌
// 2. 날씨정보는 도시이름, 현재 온도(섭씨,화씨), 날씨상태
// 3. 총 다섯개의 버튼이있음(현재위치,서울,뉴욕,파리,도쿄)
// 4. 도시버튼 클릭시 도시별 날씨가 나옴
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6. 데이터 로딩시 로딩스피너 렌더
function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [apiError, setApiError] = useState("");
  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    if (city == null || city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);


  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <nav className="nav">
          <span>{moment().format('LL')}</span>
          <span><Clock/></span>
        </nav>
        <h1 className="gradient-text ">오늘 하늘</h1>

        <div className="main">
          {loading ? (
            <ClipLoader
              color="#f88c6b"
              loading={loading}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <WeatherBox weather={weather} />
          )}
        </div>
        <div className="button-box">
          <WeatherButton
            cities={cities}
            setCity={setCity}
            handleCityChange={handleCityChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
