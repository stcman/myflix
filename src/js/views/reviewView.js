import {elements} from '../views/base';

const renderReview = (review, movie) => {
    const markup = `
    <div class="img-holder">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
    </div>
    <div class="media-text">
        <h2>${movie.original_title}<br> Review</h2>
        <div class="media-review">
            <p><span>Author: </span>${review.author}</p>
            <p>${maxRevTxt(review.content, review.url)}</p>
            <div class="review-pg-btns"></div>
    </div>
    `;

    elements.mediaDetails.insertAdjacentHTML('afterbegin', markup);
}

const maxRevTxt = (rev, revLink) => {
    var sentence = '';
    if(rev.length > 1000){
        let words = rev.split(' ');
        for(var i = 0; i < 150; i++){
            sentence = `${sentence} ${words[i]}`;
        }
        return `${sentence}... <a href="${revLink}" target="_blank">Full Review Here.</a>`;
    }else {
        return rev;
    }
}

export const noReviewNotifcation = () => {
    $('.see-review').remove();
    $('.popularity').after('<p>No Reviews Yet!</p>');
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type} rev-pag-btn" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    $(`.review-pg-btns`).prepend(button);
};

export const renderResults = (reviews, movies, id, page = 1, resPerPage = 1) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    
    let moviesArr = movies;
    let reviewsArr = reviews.slice(start, end);

    for(var i = 0; i < moviesArr.length; i++){
        if(id == moviesArr[i].id){
            var movie = moviesArr[i];
        }
    }

    reviewsArr.forEach(el => {
        renderReview(el, movie);
    });

    // render pagination buttons
    renderButtons(page, reviews.length, resPerPage);
}