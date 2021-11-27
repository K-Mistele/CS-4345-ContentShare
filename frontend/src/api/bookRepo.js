import axios from 'axios';

export class bookRepo{

    url = "http://localhost:80"
    

    getBooks(){
        console.log("getting book reviews for a user")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/user/reviews/books`, config)
            .then(response=>{
            console.log("here in book get")
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

    addBook(bookToAdd){
        console.log("book to add in repo", bookToAdd)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.put(`${this.url}/review/book`, bookToAdd, config)
            .then(response=>{
                resolve(response.data)
                console.log("success adding book")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }



} // end class 