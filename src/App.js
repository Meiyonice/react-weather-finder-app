import React, { useState } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setWeather(data);
    } catch (err) {
      setError("City not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Weather App</h1>

        <div className="inputGroup">
          <label htmlFor="city">
            City Name
          </label>

          <input
            type="text"
            id="city"
            placeholder="Enter city name"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <button onClick={fetchWeather}>
            Search
          </button>
        </div>

        <div className="displayArea">
          {loading && (
            <h2 className="loading">
              Loading weather...
            </h2>
          )}

          {error && !loading && (
            <h2 className="error">{error}</h2>
          )}

          {weather && !loading && !error && (
            <div className="weatherCard">
              <div className="weatherVisual">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="Weather Icon"
                />
              </div>

              <h2>{weather.name}</h2>

              <p>
                <span className="label">
                  Temperature:
                </span>{" "}
                {weather.main.temp}°C
              </p>

              <p>
                <span className="label">
                  Condition:
                </span>{" "}
                {weather.weather[0].main}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
