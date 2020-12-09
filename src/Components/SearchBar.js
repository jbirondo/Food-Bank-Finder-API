import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipcode: "0",
            prev_zipcode: 94586,
            error_message: false,
            type: "",
        }
        this.changeZipCode = this.changeZipCode.bind(this);
        this.changeArea = this.changeArea.bind(this);
    }

    changeZipCode(event) {
        //handles change of input in state
        console.log(event.target.value);
        const x = typeof this.state.zipcode
        this.setState({ zipcode: event.target.value , type: x})
        event.preventDefault();
        // console.log(this.state.zipcode)
    }
    changeArea() {
        // if ((typeof (this.state.zipcode) !== "number")){
            
        // }else{
        //     this.props.change_zip(this.state.zipcode);
        //     this.setState({ prev_zipcode: this.state.zipcode, error_message: false })
        // }
        var counter = true;
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        for (var y = 0; y < this.state.zipcode.length; y++) {
            const letter = this.state.zipcode[y];
            if (!numbers.includes(letter)) {
                this.setState({ error_message: true })
                counter = false;
                break;
            }
        }
        if(counter === true){
            const trial = parseInt(this.state.zipcode, 10);
            if(trial > 9999 && trial < 100000){
                this.props.change_zip(this.state.zipcode);
                this.setState({ prev_zipcode: this.state.zipcode, error_message: false })
            }else{
                this.setState({ error_message: true })
            }
            
        }
        
        
    }

    render(){
        return(
            <div>
                <div>
                    <div>Current zipCode = {this.state.prev_zipcode}</div>
                    <div>State zip: {this.state.zipcode}, {this.state.type}</div>
                    <div>
                        <input value={this.state.zipcode} onChange={this.changeZipCode} type="text" name="zipcode" />
                    </div>
                    <div style={{ visibility: this.state.error_message ? 'visible' : 'collapse' }}>Not a zipCode, please try again</div>
                    <button onClick={this.changeArea}>Change Zip Code</button>

                </div>
            </div>
        )
    }
}