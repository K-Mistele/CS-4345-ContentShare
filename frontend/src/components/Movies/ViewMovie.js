import React from "react"

 import { useLocation } from 'react-router-dom'


function ViewMovie(props){

    const location = useLocation();
    const title = location.state?.title
    const rating = location.state?.rating
    const text = location.state?.text
    
    return(
        <div>
            <p> { props.match.params.id} </p> 
            <p> { title } </p> 
            <p> { rating } </p> 
            <p> { text } </p> 
        </div> 

    )

}

export default ViewMovie;