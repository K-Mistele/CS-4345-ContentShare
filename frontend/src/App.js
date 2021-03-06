import React from "react"
import { ROUTES } from './routes';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// import MovieReviewsList from "./components/movies/MovieReviewsList"
// import BookReviewsList from "./components/books/BookReviewsList"

import { Login } from "./components/Login/Login"
import { HomePage } from "./HomePage"
import MyMoviePage from "./components/Movies/MyMoviePage";
import MyBookPage from "./components/Books/MyBookPage";
import FriendsList from "./components/friends/FriendsList";
import FriendPage from "./components/friends/FriendPage";
import ViewMovie from "./components/Movies/ViewMovie";
import ViewBook from "./components/Books/ViewBook";

import FriendMoviePage from "./components/friends/Friend/FriendMoviePage" // viewing friends movies 
import FriendBookPage from "./components/friends/Friend/FriendBookPage" // viewing friends mbooks 

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App(){

  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
        {ROUTES.map((route, index) => <Route key={index} {...route} />)}
        <Route exact path = "/" component = { Login } />
        <Route exact path = "/movies" component = { MyMoviePage } />
        <Route exact path = "/home" component = { MyMoviePage } /> 
        <Route exact path = "/books" component = { MyBookPage } />
        <Route exact path = "/friends" component = { FriendPage } />

        <Route exact path = "/movies/:id" component = { ViewMovie } />
        <Route exact path = "/books/:id" component = { ViewBook } />

        <Route exact path = "/friend/movies/:uuid" component = { FriendMoviePage } />
        <Route exact path = "/friend/books/:uuid" component = { FriendBookPage } />
        
        </Switch> 
      </Router>
    </ThemeProvider>
    </div> 
  )
}

export default App;