import { ERROR } from "../actions/types";

const initialState = {
    message: '',
    status: null,
    id: null
};

export default function errorReducer(state=initialState, action) {
    switch(action.type) {
        default:
            return { ...state };

        case ERROR.GET:
            return { ...action.payload };
        
        case ERROR.CLEAR:
            return initialState;
    }
};