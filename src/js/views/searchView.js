import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.listMedia.innerHTML = '';
    elements.resultContainer.innerHTML = '';
};

export const clearDetails = () => {
    elements.mediaDetails.innerHTML = '';
}

/* Render Movie Results */

const maxOverview = (ovr) => {
    var sentence = '';
    if(ovr.length > 80){
        let words = ovr.split(' ');
        for(var i = 0; i < 13; i++){
            sentence = `${sentence} ${words[i]}`;
        }
        return `${sentence}...`;
    }else {
        return ovr;
    }
}

const maxTitle = (title) => {
    var sentence = '';
    if(title.length > 19){
        let words = title.split(' ');
        if(words.length > 3){
            var end = words.length/2 - 1;
        }else{
            end = words.length;
        }
        for(var i = 0; i < end ; i++){
            sentence = `${sentence} ${words[i]}`;
        }
        return `${sentence}...`;
    }else {
        return title;
    }
}


const renderMedia = media => {
    let markup = `
    <li>
        <a class="media-link" href="#${media.id}">
            <div class="media">
                <img src="https://image.tmdb.org/t/p/w500${media.poster_path}" alt="">
                <div class="desc">
                    <h2>${maxTitle(media.original_title)}</h2>
                    <br>
                    <p>${maxOverview(media.overview)}</p>
                </div>
            </div>
        </a>
    </li>
`;

elements.listMedia.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
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

    elements.resultContainer.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (medias, page = 1, resPerPage = 5) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;


    let mediasArr = medias.slice(start, end);
    mediasArr.forEach(el => {
        renderMedia(el);
    });

    // render pagination buttons
    renderButtons(page, medias.length, resPerPage);
}

export const highlightSelected = (id) => {
   let media_select =  document.querySelectorAll('.media');
   media_select = [...media_select];
   media_select.forEach(el => {
       el.classList.remove('media-active');
   });

   $(`.media-link[href*="${id}"] div:first`).addClass("media-active");

}