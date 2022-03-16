import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Nike from "./Nike";
import AdminPanel from "./AdminPanel";
import Cart from "./Cart";
import Adidas from "./Adidas";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/Nike" component={Nike}/>
          <Route exact path="/AdminPanel" component={AdminPanel}/>
          <Route exact path="/Cart" component={Cart}/>
           <Route exact path="/Adidas" component={Adidas}/>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
