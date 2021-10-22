import React from "react"

// we might need to make this a class and call the backend to get the title, review, etc even though all the info should be in MyMoviePage 

// import { useLocation } from 'react-router-dom'


function ViewMovie(props){


    return(
        <div>
            { props.match.params.id}
            {//state.title
            }
        </div> 

    )

}

export default ViewMovie;