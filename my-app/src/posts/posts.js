import React from "react";
import fetchData from "../utils/ajax";
import './posts.css';

export default class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: []
        };
  }

  async componentDidMount(){
        let result_user = await fetchData("users/"+this.props.user_id, "GET")
        let retrieved_user = result_user.data;
        this.setState({user:retrieved_user})
    }

    render(){
      var myStr = this.props.date+" "
      var subStr = myStr.substr(0, 10);
      const user = this.state.user;
      const id = this.props.user_id;
      const url = "/user/"+id;
        return(
          <div id="dash-box">
          <div className="left">
            <a href={url} ><div className="profile-picture"></div></a>
            <div className="user-info">
              <div className="company-name-posts">{user.name}</div>
              <div className="company-name-posts">{user.surname}</div>
              <div className="company-name-posts">{user.company_name}</div>
            </div>
          </div>
            <div className="post">
              <div className="post-desc">
              <div className="post-name">{this.props.name}</div>
              <div className="description">{this.props.desc}</div>
              <div className="date">Date: {subStr}</div>
              <div className="price">{this.props.price}$</div>
              </div>
              <div className="post-image"></div>
              </div>
              </div>
        )
    }
}
