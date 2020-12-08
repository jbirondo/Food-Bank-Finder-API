import React from 'react';
import Places from './Components/places';
import SearchBar from './Components/SearchBar';

export default class Homepage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <SearchBar />
                <Places />
            </div>
        )
    }
}