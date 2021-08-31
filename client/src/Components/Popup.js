/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Input from './Airtime.jsx'
import Data from '../Components/Data.jsx'
import Cable from '../Components/Cable'
import Electricity from '../Components/Electricity'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({open, handleClickOpen, handleClose, popupType}) {
  console.log(popupType)
  if(popupType === "airtime"){
    return <Input open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} popupType={popupType} />;
  }else if(popupType === "data"){
    return <Data open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} popupType={popupType} />;
  }else if (popupType === "cabletv") {
    return <Cable open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} popupType={popupType} />;
  }else if (popupType === "electricity") {
    return <Electricity open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} popupType={popupType} />;
  }
  return (
    <div>
      
    </div>
  );
}
