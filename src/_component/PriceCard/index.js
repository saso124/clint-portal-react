import React from 'react'
import {
    makeStyles,
    Card,
    CardContent,
  } from '@material-ui/core'
  import PropTypes from 'prop-types'

  const PriceCard = props => {
    const classes = useStyles();
    const {caption,text,icon} = props;
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.cardSection}>
            <div className={classes.text}>{props.children}</div>
            <div className={classes.bar}></div>
        </CardContent>
      </Card>
    )
  }
  
  PriceCard.defaultProps={
      caption: 'Past Due',
      text: '$2100.50',
      icon: null
  }

  PriceCard.propTypes = {
      icon: PropTypes.element,
      caption:PropTypes.string,
      text:PropTypes.string
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      display:'flex',
      flexDirection:'column',
      height:160,
      width:240,
      borderRadius:0,
    },
    cardSection:{
        display:'flex',
        flexDirection:'row',
        height:'100%',
        padding:0,
    },
    text:{
        width: '100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingLeft:20
    },
    price:{
        fontSize: '20px',
        fontWeight: '500',
        color: '#666'
    },
    caption:{
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        marginLeft:10
    },
    bar:{
        minWidth:12,
        maxWidth:12,
        height: '50%',
        flexShrink: 1,
        background:'#2987c2'
    }
  }))
  
  export default PriceCard