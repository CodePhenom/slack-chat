import * as actionTypes from "../actions/types";

const initialState = null;

const channelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_CHANNELS:
			return { ...state, channels: action.payload };
		
		default:
			return state;
	}
};

export default channelsReducer;
