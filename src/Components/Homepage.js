import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';
import $ from 'jquery';
import mapboxgl from "mapbox-gl";
import { getDefaultNormalizer } from '@testing-library/react';

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: null,
            show_foodbanks: true,
            show_shelters: true,
            foodbanks: [],
            shelters: [],
            isLoading: true,
        }

        this.zipcodeCallback = this.zipcodeCallback.bind(this);
        this.displayFoodbanks = this.displayFoodbanks.bind(this);
        this.displayShelters = this.displayShelters.bind(this);
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude
            let long = pos.coords.longitude
            
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://us1.locationiq.com/v1/reverse.php?key=pk.d0f854ee46b2834b4db26e99827dfe8b&lat=" + lat + "&lon=" + long + "&format=json",
                "method": "GET"
            }

            $.ajax(settings).done(function (response) {
                if(response){
                    let zip = response.address.postcode
                    localStorage.setItem("zip", zip)
                }
            });
        })
        this.fetchData(localStorage.getItem("zip"))
        this.generateCoords(this.state.foodbanks)
        this.generateCoords(this.state.shelters)
    }

    // componentDidMount() {
    //     this.fetchData(this.state.zipcode);
    //     navigator.geolocation.getCurrentPosition((pos) => {
    //         console.log(pos)
    //     })
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://us1.locationiq.com/v1/search.php?key=pk.d0f854ee46b2834b4db26e99827dfe8b&q=Empire%20State%20Building&format=json",
    //         "method": "GET"
    //     }
    //     $.ajax(settings).done(function (response) {
    //         console.log(response);
    //     });

       

        //map stuff beings
        // const map = new mapboxgl.Map({
        //   container: this.mapContainer,
        //   style: "mapbox://styles/mapbox/streets-v11",
        //   center: [this.state.lng, this.state.lat],
        //   zoom: this.state.zoom,
        //   interactive: false,
        // });

        // var geojson = {
        //   type: "FeatureCollection",
        //   features: [
        //     {
        //       type: "Feature",
        //       geometry: {
        //         type: "Point",
        //         coordinates: [-77.032, 38.913],
        //       },
        //       properties: {
        //         title: "Mapbox",
        //         description: "Washington, D.C.",
        //       },
        //     },
        //     {
        //       type: "Feature",
        //       geometry: {
        //         type: "Point",
        //         coordinates: [-122.414, 37.776],
        //       },
        //       properties: {
        //         title: "Mapbox",
        //         description: "San Francisco, California",
        //       },
        //     },
        //   ],
        // };
        // geojson.features.forEach(function (marker) {
        //   // create a HTML element for each feature

        //   // make a marker for each feature and add to the map
        //   new mapboxgl.Marker()
        //     .setLngLat(marker.geometry.coordinates)
        //     .setPopup(
        //       new mapboxgl.Popup({ offset: 25 }) // add popups
        //         .setHTML(
        //           "<h3>" +
        //             marker.properties.title +
        //             "</h3><p>" +
        //             marker.properties.description +
        //             "</p>"
        //         )
        //     )
        //     .addTo(map);
        // });
    // }

    renderMap(){
        
    }

    zipcodeCallback(new_zipcode){
        this.setState({
            zipcode: new_zipcode,
            isLoading: true
        })
        this.fetchData(new_zipcode)
    }
    displayShelters(){
        if(this.state.show_shelters === true){
            this.setState({show_shelters: false})
        }else{
            this.setState({show_shelters: true })
        }
    }

    displayFoodbanks(){
        if (this.state.show_foodbanks === true) {
            this.setState({show_foodbanks: false })
        } else {
            this.setState({show_foodbanks: true })
        }
    }

    fetchData(zipcode){
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');
        const url = 'https://food-bank-finder-api.herokuapp.com/';
        const self = this;

        fetch(url + zipcode, {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: headers
        }).then(function(response) {
            response.json().then(function(res){
                self.setState({
                    foodbanks: res.food_banks,
                    shelters: res.shelters,
                    isLoading: false,
                    zipcode: zipcode,
                })
            })
        }).catch(function(err){
            self.setState({
                fetchError: err,
            })
        })
    }

    // changeZipCode(event){
    //     //handles change of input in state
    //     console.log(event.target.value);
    //     event.preventDefault();
    //     this.setState({zipcode: event.target.value})
    //     // console.log(this.state.zipcode)
    // }

    // changeArea(){
    //     this.setState({
    //         isLoading: false
    //     })
    //     this.fetchData(this.state.zipcode)
    // }

    generateCoords(array){
        let counter = 0
        let gen = setInterval(() => {
            if(counter < array.length){
                this.coords(array[counter])
                counter++
            } else {
                clearInterval(gen)
                counter = 0
            }
        }, 1000)
    }

    coords(obj){
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://us1.locationiq.com/v1/search.php?key=pk.d0f854ee46b2834b4db26e99827dfe8b&q=" + this.modAddress(obj["Address"]),
                "method": "GET"
            }
            $.ajax(settings).done(function (response) {
                obj["lat"] = $(response).contents().children()[0].attributes[5].value
                obj["long"] = $(response).contents().children()[0].attributes[6].value
            });
    }

    modAddress(string){
        return string.split(" ").join("%20")
    }


    render(){
      // var settings = {
      //     "async": true,
      //     "crossDomain": true,
      //     "url": "https://us1.locationiq.com/v1/search.php?key=pk.d0f854ee46b2834b4db26e99827dfe8b&q=Empire%20State%20Building&format=json",
      //     "method": "GET"
      // }


      // $.ajax(settings).done(function (response) {
      //     console.log(response);
      // });

      //Map here
      
      

      //Map end here

      if (this.state.isLoading) {
        return <div>Loading...</div>;
      }
      return (
        <div>
          <SearchBar change_zip={this.zipcodeCallback} />
          <div class="body">
            <Food_Banks
              show={this.state.show_foodbanks}
              zipcode={this.state.zipcode}
              foodbanks={this.state.foodbanks}
            />
            <Shelter
              show={this.state.show_shelters}
              zipcode={this.state.zipcode}
              shelters={this.state.shelters}
            />
            <div class="checkmarks">
              <input
                onClick={this.displayFoodbanks}
                type="checkbox"
                id="foodbank"
              />
              <label for="foodbank">Foodbank</label>
              <input
                onClick={this.displayShelters}
                type="checkbox"
                id="shelter"
              />
              <label for="shelter">Shelter</label>

            </div>
            {/* <div>
              <div className="sidebarStyle">
                <div>
                  Longitude: {this.state.lng} | Latitude: {this.state.lat} |
                  Zoom: {this.state.zoom}
                </div>
              </div>
              <div ref={this.mapContainer} className="mapContainer" />
            </div> */}
          </div>
        </div>
      );
    }
}