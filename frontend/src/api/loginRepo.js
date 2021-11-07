import axios from 'axios';

export class loginRepo{

    url = "http://localhost:8080"
    config = {

    };

    loginUser(user){
        console.log("trying to sign in")
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/user/login`, user)
            .then(response=>{
            console.log(response.token)
            localStorage.setItem('jwt_token', response.token)
            resolve(response.token)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    
} // end class 