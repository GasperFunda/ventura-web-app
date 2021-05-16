import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cookies from "universal-cookie";
function Profile() {
  const [fullname, setFullname] = useState("");
  const [totalActivities, setTotalActivites] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const [totalDistInKm, setTotalDistInKm] = useState(false);
  const [maxDistInKm, setMaxDistInKm] = useState(false);
  useEffect(() => {
    var cookies = new Cookies();
    var id = cookies.get("userId");
    axios.get("http://localhost:3001/activities/profile/" + id).then((res) => {
      console.log(res.data);
      setFullname(
        res.data[0].user.first_name + " " + res.data[0].user.last_name
      );
      var dist = 0;
      var maxDist = 0;
      for (var i = 0; i < res.data.length; i++) {
        dist += res.data[i].distance;
        if (maxDist < res.data[i].distance) maxDist = res.data[i].distance;
      }
      if (dist >= 1000) {
        setTotalDistance(dist / 1000);
        setTotalDistInKm(true);
      } else setTotalDistance(dist);

      if (maxDist >= 1000) {
        setMaxDistance(maxDist / 1000);
        setMaxDistInKm(true);
      } else setMaxDistance(maxDist);

      setTotalActivites(res.data.length);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-5 mt-5 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0 d-flex flex-column align-items-center">
            <img
              src="http://localhost:3001/images/profile.png"
              alt="logo"
              className="img-fluid mb-3 d-none d-md-block w-50"
            />
            <h2>{fullname}</h2>
          </div>
          <div className="col-md-7 col-lg-6 ml-auto">
            <div className="row">
              <h1>Your data:</h1>
              <p
                className="font-italic text-muted mb-0"
                style={{ fontSize: "20px" }}
              >
                Total activities: {totalActivities}
              </p>
              {totalDistInKm ? (
                <p
                  className="font-italic text-muted mb-0"
                  style={{ fontSize: "20px" }}
                >
                  Total distance:{" "}
                  {(Math.round(totalDistance * 100) / 100).toFixed(2)}km
                </p>
              ) : (
                <p
                  className="font-italic text-muted mb-0"
                  style={{ fontSize: "20px" }}
                >
                  Total distance:{" "}
                  {(Math.round(totalDistance * 100) / 100).toFixed(2)}m
                </p>
              )}
              {maxDistInKm ? (
                <p
                  className="font-italic text-muted mb-0"
                  style={{ fontSize: "20px" }}
                >
                  Max distance:{" "}
                  {(Math.round(maxDistance * 100) / 100).toFixed(2)}km
                </p>
              ) : (
                <p
                  className="font-italic text-muted mb-0"
                  style={{ fontSize: "20px" }}
                >
                  Max distance:{" "}
                  {(Math.round(maxDistance * 100) / 100).toFixed(2)}m
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
