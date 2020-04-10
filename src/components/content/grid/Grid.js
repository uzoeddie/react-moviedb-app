import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import './Grid.scss';
import { IMAGE_URL } from '../../../services/movies.service';
import Rating from '../rating/Rating';
import LazyImage from '../lazy-image/LazyImage';

const Grid = (props) => {
  const { list } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);

    // eslint-disable-next-line
  }, [list]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <>
      <div className="grid">
        {movieData.map((data) => (
          <div key={uuidv4()}>
            <LazyImage
              className="grid-cell"
              src={`${IMAGE_URL}/${data.poster_path}`}
              alt="placeholder"
            >
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>READ MORE</Link>
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
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array,
  movieType: PropTypes.string
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, {})(Grid);
