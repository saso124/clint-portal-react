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
  Tabs,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useGetParkById } from '_hooks/useGetParkById'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { GET_SAVE_PARK_URL } from '../../_hooks/constants'
import { GET_SAVE_PHOTO_URL } from '../../_hooks/constants'
import {GET_DEL_PHOTO_URL} from '../../_hooks/constants'
import { Formik } from 'formik'
import axios from 'axios'
import { red } from '@material-ui/core/colors'
import { set } from 'lodash'
const CELL_SPACING = 5

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ParkInfoModal = ({ onClose, open, isNew, itemId }) => {
  // Panel configration
  const [value, setValue] = useState(0)
  
  function TabPanel(props) {
    const { children, hidden, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={hidden}
        className={props.className}
        {...other}
      >
        {!hidden && (
          <Box div={2}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    hidden:PropTypes.any,
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // End of panel configration
  const classes = useStyles()
  const [parkInfo, setParkInfo] = useState({})
  const modalTitle = (isNew)?'Add new Card':'Edit Card'
  const { parkData, fetchParkDataById } = useGetParkById(itemId)
  const [photoItem, setPhotoItem] = useState({})
  const [border, setBorder] = useState(0);

  useEffect(() => {
    if (!isNew) setParkInfo(parkData)
  }, [parkData, isNew])

  const handleClose = () => {
    setParkInfo({})
    onClose()
  }
  const handleChangeValue = event => {
    
    event.preventDefault()
    const tempParkInfo = { ...parkInfo, [event.target.id]: event.target.value }
    setParkInfo(tempParkInfo)
  }
  const delPhoto = event =>{
    event.preventDefault();
    console.log(photoItem);
   
    axios
      .delete(`${GET_DEL_PHOTO_URL}?url=${photoItem.photoUrl}`)
      .then(() => console.log('SUCCESS DELELTE'))
      .catch(err => {
        console.error(err);
      });
  }
  const onSubmit = () => {

    console.log('submit')
  }
  const focusCard = (event) =>{
    //styles
   const tempItem = {...photoItem,[event.target.key]:event.target.className}
   setPhotoItem(tempItem);
    console.log(photoItem);

      (border==0) ? setBorder(1) : setBorder(0);

  }
  const formsubmit = event => {
    event.preventDefault()
    const target = event.target
    console.log(target.value)
    console.log(target.id)
  }
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
        maxWidth="lg"
      >
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
              {modalTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default" className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="simple"
          >
            <Tab label="Main Info" id="full-width-tab-0" aria-controls="full-width-tabpanel-0" />
            <Tab label="Park Photos" id="full-width-tab-1" aria-controls="full-width-tabpanel-1" />
          </Tabs>
        </AppBar>
        <TabPanel value='0' hidden={(value==0) ? false : true}>
          <div className={classes.newCardRoot}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: parkInfo.name ? parkInfo.name : '',
              email: parkInfo.email ? parkInfo.email : '',
              phoneNumber : parkInfo.phoneNumber ? parkInfo.phoneNumber : '',
              streetAddress : parkInfo.streesAddress ? parkInfo.streesAddress : '',
              city: parkInfo.city ? parkInfo.city : '',
              state: parkInfo.state ? parkInfo.state : '',
              zipCode : parkInfo.zipCode ? parkInfo.zipCode : '',
              lat : parkInfo.lat ? parkInfo.lat : '',
              long : parkInfo.long ? parkInfo.long : '',
              website : parkInfo.website ? parkInfo.website : '',
              origin : parkInfo.origin ? parkInfo.origin : '',
              id : parkInfo.id ? parkInfo.id : '',
              type : parkInfo.type ? parkInfo.type : '',
              hoursOfOperation : parkInfo.hoursOfOperation ? parkInfo.hoursOfOperation : '',
              acres : parkInfo.acres ? parkInfo.acres : '',
              description : parkInfo.description ? parkInfo.description : '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              var d = new Date();
              values.lastUpdated=d.toISOString();
              values.tags=[];
              values.parkTags = [];
              axios
                  .post(GET_SAVE_PARK_URL, values)
                  .then(() => console.log('success submited'))
                  .catch(err => {
                    console.error(err);
                  });
              console.log(values);

            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              isSubmitting,
            }) => {
              return (
                <form className={classes.root} onSubmit={handleSubmit}>
                    
                      <Grid container spacing={CELL_SPACING}>
                        <Grid item xs={6} className={classes.newCardCell}>
                          <TextField
                            id="name"
                            name="name"
                            label="Card Name"
                            className={classes.newCardText}
                            value={values.name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.newCardText}
                            //value={parkData.email || ''}
                            value={values.email}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            className={classes.newCardText}
                            //value={parkData.phoneNumber || ''}
                            value={values.phoneNumber}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={CELL_SPACING}>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="streetAddress"
                            label="Street Address"
                            className={classes.newCardText}
                            // value={parkData.streetAddress || ''}
                            value = {values.streetAddress}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="city"
                            label="City"
                            className={classes.newCardText}
                            // value={parkData.city || ''}
                            value = {values.city}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="state"
                            label="State"
                            className={classes.newCardText}
                            // value={parkData.state || ''}
                            value={values.state}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="zipCode"
                            label="Zip Code"
                            className={classes.newCardText}
                            // value={parkData.zipCode || ''}
                            value = {values.zipCode}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={CELL_SPACING}>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="lat"
                            label="Lat"
                            className={classes.newCardText}
                            // value={parkData.lat || ''}
                            value={values.lat}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="long"
                            label="Long"
                            className={classes.newCardText}
                            // value={parkData.long || ''}
                            value = {values.long}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="website"
                            label="Website"
                            className={classes.newCardText}
                            // value={parkData.website || ''}
                            value={values.website}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="origin"
                            label="Origin"
                            className={classes.newCardText}
                            // value={parkData.origin || ''}
                            value={values.origin}
                            onChange={handleChange}
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
                            // value={parkData.id || ''}
                            value={values.id}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="type"
                            label="Type"
                            className={classes.newCardText}
                            // value={parkData.type || ''}
                            value={values.type}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="hoursOfOperation"
                            label="Hours Of Operation"
                            className={classes.newCardText}
                            // value={parkData.hoursOfOperation || ''}
                            value={values.hoursOfOperation}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="acres"
                            label="Acres"
                            className={classes.newCardText}
                            // value={parkData.acres || ''}
                            value={values.acres}
                            onChange={handleChange}
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
                            // value={parkData.description || ''}
                            value={values.description}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} className={classes.newCardCell}>
                          <TextField
                            id="parkTags"
                            label="Park Tags"
                            className={classes.newCardText}
                            multiline
                            rows={6}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.submit}>
                          <Button
                            type="submit"
                            color="primary"
                            variant="outlined"
                            onClick={onSubmit}
                          >
                            {isNew ? 'Add' : 'Save'}
                          </Button>
                        </Grid>
                      </Grid>
                </form>
              )
            }}
          </Formik>
        </div>
        </TabPanel>
        <TabPanel value='1' hidden={(value==1) ? false : true}>
        <div className={classes.newCardRoot}>
        <Formik
            enableReinitialize={true}
          
            onSubmit={(values, { setSubmitting }) => {
              
              axios
                  .post(GET_SAVE_PHOTO_URL, photoItem)
                  .then(() => console.log('success PHOTO submited'))
                  .catch(err => {
                    console.error(err);
                  });
              console.log(photoItem);

            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              isSubmitting,
            }) => {
              
              return (
                <form className={classes.root} onSubmit={handleSubmit}>
                    
                      <div className={classes.cardgroup}>
                        
                        {parkInfo.photos?.map(item => (
                          <Card  onClick={(e)=>{setPhotoItem(item)}} 
                            className={item.id == photoItem.id ? `${classes.cardAction} ${classes.cards}` :classes.cards} 
                            key={item.id}
                          >
                            <CardActionArea >
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={item.photoUrl}
                                title={item.cardName}
                              />
                            </CardActionArea>
                          </Card>
                        ))}
                      </div>
                      <Button
                        variant="contained"
                        component="label"
                        color="primary"
                      >
                        Upload File
                        <input
                          type="file"
                          hidden
                        />
                      </Button>
                      <Button
                            type="button"
                            color="primary"
                            variant="outlined"
                            className={classes.photosubmit}
                          >
                        ADD
                      </Button>
                      <Button
                            type="button"
                            color="primary"
                            variant="outlined"
                            onClick={delPhoto}
                            className={classes.photosubmit}
                          >
                        DELETE
                      </Button>
                  </form>
              )
            }}
          </Formik>
        </div>
        </TabPanel>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: '1.2em',
  },
  appBar: {
    position: 'relative',
  },
  tabs: {
    width: '100%',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  newCardRoot: {
    // width: '100%',
    flexGrow: 1,
    marginLeft: 30,
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
  cardgroup: {
    display: 'flex',
    width: '100%',
    boder: '1px solid black',
    padding: '1em',
    justifyContent: 'flex-start',
  },
  cards: {
    margin: '1em',
    width: '10%',
    minWidth: '150px',
  },
  panelgroup: {
    width: '95%',
  },
  submit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  photosubmit: {
    textAlign:'center',
    marginLeft:'1em'
  },
  cardAction : {
    border:'5px solid white',
    outline:'5px solid grey',
  }
}))

export default ParkInfoModal
