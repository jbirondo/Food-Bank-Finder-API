import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken =
  "pk.eyJ1IjoiYXBwaWFuY2hhbiIsImEiOiJja2lodmplNXYwcnF6MnlzNXZ4cm5mOWc3In0.Ca0C0KsE53d5rUyfcKw-BQ";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
  // document.getElementById("map")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
