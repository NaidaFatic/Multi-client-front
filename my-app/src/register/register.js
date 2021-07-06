import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from "../utils/ajax";
import './register.css';

async function registerUser(credentials) {
 return fetchData("users/", "POST", credentials)
}

export default function Register({ setToken }) {
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [company_name, setCompanyName] = useState();
  const [company_email, setCompanyEmail] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await registerUser({
      name, surname, phone, email,
      company_name, company_email,
      description, password
    });

    if (response.token) {
      setToken(response);
      window.location="/dashboard"
    } else if (response.message) {
      setError(response.message);
    }
  }

  return(
      <div id="login-box-register">
        <form onSubmit={handleSubmit} className="register">
          <div className="left-register">
            <h1>Sign In</h1>
            <div className="name-surname">
              <input className="register name" type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required/>
              <input className="register surname" type="text" name="surname" placeholder="Surname" onChange={e => setSurname(e.target.value)} required/>
            </div>
            <input className="register" type="text" name="phone" placeholder="Phone number" onChange={e => setPhone(e.target.value)} required/>
            <input className="register" type="text" name="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required/>
            <input className="register" type="text" name="companyname" placeholder="Company name" onChange={e => setCompanyName(e.target.value)} required/>
            <input className="register" type="text" name="companyemail" placeholder="Company email" onChange={e => setCompanyEmail(e.target.value)} required/>
            <input className="register" type="text" name="description" placeholder="Company description" onChange={e => setDescription(e.target.value)} required/>
            <input className="register" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            <div className="error-div">
              { error && <label className="error"> {error} </label> }
              <input className="register" type="submit" name="signup_submit" value="Register" />
            </div>
          </div>
        </form>
      <div className="right-register">
        <span className="loginwith">Sign in with<br />social network</span>
        <button className="social-signin-register facebook">Log in with facebook</button>
        <button className="social-signin-register google">Log in with Google+</button>
        <span className="signup">Already have an account?</span>
        <a className="signup-register" href="/login" > Login!</a>
      </div>
      <div className="or-register">OR</div>
    </div>
  )
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};
