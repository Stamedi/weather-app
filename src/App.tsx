import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  // function success(position) {
  //   const latitude  = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   // Do something with your latitude and longitude
  // }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCityName(event.target[0].value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const key = '6cb2850d4a00966ba4cb83beed931ccc';
      const lang = 'en';
      const units = 'metric';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${key}`;
      const response = await fetch(url);
      // const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`;
      // const responseGeo = await fetch(
      //   `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`
      // );
      // const dataGeo = await responseGeo.json();
      // if (!responseGeo.ok) {
      //   setError("Sorry, but you didn't get any data, try again!");
      //   setWeatherData(null);
      // } else if (responseGeo.ok) {
      //   setError('');
      //   // console.log(dataGeo)
      //   const response = await fetch(
      //     `https://api.openweathermap.org/data/2.5/weather?q=${dataGeo[0].name}&units=${units}&lat=${dataGeo[0].lat}&lon=${dataGeo[0].lon}&appid=${key}`
      //   );
      //   const data = await response.json();
      //   setWeatherData(data);
      // }
      const data = await response.json();
      setWeatherData(data);
    };
    fetchWeatherData();
  }, [cityName]);

  useEffect(() => {
    const key = '6cb2850d4a00966ba4cb83beed931ccc';
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${key}`;
  }, [cityName]);

  if ('geolocation' in navigator) {
    console.log('Available');
  } else {
    console.log('Not Available');
  }
  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  return (
    <div className="app-container">
      <Navbar cityName={cityName} setCityName={setCityName} handleSubmit={handleSubmit} />
      {/* <form onSubmit={this.handleSubmit}>
        <input value={cityName} onChange={(e) => setCityName(e.target.value)} type="text" placeholder="Search..." />
        <input type="submit" value="Submit" />
      </form> */}
      {weatherData !== null ? <p>{JSON.stringify(weatherData)}</p> : <p>Search a City</p>}
      <h1>{error}</h1>
      <Main />
    </div>
  );
}

export default App;
