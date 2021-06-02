import React, { useEffect } from "react";
import Cookies from "universal-cookie";
function Logout() {
  useEffect(() => {
    var cookies = new Cookies();
    fetch("https://ventura-project.herokuapp.com/users/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const rez = response.json();
      cookies.remove("userId");
      cookies.remove("username");
      cookies.remove("jwt");
      window.location = "/";
    });
  }, []);
  return <></>;
}

export default Logout;
