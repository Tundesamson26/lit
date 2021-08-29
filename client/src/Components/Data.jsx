import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
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

  const loadData = (PAYLOAD) => {
 
    var formdata = new FormData();
        formdata.append("apikey", "df024301c10d2028799d33aaaf4666b9");
        formdata.append("userid", "71366");
        formdata.append("network_id", PAYLOAD.networkId);
        formdata.append("datacode", PAYLOAD.dcode);
        formdata.append("phoneno", '08062070963');
    
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
    

    
        fetch("https://1app.online/api/databundle", requestOptions)
          .then(response => {
            console.log(response)
            alert('Data Subsription successful')
          })
          .catch(error => console.log('error', error));
  }
  // const secretKey ="sk_live_2643a1c19fd9e2b07c13f4a0398182280a2b6b23";
  const [amounti, setAmount] = useState(0); // amount = 1000 * 100;
  const [email, setEmail] = useState("");
  const [dcode, setDcode] = useState("");
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
    // secretKey,
    text: "Pay Now",
    onSuccess: () =>{
      return loadData(JSON.parse(sessionStorage.getItem('pendingOrder')))
    },
    onClose: () => 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      }),
  };
  // React api
  const [data, setData] = useState({
    email: "",
    phoneno: "",
    datacode: "",
    network_id: "",
  });

 

  const [list, setList] = useState([]);
  const [pendingOrder, setPendingOrder] =useState({});

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
            onSubmit={(e) => {
              e.preventDefault();
              handleClose()
            }}
              className={classes.form}
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
                  (e) => {
                    const selectedPlan = e.target.value;
                    setNet(selectedPlan)
                    axios.get("https://1app.online/api/getdataplans").then(({ data }) => {
                      const getNeededData = data[selectedPlan]
                      console.log(data, selectedPlan, getNeededData)
                      setList(getNeededData)
                      const networkId = {
                        GLO : 1,
                        MTN : 2,
                        AIRTEL : 3,
                        ETISALAT :4
                  
                      };
                      const getNetworkId = {networkId : networkId[selectedPlan]}
                      console.log('this is seleceted', getNetworkId)
                      sessionStorage.setItem('pendingOrder',JSON.stringify(getNetworkId))
                      
                    }).catch(error => console.log(error))

                  }}>
                  <MenuItem value="" disabled>
                    Select Network
                  </MenuItem>
                  <MenuItem value={'MTN'}>MTN</MenuItem>
                  <MenuItem value={'GLO'}>Glo</MenuItem>
                  <MenuItem value={'AIRTEL'}>Airtel</MenuItem>
                  <MenuItem value={'ETISALAT'}>Etisalat</MenuItem>
                </Select><br /><br />

                <Select
                  displayEmpty

                  onChange={
                    (e) => {
                      const selected = e.target.value;
                      let priceList = list.find((item) => item.pld === selected)
                      console.log(priceList)
                      let price = priceList.price;
                      setAmount(price)
                      let getpendingOrder = sessionStorage.pendingOrder ?? false;
                      if(!getpendingOrder) return alert('Select your Network')
                    let  pendingOrder = JSON.parse(getpendingOrder)
                      pendingOrder.dcode  = priceList.pld
                      sessionStorage.setItem('pendingOrder',JSON.stringify(pendingOrder))

                      let dcode = priceList.pld;
                      setDcode(dcode)
                      console.log(dcode)
                      console.log(price)
                    }
                  }
                >
                  {
                    list.map((item) => (
                      <MenuItem key={item.pld}
                        onchange={
                          (e) => {
                            const selected = e.target.value;
                            let priceList = list.find((item) => item.pld === selected)
                            // let price = list.find((item) => item.price === setAmount)
                            // console.log(price)
                            console.log(selected)
                          }
                        }
                        value={item.pld}>
                        {item.pname} / &#8358;{item.price}

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
