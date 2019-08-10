import PropTypes from 'prop-types';
import React from 'react';

export default function Author(props) {
  return <div className='book-authors'>{props.author}</div>;
}

Author.propTypes = {
  author: PropTypes.string.isRequired
};
