import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
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
import { setError } from '../../redux/actions/errors';
import { pathURL } from '../../redux/actions/routes';
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
    searchQuery,
    routesArray,
    path,
    url,
    setError,
    pathURL,
    errors
  } = props;
  const [type, setType] = useState('now_playing');
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const detailsRoute = useRouteMatch('/:id/:name/details');

  useEffect(() => {
    if (routesArray.length) {
      if (!path && !url) {
        pathURL('/', '/');
        const error = new Error(
          `Page with pathname ${location.pathname} not found with status code 404`
        );
        setError({
          message: `Page with pathname ${location.pathname} not found.`,
          statusCode: 404
        });
        throw error;
      }
    }
    // eslint-disable-next-line
  }, [path, url, routesArray, pathURL]);

  useEffect(() => {
    if (errors.message || errors.statusCode || errors.error) {
      pathURL('/', '/');
      const error = new Error(`${errors.message} With status code ${errors.statusCode}`);
      setError({ message: errors.message, statusCode: errors.statusCode });
      throw error;
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (path && !errors.message && !errors.statusCode) {
      setError({ message: '', statusCode: null });
      getMovies(type, page);
      setResponsePageNumber(page, totalPages);
      if (detailsRoute || location.pathname === '/') {
        setHideHeader(true);
      }

      if (location.pathname !== '/' && location.key) {
        setDisableSearch(true);
      }
    }

    // eslint-disable-next-line
  }, [type, location, disableSearch, path]);

  const setMovieUrlType = (type) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
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
      {hideHeader && (
        <div className="header-nav-wrapper">
          <div className="header-bar"></div>
          <div className="header-navbar">
            <div className="header-image" onClick={() => navigateToHomePage()}>
              <img src={logo} alt="" />
            </div>
            <div
              className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`}
              id="header-mobile-menu"
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
                  onClick={() => setMovieUrlType(data.type)}
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
      )}
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
  clearMovieDetails: PropTypes.func,
  setError: PropTypes.func,
  routesArray: PropTypes.array,
  path: PropTypes.string,
  url: PropTypes.string,
  pathURL: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  totalPages: state.movies.totalPages,
  page: state.movies.page,
  routesArray: state.routes.routesArray,
  path: state.routes.path,
  url: state.routes.url,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  clearMovieDetails,
  searchResult,
  searchQuery,
  setError,
  pathURL
})(Header);
