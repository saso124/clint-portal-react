import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import IconSearch from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'

const AppHeaderSearch = () => {
  const classes = useStyles()

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.searchButton}
      >
        <IconSearch />
      </IconButton>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  searchButton: {
    marginRight: 20,
  },
  scrollPaper: {
    alignItems: 'flex-start',
  },
}))

export default AppHeaderSearch
