import * as actionTypes from "./types";
import axios from "axios";
import { TOKEN } from "../config/token";

export const fetchDirectMessages = userId => dispatch => {
	axios
		.get(`https://slack.com/api/im.history?token=${TOKEN}&channel=${userId}`)
		.then(res => {
			dispatch({
				type: actionTypes.GET_DIRECT_MESSAGES,
				payload: res.data.messages
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_DIRECT_MESSAGES,
				payload: {}
			})
		);
};

export const sendDirectMessage = (data, currentChannelId) => dispatch => {
	const params = {
		token: TOKEN,
		channel: currentChannelId,
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
				type: actionTypes.SEND_DIRECT_MESSAGE,
				payload: res.data.message
			});
		})
		.catch(err => {
			dispatch({
				type: actionTypes.SEND_DIRECT_MESSAGE,
				payload: {}
			});
		});
};

export const deleteDirectMessage = data => dispatch => {
	console.log("delete direct ", data);

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
				type: actionTypes.DELETE_DIRECT_MESSAGE,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.DELETE_DIRECT_MESSAGE,
				payload: {}
			})
		);
};
