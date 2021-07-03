import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './register.css';

async function registerUser(credentials) {
 return fetch('https://multi-client-app.herokuapp.com/api/users/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Register({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      email,
      password
    });
    setToken(token);
  }

  return(
      <div id="login-box-register">
      <form onSubmit={handleSubmit} className="register">
    <div className="left-register">
      <h1>Sign In</h1>
      <div className="name-surname">
      <input className="register name" type="text" name="name" placeholder="Name" />
      <input className="register surname" type="text" name="surname" placeholder="Surname" />
      </div>
      <input className="register" type="text" name="phone" placeholder="Phone number" />
      <input className="register" type="text" name="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
      <input className="register" type="text" name="companyname" placeholder="Company name" />
      <input className="register" type="text" name="companyemail" placeholder="Company email" />
      <input className="register" type="text" name="description" placeholder="Company description" />
      <input className="register" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input className="register" type="submit" name="signup_submit" value="Register" />
    </div>
      </form>
    <div className="right-register">
      <span className="loginwith">Sign in with<br />social network</span>
      <button className="social-signin-register facebook">Log in with facebook</button>
      <button className="social-signin-register google">Log in with Google+</button>
      <span className="signup">Already have an account?</span>
      <a className="signup-register" href="/login"> Login!</a>
    </div>
    <div className="or-register">OR</div>
  </div>
  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};
