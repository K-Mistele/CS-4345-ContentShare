import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { movieRepo } from "../../api/movieRepo"

export class AddMovieDialog extends React.Component {

  movieRepository = new movieRepo();
  constructor(props) {
    super(props);
    this.state = {
      "movieTitle": "",
      "reviewTitle": "",
      "reviewRating": null,
      "reviewText": "",
      "reviewImageUrl": ""
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    // sanity checks
    var ratings = ['1', '2', '3', '4', '5']
    if (this.state.movieTitle == '' || this.state.reviewTitle == '' || this.state.reviewRating == null || this.state.reviewText == '') {
      alert('Please fill in the required fields!')
      //clear the states
      this.setState({
        "movieTitle": "",
        "reviewTitle": "",
        "reviewRating": null,
        "reviewText": "",
        "reviewImageUrl": ""
      })
      this.props.CloseDialog()
      return
    }
    else if (!ratings.includes(this.state.reviewRating)) {
      alert('Ratings should be 1,2,3,4,5')
      // clear the states
      this.setState({
        "movieTitle": "",
        "reviewTitle": "",
        "reviewRating": null,
        "reviewText": "",
        "reviewImageUrl": ""
      })
      this.props.CloseDialog()
      return
    }
    // do something here to save
    this.movieRepository.addMovie(this.state)
      .then(() => {
        alert('Movie added successfully!')
        // clear fields
        this.setState({
          "movieTitle": "",
          "reviewTitle": "",
          "reviewRating": null,
          "reviewText": "",
          "reviewImageUrl": ""
        })
        this.props.RefetchMovies()
      })
      .catch(error => {
        console.log("error: ", error)
      })
    this.props.CloseDialog()

  }

  render() {
    return (
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Add Movie</DialogTitle>
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
              <TextField id="standard-basic" required label="Movie Title" variant="standard" name="movieTitle" onChange={this.handleChange} />
              <TextField id="standard-basic" required label="Review Title" variant="standard" name="reviewTitle" onChange={this.handleChange} />
              <TextField
                required
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
              required
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