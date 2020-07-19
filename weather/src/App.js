import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./App.css";
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rain.png";

const api = {
  key: "67b10bbf46e6fecb07c0365d103c7e1f",
  base: "https://api.openweathermap.org/data/2.5/"
};
//new code
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
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
          <Card.Text>
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

    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main style={{ textAlign: "center", marginTop: "200px" }}>
        <div className="search-box">
          <input
            type="text"
            style={{ fontSize: "2rem" }}
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}

              </div>
            </div>
          </Card.Text>
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
                  <div className="temp">{Math.round(weather.main.temp)}°c</div>
                  <div className="weather">{weather.weather[0].main}</div>
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
