import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import SearchResult from '../search/SearchResult';
import Spinner from '../loader/Spinner';
import { setResponsePageNumber, loadMoreMovies } from '../../redux/actions/movies';

const Main = (props) => {
  const { searchResult, totalPages, page, setResponsePageNumber, loadMoreMovies } = props;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [noMoreData, setNoMoreData] = useState(false);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setResponsePageNumber(currentPage, totalPages);
    loadMoreMovies('now_playing', currentPage);

    // eslint-disable-next-line
  }, [currentPage, searchResult]);

  const fetchData = () => {
    if (noMoreData) {
      return;
    }

    if (page >= totalPages) {
      setNoMoreData(true);
      loadMoreMovies('now_playing', currentPage);
    } else {
      setCurrentPage((prev) => prev + 1);
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
            <div className="content">
              {searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}
            </div>
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
  loadMoreMovies: PropTypes.func
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  list: state.movies.list,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});

export default connect(mapStateToProps, { setResponsePageNumber, loadMoreMovies })(Main);
