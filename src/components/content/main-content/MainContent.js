import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './MainContent.scss';
import Slider from '../slider/Slider';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movies.service';
import { setResponsePageNumber, getMovies } from '../../../redux/actions/movies';
import Paginate from '../../pagination/Paginate';

const MainContent = (props) => {
    const { 
        list, 
        totalPages, 
        page, 
        movieType, 
        setResponsePageNumber, 
        getMovies
    } = props;
    const [currentPage, setCurrentPage] = useState(page);
    const [images, setImages] = useState([]);
    const randomMovies =  list.sort(() => Math.random() - Math.random()).slice(0, 3);

    useEffect(() => {
        setCurrentPage(currentPage);
        setResponsePageNumber(currentPage, totalPages);
        getMovies('now_playing', currentPage);

        if (randomMovies.length) {
            const IMAGES = [
                {
                    id: 1,
                    url: `${IMAGE_URL}/${randomMovies[0].backdrop_path}`
                },
                {
                    id: 2,
                    url: `${IMAGE_URL}/${randomMovies[1].backdrop_path}`
                },
                {
                    id: 3,
                    url: `${IMAGE_URL}/${randomMovies[2].backdrop_path}`
                },
            ];
            setImages(IMAGES);
        }

        // eslint-disable-next-line
    }, [currentPage]);


    const paginate = type => {
        if (type === 'prev' && currentPage >= 1) {
            setCurrentPage(prev => prev - 1);
        } else {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="main-content">
            <Slider 
                loop={true}
                showNav={true}
                showArrows={true}
                images={images}
            />
            <div className="grid-movie-title">
                <div className="movieType">{movieType}</div>
                <div className="paginate"><Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} /></div>
            </div>
            <Grid />
        </div>
    )
}

const mapStateToProps = state => ({
    list: state.movies.list,
    totalPages: state.movies.totalPages,
    page: state.movies.page,
    movieType: state.movies.movieType,
});

export default connect(
    mapStateToProps,
    { setResponsePageNumber, getMovies }
)(MainContent);
