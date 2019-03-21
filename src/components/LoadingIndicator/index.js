import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <ClipLoader sizeUnit="px" size={30} color="#666" loading />
  </div>
);

export default LoadingIndicator;
