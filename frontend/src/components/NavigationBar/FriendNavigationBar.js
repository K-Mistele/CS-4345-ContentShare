import React from "react"
import { Redirect } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class NavigationBar extends React.Component {

  state = {}

  handlePageChange(page, pageName) {
    // solves when already in movie page and clicked on movie button, button stack disappears
    if (page[1] != pageName[8]) {
      this.setState({ redirect: pageName })
    }    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <Stack
        sx={{ mt: 4, mb: 2 }}
        direction="row"
        spacing={3}
        justifyContent="center"
      >

        { /** <p> UUID is: { this.props.uuid} </p> **/ } 
        <Button variant={this.props.page === "/movies" ? "contained" : "outlined"} onClick={() => this.handlePageChange(this.props.page, "/friend/movies/"+this.props.uuid)}>Movies</Button>
        <Button variant={this.props.page === "/books" ? "contained" : "outlined"} onClick={() => this.handlePageChange(this.props.page, "/friend/books/"+this.props.uuid)} >Books</Button>
      </Stack>
    )

  }
}

export default NavigationBar;