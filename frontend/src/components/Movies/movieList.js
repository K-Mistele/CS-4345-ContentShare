import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export const MovieList = props => <Container maxWidth="md" sx= {{mt:5}}>
{/* End hero unit */}
<Grid container spacing={4}>
    
    {
        props.movies.map((movie, i) => {
            if (movie.reviewText.length > 150) {
              var contentToShow = movie.reviewText.substring(0, 150)+'...'
            }
            else {
              var contentToShow = movie.reviewText
            }
              return(
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.movieTitle}
                      </Typography>
                      <Typography>
                        <Rating name="read-only" value={movie.reviewRating} readOnly />
                      </Typography>
                      <Typography variant="body2" > 
                          {/* {this.state.contentToShow} */}
                          {contentToShow}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={()=>props.onViewClick(movie.id)}>View</Button>
                      <Button onClick={()=>props.onEditClick(movie.id)}>Edit</Button>
                      <Button onClick={()=>props.onDeleteClick(movie.id)} color='error' variant='outlined'>Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>)
          })
    }
          
</Grid>
</Container>