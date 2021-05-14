import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import ActivityPreview from "../components/ActivityPreview";
import Header from "../components/Header";

function YourActivities() {
  var cookies = new Cookies();
  const [activities, setActivities] = useState([]);
  const [numActivites, setNumActivities] = useState(0);
  useEffect(() => {
    var id = cookies.get("userId");
    axios
      .get("http://localhost:3000/activities/user" + id)
      .then((response) => {
        setActivities(response);
        setNumActivities(activities.length);
      })
      .catch((response) => console.log(response));
  }, []);
  return (
    <>
      <Header />
      <div className="h-100 d-flex justify-content-center align-items-center">
        {activities.map((activity) => (
          <ActivityPreview key={activity._id} activity={activity} />
        ))}
        {activities == 0 && (
          <div className="container">
            <div className="row py-5 mt-5 align-items-center">
              <div className="row">
                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                  <img
                    src="http://localhost:3001/images/logo.png"
                    alt="logo"
                    className="img-fluid mb-3 d-none d-md-block"
                  />
                </div>

                <h1>You don't have any activities yet.</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default YourActivities;