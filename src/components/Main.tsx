import React from 'react';
import '../App.css';
import snow from '../assets/images/snow.gif';
import rain from '../assets/images/rain.gif';
import fog from '../assets/images/fog.gif';
import clouds from '../assets/images/clouds.gif';
import thunder from '../assets/images/thunder.gif';
import sun from '../assets/images/sun.gif';

const Main = ({ weatherData, currentLocationData, currentLocationWeekWeather, error }: any) => {
  const windKmh = weatherData.wind.speed * 3.6;

  const { main } = weatherData.weather[0];
  const { getName } = require('country-list');
  return (
    <main className="container mx-auto content-center">
      {/* style={{ textShadow: '0 0 2px black' }} */}
      {weatherData !== null && (
        <section className="relative mx-auto content-center text-light text-shadow text-center">
          <img
            className="absolute"
            src={
              main === 'Clouds'
                ? clouds
                : main === 'Thunderstorm'
                ? thunder
                : main === 'Rain'
                ? rain
                : main === 'Snow'
                ? snow
                : main === 'Fog'
                ? fog
                : main === 'Clear'
                ? sun
                : rain
            }
            alt=""
          />
          <h2 className="text-4xl text-center relative ">
            Current Weather for {weatherData.name}, {getName(weatherData.sys.country)}
          </h2>
          <h4 className="text-lg relative">Current Temperature: {Math.round(weatherData.main.temp)}°</h4>
          <h4 className="text-lg relative">
            Feels like: <span>{Math.round(weatherData.main.feels_like)}°</span>
          </h4>
          <h4 className="text-lg relative">Weather Type: {main}</h4>
          <h4 className="text-lg relative">
            Wind Speed: <span className="text-base relative">{Math.round(windKmh)} km/h</span>
          </h4>
        </section>
      )}
      <h1 className=" font-bold underline">{error}</h1>
      {currentLocationData !== null && (
        <section className="current-location-weather">
          <h2 className="text-2xl beige">Current Location Weather</h2>
          <h3 className="text-lg">Location Name: {currentLocationData.name}</h3>
          <h3 className="text-lg">Location Country: {getName(currentLocationData.sys.country)}</h3>
          <h4 className="text-lg">Current Temperature: {Math.round(currentLocationData.main.temp)}</h4>
          <h4 className="text-lg">
            Feels like: <span>{Math.round(currentLocationData.main.feels_like)}</span>
          </h4>
          <h4 className="text-lg">Weather Type: {currentLocationData.weather[0].main}</h4>
          <h4 className="text-lg">
            Wind Speed: <span className="text-base">{currentLocationData.wind.speed * 3.6} km/h</span>
          </h4>
        </section>
      )}
    </main>
  );
};

export default Main;
