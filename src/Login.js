import React, { useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "./login.css"
const Login = ({ history }) => {
  const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
  const handleLogin = useCallback(
    
    async event => {
      event.preventDefault();
      
     
      // const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (<div>
    <div className="ppp">
     <form className="lgn-frm" onSubmit={handleLogin}>
     <h1 className="h1-1"> Login</h1>
        <label>
          Email </label>
          <input className="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        
        <label>
          Password </label>
          <input className="pass" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
        
        <button className="btn-3" type="submit">Log in</button>
    <p className="pa" >If you dont have an account already?</p>
    <div className="signUp-button" onClick={()=>{
       history.push("/signup")
    }}> Sign </div>
    
    <div className="admin"> Admins click here!</div>
     </form>
    </div>
    </div>
  );
};

export default withRouter(Login);
