import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import IconMenu from '@material-ui/icons/Menu'

import HeaderSearch from './AppHeaderSearch'
import HeaderNotifications from './AppHeaderNotifications'
import HeaderProfile from './AppHeaderProfile'
import Logo from '../../_assets/logo.png'

const AppHeader = ({ onToggleClick }) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <img src={Logo} width={50} height={50} style={{marginLeft:20}}/>
        <div className={classes.actions}>
          <HeaderSearch />
          <HeaderNotifications />
          <HeaderProfile />
        </div>
      </Toolbar>
    </AppBar>
  )
}

AppHeader.propTypes = {
  onToggleClick: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  header: {
    background: '#fff',
    color: '#7b7b7b',
    boxShadow: 'none',
  },
  toolbar: {},
  menuButton: {},
  actions: {
    marginLeft: 'auto',
    alignItems: 'center',
    display: 'flex',
  },
  notificationsButton: {
    marginRight: 23,
  },
  title: {
    flexGrow: 1,
  },
}))

export default AppHeader
