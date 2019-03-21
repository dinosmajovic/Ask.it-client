import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import RefreshIcon from 'react-ionicons/lib/MdRefresh';
import { connect } from 'react-redux';
import { createQuestion, fetchQuestions } from '../../actions/questions';

class CreateQuestion extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    createQuestion: PropTypes.func.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    question: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createQuestion({ text: this.state.question });
    this.setState({
      question: ''
    });
  };

  fetchQuestions = () => {
    this.props.fetchQuestions({ page: 1, take: 20 });
  };

  render() {
    const disabledButton =
      this.state.question.length === 0 || this.props.isLoading;

    if (this.props.user) {
      return (
        <Card className="mb-2">
          <Card.Header>
            Recent Questions
            <span className="float-right">
              <RefreshIcon
                onClick={this.fetchQuestions}
                fontSize="20px"
                color="#999"
                className="mt-1 cursor-pointer"
              />
            </span>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  style={{ resize: 'none' }}
                  type="text"
                  placeholder="My question.."
                  name="question"
                  value={this.state.question}
                  onChange={this.handleChange}
                  isInvalid={false}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid question
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                className="float-right"
                disabled={disabledButton}
              >
                Ask a question
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }
    return (
      <Card className="mb-2">
        <Card.Header>
          Recent Questions
          <span className="float-right">
            <RefreshIcon
              onClick={this.fetchQuestions}
              fontSize="20px"
              color="#999"
              className="mt-1 cursor-pointer"
            />
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>You have to be logged in to ask a question.</Card.Text>

          <Button
            variant="primary"
            onClick={() => this.props.history.push('/login')}
            className="float-right"
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.homePage.questions.createQuestion.isLoading
});

export default connect(
  mapStateToProps,
  { fetchQuestions, createQuestion }
)(CreateQuestion);
