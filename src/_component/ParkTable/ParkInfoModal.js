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
  Tab,
  Tabs,
  Card,
  CardActionArea,
  CardMedia,
  InputLabel,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useGetParkById } from '_hooks/useGetParkById'
import Box from '@material-ui/core/Box'
import { Formik } from 'formik'
import { AuthContext} from "_provider/AuthProvider";
import ParkTagSelect from './ParkTagSelect'
import FallbackImg  from '../../_assets/fallback.png'
import {DropzoneDialog} from 'material-ui-dropzone'
import {generateFormData} from '_utils/helper'

const CELL_SPACING = 5

let isUpdated = false;

let FallbackImgHash = {};
let selectImgEl = null;

const ParkInfoModal = ({ onClose, open, isNew, itemId,onUpdated}) => {
  // Panel configration
  const [value, setValue] = useState(0)
  const { currentUser } = useContext(AuthContext)

  // End of panel configration
  const classes = useStyles()
  const [parkInfo, setParkInfo] = useState({})
  const { parkData, fetchParkDataById,saveParkData,addPhotoData,deletePhotoData} = useGetParkById()
  const [openUploadModal,setOpenUploadModal] = useState(false)
  const modalTitle = isNew ? 'Add new Card' : 'Edit Card'

  useEffect(() => {
    // console.log('ParkInfoModal parkData',parkData);
    setParkInfo(parkData);
    FallbackImgHash = {};
    selectImgEl = null;
  }, [parkData])

  useEffect(() => {
    // console.log('use effect open', { open, isNew, itemId })
    if (open) {
      if (!isNew) fetchParkDataById(itemId)
    } else {
      setParkInfo({});

      if(isUpdated)
        onUpdated();
    }
  }, [open])
  const handleChange = (event, newValue) => {
    if(isNew && newValue==1)
      return;
      
    setValue(newValue)
  }

  const handleClose = () => {
    setParkInfo({})
    onClose()
    setValue(0)
  }
  const handleImageError = (e,src) => {
    e.target.onerror = null;
    //e.target.style.display = 'none'
    e.target.src = FallbackImg;

    FallbackImgHash[src] = 1;

  }
  const onSubmit = () => {
    // console.log('submit')
  }
  const handleSavePhoto = async (files) =>{

    // console.log('Image Upload =>',files);

    const dataForm = generateFormData({
      CardId: parkInfo.id
    });

    dataForm.append('File',files[0]);

    // console.log('handleSavePhoto',dataForm);

    setOpenUploadModal(false);
    await addPhotoData(dataForm,parkInfo.id);

  }
  const handleSaveParkData = async (parkData) =>{
    isUpdated = true;
    await saveParkData(parkData);
  }

  const handleDeletePhoto = async ()=>{
    if(selectImgEl == null)
      return;

    // console.log('handleDeletePhoto',selectImgEl);
    const {item} = selectImgEl;

    await deletePhotoData(item.photoUrl,parkInfo.id);
  }

  const changeSelectImg = (imgEl) => {

    if(selectImgEl != null)
    {
      selectImgEl.el.classList.remove(classes.cardAction);
    }

    selectImgEl = imgEl;
    selectImgEl.el.classList.add(classes.cardAction);
  }

  function TabPanel(props) {
    const { children, hidden, ...other } = props

    return (
      <div role="tabpanel" hidden={hidden} className={props.className} {...other}>
        {!hidden && (
          <Box div={2}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    )
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
            <Tab
              label="Main Info"
              id="full-width-tab-0"
              aria-controls="full-width-tabpanel-0"
            />
            <Tab
              label="Park Photos"
              id="full-width-tab-1"
              aria-controls="full-width-tabpanel-1"
            />
          </Tabs>
        </AppBar>
        <TabPanel
          value="0"
          hidden={value == 0 ? false : true}
          className={classes.panelgroup}
        >
          <div className={classes.newCardRoot}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: parkInfo.name ? parkInfo.name : '',
                email: parkInfo.email ? parkInfo.email : '',
                phoneNumber: parkInfo.phoneNumber ? parkInfo.phoneNumber : '',
                streetAddress: parkInfo.streetAddress ? parkInfo.streetAddress : '',
                city: parkInfo.city ? parkInfo.city : '',
                state: parkInfo.state ? parkInfo.state : '',
                zipCode: parkInfo.zipCode ? parkInfo.zipCode : '',
                lat: parkInfo.lat ? parkInfo.lat : '',
                long: parkInfo.long ? parkInfo.long : '',
                website: parkInfo.website ? parkInfo.website : '',
                origin: parkInfo.origin ? parkInfo.origin : '',
                id: parkInfo.id ? parkInfo.id : '',
                type: parkInfo.type ? parkInfo.type : '',
                hoursOfOperation: parkInfo.hoursOfOperation
                  ? parkInfo.hoursOfOperation
                  : '',
                acres: parkInfo.acres ? parkInfo.acres : '',
                description: parkInfo.description ? parkInfo.description : '',
                tags: parkInfo.parkTags?.map(item => ({ value: item.id, label: item.amenity }))
              }}
              onSubmit={(values, { setSubmitting }) => {
                const params = {
                  ...values,
                  ...{
                    lastUpdated: new Date().toISOString(),
                    tags: values.tags.map(item => item.value),

                    userId: currentUser.uid,
                    streetAddress2: '',
                    directions: '',
                    stayLimit: '',
                  },
                }
                
                handleSaveParkData(params);
                // console.log(values)
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
                          name="name"
                          label="Card Name"
                          className={classes.newCardText}
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="email"
                          label="Email"
                          className={classes.newCardText}
                          value={values.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="phoneNumber"
                          label="Phone Number"
                          className={classes.newCardText}
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={CELL_SPACING}>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="streetAddress"
                          label="Street Address"
                          className={classes.newCardText}
                          value={values.streetAddress}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="city"
                          label="City"
                          className={classes.newCardText}
                          value={values.city}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="state"
                          label="State"
                          className={classes.newCardText}
                          value={values.state}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="zipCode"
                          label="Zip Code"
                          className={classes.newCardText}
                          value={values.zipCode}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={CELL_SPACING}>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="lat"
                          label="Lat"
                          className={classes.newCardText}
                          value={values.lat}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="long"
                          label="Long"
                          className={classes.newCardText}
                          value={values.long}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="website"
                          label="Website"
                          className={classes.newCardText}
                          value={values.website}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="origin"
                          label="Origin"
                          className={classes.newCardText}
                          value={values.origin}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={CELL_SPACING}>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="id"
                          label="ID"
                          className={classes.newCardText}
                          inputProps={{
                            readOnly: true,
                          }}
                          // value={parkData.id || ''}
                          value={values.id}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="type"
                          label="Type"
                          className={classes.newCardText}
                          value={values.type}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="hoursOfOperation"
                          label="Hours Of Operation"
                          className={classes.newCardText}
                          value={values.hoursOfOperation}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs className={classes.newCardCell}>
                        <TextField
                          name="acres"
                          label="Acres"
                          className={classes.newCardText}
                          value={values.acres}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={CELL_SPACING}>
                      <Grid item xs={6} className={classes.newCardCell}>
                        <TextField
                          name="description"
                          label="Description"
                          className={classes.newCardText}
                          multiline
                          rows={6}
                          value={values.description}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6} className={classes.parktags}>
                        <InputLabel className={classes.label}>Park Tags</InputLabel>
                        <ParkTagSelect tags={values.tags} onChange={(value)=>{
                          setFieldValue('tags',value)
                        }} />
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
        <TabPanel value="1" hidden={value == 1 ? false : true}>
          <div className={classes.newCardRoot}>
          <div className={classes.cardgroup}>
            <Grid container spacing={3} noWrap>
              {parkInfo.photos?.map(item => (
              <Grid item sm={6} md={3} lg={2} xs={2} xl={2} noWrap>
                <Card  onClick={(e)=>changeSelectImg({el:e.target,item})} 
                  className={classes.oneImageDiv} 
                  key={item.id}
                >
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      alt=""
                      onError={(e) => handleImageError(e,item.photoUrl)} 
                      image={FallbackImgHash[item.photoUrl]? FallbackImg : item.photoUrl}
                      className={classes.oneImage}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              ))}
            </Grid>
          </div>
              <DropzoneDialog
                  open={openUploadModal}
                  onSave={handleSavePhoto}
                  // onChange={handleSavePhoto}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  filesLimit={1}
                  onClose={()=>{setOpenUploadModal(false)}}
                  previewGridClasses={{container:classes.dropzonePreviewContainer}}
              />
                    <div className={classes.photobuttons}>
                      
                      <Button
                            type="button"
                            color="primary"
                            variant="outlined"
                            className={classes.photosubmit}
                            onClick={()=>setOpenUploadModal(true)}
                          >
                        ADD
                      </Button>
                      <Button
                        type="button"
                        color="primary"
                        variant="outlined"
                        className={classes.photosubmit}
                        onClick={handleDeletePhoto}
                      >
                        DELETE
                      </Button>
                      </div>
        
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
  label:{
    fontSize:'1em',
    marginBottom:'2em'
  },
  parktags:{
    display:'block'
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
    minWidth:'70%',
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
  

  panelgroup: {
    width: '95%',
  },
  submit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  photosubmit: {
    textAlign:'center',
    marginLeft:'1em',
    fontSize:'1em'
  },
 
  photobuttons : {
    width:'40%',
    margin:'1em auto', 
    position:'relative',
    bottom:'0',
    padding:'0.5em',
    display:'flex',
    justifyContent:'center'
  },
  //multiselect div
  imageItem:{
    display:'flex',
    flex:'1',
    flexDirection:"row",
  },
  oneImageDiv:{
    transition: 'all .2s ease-in-out',
    display:'flex',
    position:'relative',
    minWidth: '100%',
    maxWidth:'100%',
    width:'16%',
    margin:'0 5px',
    height:'160px'
  },
  
  imageAction:{
    display:'none'
  },
  overLayImage:{
    display:'block',
    position:'absolute',
    width:'100%',
    top:'0',
    left:'0',
    maxHeight:'100%',
    maxWidth:'100%',
    width:'100%',
    height:'100%',
    background:'#767b727a'
  },
  oneImage:{
    maxWidth:'100%',
    width:'100%',
    minWidth:'100%',
    height:'100%'
  },
  cardAction : {
    //transform:'scale(1.05)',
     border:'5px solid #ae59e3',
     borderRadius:'5px',  
     outline:'5px solid grey',
  },
  dropzonePreviewContainer:{
    width: '90%'
  }
}))

export default ParkInfoModal
