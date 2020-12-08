import React from 'react';
import Places from './places';
import SearchBar from './SearchBar';

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