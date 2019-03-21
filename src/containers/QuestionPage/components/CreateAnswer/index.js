import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import RefreshIcon from 'react-ionicons/lib/MdRefresh';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAnswers, createAnswer } from '../../actions';

class CreateAnswer extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createAnswer: PropTypes.func.isRequired,
    fetchAnswers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    answer: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAnswer({
      id: this.props.match.params.id,
      text: this.state.answer
    });
    this.setState({
      answer: ''
    });
  };

  fetchAnswers = () => {
    this.props.fetchAnswers({
      id: this.props.match.params.id,
      page: 1,
      take: 20
    });
  };

  render() {
    const disabledButton =
      this.state.answer.length === 0 || this.props.isLoading;

    if (this.props.user) {
      return (
        <Card className="mb-2">
          <Card.Header>
            Answers
            <span className="float-right">
              <RefreshIcon
                onClick={this.fetchAnswers}
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
                  type="text"
                  placeholder="My answer.."
                  name="answer"
                  value={this.state.answer}
                  onChange={this.handleChange}
                  isInvalid={false}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid answer
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                className="float-right"
                disabled={disabledButton}
              >
                Submit an answer
              </Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }
    return (
      <Card className="mb-2">
        <Card.Header>Answers</Card.Header>
        <Card.Body>
          <Card.Text>You have to be logged in to answer a question.</Card.Text>

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
  isLoading: state.questionPage.createAnswer.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchAnswers, createAnswer }
  )(CreateAnswer)
);
