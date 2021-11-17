import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// import { bookRepo } from "../../api/bookRepo"

export class AddBookDialog extends React.Component {

  //   bookRepository = new bookRepo(); 
  constructor(props) {
    super(props);
    this.state = {
      "bookTitle": "",
      "reviewTitle": "",
      "reviewRating": null,
      "reviewText": "",
      "reviewImageUrl": ""
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log("value: ", value)
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    console.log("in save add book!. bookToAdd in BookPage", this.state)
    // do something here to save
    // this.bookRepository.addBook(this.state)
    // .then(() =>{
    //    console.log("book added!!")
    //    console.log("calling refetch")
    //    this.props.RefetchBooks()
    //  })
    //  .catch(error=>{
    //    console.log("error: ", error)
    // })
    // this.props.CloseDialog()

  }

  render() {
    return (
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Add Book</DialogTitle>
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
              <TextField id="standard-basic" label="Book Title" variant="standard" name="bookTitle" onChange={this.handleChange} />
              <TextField id="standard-basic" label="Review Title" variant="standard" name="reviewTitle" onChange={this.handleChange} />
              <TextField id="standard-basic" label="Book Author" variant="standard" name="bookAuthor" onChange={this.handleChange} />
              <TextField
                id="outlined-number"
                label="Rating"
                type="number"
                variant="standard"
                name="reviewRating"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: 5, min: 1
                  }
                }}
                onChange={this.handleChange} />
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
              autoFocus
              margin="dense"
              id="revewText"
              label="Review Text"
              name="reviewText"
              fullWidth
              variant="standard"
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
              id="img"
              label="Image Url"
              fullWidth
              variant="standard"
              name="reviewImageUrl"
              onChange={this.handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.CloseDialog()}>Cancel</Button>
          <Button onClick={this.handleSubmit}
          >Add</Button>
        </DialogActions>
      </Dialog>
    )
  } //end render 
} //end class 