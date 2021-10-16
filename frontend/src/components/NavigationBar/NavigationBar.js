import React from "react"
import { Redirect } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class NavigationBar extends React.Component{

  constructor(){
    super();
    this.state = {
      redirect: null
    }

    this.handlePageChange = this.handlePageChange.bind(this); 
  }
  
  handlePageChange(pageName){
    this.setState({redirect: pageName})
  }
  
  render(){
    return (
    
    this.state.redirect ? <Redirect to = { this.state.redirect} />  :
    <Stack
              sx={{ mt: 4, mb: 2 }}
              direction="row"
              spacing={3}
              justifyContent="center"
            >
            
              <Button variant = {this.props.page === "Movies" ? "contained" : "outlined"} onClick = {() => this.handlePageChange("/movies")}>Movies</Button>
              <Button variant = {this.props.page === "Books" ? "contained" : "outlined"} onClick = {() => this.handlePageChange("/books")} >Books</Button>
              <Button variant = {this.props.page === "Friends" ? "contained" : "outlined"} onClick = {() => this.handlePageChange("/friends")} >Friends</Button>
    </Stack>
  )

  }
}

export default NavigationBar; 