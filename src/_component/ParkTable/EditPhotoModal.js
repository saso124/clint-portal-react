import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import {
  Button,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  Grid,
  TextField,
  Link,
  Slide,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
const EditPhotoModal = ({ photos,open,onClose}) => {
  const classes = useStyles()
  
  const handleClose = () => {
    onClose()
  }
 
  return (
    <div>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg">
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add New Card
          </Typography>
         
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.newCardRoot}>
        
      </div>
    </Dialog>
    
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  newCardRoot: {
    flexGrow: 1,
    margin: 30,
  },
  newCardCell: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  newCardText: {
    width: '100%',
  },
}))

export default EditPhotoModal