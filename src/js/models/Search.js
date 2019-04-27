import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults () {
        const key = `ee88403e8f0bc70d045fe967ee7c49a1`;
        try {
            const res = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.query}`);
            this.result = res.data.results;
        }catch(err) {
            alert(err);
        }
    }


}
