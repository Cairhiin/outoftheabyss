import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import store, { history } from "./store";
import Root from './containers/Root';
import 'typeface-vollkorn';
import 'typeface-abel';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <Root history={ history } store= { store } />
  );
}

export default App;
