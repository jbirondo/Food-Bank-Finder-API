
import './App.css';
import HomePage from './Components/Homepage';
import React from 'react';
import mapboxgl from "mapbox-gl";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4193,
      lat: 37.7607,
      zoom: 2,
    };
  }
  componentDidMount(){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      interactive: false,
    });

    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.032, 38.913],
          },
          properties: {
            title: "Mapbox",
            description: "Washington, D.C.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-122.414, 37.776],
          },
          properties: {
            title: "Mapbox",
            description: "San Francisco, California",
          },
        },
      ],
    };
    geojson.features.forEach(function (marker) {
      // create a HTML element for each feature

      // make a marker for each feature and add to the map
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p>"
            )
        )
        .addTo(map);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="Title">Food Bank Finder</header>
        <HomePage />
        <div>
          <div className="sidebarStyle">
            <div>
              Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
              {this.state.zoom}
            </div>
          </div>
          <div
            ref={(el) => (this.mapContainer = el)}
            className="mapContainer"
          />
        </div>
      </div>
    );
  }
}

export default App;
