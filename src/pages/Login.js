import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Cookies from "universal-cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    if (email !== "" || password !== "") {
      var formData = { email: email, password: password };
      console.log(formData);
      axios
        .post("https://ventura-project.herokuapp.com/users/login", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const cookies = new Cookies();
          console.log(res.data);
          cookies.set("userId", res.data._doc._id);
          cookies.set("email", res.data._doc.email);
          cookies.set("jwt", res.data.jwt);
          console.log(cookies.get("userId"));
          window.location = "/";
        })
        .catch((res) => setError(res.message));
    } else {
      setError("You have not entered all the data!");
    }
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-5 mt-5 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="https://ventura-project.herokuapp.com/images/logo.png"
              alt="logo"
              className="img-fluid mb-3 d-none d-md-block"
            />
            <h1>Log into your account</h1>
            <p className="font-italic text-muted mb-0">
              Log into your account to see the statistics of your workouts.
            </p>
          </div>

          <div className="col-md-7 col-lg-6 ml-auto">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-envelope text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group col-lg-12 mx-auto mb-0">
                  <button
                    className="btn btn-primary btn-block py-2"
                    type="submit"
                    style={{ background: "#e67373" }}
                  >
                    <span className="font-weight-bold">
                      Log into your account
                    </span>
                  </button>
                </div>

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                  <div className="border-bottom w-100 ml-5"></div>
                  <span className="px-2 small text-muted font-weight-bold text-muted">
                    OR
                  </span>
                  <div className="border-bottom w-100 mr-5"></div>
                </div>
                <div className="text-center w-100" style={{ color: "red" }}>
                  {error}
                </div>
                <div className="text-center w-100">
                  <p className="text-muted font-weight-bold">
                    Don't have an account yet?{" "}
                    <a href="/register" className="text-primary ml-2">
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
