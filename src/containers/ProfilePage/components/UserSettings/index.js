import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ComponentLoader from '../../../../components/ComponentLoader';
import TextInput from '../../../../components/TextInput';
import { isInstanceValid } from '../../../../validation/validator';
import { changeUserPassword, editUser } from '../../actions/user-settings';
import { ruleSetPassword, ruleSetUpdate } from './models';

class UserSettings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    isEditLoading: PropTypes.bool.isRequired,
    changeUserPassword: PropTypes.func.isRequired,
    isPasswordLoading: PropTypes.bool.isRequired
  };

  state = {
    email: this.props.user.email,
    name: this.props.user.name,
    password: '',
    confirmPassword: '',
    isUpdateSubmitAttempted: false,
    isPasswordSubmitAttempted: false
  };

  handleEditUserSubmit = (e) => {
    e.preventDefault();
    const { email, name } = this.state;

    if (isInstanceValid({ email, name }, ruleSetUpdate)) {
      this.props.editUser({ email, name });
      this.setState({ isUpdateSubmitAttempted: false });
    } else {
      this.setState({ isUpdateSubmitAttempted: true });
    }
  };

  handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    if (
      isInstanceValid({ password, confirmPassword }, ruleSetPassword(password))
    ) {
      this.props.changeUserPassword(
        { password, confirmPassword },
        this.clearPasswordForm
      );
      this.setState({ isPasswordSubmitAttempted: false });
    } else {
      this.setState({ isPasswordSubmitAttempted: true });
    }
  };

  clearPasswordForm = () => {
    this.setState({
      password: '',
      confirmPassword: ''
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderEditUserForm = () => {
    const isButtonDisabled =
      this.props.user.name === this.state.name &&
      this.props.user.email === this.state.email;

    return (
      <Card className="mb-2">
        <ComponentLoader isVisible={this.props.isEditLoading} />
        <Card.Header>Update Profile</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={this.handleEditUserSubmit}>
            <TextInput
              name="email"
              label="Email address"
              rules={ruleSetUpdate.email}
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="example@email.com"
              type="text"
              isValidationVisible={this.state.isUpdateSubmitAttempted}
            />

            <TextInput
              name="name"
              label="Name"
              rules={ruleSetUpdate.name}
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Jhon Doe"
              type="text"
              isValidationVisible={this.state.isUpdateSubmitAttempted}
            />

            <Button
              disabled={isButtonDisabled}
              variant="primary"
              type="submit"
              className="float-right"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  renderChangePasswordForm() {
    const passwordRules = ruleSetPassword(this.state.password);
    const isButtonDisabled =
      this.state.password.length === 0 ||
      this.state.confirmPassword.length === 0;
    return (
      <Card>
        <ComponentLoader isVisible={this.props.isPasswordLoading} />
        <Card.Header>Change Password</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={this.handleChangePasswordSubmit}>
            <TextInput
              name="password"
              label="Password"
              rules={passwordRules.password}
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="••••••••••••"
              type="password"
              isValidationVisible={this.state.isPasswordSubmitAttempted}
            />

            <TextInput
              name="confirmPassword"
              label="Confirm password"
              rules={passwordRules.confirmPassword}
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              placeholder="••••••••••••"
              type="password"
              isValidationVisible={this.state.isPasswordSubmitAttempted}
            />

            <Button
              disabled={isButtonDisabled}
              className="float-right"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">{this.renderEditUserForm()}</div>
          <div className="col-lg-6">{this.renderChangePasswordForm()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isEditLoading: state.profilePage.userSettings.editUser.isLoading,
  isPasswordLoading: state.profilePage.userSettings.userPassword.isLoading,
  error: state.profilePage.userQuestions.error
});

export default withRouter(
  connect(
    mapStateToProps,
    { editUser, changeUserPassword }
  )(UserSettings)
);
