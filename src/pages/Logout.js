import React, { useEffect } from "react";
import Cookies from "universal-cookie";
function Logout() {
  useEffect(() => {
    var cookies = new Cookies();
    fetch("http://localhost:3001/users/logout", {
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
