import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const AddMovieDialog = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
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
          <TextField id="standard-basic" label="Movie Title" variant="standard" onChange={e => props.AddTitle(e.target.value)}/>
          <TextField id="standard-basic" label="Review Title" variant="standard"/>
          <TextField
            id="outlined-number"
            label="Rating"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 5, min: 1
              }
            }}
          />
        </div>
      </Box>
      <TextField
        autoFocus
        margin="dense"
        id="revewText"
        label="Review Text"
        fullWidth
        variant="standard"
        defaultValue={props.movie.reviewText}
      /> 
      <TextField
        autoFocus
        margin="dense"
        id="img"
        label="Image Url"
        fullWidth
        variant="standard"
        defaultValue={props.movie.reviewImgUrl}
      />   
      </DialogContent>
    <DialogActions>
      <Button onClick={() => props.CloseDialog()}>Cancel</Button>
      <Button onClick={() => props.SaveAddMovie()}>Add</Button>
    </DialogActions>
  </Dialog>
