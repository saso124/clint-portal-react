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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const CELL_SPACING = 5;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ParkInfoModal = ({ selectedPark, onClose, open, isNew }) => {
  const classes = useStyles()
  const [parkInfo, setParkInfo] = useState({})
  const[hiddenValue,sethiddenValue] = useState(0);
  useEffect(() => {
    console.log(selectedPark);
    if (isNew) setParkInfo({})
    else setParkInfo(selectedPark)
  }, [selectedPark, isNew])

  const handleClose = () => {
    onClose()
  }

  const handleChangeValue = event => {
    const tempParkInfo = { ...parkInfo, [event.target.id]: event.target.value }
    setParkInfo(tempParkInfo)
  }

  return (
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
          <Button autoFocus color="inherit" onClick={handleClose}>
            {isNew ? 'Add' : 'Save'}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.tabbar}>
          <Button color="inhreit" onClick={event=>sethiddenValue(0)}>MAIN INFO</Button>
          <Button color="inhreit" onClick={event=>sethiddenValue(1)}>PARK PHOTOS</Button>
      </div>
      <div className={classes.newCardRoot} hidden={hiddenValue}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs={6} className={classes.newCardCell}>
              <TextField
                id="name"
                label="Card Name"
                className={classes.newCardText}
                value={parkInfo.name || ''}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="email"
                label="Email"
                className={classes.newCardText}
                value={parkInfo.email || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                className={classes.newCardText}
                value={parkInfo.phoneNumber || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="streetAddress"
                label="Street Address"
                className={classes.newCardText}
                value={parkInfo.streetAddress || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="city"
                label="City"
                className={classes.newCardText}
                value={parkInfo.city || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="state"
                label="State"
                className={classes.newCardText}
                value={parkInfo.state || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="zipCode"
                label="Zip Code"
                className={classes.newCardText}
                value={parkInfo.zipCode || ''}
              />
            </Grid>
          </Grid>
          <Grid container spacing={CELL_SPACING}>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="lat"
                label="Lat"
                className={classes.newCardText}
                value={parkInfo.lat || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="long"
                label="Long"
                className={classes.newCardText}
                value={parkInfo.long || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="website"
                label="Website"
                className={classes.newCardText}
                value={parkInfo.website || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="origin"
                label="Origin"
                className={classes.newCardText}
                value={parkInfo.origin || ''}
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
                value={parkInfo.id || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="type"
                label="Type"
                className={classes.newCardText}
                value={parkInfo.type || ''}
              />
            </Grid>            
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="hoursOfOperation"
                label="Hours Of Operation"
                className={classes.newCardText}
                value={parkInfo.hoursOfOperation || ''}
              />
            </Grid>
            <Grid item xs className={classes.newCardCell}>
              <TextField
                id="acres"
                label="Acres"
                className={classes.newCardText}
                value={parkInfo.acres || ''}
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
                value={parkInfo.description || ''}
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
          </Grid>
        </form>
      </div>
      <div className={classes.newCardRoot} hidden={(hiddenValue==1)?true:false}>
          <div className={classes.cardgroup}>
            {parkInfo.photos?.map(item => (
    
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
                  <Typography gutterBottom variant="h5" component="h2">
                    
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.cardId}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  
                </Button>
                <Button size="small" color="primary">
                  
                </Button>
              </CardActions>
            </Card>
            ))}
          </div>  
      </div>
    </Dialog>
  )
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
    border:'1px solid black'
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
  tabbar:{
    width:'100%',
    padding:'1em'
  },
  cardgroup:{
    width:'100%',
    display:'flex',
    justifyContent:'flexStart'
  },
}))

export default ParkInfoModal
