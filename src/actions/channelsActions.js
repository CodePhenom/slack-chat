import * as actionTypes from "./types";
import axios from "axios";
import { TOKEN } from "../config/token";

export const fetchChannels = () => dispatch => {
	axios
		.get(`https://slack.com/api/conversations.list?token=${TOKEN}`)
		.then(res => {
			dispatch({
				type: actionTypes.GET_CHANNELS,
				payload: res.data.channels
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_CHANNELS,
				payload: {}
			})
		);
};
