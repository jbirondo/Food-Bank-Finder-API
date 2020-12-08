import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: "",
            prev_zipcode: 94586
        }
        this.changeZipCode = this.changeZipCode.bind(this);
        this.changeArea = this.changeArea.bind(this);
    }

    changeZipCode(event) {
        //handles change of input in state
        console.log(event.target.value);
        this.setState({ zipcode: event.target.value })
        event.preventDefault();
        // console.log(this.state.zipcode)
    }
    changeArea() {
        this.props.change_zip(this.state.zipcode);
        this.setState({ prev_zipcode: this.state.zipcode })
    }

    render(){
        return(
            <div>
                <div>
                    <div>Current zipCode = {this.state.prev_zipcode}</div>
                    <div>
                        <input value={this.state.zipcode} onChange={this.changeZipCode} type="text" name="zipcode" />
                    </div>
                    <button onClick={this.changeArea}>Change Zip Code</button>

                </div>
            </div>
        )
    }
}