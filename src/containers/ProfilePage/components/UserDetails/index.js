import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PropTypes from 'prop-types';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink, withRouter } from 'react-router-dom';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const UserDetails = (props) => {
  if (props.user) {
    return (
      <div className="sticky-sidebar">
        <Card className="mb-3">
          <Card.Header>Profile Details</Card.Header>
          <Card.Body>
            <Card.Title className="text-primary">{props.user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {props.user.email}
            </Card.Subtitle>

            <Card.Text>Active since: {timeAgo.format(Date.parse(props.user.createdAt))}</Card.Text>
            <Card.Text>Answers: {props.user.answers}</Card.Text>
          </Card.Body>
        </Card>

        <ListGroup varient="flush" className="mb-3">
          <NavLink
            className="link-unstyled"
            exact
            to={`${props.match.url}`}
            activeClassName="text-info"
          >
            <ListGroup.Item>Info</ListGroup.Item>
          </NavLink>
          <NavLink
            className="link-unstyled"
            exact
            to={`${props.match.url}/questions`}
            activeClassName="text-info"
          >
            <ListGroup.Item>
              Questions
              <Badge variant="info" className="float-right mt-1">
                {props.user.questions}
              </Badge>
            </ListGroup.Item>
          </NavLink>
          {props.isCurrentUser && (
            <NavLink
              className="link-unstyled"
              exact
              to={`${props.match.url}/settings`}
              activeClassName="text-info"
            >
              <ListGroup.Item>Settings</ListGroup.Item>
            </NavLink>
          )}
        </ListGroup>
      </div>
    );
  }

  return null;
};

UserDetails.propTypes = {
  isCurrentUser: PropTypes.bool,
  user: PropTypes.object,
  match: PropTypes.object.isRequired
};

UserDetails.defaultProps = {
  user: null,
  isCurrentUser: null
};

export default withRouter(UserDetails);
