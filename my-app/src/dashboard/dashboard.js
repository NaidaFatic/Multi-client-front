
import React from "react";
import "./dashboard.css";
import Post from "../posts/posts";

class Dashboard extends React.Component{
  state = {
      loading:true,
      posts: []
  }

  async componentDidMount() {
      const url="http://localhost:8080/api/articles/";
      const response = await fetch(url);
      const results = await response.json();
      this.setState({posts: results.data, loading:false})
  }

  componentWillUnmount() {
  }

  render(){
      return(
          <div className="dashboard">
              {this.state.loading || !this.state.posts?
              <div>Loading...</div>:

              <div>{this.state.posts.map(post => (
                  <Post key={post._id} name={post.name} cost={post.cost} description={post.description} state={post.state} product_picture={post.image_url} />
              ))}

              </div>}
          </div>
      )
  }
}

export default Dashboard;
