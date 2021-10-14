import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import MovieReviewsList from "./MovieReviewsList"
import Login from "./Login"

function App(){

  return (
    <div>
      <Router>
        <Switch>
        <Route exact path = "/" component = { Login } />
        <Route exact path = "/movies" component = { MovieReviewsList } />
        </Switch> 
      </Router>
    </div> 
  )
}

export default App;