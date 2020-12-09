import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';
import $ from 'jquery'

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: 94586,
            show_foodbanks: true,
            show_shelters: true,
            foodbanks: [],
            shelters: [],
            isLoading: true,
        }
        this.zipcodeCallback = this.zipcodeCallback.bind(this);
        this.displayFoodbanks = this.displayFoodbanks.bind(this);
        this.displayShelters = this.displayShelters.bind(this);
    }

    componentDidMount() {
        this.fetchData(this.state.zipcode)
        let lat
        let long
        navigator.geolocation.getCurrentPosition((pos) => {
            lat = pos.latitude
            long = pos.longitude
        })
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://us1.locationiq.com/v1/reverse.php?key=pk.d0f854ee46b2834b4db26e99827dfe8b&lat=" + lat + "&lon=" + long + "&format=json",
            "method": "GET"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
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

        if(this.state.isLoading){
            return(
                <div>Loading...</div>
            )
        }
        console.log(this.state.foodbanks)
        return(
            <div>
                <SearchBar change_zip={this.zipcodeCallback}/>
                <div class="body">
                    <Food_Banks show={this.state.show_foodbanks} zipcode={this.state.zipcode} foodbanks={this.state.foodbanks}/>
                    <Shelter show={this.state.show_shelters} zipcode={this.state.zipcode} shelters={this.state.shelters}/>
                    <div class="checkmarks">
                        <input onClick={this.displayFoodbanks} type="checkbox" id="foodbank" />
                        <label for="foodbank">Foodbank</label>
                        <input onClick={this.displayShelters} type="checkbox" id="shelter" />
                        <label for="shelter">Shelter</label>
                    </div>
                </div>
                
            </div>
        )
    }
}