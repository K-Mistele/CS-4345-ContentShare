import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {TestRepository} from '../../api/testRepository'
import { loginRepo } from "../../api/loginRepo"


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

const theme = createTheme();


export class Login extends React.Component {
  testRepository = new TestRepository();
  loginRepository = new loginRepo();

  state = {
    username: '',
    password: '',
    openDialog: false
  };

  handleSubmit(){
    console.log('username:'+this.state.username)
    console.log('password:'+this.state.password)

    var user = {
      username: this.state.username,
      password: this.state.password
    }

    this.loginRepository.loginUser(user)
    .then(()=> this.setState({redirect:`/home`}))
    .catch((error) => {
      alert("Incorrect login information")
    })
  
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ContentShare
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="standard"
              onChange={(e) => 
                this.setState({ username: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => 
                this.setState({ password: e.target.value })
              }
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {this.handleSubmit()}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link onClick={() => {this.setState({openDialog: true})}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                <Dialog open={this.state.openDialog} onClose={() => {this.setState({openDialog: false})}}>
                  <DialogTitle>Sign up</DialogTitle>
                  <DialogContent>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="newUsername"
                      label="Username"
                      type="newUsername"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="newPassword"
                      label="Password"
                      type="newPassword"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => {this.setState({openDialog: false})}}>Cancel</Button>
                    <Button onClick={() => {this.setState({openDialog: false})}}>Sign Up</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }}/>
      </Container>
    </ThemeProvider>
    </>
  }
  
  componentDidMount() {
    // error
    // this.testRepository.helloWorld()
    //       .then(t => console.log(t))
  }
}