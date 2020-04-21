import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import SearchResult from '../search/SearchResult';
import Spinner from '../loader/Spinner';
import { setResponsePageNumber, loadMoreMovies } from '../../redux/actions/movies';
import { pathURL } from '../../redux/actions/routes';

const Main = (props) => {
  const {
    searchResult,
    totalPages,
    page,
    setResponsePageNumber,
    loadMoreMovies,
    movieType,
    pathURL,
    match,
    errors
  } = props;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    pathURL(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
    // eslint-disable-next-line
  }, [currentPage, totalPages, match]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineOffsetTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineOffsetTop <= containerHeight) {
      fetchData();
    }
  };

  return (
    <>
      <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {!errors.message && !errors.statusCode && !errors.error && (
              <div className="content">
                {searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}
              </div>
            )}
          </>
        )}
        <div ref={bottomLineRef}></div>
      </div>
    </>
  );
};

Main.propTypes = {
  searchResult: PropTypes.array,
  searchQuery: PropTypes.string,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  list: PropTypes.array,
  setResponsePageNumber: PropTypes.func,
  loadMoreMovies: PropTypes.func,
  movieType: PropTypes.string,
  pathURL: PropTypes.func,
  match: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  list: state.movies.list,
  totalPages: state.movies.totalPages,
  page: state.movies.page,
  movieType: state.movies.movieType,
  errors: state.errors
});

export default connect(mapStateToProps, { setResponsePageNumber, loadMoreMovies, pathURL })(Main);
