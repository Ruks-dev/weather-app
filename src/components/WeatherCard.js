import React, { useState } from 'react';

const WeatherCard = ({ weatherData }) => {
  const [unit, setUnit] = useState('C');

  if (!weatherData) return null;

  const {
    name,
    main: { temp, humidity, feels_like },
    weather,
    wind: { speed },
  } = weatherData;

  const toC = (k) => (k - 273.15).toFixed(1);
  const toF = (k) => ((k - 273.15) * 9/5 + 32).toFixed(1);
  const convert = (k) => unit === 'C' ? `${toC(k)}°C` : `${toF(k)}°F`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <button
        className="unit-toggle"
        onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
      >
        Switch to °{unit === 'C' ? 'F' : 'C'}
      </button>
      <div className="weather-icon">
        <img
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt={weather[0].description}
        />
        <p>{weather[0].description}</p>
      </div>
      <div className="weather-info">
        <p>Temperature: {convert(temp)}</p>
        <p>Feels like: {convert(feels_like)}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;