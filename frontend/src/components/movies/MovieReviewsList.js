import React from "react"
import MovieReview from "./MovieReview"
import movieReviewsData from "../../temp_data/movieReviewsData"

import NavigationBar from "../NavigationBar/NavigationBar"

class MovieReviewsList extends React.Component{

    constructor(){
        super();
        this.state = {
            allMovieReviews: []
        }
    } 

    componentDidMount(){
        this.setState({
            allMovieReviews: movieReviewsData
        })
    }
    
    render(){
        const movieReviews = this.state.allMovieReviews.map((review) =>{
            return < MovieReview info = {review} />
        })

        return (

            <div>
            <NavigationBar page = "Movies"/> 
                <div className = "rowCHANGELATER">
                    { movieReviews }
                </div> 
            </div>
        )
    } //end render 
}

export default MovieReviewsList;