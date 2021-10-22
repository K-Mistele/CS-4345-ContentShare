import React from "react"
import { Link } from "react-router-dom"

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Header from "../Header/Header"
import NavigationBar from "../NavigationBar/NavigationBar"

import movieReviewsData from "../../temp_data/movieReviewsData"


class MyMoviePage extends React.Component{

    constructor(){
        super();
        this.state = {
            allMovieReviews: []
        }
    } 

    componentDidMount(){
        this.setState({
            allMovieReviews: movieReviewsData,
            openAddMovieDialog: true,
        })
    }

    render(){
  
        const movieReviews = this.state.allMovieReviews.map((review) => {
            return(
            <Grid item key={review.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {review.reviewTitle}
                    </Typography>
                    <Typography>
                      { review.rating} / 5
                    </Typography>
                    <Typography variant="body2">
                        {review.reviewText}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component = { Link } size = "small" to = {`/movies/${review.id}`} state={{ title: review.reviewTitle }}>View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>)
        })

        return(
            <div>
            <Header/> 
            <NavigationBar page = "Movies"/> 
            <Container maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    
                    { movieReviews }
                          
                </Grid>
            </Container>
            </div>
        )
    }
}
export default MyMoviePage; 