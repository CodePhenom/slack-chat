import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  fetchMessages,
  sendMessage,
  deleteMessage
} from "./../actions/messagesActions";

Modal.setAppElement("#root");

class Messages extends Component {
  state = {
    message: { text: "" },
    currentChannelId: "",
    errors: {},
    modalIsOpen: {
      deleteModal: false
    },
    messageToDelete: {},
    messageOwnerImage: "",
    messageOwnerName: ""
  };

  componentDidMount() {
    if (this.props.messages === null)
      this.props.fetchMessages(this.props.match.params.id);

    this.setState({ currentChannelId: this.props.match.params.id });
  }

  handleSubmit = e => {
    e.preventDefault();

    const message = {
      text: e.target.message.value,
      currentChannelId: this.state.currentChannelId
    };

    this.props.sendMessage(message, this.props.history);

    e.target.message.value = "";
  };

  handleDeleteMessage = () => {
    this.props.deleteMessage(this.state.messageToDelete);

    this.handleCloseDeleteModal();
  };

  handleOpenDeleteModal = (users, message) => {
    const data = {
      currentChannelId: this.state.currentChannelId,
      ts: message.ts,
      text: message.text
    };

    const image =
      message.username === "myApp"
        ? // ? users.find(user => user.name === "myapp").profile.image_512
          "https://a.slack-edge.com/4f28/img/apps/default_new_app_icon.png"
        : users.find(user => user.id === message.user).profile.image_512;

    const name =
      message.username === "myApp"
        ? users.find(user => user.name === "myapp").name
        : users.find(user => user.id === message.user).name;

    this.setState({
      modalIsOpen: { deleteModal: true },
      messageToDelete: data,
      messageOwnerImage: image,
      messageOwnerName: name
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({ modalIsOpen: { deleteModal: false } });
  };

  getUserImage = (users, message) => {
    return message.username === "myApp"
      ? //   ? users.find(user => user.name === "myapp").profile.image_512
        "https://a.slack-edge.com/4f28/img/apps/default_new_app_icon.png"
      : users.find(user => user.id === message.user).profile.image_512;
  };

  getUserName = (users, message) => {
    return message.username === "myApp"
      ? users.find(user => user.name === "myapp").name
      : users.find(user => user.id === message.user).name;
  };

  render() {
    if (!this.props.messages || !this.props.users || !this.props.channels)
      return <div />;

    const { messages } = this.props.messages;
    const { users } = this.props.users;
    const { channels } = this.props.channels;

    const messageToDelete = this.state.messageToDelete || "";

    return (
        <div className="messages-container">
          <div className="message-container-header">
            {
              channels.find(
                channel => channel.id === this.props.match.params.id
              ).name
            }
          </div>
          <div className="message-wrapper">
            {messages.map((msg, i) => (
              <div key={i} className="message-item">
                <Link to={`/team/${msg.user}`} className="user-img">
                  <img alt="" src={this.getUserImage(users, msg)} />
                </Link>
                <div className="msg">
                  <Link to={`/team/${msg.user}`} className="user-name">
                    {this.getUserName(users, msg)}
                  </Link>
                  <p className="msg-body">{msg.text}</p>
                </div>
                <div className="msg-actions">
                  <ul>
                    <li onClick={() => this.handleOpenDeleteModal(users, msg)}>
                      <i className="fa fa-trash" />
                    </li>
                    <li>
                      <i className="fa fa-reply" />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="form-container">
            <form className="messages-form" onSubmit={this.handleSubmit}>
              <input
                name="message"
                id="message"
                className="message-input"
                type="text"
                placeholder="Message"
                autoComplete="off"
              />
              <button className="attach-btn">+</button>
            </form>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen.deleteModal}
            onRequestClose={this.handleCloseDeleteModal}
            contentLabel="Delete Message Modal"
            className="c-dialog__content"
            overlayClassName="c-dialog"
          >
            <div className="c-dialog__header" data-qa="dialog_header">
              <h3 className="c-dialog__title overflow_ellipsis">
                Delete message
              </h3>
              <button
                className="c-button-unstyled c-dialog__close"
                type="button"
                aria-label="Close"
                data-qa="dialog_close"
                onClick={this.handleCloseDeleteModal}
              >
                <i className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div
              className="c-dialog__body c-dialog__body--slack_scrollbar"
              data-qa="dialog_body"
            >
              Are you sure you want to delete this message? This cannot be
              undone.
              <div className="c-message-wrapper">
                <div className="c-message c-message--light c-message--standalone">
                  <div className="message-item">
                    <div className="user-img">
                      <img alt="" src={this.state.messageOwnerImage} />
                    </div>

                    <div className="msg">
                      <span
                        to={`/team/${messageToDelete.user}`}
                        className="user-name"
                      >
                        {this.state.messageOwnerName}
                      </span>
                      <p className="msg-body">{messageToDelete.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="c-dialog__footer c-dialog__footer--has_buttons"
              data-qa="dialog_footer"
            >
              <div className="c-dialog__footer_buttons">
                <button
                  className="c-button c-button--outline c-button--medium c-dialog__cancel null--outline null--medium"
                  type="button"
                  data-qa="dialog_cancel"
                  onClick={this.handleCloseDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="c-button c-button--danger c-button--medium c-dialog__go null--danger null--medium"
                  type="button"
                  data-qa="dialog_go"
                  onClick={this.handleDeleteMessage}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    channels: state.channels,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { fetchMessages, sendMessage, deleteMessage }
)(Messages);
