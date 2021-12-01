import { GET_ERRORS, CLEAR_ERRORS } from "./types";

export const getErrors = (message, status, id=null) => dispatch => {
    const error = {
        message: message || 'No description',
        status,
        id
    };

    dispatch({
        type: GET_ERRORS,
        payload: error
    });
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });