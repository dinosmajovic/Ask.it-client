import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import ComponentLoader from '../../../../components/ComponentLoader';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const UserInfo = (props) => {
  if (!props.user) {
    return <ComponentLoader isVisible loaderTop />;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 profile-info-card">
          <Card className="mb-3">
            <Card.Header>Answers</Card.Header>
            <Card.Body>
              <Card.Title className="text-center text-info">
                {props.user.answers}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 profile-info-card">
          <Card className="mb-3">
            <Card.Header>Questions</Card.Header>
            <Card.Body>
              <Card.Title className="text-center text-info">
                {props.user.questions}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 profile-info-card">
          <Card className="mb-3">
            <Card.Header>Member since</Card.Header>
            <Card.Body>
              <Card.Title className="text-center text-info">
                {timeAgo.format(Date.parse(props.user.createdAt))}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object
};

UserInfo.defaultProps = {
  user: null
};

const mapStateToProps = (state) => ({
  user: state.profilePage.userDetails.user
});

export default connect(
  mapStateToProps,
  {}
)(UserInfo);
