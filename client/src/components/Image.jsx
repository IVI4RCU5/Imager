import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LocationMap from './Map.jsx';

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
      console.log('updated info', response.data[0])
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
        <div>{this.state.image.title}</div>
        <img src={this.state.image.url}/>
        <div>{this.state.image.description}</div>
        <div>{this.state.image.likes} likes</div>
        <button onClick={() => {this.like()}}>Like this image</button>
        <div>Comments:</div>
        <div>
          {this.state.image.comments.map((comment, index) => <div key={index}>{comment}</div>)}
        </div>
        <form>
          <input value={this.state.input} onChange={(event) => {this.setState({input: event.target.value})}}></input>
          <button type="submit" onClick={(event) => {
            event.preventDefault()
            this.comment()
          }}>Add Comment</button>
        </form>
        <LocationMap location={this.state.image.location}/>
        <div>Tags: {this.state.image.tags.join(', ')}</div>
      </div>
    )
  }
}

export default Image;