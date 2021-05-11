import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact>
          <Home />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
