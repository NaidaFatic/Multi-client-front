import React from 'react';
import dash from '../images/dash.png';
import profile from '../images/avatar.png';
import logout from '../images/logout.png';
import './navbar.css';

async function logoutUser() {
  sessionStorage.removeItem("token");
}

export default function NavBar() {
  const logoutF = async e => {
    const response = await logoutUser();
  }

  return(
      <div>
         <div className="navbar">
            <div className="dash-navbar"><a href="/dashboard"><img src={dash} alt="logo"/></a></div>
            <div className="pofile"><a href="/profile"><img src={profile} alt="logo"/></a></div>
            <div className="logo-navbar"><a href="/dashboard">MyShop</a></div>
            <div className="logout"  onClick={logoutF}><a href="/login"><img src={logout} alt="logo"/></a></div>
         </div>
      </div>
  )
}
