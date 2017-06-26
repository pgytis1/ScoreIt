import uuid from 'uuid';
import {
    SHOW_SUCCESS,
    SHOW_ERROR,
    DELETE_MESSAGE,
    RESET_MESSAGES } from './constants';

export function showSuccess(messages) {
    return function (dispatch) {
        let ids = [];
        for (let i = 0; i < messages.length; i += 1) {
            ids[i] = uuid.v4();
        }
        dispatch({
            type: SHOW_SUCCESS,
            messages,
            ids,
        });
    };
}

export function showError(messages) {
    return function (dispatch) {
        let ids = [];
        for (let i = 0; i < messages.length; i += 1) {
            ids[i] = uuid.v4();
        }
        dispatch({
            type: SHOW_ERROR,
            messages,
            ids,
        });
    };
}

export function deleteMessage(id) {
    return function (dispatch) {
        dispatch({
            type: DELETE_MESSAGE,
            id
        });
    };
}

export function resetMessages() {
    return function (dispatch) {
        dispatch({
            type: RESET_MESSAGES,
        });
    };
}
