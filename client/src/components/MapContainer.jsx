import React from 'react';
import axios from 'axios';
import MapComponent from './Map.jsx'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coordinates: {}
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('container component received new props', newProps)
    // axios.get('/coordinates', {
    //   params: {
    //     location: newProps.location
    //   }
    // })
    // .then((response) => {
    //   console.log('got coordinates', response.data)
    //   this.setState({coordinates: response.data})
    // })
    // .catch((err) => {
    //   console.error(err)
    // })
    this.setState({coordinates: { lat: -34.397, lng: 150.644 }})
  }

  render() {
    if (this.state.coordinates.lat && this.state.coordinates.lng) {
      console.log('map rendered', this.state.coordinates)
      return (
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxaNU0TappofEWv0e7rg-Lfg6bpP7NzCM&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{height: '100%'}}/>}
          containerElement={<div style={{height: '400px', width: '75%', margin: 'auto'}}/>}
          mapElement={<div style={{height: '100%'}}/>}
          coordinates={this.state.coordinates}
        />
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default MapContainer