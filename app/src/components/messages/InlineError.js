import React from 'react';
import PropTypes from 'prop-types';

function InlineError({ text }) {
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

