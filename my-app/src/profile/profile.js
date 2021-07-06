import React from "react"
import './profile.css';
import fetchData from "../utils/ajax";
import decoded from "../utils/decodeToken";
import Post from "../posts/posts";
import mail from '../images/Gmail.png';
import phone from '../images/call.png';
import calendar from '../images/googlecalendar.png';
import menu from '../images/Menu.png';
import location from '../images/googlemaps.png';
import fb from '../images/Facebook.png';
import linked from '../images/linkedin.png';
import plus from '../images/bookmark-plus.png';
import Modal from 'react-modal';
import NavBar from "../navbar/navbar";

Modal.setAppElement('#root');

class Profile extends React.Component{
  constructor () {
    super();
    this.state = {
        user: [],
        posts: [],
        showModal: false,
        name_of_post: null,
        desc_of_post: null,
        price_of_post:null,
        uid: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSaveModal = this.handleSaveModal.bind(this);
  }
    handleOpenModal () {
    this.setState({ showModal: true });
    document.getElementById('blure').style.filter = 'blur(3px)'
  }

  handleCloseModal () {
    this.setState({ showModal: false });
    document.getElementById('blure').style.filter = 'blur(0px)'
  }

  handleSaveModal () {
    this.setState({ showModal: false });
    document.getElementById('blure').style.filter = 'blur(0px)'

    const name = this.state.name_of_post;
    const description = this.state.desc_of_post;
    const price = this.state.price_of_post;
    const user_id = this.state.uid;

    fetchData("articles/", "POST", {name, description, price, user_id});
  }

async componentDidMount() {
    let decode = await decoded();
    let result = await fetchData("users/"+decode.uid, "GET")
    let retrieved_user = result.data;
    let result_article = await fetchData("articles/individual/"+decode.uid, "GET")
    let retrieved_article = result_article.data;
    this.setState({user:retrieved_user ,posts:retrieved_article, uid: decode.uid}  )

}

 render(){
  const user = this.state.user;
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
            <div className="profile-company-description-text"><div className="desc-image"> <img src={mail} alt="logo"/></div> <div className="text-hidden">{user.company_email}</div> <div className="text">Company E-mail</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={phone} alt="logo"/></div><div className="text-hidden">{user.phone}</div> <div className="text">Phone Number</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={location} alt="logo"/></div><div className="text-hidden">BIH, Sarajevo</div> <div className="text">Location</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={fb} alt="logo"/></div><div className="text-hidden">www.facebook.com</div> <div className="text">Facebook</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={linked} alt="logo"/></div> <div className="text-hidden">www.linkedin.com</div><div className="text">LinkedIn</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={calendar} alt="logo"/></div> <div className="text-hidden">{user.date_of_start}</div><div className="text">date_of_start</div></div>
            <div className="profile-company-description-text"><div className="desc-image"> <img src={menu} alt="logo"/></div> <div className="text-hidden">{user.description}</div><div className="text">description</div></div>
          </div>
        </div>
        <div className="right-profile">
          <img src={plus} alt="logo" className="plus-image" onClick={this.handleOpenModal}/>
          <div className="profile-company-name" >Articles </div>
          {this.state.posts.map(post => (
          <Post key={post._id} name={post.name} desc={post.description} price={post.price} />
          ))}
        </div>
      </div>
      </div>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           className="modal"
           overlayClassName="Overlay">
          <p>Post new article</p>
          <form onSubmit={this.handleSaveModal}>
            <input type="text" name="name" placeholder="Name of article" onChange={e => this.setState({name_of_post: e.target.value})}/>
            <input type="text" name="description" placeholder="Description of article" onChange={e => this.setState({desc_of_post: e.target.value})}/>
            <input type="text" name="price" placeholder="Price of article" onChange={e => this.setState({price_of_post: e.target.value})}/>
            <div className="buttons">
              <button type="button" onClick={this.handleCloseModal}>Close</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </Modal>
    </div>
    </div>
  );
 }
}

export default Profile;
