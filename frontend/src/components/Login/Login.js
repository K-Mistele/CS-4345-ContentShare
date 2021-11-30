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

import { TestRepository } from '../../api/testRepository'
import { loginRepo } from "../../api/loginRepo"


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © ContentShare '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();


export class Login extends React.Component {
  testRepository = new TestRepository();
  loginRepository = new loginRepo();

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      openDialog: false,
      fullName: "",
      email: "",
      signUpUsername: "",
      signUpPassword: "",
      signUpConfirmPassword: ""
    };



  }

  handleSubmit = () => {
    console.log('username:' + this.state.username)
    console.log('password:' + this.state.password)

    var user = {
      username: this.state.username,
      password: this.state.password
    }

    this.loginRepository.loginUser(user)
      .then(() => this.setState({ redirect: `/home` }))
      .catch((error) => {
        alert("Incorrect login information")
      })
  }

  handleRegister = () => {

    var newUser = {
      "fullName": this.state.fullName,
      "email": this.state.email,
      "username": this.state.signUpUsername,
      "password": this.state.signUpPassword,
      "confirmPassword": this.state.signUpConfirmPassword
    }
    // sanity check
    if (this.state.fullName == '' || this.state.email == '' || this.state.signUpUsername == '' || this.state.signUpPassword == '' || this.state.signUpConfirmPassword == '') {
      alert('Please fill in all the required fields!')
      this.setState({
        fullName: "",
        email: "",
        signUpUsername: "",
        signUpPassword: "",
        signUpConfirmPassword: ""
      })
      this.setState({ openDialog: false })
      return
    }

    this.loginRepository.register(newUser)
      .then(() => {
        alert("You have been registered!")
      })
      .catch((error) => {
        console.log("error: ", error)
      })
    this.setState({ openDialog: false })
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                onClick={() => { this.handleSubmit() }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link onClick={() => { this.setState({ openDialog: true }) }} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  <Dialog open={this.state.openDialog} onClose={() => { this.setState({ openDialog: false }) }}>
                    <DialogTitle>Sign up</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '29ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newUsername"
                          label="Username"
                          fullWidth required
                          variant="standard"
                          onChange={(e) =>
                            this.setState({ signUpUsername: e.target.value })
                          }
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Full Name"
                          fullWidth required
                          variant="standard"
                          onChange={(e) =>
                            this.setState({ fullName: e.target.value })
                          }
                        />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '29ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          autoFocus
                          margin="dense"
                          id="newPassword"
                          label="Password"
                          fullWidth required
                          variant="standard"
                          onChange={(e) =>
                            this.setState({ signUpPassword: e.target.value })
                          }
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Confirm Password"
                          fullWidth required
                          variant="standard"
                          onChange={(e) =>
                            this.setState({ signUpConfirmPassword: e.target.value })
                          }
                        />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '60ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Email"
                          fullWidth required
                          variant="standard"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Profile Image"
                          fullWidth
                          variant="standard"
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => { this.setState({ openDialog: false }) }}>Cancel</Button>
                      <Button onClick={this.handleRegister}>Sign Up</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
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