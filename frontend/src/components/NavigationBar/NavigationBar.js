import React from "react"
import { Redirect } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export class NavigationBar extends React.Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     redirect: null
  //   }

  //   // this.handlePageChange = this.handlePageChange.bind(this); 
  // }

  state = {

  }

  handlePageChange(page, pageName) {
    // solves when already in movie page and clicked on movie button, button stack disappears
    if (page != pageName) {
      this.setState({ redirect: pageName })
    }    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return <>
      <Stack
        sx={{ mt: 4, mb: 2 }}
        direction="row"
        spacing={3}
        justifyContent="center"
      >

        <Button variant={this.props.page === "/movies" ? "contained" : "outlined"} onClick={() => this.handlePageChange(this.props.page, "/movies")}>Movies</Button>
        <Button variant={this.props.page === "/books" ? "contained" : "outlined"} onClick={() => this.handlePageChange(this.props.page, "/books")} >Books</Button>
        <Button variant={this.props.page === "/friends" ? "contained" : "outlined"} onClick={() => this.handlePageChange(this.props.page, "/friends")} >Friends</Button>
      </Stack>
    </>

  }
}
