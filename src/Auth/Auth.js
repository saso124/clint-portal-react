import React from 'react'
import { Route, Redirect } from 'react-router-dom' //
import { makeStyles } from '@material-ui/core/styles'

import { Grid,Box } from '@material-ui/core/'

import Login from './Login'
import Recover from './Recover'
import Reset from './Reset'


export default function Auth({ match }) {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={12} md={4} className={classes.formSection}>
        <Box p={2}>
          <Redirect exact from={`${match.path}/`} to={`${match.path}/login`} />
          <Route path={`${match.path}/login`} component={Login} />
          <Route path={`${match.path}/recover`} component={Recover} />
          <Route path={`${match.path}/reset`} component={Reset} />
        </Box>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    display:'flex',
    justifyContent:'center'
  },
  formSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
