import PropTypes from 'prop-types';
import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import Navbar from '../../components/Navbar';

const PageContainer = (props) => (
  <div className="container-fullwidth">
    <Navbar
      logout={props.logout}
      login={props.login}
      user={props.user}
      isUserLoading={props.isUserLoading}
    />
    {props.isInitialized ? props.children : <LoadingIndicator />}
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isInitialized: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func,
  user: PropTypes.object,
  isUserLoading: PropTypes.bool.isRequired
};

PageContainer.defaultProps = {
  login: null,
  user: null
};

export default PageContainer;
