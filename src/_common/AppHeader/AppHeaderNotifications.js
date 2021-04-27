import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import IconNotifications from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'



const AppHeaderNotifications = () => {
  const classes = useStyles()

  return (
    <div className={classes.headerNotifications}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.button}
        aria-controls="HeaderNotifications"
        aria-haspopup="true"
      >
        <Badge color="secondary" classes={{ badge: classes.badge }}>
          <IconNotifications />
        </Badge>
      </IconButton>
    </div>
  )
}

// const HeaderNotificationsContent = () => {
//   const classes = useStyles()

//   return <List className={classes.notifications}></List>
// }

const useStyles = makeStyles(theme => ({
  headerNotifications: {
    marginRight: 23,
    // position: 'relative',
    // position: 'absolute'
  },
  notificationsContainer: {
    // position: 'relative',
  },
  button: {},
  badge: {
    color: '#fff',
  },
  notifications: {
    // width: 360,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

export default AppHeaderNotifications
