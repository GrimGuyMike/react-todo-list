import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
    message: '',
    status: null,
    id: null
};

export default function errorReducer(state=initialState, action) {
    switch(action.type) {
        default:
            return { ...state };

        case GET_ERRORS:
            return { ...action.payload };
        
        case CLEAR_ERRORS:
            return initialState;
    }
};