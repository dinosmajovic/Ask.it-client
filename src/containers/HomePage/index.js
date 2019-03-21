import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../auth/actions';
import PageContainer from '../PageContainer';
import { fetchQuestions } from './actions/questions';
import { fetchTopUsers } from './actions/top-users';
import HotQuestionsList from './components/HotQuestionsList';
import Questions from './components/Questions';
import TopUsersList from './components/TopUsersList';

class HomePage extends Component {
  static propTypes = {
    isUserLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    windowWidth: 0,
    navigation: 'questions'
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  navigateTo = (navigation) => {
    this.setState({
      navigation
    });
  };

  renderDesktopPage() {
    return (
      <div className="container mt-5 mb-4" style={{ maxWidth: '1280px' }}>
        <div className="row">
          <div className="col-lg-3">
            <TopUsersList />
          </div>
          <div className="col-lg-5">
            <Questions />
          </div>
          <div className="col-lg-4">
            <HotQuestionsList />
          </div>
        </div>
      </div>
    );
  }

  renderMobilePage() {
    let renderPage;

    switch (this.state.navigation) {
      case 'topUsers':
        renderPage = <TopUsersList />;
        break;
      case 'questions':
        renderPage = <Questions />;
        break;
      case 'hotQuestions':
        renderPage = <HotQuestionsList />;
        break;
      default:
        renderPage = <Questions />;
        break;
    }

    return (
      <div className="container mt-4 mb-4" style={{ maxWidth: '1280px' }}>
        <Navbar bg="light mb-2">
          <Nav className="mx-auto text-center">
            <Nav.Link
              onClick={() => this.navigateTo('topUsers')}
              className={this.state.navigation === 'topUsers' && 'text-primary'}
            >
              Top users
            </Nav.Link>
            <Nav.Link
              onClick={() => this.navigateTo('questions')}
              className={
                this.state.navigation === 'questions' && 'text-primary'
              }
            >
              Questions
            </Nav.Link>
            <Nav.Link
              onClick={() => this.navigateTo('hotQuestions')}
              className={
                this.state.navigation === 'hotQuestions' && 'text-primary'
              }
            >
              Hot questions
            </Nav.Link>
          </Nav>
        </Navbar>
        {renderPage}
      </div>
    );
  }

  render() {
    const {
      isUserLoading,
      user,
      logout // eslint-disable-line
    } = this.props;
    const isLoading = isUserLoading;

    return (
      <PageContainer
        isInitialized={!isLoading}
        logout={logout}
        user={user}
        isUserLoading={!isUserLoading}
      >
        {this.state.windowWidth < 991
          ? this.renderMobilePage()
          : this.renderDesktopPage()}
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isUserLoading: state.user.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, fetchTopUsers, fetchQuestions }
  )(HomePage)
);
