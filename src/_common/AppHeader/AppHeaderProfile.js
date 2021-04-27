import React,{useContext} from 'react'
import clsx from 'clsx'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'

import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconLogout from '@material-ui/icons/ExitToApp'

import {App,AuthContext} from "_provider/AuthProvider";

const AppHeaderProfile = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const {currentUser} = useContext(AuthContext);


  if (!currentUser) {
    return <div className={clsx('headerProfile', classes.headerProfile)} />
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }
  const handleLogout = (event) =>{
    setAnchorEl(null);
    App.auth().signOut();
  }

  return (
    <div className={clsx('headerProfile', classes.headerProfile)}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.profileButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className={classes.profileName}>{currentUser.email}</span>
        <IconArrowDropDown />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.profileMenu,
        }}
      >
        <Divider />
        <MenuItem onClick={handleLogout} component={Link} to="/auth/logout">
          <ListItemIcon className={classes.profileMenuItemIcon}>
            <IconLogout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  headerProfile: {
    display: 'inline-flex',
  },
  profileButton: {
    borderRadius: 30,
    fontSize: '1.2rem',
    padding: 8,
  },
  profileAvatar: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  profileName: {
    fontWeight: 500,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profileMenu: {
    marginLeft: '-16px',
  },
  profileMenuItemIcon: {
    color: theme.palette.primary.main,
  },
}))

export default AppHeaderProfile
