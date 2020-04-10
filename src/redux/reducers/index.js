import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import movieReducer from "./movieReducer";
// import loaderReducer from './loaderReducer';

const rootReducers = combineReducers({
  errors: errorReducer,
  movies: movieReducer,
});

export default rootReducers;
