import request from 'superagent';
import { hashHistory } from 'react-router';
import { showError } from '../messages/actions';

import { FETCH_USER_INFO, LOGOUT, UPDATE_AVATAR } from './constants';
import { SET_GAME_TO_DEFAULT } from '../game/constants';

export function login(userName, password) {
    return (dispatch) => {
        request
            .post('/api/user/login')
            .send({
                UserName: userName,
                Password: password,
            })
            .end((error, response) => {
                if (error && error.status === 400) {
                    dispatch(showError(['Invalid user name or password.']));
                } else if (error) {
                    dispatch(showError([`${error}`]));
                } else {
                    hashHistory.push('/');
                }
            });
    };
}

export function register(userName, password, email) {
    return (dispatch) => {
        request
            .post('/api/user/register')
            .send({
                Email: email,
                Username: userName,
                Password: password,
            })
            .end((err, res) => {
                if (err) {
                    if (res && JSON.parse(res.text)[0].description) {
                        for (let i = 0; i < JSON.parse(res.text).length; i+= 1) {
                            dispatch(showError([JSON.parse(res.text)[i].description]));
                        }
                    } else if (res && res.text) {
                        dispatch(showError(JSON.parse(res.text)));
                    } else {
                        dispatch(showError([`${err}`]));
                    }
                } else {
                    hashHistory.push('/');
                }
            });
    };
}

export function logout() {
    return (dispatch) => {
        request
            .post('api/user/logOff')
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                    return;
                }

                dispatch({
                    type: LOGOUT
                });
                // Second dispatch is needed to clean the game from store.
                // So the logged in user won't see last user's game'
                dispatch({
                    type: SET_GAME_TO_DEFAULT
                });

                hashHistory.push('/');
            });
    };
}

export function fetchUserInfo() {
    return (dispatch) => {
        request
            .get('/api/user/userInfo')
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                    return;
                }
                dispatch({
                    type: FETCH_USER_INFO,
                    userInfo: res.body,
                });
            });
    };
}

export function updateAvatar(avatar) {
    return {
        type: UPDATE_AVATAR,
        avatar
    };
}
