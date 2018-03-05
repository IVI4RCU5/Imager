import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: {
        _id: null,
        url: '',
        title: '',
        location: '',
        description: '',
        comments: [],
        uploadDate: null,
        likes: null,
        tags: []
      },
      input: ''
    }
  }

  componentDidMount() {
    console.log('image component did mount', this.props)
    this.updateInfo()
  }

  updateInfo() {
    axios.get('/details', {
      params: {
        imageId: this.props.match.params.imageId
      }
    })
    .then((response) => {
      console.log('updated image info', response.data[0])
      this.setState({image: response.data[0], input: ''})
    })
    .catch((err) => {
      console.error(err)
    })
  }

  like() {
    axios.post('/likes', {
      imageId: this.state.image._id
    })
    .then((response) => {
      this.updateInfo()
    })
    .catch((err) => {
      console.error(err)
    })
  }

  comment() {
    axios.post('/comments', {
      imageId: this.state.image._id,
      comment: this.state.input
    })
    .then((response) => {
      this.updateInfo()
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    console.log('rendered image', this.state.image)
    return (
      <div>
        <header className="options-bar">
          <nav className="nav-button">
            <Link to="/">
              <button>Home</button>
            </Link>
          </nav>
        </header>
        <section className="image-details">
          <header>{this.state.image.title}</header>
          <figure>
            <img src={this.state.image.url}/>
            <figcaption>{this.state.image.description}</figcaption>
          </figure>
          <div className="tags">Tags: {this.state.image.tags.map((tag, index) => {
              return (
                <div key={index} className="tag">{tag}</div>
              )
            })}</div>
          <div className="likes">
            <div>{this.state.image.likes} likes</div>
            <button onClick={() => {this.like()}}>Like this image</button>
          </div>
        </section>
        <section className="comments-section">
          <header>Comments:</header>
          <div>
            {this.state.image.comments.map((comment, index) => <div key={index} className="comment">{comment}</div>)}
          </div>
          <form>
            <input value={this.state.input} onChange={(event) => {this.setState({input: event.target.value})}}></input>
            <button type="submit" onClick={(event) => {
              event.preventDefault()
              this.comment()
            }}>Add Comment</button>
          </form>
        </section>
        <section className="map">
          <header>Image Location</header>
          <MapContainer location={this.state.image.location}/>
        </section>
      </div>
    )
  }
}

export default Image;