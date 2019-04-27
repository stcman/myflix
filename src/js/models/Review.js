import axios from 'axios';

export default class Review {
    constructor(id){
        this.id = id;
    }

    async getReview(){
        const key = `ee88403e8f0bc70d045fe967ee7c49a1`;
        try {
            const res = await axios(`https://api.themoviedb.org/3/movie/${this.id}/reviews?api_key=${key}`);
            this.reviewsArr = res.data.results;
        }catch(err) {
            alert(err);
        }
    }
}