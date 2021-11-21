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

import { NavigationBar } from "../NavigationBar/NavigationBar"
import Header from "../Header/Header"
import { BookList } from "./bookList";
import { ViewBookDialog } from "./viewBookDialog";
import { EditBookDialog } from "./editBookDialog";
import { AddBookDialog } from "./addBookDialog";
import bookReviewsData from "../../temp_data/bookReviewsData"


class MyBookPage extends React.Component {

  constructor() {
    super();
    this.state = {
      allBookReviews: [],
      openViewBookDialog: false,
      bookToView: {},
      openEditBookDialog: false,
      bookToEdit: {},
      tmpEditTitle: '',
      openAddBookDialog: false,
      tmpAddTitle: ''
    }
  }

  componentDidMount() {
    this.setState({
      allBookReviews: bookReviewsData,
      // openAddBookDialog: true,
    })
  }

  onBookViewClick(book) {
    this.setState({ openViewBookDialog: true })
    this.setState({ bookToView: book });
  }
  CloseViewDialog() {
    this.setState({ openViewBookDialog: false })
  }
  // --------- Functions for editing book ----------
  onBookEditClick(bookId) {
    console.log(bookId)
    this.setState({ openEditBookDialog: true })
    this.setState({ bookToEdit: this.state.allBookReviews.filter(x => x.id == bookId)[0] })
  }
  CloseEditDialog() {
    this.setState({ openEditBookDialog: false })
  }
  SaveEditBook(book) {
    // do something here to save
    console.log('book id:' + book)
    console.log('changes saved!')
    this.setState({ openEditBookDialog: false })
    window.location.reload(false); // force refresh to update backend, should work fine
  }
  ChangeTitle(title) {
    // temporarily save the changing value; once the save button is clicked; call SaveEditBook()
    console.log(title)
    this.setState({ tmpEditTitle: title });
    console.log(this.state.tmpEditTitle);
  }

  // --------- Deleting book ----------
  onBookDeleteClick(reviewTitle) {
    console.log("Deleting a book")
    // this.bookRepository.deleteBook(reviewTitle)
    // .then(() =>{
    //    console.log("book deleted!!")
    //    console.log("calling refetch")
    //    this.RefetchBooks()
    //  })
    //  .catch(error=>{
    //    console.log("error: ", error)
    // })
  }

  // --------- Functions for Adding book ----------

  onBookAddClick() {
    console.log('Adding book')
    this.setState({ openAddBookDialog: true })
  }
  CloseAddDialog() {
    this.setState({ openAddBookDialog: false })
  }
  SaveAddBook(bookToAdd) {
    console.log("in save add book!. bookToAdd in BookPage", bookToAdd)
    // do something here to save
    // this.bookRepository.addBook(bookToAdd)
    //   .then(() => {
    //     this.setState({ openAddBookDialog: true })
    //     console.log("book added!!")
    //   })
    //   .catch(error => {
    //     console.log("error: ", error)
    //   })

    console.log('Added book!')
    console.log('Checking if saving add reads full name: ' + this.state.tmpAddTitle);
    this.setState({ openAddBookDialog: false })
    window.location.reload(false); // force refresh to update backend, should work fine
  }
  AddTitle(title) {
    // temporarily save the changing value; once the save button is clicked; call SaveEditBook()
    console.log(title)
    this.setState({ tmpAddTitle: title });
    console.log(this.state.tmpAddTitle);
  }

  RefetchBooks() {
    console.log("refetching books.....")
    // console.log("book repo", this.bookRepository)  // this.bookRepository is undefined here!!!
    // this.bookRepository.getBooks()
    //   .then(books => {
    //     this.setState({ allBookReviews: books })
    //     console.log("books successfully retreived")
    //   })
    //   .catch(error => {
    //     console.log("error: ", error)
    //   })
  }
  render() {

    return (
      <div>
        <Header />
        <NavigationBar page="/books" />
        <Container maxWidth="md">
          {/* End hero unit */}
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={() => { this.setState({ openAddBookDialog: true }) }} color="primary" startIcon={<AddCircleOutlineIcon />}
              variant="text">Add a New Book</Button>
          </Stack>
          <Grid container spacing={4}>
            <BookList books={this.state.allBookReviews}
              onViewClick={book => this.onBookViewClick(book)}
              onEditClick={book => this.onBookEditClick(book)}
              onDeleteClick={book => this.onBookDeleteClick(book)}
            />
            <ViewBookDialog book={this.state.bookToView} open={this.state.openViewBookDialog} CloseDialog={() => { this.CloseViewDialog() }} />
            <EditBookDialog book={this.state.bookToEdit}
              open={this.state.openEditBookDialog}
              CloseDialog={() => { this.CloseEditDialog() }}
              SaveEditBook={book => this.SaveEditBook(book)}
              EditTitle={title => this.ChangeTitle(title)}
            />
            <AddBookDialog book={this.state.bookToEdit}
              open={this.state.openAddBookDialog}
              CloseDialog={() => { this.CloseAddDialog() }}
              SaveAddBook={book => this.SaveAddBook()}
              AddTitle={title => this.AddTitle(title)}
              RefetchBooks={this.RefetchBooks}
            />
          </Grid>
        </Container>
      </div>
    )
  }
}
export default MyBookPage;