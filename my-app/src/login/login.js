import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BackdropFilter from "react-backdrop-filter";
import './login.css';

async function loginUser(credentials) {
 return fetch('https://multi-client-app.herokuapp.com/api/users/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
    <div className="container">
    <BackdropFilter
      className="bluredForm"
      filter={"blur(10px) sepia(50%)"}
      canvasFallback={true}
      html2canvasOpts={{
        allowTaint: true}}
      onDraw={() => {
        console.log("Rendered !");
      }}
      >
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit} >
        <label>
          <p>Email</p>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </label>
          <button type="submit">Submit</button>
          <p> Don't have account? </p>
          <a className="register" href="/register"> Register</a>
      </form>
      </BackdropFilter>
      </div>
      <div className="circle1">
    </div>
    <div className="circle2">
    </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
