
import './App.css';
import HomePage from './Components/Homepage';
import React from 'react';
import mapboxgl from "mapbox-gl";


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        <header className="Title">Food Bank Finder</header>
        <HomePage />
      </div>
    );
  }
}

export default App;
