import {elements} from './base';

export const renderMediaDet = (mediaDet) => {
    let markup = 
    `
    <div class="img-holder">
        <img src="https://image.tmdb.org/t/p/w500${mediaDet.image}" alt="">
    </div>
    <div class="media-text">
        <h2>${mediaDet.title}</h2>
        <p><span>Release Date:</span>${mediaDet.release}</p>
        <p><span>Generes:</span>${mediaDet.genres}</p>
        <p><span>Overview:</span>${mediaDet.overview}</p>
        <div class="popularity">
            <p>${mediaDet.rating}</p>
        </div>
        <button class="${mediaDet.id} see-review"><p>Check out the reviews here!</p></button>
    </div>
    `;

    elements.mediaDetails.insertAdjacentHTML('afterbegin', markup);
}