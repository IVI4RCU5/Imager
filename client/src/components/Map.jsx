import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const MapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap defaultZoom={15} defaultCenter={props.coordinates}>
    {props.isMarkerShown && <Marker position={props.coordinates}/>}
  </GoogleMap>
)))

export default MapComponent