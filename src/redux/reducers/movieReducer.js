import {
  MOVIE_LIST,
  SEARCH_RESULT,
  SEARCH_QUERY,
  MOVIE_TYPE,
  RESPONSE_PAGE,
  MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS,
  LOAD_MORE_RESULTS
} from '../types';

const initialState = {
  list: [],
  searchResult: [],
  searchQuery: '',
  movieType: 'now_playing',
  movie: [],
  page: 1,
  totalPages: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload
      };
    case SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    case MOVIE_TYPE:
      return {
        ...state,
        movieType: action.payload
      };
    case MOVIE_DETAILS:
      return {
        ...state,
        movie: action.payload
      };
    case CLEAR_MOVIE_DETAILS:
      return {
        ...state,
        movie: []
      };
    case RESPONSE_PAGE:
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case LOAD_MORE_RESULTS:
      return {
        ...state,
        list: [...state.list, ...action.payload]
      };
    default:
      return state;
  }
};
