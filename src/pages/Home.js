import React from "react";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-5 mt-5 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="http://localhost:3001/images/phone.jpg"
              alt="logo"
              className="img-fluid mb-3 d-none d-md-block w-50"
            />
          </div>
          <div className="col-md-7 col-lg-6 ml-auto">
            <div className="row">
              <h1>Ventura - the application for runners and cyclists</h1>
              <p className="font-italic text-muted mb-0">
                Download the phone application to start monitoring your
                workouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
