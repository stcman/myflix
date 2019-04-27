import axios from 'axios';

export default class Media {
    constructor(id){
        this.id = id;
    }

    async getMedia(){
        const key = `ee88403e8f0bc70d045fe967ee7c49a1`;
        try {
            const res = await axios(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}`);
            const genresArr = res.data.genres;
            this.media_id = res.data.id;
            this.image = res.data.poster_path;
            this.title= res.data.original_title;
            this.release = res.data.release_date;
            this.overview = res.data.overview;
            this.rating = res.data.vote_average;
            this.genres = [];
            genresArr.forEach(el => { //genre names are in array of objects along with id so need to just extract name
               this.genres.push(el.name); 
            });
            this.genres = this.genres.join(',');

        }catch(err) {
            alert(err);
        }
    }
}