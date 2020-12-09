
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
      zoom: 13,
    };
  }

  
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      // interactive: false
    });

    // https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/

    new mapboxgl.Marker()
      .setLngLat([-122.4193, 37.7607])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML("<h3>" + "hellow" + "</h3><p>" + "sup" + "</p>"))
      .addTo(map);
    
      new mapboxgl.Marker()
        .setLngLat([-122, 37])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<h3>" + "hellow" + "</h3><p>" + "sup" + "</p>")
        )
        .addTo(map);
    
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
// function App() {
//   return (
//     <div className="App">
//       <header className="Title">
//         Food Bank Finder
//       </header>
//       <HomePage />
//     </div>
//   );
// }

export default App;
