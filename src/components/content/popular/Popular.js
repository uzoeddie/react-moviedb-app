import React, { useState, useEffect, useRef, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Popular.scss';
import { IMAGE_URL } from '../../../services/movies.service';

const Popular = (props) => {
  const { list } = props;
  const [movieData, setMovieData] = useState([]);
  const [speed] = useState(2);
  // let [requestId, setRequestId] = useState(undefined);
  const imgRef = useRef(list.map(() => createRef()));
  let images = [];
  let rects = [];

  useEffect(() => {
    const movieList = list;
    setMovieData(movieList);

    rectsStyle();
    animate();

    // eslint-disable-next-line
  }, [list, images, imgRef.current]);

  const rectsStyle = () => {
    if (images.length) {
      images.map((img, index) => {
        const style = getComputedStyle(img);
        const rect = {
          left: index * (300 + 25),
          top: 0,
          width: 300,
          height: parseInt(style.height, 10)
        };
        rects.push(rect);
        return '';
      });
    }
  };

  const animate = () => {
    if (rects.length) {
      const imageList = images.length;
      for (let i = 0; i < imageList; i++) {
        const img = images[i];
        const rect = rects[i];
        if (rect) {
          rect.left -= speed;
          if (rect.left + rect.width < 0) {
            // this image if fully overflowing left, put it at the end of the image list both in position and in images and rects
            const lastRect = rects[rects.length - 1];
            rect.left = lastRect.left + lastRect.width + 25;
            images = images.slice(1, imageList);
            images.push(img);
            rects = rects.slice(1, imageList);
            rects.push(rect);
            i--;
          }
          if (img) {
            // change the actual image style according to new rect value
            img.style.left = rect.left + 'px';
          }
        }
      }
      window.requestAnimationFrame(animate);
    }
  };

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <>
      <div className="scrolling-wrapper">
        {movieData.map((data, i) => (
          <div className="scroll-image" ref={(el) => images.push(el)} key={data.id}>
            <img
              className="img"
              ref={imgRef.current[i]}
              src={`${IMAGE_URL}/${data.poster_path}`}
              alt=""
            />
            <div className="read-more">
              <button className="cell-button">
                <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>READ MORE</Link>
              </button>
            </div>
            <div className="details">
              <div className="title">{data.title}</div>
              <div className="subtitle">{data.release_date}</div>
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i> &nbsp;
                {data.vote_average} <span>/ 10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Popular.propTypes = {
  list: PropTypes.array,
  movieType: PropTypes.string
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, {})(Popular);
