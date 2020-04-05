import { 
    MOVIE_LIST,
    SET_ERROR,
    SEARCH_RESULT,
    SEARCH_QUERY,
    MOVIE_TYPE,
    RESPONSE_PAGE,
    MOVIE_DETAILS,
    CLEAR_MOVIE_DETAILS
} from '../types';
import { 
    API_URL, 
    SEARCH_API_URL,
    MOVIE_DETAILS_URL,
    MOVIE_CREDITS_URL,
    MOVIE_IMAGES_URL,
    MOVIE_VIDEOS_URL,
    MOVIE_REVIEWS_URL
} from '../../services/movies.service';

export const getMovies = (type, pageNumber) => async dispatch => {
    try {
        const movies = await API_URL(type, pageNumber);
        const { results, page, total_pages } = movies.data;
        const payload = { 
            page, 
            totalPages: total_pages 
        };
        dispatchMethod(MOVIE_LIST, results, dispatch);
        dispatchMethod(RESPONSE_PAGE, payload, dispatch);
    } catch (error) {
        if (error.response) {
            dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
        }
    }
}

export const searchResult = query => async dispatch => {
    try {
        if (query) {
            const movies = await SEARCH_API_URL(query);
            const { results } = movies.data;
            dispatchMethod(SEARCH_RESULT, results, dispatch);
        } else {
            dispatchMethod(SEARCH_RESULT, [], dispatch);
        }
    } catch (error) {
        if (error.response) {
            dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
        }
    }
}

export const movieDetails = id => async dispatch => {
    try {
        const details = await MOVIE_DETAILS_URL(id);
        const credits = await MOVIE_CREDITS_URL(id);
        const images = await MOVIE_IMAGES_URL(id);
        const videos = await MOVIE_VIDEOS_URL(id);
        const reviews = await MOVIE_REVIEWS_URL(id);

        const resp = await Promise.all([details, credits, images, videos, reviews])
            .then(values => Promise.all(values.map(value => {
                return value.data
            })))
            .then(response => {
                return response;
            });
        dispatchMethod(MOVIE_DETAILS, resp, dispatch);
    } catch (error) {
        if (error.response) {
            dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
        }
    }
}

export const clearMovieDetails = () => async dispatch => {
    dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
}


export const searchQuery = query => async dispatch => {
    dispatchMethod(SEARCH_QUERY, query, dispatch);
}

export const setMovieType = type => async dispatch => {
    dispatchMethod(MOVIE_TYPE, type, dispatch);
}

export const setResponsePageNumber = (page, totalPages) => async dispatch => {
    const payload = { page, totalPages };
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
}

const dispatchMethod = (type, payload, dispatch) => {
    dispatch({
        type,
        payload
    });
}