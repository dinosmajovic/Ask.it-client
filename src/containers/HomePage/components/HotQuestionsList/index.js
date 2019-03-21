import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import RefreshIcon from 'react-ionicons/lib/MdRefresh';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ComponentLoader from '../../../../components/ComponentLoader';
import Question from '../../../../components/Question';
import {
  deleteQuestion,
  dislikeQuestion,
  editQuestion,
  fetchHotQuestions,
  likeQuestion
} from '../../actions/questions';

class HotQuestions extends Component {
  static propTypes = {
    user: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    questions: PropTypes.array,
    fetchHotQuestions: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    isEditLoading: PropTypes.bool.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    isDeleteLoading: PropTypes.bool.isRequired,
    likeQuestion: PropTypes.func.isRequired,
    dislikeQuestion: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null,
    questions: null,
    user: null
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    this.props.fetchHotQuestions();
  };

  render() {
    const questions =
      this.props.questions &&
      this.props.questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          userId={question.userId}
          editQuestion={this.props.editQuestion}
          isEditLoading={this.props.isEditLoading}
          deleteQuestion={this.props.deleteQuestion}
          isDeleteQuestionLoading={this.props.isDeleteLoading}
          likeQuestion={this.props.likeQuestion}
          dislikeQuestion={this.props.dislikeQuestion}
          name={question.username}
          createdAt={question.createdAt}
          answers={String(question.answers)}
          likeCount={question.likeCount}
          dislikeCount={question.dislikeCount}
          likes={question.likes}
          dislikes={question.dislikes}
          text={question.text}
          isEdited={question.isEdited}
          user={this.props.user}
          fetchQuestions={() => this.props.fetchHotQuestions()}
        />
      ));

    if (this.props.error) {
      return (
        <>
          <Card className="mb-2">
            <Card.Header>
              Hot Questions
              <span className="float-right">
                <RefreshIcon
                  onClick={this.fetchQuestions}
                  fontSize="20px"
                  color="#999"
                  className="mt-1 cursor-pointer"
                />
              </span>
            </Card.Header>
          </Card>
          <p>error</p>
        </>
      );
    }

    return (
      <>
        <Card className="mb-2">
          <Card.Header>
            Hot Questions
            <span className="float-right">
              <RefreshIcon
                onClick={this.fetchQuestions}
                fontSize="20px"
                color="#999"
                className="mt-1 cursor-pointer"
              />
            </span>
          </Card.Header>
        </Card>
        <div className="position-relative">
          {!this.props.isLoading &&
            this.props.questions &&
            this.props.questions.length === 0 && (
            <Alert variant="info">There are no hot questions.</Alert>
          )}
          <ComponentLoader isVisible={this.props.isLoading} loaderTop />
          {questions}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLoading: state.homePage.questions.hotQuestions.isLoading,
  error: state.homePage.questions.hotQuestions.error,
  questions: state.homePage.questions.hotQuestions.questions,
  isEditLoading: state.homePage.questions.editQuestion.isLoading,
  isDeleteLoading: state.homePage.questions.deleteQuestion.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchHotQuestions,
      editQuestion,
      deleteQuestion,
      likeQuestion,
      dislikeQuestion
    }
  )(HotQuestions)
);
