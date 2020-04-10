import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Slider.scss';

const Slider = (props) => {
  const { loop, showArrows, showNav, images } = props;
  const [state, setState] = useState({
    index: 0,
    lastIndex: 0,
    transition: false
  });
  const [slidesStyles, setSlidesStyles] = useState(null);
  const [slidesClasses, setSlidesClasses] = useState('slider-slides');
  const imagesArray = [];

  const { index, lastIndex, transition } = state;

  useEffect(() => {
    const slidesCssStyles = {
      width: `${100 * images.length}%`,
      transform: `translateX(${-1 * index * (100 / images.length)}%)`
    };
    setSlidesStyles(slidesCssStyles);

    const slidesClasses = transition ? 'slider-slides slider-slides--transition' : 'slider-slides';
    setSlidesClasses(slidesClasses);

    // eslint-disable-next-line
  }, [images, index, transition]);

  const goToSlide = (index) => {
    // if (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    // }

    if (index < 0) {
      index = loop ? images.length - 1 : 0;
    } else if (index >= images.length) {
      index = loop ? 0 : images.length - 1;
    }

    setState((prevState) => ({
      ...prevState,
      index,
      lastIndex: index,
      transition: true
    }));
  };

  const renderNav = () => {
    const nav = images.map((slide, i) => {
      const buttonClasses =
        i === lastIndex ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={buttonClasses} key={i} onClick={() => goToSlide(i)} />;
    });

    return <div className="slider-nav">{nav}</div>;
  };

  const renderArrows = () => {
    const arrowsClasses = showNav ? 'slider-arrows' : 'slider-arrows slider-arrows--noNav';
    return (
      <div className={arrowsClasses}>
        {loop || lastIndex > 0 ? (
          <button
            className="slider-arrow slider-arrow--left"
            onClick={() => goToSlide(lastIndex - 1)}
          />
        ) : null}
        {loop || lastIndex < images.length - 1 ? (
          <button
            className="slider-arrow slider-arrow--right"
            onClick={() => goToSlide(lastIndex + 1)}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="slider">
      {showArrows ? renderArrows() : null}
      {showNav ? renderNav() : null}
      <div className={slidesClasses} style={slidesStyles}>
        {/* { children } */}
        {images.map((data) => (
          <div
            ref={(el) => imagesArray.push(el)}
            className="slider-image"
            key={data.id}
            style={{ backgroundImage: `url(${data.url})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  images: PropTypes.array,
  loop: PropTypes.bool,
  showNav: PropTypes.bool,
  showArrows: PropTypes.bool
};

export default Slider;
