import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const EditMovieDialog = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
    <DialogTitle>Edit Movie: {props.movie.movieTitle}</DialogTitle>
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
          <TextField id="standard-basic" required label="Movie Title" variant="standard" defaultValue={props.movie.movieTitle} onChange={e => props.EditTitle(e.target.value)}/>
          <TextField id="standard-basic" required label="Review Title" variant="standard" defaultValue={props.movie.reviewTitle} />
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
            defaultValue={props.movie.reviewRating}
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
        defaultValue={props.movie.reviewText}
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
        defaultValue={props.movie.reviewImgUrl}
      />   
      </Box>
      </DialogContent>
    <DialogActions>
      <Button onClick={() => props.CloseDialog()}>Cancel</Button>
      <Button onClick={() => props.SaveEditMovie(props.movie.id)}>Save</Button>
    </DialogActions>
  </Dialog>
