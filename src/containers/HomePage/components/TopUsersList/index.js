import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import RefreshIcon from 'react-ionicons/lib/MdRefresh';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ComponentLoader from '../../../../components/ComponentLoader';
import { fetchTopUsers } from '../../actions/top-users';

class TopUsers extends Component {
  static propTypes = {
    users: PropTypes.array,
    fetchTopUsers: PropTypes.func.isRequired,
    error: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    users: null,
    error: null
  };

  componentDidMount() {
    this.fetchTopUsers();
  }

  fetchTopUsers = () => {
    this.props.fetchTopUsers();
  };

  goToProfile = (id) => {
    this.props.history.push(`/profile/${id}`);
  };

  render() {
    const users =
      this.props.users &&
      this.props.users.map((user) => (
        <ListGroup.Item
          className="cursor-pointer"
          onClick={() => this.goToProfile(user.id)}
          key={user.id}
        >
          {user.name}
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-right">{user.answers} answers</Tooltip>
            }
            placement="right"
          >
            <Badge variant="info" className="float-right mt-1">
              {user.answers}
            </Badge>
          </OverlayTrigger>
        </ListGroup.Item>
      ));

    return (
      <>
        <Card>
          <ComponentLoader isVisible={this.props.isLoading} />
          <Card.Header>
            Top 10 users
            <span>
              <RefreshIcon
                onClick={this.fetchTopUsers}
                fontSize="20px"
                color="#999"
                className="float-right mt-1 cursor-pointer"
              />
            </span>
          </Card.Header>
          {!this.props.error && <ListGroup variant="flush">{users}</ListGroup>}
        </Card>
        {this.props.error && (
          <Alert variant="danger">{this.props.error.message}</Alert>
        )}
        {!this.props.isLoading &&
          this.props.users &&
          this.props.users.length === 0 && (
          <Alert variant="info">There are no top users.</Alert>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.homePage.topUsers.users,
  isLoading: state.homePage.topUsers.isLoading,
  error: state.homePage.topUsers.error
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchTopUsers }
  )(TopUsers)
);
