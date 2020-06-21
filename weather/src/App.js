import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
axios
  .get(
    "https://api.openweathermap.org/data/2.5/onecall?lat=47.608013&lon=-122.335167&appid=67b10bbf46e6fecb07c0365d103c7e1f"
  )
  .then(res => console.log(res));

function App() {
  return (
    <div className="App">
      <h1>Is this cool or what :D</h1>`
    </div>
  );
}

export default App;
