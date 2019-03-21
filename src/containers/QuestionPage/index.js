import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../auth/actions';
import Answer from '../../components/Answer';
import ComponentLoader from '../../components/ComponentLoader';
import Question from '../../components/Question';
import {
  deleteQuestion,
  dislikeQuestion,
  editQuestion,
  likeQuestion
} from '../HomePage/actions/questions';
import PageContainer from '../PageContainer';
import {
  createAnswer,
  deleteAnswer,
  dislikeAnswer,
  editAnswer,
  fetchAnswers,
  fetchQuestion,
  likeAnswer
} from './actions';
import CreateAnswer from './components/CreateAnswer';

class QuestionPage extends Component {
  static propTypes = {
    fetchQuestion: PropTypes.func.isRequired,
    fetchAnswers: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    question: PropTypes.object,
    error: PropTypes.object,
    isUserLoading: PropTypes.bool.isRequired,
    answers: PropTypes.array,
    isAnswersLoading: PropTypes.bool.isRequired,
    answersError: PropTypes.object,
    editAnswer: PropTypes.func.isRequired,
    isEditLoading: PropTypes.bool.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    isDeleteLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    editQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    isQuestionDeleteLoading: PropTypes.bool.isRequired,
    isQuestionEditLoading: PropTypes.bool.isRequired,
    likeAnswer: PropTypes.func.isRequired,
    dislikeAnswer: PropTypes.func.isRequired,
    likeQuestion: PropTypes.func,
    dislikeQuestion: PropTypes.func
  };

  static defaultProps = {
    question: null,
    answers: null,
    user: null,
    error: null,
    answersError: null,
    likeQuestion: null,
    dislikeQuestion: null
  };

  componentWillMount() {
    this.props.fetchQuestion(this.props.match.params.id);
    this.props.fetchAnswers({
      id: this.props.match.params.id,
      page: 1,
      take: 20
    });
  }

  renderAnswers() {
    const { answers, user, isAnswersLoading, answersError } = this.props;

    if (answersError) {
      return <Alert variant="danger">{answersError}</Alert>;
    }

    const mappedAnswers =
      answers &&
      answers.map((answer) => (
        <Answer
          key={answer.id}
          id={answer.id}
          userId={answer.userId}
          editAnswer={this.props.editAnswer}
          isEditLoading={this.props.isEditLoading}
          deleteAnswer={this.props.deleteAnswer}
          isDeleteAnswerLoading={this.props.isDeleteLoading}
          likeAnswer={this.props.likeAnswer}
          likes={answer.likes}
          dislikes={answer.dislikes}
          dislikeCount={answer.dislikeCount}
          likeCount={answer.likeCount}
          createdAt={answer.createdAt}
          dislikeAnswer={this.props.dislikeAnswer}
          questionId={this.props.match.params.id}
          name={answer.username}
          text={answer.text}
          isEdited={answer.isEdited}
          user={user}
        />
      ));

    return (
      <>
        <CreateAnswer user={this.props.user} history={this.props.history} />
        <div className="position-relative">
          {!isAnswersLoading && answers && answers.length === 0 && (
            <Alert variant="info">
              There are no answers. Be the first to answer this question.
            </Alert>
          )}
          <ComponentLoader isVisible={isAnswersLoading} loaderTop />
          {mappedAnswers}
        </div>
      </>
    );
  }

  renderContent() {
    const { question, user, isLoading, error } = this.props;

    if (error) {
      return <Alert variant="danger">Error loading question.</Alert>;
    }

    return (
      <div className="container mt-5 mb-4">
        <div className="position-relative mb-4">
          <ComponentLoader isVisible={isLoading} />
          {question ? (
            <Question
              key={question.id}
              id={question.id}
              userId={question.userId}
              editQuestion={this.props.editQuestion}
              isEditLoading={this.props.isQuestionEditLoading}
              deleteQuestion={this.props.deleteQuestion}
              history={this.props.history}
              isDeleteQuestionLoading={this.props.isQuestionDeleteLoading}
              name={question.username}
              answers={String(question.answers)}
              likeCount={question.likeCount}
              likes={question.likes}
              dislikes={question.dislikes}
              dislikeCount={question.dislikeCount}
              text={question.text}
              isEdited={question.isEdited}
              createdAt={question.createdAt}
              homepageAfterDelete
              user={user}
              likeQuestion={this.props.likeQuestion}
              dislikeQuestion={this.props.dislikeQuestion}
              fetchQuestions={() =>
                this.props.fetchQuestion(this.props.match.params.id)
              }
            />
          ) : (
            <Question id={null} name="" answers="0" text="" user={user} />
          )}
        </div>

        {this.renderAnswers()}
      </div>
    );
  }

  render() {
    const { isLoading, user, isUserLoading } = this.props;

    return (
      <PageContainer
        isInitialized={!isUserLoading && !isLoading}
        logout={this.props.logout}
        user={user}
        isUserLoading={!isUserLoading}
      >
        {this.renderContent()}
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isUserLoading: state.user.isLoading,
  isLoading: state.questionPage.isLoading,
  error: state.questionPage.error,
  question: state.questionPage.question,
  answers: state.questionPage.answers.answers,
  isAnswersLoading: state.questionPage.answers.isLoading,
  answersError: state.questionPage.answers.error,
  isEditLoading: state.questionPage.editAnswer.isLoading,
  isDeleteLoading: state.questionPage.editAnswer.isLoading,
  isQuestionEditLoading: state.homePage.questions.editQuestion.isLoading,
  isQuestionDeleteLoading: state.homePage.questions.deleteQuestion.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAnswers,
      fetchQuestion,
      createAnswer,
      logout,
      editAnswer,
      deleteAnswer,
      editQuestion,
      deleteQuestion,
      likeAnswer,
      dislikeAnswer,
      likeQuestion,
      dislikeQuestion
    }
  )(QuestionPage)
);
