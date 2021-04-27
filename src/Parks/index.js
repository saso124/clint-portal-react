import React from 'react'
import { Grid ,makeStyles} from '@material-ui/core/'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'
import ParkTable from '../_component/ParkTable'

const Dashboard = () => {
  const classes = useStyles();
  return (
    <BasePageContainer>
      <BasePageToolbar
        title={'Parks'}
      ></BasePageToolbar>
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12}>
          <ParkTable />
        </Grid>
      </Grid>
    </BasePageContainer>
  )
}
const useStyles = makeStyles(theme => ({
  container: {
    display:'flex',
    justifyContent:'center'
  }
}))
export default Dashboard
