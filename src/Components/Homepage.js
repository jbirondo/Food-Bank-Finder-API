import React from 'react';
import Food_Banks from './food_banks';
import SearchBar from './SearchBar';
import Shelter from './shelter';

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: 12345
        }
        this.zipcodeCallback = this.zipcodeCallback.bind(this);
    }

    zipcodeCallback(new_zipcode){
        this.setState({zipcode: new_zipcode})
    }

    render(){
        return(
            <div>
                <SearchBar change_zip={this.zipcodeCallback}/>
                <div class="body">
                    <Food_Banks zipcode={this.state.zipcode} />
                    <Shelter zipcode={this.state.zipcode} />
                    <div>
                        <input type="checkbox" id="foodbank"/>
                        <label for="foodbank">Foodbank</label>
                        <input type="checkbox" id="shelter" />
                        <label for="shelter">Shelter</label>
                    </div>
                </div>
                
            </div>
        )
    }
}