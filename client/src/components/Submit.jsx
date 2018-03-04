import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: '',
      title: '',
      location: '',
      description: '',
      input: '',
      tags: []
    }
  }

  post() {
    console.log('post request sent', new Date())
    axios.post('/images', {
      url: this.state.link,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      comments: [],
      uploadDate: new Date(),
      likes: 0,
      tags: this.state.tags
    })
    .then((response) => {
      console.log('it worked!')
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <form>
          <div>Link:</div>
          <input value={this.state.link} onChange={(event) => {this.setState({link: event.target.value})}}></input>
          <div>Title:</div>
          <input value={this.state.title} onChange={(event) => {this.setState({title: event.target.value})}}></input>
          <div>Location:</div>
          <input value={this.state.location} onChange={(event) => {this.setState({location: event.target.value})}}></input>
          <div>Description:</div>
          <input value={this.state.description} onChange={(event) => {this.setState({description: event.target.value})}}></input>
          <div>
            <div>Tags</div>
            <input value={this.state.input} onChange={(event) => {this.setState({input: event.target.value})}}></input>
            <button type="submit" onClick={(event) => {
              event.preventDefault()
              this.setState({tags: this.state.tags.concat([this.state.input]), input: ''})
            }}>Add Tag</button>
            {this.state.tags.map((tag, index) => {
              return (
                <div key={index}>{tag}</div>
              )
            })}
          </div>
          <button type="submit" onClick={(event) => {
            event.preventDefault()
            this.post()
          }}>Post</button>
        </form>
      </div>
    )
  }
}

export default Submit;