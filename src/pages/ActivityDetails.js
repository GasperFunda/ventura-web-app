import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import Cookies from "universal-cookie";
function ActivityDetails() {
  const [activity, setActivity] = useState([]);
  const { id } = useParams();
  const [latitudes, setLatitudes] = useState([]);
  const [longtitudes, setLongtitudes] = useState([]);
  const [elevation, setElevation] = useState([]);
  const [elevationGain, setElevationGain] = useState(0);
  const [startLongtitude, setStartLongtitude] = useState(0);
  const [startLatitude, setStartLatitude] = useState(0);

  const [distance, setDistance] = useState(0);
  const [positions, setPositions] = useState([]);
  const [distInKm, setDistInKm] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [error, setError] = useState("");
  const [pace, setPace] = useState(0);

  useEffect(() => {
    var cookies = new Cookies();
    axios
      .get("https://ventura-project.herokuapp.com/activities/" + id, {
        headers: { "x-auth-token": cookies.get("jwt") },
      })
      .then((res) => {
        setActivity(res.data);
        if (res.data.distance >= 1000) {
          setDistance(res.data.distance / 1000);
          setDistInKm(true);
        } else setDistance(res.data.distance);
        setLatitudes(JSON.parse(res.data.latitude[0]));
        setLongtitudes(JSON.parse(res.data.longtitude[0]));
        setElevation(JSON.parse(res.data.elevation[0]));
        var asd = JSON.parse(res.data.latitude[0]);
        var bsd = JSON.parse(res.data.longtitude[0]);
        var ele = JSON.parse(res.data.elevation[0]);
        setStartLatitude(asd[0]);
        setStartLongtitude(bsd[0]);
        var pos = [];
        for (var i = 0; i < asd.length; i++) {
          pos[i] = [asd[i], bsd[i]];
        }
        setPositions(pos);
        setPace(res.data.elapsed_time / 60 / (res.data.distance / 1000));
        console.log("asd");
        console.log(ele);
        var gain = 0;
        for (var i = 0; i < ele.length - 1; i++) {
          if (ele[i] < ele[i + 1]) {
            var diff = ele[i + 1] - ele[i];
            console.log(diff);
            gain += diff;
          }
        }
        setElevationGain(gain);
      })
      .catch((res) => setError("Something went wrong..."));
  }, []);

  function MapComponent() {
    const map = useMap();
    map.setView({ lat: startLatitude, lng: startLongtitude, zoom: 17 });
    return null;
  }

  return (
    <>
      <Header />
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <div className="container">
        <div className="row py-5 mt-5 ">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <MapContainer
              center={[startLatitude, startLongtitude]}
              zoom={17}
              scrollWheelZoom={true}
              id="123"
            >
              <MapComponent />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {positions !== [] && (
                <Polyline
                  positions={positions}
                  pathOptions={{ color: "#e67373" }}
                />
              )}
            </MapContainer>
          </div>
          <div className="col-md-7 col-lg-6 ml-auto mt-4">
            <div className="row">
              <h1>{activity.title}</h1>
              {!distInKm ? (
                <h4 className="card-text">
                  Distance:{" "}
                  {(Math.round(distance * 100) / 100).toFixed(2) + "m"}
                </h4>
              ) : (
                <h4 className="card-text">
                  Distance:{" "}
                  {(Math.round(distance * 100) / 100).toFixed(2) + "km"}
                </h4>
              )}
              <h4 className="card-text">
                Pace: {(Math.round(pace * 100) / 100).toFixed(2) + "min/km"}
              </h4>
              <h4 className="card-text">
                Elevation gain: {elevationGain + "m"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityDetails;
