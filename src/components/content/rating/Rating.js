import React, { useRef, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const ratingRef = useRef();
  const [numberStars, setNumberStars] = useState();

  useEffect(() => {
    setNumberStars([...Array(totalStars).keys()].map((i) => i + 1));
    let percentage;
    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const starPercentageRounded = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentageRounded;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberStars &&
          numberStars.map((i) => (
            <Fragment key={i}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}

        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberStars &&
            numberStars.map((j) => (
              <Fragment key={j}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  totalStars: PropTypes.number,
  className: PropTypes.string
};

export default Rating;
