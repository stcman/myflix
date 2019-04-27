export const elements = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-field'),
    listMedia: document.querySelector('.data'),
    resultContainer: document.querySelector('.results__pages'),
    mediaDetails: document.querySelector('.media-details'), 
    mediaListItem: document.querySelector('.media'),
    mediaText: document.querySelector('.media-text'),
    mediaDetPg: document.querySelector('.review-pg-btns'),
    mediaRes: document.querySelector('.results')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const renderCantFind = (parent, input)=> {
    const travolta = 
    `
    <div class="travolta">
        <img class="cant-find" src="./img/travolta.gif" alt="">
        <h2>No Results for "${input}"</h2>
    </div>
    `

    parent.insertAdjacentHTML('afterbegin', travolta);
}

export const clearTravolta = () => {
    const travolta = document.querySelector(`.travolta`);
    if (travolta) travolta.parentElement.removeChild(travolta);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
