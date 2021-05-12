import React from "react";
import Header from "../components/Header";
function HomeNotLogined() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row py-5 mt-5 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="http://localhost:3001/images/logo.png"
              alt="logo"
              className="img-fluid mb-3 d-none d-md-block"
            />
            <h1>Ventura - the application for runners and cyclists</h1>
            <p className="font-italic text-muted mb-0">
              Your workout companion for keeping track of your trainings.
            </p>
          </div>

          <div className="col-md-7 col-lg-6 ml-auto">
            <div className="row">
              <a
                className="btn btn-primary btn-block py-2"
                style={{ background: "#e67373" }}
                href="/register"
              >
                <span className="font-weight-bold">Create an account</span>
              </a>
            </div>
            <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
              <div className="border-bottom w-100 ml-5"></div>
              <span className="px-2 small text-muted font-weight-bold text-muted">
                OR
              </span>
              <div className="border-bottom w-100 mr-5"></div>
            </div>
            <div className="row">
              <a
                className="btn btn-primary btn-block py-2"
                style={{ background: "#e67373" }}
                href="/login"
              >
                <span className="font-weight-bold">Log into your account</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNotLogined;
