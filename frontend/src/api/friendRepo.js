import axios from 'axios';

export class friendRepo{

    url = "http://localhost:80"

    addFriend(newFriend){
        console.log("friend to add in repo", newFriend)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/friend/request`, newFriend, config)
            .then(response=>{
                resolve(response.data)
                console.log("success requesting friend!")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    getFriends(){

        console.log("getting friends of a user")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/friend`, config)
                .then(response=>{
                console.log("here in friends get")
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

    getUserRequests(){

        console.log("getting friend ~requests~ of a user")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/friend/request/received`, config)
                .then(response=>{
                    console.log("here in requests get")
                    console.log("data!!!", response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })

    }

    acceptFriendRequest(uuid){
        console.log("in accepting friend req")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.post(`${this.url}/friend/request/accept`, uuid, config)
            .then(response=>{
                resolve(response.data)
                console.log("success accepting friend!")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    getAFriendsMovies(uuid){
        console.log("getting friend's movies...in friend")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        let body = {
            "uuid": uuid
        } 
        return new Promise((resolve, reject)=>{
            axios.get(`${this.url}/friend/reviews`, body, config)
                .then(response=>{
                    console.log("here in requests get")
                    console.log("data!!!", response.data)
                    resolve(response.data.movieReviews)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }
    

    /*
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

    deleteBook(reviewTitle){
        console.log("the title in deleteBook is", reviewTitle)
        console.log("in book repo...deleting")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
            data:{
                "reviewTitle": reviewTitle
            }
        }
        return new Promise((resolve, reject)=>{
            axios.delete(`${this.url}/review/book`, config)
            .then(response=>{
                resolve(response.data)
                console.log("success deleting book")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    editBook(book){
        console.log("in edit...book to edit in repo", book)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.patch(`${this.url}/review/book`, book, config)
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

    */ 

} // end class 