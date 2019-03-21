import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import BackIcon from 'react-ionicons/lib/IosArrowBack';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors, register } from '../../auth/actions';
import TextInput from '../../components/TextInput';
import { isInstanceValid } from '../../validation/validator';
import { ruleSetRegister } from './models';

class RegisterPage extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    name: '',
    isSubmitAttempted: false
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, name } = this.state;

    if (isInstanceValid({ email, password, name }, ruleSetRegister)) {
      this.props.register({ email, password, name }, this.props.history);
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
      <div className="full-height-container">
        <Card style={{ width: '25rem' }} className="mx-2">
          <Card.Header>
            Register to Ask.it
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
                rules={ruleSetRegister.email}
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="example@email.com"
                type="text"
                isValidationVisible={this.state.isSubmitAttempted}
              />

              <TextInput
                name="password"
                label="Password"
                rules={ruleSetRegister.password}
                onChange={this.handleChange}
                value={this.state.password}
                placeholder="••••••••••••"
                type="password"
                isValidationVisible={this.state.isSubmitAttempted}
              />

              <TextInput
                name="name"
                label="Name"
                rules={ruleSetRegister.name}
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Jhon Doe"
                type="text"
                isValidationVisible={this.state.isSubmitAttempted}
              />

              {this.props.error && (
                <Form.Text className="text-danger mb-3">
                  {this.props.error}
                </Form.Text>
              )}

              <Form.Text className="mb-3">
                Already have an account?{' '}
                <span
                  onClick={() => this.props.history.push('/login')}
                  className="text-primary cursor-pointer"
                >
                  Login
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
    { register, clearErrors }
  )(RegisterPage)
);
