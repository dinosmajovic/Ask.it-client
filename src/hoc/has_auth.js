import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.user.authenticated
  });

  ComposedComponent.propTypes = {
    auth: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  return connect(mapStateToProps)(ComposedComponent);
};
