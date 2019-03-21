import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ComponentLoader from '../../../../components/ComponentLoader';
import Question from '../../../../components/Question';
import {
  deleteQuestion,
  dislikeQuestion,
  editQuestion,
  fetchQuestions,
  likeQuestion
} from '../../actions/questions';
import CreateQuestion from './CreateQuestion';

class Questions extends Component {
  page = 1;

  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    isEditLoading: PropTypes.bool.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    isDeleteLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    questions: PropTypes.object,
    likeQuestion: PropTypes.func.isRequired,
    dislikeQuestion: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null,
    user: null,
    questions: null
  };

  componentDidMount() {
    this.props.fetchQuestions({ page: 1, take: 20 }, false);
  }

  loadMore = () => {
    this.page = this.page + 1;
    this.props.fetchQuestions({ page: this.page, take: 20 }, true);
  };

  render() {
    const questions =
      this.props.questions &&
      this.props.questions.questions.map((question) => (
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
          fetchQuestions={() =>
            this.props.fetchQuestions({ page: 1, take: 10 })
          }
        />
      ));

    const showLoadMoreButton =
      this.props.questions &&
      this.props.questions.count !== this.props.questions.questions.length;

    return (
      <>
        <CreateQuestion user={this.props.user} history={this.props.history} />
        <div className="position-relative">
          {this.props.error && (
            <Alert variant="danger">{this.props.error}</Alert>
          )}
          {!this.props.isLoading &&
            this.props.questions &&
            this.props.questions.questions.length === 0 && (
            <Alert variant="info">There are no recent questions.</Alert>
          )}
          <ComponentLoader isVisible={this.props.isLoading} loaderTop />
          {questions}
          {!this.props.isLoading && showLoadMoreButton && (
            <Button variant="info" block onClick={this.loadMore}>
              Load more
            </Button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  questions: state.homePage.questions.questions,
  isLoading: state.homePage.questions.isLoading,
  error: state.homePage.questions.error,
  isEditLoading: state.homePage.questions.editQuestion.isLoading,
  isDeleteLoading: state.homePage.questions.deleteQuestion.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchQuestions,
      editQuestion,
      deleteQuestion,
      likeQuestion,
      dislikeQuestion
    }
  )(Questions)
);
