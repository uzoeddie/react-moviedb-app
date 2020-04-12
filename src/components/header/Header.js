import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Header.scss';
import {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  clearMovieDetails,
  searchResult,
  searchQuery
} from '../../redux/actions/movies';
import logo from '../../assets/movie-logo.svg';

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
  }
];

const Header = (props) => {
  const {
    getMovies,
    setMovieType,
    page,
    totalPages,
    setResponsePageNumber,
    clearMovieDetails,
    searchResult,
    searchQuery
  } = props;
  const [type, setType] = useState('now_playing');
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);
  const menuRef = useRef();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);

    if (location.pathname !== '/') {
      setDisableSearch(true);
    }

    // eslint-disable-next-line
  }, [type, location, disableSearch]);

  const setMovieUrlType = (type, name) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
      setType('now_playing');
      setMovieType('Now Playing');
    } else {
      setType(type);
      setMovieType(name);
    }
  };

  const navigateToHomePage = () => {
    setDisableSearch(false);
    clearMovieDetails();
    history.push('/');
  };

  const onSearchChange = async (e) => {
    setSearch(e.target.value);
    searchResult(e.target.value);
    searchQuery(e.target.value);

    if (e.target.value === '') {
      getMovies('now_playing');
    }
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setNavClass(navClass);
    setMenuClass(menuClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <>
      <div className="header-nav-wrapper" data-testid="header">
        <div className="grad-bar"></div>
        <div className="header-navbar">
          <div className="header-image" onClick={() => navigateToHomePage()}>
            <img src={logo} alt="" />
          </div>
          <div
            className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`}
            id="header-mobile-menu"
            ref={menuRef}
            onClick={() => toggleMenu()}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST.map((data, i) => (
              <li
                key={data.id}
                className={data.type === type ? 'active-item header-nav-item' : 'header-nav-item'}
                onClick={() => setMovieUrlType(data.type, data.name)}
              >
                <span className="header-list-icon">
                  <i className={data.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{data.name}</span>
              </li>
            ))}
            <input
              className={`search-input ${disableSearch ? 'disabled' : ''}`}
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Search for a movie"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  searchResult: PropTypes.func,
  searchQuery: PropTypes.func,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  list: PropTypes.array,
  setResponsePageNumber: PropTypes.func,
  setMovieType: PropTypes.func,
  getMovies: PropTypes.func,
  clearMovieDetails: PropTypes.func
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});

export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  clearMovieDetails,
  searchResult,
  searchQuery
})(Header);
