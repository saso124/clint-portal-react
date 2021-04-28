import React, { useContext, useEffect, useState } from 'react'
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
  Slide,
  Tab,
  // TabContext,
  // TabList,
  // TabPanel,
  Tabs,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core'

import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'

import CloseIcon from '@material-ui/icons/Close'
import {useGetParkById} from '_hooks/useGetParkById'
// import {GET_SAVE_PARK_URL} from '../../_hooks/constants';

const CELL_SPACING = 5;
// const classes = useStyles()
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
// Panel configration
  
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   const classes = useStyles()
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       className={classes.panelgroup}
//       {...other}
//     >
//       {value === index && (
        
//           <div>{children}</div>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   const [value, setValue] = useState(0);
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }
// const [value, setValue] = useState(0);

// const handleChange = (event, newValue) => {
//   setValue(newValue);
//   console.log('newValue',newValue);
// };
function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <EditForm/>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </div>
  );
}
const EditForm = ({parkinfo,classes}) =>{
  const onSubmit = () =>{
    console.log('submit');

  }
  const [parkInfo, setParkInfo] = useState({})
  const formsubmit = (event) =>{
    event.preventDefault();
    const tempParkInfo = { ...parkinfo, [event.target.id]: event.target.value }
    setParkInfo(tempParkInfo)
  }
  const handleChangeValue = event => {
    console.log('handleChangeValue', event.target.value);
    const tempParkInfo = { ...parkinfo, [event.target.id]: event.target.value }
    setParkInfo(tempParkInfo)
  }
  
  return (
  <div>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={formsubmit} type="POST">
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs={6} className={classes.newCardCell}>
              <TextField
                id="name"
                name="name"
                label="Card Name"
                className={classes.newCardText}
                value={parkinfo.name || ''}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="email"
                name="email"
                label="Email"
                className={classes.newCardText}
                value={parkinfo.email || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                className={classes.newCardText}
                value={parkinfo.phoneNumber || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="streetAddress"
                label="Street Address"
                className={classes.newCardText}
                value={parkinfo.streetAddress || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="city"
                label="City"
                className={classes.newCardText}
                value={parkinfo.city || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="state"
                label="State"
                className={classes.newCardText}
                value={parkinfo.state || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="zipCode"
                label="Zip Code"
                className={classes.newCardText}
                value={parkinfo.zipCode || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="lat"
                label="Lat"
                className={classes.newCardText}
                value={parkinfo.lat || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="long"
                label="Long"
                className={classes.newCardText}
                value={parkinfo.long || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="website"
                label="Website"
                className={classes.newCardText}
                value={parkinfo.website || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="origin"
                label="Origin"
                className={classes.newCardText}
                value={parkinfo.origin || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="id"
                label="ID"
                className={classes.newCardText}
                inputProps={{
                  readOnly: true,
                }}
                value={parkinfo.id || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="type"
                label="Type"
                className={classes.newCardText}
                value={parkinfo.type || ''}
              />
            </Grid>            
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="hoursOfOperation"
                label="Hours Of Operation"
                className={classes.newCardText}
                value={parkinfo.hoursOfOperation || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="acres"
                label="Acres"
                className={classes.newCardText}
                value={parkinfo.acres || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs={6} className={classes.newCardCell}>
              <TextField
                id="description"
                label="Description"
                className={classes.newCardText}
                multiline
                rows={6}
                value={parkinfo.description || ''}
              />
            </Grid>
            <Grid item xs={6} className={classes.newCardCell}>
              <TextField
                id="parkTags"
                label="Park Tags"
                className={classes.newCardText}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12} className={classes.submit}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                onClick={onSubmit}
              >SUBMIT</Button>
            </Grid>
          </Grid>
        </form>
  </div>)
};
// End of panel configration

// ParkInfoModal function
const ParkInfoModal = ({ onClose, open, isNew, itemId}) => {
  
  
  const [parkInfo, setParkInfo] = useState({})
  const classes = useStyles()
  const {parkData,fetchParkDataById} = useGetParkById(itemId);

  useEffect(() => {
    //console.log(selectedPark);
    if (!isNew) 
      setParkInfo(parkData)
  }, [parkData, isNew]);

  useEffect(()=>{
    if(!isNew)
      fetchParkDataById();
  },[itemId])

  const handleClose = () => {
    setParkInfo({});
    onClose()
  }
 
  return (
    <div>
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
          
          <Button  color="inherit" onClick={handleClose}>
            {isNew ? 'Add' : 'Save'}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.newCardRoot}>
      <div className={classes.root}>
        {/* Tab_panel(form_data & Photos) */}
      <div className={classes.tabbar}>
      </div>
      {/* <LabTabs parkinfo={parkInfo} classes={classes}/> */}
    </div>
        
      </div>
    </Dialog>
    
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop:'1.2em'
  },
  appBar: {
    position: 'relative',
  },
  tabs:{
    width:'95%'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  newCardRoot: {
    width:'100%',
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
  cardgroup:{
    display:'flex',
    width:'100%',
    boder:'1px solid black',
    padding:'1em',
    justifyContent:'flex-start'
  },
  cards:{
    margin:'1em',
    width:'10%',
    minWidth:'150px'
  },
  panelgroup:{
    width:'95%'
  },
  submit:{
      display: 'flex',
      justifyContent: 'flex-end',
  }
}))

export default ParkInfoModal
