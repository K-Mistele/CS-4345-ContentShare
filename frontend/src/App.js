import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import MovieReviewsList from "./components/movies/MovieReviewsList"
import BookReviewsList from "./components/books/BookReviewsList"
import FriendsList from "./components/friends/FriendsList"
import Login from "./Login"
import HomePage from "./HomePage"
function App(){

  return (
    <div>
      <Router>
        <Switch>
        <Route exact path = "/" component = { Login } />
        <Route exact path = "/movies" component = { MovieReviewsList } />
        <Route exact path = "/books" component = { BookReviewsList } />
        <Route exact path = "/friends" component = { FriendsList } />
        <Route exact path = "/homepage" component = { HomePage } />
        </Switch> 
      </Router>
    </div> 
  )
}

export default App;