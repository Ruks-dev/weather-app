import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: { q: city, appid: API_KEY },
      });
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
      setWeatherData(null);
      setLoading(false);
    }
  };

  // 🌍 Geolocation function
  const fetchLocalWeather = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(BASE_URL, {
            params: { lat: latitude, lon: longitude, appid: API_KEY },
          });
          setWeatherData(response.data);
          setLoading(false);
        } catch (err) {
          setError('Could not fetch local weather');
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied');
        setLoading(false);
      }
    );
  };

  return (
  <div className={`app ${darkMode ? 'dark' : ''}`}>
    <h1>Weather App</h1>
    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
    <SearchBar onSearch={fetchWeather} />
    <button className="location-button" onClick={fetchLocalWeather}>
      📍 Use My Location
    </button>
    {loading && <div className="loading">Loading...</div>}
    {error && <div className="error">{error}</div>}
    {weatherData && <WeatherCard weatherData={weatherData} />}
  </div>
);
};

export default App;