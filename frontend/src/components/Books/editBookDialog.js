import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { bookRepo } from "../../api/bookRepo"

export class EditBookDialog extends React.Component {

  bookRepository = new bookRepo();

  constructor(props) {
    super(props);
    this.state = {
      "@rid": this.props.book["@rid"],
      "bookTitle": this.props.book.bookTitle,
      "bookAuthor": this.props.book.bookAuthor,
      "reviewTitle": this.props.book.reviewTitle,
      "reviewRating": this.props.book.reviewRating,
      "reviewText": this.props.book.reviewText,
      "reviewImageUrl": this.props.reviewImageUrl
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.book.bookTitle !== prevProps.book.bookTitle) {
      this.setState({
        "@rid": this.props.book["@rid"],
        "bookTitle": this.props.book.bookTitle,
        "bookAuthor": this.props.book.bookAuthor,
        "reviewTitle": this.props.book.reviewTitle,
        "reviewRating": this.props.book.reviewRating,
        "reviewText": this.props.book.reviewText,
        "reviewImageUrl": this.props.reviewImageUrl

      })
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    var ratings = ['1', '2', '3', '4', '5']
    if (typeof this.state.reviewRating == 'number') {
      this.state.reviewRating = this.state.reviewRating.toString()
    }
    if (this.state.bookTitle == '' || this.state.bookAuthor == '' || this.state.reviewRating == null || this.state.reviewText == '' || this.state.reviewTitle == '') {
      alert('Please fill in the required fields!')
      this.props.CloseDialog()
      return
    }
    else if (!ratings.includes(this.state.reviewRating)) {
      alert('Ratings should be 1,2,3,4,5')
      this.props.CloseDialog()
      return
    }
    this.bookRepository.editBook(this.state)
      .then(() => {
        alert('Changes updated!')
        this.props.RefetchBooks();
      })
      .catch(error => {
        console.log("error: ", error)
      })
    this.props.CloseDialog()
  }

  render() {
    return (
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Edit Book: {this.props.book.bookTitle}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '28ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="standard-basic" name="bookTitle" required label="Book Title" variant="standard" defaultValue={this.props.book.bookTitle} onChange={this.handleChange} />
              <TextField id="standard-basic" name="reviewTitle" required label="Review Title" variant="standard" defaultValue={this.props.book.reviewTitle} onChange={this.handleChange} />
              <TextField id="standard-basic" name="bookAuthor" required label="Book Author" variant="standard" defaultValue={this.props.book.bookAuthor} onChange={this.handleChange} />
              <TextField
                required
                id="outlined-number"
                label="Rating"
                type="number"
                name="reviewRating"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: 5, min: 1
                  }
                }}
                defaultValue={this.props.book.reviewRating}
                onChange={this.handleChange}
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '58ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              autoFocus
              margin="dense"
              name="reviewText"
              id="revewText"
              label="Review Text"
              fullWidth
              variant="standard"
              defaultValue={this.props.book.reviewText}
              onChange={this.handleChange}
            />
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '58ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="dense"
              name="reviewImgUrl"
              id="img"
              label="Image Url"
              fullWidth
              variant="standard"
              defaultValue={this.props.book.reviewImgUrl}
              onChange={this.handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.CloseDialog()}>Cancel</Button>
          <Button onClick={this.handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    )
  } // end render 

} // end class 