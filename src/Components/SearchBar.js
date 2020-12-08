import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: 94586
        }
    }

    render(){
        return(
            <div>
                This is where searchbar will be
            </div>
        )
    }
}