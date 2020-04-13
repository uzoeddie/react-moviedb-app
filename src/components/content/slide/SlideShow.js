import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './SlideShow.scss';

const SlideShow = (props) => {
  const { images, auto } = props;
  const [state, setState] = useState({
    slideshow: images[0],
    slideIndex: 0
  });
  const [sliderTimeout, setSliderTimeout] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { slideshow, slideIndex } = state;

  let currentSlideIndex = 0;

  useEffect(() => {
    setState({
      ...state,
      slideIndex: 0,
      slideshow: images[0]
    });
    if (auto) {
      const timeout = setInterval(function () {
        autoMoveSlide();
      }, 5000);
      setSliderTimeout(timeout);

      return () => {
        clearInterval(timeout);
        clearInterval(sliderTimeout);
      };
    }

    // eslint-disable-next-line
  }, [images]);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState((prev) => ({
      ...prev,
      slideIndex: currentSlideIndex,
      slideshow: images[currentSlideIndex]
    }));
  };

  const showSliderArrow = (type) => {
    let index = currentIndex;
    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length) {
        index += 1;
      }
      if (index === images.length) {
        index = 0;
      }
    }
    setCurrentIndex(index);
    setState((prev) => ({
      ...prev,
      slideIndex: index,
      slideshow: images[index]
    }));
  };

  const Indicators = (props) => {
    const { currentSlide } = props;
    const listIndicators = images.map((slide, i) => {
      const btnClasses =
        i === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={btnClasses} key={i} />;
    });

    return <div className="slider-nav">{listIndicators}</div>;
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => showSliderArrow('prev')} />
        <div className="slider-arrow slider-arrow--right" onClick={() => showSliderArrow('next')} />
      </div>
    );
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {images && images.length && slideshow && (
            <div
              className="slider-image"
              style={{ backgroundImage: `url(${slideshow.url})` }}
            ></div>
          )}
        </div>
        <Indicators currentSlide={slideIndex} />
        {!auto ? <RenderArrows /> : null}
      </div>
    </>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool.isRequired,
  currentSlide: PropTypes.number
};

export default SlideShow;
