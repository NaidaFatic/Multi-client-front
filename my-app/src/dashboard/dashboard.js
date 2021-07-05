import React, {useState, useEffect} from "react"
import Post from "../posts/posts";
import './dashboard.css';
import fetchData from "../utils/ajax";
import decoded from "../utils/decodeToken";

const useFetch = () => {
    const [user, setUser] = useState(null);
    const [article, setArticle] = useState(null);
    const [articles, setArticles] = useState(null);

    useEffect(()=>{
        async function getData(){
            let decode = await decoded();
            let result = await fetchData("users/"+decode.uid, "GET")
            let retrieved_user = result.data.company_name;
            setUser(retrieved_user);

            let result_article = await fetchData("articles/"+result.data.saved_posts, "GET")
            let retrieved_article = result_article.data;
            setArticle(retrieved_article.name);

            let result_articles = await fetchData("articles/", "GET")
            let retrieved_articles = result_articles.data;
            setArticles(retrieved_articles);
        }
        getData();
    },[1])
    return {user, article, articles}
}

export default function Dashboard() {
  const user  = useFetch();
  const article = useFetch();
  var articles = useFetch();
  console.log(Array.isArray(articles.articles));
  console.log(articles.articles);
  articles.articles.map((item, i) => (console.log(item)));
  return(
    <div className="dash">
    <div className="profile-left">
      <div className="profile-picture-left"></div>
      <div className="company-name">{user.user}</div>
      <div className="saved-posts">
        <div className="saved-name">Saved Posts</div>
        <div className="saved-name">{article.article}</div>
      </div>
    </div>
    <div className="posts">{articles.articles.map((item, i) => (
    <Post name={item.name} desc={item.description} price={item.price} /> ))}
    </div>
    </div>
  );
}
