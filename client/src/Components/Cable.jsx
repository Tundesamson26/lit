import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Input = ({ open, handleClose }) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));


    const classes = useStyles();
    const [net, setNet] = React.useState('');

    const updateSelectVal = (event) => {
        setNet(event.target.value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Quick TopUp
            </DialogTitle>
            <DialogContent dividers>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Cable Tv
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="number"
                                label="Phone Number"
                                type="number"
                                id="number"
                                autoComplete="number"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="amount"
                                label="Amount"
                                type="number"
                                id="number"
                                autoComplete="number"
                            />
                            <FormControl
                                className={classes.formControl}
                                style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
                            >
                                {/* <InputLabel id="demo-simple-select-helper-label">Choose Your Network</InputLabel> */}
                                <Select
                                    value={net} displayEmpty
                                    onChange={updateSelectVal}
                                >
                                    <MenuItem value="" disabled>Select Data Plan</MenuItem>
                                    <MenuItem value={10}>MTN</MenuItem>
                                    <MenuItem value={20}>Glo</MenuItem>
                                    <MenuItem value={30}>Airtel</MenuItem>
                                    <MenuItem value={40}>Etisalat</MenuItem>
                                </Select>
                            </FormControl><br />
                            {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Save Transaction"
                    /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Pay
                            </Button>
                        </form>
                    </div>
                    {/* <Box mt={8}>
            </Box> */}
                </Container>
            </DialogContent>
        </Dialog>

    );

}
export default Input;
