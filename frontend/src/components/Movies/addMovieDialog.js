import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { movieRepo } from "../../api/movieRepo"

export class AddMovieDialog extends React.Component{

  movieRepository = new movieRepo(); 
  constructor(props){
    super(props);
    console.log("in addMovie construcotr")
    this.state = {
      "movieTitle": "",
      "reviewTitle": "",
      "reviewRating": null,
      "reviewText": "",
      "reviewImageUrl": ""
    }
  }

  handleChange = (event) =>{

    const name = event.target.name
    const value = event.target.value 
    console.log("value: ", value)
    this.setState({[name]: value})
  }

  handleSubmit = () =>{

    console.log("in save add movie!. movieToAdd in MoviePage",  this.state)
    // do something here to save
    this.movieRepository.addMovie(this.state)
    .then(() =>{
       console.log("movie added!!")
     })
     .catch(error=>{
       console.log("error: ", error)
    })
  }

  render(){
    return(
    <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
      <DialogTitle>Add Movie HELLO</DialogTitle>
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
            <TextField id="standard-basic" label="Movie Title" variant="standard" name = "movieTitle" onChange={this.handleChange}/>
            <TextField id="standard-basic" label="Review Title" variant="standard" name = "reviewTitle" onChange = {this.handleChange}/>
            <TextField
              id="outlined-number"
              label="Rating"
              type="number"
              name = "reviewRating"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: 5, min: 1
                }
              }}
            onChange = { this.handleChange} />
          </div>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="revewText"
          label="Review Text"
          name = "reviewText"
          fullWidth
          variant="standard"
          onChange = { this.handleChange }
        /> 
        <TextField
          autoFocus
          margin="dense"
          id="img"
          label="Image Url"
          fullWidth
          variant="standard"
          name = "reviewImageUrl"
          onChange = { this.handleChange }
        />   
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