import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "./signup.css"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }}, [history]);

  return (<div>
    <div className="ppp">
     <form className="tb-frm" onSubmit={handleSignUp}>
      <h1>Sign up</h1>
     
        <label>
          Email </label>
          <input className="trr" name="email" type="email" placeholder="Email" />
       
        <label>
          Password</label>
          <input className="trr" name="password" type="password" placeholder="Password" />
        
        <button className="btn-2" type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default withRouter(SignUp);
