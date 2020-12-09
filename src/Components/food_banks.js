import React from 'react';
import SearchBar from './SearchBar'

export default class Places extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prev_zipcode: 94588,
            zipcode: "",
            obj: { "Data": [{ "Address": "5776 Stoneridge Mall Road, Suite 200 Pleasanton, CA - 94588", "Image": "https://www.freefood.org/gallery/34205_1598032582.png", "Name": "Valley Pregnancy Center (VPC) - Dublin", "Phone": "(925) 425-0414" }, { "Address": "4444 East Ave Livermore, CA - 94550", "Image": "https://www.freefood.org/gallery/34262_ca_dublin_open-heart-kitchen_zmf.png", "Name": "Open Heart Kitchen Robert Livermore Community Center", "Phone": "(925) 500-8241" }, { "Address": "380 Elmhurst Street Hayward, CA - 94544", "Image": "https://www.freefood.org/gallery/34204_1591272263.png", "Name": "Community of Grace - Hayward", "Phone": "(510) 783-8062" }, { "Address": "27287 Patrick Ave. Hayward, CA - 94544", "Image": "https://www.freefood.org/gallery/33758_ca_hayward_south-hayward-parish_nee.fna&oh=26997800aa6486a10e9f686f0b15b953&oe=5EBB3D5E", "Name": "South Hayward Parish - Emergency Food Pantry", "Phone": "(510) 785-3663" }, { "Address": "712 Blossom Way Hayward, CA - 94541", "Image": "https://www.freefood.org/gallery/1012_zhjmeyzo.png", "Name": "Alameda County Community Food Bank", "Phone": "(510) 635-3663" }, { "Address": "1265 B Street Hayward, CA - 94541", "Image": "https://www.freefood.org/gallery/34245_1591615867.png", "Name": "New Life Christian Church Food Pantry", "Phone": "(510) 889-1304" }, { "Address": "300 Gurdwara Rd Fremont, CA - 94536", "Image": "https://www.freefood.org/gallery/_kcyjmoub.png", "Name": "Fremont Gurdwara Sahib", "Phone": "(510) 790-0177" }, { "Address": "37350 Joseph Street Fremont, CA - 94536", "Image": "https://www.freefood.org/gallery/33821_ca_fremont_tri-city-volunteers_bzi.xx&oh=0a0d32fbf35ff73f66ab0c026d1dadbe&oe=5EBF25C5", "Name": "Tri-City Volunteers - Food Pantry", "Phone": "(510) 793-4583" }, { "Address": "14235 Bancroft Avenue San Leandro, CA - 94578", "Image": "https://www.freefood.org/gallery/34058_ca_san-leandro_san-leandro-community-food-pantry_bfo.jpg", "Name": "San Leandro Community Food Pantry", "Phone": "(510) 779-2218" }, { "Address": "8440 Central Ave. Newark, CA - 94560", "Image": "https://www.freefood.org/gallery/33840_ca_newark_league-of-volunteers-emergency-food-bank_njd.png", "Name": "League of Volunteers Emergency Food Pantry ", "Phone": "(510) 793-5683" }, { "Address": "911 Dowling Blvd. San Leandro, CA - 94577", "Image": "https://www.freefood.org/gallery/34181_1591187822.png", "Name": "All Saints Episcopal Church", "Phone": "(510) 569-7020" }, { "Address": "3081 Teagarden Street San Leandro, CA - 94577", "Image": "https://www.freefood.org/gallery/34256_1591615590.png", "Name": "Davis Street Community Center", "Phone": "(510) 347-4620" }, { "Address": "8825 MacArthur Boulevard Oakland, CA - 94605", "Image": "https://www.freefood.org/gallery/33817_ca_oakland_feed-my-sheep_csz.fna&oh=2af9f651e10902f14973e25598a5b96e&oe=5EBD9223", "Name": "Feed My Sheep", "Phone": "(510) 384-8604" }, { "Address": "1440 S. Main Street Milpitas, CA - 95035", "Image": "https://www.freefood.org/gallery/33835_ca_milpitas_milpitas-food-pantry_nan.jpg", "Name": "Milpitas Food Pantry", "Phone": "(408) 946-5564" }, { "Address": "4000 Redwood Rd Oakland, CA - 94619", "Image": "", "Name": "Children'S Food Basket", "Phone": "(510) 534-6362" }, { "Address": "500 Minert Road Walnut Creek, CA - 94598", "Image": "https://www.freefood.org/gallery/34100_1590751962.png", "Name": "Hands of Hope - Walnut Creek Church of Christ Food Pantry", "Phone": "(925) 825-7810" }, { "Address": "2303 Ygnacio Valley Road Walnut Creek, CA - 94598", "Image": "https://www.freefood.org/gallery/34111_1592305758.png", "Name": "North Creek Church Food Pantry", "Phone": "(925) 210-9036" }, { "Address": "2039 Mt. Diablo Boulevard Walnut Creek, CA - 94596", "Image": "https://www.freefood.org/gallery/34091_1590474640.png", "Name": "Food Pantry at St. Mary's - St. Vincent de Paul", "Phone": "(925) 937-2817" }, { "Address": "1924 Trinity Avenue Walnut Creek, CA - 94596", "Image": "https://www.freefood.org/gallery/34071__sin.jpg", "Name": "Trinity Center", "Phone": "925-949-8712" }, { "Address": "1650 Ashbury Dr. Concord, CA - 94521", "Image": "https://www.freefood.org/gallery/32986_christ-community-church_hge.jpg", "Name": "Christ Community Church", "Phone": "(925) 685-4343" }] },
        }
        
    }

    

    render(){
        const arr = this.state.obj["Data"];
        const arr_list = arr.map(function(obj){
            return <li class="list-items">Address: {obj["Address"]}, 
                        Name: {obj["Name"]}, 
                        Phone: {obj["Phone"]}, <br />
                        Image: <img src={obj["Image"]}></img>
                        </li>


        })
        console.log(arr)
        return(
            <div style={{ visibility: this.props.show ? 'visible' : 'collapse' }}>
                
                <div>Food Banks</div>
                <ul>{arr_list}</ul>
            </div>
            
        )
    }
}