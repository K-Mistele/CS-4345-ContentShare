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
import Divider from '@mui/material/Divider';

export const ViewMovieDialog = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
    <DialogTitle><Grid
      justify="space-between" // Add it here :)
    // spacing={24}
    >
      <Grid item style={{ flex: 1 }}>
        {props.movie.reviewTitle}
      </Grid>
      <Grid item align="right">
        <Rating name="read-only" value={props.movie.reviewRating} readOnly />
      </Grid>
    </Grid>
    </DialogTitle>
    <DialogContent>
      {
        !props.movie.reviewImgUrl && <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
            width: 540,
            mt: -2
          }}
        >
          <Typography variant="subtitle1">
            {props.movie.movieTitle}
          </Typography>
          <Divider sx={{ mb: 1, mt: 1 }} />
          <Typography variant="body1">
            {props.movie.reviewText}
          </Typography>
        </Container>
      }
      {
        props.movie.reviewImgUrl && <Grid container spacing={0} sx={{ mt: 0, mb: 2 }}>
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

          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ ml: -4, mt: -2 }}>
            <Container
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
                width: 335
              }}
            >
              <Typography variant="subtitle1">
                {props.movie.movieTitle}
              </Typography>
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Typography variant="body1">
                {props.movie.reviewText}
              </Typography>
            </Container>
          </Grid>
        </Grid>
      }

    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.CloseDialog()}>Close</Button>
    </DialogActions>
  </Dialog>
