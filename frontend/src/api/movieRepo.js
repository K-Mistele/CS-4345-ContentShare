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
    
} // end class 