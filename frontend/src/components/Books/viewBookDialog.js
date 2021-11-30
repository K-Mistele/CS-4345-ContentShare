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

export const ViewBookDialog = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
    <DialogTitle>
    <Grid
      justify="space-between" // Add it here :)
      // spacing={24}
    >
      <Grid item style={{ flex: 1 }}>
      {props.book.reviewTitle}
      </Grid>
      <Grid item align="right">
      <Rating name="read-only" value={props.book.reviewRating} readOnly />
      </Grid>
    </Grid>
    </DialogTitle>
    <DialogContent>
      {
        !props.book.reviewImgUrl && <Container
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
          Book: {props.book.bookTitle}
        </Typography>
        <Typography variant="subtitle2" align="right">
          {props.book.bookAuthor}
        </Typography>
        <Divider sx={{ mb: 1, mt: 1 }}/>
        <Typography variant="body1">
          {props.book.reviewText}
        </Typography>
      </Container>
      }
      {
        props.book.reviewImgUrl && <Grid container spacing={0} sx={{ mt: 0, mb: 2 }}>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={6}>
            {
                props.book.reviewImgUrl &&<Paper
                component="img"
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 300,
                  width: 250
                }}
                src={props.book.reviewImgUrl}
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
              {props.book.bookTitle}
            </Typography>
            <Typography variant="subtitle2" align="right">
              {props.book.bookAuthor}
            </Typography>
            <Divider sx={{ mb: 1, mt: 1 }}/>
            <Typography variant="body1">
              {props.book.reviewText}
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
