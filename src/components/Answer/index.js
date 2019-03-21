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
import DeleteIcon from 'react-ionicons/lib/IosTrash';
import EditIcon from 'react-ionicons/lib/MdCreate';
import HeartIcon from 'react-ionicons/lib/MdHeart';
import HeartIconEmpty from 'react-ionicons/lib/MdHeartOutline';
import { withRouter } from 'react-router-dom';
import HeartDislike from '../Icons/dislike';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class Answer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    isEdited: PropTypes.bool.isRequired,
    likes: PropTypes.array,
    userId: PropTypes.string.isRequired,
    editAnswer: PropTypes.func,
    isEditLoading: PropTypes.bool,
    deleteAnswer: PropTypes.func,
    history: PropTypes.object.isRequired,
    questionId: PropTypes.string.isRequired,
    likeAnswer: PropTypes.func.isRequired,
    dislikes: PropTypes.array.isRequired,
    dislikeAnswer: PropTypes.func.isRequired,
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    createdAt: PropTypes.string
  };

  static defaultProps = {
    createdAt: null,
    isEditLoading: false,
    likes: 0,
    editAnswer: null,
    deleteAnswer: null,
    likeCount: 0,
    dislikeCount: 0
  };

  state = {
    isEditState: false,
    isDeleteModalVisible: false,
    answer: this.props.text,
    likeCount: this.props.likeCount,
    dislikeCount: this.props.dislikeCount,
    userLikes: false,
    userDislikes: false
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
      answer: this.props.text
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
    this.props.editAnswer(
      {
        questionId: this.props.questionId,
        answerId: this.props.id,
        text: this.state.answer
      },
      this.saveEditState
    );
  };

  deleteAnswer = () => {
    this.props.deleteAnswer({
      questionId: this.props.questionId,
      answerId: this.props.id
    });
  };

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
    this.props.likeAnswer(
      this.props.id,
      this.addLike,
      this.removeLike,
      this.state.userLikes
    );
  };

  dislikeAnswer = () => {
    this.props.dislikeAnswer(
      this.props.id,
      this.addDislike,
      this.removeDislike,
      this.state.userDislikes
    );
  };

  goToProfile = () => {
    this.props.history.push(`/profile/${this.props.userId}`);
  };

  renderDeleteModal() {
    return (
      <Modal
        show={this.state.isDeleteModalVisible}
        onHide={this.toggleDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your answer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={this.deleteAnswer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderAnswerHeader() {
    const currentUserAnswer =
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
        {currentUserAnswer && (
          <div className="question-controls">
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-top">Delete answer</Tooltip>}
            >
              <span
                className="mb-1 mr-2 cursor-pointer"
                onClick={this.toggleDeleteModal}
              >
                <DeleteIcon fontSize="16px" color="#444" />
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-top">Edit answer</Tooltip>}
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

  renderAnswerBody() {
    if (!this.state.isEditState) {
      return (
        <Card.Body>
          {this.props.isEdited ? (
            <Card.Text>
              {this.state.answer} <small className="text-muted">(edited)</small>
            </Card.Text>
          ) : (
            <Card.Text>{this.state.answer}</Card.Text>
          )}
        </Card.Body>
      );
    }

    const renderButton =
      this.state.answer === this.props.text ? (
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
            <Tooltip id="tooltip-top">Like answer</Tooltip>
          ) : (
            <Tooltip id="tooltip-top">Login to like answer</Tooltip>
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
            <Tooltip id="tooltip-top">Dislike answer</Tooltip>
          ) : (
            <Tooltip id="tooltip-top">Login to dislike answer</Tooltip>
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

  renderAnswerFooter() {
    return (
      <Card.Footer className="question-footer">
        {this.renderLikeIcon()}
        {this.renderDislikeIcon()}
      </Card.Footer>
    );
  }

  render() {
    return (
      <Card className="question mb-2">
        {this.renderDeleteModal()}
        {this.renderAnswerHeader()}
        {this.renderAnswerBody()}
        {this.renderAnswerFooter()}
      </Card>
    );
  }
}

export default withRouter(Answer);
