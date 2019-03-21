import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const ComponentLoader = ({ isVisible, loaderTop }) => {
  if (!isVisible) return null;
  const loaderClass = classNames('component-loader', {
    'position-top': loaderTop
  });
  return (
    <div className={loaderClass}>
      <ClipLoader sizeUnit="px" size={20} color="#666" loading />
    </div>
  );
};

ComponentLoader.propTypes = {
  isVisible: PropTypes.bool,
  loaderTop: PropTypes.bool
};

ComponentLoader.defaultProps = {
  isVisible: true,
  loaderTop: false
};

export default ComponentLoader;
