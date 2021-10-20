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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  handleChangeView(view) {
    if (view == 'movie') {
      this.setState({movieView: true}); 
      this.setState({bookView: false}); 
      this.setState({friendView: false});
      // get movie data from db - album view
      this.setState({testHeading: 'movie'});
      this.setState({albumView: true});
    }
    else if (view == 'book') {
      this.setState({movieView: false}); 
      this.setState({bookView: true}); 
      this.setState({friendView: false});
      // get book data from db - album view
      this.setState({testHeading: 'book'});
      this.setState({albumView: true});

    }
    else if (view == 'friend') {
      this.setState({movieView: false}); 
      this.setState({bookView: false}); 
      this.setState({friendView: true});
      // get friends list
      this.setState({albumView: false});
    }
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
              A little bit of intro of my homepage. The three buttons below should change dynamically.
            </Typography>
            <NavigationBar/> 
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            {
              this.state.movieView && <><Button onClick={() => {this.setState({openAddMovieDialog: true})}} color="primary" startIcon={<AddCircleOutlineIcon/>}
              variant="text">Add a New Movie</Button>
              <Dialog fullWidth={true} open={this.state.openAddMovieDialog} onClose={() => {this.setState({openAddMovieDialog: false})}}>
                  <DialogTitle>Add a New Movie</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Movie Title"
                      type="movie"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => {this.setState({openAddMovieDialog: false})}}>Cancel</Button>
                    <Button onClick={() => {this.setState({openAddMovieDialog: false})}}>Add new movie</Button>
                  </DialogActions>
                </Dialog>
              </>
            }

            {
              this.state.bookView && <><Button onClick={() => {this.setState({openAddBookDialog: true})}} color="primary" startIcon={<AddCircleOutlineIcon/>}
              variant="text">Add a New Book</Button>
              <Dialog fullWidth={true} open={this.state.openAddBookDialog} onClose={() => {this.setState({openAddBookDialog: false})}}>
                  <DialogTitle>Add a New Book</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Movie Title"
                      type="movie"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => {this.setState({openAddBookDialog: false})}}>Cancel</Button>
                    <Button onClick={() => {this.setState({openAddBookDialog: false})}}>Add new book</Button>
                  </DialogActions>
                </Dialog>
              </>
            }
            

            </Stack>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {
              !this.state.albumView && <p>this will be all of my friends we could have a table view here??</p>
            }
            {this.state.albumView && cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.state.testHeading}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  </>
  }
  
}