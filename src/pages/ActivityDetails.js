import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import { Line } from "react-chartjs-2";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import Cookies from "universal-cookie";
import * as SignIcons from "../components/trafficSignIcons";
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
  const [trafficSigns, setTrafficSigns] = useState([]);
  const [speedChartData, setSpeedChartData] = useState([]);
  const [elevationChartData, setElevationChartData] = useState([]);
  useEffect(() => {
    var cookies = new Cookies();
    axios
      .get("https://ventura-project.herokuapp.com/activities/" + id, {
        headers: { "x-auth-token": cookies.get("jwt") },
      })
      .then((res) => {
        if (res.data.distance >= 1000) {
          setDistance(res.data.distance / 1000);
          setDistInKm(true);
        } else setDistance(res.data.distance);
        console.log(res.data);
        setLatitudes(JSON.parse(res.data.latitude[0]));
        setLongtitudes(JSON.parse(res.data.longtitude[0]));
        setElevation(JSON.parse(res.data.elevation[0]));
        setSpeed(JSON.parse(res.data.speed[0]));
        var spd = JSON.parse(res.data.speed[0]);
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
        var labels = [];
        for (let i = 0; i < spd.length; i++) {
          labels.push("");
        }

        spd = spd.map((x) => x * 3.6);
        const dataSpeed = {
          labels: labels,
          datasets: [
            {
              label: "Speed",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "rgba(192,75,75,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: spd,
              pointRadius: 0,
            },
          ],
        };
        const dataElevation = {
          labels: labels,
          datasets: [
            {
              label: "Elevation change",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "rgba(75,192,75,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: ele,
              pointRadius: 0,
            },
          ],
        };
        setElevationChartData(dataElevation);
        setSpeedChartData(dataSpeed);
      })
      .catch((res) => setError("Something went wrong..."));
    axios
      .get("https://ventura-project.herokuapp.com/trafficSigns")
      .then((res) => {
        setTrafficSigns(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  function MapComponent() {
    const map = useMap();
    map.setView({ lat: startLatitude, lng: startLongtitude, zoom: 17 });
    trafficSigns.forEach(function (sign) {
      switch (sign.type) {
        case "Bicycle":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.bicycleSign,
          }).addTo(map);
          break;
        case "Stop":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.stopSign,
          }).addTo(map);
          break;
        case "Speed limit - 20":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit20Sign,
          }).addTo(map);
          break;
        case "Speed limit - 30":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit30Sign,
          }).addTo(map);
          break;
        case "Speed limit - 50":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit50Sign,
          }).addTo(map);
          break;
        case "Speed limit - 60":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit60Sign,
          }).addTo(map);
          break;
        case "Speed limit - 70":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit70Sign,
          }).addTo(map);
          break;
        case "Speed limit - 80":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit80Sign,
          }).addTo(map);
          break;
        case "Speed limit - 100":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit100Sign,
          }).addTo(map);
          break;
        case "Speed limit - 120":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedlimit120Sign,
          }).addTo(map);
          break;
        case "No overtaking":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.noOvertakingSign,
          }).addTo(map);
          break;
        case "Crossroad":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.crossroadSign,
          }).addTo(map);
          break;
        case "Priority road":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.priorityRoadSign,
          }).addTo(map);
          break;
        case "Non priority road":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.nonPriorityRoadSign,
          }).addTo(map);
          break;
        case "Forbidden traffic":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.forbiddenTrafficSign,
          }).addTo(map);
          break;
        case "Forbidden for trucks":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.forbiddenForTrucksSign,
          }).addTo(map);
          break;
        case "Forbidden direction":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.forbiddenDirectionSign,
          }).addTo(map);
          break;
        case "Danger":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.dangerSign,
          }).addTo(map);
          break;
        case "Turn left":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.turnLeftSign,
          }).addTo(map);
          break;
        case "Turn right":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.turnRightSign,
          }).addTo(map);
          break;
        case "Wiggly road":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.wigglyRoadSign,
          }).addTo(map);
          break;
        case "Speedbumps":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.speedbumpsSign,
          }).addTo(map);
          break;
        case "Slippery road":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.slipperyRoadSign,
          }).addTo(map);
          break;
        case "Road narrowing":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.roadNarrowingSign,
          }).addTo(map);
          break;
        case "Work on the road":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.workOnTheRoadSign,
          }).addTo(map);
          break;
        case "Semaphore":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.semaphoreSign,
          }).addTo(map);
          break;
        case "Pedestrian warning":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.pedestrianWarningSign,
          }).addTo(map);
          break;
        case "Kids warning":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.kidsWarningSign,
          }).addTo(map);
          break;
        case "Bicycle warning":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.bicycleSign,
          }).addTo(map);
          break;
        case "Snow warning":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.snowWarningSign,
          }).addTo(map);
          break;
        case "Animal warning":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.animalWarningSign,
          }).addTo(map);
          break;
        case "No speed limit":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.noSpeedLimitSign,
          }).addTo(map);
          break;
        case "Must turn right":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.mustTurnRightSign,
          }).addTo(map);
          break;
        case "Must turn left":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.mustTurnLeftSign,
          }).addTo(map);
          break;
        case "Must go straight":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.mustGoStraightSign,
          }).addTo(map);
          break;
        case "Must go straight or right":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.mustGoStraightOrRightSign,
          }).addTo(map);
          break;
        case "Must go straight or left":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.mustGoStraightOrLeftSign,
          }).addTo(map);
          break;
        case "Must drive here right":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.driveHereRightSign,
          }).addTo(map);
          break;
        case "Must drive here left":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.driveHereLeftSign,
          }).addTo(map);
          break;
        case "Roundabout":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.roundaboutSign,
          }).addTo(map);
          break;
        case "Overtaking allowed":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.overtakingAllowedSign,
          }).addTo(map);
          break;
        case "Truck overtaking allowed":
          L.marker([sign.latitude, sign.longtitude], {
            icon: SignIcons.truckOvertakingAllowedSign,
          }).addTo(map);
          break;
        default:
          break;
      }
    });
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
            <h1>{activity.title}</h1>
            {!distInKm ? (
              <h4 className="card-text">
                Distance: {(Math.round(distance * 100) / 100).toFixed(2) + "m"}
              </h4>
            ) : (
              <h4 className="card-text">
                Distance: {(Math.round(distance * 100) / 100).toFixed(2) + "km"}
              </h4>
            )}
            <h4 className="card-text">
              Pace: {(Math.round(pace * 100) / 100).toFixed(2) + "min/km"}
            </h4>
            <h4 className="card-text">
              Elevation gain:{" "}
              {(Math.round(elevationGain * 100) / 100).toFixed(2) + "m"}
            </h4>
          </div>
        </div>
        <div className="row py-5 mt-5 d-flex flex-row">
          <div className="col-md-6 pr-lg-5 mb-5 mb-md-0">
            <h3>Your speed throughout the workout (km/h)</h3>
            <Line
              data={speedChartData}
              options={{
                title: {
                  display: true,
                  text: "Your speed throughout the workout",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
          <div className="col-md-6 ml-auto mt-4">
            <h3>Your elevation change throughout the workout</h3>
            <Line
              data={elevationChartData}
              options={{
                title: {
                  display: true,
                  text: "Your elevation change throughout the workout",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityDetails;
