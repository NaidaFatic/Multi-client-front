import React, {useState, useEffect} from "react"
import Post from "../posts/posts";
import NavBar from "../navbar/navbar";
import './dashboard.css';
import fetchData from "../utils/ajax";
import decoded from "../utils/decodeToken";


class Dashboard extends React.Component{
    state = {
        user_name:null,
        user_surname:null,
        company_name:null,
        article:null,
        posts: []
    }

async componentDidMount() {
    let decode = await decoded();
    let result = await fetchData("users/"+decode.uid, "GET")
    let retrieved_user = result.data;
    let result_article = await fetchData("articles/"+result.data.saved_posts, "GET")
    let retrieved_article = result_article.data;
    let result_articles = await fetchData("articles/", "GET")
    let retrieved_articles = result_articles.data;
    this.setState({user_name:retrieved_user.name, user_surname:retrieved_user.surname, company_name:retrieved_user.company_name ,article:retrieved_article.name, posts: retrieved_articles})
}


 render(){
  this.state.posts.map((item, i) => (console.log(item.user_id)));
  return(
    <div>
    <NavBar/>
    <div className="dash">
    <div className="profile-left">
      <a href="/profile"> <div className="profile-picture-left"></div></a>
      <div className="user-info">
        <div className="company-name">{this.state.user_name}</div>
        <div className="company-name">{this.state.user_surname}</div>
        <div className="company-name">{this.state.company_name}</div>
      </div>
      <div className="saved-posts">
        <div className="saved-name">Saved Posts</div>
        <div className="saved-name">{this.state.article}</div>
      </div>
    </div>
    <div className="posts">{this.state.posts.map((item, i) => (
    <Post key={item._id} name={item.name} desc={item.description} price={item.price} user_id={item.user_id} date={item.date_of_post}/> ))}
    </div>
    </div>
    </div>
  );
 }
}

export default Dashboard;
