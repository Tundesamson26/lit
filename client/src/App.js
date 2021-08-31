/* eslint-disable no-unused-vars */
import { Input } from '@material-ui/core';
import React  from 'react';
import ReactDOM from 'react-dom'
import Header from './Components/Header';
import CustomizedDialogs from './Components/Popup';


function App() {
  return (
    <div className="App">
      <Header />
      <CustomizedDialogs/>
    </div>
  );
}

export default App;
