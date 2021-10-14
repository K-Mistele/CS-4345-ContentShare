import React from "react"

function MovieReview(props){

    return(
        <div>
            <h2> { props.info.reviewTitle } </h2> 
            <p> { props.info.reviewText } </p>
            <p> { props.info.rating } </p> 
        </div>
    )
}
export default MovieReview; 