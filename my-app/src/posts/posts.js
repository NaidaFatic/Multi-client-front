import React from "react";

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
          <div id="dash-box">
          <div className="left">
            <div className="profile-picture"></div>
            <div className="message"></div>
            <div className="phone"></div>
          </div>
            <div className="post">
              <div className="post-desc">
              <div className="post-name">{this.props.name}</div>
              <div className="description">{this.props.desc}</div>
              <div className="price">{this.props.price}$</div>
              </div>
              <div className="post-image"></div>
              </div>
              </div>
        )
    }
}
