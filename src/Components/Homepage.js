import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';
import $ from 'jquery'

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
        if(this.state.isLoading){
            return(
                <div>Loading...</div>
            )
        }
        return(
            <div>
                <SearchBar zip={this.state.zipcode} change_zip={this.zipcodeCallback}/>
                <div className="body">
                    <Food_Banks show={this.state.show_foodbanks} zipcode={this.state.zipcode} foodbanks={this.state.foodbanks}/>
                    <Shelter show={this.state.show_shelters} zipcode={this.state.zipcode} shelters={this.state.shelters}/>
                    <div className="checkmarks">
                        <input onClick={this.displayFoodbanks} type="checkbox" id="foodbank" />
                        <label htmlFor="foodbank">Foodbank</label>
                        <input onClick={this.displayShelters} type="checkbox" id="shelter" />
                        <label htmlFor="shelter">Shelter</label>
                    </div>
                </div>
                
            </div>
        )
    }
}