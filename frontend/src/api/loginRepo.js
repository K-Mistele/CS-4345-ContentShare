import axios from 'axios';

export class loginRepo{

    //url = "http://localhost:80"
    config = {

    };

    loginUser(user){
        console.log("trying to sign in")
        return new Promise((resolve, reject)=>{
            axios.post(`/user/login`, user)
            .then(response=>{
                //console.log("here")
                //console.log(response)
                //console.log(response.data.token)
                localStorage.setItem('jwt_token', response.data.token)
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    register(newUser){
        console.log("trying to sign in")
        return new Promise((resolve, reject)=>{
            axios.post(`/user/register`, newUser)
                .then(response=>{
                    //console.log("here")
                    //console.log(response)
                    resolve()
                    })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })

    }
    
} // end class 