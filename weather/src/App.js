import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./App.css";
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rain.png";
import snow from "./images/snow.png";
import tornado from "./images/tornado.png";
import thunder from "./images/thunder.png";
import windy from "./images/windy.png";
import arrow from "./images/arrow.png";
import humidity from "./images/humidity.png";
const api = {
  key: "67b10bbf46e6fecb07c0365d103c7e1f",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  console.log(weather);

  const weatherStatus =
    typeof weather.main != "undefined" ? weather.weather[0].main : null;

  let checkWeather = name => {
    switch (name) {
      case "Clear":
        return sunny;
        break;
      case "Clouds":
        return cloudy;
        break;
      case "Rain":
        return rainy;
        break;
      case "Snow":
        return snow;
        break;
      case "Thunderstorm":
        return thunder;
        break;
      case "Windy":
        return windy;
        break;
      case "Tornado":
        return tornado;
        break;
      default:
        return;
    }
  };

  return (
    <div id="container" style={{ display: "flex", height: "100vh" }}>
      <Card
        style={{
          width: "28rem",
          textAlign: "center",
          margin: "0 auto",
          paddingTop: "5rem"
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "2rem" }}>Choose a city ?</Card.Title>
          <div className="container">
            <div class="search-box">
              <input
                type="text"
                className="search-box"
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
              <span></span>
            </div>
          </div>
          <Card.Text>
            {typeof weather.main != "undefined" ? (
              <div
                style={{
                  marginTop: "5rem",
                  fontSize: "1rem",
                  fontWeight: "bolder"
                }}
              >
                <div className="location-box">
                  <Card.Img
                    style={{ width: "200px" }}
                    src={checkWeather(weatherStatus)}
                  />
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°F | feels like{" "}
                    {weather.main.feels_like}
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                  <div>
                    <img style={{ width: "10px" }} src={arrow} />{" "}
                    {weather.main.temp_max} °F
                  </div>
                  <div>
                    <img
                      style={{ width: "10px", transform: "rotate(180deg)" }}
                      src={arrow}
                    />{" "}
                    {weather.main.temp_min} °F
                  </div>
                  <div>
                    <img style={{ width: "30px" }} src={humidity} />
                    {weather.main.humidity}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
