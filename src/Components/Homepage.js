import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';
import $ from 'jquery';
import Map from './Map'
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
            initialCoords: [-122.4193, 37.7607]
        }

        this.zipcodeCallback = this.zipcodeCallback.bind(this);
        this.displayFoodbanks = this.displayFoodbanks.bind(this);
        this.displayShelters = this.displayShelters.bind(this);
        this.fetchData = this.fetchData.bind(this)
    }

    async componentDidMount() {
        await navigator.geolocation.getCurrentPosition((pos) => {
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

            this.setState({
                initialCoords: [long, lat]
            })

        })
        await this.fetchData(localStorage.getItem("zip"))
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
        console.log(this.state.foodbanks[0])
        console.log(this.state.shelters[0])
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
                obj["Latitude"] = $(response).contents().children()[0].attributes[5].value
                obj["Longitude"] = $(response).contents().children()[0].attributes[6].value
            });
    }

    modAddress(string){
        return string.split(" ").join("%20")
    }


    render(){
      //Map here
      
      

      //Map end here

        if (this.state.isLoading) {
            return <div>Loading...</div>;
        } else {
            this.generateCoords(this.state.foodbanks)
            this.generateCoords(this.state.shelters)
        }
        return (
        <div>
          <SearchBar zip={this.state.zipcode} change_zip={this.zipcodeCallback} />
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
          <div class="body">
            <Food_Banks
              show={this.state.show_foodbanks}
              zipcode={this.state.zipcode}
              foodbanks={this.state.foodbanks}
            />
            <Map 
                initialCoords={this.state.initialCoords}
                foodbanks={this.state.foodbanks}
                shelters={this.state.shelters}
            />
            <Shelter
              show={this.state.show_shelters}
              zipcode={this.state.zipcode}
              shelters={this.state.shelters}
            />
          </div>
        </div>
      );
    }
}