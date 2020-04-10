import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './SearchResult.scss';
import { IMAGE_URL } from '../../services/movies.service';
import LazyImage from '../content/lazy-image/LazyImage';

const SearchResult = (props) => {
  const { searchResult, searchQuery } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <>
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((data, i) => (
          <Fragment key={data.id}>
            {data.poster_path && (
              <LazyImage
                className="grid-cell"
                src={`${IMAGE_URL}/${data.poster_path}`}
                alt="placeholder"
              >
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read more</button>
                </div>
                <div className="grid-detail">
                  <span className="grid-title">{data.title}</span>
                  <div className="grid-rating">
                    <i className="fas fa-star"></i> {data.vote_average} <span>/ 10</span>
                    <span className="grid-date">{data.release_date}</span>
                  </div>
                </div>
              </LazyImage>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

SearchResult.propTypes = {
  searchResult: PropTypes.array,
  searchQuery: PropTypes.string
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery
});

export default connect(mapStateToProps, {})(SearchResult);
