import axios from "axios";

export class TestRepository {
    url = 'http://localhost:8080';
    config = {
        
    };

    helloWorld() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/public/register`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                console.log("Error.");
                reject();
            });
        });
    }

}