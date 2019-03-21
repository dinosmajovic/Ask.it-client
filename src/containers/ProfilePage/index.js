import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { logout } from '../../auth/actions';
import PageContainer from '../PageContainer';
import { fetchUserDetails } from './actions/user-details';
import UserDetails from './components/UserDetails';
import UserInfo from './components/UserInfo';
import UserQuestions from './components/UserQuestions';
import UserSettings from './components/UserSettings';

class ProfilePage extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
    isUserLoading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    fetchUserDetails: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    userDetails: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    userDetails: null,
    user: null
  };

  componentWillMount() {
    this.props.fetchUserDetails(this.props.match.params.id);
  }

  render() {
    const isCurrentUser =
      this.props.user && this.props.user.id === this.props.match.params.id;
    return (
      <PageContainer
        isInitialized={!this.props.isLoading && !this.props.isUserLoading}
        logout={() => this.props.logout(this.props.history)}
        user={this.props.user}
        isUserLoading={!this.props.isUserLoading}
      >
        <div className="container mt-5 mb-4">
          <div className="row">
            <div className="col-lg-4">
              <UserDetails
                user={this.props.userDetails}
                isCurrentUser={isCurrentUser}
              />
            </div>
            <div className="col-lg-8">
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.url}`}
                  component={UserInfo}
                />
                <Route
                  path={`${this.props.match.url}/questions`}
                  component={UserQuestions}
                />
                <Route
                  path={`${this.props.match.url}/settings`}
                  component={UserSettings}
                />
              </Switch>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.profilePage.userDetails.user,
  isLoading: state.profilePage.userDetails.isLoading,
  user: state.user.user,
  isUserLoading: state.user.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, fetchUserDetails }
  )(ProfilePage)
);
