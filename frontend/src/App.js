import React from "react"
import { ROUTES } from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import MovieReviewsList from "./components/movies/MovieReviewsList"
import BookReviewsList from "./components/books/BookReviewsList"
import { Login } from "./Login"
import { HomePage } from "./HomePage"
function App(){

  return (
    <div>
      <Router>
        <Switch>
        {ROUTES.map((route, index) => <Route key={index} {...route} />)}
        <Route exact path = "/" component = { Login } />
        <Route exact path = "/movies" component = { MovieReviewsList } />
        <Route exact path = "/books" component = { BookReviewsList } />
        <Route exact path = "/homepage" component = { HomePage } />
        </Switch> 
      </Router>
    </div> 
  )
}

export default App;