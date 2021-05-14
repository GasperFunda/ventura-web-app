import React, { useState, useEffect } from "react";

function ActivityPreview(props) {
  const [distance, setDistance] = useState(0.0);
  const [distInKm, setDistInKm] = useState(false);
  const [iconPath, setIconPath] = useState("");
  useEffect(() => {
    console.log(props);
    if (props.activity.distance >= 1000) {
      setDistance(props.distance / 1000);
      setDistInKm(true);
    } else setDistance(props.activity.distance);

    if (props.activity.type === "Running") {
      setIconPath("/images/running.png");
    } else if (props.activity.type === "Walking") {
      setIconPath("/images/walking.png");
    } else if (props.activity.type === "Hiking") {
      setIconPath("/images/hiking.png");
    } else {
      setIconPath("/images/cycling.png");
    }
  }, []);
  return (
    <>
      <div className="card mt-5" style={{ width: "80%" }}>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <img
              className="card-img w-100"
              src={"http://localhost:3001/" + iconPath}
              alt="Suresh Dasari Card"
            />
          </div>
          <div className="col-sm-7">
            <div className="card-body">
              <h5 className="card-title">{props.activity.title}</h5>
              {!distInKm ? (
                <p className="card-text">
                  Distance:{" "}
                  {(Math.round(distance * 100) / 100).toFixed(2) + "m"}
                </p>
              ) : (
                <p className="card-text">
                  Distance:{" "}
                  {(Math.round(distance * 100) / 100).toFixed(2) + "km"}
                </p>
              )}
              <a
                href={"/activities/" + props.activity._id}
                className="btn"
                style={{ background: "#e67373" }}
              >
                View details
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityPreview;
