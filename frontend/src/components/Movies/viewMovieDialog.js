import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const ViewMovieDialog = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
    <DialogTitle>{props.movie.movieTitle}</DialogTitle>
    <DialogContent>
      <Grid container spacing={1} sx={{ mt: 0, mb: 2 }}>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={6}>
          {
            props.movie.reviewImgUrl && <Paper
              component="img"
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
                width: 250
              }}
              src={props.movie.reviewImgUrl}
            >
            </Paper>
          }
          {
            !props.movie.reviewImgUrl && <Typography>No Image Added.</Typography>
          }

        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={6} lg={6}>
          <Container
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              width: 250
            }}
          >
            <Typography variant="subtitle1">
              {props.movie.reviewTitle}
            </Typography>
            <Rating name="read-only" value={props.movie.reviewRating} readOnly />

            <Typography variant="subtitle2">
              {props.movie.reviewText}
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.CloseDialog()}>Close</Button>
    </DialogActions>
  </Dialog>
