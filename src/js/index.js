import Search from './models/Search';
import * as searchView from './views/searchView';
import * as mediaView from './views/mediaView';
import * as reviewView from './views/reviewView';
import {elements, renderLoader, clearLoader, renderCantFind, clearTravolta} from './views/base';
import Media from './models/Media';
import Review from './models/Review';

/** Global state of app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};
const controlSearch = async () => {
    // Get qeury from view
    const query = searchView.getInput(); //TODO
    if(query){
        // New search object and add to state
        state.search = new Search(query);

        //perform search method\
        renderLoader(elements.mediaRes); 
        await state.search.getResults();

        //3) Render Results to UI
        clearLoader();
        if(state.search.result.length < 1){
            clearTravolta();
            renderCantFind(elements.mediaRes, query);
        }else{
            clearTravolta();
            searchView.renderResults(state.search.result);
        }
        
        //if previous search has happened and url still there
        const id = window.location.hash.replace('#', '');
        searchView.clearDetails();
        const ids = [];
        state.search.result.forEach(el => {
            ids.push(`${el.id}`);
        })

        if(ids.includes(id)){
            controlMedia();
        }

    }

}


const controlReview = async () => {
    const id = window.location.hash.replace('#', '');
    if(id){
        state.review = new Review(id);

        await state.review.getReview();

        if(state.review.reviewsArr.length > 0){
            searchView.clearDetails();
        reviewView.renderResults(state.review.reviewsArr,state.search.result, id);

        elements.mediaDetails.addEventListener('click', e => { //review pagination
            const btn = e.target.closest('.rev-pag-btn');
            if (btn) {
                const goToPage = parseInt(btn.dataset.goto, 10);
                searchView.clearDetails();
                reviewView.renderResults(state.review.reviewsArr, state.search.result, id, goToPage);
            }
            
        });
            
        }else {
            reviewView.noReviewNotifcation();
        }
    }

}

 elements.searchForm.addEventListener('submit', e => {
     e.preventDefault(); // Stop page refresh on form submit
     searchView.clearResults();
    controlSearch();
    searchView.clearInput();
 })

 elements.resultContainer.addEventListener('click', e => { //media pagination
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
    
    

    const id = window.location.hash.replace('#', '');
        if($(`.media-link[href*="${id}"]`)){
        $(`.media-link[href*="${id}"] div:first`).addClass("media-active");
        }
});


// 

const controlMedia = async () => {
    const id = window.location.hash.replace('#', '');


    const ids = [];

    if(state.search){ //if search has already been run

        state.search.result.forEach(el => {
            ids.push(`${el.id}`);
        })
    
        if(ids.includes(id)){
            if(id){
                state.search ? searchView.highlightSelected(id) : null;
        
                state.media = new Media(id);
        
            try{
                await state.media.getMedia();
                searchView.clearDetails();
                mediaView.renderMediaDet(state.media);
                document.querySelector('.see-review').addEventListener('click', controlReview);
            } catch(err){
                console.log(err);
            }
            }
        }

    }

}

['hashchange'].forEach(event => window.addEventListener(event, controlMedia));
