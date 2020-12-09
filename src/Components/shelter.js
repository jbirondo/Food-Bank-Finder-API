import React from 'react';
import './food_banks.css'

export default class Shelter extends React.Component{
    render(){
        const arr = this.props.shelters;
        const arr_list = arr.map(function (obj) {
            return <li className="list-items">
                        <img alt="" src={obj["Image"]}></img>
                        <div className="item-info">
                            <div>{obj["Name"]}</div>
                            <div>{obj["Address"]}</div>
                            <div>{obj["Phone"]}</div>
                        </div>
                    </li>
        })
        return (
            <div style={{ visibility: this.props.show ? 'visible' : 'collapse' }}>

                <div>Shelters</div>
                <ul>{arr_list}</ul>
            </div>

        )
    }

}