import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles, Typography } from '@material-ui/core'

const AuthHeader = ({ title = '' }) => {
  const classes = useStyles()

  return (
    <Typography component="h1" variant="h4">
       {title}
    </Typography>
  )
}

AuthHeader.propTypes = {
  title: PropTypes.string,
}

const useStyles = makeStyles(theme => ({
  logo: {
    color: theme.palette.primary.main,
    position: 'relative',
    top: '1px',
  },
}))

export default AuthHeader
