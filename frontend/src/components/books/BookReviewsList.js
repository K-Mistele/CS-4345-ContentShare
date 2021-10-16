import React from "react"
import BookReview from "./BookReview"
import bookReviewsData from "../../temp_data/bookReviewsData"

import NavigationBar from "../NavigationBar/NavigationBar"


class BookReviewsList extends React.Component{

    constructor(){
        super();
        this.state = {
            allBookReviews: []
        }
    } 

    componentDidMount(){
        this.setState({
            allBookReviews: bookReviewsData
        })
    }
    
    render(){
        const bookReviews = this.state.allBookReviews.map((review) =>{
            return < BookReview info = {review} />
        })

        return (

            <div>
            <NavigationBar page = "Books"/>
                <div className = "rowCHANGELATER">
                    { bookReviews }
                </div> 
            </div>
        )
    } //end render 
}

export default BookReviewsList;