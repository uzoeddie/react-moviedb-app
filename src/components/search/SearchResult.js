import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './SearchResult.scss';
import '../content/grid/Grid.scss';
import { IMAGE_URL } from '../../services/movies.service';
import LazyImage from '../content/lazy-image/LazyImage';
import Rating from '../content/rating/Rating';

const SearchResult = (props) => {
  const { searchResult, searchQuery } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <div data-testid="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((data, i) => (
          <Fragment key={uuidv4()}>
            {data.poster_path && (
              <div>
                <LazyImage
                  className="grid-cell"
                  src={`${IMAGE_URL}/${data.poster_path}`}
                  alt="placeholder"
                >
                  <div className="grid-read-more">
                    <button className="grid-cell-button">
                      <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>
                        READ MORE
                      </Link>
                    </button>
                  </div>
                  <div className="grid-detail">
                    <span className="grid-title">{data.title}</span>
                    <div className="grid-rating">
                      <Rating rating={data.vote_average} totalStars={1} />
                      &nbsp;&nbsp;
                      <div className="grid-vote-average">{data.vote_average}</div>
                    </div>
                  </div>
                </LazyImage>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
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
