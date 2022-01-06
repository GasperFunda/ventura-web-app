import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Compass from "../components/Compass";
import "react-compass/dist/react-compass.css";
import axios from "axios";

function CompassPage() {
  const [degrees, setDegrees] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get("https://ventura-project.herokuapp.com/compass").then((res) => {
        if (res.data) {
          setDegrees(res.data.yaw);
        }
      });
    }, 250);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
        }}
      >
        <Compass direction={degrees} />
      </div>
    </>
  );
}
export default CompassPage;
