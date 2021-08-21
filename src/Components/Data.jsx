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
    datacode: "",
    network_id: "",
  });

  function submit(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("apikey", "1a6cdb3400c83b8de18fce26bc5a52ae");
    formdata.append("userid", "51915");
    formdata.append("network_id", net);
    formdata.append("datacode", data.datacode);
    formdata.append("phoneno", data.phoneno);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    console.log(data.phoneno);
    console.log(data.amount);
    console.log(net);

    fetch("https://1app.online/api/databundle", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const [list, setList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios.get("https://1app.online/api/getdataplans")
      .then(res => {
        console.log(res.data)
        setList(res.data.MTN);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);
  console.log(list)

  //Action to be perform on changed
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setData(newdata);
  }

  function sayHello() {
    // alert('Hello!');
  }

  // const handleChange = (event) => {
  //   setCategoryName(event.target.value);
  // };

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
              Data Top-Up
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => submit(e)}
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
                autoComplete="email"
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
                <Select value={net} displayEmpty onChange={
                  // updateSelectVal
                  (e)=>{
                    const selectedPlans = e.target.value;
                    setList(selectedPlans)
                  }}>
                  <MenuItem value="" disabled>
                    Select Network
                  </MenuItem>
                  <MenuItem value={2}>MTN</MenuItem>
                  <MenuItem value={1}>Glo</MenuItem>
                  <MenuItem value={3}>Airtel</MenuItem>
                  <MenuItem value={4}>Etisalat</MenuItem>
                </Select><br /><br />

                <Select
                  displayEmpty
                  // value={setList}
                >
                  {list.map((item) => (
                    <MenuItem key={item.pld} value={item.pname}>
                      {item.pname}
                    </MenuItem>
                  ))}
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
