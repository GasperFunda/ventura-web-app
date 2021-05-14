import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeNotLogined from "./pages/HomeNotLogined";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Cookies from "universal-cookie";
import Home from "./pages/Home";
import YourActivities from "./pages/YourActivities";
import ActivityDetails from "./pages/ActivityDetails";
function App() {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    var cookies = new Cookies();
    var id = cookies.get("userId");
    if (id) {
      setIsLogined(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact>
          {!isLogined ? <HomeNotLogined /> : <Home />}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/yourActivities" exact>
          <YourActivities />
        </Route>
        <Route path="/activities/:id">
          <ActivityDetails />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
