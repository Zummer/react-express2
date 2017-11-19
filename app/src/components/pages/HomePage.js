import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

function HomePage({...props}) {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to='/login'>Login</Link>
    </div>
  );
}

HomePage.defaultProps = {};

HomePage.propTypes = {};

export default HomePage;
