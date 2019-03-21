import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import AnswerIcon from 'react-ionicons/lib/IosSend';
import DeleteIcon from 'react-ionicons/lib/IosTrash';
import EditIcon from 'react-ionicons/lib/MdCreate';
import HeartIcon from 'react-ionicons/lib/MdHeart';
import HeartIconEmpty from 'react-ionicons/lib/MdHeartOutline';
import { withRouter } from 'react-router-dom';
import HeartDislike from '../Icons/dislike';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class Question extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.object,
    answers: PropTypes.string.isRequired,
    isEdited: PropTypes.bool,
    likes: PropTypes.array,
    dislikes: PropTypes.array,
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    userId: PropTypes.string,
    editQuestion: PropTypes.func,
    isEditLoading: PropTypes.bool,
    deleteQuestion: PropTypes.func,
    history: PropTypes.object.isRequired,
    fetchQuestions: PropTypes.func,
    homepageAfterDelete: PropTypes.bool,
    likeQuestion: PropTypes.func,
    dislikeQuestion: PropTypes.func,
    createdAt: PropTypes.string
  };

  static defaultProps = {
    createdAt: null,
    homepageAfterDelete: false,
    isEditLoading: false,
    likes: null,
    dislikes: null,
    likeCount: 0,
    dislikeCount: 0,
    editQuestion: null,
    deleteQuestion: null,
    user: null,
    id: null,
    isEdited: null,
    userId: null,
    fetchQuestions: null,
    likeQuestion: null,
    dislikeQuestion: null
  };

  state = {
    isEditState: false,
    isDeleteModalVisible: false,
    question: this.props.text,
    userLikes: false,
    userDislikes: false,
    likeCount: this.props.likeCount,
    dislikeCount: this.props.dislikeCount
  };

  componentDidMount = () => {
    this.setUserLikes();
    this.setUserDislikes();
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.likes !== this.props.likes ||
      prevProps.dislikes !== this.props.dislikes ||
      prevProps.user !== this.props.user
    ) {
      this.setUserLikes();
      this.setUserDislikes();
    }
  }

  addLike = () => {
    if (this.state.userDislikes) {
      this.removeDislike();
    }

    this.setState((prevState) => ({
      likeCount: prevState.likeCount + 1,
      userLikes: true
    }));
  };

  removeLike = () => {
    this.setState((prevState) => ({
      likeCount: prevState.likeCount - 1,
      userLikes: false
    }));
  };

  addDislike = () => {
    if (this.state.userLikes) {
      this.removeLike();
    }

    this.setState((prevState) => ({
      dislikeCount: prevState.dislikeCount + 1,
      userDislikes: true
    }));
  };

  removeDislike = () => {
    this.setState((prevState) => ({
      dislikeCount: prevState.dislikeCount - 1,
      userDislikes: false
    }));
  };

  likeAnswer = () => {
    this.props.likeQuestion(
      this.props.id,
      this.addLike,
      this.removeLike,
      this.state.userLikes
    );
  };

  dislikeAnswer = () => {
    this.props.dislikeQuestion(
      this.props.id,
      this.addDislike,
      this.removeDislike,
      this.state.userDislikes
    );
  };

  setUserLikes = () => {
    const userLikes =
      this.props.user &&
      this.props.likes &&
      this.props.likes.includes(this.props.user.id);

    this.setState({
      userLikes
    });
  };

  setUserDislikes = () => {
    const userDislikes =
      this.props.user &&
      this.props.dislikes &&
      this.props.dislikes.includes(this.props.user.id);

    this.setState({
      userDislikes
    });
  };

  toggleEditState = () => {
    this.setState((prevState) => ({
      isEditState: !prevState.isEditState,
      question: this.props.text
    }));
  };

  saveEditState = () => {
    this.setState((prevState) => ({
      isEditState: !prevState.isEditState
    }));
  };

  toggleDeleteModal = () => {
    this.setState((prevState) => ({
      isDeleteModalVisible: !prevState.isDeleteModalVisible
    }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editQuestion(
      { text: this.state.question, id: this.props.id },
      this.saveEditState,
      this.props.fetchQuestions
    );
  };

  deleteQuestion = () => {
    this.props.deleteQuestion(
      this.props.id,
      this.props.fetchQuestions,
      this.props.history,
      this.props.homepageAfterDelete
    );
  };

  goToProfile = () => {
    this.props.history.push(`/profile/${this.props.userId}`);
  };

  goToQuestion = () => {
    this.props.history.push(`/question/${this.props.id}`);
  };

  renderDeleteModal() {
    return (
      <Modal
        show={this.state.isDeleteModalVisible}
        onHide={this.toggleDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={this.deleteQuestion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderQuestionHeader() {
    const currentUserQuestion =
      this.props.user && this.props.userId === this.props.user.id;

    return (
      <Card.Header className="question-header">
        <span
          onClick={this.goToProfile}
          className="cursor-pointer text-info mr-1"
        >
          {this.props.name}
        </span>
        |
        <small className="text-secondary mr-auto ml-1">
          {timeAgo.format(Date.parse(this.props.createdAt))}
        </small>
        {currentUserQuestion && (
          <div className="question-controls">
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-top">Delete question</Tooltip>}
            >
              <span
                className="mb-1 mr-2 cursor-pointer"
                onClick={this.toggleDeleteModal}
              >
                <DeleteIcon fontSize="16px" color="#444" />
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-top">Edit question</Tooltip>}
            >
              <span
                className="mb-1 cursor-pointer"
                onClick={this.toggleEditState}
              >
                <EditIcon fontSize="15px" color="#444" />
              </span>
            </OverlayTrigger>
          </div>
        )}
      </Card.Header>
    );
  }

  renderQuestionBody() {
    if (!this.state.isEditState) {
      return (
        <Card.Body
          onClick={this.goToQuestion}
          className="question-body cursor-pointer"
        >
          {this.props.isEdited ? (
            <Card.Text>
              {this.state.question}{' '}
              <small className="text-muted">(edited)</small>
            </Card.Text>
          ) : (
            <Card.Text>{this.state.question}</Card.Text>
          )}
        </Card.Body>
      );
    }

    const renderButton =
      this.state.question === this.props.text ? (
        <Button
          variant="primary"
          size="sm"
          className="float-right"
          onClick={this.toggleEditState}
        >
          Close
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          type="submit"
          className="float-right"
          disabled={this.props.isEditLoading}
        >
          Save
        </Button>
      );

    return (
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
          {renderButton}
        </Form>
      </Card.Body>
    );
  }

  renderLikeIcon() {
    if (this.state.userLikes) {
      return (
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-top">Remove like</Tooltip>}
        >
          <span
            onClick={this.likeAnswer}
            className="mb-1 mr-2 cursor-pointer heart-icon liked"
          >
            <HeartIcon fontSize="16px" color="#c0392b" />
            <span className="align-middle">{this.state.likeCount}</span>
          </span>
        </OverlayTrigger>
      );
    }

    return (
      <OverlayTrigger
        overlay={
          this.props.user ? (
            <Tooltip id="tooltip-top">Like question</Tooltip>
          ) : (
            <Tooltip id="tooltip-top">Login to like question</Tooltip>
          )
        }
      >
        <span
          onClick={this.props.user ? this.likeAnswer : null}
          className="mb-1 mr-2 cursor-pointer heart-icon"
        >
          <HeartIconEmpty fontSize="16px" color="#000" />
          <span className="align-middle">{this.state.likeCount}</span>
        </span>
      </OverlayTrigger>
    );
  }

  renderDislikeIcon() {
    if (this.state.userDislikes) {
      return (
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-top">Remove dislike</Tooltip>}
        >
          <span
            onClick={this.dislikeAnswer}
            className="mb-1 mr-2 cursor-pointer heart-dislike disliked"
          >
            <HeartDislike />
            <span className="align-middle">{this.state.dislikeCount}</span>
          </span>
        </OverlayTrigger>
      );
    }

    return (
      <OverlayTrigger
        overlay={
          this.props.user ? (
            <Tooltip id="tooltip-top">Dislike question</Tooltip>
          ) : (
            <Tooltip id="tooltip-top">Login to dislike question</Tooltip>
          )
        }
      >
        <span
          onClick={this.props.user ? this.dislikeAnswer : null}
          className="mb-1 mr-2 cursor-pointer heart-dislike"
        >
          <HeartDislike />
          <span className="align-middle">{this.state.dislikeCount}</span>
        </span>
      </OverlayTrigger>
    );
  }

  renderQuestionFooter() {
    return (
      <Card.Footer className="question-footer">
        {this.renderLikeIcon()}
        {this.renderDislikeIcon()}

        <OverlayTrigger
          overlay={
            this.props.user ? (
              <Tooltip id="tooltip-top">Answer question</Tooltip>
            ) : (
              <Tooltip id="tooltip-top">Login to answer question</Tooltip>
            )
          }
        >
          <span onClick={this.goToQuestion} className="mb-1 cursor-pointer">
            <AnswerIcon fontSize="20px" color="#2980b9" />
            <span className="align-middle">{this.props.answers}</span>
          </span>
        </OverlayTrigger>
      </Card.Footer>
    );
  }

  render() {
    return (
      <Card className="question mb-2">
        {this.renderDeleteModal()}
        {this.renderQuestionHeader()}
        {this.renderQuestionBody()}
        {this.renderQuestionFooter()}
      </Card>
    );
  }
}

export default withRouter(Question);
