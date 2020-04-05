import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Header.scss';
import SearchBar from '../search/SearchBar';
import { getMovies, setMovieType, setResponsePageNumber, clearMovieDetails } from '../../redux/actions/movies';

const HEADER_LIST = [
    {
        id: 1,
        iconClass: 'fas fa-film',
        name: 'Now Playing',
        type: 'now_playing'
    },
    {
        id: 2,
        iconClass: 'fas fa-fire',
        name: 'Popular',
        type: 'popular'
    },
    {
        id: 3,
        iconClass: 'fas fa-star',
        name: 'Top Rated',
        type: 'top_rated'
    },
    {
        id: 4,
        iconClass: 'fas fa-plus-square',
        name: 'Upcoming',
        type: 'upcoming'
    },
];

const Header = (props) => {
    const { getMovies, setMovieType, page, totalPages, setResponsePageNumber, clearMovieDetails } = props;
    const [type, setType] = useState('now_playing');

    const history = useHistory();

    useEffect(() => {
        getMovies(type, page);
        setResponsePageNumber(page, totalPages);
        
        // eslint-disable-next-line
    }, [type, page, totalPages]);

    const setMovieUrlType = (type, name) => {
        setType(type);
        setMovieType(name);
    }

    const navigateToHomePage = () => {
        clearMovieDetails();
        history.push('/');
    }

    return (
        <div className="header-menu">
            <div className="header-link" onClick={() => navigateToHomePage()}>
                <img className="logo" src="http://placehold.it/50x50" alt="" />
                <span className="title">MovieDB</span>
            </div>
            <div className="menu">
                {
                    HEADER_LIST.map((data, i) => 
                        <span 
                            key={data.id}
                            className={data.type !== type ? 'active item1' : 'item1'} 
                            onClick={() => setMovieUrlType(data.type, data.name)}>
                            <i className={data.iconClass}></i>
                            {data.name}
                        </span>
                    )
                }
            </div>
            <div className="header-search">
                <SearchBar />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    list: state.movies.list,
    totalPages: state.movies.totalPages,
    page: state.movies.page,
});

export default connect(
    mapStateToProps,
    { getMovies, setMovieType, setResponsePageNumber, clearMovieDetails }
)(Header);
