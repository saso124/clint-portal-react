import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import AppHeader from '../../_common/AppHeader'
import AppSidebar from '../../_common/AppSidebar'

const DashboardLayout = (
  { header, sidebar, children } = {
    header: AppHeader,
    sidebar: AppSidebar,
  },
) => {
  const refHeaderContainer = useRef(null)
  const classes = useStyles()

  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    // code to run on component mount
    setHeaderHeight(refHeaderContainer.current.offsetHeight)
  }, [])

  const HeaderComponent = header
  const SidebarComponent = sidebar

  return (
    <div className={classes.dashboardContainer}>
      <div
        ref={refHeaderContainer}
        className={clsx(classes.headerContainer)}
        style={{
          width: `100%`,
        }}
      >
        {HeaderComponent && <HeaderComponent/>}
      </div>
      <div
        className={clsx(
          classes.sidebarContainer
        )}
        style={{
          marginTop: headerHeight,
        }}
      >
        <Drawer
          classes={{
            paper: clsx(classes.drawer),
          }}
          variant="permanent"
        >
          {SidebarComponent && <SidebarComponent />}
        </Drawer>       
      </div>
      <main
        className={classes.mainContainer}
        style={{
          paddingTop: headerHeight, // || headerSize.height,
        }}
      >
        <div className={classes.contentContainer}>{children}</div>
      </main>
    </div>
  )
}

DashboardLayout.defaultProps = {
  header: AppHeader,
  sidebar: AppSidebar,
}

DashboardLayout.propTypes = {
  header: PropTypes.elementType,
  sidebar: PropTypes.elementType,
}

const useStyles = makeStyles(theme => ({
  dashboardContainer: {
    display: 'flex',
    background: '#f5f5f5',
  },
  headerContainer: {
    top: 0,
    left: 'auto',
    right: 0,
    display: 'flex',
    alignItems: 'stretch',
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  sidebarContainer: {
    display: 'flex',
    alignItems: 'stretch',
    position: 'relative',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    width: theme.sidebar.width,
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  sidebarContainerMobile: {
    width: 0,
  },
  sidebarContainerCollapsed: {
    width: theme.sidebar.widthCollapsed,
  },
  drawer: {
    width: '100%',
    position: 'absolute',
  },
  mainContainer: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    flexDirection: 'column',
    display: 'flex',
  },
  contentContainer: {
    display: 'flex',
    position: 'relative',
    flex: 1,
  },
}))

export default DashboardLayout
