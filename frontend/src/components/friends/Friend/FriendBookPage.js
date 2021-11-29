import React from "react"
import { Link } from "react-router-dom"

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import NavigationBar from "../../NavigationBar/FriendNavigationBar"
import Header from "../../Header/FriendHeader"
import { BookList } from "./bookList";
import { ViewBookDialog } from "./viewBookDialog";

import { friendRepo } from "../../../api/friendRepo"

// import bookReviewsData from "../../../temp_data/bookReviewsData"


class FriendBookPage extends React.Component {

  friendRepository = new friendRepo();

  constructor() {
    super();
    this.state = {
      allBookReviews: [],
      openViewBookDialog: false,
      bookToView: {},
    }
  }

  componentDidMount() {
    
    console.log("in friendBookPage... param uuid is: ", this.props.match.params.uuid)
    console.log("props period: ", this.props)
    this.friendRepository.getAFriendsBooks(this.props.match.params.uuid)
     .then(books =>{
       this.setState({allBookReviews: books})
       console.log("books successfully retreived in friend movies page")
     })
     .catch(error=>{
       console.log("error: ", error)
    })
  }

  onBookViewClick(book) {
    this.setState({ openViewBookDialog: true })
    this.setState({ bookToView: book });
  }
  CloseViewDialog() {
    this.setState({ openViewBookDialog: false })
  }

  render() {

    return (
      <div>
        <Header />
        <NavigationBar page="/books" uuid={this.props.match.params.uuid} />
        <Container maxWidth="md">
          {/* End hero unit */}
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>
          <Grid container spacing={4}>
            <BookList books={this.state.allBookReviews}
              onViewClick={book => this.onBookViewClick(book)}
            />
            <ViewBookDialog book={this.state.bookToView} open={this.state.openViewBookDialog} CloseDialog={() => { this.CloseViewDialog() }} />
          </Grid>
        </Container>
      </div>
    )
  }
}
export default FriendBookPage;