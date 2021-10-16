import React from "react"
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function BookReview(props){

    return(
        <div>
            <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.info.rating} / 5 
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }} color="text.primary">
                        {props.info.reviewTitle}
                    </Typography>
                    <Typography variant="body2">
                        {props.info.reviewText}
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"> Edit </Button>
                    <Button size="small"> Delete </Button>
                </CardActions>
            </Card>
        </div>
    )
}
export default BookReview;