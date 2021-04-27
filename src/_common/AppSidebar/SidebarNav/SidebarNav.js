import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconProfile from '@material-ui/icons/AccountBox'
import NavList from './NavList'

const SidebarNav = props => {
  const { isCollapsed } = props
  const classes = useStyles()

  const itemsCore = [
    {
      name: 'Dashboard',
      Icon: IconDashboard,
      link: '/',
    },
    {
      name: 'Parks',
      Icon: IconProfile,
      link: '/parks',
    },
  ]
  return (
    <div>
      <List className={classes.navList} disablePadding>
        <NavList isCollapsed={isCollapsed} items={itemsCore} />
      </List>
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    navList: {
      width: theme.sidebar.width,
      fontSize: '1.1em',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      paddingTop: 20,
    },
    navListHeader: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.5)',
    },
    iconFeatures: {
      color: '#95de3c',
    },
    iconDocs: {
      color: '#f8cda9',
    },
    iconSupporters: {
      color: '#e3b546',
    },
    iconDiscuss: {
      color: '#ccc',
    },
  }),
)

export default SidebarNav
