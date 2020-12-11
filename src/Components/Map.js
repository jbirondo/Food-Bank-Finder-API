import React from 'react';
import mapboxgl from "mapbox-gl";


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.4193,
      lat: 37.7607,
      zoom: 10,
    };
  }

  componentDidMount(){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.props.initialCoords,
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
    // console.log(this.createGeoJSON(this.props.foodbanks))
    // this.createGeoJSON(this.props.foodbanks).features.forEach(function (marker) {
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

  createMarkers(){
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.props.initialCoords,
      zoom: this.state.zoom,
      interactive: false,
    });
    this.createGeoJSON(this.props.foodbanks).features.forEach(function (marker) {
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
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
    this.createGeoJSON(this.props.shelters).features.forEach(function (marker) {
      new mapboxgl.Marker({
          color: "#FF0000 "
      })
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
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

  createGeoJSON(array){
    let geojson = {
        type: "FeatureCollection",
        features: [],
    }
    array.forEach(obj => {
        let coords = (obj["Longitude"] && obj["Latitude"]) ? [obj["Longitude"], obj["Latitude"]] : [0, 0]
        let temp = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coords
            },
            properties: {
                title: obj["Address"],
                description: obj["Name"]
            }
        }
        geojson.features.push(temp)
    })
    return geojson
  }

    render() {
        if(!this.props.foodbanks[this.props.foodbanks.length - 1].hasOwnProperty("Longitude")){
            return (
                <div>
                    <div>Loading...</div>
                    <div
                        ref={(el) => (this.mapContainer = el)}
                        className="mapContainer"
                        />
                </div>
            )
        } else {
            console.log(this.props.foodbanks)
            this.createMarkers()
            return (
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
            );
        }
    }
}