import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const [error, setError] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });

    if (response.token) {
      setToken(response);
      window.location="/dashboard"
    } else if (response.error) {
      setError(response.error);
      console.log(response.error);
    }
  }

  return(
      <div>
      <div id="login-box">
      <form onSubmit={handleSubmit} >
    <div className="left">
      <h1>Log in</h1>
      <input type="text" name="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
      <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      { error && <label className="error"> {error} </label> }
      <input type="submit" name="signup_submit" value="Log in"/>
    </div>
      </form>
    <div className="right">
      <span className="loginwith">Sign in with<br />social network</span>
      <button className="social-signin facebook">Log in with facebook</button>
      <button className="social-signin google">Log in with Google+</button>
      <span className="signup">Don't have an account?</span>
      <a className="signup-register" href="/register" > Register!</a>

    </div>
    <div className="or">OR</div>
    </div>
  </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
