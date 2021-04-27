import React,{useContext} from 'react'
import { Grid ,makeStyles} from '@material-ui/core/'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import PriceCard from '../_component/PriceCard'
import OrderCard from '../_component/OrderCard'
import { AuthContext} from "_provider/AuthProvider";
import {useDashboardInfoByUser} from '_hooks/useDashboardInfoByUser'

const Parks = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const {dashboardData,fetchDashboardByUser} = useDashboardInfoByUser(currentUser.uid);

  return (
    <BasePageContainer>
      <BasePageToolbar
        title={'Dashboards'}  
      ></BasePageToolbar>
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12}>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <PriceCard>
                <div className={classes.cardRoot1}>
                  <span className={classes.text1}>Your parks have</span>
                  <span className={classes.text1}>{dashboardData?.monthlyClicks}</span>
                  <span className={classes.text1}>monthly clicks</span>
                </div>
              </PriceCard>              
            </Grid>
            <Grid item>
              <PriceCard>
                <div className={classes.cardRoot1}>
                  <span className={classes.text1}>Age range of users</span>
                  {dashboardData.topAgeRangeUseage?.map(item => (
                    <span className={classes.text1} style={{paddingLeft:20}}>{item}</span>
                  ))}
                </div>
              </PriceCard>              
            </Grid>
            <Grid item>
              <PriceCard>
                <div className={classes.cardRoot1}>
                  <span className={classes.text1}>Most used search terms</span>
                  {dashboardData.mostSearchedTerms?.map(item => (
                    <span className={classes.text1} style={{paddingLeft:20}}>{item}</span>
                  ))}
                </div>
              </PriceCard>              
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container} spacing={2}>
            <Grid item>
              <OrderCard/>
            </Grid>
            <Grid item>
              <OrderCard/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BasePageContainer>
  )
}
const useStyles = makeStyles(theme => ({
  container: {
    display:'flex',
    justifyContent:'center'
  },
  text1:{
    fontSize: '20px',
    fontWeight: '500',
    color: '#666',
    height:'30%'
  },
  cardRoot1:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    marginTop:30
  }
}))
export default Parks
