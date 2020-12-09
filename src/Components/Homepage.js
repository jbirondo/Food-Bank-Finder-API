import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: 12345,
            show_foodbanks: true,
            show_shelters: true
        }
        this.zipcodeCallback = this.zipcodeCallback.bind(this);
        this.displayFoodbanks = this.displayFoodbanks.bind(this);
        this.displayShelters = this.displayShelters.bind(this);
    }

    zipcodeCallback(new_zipcode){
        this.setState({zipcode: new_zipcode})
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


    render(){
        return(
            <div>
                <SearchBar change_zip={this.zipcodeCallback}/>
                <div class="body">
                    <Food_Banks show={this.state.show_foodbanks} zipcode={this.state.zipcode} />
                    <Shelter show={this.state.show_shelters} zipcode={this.state.zipcode} />
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