import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './SearchBar.scss';
import { searchResult, searchQuery, getMovies } from '../../redux/actions/movies';

const SearchBar = (props) => {
  const { searchResult, searchQuery, getMovies } = props;
  const [search, setSearch] = useState('');

  const onSearchChange = async (e) => {
    setSearch(e.target.value);
    searchResult(e.target.value);
    searchQuery(e.target.value);

    if (e.target.value === '') {
      getMovies('now_playing');
    }
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          name="search"
          className="searchTerm"
          value={search}
          onChange={onSearchChange}
          placeholder="Search for a movie"
        />
      </div>
    </>
  );
};

SearchBar.propTypes = {
  searchResult: PropTypes.array,
  searchQuery: PropTypes.string,
  getMovies: PropTypes.func
};

export default connect(null, { searchResult, searchQuery, getMovies })(SearchBar);
