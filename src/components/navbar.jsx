import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannels } from "./../actions/channelsActions";
import { fetchDirectChannels } from "./../actions/directChannelsActions";
import { fetchMessages } from "./../actions/messagesActions";
import { fetchDirectMessages } from "./../actions/directMessagesActions";
import { fetchUsers } from "./../actions/usersActions";

class Navbar extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchChannels();
    this.props.fetchDirectChannels();
  }

  handleSelectChannel = channelId => {
    this.props.fetchMessages(channelId);
  };

  handleSelectDirectChannel = userId => {
    this.props.fetchDirectMessages(userId);
  };

  getDirectChannelsOwnerName = (users, userId) => {
    return users.find(user => user.id === userId).real_name;
  };

  render() {
    if (!this.props.directChannels || !this.props.channels || !this.props.users)
      return <div />;

    const { channels } = this.props.channels;
    const { directChannels } = this.props.directChannels;
    const { users } = this.props.users;

    return (
      <div className="app-navbar">
        <div className="navbar-container">
          <div className="navbar-list">
            <h3 className="list-header">Channels</h3>
            <div className="list-container">
              <div className="list-item">
                {channels.map(channel => (
                  <NavLink
                    onClick={() => this.handleSelectChannel(channel.id)}
                    key={channel.id}
                    to={`/messages/${channel.id}`}
                    title=""
                    activeClassName="nav-link-active"
                  >
                    <span># {channel.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="navbar-list">
            <h3 className="list-header">Direct Messages</h3>
            <div className="list-container">
              <div className="list-item">
                {directChannels.map(
                  directChannel =>
                    directChannel.user !== "UKGMUEHQV" && (
                      <NavLink
                        onClick={() =>
                          this.handleSelectDirectChannel(directChannel.id)
                        }
                        key={directChannel.id}
                        to={`/direct_messages/${directChannel.id}/${
                          directChannel.user
                        }/${this.getDirectChannelsOwnerName(
                          users,
                          directChannel.user
                        )}`}
                        title=""
                        activeClassName="nav-link-active"
                      >
                        <span>${" "}
                          {this.getDirectChannelsOwnerName(
                            users,
                            directChannel.user
                          )}
                        </span>
                      </NavLink>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels,
    directChannels: state.directChannels,
    messages: state.messages,
    directMessages: state.directMessages,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  {
    fetchChannels,
    fetchDirectChannels,
    fetchMessages,
    fetchDirectMessages,
    fetchUsers
  }
)(Navbar);
