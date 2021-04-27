import React from 'react'
import { makeStyles, Button, TextField, Link, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import AuthContent from '../_common/AuthContent'
import AuthHeader from '../_common/AuthHeader'
import { App} from "_provider/AuthProvider";

export default function Login() {
  const classes = useStyles()

  const handleRecoverPassword = async (event) =>{
    event.preventDefault();
    const { email } = event.target.elements;

    if(email.value == '')
      return;
    
    try {
      await App
        .auth()
        .sendPasswordResetEmail(email.value);
      alert('Please check your email...');
    } catch (error) {
      console.log('error',error);
      //alert("email or password incorrect");
    }
  }

  return (
    <AuthContent>
      <AuthHeader title={'Forgot Password'} />
      <form className={classes.form} onSubmit={handleRecoverPassword} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Request Password Reset
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              Back to Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthContent>
  )
}

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
