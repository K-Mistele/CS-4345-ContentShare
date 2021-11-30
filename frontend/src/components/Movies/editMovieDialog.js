import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { movieRepo } from "../../api/movieRepo"

export class EditMovieDialog extends React.Component{

  movieRepository = new movieRepo()
  
  constructor(props){
    super(props);
    this.state = {
      "@rid": this.props.movie["@rid"],
      "movieTitle": this.props.movie.movieTitle,
      "reviewTitle": this.props.movie.reviewTitle,
      "reviewRating": this.props.movie.reviewRating,
      "reviewText": this.props.movie.reviewText,
      "reviewImgUrl": this.props.movie.reviewImgUrl 
    }
    console.log(this.state.movieTitle); 

    console.log("in editMovie constructor")
  } // end constructor 

  componentDidUpdate(prevProps, prevState, snapshot){

    if (this.props.movie.movieTitle !== prevProps.movie.movieTitle){
      this.setState({
        "@rid": this.props.movie["@rid"],
        "movieTitle": this.props.movie.movieTitle,
        "reviewTitle": this.props.movie.reviewTitle,
        "reviewRating": this.props.movie.reviewRating,
        "reviewText": this.props.movie.reviewText,
        "reviewImgUrl": this.props.movie.reviewImgUrl 
        
      })
    }
  }

  handleChange = (event) =>{
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    // sanity checks
    var ratings = ['1','2','3','4','5']
    if (typeof this.state.reviewRating == 'number') {
      this.state.reviewRating = this.state.reviewRating.toString()
    }
    if (this.state.movieTitle == '' || this.state.reviewTitle == '' || this.state.reviewRating == null || this.state.reviewText == '') {
      alert('Required fields cannot be blank!')
      // clear the states
      this.setState({
        "@rid": this.props.movie["@rid"],
        "movieTitle": this.props.movie.movieTitle,
        "reviewTitle": this.props.movie.reviewTitle,
        "reviewRating": this.props.movie.reviewRating,
        "reviewText": this.props.movie.reviewText,
        "reviewImgUrl": this.props.reviewImgUrl 
      })
      this.props.CloseDialog()
      window.location.reload(false)
      return
    }  
    else if (!ratings.includes(this.state.reviewRating)){
      alert('Ratings should be 1,2,3,4,5')
      this.setState({
        "@rid": this.props.movie["@rid"],
        "movieTitle": this.props.movie.movieTitle,
        "reviewTitle": this.props.movie.reviewTitle,
        "reviewRating": this.props.movie.reviewRating,
        "reviewText": this.props.movie.reviewText,
        "reviewImgUrl": this.props.reviewImgUrl 
      })
      this.props.CloseDialog()
      window.location.reload(false)
      return
    }  
    
    // do something here to save
    this.movieRepository.editMovie(this.state)
      .then(() => {
        alert('Changes updated!')
        this.props.RefetchMovies()
      })
      .catch(error => {
        console.log("error: ", error)
      })
    this.props.CloseDialog()

  }

  revertChanges() {
    this.setState({
      "@rid": this.props.movie["@rid"],
      "movieTitle": this.props.movie.movieTitle,
      "reviewTitle": this.props.movie.reviewTitle,
      "reviewRating": this.props.movie.reviewRating,
      "reviewText": this.props.movie.reviewText,
      "reviewImgUrl": this.props.reviewImgUrl 
    })
  }

  render(){
    return(
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Edit Movie: {this.props.movie.movieTitle}</DialogTitle>
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
              <TextField id="standard-basic" required label="Movie Title" variant="standard" 
                        value={this.state.movieTitle} onChange={this.handleChange}
                        name = "movieTitle"/>
              <TextField id="standard-basic" required label="Review Title" variant="standard" 
                        value={this.state.reviewTitle}
                        onChange = {this.handleChange}
                        name = "reviewTitle" />
              <TextField
                required
                id="outlined-number"
                label="Rating"
                type="number"
                variant="standard" 
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: 5, min: 1
                  }
                }}
                value={this.state.reviewRating}
                name = "reviewRating"
                onChange = { this.handleChange } 
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
            autoFocus
            required
            margin="dense"
            id="revewText"
            label="Review Text"
            fullWidth
            variant="standard"
            value={this.state.reviewText}
            name = "reviewText"
            onChange = { this.handleChange }
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
            value={this.state.reviewImgUrl}
            name = "reviewImgUrl"
            onChange = { this.handleChange }
          />   
          </Box>
          </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.props.CloseDialog(); this.revertChanges();}}>Cancel</Button>
          <Button onClick={this.handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      ) 

  } //end render 
} // class