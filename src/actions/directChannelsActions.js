import * as actionTypes from "../actions/types";
import axios from "axios";
import { TOKEN } from "../config/token";

export const fetchDirectChannels = () => dispatch => {
	axios
		.get(`https://slack.com/api/im.list?token=${TOKEN}`)
		.then(res => {
			dispatch({
				type: actionTypes.GET_DIRECT_CHANNELS,
				payload: res.data.ims
			});
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_CHANNELS,
				payload: {}
			})
		);
};
