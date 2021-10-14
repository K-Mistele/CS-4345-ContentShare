import React from "react"

function MovieReview(props){

    return(
        <div>
            <h2> { props.info.reviewTitle } </h2> 
            <h3> { props.info.reviewText } </h3>
            <h3> { props.info.rating } </h3> 
        </div>
    )
}
export default MovieReview; 