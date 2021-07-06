import React from "react"
import fetchData from "../utils/ajax";
import Post from "../posts/posts";
import NavBar from "../navbar/navbar";
import './profile.css';
import mail from '../images/Gmail.png';
import phone from '../images/call.png';
import calendar from '../images/googlecalendar.png';
import menu from '../images/Menu.png';
import location from '../images/googlemaps.png';
import fb from '../images/Facebook.png';
import linked from '../images/linkedin.png'
import user_pic from '../images/user.png';


class Profile extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
        user: [],
        posts: [],
        name_of_post: null,
        desc_of_post: null,
        price_of_post:null,
        uid: null,
        id: null
    };

  this.state.id = this.props.match.params.id;
}

async componentDidMount() {
  let result = await fetchData("users/"+this.state.id, "GET")
  let retrieved_user = result.data;
  let result_article = await fetchData("articles/individual/"+this.state.id, "GET")
  let retrieved_article = result_article.data;
  this.setState({user:retrieved_user ,posts:retrieved_article, uid: this.state.id})

}

 render(){
  const user = this.state.user;
  var myStr = user.date_of_start+" "
  var subStr = myStr.substr(0, 10);
   return(
      <div className="profile-wrapper">
      <NavBar/>
      <div className="profile" id="profile">
      <div id="blure">
        <div className="coverPicture">
          <div className="profileProfile"></div>
        </div>
        <div className="profile-dash">
          <div className="left-profile">
            <div className="profile-company-name">{user.company_name}</div>
            <div className="profile-company-description">
              <div className="profile-company-description-text"><div className="desc-image"> <img src={user_pic} alt="logo"/></div> <div className="text-hidden">{user.name+" "+user.surname}</div> <div className="text">Owners Full Name</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={mail} alt="logo"/></div> <div className="text-hidden">{user.company_email}</div> <div className="text">Company E-mail</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={phone} alt="logo"/></div><div className="text-hidden">{user.phone}</div> <div className="text">Phone Number</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={location} alt="logo"/></div><div className="text-hidden">BIH, Sarajevo</div> <div className="text">Location</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={fb} alt="logo"/></div><div className="text-hidden">www.facebook.com</div> <div className="text">Facebook</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={linked} alt="logo"/></div> <div className="text-hidden">www.linkedin.com</div><div className="text">LinkedIn</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={calendar} alt="logo"/></div> <div className="text-hidden">{subStr}</div><div className="text">Date of creating profile</div></div>
              <div className="profile-company-description-text"><div className="desc-image"> <img src={menu} alt="logo"/></div> <div className="text-hidden">{user.description}</div><div className="text">Description</div></div>
            </div>
          </div>
          <div className="right-profile">
            <img src=""className="plus-image"/>
            <div className="profile-company-name" >Articles </div>
            {this.state.posts.map(post => (
            <Post key={post._id} name={post.name} desc={post.description} price={post.price} user_id={this.state.uid} date={post.date_of_post}/>
            ))}
          </div>
         </div>
        </div>
       </div>
      </div>
   );
 }
}

export default Profile;
