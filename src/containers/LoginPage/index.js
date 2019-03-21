import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import BackIcon from 'react-ionicons/lib/IosArrowBack';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors, login } from '../../auth/actions';
import TextInput from '../../components/TextInput';
import { isInstanceValid } from '../../validation/validator';
import { ruleSetLogin } from './models';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.string,
    clearErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null
  };

  state = {
    email: '',
    password: '',
    isSubmitAttempted: false
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (isInstanceValid({ email, password }, ruleSetLogin)) {
      this.props.login({ email, password }, this.props.history);
    } else {
      this.setState({ isSubmitAttempted: true });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="constainer full-height-container">
        <Card style={{ width: '25rem' }} className="mx-2">
          <Card.Header>
            Login to Ask.it
            <span
              onClick={() => this.props.history.push('/')}
              className="float-right text-primary cursor-pointer"
            >
              <BackIcon fontSize="18px" color="#007bff" />
              Homepage
            </span>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={this.handleSubmit}>
              <TextInput
                name="email"
                label="Email address"
                rules={ruleSetLogin.email}
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="example@email.com"
                type="text"
                isValidationVisible={this.state.isSubmitAttempted}
              />

              <TextInput
                name="password"
                label="Password"
                rules={ruleSetLogin.password}
                onChange={this.handleChange}
                value={this.state.password}
                placeholder="••••••••••••"
                type="password"
                isValidationVisible={this.state.isSubmitAttempted}
              />

              {this.props.error && (
                <Form.Text className="text-danger mb-3">
                  {this.props.error}
                </Form.Text>
              )}

              <Form.Text className="mb-3">
                Don&#39;t have an account?{' '}
                <span
                  onClick={() => this.props.history.push('/register')}
                  className="text-primary cursor-pointer"
                >
                  Register
                </span>
              </Form.Text>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.user.error
});

export default withRouter(
  connect(
    mapStateToProps,
    { login, clearErrors }
  )(LoginPage)
);
