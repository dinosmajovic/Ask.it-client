import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { validateProp } from '../../validation/validator';

class TextInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    isValidationVisible: PropTypes.bool,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    rules: {},
    value: '',
    label: '',
    name: '',
    placeholder: '',
    isDisabled: false,
    isLoading: false,
    isValidationVisible: false,
    type: 'text'
  };

  state = {
    isModified: this.props.isValidationVisible
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ isModified: nextProps.isValidationVisible });
  }

  handleChange = (e) => {
    this.setState({
      isModified: true
    });

    this.props.onChange(e);
  };

  render() {
    const { isModified } = this.state;
    const {
      name,
      label,
      value,
      rules,
      placeholder,
      type,
      isDisabled,
      isLoading
    } = this.props;

    const validationMessage =
      isModified && !isEmpty(rules) ? validateProp(value, rules) : null;

    const isValid = isEmpty(validationMessage);

    const showSuccess = isModified && isValid;

    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          name={name}
          disabled={isDisabled || isLoading}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          isInvalid={!isValid}
          isValid={showSuccess}
        />
        <Form.Control.Feedback type="invalid">
          {validationMessage}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default TextInput;
