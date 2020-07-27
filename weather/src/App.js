import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./App.css";
import sunny from "./images/sunny.png";
import cloudy from "./images/cloudy.png";
import rainy from "./images/rain.png";
import snow from "./images/snow.png";
import tornado from "./images/tornado.png";
import thunder from "./images/thunder.png";
import windy from "./images/windy.png";
// import arrow from "./images/arrow.png";
// import humidity from "./images/humidity.png";
import CircleLoader from "react-spinners/CircleLoader";
const api = {
  key: "67b10bbf46e6fecb07c0365d103c7e1f",
  base: "https://api.openweathermap.org/data/2.5/"
};

const cityData = {
  base: "https://api.openweathermap.org/data/2.5/onecall?"
};

function MyModal(props) {
  const [query, setQuery] = useState("");
  const [coord, setCoord] = useState({ lat: 47.61, lon: -122.33 });
  const setCurrent = props.setCurrent;
  const show = props.setModal;
  const setWeather = props.setWeather;

  async function fetchCoords() {
    const response = await fetch(
      `${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`
    );
    const json = await response.json();
    setCurrent(json);
    setCoord(json.coord);
    setQuery("");
  }
  useEffect(() => {
    if (coord) {
      async function fetchCityData() {
        const response = await fetch(
          `${cityData.base}lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${api.key}`
        );
        const json = await response.json();
        setWeather(json);
      }
      fetchCityData();
    }
    return;
  }, [coord, setWeather]);
  const search = evt => {
    if (evt.key === "Enter") {
      fetchCoords();
      show(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ position: "absolute", background: "white" }}
    >
      <Modal.Header style={{ textAlign: "right" }}>
        <Button
          style={{
            background: "transparent",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            margin: "3px",
            cursor: "pointer"
          }}
          onClick={props.onHide}
        >
          X
        </Button>
      </Modal.Header>
      <Modal.Title
        style={{ fontSize: "1.5rem", textAlign: "center" }}
        id="contained-modal-title-vcenter"
      >
        Choose a city ?
      </Modal.Title>
      <Modal.Body style={{ textAlign: "center", margin: "3rem" }}>
        <input
          style={{
            fontSize: "1rem",
            borderRadius: "25px",
            outline: "none",
            height: "40px",
            textAlign: "center"
          }}
          type="text"
          className="search-box"
          placeholder="Your city here..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </Modal.Body>
    </Modal>
  );
}

function App(props) {
  const [current, setCurrent] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`${api.base}weather?q=Seattle&units=imperial&APPID=${api.key}`)
      .then(res => setCurrent(res.data));
  }, []);

  //curent date builder
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
    // let days = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday"
    // ];

    // let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${date} ${month} ${year}`;
  };
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const day = days[now.getDay()];

  const weatherStatus = current !== null ? current.weather[0].main : null;

  //unix time to future date converter
  const weekDays = unix => {
    const milliseconds = unix * 1000;
    const dateObject = new Date(milliseconds);
    const nextDay = dateObject.toLocaleString("en-US", { weekday: "long" });
    return nextDay;
  };

  //function for weather icon display
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
      case "Drizzle":
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
  console.log(weather);
  const weatherImage = checkWeather(weatherStatus);

  return (
    <>
      {current === null ? (
        <CircleLoader size={150} color={"#123abc"} />
      ) : (
        <div id="particles-js" className="container">
          <div
            className="weather-side"
            style={{ backgroundImage: `url(${weatherImage})` }}
          >
            <div className="weather-gradient"></div>
            <div className="date-container">
              <h2 className="date-dayname">{day}</h2>
              <span className="date-day">{dateBuilder(new Date())}</span>
              <i className="location-icon" data-feather="map-pin"></i>
              <span className="location">
                {current.name}, {current.sys.country}
              </span>
            </div>
            <div className="weather-container">
              <i className="weather-icon" data-feather="sun"></i>
              <h1 className="weather-temp">
                {Math.round(current.main.temp)}°F
              </h1>
              <h3 className="weather-desc">{current.weather[0].main}</h3>
            </div>
          </div>
          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="precipitation">
                  {" "}
                  <span className="title">FEELS LIKE</span>
                  <span className="value">{current.main.feels_like} °F</span>
                  <div className="clear"></div>
                </div>
                <div className="humidity">
                  {" "}
                  <span className="title">HUMIDITY</span>
                  <span className="value">{current.main.humidity} %</span>
                  <div className="clear"></div>
                </div>
                <div className="wind">
                  {" "}
                  <span className="title">WIND</span>
                  <span className="value">{current.wind.speed} mph</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>

            {weather !== null && (
              <div className="week-container">
                <ul className="week-list">
                  <li className="active">
                    <i className="day-icon" data-feather="sun"></i>
                    <span className="day-name">
                      {weekDays(weather.daily[0].dt)}
                    </span>
                    <span className="day-temp">
                      {Math.round(weather.daily[0].temp.day)}°F
                    </span>
                  </li>
                  <li>
                    <i className="day-icon" data-feather="cloud"></i>
                    <span className="day-name">
                      {weekDays(weather.daily[1].dt)}
                    </span>
                    <span className="day-temp">
                      {Math.round(weather.daily[1].temp.day)}°F
                    </span>
                  </li>
                  <li>
                    <i className="day-icon" data-feather="cloud-snow"></i>
                    <span className="day-name">
                      {weekDays(weather.daily[2].dt)}
                    </span>
                    <span className="day-temp">
                      {Math.round(weather.daily[2].temp.day)}°F
                    </span>
                  </li>
                  <li>
                    <i className="day-icon" data-feather="cloud-rain"></i>
                    <span className="day-name">
                      {weekDays(weather.daily[3].dt)}
                    </span>
                    <span className="day-temp">
                      {Math.round(weather.daily[3].temp.day)}°F
                    </span>
                  </li>
                  <div className="clear"></div>
                </ul>
              </div>
            )}

            <div className="location-container">
              <button
                onClick={() => setModalShow(true)}
                className="location-button"
              >
                {" "}
                <i data-feather="map-pin"></i>
                <span>Change location</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <MyModal
        setWeather={setWeather}
        setModal={setModalShow}
        setCurrent={setCurrent}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;
