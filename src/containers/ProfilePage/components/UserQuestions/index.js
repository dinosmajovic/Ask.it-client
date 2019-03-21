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
  likeQuestion
} from '../../../HomePage/actions/questions';
import { fetchUserQuestions } from '../../actions/user-questions';

class UserQuestions extends Component {
  page = 1;

  static propTypes = {
    user: PropTypes.object.isRequired,
    questions: PropTypes.object,
    editQuestion: PropTypes.func.isRequired,
    isEditLoading: PropTypes.bool,
    deleteQuestion: PropTypes.func.isRequired,
    isDeleteLoading: PropTypes.bool,
    fetchUserQuestions: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    likeQuestion: PropTypes.func,
    dislikeQuestion: PropTypes.func
  };

  static defaultProps = {
    questions: null,
    isEditLoading: null,
    isDeleteLoading: null,
    likeQuestion: null,
    dislikeQuestion: null
  };

  id = this.props.match.path.split('/')[2];

  componentWillMount() {
    this.props.fetchUserQuestions({ page: 1, take: 20, id: this.id }, false);
  }

  loadMore = () => {
    this.page = this.page + 1;
    this.props.fetchUserQuestions(
      { page: this.page, take: 20, id: this.id },
      true
    );
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
          history={this.props.history}
          isDeleteQuestionLoading={this.props.isDeleteLoading}
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
          user={this.props.user}
          likeQuestion={this.props.likeQuestion}
          dislikeQuestion={this.props.dislikeQuestion}
          fetchQuestions={() =>
            this.props.fetchUserQuestions({ page: 1, take: 20, id: this.id })
          }
        />
      ));

    const showLoadMoreButton =
      this.props.questions &&
      this.props.questions.count !== this.props.questions.questions.length;

    return (
      <div className="position-relative">
        <ComponentLoader isVisible={this.props.isLoading} loaderTop />
        {questions}
        {!this.props.isLoading &&
          this.props.questions &&
          this.props.questions.questions.length === 0 && (
          <Alert variant="info">There are no questions.</Alert>
        )}
        {!this.props.isLoading && showLoadMoreButton && (
          <Button variant="info" block onClick={this.loadMore}>
            Load more
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  questions: state.profilePage.userQuestions.questions,
  isLoading: state.profilePage.userQuestions.isLoading,
  error: state.profilePage.userQuestions.error
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchUserQuestions,
      editQuestion,
      deleteQuestion,
      likeQuestion,
      dislikeQuestion
    }
  )(UserQuestions)
);
