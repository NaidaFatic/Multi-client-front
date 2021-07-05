import React, {useState, useEffect} from "react"
import Post from "../posts/posts";
import './dashboard.css';
import fetchData from "../utils/ajax";
import decoded from "../utils/decodeToken";


class Dashboard extends React.Component{
    state = {
        user:null,
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
    this.setState({user:retrieved_user.company_name ,article:retrieved_article.name, posts: retrieved_articles}  )
}


 render(){
  console.log(this.state.posts);
  this.state.posts.map((item, i) => (console.log(item)));
  return(
    <div className="dash">
    <div className="profile-left">
      <div className="profile-picture-left"></div>
      <div className="company-name">{this.state.user}</div>
      <div className="saved-posts">
        <div className="saved-name">Saved Posts</div>
        <div className="saved-name">{this.state.article}</div>
      </div>
    </div>
    <div className="posts">{this.state.posts.map((item, i) => (
    <Post key={item._id} name={item.name} desc={item.description} price={item.price} /> ))}
    </div>
    </div>
  );
 }
}

export default Dashboard;
