import React, { useState, useEffect } from 'react';

import './Carousel.scss';

const Carousel = (props) => {
    const { images } = props;
    const [slideCount, setSlideCount] = useState(0);
    const [slidesStyles, setSlidesStyles] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slidesCssStyles = {
            width: `${ 100 * images.length }%`,
            transform: `translateX(${ -1 * index * (100 / images.length)}%)`,
        };
        setSlidesStyles(slidesCssStyles);

        // eslint-disable-next-line
    }, [images, index]);

    const nextImage = () => {
        setSlideCount(prev => prev + 1);
        setIndex(slideCount + 1);
    }
    
    const previousImage = () => {
        setSlideCount(prev => prev - 1);
        setIndex(slideCount - 1);
    }

    const renderArrows = () => {
        return (
          <div className="slider-arrows">
            { slideCount > 0 ?
              <button
                className='slider-arrow slider-arrow--left'
                onClick={previousImage} /> : null }
            {  slideCount < images.length - 1 ?
              <button
                className='slider-arrow slider-arrow--right'
                onClick={nextImage} /> : null }
          </div>
        );
    }

    return (
        <>
            <div className="carousel">
                { renderArrows() }
                <div style={slidesStyles} className="carousel-divs">
                    {images.map((photo) => {
                        if (images.indexOf(photo) === slideCount) {
                            return (
                                <div 
                                    key={photo.id} 
                                    className={`carousel-slides`}
                                    style={{backgroundImage: `url(${photo.url})`}}
                                ></div>
                            )
                        }
                        return ''
                    })}
                </div>
            </div>
        </>
    )
}

export default Carousel;
