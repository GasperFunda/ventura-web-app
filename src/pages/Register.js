import React, { useState } from "react";
import Header from "../components/Header";

function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    if (
      username !== "" ||
      firstname !== "" ||
      lastname !== "" ||
      password !== "" ||
      email !== "" ||
      passwordConfirmation !== ""
    ) {
      if (password === passwordConfirmation) {
        var formData = {
          username,
          first_name: firstname,
          last_name: lastname,
          password,
          email,
        };
      } else {
        setError("The passwords do not match!");
      }
    } else {
      setError("You have not entered all the data!");
    }
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img
              src="logo.png"
              alt=""
              className="img-fluid mb-3 d-none d-md-block"
            />
            <h1>Create an Account</h1>
            <p className="font-italic text-muted mb-0">
              Create an account to start monitoring your workouts with the
              Ventura app.
            </p>
          </div>

          <div className="col-md-7 col-lg-6 ml-auto">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-address-card text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Username"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setUsername(e)}
                  />
                </div>
                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-user text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setFirstname(e)}
                  />
                </div>

                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-user text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setLastname(e)}
                  />
                </div>

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
                    onChange={(e) => setEmail(e)}
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
                    onChange={(e) => setPassword(e)}
                  />
                </div>

                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0 p-3">
                      <i className="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    className="form-control bg-white border-left-0 border-md"
                    onChange={(e) => setPasswordConfirmation(e)}
                  />
                </div>

                <div className="form-group col-lg-12 mx-auto mb-0">
                  <button
                    className="btn btn-primary btn-block py-2"
                    type="submit"
                    style={{ background: "#e67373" }}
                  >
                    <span className="font-weight-bold">
                      Create your account
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
                    Already Registered?{" "}
                    <a href="/login" className="text-primary ml-2">
                      Login
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

export default Register;
