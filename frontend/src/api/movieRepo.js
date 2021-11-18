import axios from 'axios';

export class movieRepo{

    url = "http://localhost:80"
    

    getMovies(){
        console.log("getting movie reviews for a user")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/user/reviews/movies`, config)
            .then(response=>{
            console.log("here in movie get")
            console.log(response)
            console.log("data!!!", response.data)
            resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    addMovie(movieToAdd){
        console.log("movie to add in repo", movieToAdd)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.put(`${this.url}/review/movie`, movieToAdd, config)
            .then(response=>{
                resolve(response.data)
                console.log("success adding movie")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    deleteMovie(reviewTitle){
        console.log("the title in deleteMovie is", reviewTitle)
        console.log("in movie repo...deleting")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
            data:{
                "reviewTitle": reviewTitle
            }
        }
        return new Promise((resolve, reject)=>{
            axios.delete(`${this.url}/review/movie`, config)
            .then(response=>{
                resolve(response.data)
                console.log("success deleting movie")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
}

    editMovie(movie){
        console.log("in edit...movie to edit in repo", movie)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.patch(`${this.url}/review/movie`, movie, config)
            .then(response=>{
                resolve(response.data)
                console.log("success adding movie")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    
} // end class 