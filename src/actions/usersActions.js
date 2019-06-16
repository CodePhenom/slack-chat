import * as actionTypes from "./types";
import axios from "axios";
import { TOKEN } from "../config/token";

export const fetchUsers = () => dispatch => {
	axios
		.get(`https://slack.com/api/users.list?token=${TOKEN}`) //&channel=${channelId}
		.then(res => {
			dispatch({
				type: actionTypes.GET_USERS,
				payload: res.data.members
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_USERS,
				payload: {}
			})
		);
};
