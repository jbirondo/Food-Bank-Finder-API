import React from 'react';
import Places from './places';
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
                <Places zipcode={this.state.zipcode}/>
                <Shelter zipcode={this.state.zipcode}/>
            </div>
        )
    }
}