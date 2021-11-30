import axios from 'axios';

export class friendRepo{

    // url = "http://localhost:80"

    addFriend(newFriend){
        console.log("friend to add in repo", newFriend)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.post(`/friend/request`, newFriend, config)
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
            axios.get(`/friend`, config)
                .then(response=>{
                //console.log("here in friends get")
                //console.log(response)
                //console.log("data!!!", response.data)
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
            axios.get(`/friend/request/received`, config)
                .then(response=>{
                    //console.log("here in requests get")
                    //console.log("data!!!", response.data)
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
            axios.post(`/friend/request/accept`, uuid, config)
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

    denyFriendRequest(uuid){
        console.log("in denying friend req")
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            },
        }
        return new Promise((resolve, reject)=>{
            axios.post(`/friend/request/deny`, uuid, config)
            .then(response=>{
                resolve(response.data)
                console.log("success denying friend!")
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    getAFriendsMovies(uuid){
        //console.log("getting friend's movies...in friend")
        //console.log("uuid is: ", uuid)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        let body = {
            "uuid": uuid
        } 
        return new Promise((resolve, reject)=>{
            axios.post(`/friend/reviews`, body, config)
                .then(response=>{
                    //console.log("here in requests get")
                    //console.log("data!!!", response.data)
                    resolve(response.data.movieReviews)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    getAFriendsBooks(uuid){
        //console.log("getting friend's books...in friend")
        //console.log("uuid is: ", uuid)
        let config = {
            headers:{
                'x-access-token': localStorage.getItem('jwt_token')
            }
        }
        let body = {
            "uuid": uuid
        } 
        return new Promise((resolve, reject)=>{
            axios.post(`/friend/reviews`, body, config)
                .then(response=>{
                    //console.log("here in requests get")
                    //console.log("data!!!", response.data)
                    resolve(response.data.bookReviews)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }
    

} // end class 