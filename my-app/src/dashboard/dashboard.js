import React from 'react';
import './dashboard.css';

export default function Dashboard() {
  return(
    <div className="dash">
    <div className="profile-left">
      <div className="profile-picture-left"></div>
      <div className="company-name">Company name</div>
      <div className="saved-posts">
        <div className="saved-name">Saved Posts</div>
        <div className="saved-name">Saved Post1</div>
      </div>
    </div>
    <div id="dash-box">
    <div className="left">
      <div className="profile-picture"></div>
      <div className="message"></div>
      <div className="phone"></div>
    </div>
      <div className="post">
        <div className="post-desc">
        <div className="name">Title</div>
        <div className="description">Description</div>
        <div className="price">3$</div>
        </div>
        <div className="post-image"></div>
      </div>
    </div>
    </div>
  );
}
