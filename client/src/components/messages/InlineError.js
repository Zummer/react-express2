import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => {
  return (
    <span className="inline-error">
      {text}
    </span>
  );
}

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InlineError;

