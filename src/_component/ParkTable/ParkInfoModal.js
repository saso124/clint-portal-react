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
import { Formik } from 'formik'

const CELL_SPACING = 5

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ParkInfoModal = ({ onClose, open, isNew, itemId }) => {
  // Panel configration

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className={classes.panelgroup}
        {...other}
      >
        {value === index && (
          <Box div={2}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }
  }
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // End of panel configration
  const classes = useStyles()
  const [parkInfo, setParkInfo] = useState({})

  const { parkData, fetchParkDataById } = useGetParkById(itemId)
  const [photoItem, setPhotoItem] = useState({})

  useEffect(() => {
    //console.log(selectedPark);
    if (!isNew) setParkInfo(parkData)
  }, [parkData, isNew])

  useEffect(() => {
    if (!isNew) fetchParkDataById()
  }, [itemId])

  const handleClose = () => {
    setParkInfo({})
    onClose()
  }
  const handleChangeValue = event => {
    //console.log('handleChangeValue', event.target.value);
    event.preventDefault()
    const tempParkInfo = { ...parkInfo, [event.target.id]: event.target.value }
    setParkInfo(tempParkInfo)
  }
  const onSubmit = () => {
    console.log('submit')
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
              Add New Card
            </Typography>

            <Button color="inherit" onClick={handleClose}>
              {isNew ? 'Add' : 'Save'}
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.newCardRoot}>
          <Formik
            enableReinitialize={true}
            initialValues={parkInfo}
            onSubmit={(values, { setSubmitting }) => {}}
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
                  <div className={classes.root}>
                    <AppBar position="static" color="default" className={classes.tabs}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="simple"
                      >
                        <Tab label="Main Info" {...a11yProps(0)} />
                        <Tab label="Park Photos" {...a11yProps(1)} />
                      </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
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
                            value={parkData.email || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            className={classes.newCardText}
                            value={parkData.phoneNumber || ''}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={CELL_SPACING}>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="streetAddress"
                            label="Street Address"
                            className={classes.newCardText}
                            value={parkData.streetAddress || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="city"
                            label="City"
                            className={classes.newCardText}
                            value={parkData.city || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="state"
                            label="State"
                            className={classes.newCardText}
                            value={parkData.state || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="zipCode"
                            label="Zip Code"
                            className={classes.newCardText}
                            value={parkData.zipCode || ''}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={CELL_SPACING}>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="lat"
                            label="Lat"
                            className={classes.newCardText}
                            value={parkData.lat || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="long"
                            label="Long"
                            className={classes.newCardText}
                            value={parkData.long || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="website"
                            label="Website"
                            className={classes.newCardText}
                            value={parkData.website || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="origin"
                            label="Origin"
                            className={classes.newCardText}
                            value={parkData.origin || ''}
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
                            value={parkData.id || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="type"
                            label="Type"
                            className={classes.newCardText}
                            value={parkData.type || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="hoursOfOperation"
                            label="Hours Of Operation"
                            className={classes.newCardText}
                            value={parkData.hoursOfOperation || ''}
                          />
                        </Grid>
                        <Grid item xs className={classes.newCardCell}>
                          <TextField
                            id="acres"
                            label="Acres"
                            className={classes.newCardText}
                            value={parkData.acres || ''}
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
                            value={parkData.description || ''}
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
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className={classes.cardgroup}>
                        {parkData.photos?.map(item => (
                          <Card className={classes.cards} key={item.id}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={item.photoUrl}
                                title={item.cardName}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                ></Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {item.cardId}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button size="small" color="primary"></Button>
                              <Button size="small" color="primary"></Button>
                            </CardActions>
                          </Card>
                        ))}
                      </div>
                    </TabPanel>
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
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
    width: '95%',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  newCardRoot: {
    width: '100%',
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
}))

export default ParkInfoModal
