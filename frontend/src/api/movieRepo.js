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
            //console.log(response.data.token)
            //localStorage.setItem('jwt_token', response.data.token)
            resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    
} // end class 