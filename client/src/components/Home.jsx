import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      input: '',
      onDisplay: [],
      sortingMetric: 'likes'
    }
  }

  componentDidMount() {
    axios.get('/images')
    .then((response) => {
      this.setState({images: response.data, onDisplay: response.data})
    })
    .catch((err) => {
      console.error(err)
    })
  }

  order() {
    if (this.state.sortingMetric === 'likes') {
      return this.state.onDisplay.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1
        } else if (a.likes < b.likes) {
          return 1
        } else {
          return 0
        }
      })
    } else if (this.state.sortingMetric === 'comments') {
      return this.state.onDisplay.sort((a, b) => {
        if (a.comments.length > b.comments.length) {
          return -1
        } else if (a.comments.length < b.comments.length) {
          return 1
        } else {
          return 0
        }
      })
    } else if (this.state.sortingMetric === 'date') {
      return this.state.onDisplay.sort((a, b) => {
        let date1 = new Date(a.uploadDate)
        let date2 = new Date(b.uploadDate)
        if (date1.getTime() > date2.getTime()) {
          return -1
        } else if (date1.getTime() < date2.getTime()) {
          return 1
        } else {
          return 0
        }
      })
    }
  }

  render() {
    return (
      <div>

        <header className="options-bar">
          <div className="order-dropdown">
            <div>Order by</div>
            <select onChange={(event) => this.setState({sortingMetric: event.target.value})}>
              <option value="likes">Most Liked</option>
              <option value="comments">Most Commented</option>
              <option value="date">Newest</option>
            </select>
          </div>

          <form className="filter-form">
            <input value={this.state.input} onChange={(event) => {this.setState({input: event.target.value})}}></input>
            <button type="submit" onClick={(event) => {
              event.preventDefault()
              this.setState({
                onDisplay: this.state.images.filter((image) => {
                  return image.tags.includes(this.state.input.toLowerCase())
                })
              })
            }}>Filter by tag</button>
            <button type="submit" onClick={(event) => {
              event.preventDefault()
              this.setState({onDisplay: this.state.images})
            }}>Clear Filter</button>
          </form>
          
          <nav className="nav-button">
            <Link to="/submit">
              <button>Post a photo!</button>
            </Link>
          </nav>
        </header>

        <main className="image-board">
          {this.order().map((image) => {
            return (
              <Link key={image._id} to={`/images/${image._id}`}>
                <figure className="thumbnail">
                  <img src={`${image.url}`}/>
                  <figcaption>{image.title}</figcaption>
                </figure>
              </Link>
            )
          })}
        </main>

      </div>
    )
  }
}

export default Home;