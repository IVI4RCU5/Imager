import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

class LocationMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coordinates: {}
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('component received new props', newProps)
    axios.get('/coordinates', {
      params: {
        location: newProps.location
      }
    })
    .then((response) => {
      console.log('got coordinates', response.data)
      this.setState({coordinates: response.data})
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    console.log('map rendered', this.state.coordinates)
    return (
      <div>
        {this.state.coordinates.lat}, {this.state.coordinates.lng}
      </div>
    )
  }
}

export default LocationMap

// export default GoogleApiWrapper({
//   apiKey: 'insert API Key here'
// })(LocationMap)