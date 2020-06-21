import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Card, Modal } from "react-bootstrap";

///////
function App() {
  //this is what opens a popup//
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //
  const [results, setResults] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=47.608013&lon=-122.335167&appid=67b10bbf46e6fecb07c0365d103c7e1f"
      )
      .then(res => setResults(res.data))
      .catch(err => console.log(err));
  }, []);
  console.log(results);
  return (
    <div
      className="App"
      style={{ display: "flex", flexWrap: "wrap", width: "900px" }}
    >
      {!results ? (
        <div>Loading...</div>
      ) : (
        results.daily.map(day => (
          <Card
            style={{ width: "18rem", border: "2px solid red", margin: "20px" }}
          >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                <h3></h3>
              </Card.Text>
              <Button onClick={handleShow} variant="primary">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
