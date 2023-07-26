import Image from "next/image";
import { withRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const WeatherUI = ({ weatherData }) => {
  // Rotate the arrow based on the wind direction
  const arrowStyling = {
    filter: "invert(100%)",
    transform:
      weatherData &&
      weatherData.wind &&
      typeof weatherData.wind.deg !== "undefined"
        ? `rotate(${weatherData.wind.deg}deg)`
        : "rotate(0deg)",
  };

  return (
    <>
      {/* Temperature*/}
      <div className="temp-container">
        <h1 className="temp-header">{Math.trunc(weatherData.main.temp)}°C</h1>
        <div className="temp-header-2">
          Feels like{" "}
          <h2 className="temp-header-3">
            {Math.trunc(weatherData.main.feels_like)}°C{" "}
          </h2>
        </div>
      </div>

      {/* Weather icon */}
      <div className="weather-container">
        <Image
          className="weather-image"
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="/"
          width="200"
          height="200"
        />
        <h1 className="weather-header">
          {weatherData.weather[0].description.toUpperCase()}
        </h1>
      </div>

      {/* Wind direction arrow */}
      <div className="wind-container-parent">
        <div className="wind-container-parent-child">
          <div className="wind-container">
            <div className="wind-container-child-1">
              <h1 className="wind-header">
                Winds: {weatherData.wind.speed} kph
              </h1>
              <br />
              <Image
                className="wind-image"
                src="https://icon-library.com/images/google-maps-arrow-icon/google-maps-arrow-icon-28.jpg"
                width={100}
                height={100}
                alt="arrow"
                style={arrowStyling}
              />
            </div>

            {/* Misolaneous */}
            <div className="wind-container-child-2">
              <h2 className="misc-header">
                Humidity: {weatherData.main.humidity}%
              </h2>
              <h2 className="misc-header-2">
                Min: {weatherData.main.temp_min}°C
              </h2>
              <h2 className="misc-header-3">
                Max: {weatherData.main.temp_max}°C
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherUI;
