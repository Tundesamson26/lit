import React, { useState } from 'react'
import Navbar from './Navbar'
import CustomizedDialogs from './Popup';
import Button from '@material-ui/core/Button';


function Header() {
    const [open, setOpen] = React.useState(false);
    const [popupType, setPopupType] = React.useState("");

    const handleClickOpen = (popupType)=> {
        setOpen(true);
        setPopupType(popupType);
    };
    const handleClose = () => {
    setOpen(false);
  };


    return (
        <div id="main">
            <Navbar />
            <div className="container">
                <div className="name">
                <h1>Quick Payment Platform</h1>
                <p className="productDesc">
                    Airtime Top-up, Data Subscriptions<br/>Cable and Electricity, 
                </p>
                <div className="productGroup">
                    <button className="productClass" onClick={()=>{handleClickOpen("airtime")}}>Buy Airtime</button>
                    <button className="productClass" onClick={() => { handleClickOpen("data") }}>Buy Data</button>
                    <button className="productClass" onClick={() => { handleClickOpen("cabletv") }}>Cable Tv</button>
                    <button className="productClass" onClick={() => { handleClickOpen("electricity") }}>Electricity</button>
                </div>
            </div>
            </div>
            
            <CustomizedDialogs open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} popupType={popupType} />
        </div>
    )
}

export default Header;
