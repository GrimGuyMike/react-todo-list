import { ERROR } from "./types";

export const getErrors = (message, status, id=null) => dispatch => {
    const error = {
        message: message || 'No description',
        status,
        id
    };

    dispatch({
        type: ERROR.GET,
        payload: error
    });
};

export const clearErrors = () => ({ type: ERROR.CLEAR });