import * as actionTypes from "./types";
import axios from "axios";
import { TOKEN } from "../config/token";

export const fetchMessages = channelId => dispatch => {
	axios
		.get(
			`https://slack.com/api/conversations.history?token=${TOKEN}&channel=${channelId}`
		)
		.then(res => {
			dispatch({
				type: actionTypes.GET_MESSAGES,
				payload: res.data.messages
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_MESSAGES,
				payload: {}
			})
		);
};

export const sendMessage = data => dispatch => {
	const params = {
		token: TOKEN,
		channel: data.currentChannelId,
		text: data.text
	};

	axios({
		method: "post",
		url: "https://slack.com/api/chat.postMessage",
		params,
		transformRequest: [
			(data, headers) => {
				delete headers.post["Content-Type"];
				return data;
			}
		]
	})
		.then(res => {
			dispatch({
				type: actionTypes.SEND_MESSAGE,
				payload: res.data.message
			});
		})
		.catch(err => {
			dispatch({
				type: actionTypes.SEND_MESSAGE,
				payload: {}
			});
		});
};

export const deleteMessage = data => dispatch => {
	const params = {
		token: TOKEN,
		channel: data.currentChannelId,
		ts: data.ts
	};

	axios({
		method: "post",
		url: "https://slack.com/api/chat.delete",
		params,
		transformRequest: [
			(data, headers) => {
				delete headers.post["Content-Type"];
				return data;
			}
		]
	})
		.then(res => {
			dispatch({
				type: actionTypes.DELETE_MESSAGE,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.DELETE_MESSAGE,
				payload: {}
			})
		);
};
