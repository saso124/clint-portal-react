import React, { Component ,useContext,useEffect,useState} from 'react'
import {
  Button,
  Card,
  makeStyles,
} from '@material-ui/core'
import {DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridDensitySelector
} from '@material-ui/data-grid'


import { AuthContext} from "_provider/AuthProvider";
import {useGetParkByUser} from '_hooks/useGetParkByUser'
import ParkInfoModal from './ParkInfoModal'

function CustomToolbar(props) {
  const onNewCard = (e)=>{
    props.onNewCard();
  }
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton/>
      <GridFilterToolbarButton />
      <GridDensitySelector />
      <Button className = {'MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall'}>
        <span className={'MuiButton-label'} onClick={onNewCard}>
          <span className="MuiButton-startIcon" style={{fontSize:'20px'}}>
            +
          </span>
          New Card
        </span>
      </Button>
    </GridToolbarContainer>
  )
}

const columns=[
  { field: 'status',headerName:'Status',width:100},
  { field: 'name',headerName:'Card Name',width:140},
  { field: 'streetAddress',headerName:'Street Address',width:160},
  { field: 'state', headerName:'State',width:100},
  { field: 'city', headerName:'City',width:150},
  { field: 'zipCode', 
    headerName:'Zip Code',
    width:120,
    hide: true
  },
  { field: 'type', headerName:'Type',width:100},
  { field: 'tagCount', 
    headerName:'Tag Count',
    valueGetter: (params)=>(`${params.getValue('tags').length}`),
    width:120,
    hide:true
  },
  { field: 'lastUpdated', 
    headerName:'Last Updated',
    width:220,
    valueFormatter: (params)=>((new Date(params.value)).toLocaleString('en-GB'))
  }
];

const ParkTable = props => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedItem,setSelectedItem] = useState({});
  const [itemId, setitemId] = useState(0);
  const [isNew,setIsNew] = useState(false);

 // console.log('user id',currentUser.uid)
  const {parkData,fetchParkDataByUser} = useGetParkByUser(currentUser.uid);

  useEffect(()=>{
    
  },[parkData]);

  const onNewCard = () =>{
    // console.log('onNewCard');
    setIsNew(true);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleRowClick = (params,event) =>{
    //console.log('handleRowClick',params);
    // console.log('this_params.id = ',params.id);
    setSelectedItem(params.row);
    setIsNew(false);
    setOpen(true);
    setitemId(params.id);
    
  }

  return (
    <>
      <Card {...props} className={classes.root} variant="outlined">
        <div style={{ display: 'flex'}}>
          <div style={{ flexGrow: 1 }} >
            <DataGrid
              className={classes.gridRoot} 
              autoHeight
              columns={columns} 
              rows={parkData} 
              pageSize={5}
              components={{
                Toolbar: CustomToolbar
              }}
              componentsProps={{
                toolbar: {onNewCard}
              }}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </Card>
      <ParkInfoModal
        selectedPark={selectedItem}
        open={open}
        onClose={handleClose}
        isNew={isNew}
        itemId={isNew ? 0 : itemId}
        onUpdated={fetchParkDataByUser}        
      />
    </>
  )
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: 0
  },
  gridRoot:{
    '& .MuiDataGrid-colCellTitleContainer':{
      display:'flex',
      justifyContent:'center'
    },
    '& .MuiDataGrid-cell':{
      textAlign:'center',
    }
  },
}))
export default ParkTable
