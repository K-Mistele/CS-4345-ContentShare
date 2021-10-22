import React from "react"

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import NavigationBar from "./components/NavigationBar/NavigationBar"
import Header from "./Header"

import bookReviewsData from "./temp_data/bookReviewsData"


class MyBookPage extends React.Component{

    constructor(){
        super();
        this.state = {
            allBookReviews: []
        }
    } 

    componentDidMount(){
        this.setState({
            allBookReviews: bookReviewsData,
            openAddBookDialog: true,
        })
    }

    render(){

        const BookReviews = this.state.allBookReviews.map((review) => {
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
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>)
        })

        return(
            <div>
            <Header/> 
            <NavigationBar page = "Books"/> 
            <Container maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    
                    { BookReviews }
                          
                </Grid>
            </Container>
            </div>
        )
    }
}
export default MyBookPage; 