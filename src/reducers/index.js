import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import directMessagesReducer from "./directMessagesReducer";
import channelsReducer from "./channelsReducer";
import directChannelsReduer from "./directChannelsReduer";
import usersReducer from "./usersReducers";

export default combineReducers({
  messages: messagesReducer,
  directMessages: directMessagesReducer,
  channels: channelsReducer,
  directChannels: directChannelsReduer,
  users: usersReducer
});
