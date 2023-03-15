import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import raining from './assets/images/raining.gif';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [currentLocationWeekWeather, setCurrentLocationWeekWeather] = useState(null);
  const [error, setError] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  // function success(position) {
  //   const latitude  = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   // Do something with your latitude and longitude
  // }
  const units = 'metric';
  const key = '6cb2850d4a00966ba4cb83beed931ccc';
  const getUserCoordinates = () => {
    const geolocationAPI = navigator.geolocation;

    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!');
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setLat(coords.latitude);
          setLong(coords.longitude);
        },
        (error) => {
          setError('Something went wrong getting your position!');
        }
      );
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCityName(event.target[0].value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const key = '6cb2850d4a00966ba4cb83beed931ccc';
      const lang = 'en';
      const units = 'metric';
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${key}`;
      // const response = await fetch(url);
      // const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`;
      const responseGeo = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`
      );
      const dataGeo = await responseGeo.json();
      if (!responseGeo.ok) {
        setError("Sorry, but you didn't get any data, try again!");
        setWeatherData(null);
      } else if (responseGeo.ok) {
        setError('');
        // console.log(dataGeo)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${dataGeo[0].name}&units=${units}&lat=${dataGeo[0].lat}&lon=${dataGeo[0].lon}&appid=${key}`
        );
        const data = await response.json();
        setWeatherData(data);
      }
      // const data = await response.json();
      // setWeatherData(data);
    };
    fetchWeatherData();
  }, [cityName]);

  // useEffect(() => {
  //   const fetchCurrentLocationWeather = async () => {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?&units=${units}&lat=${lat}&lon=${long}&appid=${key}`
  //     );
  //     // const response2 = await fetch(
  //     //   `api.openweathermap.org/data/2.5/forecast?&units=${units}&lat=${lat}&lon=${long}&appid=${key}`
  //     // );
  //     const data = await response.json();
  //     // const data2 = await response.json();
  //     // setCurrentLocationWeekWeather(data2);
  //     setCurrentLocationData(data);
  //   };
  //   fetchCurrentLocationWeather();
  // }, [lat, long]);

  // useEffect(() => {
  //   getUserCoordinates();
  // }, []);

  // useEffect(() => {
  //   const key = '6cb2850d4a00966ba4cb83beed931ccc';
  //   const url5days = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${key}`;
  // }, [cityName]);

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  return (
    <div className="container mx-auto my-auto content-center">
      <Navbar cityName={cityName} setCityName={setCityName} handleSubmit={handleSubmit} />
      {weatherData !== null && (
        <Main
          weatherData={weatherData}
          currentLocationData={currentLocationData}
          currentLocationWeekWeather={currentLocationWeekWeather}
          error={error}
        />
      )}
      {/* <img src={raining} /> */}
    </div>
  );
}

export default App;
