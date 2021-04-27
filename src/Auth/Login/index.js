import React,{useContext} from 'react'
import {
  makeStyles,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from '@material-ui/core'
import { Link as RouterLink,Redirect,withRouter } from 'react-router-dom'

import AuthHeader from '../_common/AuthHeader'
import AuthContent from '../_common/AuthContent'
import { AuthContext,App} from "_provider/AuthProvider";


export const Login = ({history})=>{
  const classes = useStyles();
  const handleLogin = async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      if(email.value == '' || password.value == '')
        return;
      try {
        await App
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert("email or password incorrect");
      }
    }
  
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <AuthContent>
      <AuthHeader title={'Sign In'} />
      <form className={classes.form} noValidate onSubmit={handleLogin}>
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/recover" variant="body2">
              Forgot password?
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

export default withRouter(Login);