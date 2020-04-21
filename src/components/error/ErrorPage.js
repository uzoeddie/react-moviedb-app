import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ErrorPage.scss';
import { setError } from '../../redux/actions/errors';

const ErrorPage = ({ setError, navigate }) => {
  const history = useHistory();

  const navigateToHomePage = () => {
    setError({ message: '', statusCode: null });
    history.push('/');
    navigate();
  };

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div className="error-link" onClick={() => navigateToHomePage()}>
        <i className="icon-home"></i> Go back to home page.
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  setError: PropTypes.func,
  navigate: PropTypes.func
};

export default connect(null, { setError })(ErrorPage);
