import * as actionTypes from "../actions/types";

const initialState = null;

const directMessagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_DIRECT_MESSAGES:
			return { ...state, messages: action.payload };

		case actionTypes.SEND_DIRECT_MESSAGE:
			return { messages: [action.payload, ...state.messages] };

		case actionTypes.DELETE_DIRECT_MESSAGE:
			if (action.payload.ok === true) return {
				messages: state.messages.filter(msg => msg.ts !== action.payload.ts)
			};
			return state;

		default:
			return state;
	}
};

export default directMessagesReducer;
