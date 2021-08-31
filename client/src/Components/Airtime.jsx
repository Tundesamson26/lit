/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { PaystackButton } from "react-paystack";
import SuccessPage from "./SuccessPage";

const Airtime = ({ open, handleClose }) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();
  const [net, setNet] = React.useState("");

  const updateSelectVal = (event) => {
    setNet(event.target.value);
  };

  const publicKey = "pk_test_2699a515d800f6aba475d3ba3d0d4ce4055b8b4e";
  const [amounti, setAmount] = useState(0); // amount = 1000 * 100;
  const [email, setEmail] = useState("");
  //   const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const amount = amounti * 100
  const componentProps = {
    email,
    amount,
    metadata: {
      name: 'name',
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };
  // React api
  const [data, setData] = useState({
    email: "",
    phoneno: "",
    amount: "",
    network_id: "",
  });

  const loadAirtime = (PAYLOAD) => {

    var formdata = new FormData();
    const phone = document.querySelector('#number').value;
    const amount = document.querySelector('#number_amount').value
    console.log(phone)
    console.log(amount)
    formdata.append("apikey", "929euehehe87udw9d792783197");
    formdata.append("userid", "71366");
    formdata.append("network_id", PAYLOAD.network_id);
    formdata.append("amount", amount);
    formdata.append("phoneno", phone);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };



    fetch("https://1app.online/api/airtime", requestOptions)
      .then(response => {
        console.log(response)
        handleClose();
        <SuccessPage />
      })
      .catch(error => console.log('error', error));
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setData(newdata);
  }

  const [error, setError] = useState({
    email: "",
    phoneno: "",
    amount: "",
  })

  const validate = () => {
    let temp = {}
    temp.email = (/$|.+@.+..+/).test(data.email) ? "" : "This is field is required"
    temp.phoneno = data.phoneno.length > 10 ? "" : "Minimum 10 numbers is required"
    temp.amount = data.amount ? "" : "This is field is required"
    temp.email = data.email ? "" : "This is nfield is required"
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Quick TopUp
      </DialogTitle>
      <DialogContent dividers>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Airtime Top-Up
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value)
                  return handle(e);
                }}
                value={data.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
              // error
              // helperText="Email must be valid"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => {
                  setPhone(e.target.value)
                  return handle(e);
                }}
                value={data.phoneno}
                name="phoneno"
                label="Phone Number"
                type="number"
                id="number_amount"
                autoComplete="number"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => {
                  setAmount(e.target.value)
                  return handle(e);
                }}
                value={data.amount}
                name="amount"
                label="Amount"
                type="number"
                id="number"
                autoComplete="number"
              />
              <FormControl
                className={classes.formControl}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Select value={net} displayEmpty onChange={updateSelectVal}>
                  <MenuItem value="" disabled>
                    Select Network
                  </MenuItem>
                  <MenuItem value={2}>MTN</MenuItem>
                  <MenuItem value={1}>Glo</MenuItem>
                  <MenuItem value={3}>Airtel</MenuItem>
                  <MenuItem value={4}>Etisalat</MenuItem>
                </Select>
              </FormControl>
              <br />
              <PaystackButton className="paystack-button" {...componentProps} />
            </form>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
export default Airtime;
