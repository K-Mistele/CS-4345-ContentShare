import * as React from 'react';

import NavigationBar from "./components/NavigationBar/NavigationBar";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Redirect } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


const theme = createTheme();

export class HomePage extends React.Component {
  state = {
    movieView: true,
    bookView: false,
    friendView: false,
    movies: [],
    testHeading: 'movie',
    albumView: true,
    openAddMovieDialog: false,
    openAddBookDialog: false
  }
  logOut() {
    this.setState({ redirect: `/` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
          <Button variant="contained" startIcon={<AccountCircleIcon/>} style={{boxShadow: "none"}}>
            Profile
          </Button>
          </Typography>
          <Button onClick={() => {this.logOut()}} 
                  variant="contained" startIcon={<LogoutIcon/>} style={{boxShadow: "none"}}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Homepage
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A little bit of intro of my homepage. 
            </Typography>
            <NavigationBar/> 
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  </>
  }
  
}