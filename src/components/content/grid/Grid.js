import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Grid.scss';
import { IMAGE_URL } from '../../../services/movies.service';
import Rating from '../rating/Rating';

const Grid = (props) => {
    const { list } = props;
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        setMovieData(list);
        
        // eslint-disable-next-line
    }, [list]);

    const formatMovieTitle = title => {
        const titleStr = title.toLowerCase();
        return titleStr.replace(/ /g, '-');
    }
    
    return (
        <>
            <div className="grid">
                {
                    movieData.map((data) => 
                        <div key={data.id}>
                            <div  
                                className="grid-cell" 
                                style={{backgroundImage: `url(${IMAGE_URL}/${data.poster_path})`}}>
                                <div className="grid-read-more">
                                    <button className="grid-cell-button">
                                        <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>READ MORE</Link>
                                    </button>
                                </div>
                                <div className="grid-detail">
                                    <span className="grid-title">{data.title}</span>
                                    <div className="grid-rating">
                                        <Rating rating={data.vote_average} totalStars={1} />&nbsp;&nbsp;
                                        <div className="grid-vote-average">{data.vote_average}</div> 
                                        {/* <span className="grid-date">{data.release_date}</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    list: state.movies.list,
    movieType: state.movies.movieType,
});


export default connect(
    mapStateToProps,
    { }
)(Grid);
