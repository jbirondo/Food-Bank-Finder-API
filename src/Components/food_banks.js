import React from 'react';
import SearchBar from './SearchBar'
import './food_banks.css'

export default class Places extends React.Component{
    render(){
        const arr = this.props.foodbanks;
        const arr_list = arr.map(function (obj) {
            return <li className="list-items" key={obj["Phone"]}>
                        <img alt="" src={obj["Image"]}></img>
                        <div className="item-info">
                            <a href={obj["Link"]}>
                                <div>{obj["Name"]}</div>
                            </a>
                            <div>{obj["Address"]}</div>
                            <div>{obj["Phone"]}</div>
                        </div>
                    </li>
        })
        return(
            <div style={{ visibility: this.props.show ? 'visible' : 'collapse' }}>
                
                <div>Food Banks</div>
                <ul className="list-container">{arr_list}</ul>
            </div>
            
        )
    }
}